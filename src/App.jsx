import { useState, useEffect } from 'react';
import { CASES } from './data/cases.js';
import { calcCaseEV, STEAM_FEE } from './utils/ev.js';
import CaseCard from './components/CaseCard.jsx';
import './App.css';

const SORT_OPTIONS = [
  { value: 'roi',    label: 'ROI' },
  { value: 'profit', label: 'Expected Profit' },
  { value: 'return', label: 'Expected Return' },
  { value: 'name',   label: 'Name' },
];

export default function App() {
  const [prices, setPrices]         = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError]           = useState(null);
  const [sortBy, setSortBy]         = useState('roi');
  const [sortAsc, setSortAsc]       = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}prices.json`)
      .then(r => {
        if (!r.ok) throw new Error(`prices.json not found (${r.status})`);
        return r.json();
      })
      .then(data => {
        setPrices(data.prices);
        setLastUpdated(data.lastUpdated);
      })
      .catch(e => setError(e.message));
  }, []);

  const results = prices
    ? CASES.map(c => ({ caseData: c, result: calcCaseEV(c, prices) }))
    : [];

  const sorted = [...results].sort((a, b) => {
    let av, bv;
    if (sortBy === 'roi')    { av = a.result.roi;            bv = b.result.roi; }
    if (sortBy === 'profit') { av = a.result.expectedProfit; bv = b.result.expectedProfit; }
    if (sortBy === 'return') { av = a.result.expectedReturn; bv = b.result.expectedReturn; }
    if (sortBy === 'name')   { av = a.caseData.name;         bv = b.caseData.name; }
    if (av < bv) return sortAsc ? -1 : 1;
    if (av > bv) return sortAsc ? 1 : -1;
    return 0;
  });

  function toggleSort(field) {
    if (sortBy === field) setSortAsc(a => !a);
    else { setSortBy(field); setSortAsc(false); }
  }

  return (
    <div className="app">
      <header className="site-header">
        <h1>CS2 Case EV Calculator</h1>
        <p className="subtitle">
          Expected value of opening CS2 cases based on Steam Market prices.
          Steam&apos;s {(STEAM_FEE * 100).toFixed(0)}% marketplace fee is factored into all returns.
        </p>
        {lastUpdated && (
          <p className="last-updated">
            Prices last updated: {new Date(lastUpdated).toLocaleString()}
          </p>
        )}
      </header>

      {error && (
        <div className="error-banner">
          <strong>Could not load prices.json</strong> — {error}
          <br />
          Run <code>node scripts/fetch-prices.mjs</code> to fetch live prices, then rebuild.
        </div>
      )}

      {!prices && !error && (
        <div className="loading">Loading prices…</div>
      )}

      {prices && (
        <>
          <div className="sort-bar">
            <span>Sort by:</span>
            {SORT_OPTIONS.map(o => (
              <button
                key={o.value}
                className={`sort-btn${sortBy === o.value ? ' active' : ''}`}
                onClick={() => toggleSort(o.value)}
              >
                {o.label}{sortBy === o.value ? (sortAsc ? ' ↑' : ' ↓') : ''}
              </button>
            ))}
          </div>

          <div className="cases-list">
            {sorted.map(({ caseData, result }) => (
              <CaseCard key={caseData.id} caseData={caseData} result={result} />
            ))}
          </div>
        </>
      )}

      <footer className="site-footer">
        Prices are cached from the Steam Community Market and may not reflect current values.
        Opening cases is typically a negative expected value activity.
      </footer>
    </div>
  );
}

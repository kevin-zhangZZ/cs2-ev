import { useState } from 'react';
import { RARITY_PROBS } from '../data/cases.js';

const RARITY_LABELS = {
  milSpec:     { label: 'Mil-Spec',    color: '#4b69ff' },
  restricted:  { label: 'Restricted', color: '#8847ff' },
  classified:  { label: 'Classified', color: '#d32ce6' },
  covert:      { label: 'Covert',     color: '#eb4b4b' },
  rareSpecial: { label: 'Rare Special (Knife/Glove)', color: '#e4ae39' },
};

function fmt(n) {
  return n == null ? '—' : `A$${n.toFixed(2)}`;
}

function pct(n) {
  return `${(n * 100).toFixed(2)}%`;
}

export default function CaseCard({ caseData, result }) {
  const [open, setOpen] = useState(false);

  const profitColor = result.expectedProfit >= 0 ? '#4caf50' : '#ef5350';

  return (
    <div className="case-card">
      <div className="case-header" onClick={() => setOpen(o => !o)}>
        <div className="case-title">
          <span className="case-name">{caseData.name}</span>
          <span className="case-toggle">{open ? '▲' : '▼'}</span>
        </div>
        <div className="case-stats">
          <Stat label="Case" value={fmt(result.casePrice)} />
          <Stat label="Key" value={fmt(result.keyPrice)} />
          <Stat label="Total Cost" value={fmt(result.totalCost)} />
          <Stat label="Expected Return" value={fmt(result.expectedReturn)} />
          <Stat
            label="Expected Profit"
            value={fmt(result.expectedProfit)}
            style={{ color: profitColor, fontWeight: 700 }}
          />
          <Stat
            label="ROI"
            value={`${result.roi.toFixed(1)}%`}
            style={{ color: profitColor }}
          />
        </div>
      </div>

      {open && (
        <div className="case-body">
          <table className="breakdown-table">
            <thead>
              <tr>
                <th>Rarity</th>
                <th>Drop %</th>
                <th>EV Contribution</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(result.breakdown).map(([tier, { prob, ev }]) => (
                <tr key={tier}>
                  <td>
                    <span
                      className="rarity-dot"
                      style={{ background: RARITY_LABELS[tier].color }}
                    />
                    {RARITY_LABELS[tier].label}
                  </td>
                  <td>{pct(prob)}</td>
                  <td>{fmt(ev)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="skin-lists">
            {Object.entries(caseData.contents).map(([tier, skins]) => (
              <div key={tier} className="skin-tier">
                <h4 style={{ color: RARITY_LABELS[tier].color }}>
                  {RARITY_LABELS[tier].label} — {pct(RARITY_PROBS[tier])} drop chance
                </h4>
                <ul>
                  {skins.map(s => (
                    <li key={s.name}>
                      {s.name}
                      {s.stattrak && <span className="st-badge">ST</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, style }) {
  return (
    <div className="stat">
      <span className="stat-label">{label}</span>
      <span className="stat-value" style={style}>{value}</span>
    </div>
  );
}

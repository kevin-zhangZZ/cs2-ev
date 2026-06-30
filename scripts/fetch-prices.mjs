/**
 * Fetches current Steam Market prices for all CS2 case skins and saves them
 * to public/prices.json.
 *
 * Usage:  node scripts/fetch-prices.mjs
 *
 * Steam rate-limits aggressively. This script throttles to 1 request/second
 * and retries once on 429. For large item sets, a full run can take 30+ min.
 * Run it periodically (e.g. weekly) to refresh the cached prices.
 */

import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT = path.join(__dirname, '..', 'public', 'prices.json');

// ── inline the case data so the script is self-contained ─────────────────────
// Import from source
const { CASES, getAllSkinNames } = await import('../src/data/cases.js');

const STEAM_API = 'https://steamcommunity.com/market/priceoverview/';
const APP_ID    = 730;   // CS2
const CURRENCY  = 1;     // USD

const DELAY_MS  = 1200;  // ms between requests (stay under rate limit)
const RETRY_MS  = 10000; // ms to wait after a 429

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchPrice(marketHashName) {
  const url = `${STEAM_API}?appid=${APP_ID}&currency=${CURRENCY}&market_hash_name=${encodeURIComponent(marketHashName)}`;
  for (let attempt = 0; attempt < 2; attempt++) {
    const res = await fetch(url);
    if (res.status === 429) {
      console.warn(`  Rate limited. Waiting ${RETRY_MS / 1000}s…`);
      await sleep(RETRY_MS);
      continue;
    }
    if (!res.ok) {
      console.warn(`  HTTP ${res.status} for: ${marketHashName}`);
      return null;
    }
    const data = await res.json();
    if (!data.success) return null;
    // Parse "$12.34" → 12.34
    const raw = data.median_price ?? data.lowest_price;
    if (!raw) return null;
    return parseFloat(raw.replace(/[^0-9.]/g, ''));
  }
  return null;
}

async function main() {
  const allNames = getAllSkinNames(CASES);
  console.log(`Fetching prices for ${allNames.length} items…`);

  const prices = {};
  let done = 0;

  for (const name of allNames) {
    const price = await fetchPrice(name);
    if (price != null) {
      prices[name] = price;
      console.log(`[${++done}/${allNames.length}] $${price.toFixed(2)}  ${name}`);
    } else {
      console.log(`[${++done}/${allNames.length}] NOT FOUND  ${name}`);
    }
    await sleep(DELAY_MS);
  }

  mkdirSync(path.join(__dirname, '..', 'public'), { recursive: true });
  writeFileSync(OUTPUT, JSON.stringify({ lastUpdated: new Date().toISOString(), prices }, null, 2));
  console.log(`\nSaved ${Object.keys(prices).length} prices to ${OUTPUT}`);
}

main().catch(err => { console.error(err); process.exit(1); });

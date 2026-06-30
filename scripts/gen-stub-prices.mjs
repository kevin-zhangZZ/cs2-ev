import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import { CASES } from '../src/data/cases.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT = path.join(__dirname, '..', 'public', 'prices.json');

const wears = ['(Factory New)', '(Minimal Wear)', '(Field-Tested)', '(Well-Worn)', '(Battle-Scarred)'];

const tierPrices = {
  milSpec:    [3.50, 1.80, 1.20, 0.90, 0.70],
  restricted: [8.00, 4.00, 2.50, 1.80, 1.40],
  classified: [20.00, 10.00, 6.00, 4.00, 3.00],
  covert:     [80.00, 40.00, 20.00, 12.00, 8.00],
};

const knifeNormal = [350, 220, 140, 100, 80];
const knifeST     = [560, 350, 220, 160, 130];

const prices = {};

// Approximate AUD prices (stubs only — run fetch-prices.mjs for real values)
const casePrices = {
  'Revolution Case':          2.90,
  'Recoil Case':              0.40,
  'Dreams & Nightmares Case': 2.56,
  'Fracture Case':            0.25,
  'Snakebite Case':           0.55,
  'Prisma 2 Case':            0.28,
  'CS20 Case':                0.65,
  'Shattered Web Case':       2.30,
  'Prisma Case':              0.38,
  'Horizon Case':             0.40,
  'Danger Zone Case':         0.35,
  'Clutch Case':              0.50,
  'Spectrum 2 Case':          0.60,
  'Glove Case':               4.50,
  'Gamma 2 Case':             0.80,
  'Gamma Case':               1.20,
};

for (const [name, price] of Object.entries(casePrices)) {
  prices[name] = price;
}

for (const c of CASES) {
  for (const [tier, skins] of Object.entries(c.contents)) {
    if (tier === 'rareSpecial') {
      for (const knife of skins) {
        for (let i = 0; i < wears.length; i++) {
          prices[`${knife.name} ${wears[i]}`] = knifeNormal[i];
          if (knife.stattrak) {
            const stName = knife.name.replace('★ ', '★ StatTrak™ ');
            prices[`${stName} ${wears[i]}`] = knifeST[i];
          }
        }
      }
    } else {
      const tp = tierPrices[tier];
      for (const skin of skins) {
        for (let i = 0; i < wears.length; i++) {
          prices[`${skin.name} ${wears[i]}`] = tp[i];
          if (skin.stattrak) {
            const parts = skin.name.split(' | ');
            const stName = `${parts[0]} | StatTrak™ ${parts[1]}`;
            prices[`${stName} ${wears[i]}`] = +(tp[i] * 1.6).toFixed(2);
          }
        }
      }
    }
  }
}

mkdirSync(path.join(__dirname, '..', 'public'), { recursive: true });
writeFileSync(OUTPUT, JSON.stringify({ lastUpdated: new Date().toISOString(), prices }, null, 2));
console.log(`Written ${Object.keys(prices).length} stub prices to ${OUTPUT}`);

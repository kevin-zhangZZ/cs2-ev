import { WEAR_DIST, WEAR_SUFFIXES, RARITY_PROBS, STATTRAK_PROB, KEY_PRICE } from '../data/cases.js';

// Steam takes 15% cut on sales (13% Steam + 2% game fee for CS2)
export const STEAM_FEE = 0.15;

// Returns the price the seller receives after Steam's cut
function netPrice(rawPrice) {
  return rawPrice * (1 - STEAM_FEE);
}

// Expected value of a single skin (all wears + optional StatTrak)
function skinEV(skinName, hasStatTrak, prices) {
  let ev = 0;
  const isKnife = skinName.startsWith('★');

  for (let i = 0; i < WEAR_SUFFIXES.length; i++) {
    const key = `${skinName} ${WEAR_SUFFIXES[i]}`;
    const price = prices[key];
    if (price != null) {
      ev += WEAR_DIST[i] * netPrice(price);
    }
  }

  if (hasStatTrak) {
    // Build StatTrak market name
    let stName;
    if (isKnife) {
      stName = skinName.replace('★ ', '★ StatTrak™ ');
    } else {
      const parts = skinName.split(' | ');
      stName = `${parts[0]} | StatTrak™ ${parts[1]}`;
    }
    let stEV = 0;
    for (let i = 0; i < WEAR_SUFFIXES.length; i++) {
      const key = `${stName} ${WEAR_SUFFIXES[i]}`;
      const price = prices[key];
      if (price != null) {
        stEV += WEAR_DIST[i] * netPrice(price);
      }
    }
    // 10% chance of StatTrak on non-rare-special; knives the same logic applies
    ev = ev * (1 - STATTRAK_PROB) + stEV * STATTRAK_PROB;
  }

  return ev;
}

// Expected value of all skins in a rarity tier
function tierEV(skins, totalProb, prices) {
  if (!skins || skins.length === 0) return 0;
  const probPerSkin = totalProb / skins.length;
  let ev = 0;
  for (const skin of skins) {
    ev += probPerSkin * skinEV(skin.name, skin.stattrak, prices);
  }
  return ev;
}

// Calculate full EV for a case given the prices map
export function calcCaseEV(caseData, prices) {
  const { contents } = caseData;
  const casePrice = prices[caseData.marketName] ?? 0;
  const totalCost = casePrice + KEY_PRICE;

  const skinEVTotal =
    tierEV(contents.milSpec,     RARITY_PROBS.milSpec,     prices) +
    tierEV(contents.restricted,  RARITY_PROBS.restricted,  prices) +
    tierEV(contents.classified,  RARITY_PROBS.classified,  prices) +
    tierEV(contents.covert,      RARITY_PROBS.covert,      prices) +
    tierEV(contents.rareSpecial, RARITY_PROBS.rareSpecial, prices);

  const expectedReturn = skinEVTotal;
  const expectedProfit = expectedReturn - totalCost;
  const roi = totalCost > 0 ? (expectedProfit / totalCost) * 100 : 0;

  // Per-tier breakdown for display
  const breakdown = {
    milSpec:     { prob: RARITY_PROBS.milSpec,     ev: tierEV(contents.milSpec,     RARITY_PROBS.milSpec,     prices) },
    restricted:  { prob: RARITY_PROBS.restricted,  ev: tierEV(contents.restricted,  RARITY_PROBS.restricted,  prices) },
    classified:  { prob: RARITY_PROBS.classified,  ev: tierEV(contents.classified,  RARITY_PROBS.classified,  prices) },
    covert:      { prob: RARITY_PROBS.covert,      ev: tierEV(contents.covert,      RARITY_PROBS.covert,      prices) },
    rareSpecial: { prob: RARITY_PROBS.rareSpecial, ev: tierEV(contents.rareSpecial, RARITY_PROBS.rareSpecial, prices) },
  };

  return {
    casePrice,
    keyPrice: KEY_PRICE,
    totalCost,
    expectedReturn,
    expectedProfit,
    roi,
    breakdown,
  };
}

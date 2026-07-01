// CS2 case contents with rarity tiers.
// Rarity probabilities (Valve published):
//   Mil-Spec (blue):    79.92% shared among all milSpec skins
//   Restricted (purple): 15.98%
//   Classified (pink):   3.20%
//   Covert (red):        0.64%
//   Rare Special (gold): 0.256% (knives / gloves — all variants share this pool)
//
// StatTrak versions: ~10% chance on any non-rare-special drop.
// Condition distribution (approximate, Valve hasn't published exact):
//   Factory New: 3.3%, Minimal Wear: 23.8%, Field-Tested: 33.1%,
//   Well-Worn: 24.0%, Battle-Scarred: 15.8%

export const WEAR_SUFFIXES = [
  '(Factory New)',
  '(Minimal Wear)',
  '(Field-Tested)',
  '(Well-Worn)',
  '(Battle-Scarred)',
];

export const WEAR_DIST = [0.033, 0.238, 0.331, 0.240, 0.158];

export const RARITY_PROBS = {
  milSpec:     0.7992,
  restricted:  0.1598,
  classified:  0.0320,
  covert:      0.0064,
  rareSpecial: 0.0026,
};

export const STATTRAK_PROB = 0.1;
export const KEY_PRICE = 3.85; // AUD

const ST = true;
const NST = false;

// ── Shared knife pools ────────────────────────────────────────────────────────

function knifeFinishes(type, extraFinishes = []) {
  const base = [
    { name: `★ ${type} | Doppler`,         stattrak: ST },
    { name: `★ ${type} | Marble Fade`,     stattrak: ST },
    { name: `★ ${type} | Fade`,            stattrak: ST },
    { name: `★ ${type} | Tiger Tooth`,     stattrak: ST },
    { name: `★ ${type} | Damascus Steel`,  stattrak: ST },
    { name: `★ ${type} | Lore`,            stattrak: ST },
    { name: `★ ${type} | Black Laminate`,  stattrak: ST },
    { name: `★ ${type} | Autotronic`,      stattrak: ST },
    { name: `★ ${type} | Blue Steel`,      stattrak: ST },
    { name: `★ ${type} | Case Hardened`,   stattrak: ST },
    { name: `★ ${type} | Boreal Forest`,   stattrak: ST },
    { name: `★ ${type} | Safari Mesh`,     stattrak: ST },
    { name: `★ ${type} | Scorched`,        stattrak: ST },
    { name: `★ ${type} | Forest DDPAT`,    stattrak: ST },
    { name: `★ ${type} | Urban Masked`,    stattrak: ST },
    { name: `★ ${type} | Night`,           stattrak: NST },
    { name: `★ ${type} | Stained`,         stattrak: ST },
    { name: `★ ${type} | Rust Coat`,       stattrak: NST },
    { name: `★ ${type}`,                   stattrak: NST },
    ...extraFinishes,
  ];
  return base;
}

// Classic knife pool — Bayonet, Flip, Gut, Karambit, M9 Bayonet
// Used in most cases from 2013 onward
function classicKnifePool() {
  return [
    ...knifeFinishes('Bayonet'),
    ...knifeFinishes('Flip Knife'),
    ...knifeFinishes('Gut Knife'),
    ...knifeFinishes('Karambit'),
    ...knifeFinishes('M9 Bayonet'),
  ];
}

// Gamma knife pool — Bowie, Butterfly, Falchion, Huntsman, Shadow Daggers
// Used in Gamma Case, Gamma 2 Case, Spectrum cases, etc.
function gammaKnifePool() {
  const gammaExtra = (type) => [
    { name: `★ ${type} | Ultraviolet`, stattrak: ST },
    { name: `★ ${type} | Night Stripe`, stattrak: ST },
  ];
  return [
    ...knifeFinishes('Bowie Knife', gammaExtra('Bowie Knife')),
    ...knifeFinishes('Butterfly Knife', gammaExtra('Butterfly Knife')),
    ...knifeFinishes('Falchion Knife', gammaExtra('Falchion Knife')),
    ...knifeFinishes('Huntsman Knife', gammaExtra('Huntsman Knife')),
    ...knifeFinishes('Shadow Daggers', gammaExtra('Shadow Daggers')),
  ];
}

// Glove pool — used in Glove Case and Clutch Case
function glovePool() {
  const sportFinishes = ['Pandora\'s Box', 'Superconductor', 'Hedge Maze', 'Amphibious', 'Bronze Morph', 'Vice'];
  const bloodhoundFinishes = ['Charred', 'Snakebite', 'Guerrilla', 'Bronzed'];
  const driverFinishes = ['Crimson Weave', 'Snow Leopard', 'Queen Jaguar', 'Lunar Weave', 'Convoy', 'Racing Green'];
  const handwrapFinishes = ['Cobalt Skulls', 'CAUTION!', 'Overprint', 'Slaughter', 'Leather', 'Spruce DDPAT'];
  const motoFinishes = ['POW!', 'Spearmint', 'Boom!', 'Eclipse', 'Blood Pressure', 'Polygon'];
  const specialistFinishes = ['Crimson Kimono', 'Emerald Web', 'Forest DDPAT', 'Mogul', 'Lt. Commander', 'Marble Fade'];

  return [
    ...sportFinishes.map(f => ({ name: `★ Sport Gloves | ${f}`, stattrak: NST })),
    ...bloodhoundFinishes.map(f => ({ name: `★ Bloodhound Gloves | ${f}`, stattrak: NST })),
    ...driverFinishes.map(f => ({ name: `★ Driver Gloves | ${f}`, stattrak: NST })),
    ...handwrapFinishes.map(f => ({ name: `★ Hand Wraps | ${f}`, stattrak: NST })),
    ...motoFinishes.map(f => ({ name: `★ Moto Gloves | ${f}`, stattrak: NST })),
    ...specialistFinishes.map(f => ({ name: `★ Specialist Gloves | ${f}`, stattrak: NST })),
  ];
}

// ── Cases ─────────────────────────────────────────────────────────────────────

export const CASES = [
  {
    id: 'revolution-case',
    name: 'Revolution Case',
    marketName: 'Revolution Case',
    contents: {
      milSpec: [
        { name: 'AK-47 | Head Shot',          stattrak: ST },
        { name: 'Glock-18 | Umbral Rabbit',   stattrak: ST },
        { name: 'P250 | Vino Primo',           stattrak: ST },
        { name: 'Five-SeveN | Dusk',           stattrak: ST },
        { name: 'FAMAS | Meow 36',             stattrak: ST },
        { name: 'Nova | Line Noise',           stattrak: ST },
        { name: 'MP5-SD | Liquidation',        stattrak: ST },
      ],
      restricted: [
        { name: 'MAC-10 | Sakkaku',            stattrak: ST },
        { name: 'SSG 08 | Neon Sea',           stattrak: ST },
        { name: 'FAMAS | T-Bone',              stattrak: ST },
        { name: 'M4A4 | Temukau',              stattrak: ST },
        { name: 'Tec-9 | Rebel',               stattrak: ST },
      ],
      classified: [
        { name: 'Desert Eagle | Blue Boa',     stattrak: ST },
        { name: 'MP9 | Featherweight',         stattrak: ST },
        { name: 'AWP | Duality',               stattrak: ST },
      ],
      covert: [
        { name: 'M4A1-S | Blackwater',         stattrak: ST },
        { name: 'AK-47 | Inheritance',         stattrak: ST },
      ],
      rareSpecial: classicKnifePool(),
    },
  },

  {
    id: 'recoil-case',
    name: 'Recoil Case',
    marketName: 'Recoil Case',
    contents: {
      milSpec: [
        { name: 'AK-47 | Ice Coaled',          stattrak: ST },
        { name: 'Glock-18 | Winterized',       stattrak: ST },
        { name: 'MP9 | Starlight Protector',   stattrak: ST },
        { name: 'Nova | Plume',                stattrak: ST },
        { name: 'P90 | Vent Rush',             stattrak: ST },
        { name: 'Tec-9 | Slag',                stattrak: ST },
        { name: 'XM1014 | Iridescent',         stattrak: ST },
      ],
      restricted: [
        { name: 'Five-SeveN | Nitro',          stattrak: ST },
        { name: 'MAC-10 | Monkeyflage',        stattrak: ST },
        { name: 'MP5-SD | Massacre',           stattrak: ST },
        { name: 'P250 | Facets',               stattrak: ST },
        { name: 'SSG 08 | Parallax',           stattrak: ST },
      ],
      classified: [
        { name: 'Desert Eagle | Printstream',  stattrak: ST },
        { name: 'M4A1-S | Restless',           stattrak: ST },
        { name: 'USP-S | Aquifer',             stattrak: ST },
      ],
      covert: [
        { name: 'AK-47 | Calm Tempest',        stattrak: ST },
        { name: 'M4A4 | Cyber Security',       stattrak: ST },
      ],
      rareSpecial: classicKnifePool(),
    },
  },

  {
    id: 'dreams-nightmares-case',
    name: 'Dreams & Nightmares Case',
    marketName: 'Dreams & Nightmares Case',
    contents: {
      milSpec: [
        { name: 'AK-47 | Nightwish',               stattrak: ST },
        { name: 'Glock-18 | Dreams and Nightmares', stattrak: ST },
        { name: 'MP9 | Starlight Protector',        stattrak: ST },
        { name: 'P250 | Vino Primo',                stattrak: ST },
        { name: 'SCAR-20 | Poultrygeist',           stattrak: ST },
        { name: 'SG 553 | Hypnotic',                stattrak: ST },
        { name: 'XM1014 | Zombie Offensive',        stattrak: ST },
      ],
      restricted: [
        { name: 'FAMAS | Rapid Eye Movement',   stattrak: ST },
        { name: 'Galil AR | Akoben',            stattrak: ST },
        { name: 'MAC-10 | Monkeyflage',         stattrak: ST },
        { name: 'MP5-SD | Necro Jr',            stattrak: ST },
        { name: 'PP-Bizon | Space Cat',         stattrak: ST },
      ],
      classified: [
        { name: 'CZ75-Auto | Vendetta',         stattrak: ST },
        { name: 'M4A1-S | Night Terror',        stattrak: ST },
        { name: 'USP-S | Ticket to Hell',       stattrak: ST },
      ],
      covert: [
        { name: 'AK-47 | Nightwish',            stattrak: ST },
        { name: 'MP5-SD | Necro Jr',            stattrak: ST },
      ],
      rareSpecial: classicKnifePool(),
    },
  },

  {
    id: 'fracture-case',
    name: 'Fracture Case',
    marketName: 'Fracture Case',
    contents: {
      milSpec: [
        { name: 'AK-47 | Slate',               stattrak: ST },
        { name: 'Glock-18 | Vogue',            stattrak: ST },
        { name: 'MP7 | Abyssal Apparition',    stattrak: ST },
        { name: 'P90 | Cocoa Rampage',         stattrak: ST },
        { name: 'Sawed-Off | Kiss♥Love',       stattrak: ST },
        { name: 'Tec-9 | Bamboozle',           stattrak: ST },
        { name: 'UMP-45 | Gold Bismuth',       stattrak: ST },
      ],
      restricted: [
        { name: 'CZ75-Auto | Distressed',      stattrak: ST },
        { name: 'Desert Eagle | Printstream',  stattrak: ST },
        { name: 'FAMAS | Decommissioned',      stattrak: ST },
        { name: 'MP5-SD | Liquidation',        stattrak: ST },
        { name: 'SSG 08 | Parallax',           stattrak: ST },
      ],
      classified: [
        { name: 'AWP | Exoskeleton',           stattrak: ST },
        { name: 'M4A4 | Tooth Fairy',          stattrak: ST },
        { name: 'USP-S | Monster Mashup',      stattrak: ST },
      ],
      covert: [
        { name: 'AK-47 | Phantom Disruptor',   stattrak: ST },
        { name: 'Glock-18 | Bullet Queen',     stattrak: ST },
      ],
      rareSpecial: classicKnifePool(),
    },
  },

  {
    id: 'snakebite-case',
    name: 'Snakebite Case',
    marketName: 'Snakebite Case',
    contents: {
      milSpec: [
        { name: 'MP9 | Hydra',                 stattrak: ST },
        { name: 'XM1014 | Zombie Offensive',   stattrak: ST },
        { name: 'FAMAS | Rapid Eye Movement',  stattrak: ST },
        { name: 'Glock-18 | Clear Polymer',    stattrak: ST },
        { name: 'P250 | Inferno',              stattrak: ST },
        { name: 'PP-Bizon | Space Cat',        stattrak: ST },
        { name: 'SCAR-20 | Poultrygeist',      stattrak: ST },
      ],
      restricted: [
        { name: 'AUG | Flame Jörmungandr',     stattrak: ST },
        { name: 'MP5-SD | Necro Jr',           stattrak: ST },
        { name: 'CZ75-Auto | Vendetta',        stattrak: ST },
        { name: 'Tec-9 | Decimator',           stattrak: ST },
        { name: 'SSG 08 | Fever Dream',        stattrak: ST },
      ],
      classified: [
        { name: 'M4A1-S | Night Terror',       stattrak: ST },
        { name: 'USP-S | Ticket to Hell',      stattrak: ST },
        { name: 'Five-SeveN | Fairy Tale',     stattrak: ST },
      ],
      covert: [
        { name: 'AK-47 | Slate',               stattrak: ST },
        { name: 'MAC-10 | Monkeyflage',        stattrak: ST },
      ],
      rareSpecial: classicKnifePool(),
    },
  },

  {
    id: 'prisma-2-case',
    name: 'Prisma 2 Case',
    marketName: 'Prisma 2 Case',
    contents: {
      milSpec: [
        { name: 'AK-47 | Phantom Disruptor',   stattrak: ST },
        { name: 'Glock-18 | Bullet Queen',     stattrak: ST },
        { name: 'M249 | Deep Relief',          stattrak: ST },
        { name: 'MAG-7 | Monster Call',        stattrak: ST },
        { name: 'MP5-SD | Liquidation',        stattrak: ST },
        { name: 'P90 | Cocoa Rampage',         stattrak: ST },
        { name: 'PP-Bizon | Jungle Slipstream',stattrak: ST },
      ],
      restricted: [
        { name: 'AUG | Stymphalian',           stattrak: ST },
        { name: 'CZ75-Auto | Distressed',      stattrak: ST },
        { name: 'FAMAS | Decommissioned',      stattrak: ST },
        { name: 'Five-SeveN | Buddy',          stattrak: ST },
        { name: 'UMP-45 | Gold Bismuth',       stattrak: ST },
      ],
      classified: [
        { name: 'Desert Eagle | Printstream',  stattrak: ST },
        { name: 'M4A1-S | Player Two',         stattrak: ST },
        { name: 'SSG 08 | Parallax',           stattrak: ST },
      ],
      covert: [
        { name: 'AK-47 | Phantasm',            stattrak: ST },
        { name: 'M4A4 | The Emperor',          stattrak: ST },
      ],
      rareSpecial: classicKnifePool(),
    },
  },

  {
    id: 'cs20-case',
    name: 'CS20 Case',
    marketName: 'CS20 Case',
    contents: {
      milSpec: [
        { name: 'AUG | Viper Strike',          stattrak: ST },
        { name: 'Dual Berettas | Dual Comm',   stattrak: ST },
        { name: 'FAMAS | Decommissioned',      stattrak: ST },
        { name: 'Glock-18 | Neo-Noir',         stattrak: ST },
        { name: 'M249 | Aztec',                stattrak: ST },
        { name: 'SG 553 | Aloha',              stattrak: ST },
        { name: 'Tec-9 | Flash Out',           stattrak: ST },
      ],
      restricted: [
        { name: 'Five-SeveN | Buddy',          stattrak: ST },
        { name: 'MP5-SD | Acid Wash',          stattrak: ST },
        { name: 'P90 | Asiimov',               stattrak: ST },
        { name: 'SSG 08 | Fever Dream',        stattrak: ST },
        { name: 'USP-S | Flashback',           stattrak: ST },
      ],
      classified: [
        { name: 'AK-47 | Crimson Web',         stattrak: ST },
        { name: 'Desert Eagle | Cobalt Disruption', stattrak: ST },
        { name: 'M4A4 | Evil Daimyo',          stattrak: ST },
      ],
      covert: [
        { name: 'AK-47 | Neon Revolution',     stattrak: ST },
        { name: 'MP5-SD | Condition Zero',     stattrak: ST },
      ],
      rareSpecial: classicKnifePool(),
    },
  },

  {
    id: 'shattered-web-case',
    name: 'Shattered Web Case',
    marketName: 'Shattered Web Case',
    contents: {
      milSpec: [
        { name: 'M4A1-S | Nitro',              stattrak: ST },
        { name: 'Glock-18 | Wasteland Rebel',  stattrak: ST },
        { name: 'MP7 | Mischief',              stattrak: ST },
        { name: 'P250 | Nevermore',            stattrak: ST },
        { name: 'R8 Revolver | Skull Crusher', stattrak: ST },
        { name: 'Sawed-Off | Devourer',        stattrak: ST },
        { name: 'XM1014 | Entombed',           stattrak: ST },
      ],
      restricted: [
        { name: 'AK-47 | Uncharted',           stattrak: ST },
        { name: 'AWP | Exoskeleton',           stattrak: ST },
        { name: 'CZ75-Auto | Circaetus',       stattrak: ST },
        { name: 'FAMAS | Eye of Athena',       stattrak: ST },
        { name: 'MP9 | Capillary',             stattrak: ST },
      ],
      classified: [
        { name: 'MAC-10 | Allure',             stattrak: ST },
        { name: 'MP5-SD | Phosphor',           stattrak: ST },
        { name: 'USP-S | Cortex',              stattrak: ST },
      ],
      covert: [
        { name: 'Desert Eagle | Trigger Discipline', stattrak: ST },
        { name: 'M4A4 | The Emperor',          stattrak: ST },
      ],
      rareSpecial: classicKnifePool(),
    },
  },

  {
    id: 'prisma-case',
    name: 'Prisma Case',
    marketName: 'Prisma Case',
    contents: {
      milSpec: [
        { name: 'AK-47 | Uncharted',           stattrak: ST },
        { name: 'Glock-18 | Twilight Galaxy',  stattrak: ST },
        { name: 'MP9 | Capillary',             stattrak: ST },
        { name: 'P2000 | Lifted Spirits',      stattrak: ST },
        { name: 'R8 Revolver | Crimson Web',   stattrak: ST },
        { name: 'Sawed-Off | Devourer',        stattrak: ST },
        { name: 'Tec-9 | Bamboozle',           stattrak: ST },
      ],
      restricted: [
        { name: 'CZ75-Auto | Circaetus',       stattrak: ST },
        { name: 'FAMAS | Eye of Athena',       stattrak: ST },
        { name: 'Five-SeveN | Angry Mob',      stattrak: ST },
        { name: 'MAC-10 | Allure',             stattrak: ST },
        { name: 'Nova | Windblown',            stattrak: ST },
      ],
      classified: [
        { name: 'AWP | Atheris',               stattrak: ST },
        { name: 'M4A1-S | Nightmare',          stattrak: ST },
        { name: 'USP-S | Cortex',              stattrak: ST },
      ],
      covert: [
        { name: 'AK-47 | Asiimov',             stattrak: ST },
        { name: 'M4A4 | Etch Lord',            stattrak: ST },
      ],
      rareSpecial: classicKnifePool(),
    },
  },

  {
    id: 'horizon-case',
    name: 'Horizon Case',
    marketName: 'Horizon Case',
    contents: {
      milSpec: [
        { name: 'AUG | Aristocrat',            stattrak: ST },
        { name: 'Glock-18 | Ramese\'s Reach',  stattrak: ST },
        { name: 'MP7 | Akoben',                stattrak: ST },
        { name: 'P250 | Exchanger',            stattrak: ST },
        { name: 'SG 553 | Aloha',              stattrak: ST },
        { name: 'Tec-9 | Bamboozle',           stattrak: ST },
        { name: 'XM1014 | Entombed',           stattrak: ST },
      ],
      restricted: [
        { name: 'AK-47 | Uncharted',           stattrak: ST },
        { name: 'Desert Eagle | Code Red',     stattrak: ST },
        { name: 'Five-SeveN | Angry Mob',      stattrak: ST },
        { name: 'Nova | Windblown',            stattrak: ST },
        { name: 'R8 Revolver | Skull Crusher', stattrak: ST },
      ],
      classified: [
        { name: 'AWP | Wildfire',              stattrak: ST },
        { name: 'M4A4 | Poly Mag',             stattrak: ST },
        { name: 'USP-S | Cortex',              stattrak: ST },
      ],
      covert: [
        { name: 'AK-47 | Neon Rider',          stattrak: ST },
        { name: 'M4A1-S | Nightmare',          stattrak: ST },
      ],
      rareSpecial: classicKnifePool(),
    },
  },

  {
    id: 'danger-zone-case',
    name: 'Danger Zone Case',
    marketName: 'Danger Zone Case',
    contents: {
      milSpec: [
        { name: 'AUG | Flame Jörmungandr',     stattrak: ST },
        { name: 'Glock-18 | Wastelander',      stattrak: ST },
        { name: 'MP5-SD | Phosphor',           stattrak: ST },
        { name: 'P250 | Exchanger',            stattrak: ST },
        { name: 'PP-Bizon | Night Riot',       stattrak: ST },
        { name: 'R8 Revolver | Survivalist',   stattrak: ST },
        { name: 'Sawed-Off | Apocalypto',      stattrak: ST },
      ],
      restricted: [
        { name: 'Desert Eagle | Code Red',     stattrak: ST },
        { name: 'FAMAS | Eye of Athena',       stattrak: ST },
        { name: 'Five-SeveN | Angry Mob',      stattrak: ST },
        { name: 'MP7 | Akoben',                stattrak: ST },
        { name: 'Tec-9 | Bamboozle',           stattrak: ST },
      ],
      classified: [
        { name: 'AK-47 | Asiimov',             stattrak: ST },
        { name: 'M4A1-S | Decimator',          stattrak: ST },
        { name: 'USP-S | Bloodtiger',          stattrak: ST },
      ],
      covert: [
        { name: 'AWP | Containment Breach',    stattrak: ST },
        { name: 'M4A4 | The Emperor',          stattrak: ST },
      ],
      rareSpecial: classicKnifePool(),
    },
  },

  {
    id: 'clutch-case',
    name: 'Clutch Case',
    marketName: 'Clutch Case',
    contents: {
      milSpec: [
        { name: 'AUG | Amber Slipstream',      stattrak: ST },
        { name: 'Dual Berettas | Shred',       stattrak: ST },
        { name: 'Glock-18 | Warhawk',          stattrak: ST },
        { name: 'MP9 | Bulldozer',             stattrak: ST },
        { name: 'P2000 | Handgun',             stattrak: ST },
        { name: 'UMP-45 | Momentum',           stattrak: ST },
        { name: 'XM1014 | Black Tie',          stattrak: ST },
      ],
      restricted: [
        { name: 'AK-47 | Rat Rod',             stattrak: ST },
        { name: 'FAMAS | Mecha Industries',    stattrak: ST },
        { name: 'Five-SeveN | Hyper Beast',    stattrak: ST },
        { name: 'M4A1-S | Decimator',          stattrak: ST },
        { name: 'SSG 08 | Bloodshot',          stattrak: ST },
      ],
      classified: [
        { name: 'AWP | PAW',                   stattrak: ST },
        { name: 'Desert Eagle | Midnight Storm',stattrak: ST },
        { name: 'USP-S | Cortex',              stattrak: ST },
      ],
      covert: [
        { name: 'AK-47 | Neon Rider',          stattrak: ST },
        { name: 'M4A4 | Neo-Noir',             stattrak: ST },
      ],
      rareSpecial: glovePool(),
    },
  },

  {
    id: 'spectrum-2-case',
    name: 'Spectrum 2 Case',
    marketName: 'Spectrum 2 Case',
    contents: {
      milSpec: [
        { name: 'AK-47 | Uncharted',           stattrak: ST },
        { name: 'Glock-18 | Oxide Blaze',      stattrak: ST },
        { name: 'MAG-7 | Heat',                stattrak: ST },
        { name: 'MP9 | Bulldozer',             stattrak: ST },
        { name: 'P250 | Splash',               stattrak: ST },
        { name: 'PP-Bizon | Jungle Slipstream',stattrak: ST },
        { name: 'XM1014 | Black Tie',          stattrak: ST },
      ],
      restricted: [
        { name: 'AUG | Amber Slipstream',      stattrak: ST },
        { name: 'Dual Berettas | Shred',       stattrak: ST },
        { name: 'Five-SeveN | Hyper Beast',    stattrak: ST },
        { name: 'P90 | Chopper',               stattrak: ST },
        { name: 'UMP-45 | Momentum',           stattrak: ST },
      ],
      classified: [
        { name: 'AWP | Fever Dream',           stattrak: ST },
        { name: 'M4A1-S | Decimator',          stattrak: ST },
        { name: 'USP-S | Cyrex',               stattrak: ST },
      ],
      covert: [
        { name: 'AK-47 | Neon Rider',          stattrak: ST },
        { name: 'M4A4 | Neo-Noir',             stattrak: ST },
      ],
      rareSpecial: gammaKnifePool(),
    },
  },

  {
    id: 'glove-case',
    name: 'Glove Case',
    marketName: 'Glove Case',
    contents: {
      milSpec: [
        { name: 'AK-47 | Frontside Misty',     stattrak: ST },
        { name: 'Glock-18 | Wasteland Rebel',  stattrak: ST },
        { name: 'MP7 | Cirrus',                stattrak: ST },
        { name: 'P250 | Valence',              stattrak: ST },
        { name: 'PP-Bizon | Fuel Rod',         stattrak: ST },
        { name: 'Sawed-Off | Fubar',           stattrak: ST },
        { name: 'UMP-45 | Riot',               stattrak: ST },
      ],
      restricted: [
        { name: 'AUG | Fleet Flock',           stattrak: ST },
        { name: 'CZ75-Auto | Tigris',          stattrak: ST },
        { name: 'FAMAS | Mecha Industries',    stattrak: ST },
        { name: 'Five-SeveN | Violent Daimyo', stattrak: ST },
        { name: 'SSG 08 | Dragonfire',         stattrak: ST },
      ],
      classified: [
        { name: 'M4A4 | Buzz Kill',            stattrak: ST },
        { name: 'MAC-10 | Neon Rider',         stattrak: ST },
        { name: 'USP-S | Caiman',              stattrak: ST },
      ],
      covert: [
        { name: 'AK-47 | Wasteland Rebel',     stattrak: ST },
        { name: 'AWP | Hyper Beast',           stattrak: ST },
      ],
      rareSpecial: glovePool(),
    },
  },

  {
    id: 'gamma-2-case',
    name: 'Gamma 2 Case',
    marketName: 'Gamma 2 Case',
    contents: {
      milSpec: [
        { name: 'AK-47 | Frontside Misty',     stattrak: ST },
        { name: 'Glock-18 | Wasteland Rebel',  stattrak: ST },
        { name: 'M249 | System Lock',          stattrak: ST },
        { name: 'MP9 | Hypnotic',              stattrak: ST },
        { name: 'P250 | Valence',              stattrak: ST },
        { name: 'Sawed-Off | Fubar',           stattrak: ST },
        { name: 'UMP-45 | Riot',               stattrak: ST },
      ],
      restricted: [
        { name: 'AUG | Fleet Flock',           stattrak: ST },
        { name: 'CZ75-Auto | Tigris',          stattrak: ST },
        { name: 'Five-SeveN | Violent Daimyo', stattrak: ST },
        { name: 'Tec-9 | Fuel Injector',       stattrak: ST },
        { name: 'XM1014 | Seasons',            stattrak: ST },
      ],
      classified: [
        { name: 'M4A4 | Buzz Kill',            stattrak: ST },
        { name: 'MAC-10 | Neon Rider',         stattrak: ST },
        { name: 'USP-S | Caiman',              stattrak: ST },
      ],
      covert: [
        { name: 'AK-47 | Wasteland Rebel',     stattrak: ST },
        { name: 'AWP | Hyper Beast',           stattrak: ST },
      ],
      rareSpecial: gammaKnifePool(),
    },
  },

  {
    id: 'gamma-case',
    name: 'Gamma Case',
    marketName: 'Gamma Case',
    contents: {
      milSpec: [
        { name: 'CZ75-Auto | Xiangliu',        stattrak: ST },
        { name: 'FAMAS | Mecha Industries',    stattrak: ST },
        { name: 'Glock-18 | Nuclear Garden',   stattrak: ST },
        { name: 'MP7 | Cirrus',                stattrak: ST },
        { name: 'PP-Bizon | Fuel Rod',         stattrak: ST },
        { name: 'Sawed-Off | Limelight',       stattrak: ST },
        { name: 'SSG 08 | Dragonfire',         stattrak: ST },
      ],
      restricted: [
        { name: 'AUG | Fleet Flock',           stattrak: ST },
        { name: 'Five-SeveN | Violent Daimyo', stattrak: ST },
        { name: 'M4A1-S | Flashback',          stattrak: ST },
        { name: 'Tec-9 | Fuel Injector',       stattrak: ST },
        { name: 'XM1014 | Seasons',            stattrak: ST },
      ],
      classified: [
        { name: 'AK-47 | Neon Revolution',     stattrak: ST },
        { name: 'M4A4 | Buzz Kill',            stattrak: ST },
        { name: 'USP-S | Caiman',              stattrak: ST },
      ],
      covert: [
        { name: 'AWP | Hyper Beast',           stattrak: ST },
        { name: 'MAC-10 | Neon Rider',         stattrak: ST },
      ],
      rareSpecial: gammaKnifePool(),
    },
  },
];

// Returns every unique market hash name that needs a price lookup
export function getAllSkinNames(cases) {
  const names = new Set();
  for (const c of cases) {
    names.add(c.marketName);
    for (const tier of Object.values(c.contents)) {
      for (const skin of tier) {
        const isKnife = skin.name.startsWith('★');
        if (isKnife) {
          const noFinish = !skin.name.includes(' | ');
          const wears = noFinish
            ? WEAR_SUFFIXES
            : WEAR_SUFFIXES;
          for (const w of wears) names.add(`${skin.name} ${w}`);
          if (skin.stattrak) {
            const stName = skin.name.replace('★ ', '★ StatTrak™ ');
            for (const w of WEAR_SUFFIXES) names.add(`${stName} ${w}`);
          }
        } else {
          for (const w of WEAR_SUFFIXES) names.add(`${skin.name} ${w}`);
          if (skin.stattrak) {
            const parts = skin.name.split(' | ');
            const stName = `StatTrak™ ${parts[0]} | ${parts[1]}`;
            for (const w of WEAR_SUFFIXES) names.add(`${stName} ${w}`);
          }
        }
      }
    }
  }
  return [...names];
}

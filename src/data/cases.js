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
// Used in Gamma Case, Gamma 2 Case, Spectrum 2 Case, etc.
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

// Glove pool — used in Glove Case, Clutch Case, Snakebite Case
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

// CS20 Case has only the Classic Knife (introduced with CS20)
function cs20KnifePool() {
  return knifeFinishes('Classic Knife');
}

// ── Cases ─────────────────────────────────────────────────────────────────────

export const CASES = [
  {
    id: 'revolution-case',
    name: 'Revolution Case',
    marketName: 'Revolution Case',
    contents: {
      milSpec: [
        { name: 'MAG-7 | Insomnia',            stattrak: ST },
        { name: 'MP9 | Featherweight',          stattrak: ST },
        { name: 'SCAR-20 | Fragments',          stattrak: ST },
        { name: 'P250 | Re.built',              stattrak: ST },
        { name: 'MP5-SD | Liquidation',         stattrak: ST },
        { name: 'SG 553 | Cyberforce',          stattrak: ST },
        { name: 'Tec-9 | Rebel',                stattrak: ST },
      ],
      restricted: [
        { name: 'M4A1-S | Emphorosaur-S',       stattrak: ST },
        { name: 'Glock-18 | Umbral Rabbit',     stattrak: ST },
        { name: 'MAC-10 | Sakkaku',             stattrak: ST },
        { name: 'R8 Revolver | Banana Cannon',  stattrak: ST },
        { name: 'P90 | Neoqueen',               stattrak: ST },
      ],
      classified: [
        { name: 'AWP | Duality',                stattrak: ST },
        { name: 'UMP-45 | Wild Child',          stattrak: ST },
        { name: 'P2000 | Wicked Sick',          stattrak: ST },
      ],
      covert: [
        { name: 'M4A4 | Temukau',               stattrak: ST },
        { name: 'AK-47 | Head Shot',            stattrak: ST },
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
        { name: 'FAMAS | Meow 36',              stattrak: ST },
        { name: 'Galil AR | Destroyer',         stattrak: ST },
        { name: 'M4A4 | Poly Mag',              stattrak: ST },
        { name: 'MAC-10 | Monkeyflage',         stattrak: ST },
        { name: 'Negev | Drop Me',              stattrak: ST },
        { name: 'UMP-45 | Roadblock',           stattrak: ST },
        { name: 'Glock-18 | Winterized',        stattrak: ST },
      ],
      restricted: [
        { name: 'R8 Revolver | Crazy 8',        stattrak: ST },
        { name: 'M249 | Downtown',              stattrak: ST },
        { name: 'SG 553 | Dragon Tech',         stattrak: ST },
        { name: 'P90 | Vent Rush',              stattrak: ST },
        { name: 'Dual Berettas | Flora Carnivora', stattrak: ST },
      ],
      classified: [
        { name: 'AK-47 | Ice Coaled',           stattrak: ST },
        { name: 'P250 | Visions',               stattrak: ST },
        { name: 'Sawed-Off | Kiss♥Love',   stattrak: ST },
      ],
      covert: [
        { name: 'USP-S | Printstream',          stattrak: ST },
        { name: 'AWP | Chromatic Aberration',   stattrak: ST },
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
        { name: 'Five-SeveN | Scrawl',          stattrak: ST },
        { name: 'MAC-10 | Ensnared',            stattrak: ST },
        { name: 'MAG-7 | Foresight',            stattrak: ST },
        { name: 'MP5-SD | Necro Jr.',           stattrak: ST },
        { name: 'P2000 | Lifted Spirits',       stattrak: ST },
        { name: 'SCAR-20 | Poultrygeist',       stattrak: ST },
        { name: 'Sawed-Off | Spirit Board',     stattrak: ST },
      ],
      restricted: [
        { name: 'PP-Bizon | Space Cat',         stattrak: ST },
        { name: 'G3SG1 | Dream Glade',          stattrak: ST },
        { name: 'M4A1-S | Night Terror',        stattrak: ST },
        { name: 'XM1014 | Zombie Offensive',    stattrak: ST },
        { name: 'USP-S | Ticket to Hell',       stattrak: ST },
      ],
      classified: [
        { name: 'Dual Berettas | Melondrama',   stattrak: ST },
        { name: 'FAMAS | Rapid Eye Movement',   stattrak: ST },
        { name: 'MP7 | Abyssal Apparition',     stattrak: ST },
      ],
      covert: [
        { name: 'AK-47 | Nightwish',            stattrak: ST },
        { name: 'MP9 | Starlight Protector',    stattrak: ST },
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
        { name: 'Negev | Ultralight',           stattrak: ST },
        { name: 'P2000 | Gnarled',              stattrak: ST },
        { name: 'SG 553 | Ol\' Rusty',          stattrak: ST },
        { name: 'SSG 08 | Mainframe 001',       stattrak: ST },
        { name: 'P250 | Cassette',              stattrak: ST },
        { name: 'P90 | Freight',                stattrak: ST },
        { name: 'PP-Bizon | Runic',             stattrak: ST },
      ],
      restricted: [
        { name: 'MAG-7 | Monster Call',         stattrak: ST },
        { name: 'Tec-9 | Brother',              stattrak: ST },
        { name: 'MAC-10 | Allure',              stattrak: ST },
        { name: 'Galil AR | Connexion',         stattrak: ST },
        { name: 'MP5-SD | Kitbash',             stattrak: ST },
      ],
      classified: [
        { name: 'M4A4 | Tooth Fairy',           stattrak: ST },
        { name: 'Glock-18 | Vogue',             stattrak: ST },
        { name: 'XM1014 | Entombed',            stattrak: ST },
      ],
      covert: [
        { name: 'Desert Eagle | Printstream',   stattrak: ST },
        { name: 'AK-47 | Legion of Anubis',     stattrak: ST },
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
        { name: 'SG 553 | Heavy Metal',         stattrak: ST },
        { name: 'Glock-18 | Clear Polymer',     stattrak: ST },
        { name: 'M249 | O.S.I.P.R.',            stattrak: ST },
        { name: 'CZ75-Auto | Circaetus',        stattrak: ST },
        { name: 'UMP-45 | Oscillator',          stattrak: ST },
        { name: 'R8 Revolver | Junk Yard',      stattrak: ST },
        { name: 'Nova | Windblown',             stattrak: ST },
      ],
      restricted: [
        { name: 'P250 | Cyber Shell',           stattrak: ST },
        { name: 'Negev | dev_texture',          stattrak: ST },
        { name: 'MAC-10 | Button Masher',       stattrak: ST },
        { name: 'Desert Eagle | Trigger Discipline', stattrak: ST },
        { name: 'AK-47 | Slate',                stattrak: ST },
      ],
      classified: [
        { name: 'MP9 | Food Chain',             stattrak: ST },
        { name: 'XM1014 | XOXO',               stattrak: ST },
        { name: 'Galil AR | Chromatic Aberration', stattrak: ST },
      ],
      covert: [
        { name: 'USP-S | The Traitor',          stattrak: ST },
        { name: 'M4A4 | In Living Color',       stattrak: ST },
      ],
      rareSpecial: glovePool(),
    },
  },

  {
    id: 'prisma-2-case',
    name: 'Prisma 2 Case',
    marketName: 'Prisma 2 Case',
    contents: {
      milSpec: [
        { name: 'AUG | Tom Cat',                stattrak: ST },
        { name: 'AWP | Capillary',              stattrak: ST },
        { name: 'CZ75-Auto | Distressed',       stattrak: ST },
        { name: 'Desert Eagle | Blue Ply',      stattrak: ST },
        { name: 'MP5-SD | Desert Strike',       stattrak: ST },
        { name: 'Negev | Prototype',            stattrak: ST },
        { name: 'R8 Revolver | Bone Forged',    stattrak: ST },
      ],
      restricted: [
        { name: 'P2000 | Acid Etched',          stattrak: ST },
        { name: 'Sawed-Off | Apocalypto',       stattrak: ST },
        { name: 'SCAR-20 | Enforcer',           stattrak: ST },
        { name: 'SG 553 | Darkwing',            stattrak: ST },
        { name: 'SSG 08 | Fever Dream',         stattrak: ST },
      ],
      classified: [
        { name: 'AK-47 | Phantom Disruptor',    stattrak: ST },
        { name: 'MAC-10 | Disco Tech',          stattrak: ST },
        { name: 'MAG-7 | Justice',              stattrak: ST },
      ],
      covert: [
        { name: 'M4A1-S | Player Two',          stattrak: ST },
        { name: 'Glock-18 | Bullet Queen',      stattrak: ST },
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
        { name: 'Dual Berettas | Elite 1.6',    stattrak: ST },
        { name: 'Tec-9 | Flash Out',            stattrak: ST },
        { name: 'MAC-10 | Classic Crate',       stattrak: ST },
        { name: 'MAG-7 | Popdog',               stattrak: ST },
        { name: 'SCAR-20 | Assault',            stattrak: ST },
        { name: 'FAMAS | Decommissioned',       stattrak: ST },
        { name: 'Glock-18 | Sacrifice',         stattrak: ST },
      ],
      restricted: [
        { name: 'M249 | Aztec',                 stattrak: ST },
        { name: 'MP5-SD | Agent',               stattrak: ST },
        { name: 'Five-SeveN | Buddy',           stattrak: ST },
        { name: 'P250 | Inferno',               stattrak: ST },
        { name: 'UMP-45 | Plastique',           stattrak: ST },
      ],
      classified: [
        { name: 'MP9 | Hydra',                  stattrak: ST },
        { name: 'P90 | Nostalgia',              stattrak: ST },
        { name: 'AUG | Death by Puppy',         stattrak: ST },
      ],
      covert: [
        { name: 'AWP | Wildfire',               stattrak: ST },
        { name: 'FAMAS | Commemoration',        stattrak: ST },
      ],
      rareSpecial: cs20KnifePool(),
    },
  },

  {
    id: 'shattered-web-case',
    name: 'Shattered Web Case',
    marketName: 'Shattered Web Case',
    contents: {
      milSpec: [
        { name: 'MP5-SD | Acid Wash',           stattrak: ST },
        { name: 'Nova | Plume',                 stattrak: ST },
        { name: 'G3SG1 | Black Sand',           stattrak: ST },
        { name: 'R8 Revolver | Memento',        stattrak: ST },
        { name: 'Dual Berettas | Balance',      stattrak: ST },
        { name: 'SCAR-20 | Torn',              stattrak: ST },
        { name: 'M249 | Warbird',               stattrak: ST },
      ],
      restricted: [
        { name: 'PP-Bizon | Embargo',           stattrak: ST },
        { name: 'AK-47 | Rat Rod',              stattrak: ST },
        { name: 'AUG | Arctic Wolf',            stattrak: ST },
        { name: 'MP7 | Neon Ply',              stattrak: ST },
        { name: 'P2000 | Obsidian',             stattrak: ST },
      ],
      classified: [
        { name: 'Tec-9 | Decimator',            stattrak: ST },
        { name: 'SG 553 | Colony IV',           stattrak: ST },
        { name: 'SSG 08 | Bloodshot',           stattrak: ST },
      ],
      covert: [
        { name: 'AWP | Containment Breach',     stattrak: ST },
        { name: 'MAC-10 | Stalker',             stattrak: ST },
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
        { name: 'FAMAS | Crypsis',              stattrak: ST },
        { name: 'AK-47 | Uncharted',            stattrak: ST },
        { name: 'MAC-10 | Whitefish',           stattrak: ST },
        { name: 'Galil AR | Akoben',            stattrak: ST },
        { name: 'MP7 | Mischief',               stattrak: ST },
        { name: 'P250 | Verdigris',             stattrak: ST },
        { name: 'P90 | Off World',              stattrak: ST },
      ],
      restricted: [
        { name: 'AWP | Atheris',                stattrak: ST },
        { name: 'Tec-9 | Bamboozle',            stattrak: ST },
        { name: 'Desert Eagle | Light Rail',    stattrak: ST },
        { name: 'MP5-SD | Gauss',               stattrak: ST },
        { name: 'UMP-45 | Moonrise',            stattrak: ST },
      ],
      classified: [
        { name: 'R8 Revolver | Skull Crusher',  stattrak: ST },
        { name: 'AUG | Momentum',               stattrak: ST },
        { name: 'XM1014 | Incinegator',         stattrak: ST },
      ],
      covert: [
        { name: 'Five-SeveN | Angry Mob',       stattrak: ST },
        { name: 'M4A4 | The Emperor',           stattrak: ST },
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
        { name: 'AUG | Amber Slipstream',       stattrak: ST },
        { name: 'Dual Berettas | Shred',        stattrak: ST },
        { name: 'Glock-18 | Warhawk',           stattrak: ST },
        { name: 'MP9 | Capillary',              stattrak: ST },
        { name: 'P90 | Traction',               stattrak: ST },
        { name: 'R8 Revolver | Survivalist',    stattrak: ST },
        { name: 'Tec-9 | Snek-9',              stattrak: ST },
      ],
      restricted: [
        { name: 'CZ75-Auto | Eco',              stattrak: ST },
        { name: 'G3SG1 | High Seas',            stattrak: ST },
        { name: 'Nova | Toy Soldier',           stattrak: ST },
        { name: 'AWP | PAW',                    stattrak: ST },
        { name: 'MP7 | Powercore',              stattrak: ST },
      ],
      classified: [
        { name: 'M4A1-S | Nightmare',           stattrak: ST },
        { name: 'Sawed-Off | Devourer',         stattrak: ST },
        { name: 'FAMAS | Eye of Athena',        stattrak: ST },
      ],
      covert: [
        { name: 'AK-47 | Neon Rider',           stattrak: ST },
        { name: 'Desert Eagle | Code Red',      stattrak: ST },
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
        { name: 'MP9 | Modest Threat',          stattrak: ST },
        { name: 'Glock-18 | Oxide Blaze',       stattrak: ST },
        { name: 'Nova | Wood Fired',            stattrak: ST },
        { name: 'M4A4 | Magnesium',             stattrak: ST },
        { name: 'Sawed-Off | Black Sand',       stattrak: ST },
        { name: 'SG 553 | Danger Close',        stattrak: ST },
        { name: 'Tec-9 | Fubar',               stattrak: ST },
      ],
      restricted: [
        { name: 'G3SG1 | Scavenger',            stattrak: ST },
        { name: 'Galil AR | Signal',            stattrak: ST },
        { name: 'MAC-10 | Pipe Down',           stattrak: ST },
        { name: 'P250 | Nevermore',             stattrak: ST },
        { name: 'USP-S | Flashback',            stattrak: ST },
      ],
      classified: [
        { name: 'UMP-45 | Momentum',            stattrak: ST },
        { name: 'Desert Eagle | Mecha Industries', stattrak: ST },
        { name: 'MP5-SD | Phosphor',            stattrak: ST },
      ],
      covert: [
        { name: 'AK-47 | Asiimov',              stattrak: ST },
        { name: 'AWP | Neo-Noir',               stattrak: ST },
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
        { name: 'PP-Bizon | Night Riot',        stattrak: ST },
        { name: 'Five-SeveN | Flame Test',      stattrak: ST },
        { name: 'MP9 | Black Sand',             stattrak: ST },
        { name: 'P2000 | Urban Hazard',         stattrak: ST },
        { name: 'R8 Revolver | Grip',           stattrak: ST },
        { name: 'SG 553 | Aloha',               stattrak: ST },
        { name: 'XM1014 | Oxide Blaze',         stattrak: ST },
      ],
      restricted: [
        { name: 'Glock-18 | Moonrise',          stattrak: ST },
        { name: 'Negev | Lionfish',             stattrak: ST },
        { name: 'Nova | Wild Six',              stattrak: ST },
        { name: 'MAG-7 | SWAG-7',              stattrak: ST },
        { name: 'UMP-45 | Arctic Wolf',         stattrak: ST },
      ],
      classified: [
        { name: 'AUG | Stymphalian',            stattrak: ST },
        { name: 'AWP | Mortis',                 stattrak: ST },
        { name: 'USP-S | Cortex',               stattrak: ST },
      ],
      covert: [
        { name: 'M4A4 | Neo-Noir',              stattrak: ST },
        { name: 'MP7 | Bloodsport',             stattrak: ST },
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
        { name: 'Sawed-Off | Morris',           stattrak: ST },
        { name: 'AUG | Triqua',                 stattrak: ST },
        { name: 'G3SG1 | Hunter',               stattrak: ST },
        { name: 'Glock-18 | Off World',         stattrak: ST },
        { name: 'MAC-10 | Oceanic',             stattrak: ST },
        { name: 'Tec-9 | Cracked Opal',         stattrak: ST },
        { name: 'SCAR-20 | Jungle Slipstream',  stattrak: ST },
      ],
      restricted: [
        { name: 'MP9 | Goo',                    stattrak: ST },
        { name: 'SG 553 | Phantom',             stattrak: ST },
        { name: 'CZ75-Auto | Tacticat',         stattrak: ST },
        { name: 'UMP-45 | Exposure',            stattrak: ST },
        { name: 'XM1014 | Ziggy',               stattrak: ST },
      ],
      classified: [
        { name: 'PP-Bizon | High Roller',       stattrak: ST },
        { name: 'M4A1-S | Leaded Glass',        stattrak: ST },
        { name: 'R8 Revolver | Llama Cannon',   stattrak: ST },
      ],
      covert: [
        { name: 'AK-47 | The Empress',          stattrak: ST },
        { name: 'P250 | See Ya Later',          stattrak: ST },
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
        { name: 'CZ75-Auto | Polymer',          stattrak: ST },
        { name: 'Glock-18 | Ironwork',          stattrak: ST },
        { name: 'MP7 | Cirrus',                 stattrak: ST },
        { name: 'Galil AR | Black Sand',        stattrak: ST },
        { name: 'MP9 | Sand Scale',             stattrak: ST },
        { name: 'MAG-7 | Sonar',                stattrak: ST },
        { name: 'P2000 | Turf',                 stattrak: ST },
      ],
      restricted: [
        { name: 'Dual Berettas | Royal Consorts', stattrak: ST },
        { name: 'G3SG1 | Stinger',             stattrak: ST },
        { name: 'M4A1-S | Flashback',           stattrak: ST },
        { name: 'Nova | Gila',                  stattrak: ST },
        { name: 'USP-S | Cyrex',                stattrak: ST },
      ],
      classified: [
        { name: 'FAMAS | Mecha Industries',     stattrak: ST },
        { name: 'P90 | Shallow Grave',          stattrak: ST },
        { name: 'Sawed-Off | Wasteland Princess', stattrak: ST },
      ],
      covert: [
        { name: 'SSG 08 | Dragonfire',          stattrak: ST },
        { name: 'M4A4 | Buzz Kill',             stattrak: ST },
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
        { name: 'CZ75-Auto | Imprint',          stattrak: ST },
        { name: 'Five-SeveN | Scumbria',        stattrak: ST },
        { name: 'G3SG1 | Ventilator',           stattrak: ST },
        { name: 'Negev | Dazzle',               stattrak: ST },
        { name: 'P90 | Grim',                   stattrak: ST },
        { name: 'UMP-45 | Briefing',            stattrak: ST },
        { name: 'XM1014 | Slipstream',          stattrak: ST },
      ],
      restricted: [
        { name: 'Desert Eagle | Directive',     stattrak: ST },
        { name: 'Glock-18 | Weasel',            stattrak: ST },
        { name: 'MAG-7 | Petroglyph',           stattrak: ST },
        { name: 'SCAR-20 | Powercore',          stattrak: ST },
        { name: 'SG 553 | Triarch',             stattrak: ST },
      ],
      classified: [
        { name: 'AUG | Syd Mead',               stattrak: ST },
        { name: 'MP9 | Airlock',                stattrak: ST },
        { name: 'Tec-9 | Fuel Injector',        stattrak: ST },
      ],
      covert: [
        { name: 'AK-47 | Neon Revolution',      stattrak: ST },
        { name: 'FAMAS | Roll Cage',            stattrak: ST },
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
        { name: 'Five-SeveN | Violent Daimyo', stattrak: ST },
        { name: 'MAC-10 | Carnivore',           stattrak: ST },
        { name: 'Nova | Exo',                   stattrak: ST },
        { name: 'P250 | Iron Clad',             stattrak: ST },
        { name: 'PP-Bizon | Harvester',         stattrak: ST },
        { name: 'SG 553 | Aerial',              stattrak: ST },
        { name: 'Tec-9 | Ice Cap',              stattrak: ST },
      ],
      restricted: [
        { name: 'AUG | Aristocrat',             stattrak: ST },
        { name: 'AWP | Phobos',                 stattrak: ST },
        { name: 'P90 | Chopper',                stattrak: ST },
        { name: 'R8 Revolver | Reboot',         stattrak: ST },
        { name: 'Sawed-Off | Limelight',        stattrak: ST },
      ],
      classified: [
        { name: 'M4A4 | Desolate Space',        stattrak: ST },
        { name: 'P2000 | Imperial Dragon',      stattrak: ST },
        { name: 'SCAR-20 | Bloodsport',         stattrak: ST },
      ],
      covert: [
        { name: 'Glock-18 | Wasteland Rebel',   stattrak: ST },
        { name: 'M4A1-S | Mecha Industries',    stattrak: ST },
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

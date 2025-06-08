import {
  attackMultiplier,
  defenseMultiplier,
  healthMultiplier,
  allDamageMultiplier,
} from "../constants/const.ts";

let isGarrison = false;
let isRally = false;

const counterAttackMultiplier = 0.5;

const skillDamageReductionMultiplier = 2;

const wedgeNormalMultiplier = 0.5;
const archNormalMultiplier = 2;
const deltaNormalMultiplier = 2;
const pincerNormalMultiplier = 2;

const wedgeSkillDamageMultiplier = 2.5;
const archSkillDamageMultiplier = 0;
const deltaSkillDamageMultiplier = 0;
const pincerSkillDamageMultiplier = 0;

const wedgeComboDamageMultiplier = 0;
const archComboDamageMultiplier = 0;
const deltaComboDamageMultiplier = 2;
const pincerComboDamageMultiplier = 0;

export const baseInscriptionValues = {
  // Common inscriptions with base values
  Airtight: { wedge: 0, arch: 0, delta: 0, pincer: 12 },
  Alert: {
    wedge: 2.5 * counterAttackMultiplier,
    arch: 2.5 * counterAttackMultiplier,
    delta: 2.5 * counterAttackMultiplier,
    pincer: 2.5 * counterAttackMultiplier,
  },
  Armored: {
    wedge: 3.5 * defenseMultiplier,
    arch: 3.5 * defenseMultiplier,
    delta: 3.5 * defenseMultiplier,
    pincer: 3.5 * defenseMultiplier,
  },
  Artisan: {
    wedge: 3 * wedgeSkillDamageMultiplier + 1 * counterAttackMultiplier,
    arch: 3 * archSkillDamageMultiplier + 1 * counterAttackMultiplier,
    delta: 3 * deltaSkillDamageMultiplier + 1 * counterAttackMultiplier,
    pincer: 3 * pincerSkillDamageMultiplier + 1 * counterAttackMultiplier,
  },
  Assertive: {
    wedge: 2 * allDamageMultiplier,
    arch: 2 * allDamageMultiplier,
    delta: 2 * allDamageMultiplier,
    pincer: 2 * allDamageMultiplier,
  },
  "Battle Ready": { wedge: 0, arch: 2, delta: 0, pincer: 0 },
  Balanced: { wedge: 12, arch: 0, delta: 0, pincer: 0 },
  Ballistics: {
    wedge: 1.5 * counterAttackMultiplier,
    arch: 1.5 * counterAttackMultiplier,
    delta: 1.5 * counterAttackMultiplier,
    pincer: 1.5 * counterAttackMultiplier,
  },
  Bellicose: {
    wedge: 1 * allDamageMultiplier,
    arch: 1 * allDamageMultiplier,
    delta: 1 * allDamageMultiplier,
    pincer: 1 * allDamageMultiplier,
  },
  Bluster: { wedge: 0, arch: 0, delta: 0, pincer: 0 },
  "Boiling Blood": { wedge: 8, arch: 0, delta: 0, pincer: 0 },
  Brave: {
    wedge: 5 * counterAttackMultiplier,
    arch: 5 * counterAttackMultiplier,
    delta: 5 * counterAttackMultiplier,
    pincer: 5 * counterAttackMultiplier,
  },
  Brawler: {
    wedge: 2.5 * wedgeSkillDamageMultiplier + 1 * counterAttackMultiplier,
    arch: 2.5 * archSkillDamageMultiplier + 1 * counterAttackMultiplier,
    delta: 2.5 * deltaSkillDamageMultiplier + 1 * counterAttackMultiplier,
    pincer: 2.5 * pincerSkillDamageMultiplier + 1 * counterAttackMultiplier,
  },
  Breaker: {
    wedge: 3 * defenseMultiplier,
    arch: 3 * defenseMultiplier,
    delta: 3 * defenseMultiplier,
    pincer: 3 * defenseMultiplier,
  },
  Brutal: {
    wedge: 3.5 * attackMultiplier,
    arch: 3.5 * attackMultiplier,
    delta: 3.5 * attackMultiplier,
    pincer: 3.5 * attackMultiplier,
  },
  Butterfly: { wedge: 0, arch: 0, delta: 12, pincer: 0 },
  Calm: {
    wedge: 2 * attackMultiplier,
    arch: 2 * attackMultiplier,
    delta: 2 * attackMultiplier,
    pincer: 2 * attackMultiplier,
  },
  Causative: { wedge: 0, arch: 0, delta: 4, pincer: 0 },
  Cohesive: {
    wedge: 0.5 * allDamageMultiplier,
    arch: 0.5 * allDamageMultiplier,
    delta: 0.5 * allDamageMultiplier,
    pincer: 0.5 * allDamageMultiplier,
  },
  Counterer: {
    wedge: 3 * counterAttackMultiplier,
    arch: 3 * counterAttackMultiplier,
    delta: 3 * counterAttackMultiplier,
    pincer: 3 * counterAttackMultiplier,
  },
  Crazed: { wedge: 2, arch: 1, delta: 1, pincer: 1 },
  Daring: {
    wedge: 2.5 * wedgeSkillDamageMultiplier + 1 * counterAttackMultiplier,
    arch: 2.5 * archSkillDamageMultiplier + 1 * counterAttackMultiplier,
    delta: 2.5 * deltaSkillDamageMultiplier + 1 * counterAttackMultiplier,
    pincer: 2.5 * pincerSkillDamageMultiplier + 1 * counterAttackMultiplier,
  },
  Defiant: { wedge: 2, arch: 1, delta: 1, pincer: 1 },
  Deflecter: {
    wedge: 3 * wedgeComboDamageMultiplier,
    arch: 3 * archComboDamageMultiplier,
    delta: 3 * deltaComboDamageMultiplier,
    pincer: 3 * pincerComboDamageMultiplier,
  },
  Demolisher: { wedge: 0, arch: 0, delta: 0, pincer: 16 },
  Desperado: {
    wedge: 1 * allDamageMultiplier,
    arch: 1 * allDamageMultiplier,
    delta: 1 * allDamageMultiplier,
    pincer: 1 * allDamageMultiplier,
  },
  Destructive: { wedge: 0, arch: -4, delta: 0, pincer: 0 },
  Determined: { wedge: 0, arch: 0, delta: 6, pincer: 0 },
  Devious: {
    wedge: 2.5 * wedgeSkillDamageMultiplier + 1 * counterAttackMultiplier,
    arch: 2.5 * archSkillDamageMultiplier + 1 * counterAttackMultiplier,
    delta: 2.5 * deltaSkillDamageMultiplier + 1 * counterAttackMultiplier,
    pincer: 2.5 * pincerSkillDamageMultiplier + 1 * counterAttackMultiplier,
  },
  Eclipsed: {
    wedge: 2.5 * skillDamageReductionMultiplier,
    arch: 2.5 * skillDamageReductionMultiplier,
    delta: 2.5 * skillDamageReductionMultiplier,
    pincer: 2.5 * skillDamageReductionMultiplier,
  },
  Elite: {
    wedge: 1 * allDamageMultiplier,
    arch: 1 * allDamageMultiplier,
    delta: 1 * allDamageMultiplier,
    pincer: 1 * allDamageMultiplier,
  },
  Embattled: { wedge: 5, arch: 5, delta: 5, pincer: 5 },
  Enduring: {
    wedge: 3 * counterAttackMultiplier,
    arch: 3 * counterAttackMultiplier,
    delta: 3 * counterAttackMultiplier,
    pincer: 3 * counterAttackMultiplier,
  },
  Enraged: {
    wedge: 2.5 * wedgeSkillDamageMultiplier + 1 * counterAttackMultiplier,
    arch: 2.5 * archSkillDamageMultiplier + 1 * counterAttackMultiplier,
    delta: 2.5 * deltaSkillDamageMultiplier + 1 * counterAttackMultiplier,
    pincer: 2.5 * pincerSkillDamageMultiplier + 1 * counterAttackMultiplier,
  },
  "Evasive (Emblem)": {
    wedge: 1 * allDamageMultiplier,
    arch: 1 * allDamageMultiplier,
    delta: 1 * allDamageMultiplier,
    pincer: 1 * allDamageMultiplier,
  },
  "Evasive (Instrument)": {
    wedge: 2.5 * counterAttackMultiplier,
    arch: 2.5 * counterAttackMultiplier,
    delta: 2.5 * counterAttackMultiplier,
    pincer: 2.5 * counterAttackMultiplier,
  },
  "Even Keeled": { wedge: 0, arch: 8, delta: 0, pincer: 0 },
  Fearless: { wedge: 0, arch: 26, delta: 0, pincer: 0 },
  Fearsome: {
    wedge: 1 * allDamageMultiplier,
    arch: 1 * allDamageMultiplier,
    delta: 1 * allDamageMultiplier,
    pincer: 1 * allDamageMultiplier,
  },
  "Fine Horse": { wedge: 1, arch: 1, delta: 1, pincer: 1 },
  Fit: {
    wedge: 3.5 * healthMultiplier,
    arch: 3.5 * healthMultiplier,
    delta: 3.5 * healthMultiplier,
    pincer: 3.5 * healthMultiplier,
  },
  Flurry: { wedge: 0, arch: 0, delta: 22, pincer: 0 },
  "Focus Fire": {
    wedge: 4 * wedgeSkillDamageMultiplier,
    arch: 0,
    delta: 0,
    pincer: 0,
  },
  Forceful: { wedge: 0, arch: 10, delta: 0, pincer: 0 },
  Furious: {
    wedge: 3 * wedgeSkillDamageMultiplier + 1.5 * counterAttackMultiplier,
    arch: 3 * archSkillDamageMultiplier + 1.5 * counterAttackMultiplier,
    delta: 3 * deltaSkillDamageMultiplier + 1.5 * counterAttackMultiplier,
    pincer: 3 * pincerSkillDamageMultiplier + 1.5 * counterAttackMultiplier,
  },
  Galloping: { wedge: 1, arch: 1, delta: 1, pincer: 1 },
  Guarded: {
    wedge: 1.5 * skillDamageReductionMultiplier,
    arch: 1.5 * skillDamageReductionMultiplier,
    delta: 1.5 * skillDamageReductionMultiplier,
    pincer: 1.5 * skillDamageReductionMultiplier,
  },
  Guardians: { wedge: 1, arch: 1, delta: 1, pincer: 1 },
  Hardy: {
    wedge: 3.5 * healthMultiplier,
    arch: 3.5 * healthMultiplier,
    delta: 3.5 * healthMultiplier,
    pincer: 3.5 * healthMultiplier,
  },
  "Hard Headed": { wedge: 0, arch: 0, delta: 0, pincer: 1 },
  Haste: { wedge: 1, arch: 1, delta: 1, pincer: 1 },
  Hunter: { wedge: 19, arch: 0, delta: 0, pincer: 0 },
  Hurried: { wedge: 1, arch: 1, delta: 1, pincer: 1 },
  Infamy: {
    wedge: 3.5 * attackMultiplier,
    arch: 3.5 * attackMultiplier,
    delta: 3.5 * attackMultiplier,
    pincer: 3.5 * attackMultiplier,
  },
  Intrepid: {
    wedge: 10 * wedgeSkillDamageMultiplier,
    arch: 0,
    delta: 0,
    pincer: 0,
  },
  Invincible: { wedge: 16, arch: 0, delta: 0, pincer: 0 },
  Imploder: { wedge: 0, arch: 0, delta: 0, pincer: 6 },
  "Iron Wall": {
    wedge: 1.5 * counterAttackMultiplier,
    arch: 1.5 * counterAttackMultiplier,
    delta: 1.5 * counterAttackMultiplier,
    pincer: 1.5 * counterAttackMultiplier,
  },
  Lineshot: {
    wedge: 1 * wedgeSkillDamageMultiplier,
    arch: 1 * archSkillDamageMultiplier,
    delta: 1 * deltaSkillDamageMultiplier,
    pincer: 1 * pincerSkillDamageMultiplier,
  },
  Loosed: {
    wedge: 1 * wedgeNormalMultiplier,
    arch: 1 * archNormalMultiplier,
    delta: 1 * deltaNormalMultiplier,
    pincer: 1 * pincerNormalMultiplier,
  },
  Metallics: {
    wedge: 3.5 * defenseMultiplier,
    arch: 3.5 * defenseMultiplier,
    delta: 3.5 * defenseMultiplier,
    pincer: 3.5 * defenseMultiplier,
  },
  Militant: {
    wedge: 1.5 * wedgeNormalMultiplier,
    arch: 1.5 * archNormalMultiplier,
    delta: 1.5 * deltaNormalMultiplier,
    pincer: 1.5 * pincerNormalMultiplier,
  },
  Onslaught: {
    wedge: 1.5 * wedgeNormalMultiplier,
    arch: 1.5 * archNormalMultiplier,
    delta: 1.5 * deltaNormalMultiplier,
    pincer: 1.5 * pincerNormalMultiplier,
  },
  Patronage: { wedge: 1, arch: 1, delta: 1, pincer: 1 },
  Primed: { wedge: 1, arch: 1, delta: 1, pincer: 1 },
  Phalanx: { wedge: 1, arch: 1, delta: 1, pincer: 1 },
  Pulverize: {
    wedge: 1 * wedgeNormalMultiplier,
    arch: 1 * archNormalMultiplier,
    delta: 1 * deltaNormalMultiplier,
    pincer: 1 * pincerNormalMultiplier,
  },
  Pursuer: {
    wedge: 2 * allDamageMultiplier,
    arch: 2 * allDamageMultiplier,
    delta: 2 * allDamageMultiplier,
    pincer: 2 * allDamageMultiplier,
  },
  Pummeler: { wedge: 0, arch: 0, delta: 4, pincer: 0 },
  Raider: { wedge: 0, arch: 0, delta: 0, pincer: 6 },
  Rapacious: {
    wedge: 1.5 * allDamageMultiplier,
    arch: 1.5 * allDamageMultiplier,
    delta: 1.5 * allDamageMultiplier,
    pincer: 1.5 * allDamageMultiplier,
  },
  Rattling: { wedge: 0, arch: 0, delta: 0, pincer: 10 },
  Rebuff: {
    wedge: 2.5 * counterAttackMultiplier,
    arch: 2.5 * counterAttackMultiplier,
    delta: 2.5 * counterAttackMultiplier,
    pincer: 2.5 * counterAttackMultiplier,
  },
  Relentless: { wedge: 0, arch: 0, delta: 8, pincer: 0 },
  Requital: {
    wedge: 1.5 * wedgeNormalMultiplier,
    arch: 1.5 * archNormalMultiplier,
    delta: 1.5 * deltaNormalMultiplier,
    pincer: 1.5 * pincerNormalMultiplier,
  },
  Resistant: {
    wedge: 2.5 * counterAttackMultiplier,
    arch: 2.5 * counterAttackMultiplier,
    delta: 2.5 * counterAttackMultiplier,
    pincer: 2.5 * counterAttackMultiplier,
  },
  Respite: {
    wedge: 1 * allDamageMultiplier,
    arch: 1 * allDamageMultiplier,
    delta: 1 * allDamageMultiplier,
    pincer: 1 * allDamageMultiplier,
  },
  Retaliation: {
    wedge: 2.5 * counterAttackMultiplier,
    arch: 2.5 * counterAttackMultiplier,
    delta: 2.5 * counterAttackMultiplier,
    pincer: 2.5 * counterAttackMultiplier,
  },
  Robust: {
    wedge: 3.5 * healthMultiplier,
    arch: 3.5 * healthMultiplier,
    delta: 3.5 * healthMultiplier,
    pincer: 3.5 * healthMultiplier,
  },
  Sentries: { wedge: 1, arch: 1, delta: 1, pincer: 1 },
  Shielded: {
    wedge: 3.5 * defenseMultiplier,
    arch: 3.5 * defenseMultiplier,
    delta: 3.5 * defenseMultiplier,
    pincer: 3.5 * defenseMultiplier,
  },
  Siegework: { wedge: 1, arch: 1, delta: 1, pincer: 1 },
  Smite: {
    wedge: 2 * wedgeNormalMultiplier,
    arch: 2 * archNormalMultiplier,
    delta: 2 * deltaNormalMultiplier,
    pincer: 2 * pincerNormalMultiplier,
  },
  Spiked: {
    wedge: 3.5 * attackMultiplier,
    arch: 3.5 * attackMultiplier,
    delta: 3.5 * attackMultiplier,
    pincer: 3.5 * attackMultiplier,
  },
  Spirited: {
    wedge: 1 * wedgeNormalMultiplier,
    arch: 1 * archNormalMultiplier,
    delta: 1 * deltaNormalMultiplier,
    pincer: 1 * pincerNormalMultiplier,
  },
  Steelskin: { wedge: 0, arch: 0, delta: 24, pincer: 0 },
  "Straight to the Point": { wedge: 0, arch: 19, delta: 0, pincer: 0 },
  Strategic: { wedge: 1, arch: 1, delta: 1, pincer: 1 },
  Striker: {
    wedge: 1.5 * wedgeNormalMultiplier,
    arch: 1.5 * archNormalMultiplier,
    delta: 1.5 * deltaNormalMultiplier,
    pincer: 1.5 * pincerNormalMultiplier,
  },
  Swift: { wedge: 1, arch: 1, delta: 1, pincer: 1 },
  Thrasher: { wedge: 0, arch: 0, delta: 18, pincer: 0 },
  Thundering: { wedge: 0, arch: 0, delta: 0, pincer: 26 },
  Toppler: { wedge: 0, arch: 0, delta: 0, pincer: 24 },
  Tremors: { wedge: 1, arch: 1, delta: 1, pincer: 1 },
  Unstoppable: { wedge: 16, arch: 0, delta: 0, pincer: 0 },
  Unswerving: { wedge: 0, arch: 1, delta: 0, pincer: 0 },
  Uplifting: {
    wedge: 1 * wedgeSkillDamageMultiplier,
    arch: 1 * archSkillDamageMultiplier,
    delta: 1 * deltaSkillDamageMultiplier,
    pincer: 1 * pincerSkillDamageMultiplier,
  },
  Valiant: {
    wedge: 1 * allDamageMultiplier,
    arch: 1 * allDamageMultiplier,
    delta: 1 * allDamageMultiplier,
    pincer: 1 * allDamageMultiplier,
  },
  Vitality: {
    wedge: 3.5 * healthMultiplier,
    arch: 3.5 * healthMultiplier,
    delta: 3.5 * healthMultiplier,
    pincer: 3.5 * healthMultiplier,
  },
  Warcry: {
    wedge: 3.5 * attackMultiplier,
    arch: 3.5 * attackMultiplier,
    delta: 3.5 * attackMultiplier,
    pincer: 3.5 * attackMultiplier,
  },
  Ward: {
    wedge: 1 * allDamageMultiplier,
    arch: 1 * allDamageMultiplier,
    delta: 1 * allDamageMultiplier,
    pincer: 1 * allDamageMultiplier,
  },
  Warflames: {
    wedge: 1 * allDamageMultiplier,
    arch: 1 * allDamageMultiplier,
    delta: 1 * allDamageMultiplier,
    pincer: 1 * allDamageMultiplier,
  },
  Warhunger: {
    wedge: 1.5 * wedgeNormalMultiplier,
    arch: 1.5 * archNormalMultiplier,
    delta: 1.5 * deltaNormalMultiplier,
    pincer: 1.5 * pincerNormalMultiplier,
  },
  Watchman: {
    wedge: 1.5 * allDamageMultiplier,
    arch: 1.5 * allDamageMultiplier,
    delta: 1.5 * allDamageMultiplier,
    pincer: 1.5 * allDamageMultiplier,
  },
  "Well Clad": {
    wedge: 3.5 * defenseMultiplier,
    arch: 3.5 * defenseMultiplier,
    delta: 3.5 * defenseMultiplier,
    pincer: 3.5 * defenseMultiplier,
  },
};

function calculateInscriptionScore(inscriptions: string[], formation: string) {
  let score = 0;
  for (const inscrip of inscriptions) {
    const val = baseInscriptionValues[inscrip][formation];
    score += val;
  }
  return score;
}

export default function inscriptionScoreCalculator(
  inscriptions: string[],
  formation: string,
  formType: string
) {
  if (formType === "garrison") {
    isGarrison = true;
  }

  if (formType === "rally") {
    isRally = true;
  }

  switch (formation) {
    case "wedge":
      return calculateInscriptionScore(inscriptions, formation);
    case "arch":
      return calculateInscriptionScore(inscriptions, formation);
    case "delta":
      return calculateInscriptionScore(inscriptions, formation);
    case "pincer":
      return calculateInscriptionScore(inscriptions, formation);
    default:
      return 0;
  }
}

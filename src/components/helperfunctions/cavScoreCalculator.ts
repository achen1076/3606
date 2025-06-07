import { gearCalculator } from "../../constants/gearCalculator.tsx";

export function calculateCavalryScore(formValues: any) {
  const { formType, vip, citySkin, equipment, armaments, inscription } =
    formValues;

  let score = 0;

  let attackMultiplier = 1;
  let defenseMultiplier = 1.1;
  let healthMultiplier = 1.25;
  let allDamageMultiplier = 3;

  // Adjust multipliers based on form type
  const isGarrison = formType === "garrison" ? 1 : 0;
  const isRally = formType === "rally" ? 1 : 0;
  const isField = formType === "field" ? 1 : 0;

  // Calculate score based on VIP level
  if (vip === "13-16") {
    score +=
      5 * attackMultiplier + 5 * defenseMultiplier + 5 * healthMultiplier;
  } else if (vip === "17") {
    score +=
      5 * attackMultiplier +
      5 * defenseMultiplier +
      5 * healthMultiplier +
      5 * allDamageMultiplier;
  } else if (vip === "18") {
    score +=
      5 * attackMultiplier +
      5 * defenseMultiplier +
      5 * healthMultiplier +
      5 * allDamageMultiplier;
  } else if (vip === "19+") {
    score +=
      10 * attackMultiplier +
      5 * defenseMultiplier +
      5 * healthMultiplier +
      5 * allDamageMultiplier;
  }

  let citySkinScore = 0;

  if (citySkin.length > 0) {
    for (let i = 0; i < citySkin.length; i++) {
      const skin: string = citySkin[i];
      if (skin === "skin-cav-attack-5") {
        if (5 * attackMultiplier > citySkinScore) {
          citySkinScore = 5 * attackMultiplier;
        }
      } else if (skin === "skin-cav-defense-5") {
        if (5 * defenseMultiplier > citySkinScore) {
          citySkinScore = 5 * defenseMultiplier;
        }
      } else if (skin === "skin-cav-health-5") {
        if (5 * healthMultiplier > citySkinScore) {
          citySkinScore = 5 * healthMultiplier;
        }
      } else if (skin === "skin-cav-attack-10") {
        if (10 * attackMultiplier > citySkinScore) {
          citySkinScore = 10 * attackMultiplier;
        }
      } else if (skin === "skin-cav-defense-10") {
        if (10 * defenseMultiplier > citySkinScore) {
          citySkinScore = 10 * defenseMultiplier;
        }
      } else if (skin === "skin-cav-health-10") {
        if (10 * healthMultiplier > citySkinScore) {
          citySkinScore = 10 * healthMultiplier;
        }
      } else if (skin === "skin-cav-attack-15") {
        if (15 * attackMultiplier > citySkinScore) {
          citySkinScore = 15 * attackMultiplier;
        }
      } else if (skin === "skin-cav-defense-15") {
        if (15 * defenseMultiplier > citySkinScore) {
          citySkinScore = 15 * defenseMultiplier;
        }
      } else if (skin === "skin-cav-health-15") {
        if (15 * healthMultiplier > citySkinScore) {
          citySkinScore = 15 * healthMultiplier;
        }
      } else if (skin === "skin-cav-attack-20") {
        if (20 * attackMultiplier > citySkinScore) {
          citySkinScore = 20 * attackMultiplier;
        }
      } else if (skin === "skin-cav-defense-20") {
        if (20 * defenseMultiplier > citySkinScore) {
          citySkinScore = 20 * defenseMultiplier;
        }
      } else if (skin === "skin-cav-health-20") {
        if (20 * healthMultiplier > citySkinScore) {
          citySkinScore = 20 * healthMultiplier;
        }
      } else if (skin === "skin-12-attack") {
        if (12 * attackMultiplier > citySkinScore) {
          citySkinScore = 12 * attackMultiplier;
        }
      } else if (skin === "skin-12-defense") {
        if (12 * defenseMultiplier > citySkinScore) {
          citySkinScore = 12 * defenseMultiplier;
        }
      }
    }
  }

  score += citySkinScore;

  // Equipment Score

  score += gearCalculator(formValues);

  //Armaments

  score += Number(armaments["cavalryAttack"]) * attackMultiplier;
  score += Number(armaments["cavalryDefense"]) * defenseMultiplier;
  score += Number(armaments["cavalryHealth"]) * healthMultiplier;
  score += Number(armaments["allDamage"]) * allDamageMultiplier;

  //Inscriptions

  const inscriptionValues = {
    Robust: 3.5 * healthMultiplier,
    Vitality: 3.5 * healthMultiplier,
    Fit: 3.5 * healthMultiplier,
    Hardy: 3.5 * healthMultiplier,
    "Well Clad": 3.5 * defenseMultiplier,
    Armored: 3.5 * defenseMultiplier,
    Shielded: 3.5 * defenseMultiplier,
    Metallic: 3.5 * defenseMultiplier,
    Warcry: 3.5 * attackMultiplier,
    Brutal: 3.5 * attackMultiplier,
    Spiked: 3.5 * attackMultiplier,
    Infamy: 3.5 * attackMultiplier,
    Valiant: 1 * allDamageMultiplier,
    Fearsome: 1 * allDamageMultiplier,
    Warflames: 1 * allDamageMultiplier,
    Elite: 1 * allDamageMultiplier,
    Assertive: 2 * allDamageMultiplier * (isRally + isField),
    Sentries: 2 * allDamageMultiplier * isGarrison,

    Destructive: -4,
    "Straight to the Point": 19,
    Invincible: 16,
    Fearless: 26,
    Hunter: 19,
    Unstoppable: 16,
    Balanced: 12,
    Intrepid: 28,
    Thrasher: 18,
    Butterfly: 9,
    Steelskin: 24,
    Flurry: 22,
    Toppler: 24,
    Airtight: 12,
    Thundering: 26,
    Demolisher: 16,

    "Battle Ready": 2,
    "Even Keeled": 8,
    Unswerving: 0,
    Forceful: 10,
    Crazed: 2,
    "Boiling Blood": 8,
    Defiant: 2,
    "Focus Fire": 11,
    Pummeler: 4,
    Causative: 4,
    Determined: 6,
    Relentless: 8,
    Imploder: 5,
    Raider: 5,
    Hardheaded: 0,
    Rattling: 10,
  };

  inscription.forEach((inscrip: string) => {
    if (inscriptionValues[inscrip]) {
      score += inscriptionValues[inscrip];
    } else {
      score += 1;
    }
  });

  return score;
}

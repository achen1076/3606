import { gearCalculator } from "../../constants/gearCalculator.tsx";
import inscriptionScoreCalculator from "../../constants/inscriptionScore.tsx";

export function calculateArcherScore(formValues: any) {
  const { formType, vip, citySkin, armaments, inscription, formation } =
    formValues;

  let score = 0;

  let attackMultiplier = 1;
  let defenseMultiplier = 1.1;
  let healthMultiplier = 1.25;
  let allDamageMultiplier = 3;

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

  // Calculate score based on city skin
  let citySkinScore = 0;

  if (citySkin.length > 0) {
    for (let i = 0; i < citySkin.length; i++) {
      const skin = citySkin[i];
      if (skin === "skin-archer-attack-5") {
        if (5 * attackMultiplier > citySkinScore) {
          citySkinScore = 5 * attackMultiplier;
        }
      } else if (skin === "skin-archer-defense-5") {
        if (5 * defenseMultiplier > citySkinScore) {
          citySkinScore = 5 * defenseMultiplier;
        }
      } else if (skin === "skin-archer-health-5") {
        if (5 * healthMultiplier > citySkinScore) {
          citySkinScore = 5 * healthMultiplier;
        }
      } else if (skin === "skin-archer-attack-10") {
        if (10 * attackMultiplier > citySkinScore) {
          citySkinScore = 10 * attackMultiplier;
        }
      } else if (skin === "skin-archer-defense-10") {
        if (10 * defenseMultiplier > citySkinScore) {
          citySkinScore = 10 * defenseMultiplier;
        }
      } else if (skin === "skin-archer-health-10") {
        if (10 * healthMultiplier > citySkinScore) {
          citySkinScore = 10 * healthMultiplier;
        }
      } else if (skin === "skin-archer-attack-15") {
        if (15 * attackMultiplier > citySkinScore) {
          citySkinScore = 15 * attackMultiplier;
        }
      } else if (skin === "skin-archer-defense-15") {
        if (15 * defenseMultiplier > citySkinScore) {
          citySkinScore = 15 * defenseMultiplier;
        }
      } else if (skin == "skin-archer-health-15") {
        if (15 * healthMultiplier > citySkinScore) {
          citySkinScore = 15 * healthMultiplier;
        }
      } else if (skin === "skin-archer-attack-20") {
        if (20 * attackMultiplier > citySkinScore) {
          citySkinScore = 20 * attackMultiplier;
        }
      } else if (skin === "skin-archer-defense-20") {
        if (20 * defenseMultiplier > citySkinScore) {
          citySkinScore = 20 * defenseMultiplier;
        }
      } else if (skin === "skin-archer-health-20") {
        if (20 * healthMultiplier > citySkinScore) {
          citySkinScore = 20 * healthMultiplier;
        }
      } else if (skin === "skin-attack-12") {
        if (12 * attackMultiplier > citySkinScore) {
          citySkinScore = 12 * attackMultiplier;
        }
      } else if (skin === "skin-defense-12") {
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

  score += Number(armaments["archerAttack"]) * attackMultiplier;
  score += Number(armaments["archerDefense"]) * defenseMultiplier;
  score += Number(armaments["archerHealth"]) * healthMultiplier;
  score += Number(armaments["allDamage"]) * allDamageMultiplier;

  //Inscriptions
  const inscriptionScore = inscriptionScoreCalculator(
    inscription,
    formation,
    formType
  );

  score += inscriptionScore;

  return score;
}

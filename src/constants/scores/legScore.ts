import {
  attackMultiplier,
  defenseMultiplier,
  healthMultiplier,
  allDamageMultiplier,
  healthFlatAddition,
  legIconic5,
} from "../const.ts";

export default function legScoreCalculator(
  gear: string,
  iconic: number,
  specialTalent: boolean,
  formType: string
) {
  const isGarrison = formType === "garrison" ? 1 : 0;
  const isRally = formType === "rally" ? 1 : 0;
  const isField = formType === "field" ? 1 : 0;

  const legScore = {
    "cav-epic-leg": [
      8 * healthMultiplier,
      8 * healthMultiplier,
      8 * healthMultiplier,
      8 * healthMultiplier,
      8 * healthMultiplier,
      8 * healthMultiplier,
    ],
    "inf-epic-leg": [
      8 * healthMultiplier,
      8 * healthMultiplier,
      8 * healthMultiplier,
      8 * healthMultiplier,
      8 * healthMultiplier,
      8 * healthMultiplier,
    ],
    "arch-fanatic-leg": [
      7.5 * defenseMultiplier,
      7.5 * defenseMultiplier,
      7.5 * defenseMultiplier,
      7.5 * defenseMultiplier,
      7.5 * defenseMultiplier,
      7.5 * defenseMultiplier,
    ],
    "arch-revival-leg": [
      8 * defenseMultiplier,
      8 * defenseMultiplier,
      8 * defenseMultiplier,
      8 * defenseMultiplier,
      8 * defenseMultiplier,
      8 * defenseMultiplier,
    ],
    "cav-hellish-leg": [
      11 * attackMultiplier,
      11 * attackMultiplier + healthFlatAddition,
      11 * attackMultiplier + healthFlatAddition + 2 * healthMultiplier,
      11 * attackMultiplier + healthFlatAddition + 2 * healthMultiplier,
      11 * attackMultiplier +
        healthFlatAddition +
        2 * healthMultiplier +
        1 * allDamageMultiplier * (isGarrison + isField),
      11 * attackMultiplier +
        healthFlatAddition +
        2 * healthMultiplier +
        1 * allDamageMultiplier * (isGarrison + isField) +
        legIconic5,
    ],
    "cav-ash-leg": [
      12 * defenseMultiplier,
      12 * defenseMultiplier + healthFlatAddition,
      12 * defenseMultiplier + healthFlatAddition + 2 * healthMultiplier,
      12 * defenseMultiplier + healthFlatAddition + 2 * healthMultiplier,
      12 * defenseMultiplier +
        healthFlatAddition +
        2 * healthMultiplier +
        1 * allDamageMultiplier * (isGarrison + isField),
      12 * defenseMultiplier +
        healthFlatAddition +
        2 * healthMultiplier +
        1 * allDamageMultiplier * (isGarrison + isField) +
        legIconic5,
    ],
    "inf-empire-leg": [
      11 * defenseMultiplier,
      11 * defenseMultiplier + healthFlatAddition,
      11 * defenseMultiplier + healthFlatAddition + 1 * healthMultiplier,
      11 * defenseMultiplier + healthFlatAddition + 1 * healthMultiplier,
      11 * defenseMultiplier +
        healthFlatAddition +
        1 * healthMultiplier +
        1 * allDamageMultiplier * (isGarrison + isField),
      11 * defenseMultiplier +
        healthFlatAddition +
        1 * healthMultiplier +
        1 * allDamageMultiplier * (isGarrison + isField) +
        legIconic5,
    ],
    "inf-night-leg": [
      12 * defenseMultiplier,
      12 * defenseMultiplier + healthFlatAddition,
      12 * defenseMultiplier + healthFlatAddition + 1 * healthMultiplier,
      12 * defenseMultiplier + healthFlatAddition + 1 * healthMultiplier,
      12 * defenseMultiplier +
        healthFlatAddition +
        1 * healthMultiplier +
        1 * allDamageMultiplier * (isGarrison + isField),
      12 * defenseMultiplier +
        healthFlatAddition +
        1 * healthMultiplier +
        1 * allDamageMultiplier * (isGarrison + isField) +
        legIconic5,
    ],
    "arch-dragon-leg": [
      11 * attackMultiplier,
      11 * attackMultiplier + healthFlatAddition,
      11 * attackMultiplier + healthFlatAddition + 1 * healthMultiplier,
      11 * attackMultiplier + healthFlatAddition + 1 * healthMultiplier,
      11 * attackMultiplier +
        healthFlatAddition +
        1 * healthMultiplier +
        1 * allDamageMultiplier * (isGarrison + isField),
      11 * attackMultiplier +
        healthFlatAddition +
        1 * healthMultiplier +
        1 * allDamageMultiplier * (isGarrison + isField) +
        legIconic5,
    ],
    "arch-tasset-leg": [
      12 * defenseMultiplier,
      12 * defenseMultiplier + healthFlatAddition,
      12 * defenseMultiplier + healthFlatAddition + 1 * healthMultiplier,
      12 * defenseMultiplier + healthFlatAddition + 1 * healthMultiplier,
      12 * defenseMultiplier +
        healthFlatAddition +
        1 * healthMultiplier +
        1 * allDamageMultiplier * (isGarrison + isField),
      12 * defenseMultiplier +
        healthFlatAddition +
        1 * healthMultiplier +
        1 * allDamageMultiplier * (isGarrison + isField) +
        legIconic5,
    ],
    "leadership-leg": [
      8 * healthMultiplier,
      8 * healthMultiplier + healthFlatAddition,
      8 * healthMultiplier + healthFlatAddition + 1 * healthMultiplier,
      8 * healthMultiplier + healthFlatAddition + 1 * healthMultiplier,
      8 * healthMultiplier +
        healthFlatAddition +
        1 * healthMultiplier +
        1 * allDamageMultiplier * (isGarrison + isField),
      8 * healthMultiplier +
        healthFlatAddition +
        1 * healthMultiplier +
        1 * allDamageMultiplier * (isGarrison + isField) +
        legIconic5,
    ],
  };


  if (specialTalent) {
    return legScore[gear][iconic] * 1.3;
  } else {
    return legScore[gear][iconic];
  }
}

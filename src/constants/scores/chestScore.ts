import {
  attackMultiplier,
  defenseMultiplier,
  healthMultiplier,
  allDamageMultiplier,
  defenseFlatAddition,
  chestIconic5,
} from "../const.ts";

export default function chestScoreCalculator(
  gear: string,
  iconic: number,
  specialTalent: boolean,
  formType: string
) {
  const isGarrison = formType === "garrison" ? 1 : 0;
  const isRally = formType === "rally" ? 1 : 0;
  const isField = formType === "field" ? 1 : 0;

  const chestScore = {
    "cav-epic-chest": [
      8 * defenseMultiplier,
      8 * defenseMultiplier,
      8 * defenseMultiplier,
      8 * defenseMultiplier,
      8 * defenseMultiplier,
      8 * defenseMultiplier,
    ],
    "inf-epic-chest": [
      8 * attackMultiplier,
      8 * attackMultiplier,
      8 * attackMultiplier,
      8 * attackMultiplier,
      8 * attackMultiplier,
      8 * attackMultiplier,
    ],
    "arch-epic-chest": [
      7.5 * attackMultiplier,
      7.5 * attackMultiplier,
      7.5 * attackMultiplier,
      7.5 * attackMultiplier,
      7.5 * attackMultiplier,
      7.5 * attackMultiplier,
    ],
    "cav-hellish-chest": [
      11 * healthMultiplier,
      11 * healthMultiplier + defenseFlatAddition,
      11 * healthMultiplier + defenseFlatAddition + 1 * healthMultiplier,
      11 * healthMultiplier + defenseFlatAddition + 1 * healthMultiplier,
      11 * healthMultiplier +
        defenseFlatAddition +
        1 * healthMultiplier +
        1 * allDamageMultiplier * (isGarrison + isField),
      11 * healthMultiplier +
        defenseFlatAddition +
        1 * healthMultiplier +
        1 * allDamageMultiplier * (isGarrison + isField) +
        chestIconic5,
    ],
    "cav-shadow-chest": [
      12 * attackMultiplier,
      12 * attackMultiplier + defenseFlatAddition,
      12 * attackMultiplier + defenseFlatAddition + 1 * healthMultiplier,
      12 * attackMultiplier + defenseFlatAddition + 1 * healthMultiplier,
      12 * attackMultiplier +
        defenseFlatAddition +
        1 * healthMultiplier +
        1 * allDamageMultiplier * (isGarrison + isField),
      12 * attackMultiplier +
        defenseFlatAddition +
        1 * healthMultiplier +
        1 * allDamageMultiplier * (isGarrison + isField) +
        chestIconic5,
    ],
    "inf-eternal-chest": [
      11 * attackMultiplier,
      11 * attackMultiplier + defenseFlatAddition,
      11 * attackMultiplier + defenseFlatAddition + 1 * attackMultiplier,
      11 * attackMultiplier + defenseFlatAddition + 1 * attackMultiplier,
      11 * attackMultiplier +
        defenseFlatAddition +
        1 * attackMultiplier +
        1 * allDamageMultiplier * (isGarrison + isRally),
      11 * attackMultiplier +
        defenseFlatAddition +
        1 * attackMultiplier +
        1 * allDamageMultiplier * (isGarrison + isRally) +
        chestIconic5,
    ],
    "inf-hope-chest": [
      12 * defenseMultiplier,
      12 * defenseMultiplier + defenseFlatAddition,
      12 * defenseMultiplier + defenseFlatAddition + 1 * attackMultiplier,
      12 * defenseMultiplier + defenseFlatAddition + 1 * attackMultiplier,
      12 * defenseMultiplier +
        defenseFlatAddition +
        1 * attackMultiplier +
        1 * allDamageMultiplier * (isGarrison + isRally),
      12 * defenseMultiplier +
        defenseFlatAddition +
        1 * attackMultiplier +
        1 * allDamageMultiplier * (isGarrison + isRally) +
        chestIconic5,
    ],
    "arch-dragon-chest": [
      11 * healthMultiplier,
      11 * healthMultiplier + defenseFlatAddition,
      11 * healthMultiplier + defenseFlatAddition + 1 * defenseMultiplier,
      11 * healthMultiplier + defenseFlatAddition + 1 * defenseMultiplier,
      11 * healthMultiplier +
        defenseFlatAddition +
        1 * defenseMultiplier +
        1 * allDamageMultiplier * (isGarrison + isRally),
      11 * healthMultiplier +
        defenseFlatAddition +
        1 * defenseMultiplier +
        1 * allDamageMultiplier * (isGarrison + isRally) +
        chestIconic5,
    ],
    "arch-milky-chest": [
      12 * healthMultiplier,
      12 * healthMultiplier + defenseFlatAddition,
      12 * healthMultiplier + defenseFlatAddition + 1 * defenseMultiplier,
      12 * healthMultiplier + defenseFlatAddition + 1 * defenseMultiplier,
      12 * healthMultiplier +
        defenseFlatAddition +
        1 * defenseMultiplier +
        1 * allDamageMultiplier * (isGarrison + isRally),
      12 * healthMultiplier +
        defenseFlatAddition +
        1 * defenseMultiplier +
        1 * allDamageMultiplier * (isGarrison + isRally) +
        chestIconic5,
    ],
    "leadership-chest": [
      8 * defenseMultiplier,
      8 * defenseMultiplier + defenseFlatAddition,
      8 * defenseMultiplier + defenseFlatAddition + 1 * defenseMultiplier,
      8 * defenseMultiplier +
        defenseFlatAddition +
        1 * defenseMultiplier +
        1 * allDamageMultiplier * (isGarrison + isRally),
      8 * defenseMultiplier +
        defenseFlatAddition +
        1 * defenseMultiplier +
        1 * allDamageMultiplier * (isGarrison + isRally) +
        chestIconic5,
    ],
  };

  
  if (specialTalent) {
    return chestScore[gear][iconic] * 1.3;
  } else {
    return chestScore[gear][iconic];
  }
}

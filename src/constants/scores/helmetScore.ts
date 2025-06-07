import {
  attackMultiplier,
  defenseMultiplier,
  healthMultiplier,
  allDamageMultiplier,
  helmetIconic5,
  defenseFlatAddition,
  attackFlatAddition,
} from "../const.ts";

export default function helmetScoreCalculator(
  gear: string,
  iconic: number,
  specialTalent: boolean,
  formType: string
) {
  const isGarrison = formType === "garrison" ? 1 : 0;
  const isRally = formType === "rally" ? 1 : 0;
  const isField = formType === "field" ? 1 : 0;

  const helmetScore = {
    "cav-epic-helmet": [
      8 * attackMultiplier,
      8 * attackMultiplier,
      8 * attackMultiplier,
      8 * attackMultiplier,
      8 * attackMultiplier,
      8 * attackMultiplier,
    ],
    "inf-epic-helmet": [
      8 * attackMultiplier,
      8 * attackMultiplier,
      8 * attackMultiplier,
      8 * attackMultiplier,
      8 * attackMultiplier,
      8 * attackMultiplier,
    ],
    "arch-epic-helmet": [
      7.5 * defenseMultiplier,
      7.5 * defenseMultiplier,
      7.5 * defenseMultiplier,
      7.5 * defenseMultiplier,
      7.5 * defenseMultiplier,
      7.5 * defenseMultiplier,
    ],
    "cav-hellish-helmet": [
      11 * defenseMultiplier,
      11 * defenseMultiplier + defenseFlatAddition,
      11 * defenseMultiplier + defenseFlatAddition + 1 * attackMultiplier,
      11 * defenseMultiplier + defenseFlatAddition + 1 * attackMultiplier,
      11 * defenseMultiplier +
        defenseFlatAddition +
        1 * attackMultiplier +
        1 * allDamageMultiplier * (isGarrison + isField),
      11 * defenseMultiplier +
        defenseFlatAddition +
        1 * attackMultiplier +
        1 * allDamageMultiplier * (isGarrison + isField) +
        helmetIconic5,
    ],
    "cav-kvk-helmet": [
      15 * defenseMultiplier,
      15 * defenseMultiplier + defenseFlatAddition,
      15 * defenseMultiplier + defenseFlatAddition + 1.5 * attackMultiplier,
      15 * defenseMultiplier + defenseFlatAddition + 1.5 * attackMultiplier,
      15 * defenseMultiplier +
        defenseFlatAddition +
        1.5 * attackMultiplier +
        1.5 * allDamageMultiplier * (isGarrison + isField),
      15 * defenseMultiplier +
        defenseFlatAddition +
        1.5 * attackMultiplier +
        1.5 * allDamageMultiplier * (isGarrison + isField) +
        helmetIconic5,
    ],
    "inf-eternal-helmet": [
      11 * defenseMultiplier,
      11 * defenseMultiplier + defenseFlatAddition,
      11 * defenseMultiplier + defenseFlatAddition + 1 * healthMultiplier,
      11 * defenseMultiplier + defenseFlatAddition + 1 * healthMultiplier,
      11 * defenseMultiplier +
        defenseFlatAddition +
        1 * healthMultiplier +
        1 * allDamageMultiplier * (isGarrison + isField),
      11 * defenseMultiplier +
        defenseFlatAddition +
        1 * healthMultiplier +
        1 * allDamageMultiplier * (isGarrison + isField) +
        helmetIconic5,
    ],
    "inf-kvk-helmet": [
      15 * defenseMultiplier,
      15 * defenseMultiplier + defenseFlatAddition,
      15 * defenseMultiplier + defenseFlatAddition + 1.5 * healthMultiplier,
      15 * defenseMultiplier + defenseFlatAddition + 1.5 * healthMultiplier,
      15 * defenseMultiplier +
        defenseFlatAddition +
        1.5 * healthMultiplier +
        1.5 * allDamageMultiplier * (isGarrison + isField),
      15 * defenseMultiplier +
        defenseFlatAddition +
        1.5 * healthMultiplier +
        1.5 * allDamageMultiplier * (isGarrison + isField) +
        helmetIconic5,
    ],
    "arch-dragon-helmet": [
      11 * attackMultiplier,
      11 * attackMultiplier + defenseFlatAddition,
      11 * attackMultiplier + defenseFlatAddition + 1 * healthMultiplier,
      11 * attackMultiplier + defenseFlatAddition + 1 * healthMultiplier,
      11 * attackMultiplier +
        defenseFlatAddition +
        1 * healthMultiplier +
        1 * allDamageMultiplier * (isGarrison + isField),
      11 * attackMultiplier +
        defenseFlatAddition +
        1 * healthMultiplier +
        1 * allDamageMultiplier * (isGarrison + isField) +
        helmetIconic5,
    ],
    "arch-kvk-helmet": [
      15 * attackMultiplier,
      15 * attackMultiplier + defenseFlatAddition,
      15 * attackMultiplier + defenseFlatAddition + 1.5 * healthMultiplier,
      15 * attackMultiplier + defenseFlatAddition + 1.5 * healthMultiplier,
      15 * attackMultiplier +
        defenseFlatAddition +
        1.5 * healthMultiplier +
        1.5 * allDamageMultiplier * (isGarrison + isField),
      15 * attackMultiplier +
        defenseFlatAddition +
        1.5 * healthMultiplier +
        1.5 * allDamageMultiplier * (isGarrison + isField) +
        helmetIconic5,
    ],
    "leadership-helmet": [
      8 * attackMultiplier,
      8 * attackMultiplier + attackFlatAddition,
      8 * attackMultiplier + attackFlatAddition + 1 * healthMultiplier,
      8 * attackMultiplier + attackFlatAddition + 1 * healthMultiplier,
      8 * attackMultiplier +
        attackFlatAddition +
        1 * healthMultiplier +
        1 * allDamageMultiplier * (isGarrison + isField),
      8 * attackMultiplier +
        attackFlatAddition +
        1 * healthMultiplier +
        1 * allDamageMultiplier * (isGarrison + isField) +
        helmetIconic5,
    ],
  };

  if (specialTalent) {
    return helmetScore[gear][iconic] * 1.3;
  } else {
    return helmetScore[gear][iconic];
  }
}

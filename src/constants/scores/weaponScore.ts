import {
  attackMultiplier,
  defenseMultiplier,
  healthMultiplier,
  attackFlatAddition,
  allDamageMultiplier,
  weaponIconic5,
} from "../const.ts";

export default function weaponScoreCalculator(
  gear: string,
  iconic: number,
  specialTalent: boolean,
  formType: string
) {
  const isGarrison = formType === "garrison" ? 1 : 0;
  const isRally = formType === "rally" ? 1 : 0;
  const isField = formType === "field" ? 1 : 0;

  const weaponScore = {
    "cav-epic-weapon": [
      13 * defenseMultiplier,
      13 * defenseMultiplier,
      13 * defenseMultiplier,
      13 * defenseMultiplier,
      13 * defenseMultiplier,
      13 * defenseMultiplier,
    ],
    "inf-epic-weapon": [
      13 * attackMultiplier,
      13 * attackMultiplier,
      13 * attackMultiplier,
      13 * attackMultiplier,
      13 * attackMultiplier,
      13 * attackMultiplier,
    ],
    "arch-epic-weapon": [
      13 * defenseMultiplier,
      13 * defenseMultiplier,
      13 * defenseMultiplier,
      13 * defenseMultiplier,
      13 * defenseMultiplier,
      13 * defenseMultiplier,
    ],
    "cav-hellish-weapon": [
      20 * attackMultiplier,
      20 * attackMultiplier + attackFlatAddition,
      20 * attackMultiplier + attackFlatAddition + 2 * defenseMultiplier,
      20 * attackMultiplier + attackFlatAddition + 2 * defenseMultiplier,
      20 * attackMultiplier +
        attackFlatAddition +
        2 * defenseMultiplier +
        2 * allDamageMultiplier * (isGarrison + isField),
      20 * attackMultiplier +
        attackFlatAddition +
        2 * defenseMultiplier +
        2 * allDamageMultiplier * (isGarrison + isField) +
        weaponIconic5,
    ],
    "cav-kvk-weapon": [
      25 * attackMultiplier,
      25 * attackMultiplier + attackFlatAddition,
      25 * attackMultiplier + attackFlatAddition + 2.5 * defenseMultiplier,
      25 * attackMultiplier + attackFlatAddition + 2.5 * defenseMultiplier,
      25 * attackMultiplier +
        attackFlatAddition +
        2.5 * defenseMultiplier +
        3 * allDamageMultiplier * (isGarrison + isField),
      25 * attackMultiplier +
        attackFlatAddition +
        2.5 * defenseMultiplier +
        3 * allDamageMultiplier * (isGarrison + isField) +
        weaponIconic5,
    ],
    "inf-eternal-weapon": [
      20 * attackMultiplier,
      20 * attackMultiplier + attackFlatAddition,
      20 * attackMultiplier + attackFlatAddition + 2 * healthMultiplier,
      20 * attackMultiplier + attackFlatAddition + 2 * healthMultiplier,
      20 * attackMultiplier +
        attackFlatAddition +
        2 * healthMultiplier +
        2 * allDamageMultiplier * (isGarrison + isField),
      20 * attackMultiplier +
        attackFlatAddition +
        2 * healthMultiplier +
        2 * allDamageMultiplier * (isGarrison + isField) +
        weaponIconic5,
    ],
    "inf-kvk-weapon": [
      25 * attackMultiplier,
      25 * attackMultiplier + attackFlatAddition,
      25 * attackMultiplier + attackFlatAddition + 2.5 * healthMultiplier,
      25 * attackMultiplier + attackFlatAddition + 2.5 * healthMultiplier,
      25 * attackMultiplier +
        attackFlatAddition +
        2.5 * healthMultiplier +
        3 * allDamageMultiplier * (isGarrison + isField),
      25 * attackMultiplier +
        attackFlatAddition +
        2.5 * healthMultiplier +
        3 * allDamageMultiplier * (isGarrison + isField) +
        weaponIconic5,
    ],
    "arch-dragon-weapon": [
      20 * defenseMultiplier,
      20 * defenseMultiplier + attackFlatAddition,
      20 * defenseMultiplier + attackFlatAddition + 2 * defenseMultiplier,
      20 * defenseMultiplier + attackFlatAddition + 2 * defenseMultiplier,
      20 * defenseMultiplier +
        attackFlatAddition +
        2 * defenseMultiplier +
        2 * allDamageMultiplier * (isGarrison + isField),
      20 * defenseMultiplier +
        attackFlatAddition +
        2 * defenseMultiplier +
        2 * allDamageMultiplier * (isGarrison + isField) +
        weaponIconic5,
    ],
    "arch-kvk-weapon": [
      25 * defenseMultiplier,
      25 * defenseMultiplier + attackFlatAddition,
      25 * defenseMultiplier + attackFlatAddition + 3 * defenseMultiplier,
      25 * defenseMultiplier + attackFlatAddition + 3 * defenseMultiplier,
      25 * defenseMultiplier +
        attackFlatAddition +
        3 * defenseMultiplier +
        2.5 * allDamageMultiplier * (isGarrison + isField),
      25 * defenseMultiplier +
        attackFlatAddition +
        3 * defenseMultiplier +
        2.5 * allDamageMultiplier * (isGarrison + isField) +
        weaponIconic5,
    ],
    "leadership-weapon": [
      15 * attackMultiplier,
      15 * attackMultiplier + attackFlatAddition,
      15 * attackMultiplier + attackFlatAddition + 2 * defenseMultiplier,
      15 * attackMultiplier + attackFlatAddition + 2 * defenseMultiplier,
      15 * attackMultiplier +
        attackFlatAddition +
        2 * defenseMultiplier +
        2 * allDamageMultiplier * (isGarrison + isField),
      15 * attackMultiplier +
        attackFlatAddition +
        2 * defenseMultiplier +
        2 * allDamageMultiplier * (isGarrison + isField) +
        weaponIconic5,
    ],
  };


  if (specialTalent) {
    return weaponScore[gear][iconic] * 1.3;
  } else {
    return weaponScore[gear][iconic];
  }
}

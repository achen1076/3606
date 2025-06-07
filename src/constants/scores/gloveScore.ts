import {
  attackMultiplier,
  defenseMultiplier,
  healthMultiplier,
  allDamageMultiplier,
  attackFlatAddition,
  defenseFlatAddition,
  healthFlatAddition,
} from "../const.ts";

export default function gloveScoreCalculator(
  gear: string,
  iconic: number,
  specialTalent: boolean,
  formType: string
) {
  const isGarrison = formType === "garrison" ? 1 : 0;
  const isRally = formType === "rally" ? 1 : 0;
  const isField = formType === "field" ? 1 : 0;

  const gloveScore = {
    "cav-epic-glove": [
      3 * attackMultiplier + 3 * healthMultiplier,
      3 * attackMultiplier + 3 * healthMultiplier,
      3 * attackMultiplier + 3 * healthMultiplier,
      3 * attackMultiplier + 3 * healthMultiplier,
      3 * attackMultiplier + 3 * healthMultiplier,
      3 * attackMultiplier + 3 * healthMultiplier,
    ],
    "inf-epic-glove": [
      5.5 * defenseMultiplier,
      5.5 * defenseMultiplier,
      5.5 * defenseMultiplier,
      5.5 * defenseMultiplier,
      5.5 * defenseMultiplier,
      5.5 * defenseMultiplier,
    ],
    "arch-epic-glove": [
      4.5 * attackMultiplier,
      4.5 * attackMultiplier,
      4.5 * attackMultiplier,
      4.5 * attackMultiplier,
      4.5 * attackMultiplier,
      4.5 * attackMultiplier,
    ],
    "cav-navar-glove": [
      8 * healthMultiplier,
      8 * healthMultiplier + attackFlatAddition,
      8 * healthMultiplier + attackFlatAddition + 1 * defenseMultiplier,
      8 * healthMultiplier + attackFlatAddition + 1 * defenseMultiplier,
      8 * healthMultiplier + attackFlatAddition + 1 * defenseMultiplier,
      8 * healthMultiplier + attackFlatAddition + 1 * defenseMultiplier,
    ],
    "cav-hellish-glove": [
      7.5 * defenseMultiplier,
      7.5 * defenseMultiplier + defenseFlatAddition,
      7.5 * defenseMultiplier + defenseFlatAddition + 1 * attackMultiplier,
      7.5 * defenseMultiplier + defenseFlatAddition + 1 * attackMultiplier,
      7.5 * defenseMultiplier + defenseFlatAddition + 1 * attackMultiplier,
      7.5 * defenseMultiplier + defenseFlatAddition + 1 * attackMultiplier,
    ],
    "inf-eternal-glove": [
      7.5 * defenseMultiplier,
      7.5 * defenseMultiplier + attackFlatAddition,
      7.5 * defenseMultiplier + attackFlatAddition + 1 * attackMultiplier,
      7.5 * defenseMultiplier + attackFlatAddition + 1 * attackMultiplier,
      7.5 * defenseMultiplier + attackFlatAddition + 1 * attackMultiplier,
      7.5 * defenseMultiplier + attackFlatAddition + 1 * attackMultiplier,
    ],
    "inf-sacred-glove": [
      8 * defenseMultiplier,
      8 * defenseMultiplier + attackFlatAddition,
      8 * defenseMultiplier + attackFlatAddition + 1 * attackMultiplier,
      8 * defenseMultiplier + attackFlatAddition + 1 * attackMultiplier,
      8 * defenseMultiplier + attackFlatAddition + 1 * attackMultiplier,
      8 * defenseMultiplier + attackFlatAddition + 1 * attackMultiplier,
    ],
    "arch-dragon-glove": [
      7.5 * attackMultiplier,
      7.5 * attackMultiplier + attackFlatAddition,
      7.5 * attackMultiplier + attackFlatAddition + 1 * attackMultiplier,
      7.5 * attackMultiplier + attackFlatAddition + 1 * attackMultiplier,
      7.5 * attackMultiplier + attackFlatAddition + 1 * attackMultiplier,
      7.5 * attackMultiplier + attackFlatAddition + 1 * attackMultiplier,
    ],
    "arch-ian-glove": [
      8 * attackMultiplier,
      8 * attackMultiplier + attackFlatAddition,
      8 * attackMultiplier + attackFlatAddition + 1 * attackMultiplier,
      8 * attackMultiplier + attackFlatAddition + 1 * attackMultiplier,
      8 * attackMultiplier + attackFlatAddition + 1 * attackMultiplier,
      8 * attackMultiplier + attackFlatAddition + 1 * attackMultiplier,
    ],
    "leadership-glove": [
      6 * defenseMultiplier,
      6 * defenseMultiplier + defenseFlatAddition,
      6 * defenseMultiplier + defenseFlatAddition + 1 * attackMultiplier,
      6 * defenseMultiplier + defenseFlatAddition + 1 * attackMultiplier,
      6 * defenseMultiplier + defenseFlatAddition + 1 * attackMultiplier,
      6 * defenseMultiplier + defenseFlatAddition + 1 * attackMultiplier,
    ],
  };

  if (specialTalent) {
    return gloveScore[gear][iconic] * 1.3;
  } else {
    return gloveScore[gear][iconic];
  }
}

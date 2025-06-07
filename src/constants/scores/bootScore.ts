import {
  attackMultiplier,
  defenseMultiplier,
  healthMultiplier,
  attackFlatAddition,
  defenseFlatAddition,
  healthFlatAddition,
} from "../const.ts";

export default function bootScoreCalculator(
  gear: string,
  iconic: number,
  specialTalent: boolean,
  formType: string
) {
  const isGarrison = formType === "garrison" ? 1 : 0;
  const isRally = formType === "rally" ? 1 : 0;
  const isField = formType === "field" ? 1 : 0;

  const bootScore = {
    "cav-epic-boot": [
      5.5 * attackMultiplier,
      5.5 * attackMultiplier,
      5.5 * attackMultiplier,
      5.5 * attackMultiplier,
      5.5 * attackMultiplier,
      5.5 * attackMultiplier,
    ],
    "inf-epic-boot": [
      5.5 * defenseMultiplier,
      5.5 * defenseMultiplier,
      5.5 * defenseMultiplier,
      5.5 * defenseMultiplier,
      5.5 * defenseMultiplier,
      5.5 * defenseMultiplier,
    ],
    "arch-epic-boot": [
      5.5 * healthMultiplier,
      5.5 * healthMultiplier,
      5.5 * healthMultiplier,
      5.5 * healthMultiplier,
      5.5 * healthMultiplier,
      5.5 * healthMultiplier,
    ],
    "cav-hellish-boot": [
      7.5 * healthMultiplier,
      7.5 * healthMultiplier + healthFlatAddition,
      7.5 * healthMultiplier + healthFlatAddition + 1 * attackMultiplier,
      7.5 * healthMultiplier + healthFlatAddition + 1 * attackMultiplier,
      7.5 * healthMultiplier + healthFlatAddition + 1 * attackMultiplier,
      7.5 * healthMultiplier + healthFlatAddition + 1 * attackMultiplier,
    ],
    "cav-mountain-boot": [
      8 * attackMultiplier,
      8 * attackMultiplier + healthFlatAddition,
      8 * attackMultiplier + healthFlatAddition + 1 * attackMultiplier,
      8 * attackMultiplier + healthFlatAddition + 1 * attackMultiplier,
      8 * attackMultiplier + healthFlatAddition + 1 * attackMultiplier,
      8 * attackMultiplier + healthFlatAddition + 1 * attackMultiplier,
    ],
    "inf-shio-boot": [
      8 * defenseMultiplier,
      8 * defenseMultiplier + healthFlatAddition,
      8 * defenseMultiplier + healthFlatAddition + 1 * defenseMultiplier,
      8 * defenseMultiplier + healthFlatAddition + 1 * defenseMultiplier,
      8 * defenseMultiplier + healthFlatAddition + 1 * defenseMultiplier,
      8 * defenseMultiplier + healthFlatAddition + 1 * defenseMultiplier,
    ],
    "inf-eternal-boot": [
      7.5 * defenseMultiplier,
      7.5 * defenseMultiplier + healthFlatAddition,
      7.5 * defenseMultiplier + healthFlatAddition + 1 * defenseMultiplier,
      7.5 * defenseMultiplier + healthFlatAddition + 1 * defenseMultiplier,
      7.5 * defenseMultiplier + healthFlatAddition + 1 * defenseMultiplier,
      7.5 * defenseMultiplier + healthFlatAddition + 1 * defenseMultiplier,
    ],
    "arch-dragon-boot": [
      7.5 * defenseMultiplier,
      7.5 * defenseMultiplier + healthFlatAddition,
      7.5 * defenseMultiplier + healthFlatAddition + 1 * attackMultiplier,
      7.5 * defenseMultiplier + healthFlatAddition + 1 * attackMultiplier,
      7.5 * defenseMultiplier + healthFlatAddition + 1 * attackMultiplier,
      7.5 * defenseMultiplier + healthFlatAddition + 1 * attackMultiplier,
    ],
    "arch-commander-boot": [
      7.5 * defenseMultiplier,
      7.5 * defenseMultiplier + healthFlatAddition,
      7.5 * defenseMultiplier + healthFlatAddition + 1 * attackMultiplier,
      7.5 * defenseMultiplier + healthFlatAddition + 1 * attackMultiplier,
      7.5 * defenseMultiplier + healthFlatAddition + 1 * attackMultiplier,
      7.5 * defenseMultiplier + healthFlatAddition + 1 * attackMultiplier,
    ],
    "leadership-boot": [
      6 * healthMultiplier,
      6 * healthMultiplier + healthFlatAddition,
      6 * healthMultiplier + healthFlatAddition + 1 * attackMultiplier,
      6 * healthMultiplier + healthFlatAddition + 1 * attackMultiplier,
      6 * healthMultiplier + healthFlatAddition + 1 * attackMultiplier,
      6 * healthMultiplier + healthFlatAddition + 1 * attackMultiplier,
    ],
  };


  if (specialTalent) {
    return bootScore[gear][iconic] * 1.3;
  } else {
    return bootScore[gear][iconic];
  }
}

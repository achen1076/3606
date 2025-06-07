import {
  healthMultiplier,
  healthFlatAddition,
  accessoryIconic5,
} from "../const.ts";

export default function accessoryScoreCalculator(
  accessory: string,
  iconic: number,
  specialTalent: boolean,
  formType: string
) {
  const isGarrison = formType === "garrison" ? 1 : 0;
  const isRally = formType === "rally" ? 1 : 0;
  const isField = formType === "field" ? 1 : 0;

  const accessoryScore = {
    "epic-accessory": [2, 2, 2, 2, 2, 2],
    ring: [
      5,
      5 + healthFlatAddition,
      5 + healthFlatAddition + 1 * healthMultiplier,
      5 + healthFlatAddition + 1 * healthMultiplier,
      5 +
        healthFlatAddition +
        1 * healthMultiplier +
        2 * (isGarrison + isRally),
      5 +
        healthFlatAddition +
        1 * healthMultiplier +
        2 * (isGarrison + isRally) +
        accessoryIconic5,
    ],
    horn: [
      5,
      5 + healthFlatAddition,
      5 + healthFlatAddition + 1 * healthMultiplier,
      5 + healthFlatAddition + 1 * healthMultiplier,
      5 +
        healthFlatAddition +
        1 * healthMultiplier +
        2 * (isGarrison + isRally),
      5 +
        healthFlatAddition +
        1 * healthMultiplier +
        2 * (isGarrison + isRally) +
        accessoryIconic5,
    ],
    drum: [
      5,
      5 + healthFlatAddition,
      5 + healthFlatAddition + 1 * healthMultiplier,
      5 + healthFlatAddition + 1 * healthMultiplier,
      5 +
        healthFlatAddition +
        1 * healthMultiplier +
        2 * (isGarrison + isRally),
      5 +
        healthFlatAddition +
        1 * healthMultiplier +
        2 * (isGarrison + isRally) +
        accessoryIconic5,
    ],
    "greatest-glory": [
      5,
      5 + healthFlatAddition,
      5 + healthFlatAddition + 1 * healthMultiplier,
      5 + healthFlatAddition + 1 * healthMultiplier,
      5 +
        healthFlatAddition +
        1 * healthMultiplier +
        2 * (isGarrison + isRally),
      5 +
        healthFlatAddition +
        1 * healthMultiplier +
        2 * (isGarrison + isRally) +
        accessoryIconic5,
    ],
    other: [
      5,
      5 + healthFlatAddition,
      5 + healthFlatAddition + 1 * healthMultiplier,
      5 + healthFlatAddition + 1 * healthMultiplier,
      5 +
        healthFlatAddition +
        1 * healthMultiplier +
        2 * (isGarrison + isRally),
      5 +
        healthFlatAddition +
        1 * healthMultiplier +
        2 * (isGarrison + isRally) +
        accessoryIconic5,
    ],
  };

  if (specialTalent) {
    return accessoryScore[accessory][iconic] * 1.3;
  } else {
    return accessoryScore[accessory][iconic];
  }
}

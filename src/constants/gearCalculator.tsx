import helmetScoreCalculator from "./scores/helmetScore.ts";
import weaponScoreCalculator from "./scores/weaponScore.ts";
import chestScoreCalculator from "./scores/chestScore.ts";
import legScoreCalculator from "./scores/legScore.ts";
import bootsScoreCalculator from "./scores/bootScore.ts";
import glovesScoreCalculator from "./scores/gloveScore.ts";
import accessoryScoreCalculator from "./scores/accessoryScore.ts";

export const gearCalculator = (formValues: any) => {
  const { equipment, formType } = formValues;

  const helmet = equipment["helmet"];
  const helmetIconic = Number(equipment["helmetIconic"]);
  const helmetSpecialTalent = equipment["helmetSpecialTalent"];

  const helmetScore = helmetScoreCalculator(
    helmet,
    helmetIconic,
    helmetSpecialTalent,
    formType
  );

  const weapon = equipment["weapon"];
  const weaponIconic = Number(equipment["weaponIconic"]);
  const weaponSpecialTalent = equipment["weaponSpecialTalent"];

  const weaponScore = weaponScoreCalculator(
    weapon,
    weaponIconic,
    weaponSpecialTalent,
    formType
  );

  const chest = equipment["chest"];
  const chestIconic = Number(equipment["chestIconic"]);
  const chestSpecialTalent = equipment["chestSpecialTalent"];

  const chestScore = chestScoreCalculator(
    chest,
    chestIconic,
    chestSpecialTalent,
    formType
  );

  const leg = equipment["leg"];
  const legIconic = Number(equipment["legIconic"]);
  const legSpecialTalent = equipment["legSpecialTalent"];

  const legScore = legScoreCalculator(
    leg,
    legIconic,
    legSpecialTalent,
    formType
  );

  const boots = equipment["boot"];
  const bootsIconic = Number(equipment["bootIconic"]);
  const bootsSpecialTalent = equipment["bootSpecialTalent"];

  const bootsScore = bootsScoreCalculator(
    boots,
    bootsIconic,
    bootsSpecialTalent,
    formType
  );

  const gloves = equipment["glove"];
  const glovesIconic = Number(equipment["gloveIconic"]);
  const glovesSpecialTalent = equipment["gloveSpecialTalent"];

  const glovesScore = glovesScoreCalculator(
    gloves,
    glovesIconic,
    glovesSpecialTalent,
    formType
  );

  const accessory1 = equipment["accessory1"];
  const accessory1Iconic = Number(equipment["accessory1Iconic"]);
  const accessory1SpecialTalent = equipment["accessory1SpecialTalent"];

  const accessory1Score = accessoryScoreCalculator(
    accessory1,
    accessory1Iconic,
    accessory1SpecialTalent,
    formType
  );

  const accessory2 = equipment["accessory2"];
  const accessory2Iconic = Number(equipment["accessory2Iconic"]);
  const accessory2SpecialTalent = equipment["accessory2SpecialTalent"];

  const accessory2Score = accessoryScoreCalculator(
    accessory2,
    accessory2Iconic,
    accessory2SpecialTalent,
    formType
  );

  const totalScore =
    helmetScore +
    weaponScore +
    chestScore +
    legScore +
    bootsScore +
    glovesScore +
    accessory1Score +
    accessory2Score;

  return totalScore;
};

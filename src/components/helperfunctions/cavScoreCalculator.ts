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

  let equipmentScore = 0;

  let equipmentScoreChart = {
    //Helmet
    epic_helmet: [
      8 * attackMultiplier,
      8 * attackMultiplier,
      8 * attackMultiplier,
      8 * attackMultiplier,
      8 * attackMultiplier,
      8 * attackMultiplier,
    ],
    set_helmet: [
      11 * defenseMultiplier,
      11 * defenseMultiplier + 10,
      11 * defenseMultiplier + 10 + 1.5 * attackMultiplier,
      11 * defenseMultiplier + 10 + 1.5 * attackMultiplier,
      11 * defenseMultiplier +
        10 +
        1.5 * attackMultiplier +
        1.5 * allDamageMultiplier * isGarrison,
      11 * defenseMultiplier +
        10 +
        1.5 * attackMultiplier +
        1.5 * allDamageMultiplier * isGarrison +
        10,
    ],
    kvk_helmet: [
      15 * defenseMultiplier,
      15 * defenseMultiplier + 10,
      15 * defenseMultiplier + 10 + 1.5 * attackMultiplier,
      15 * defenseMultiplier + 10 + 1.5 * attackMultiplier,
      15 * defenseMultiplier +
        10 +
        1.5 * attackMultiplier +
        1.5 * allDamageMultiplier * isGarrison,
      15 * defenseMultiplier +
        10 +
        1.5 * attackMultiplier +
        1.5 * allDamageMultiplier * isGarrison +
        10,
    ],

    //Chest
    epic_chest: [
      8 * defenseMultiplier,
      8 * defenseMultiplier,
      8 * defenseMultiplier,
      8 * defenseMultiplier,
      8 * defenseMultiplier,
      8 * defenseMultiplier,
    ],
    shadow_chest: [
      12 * attackMultiplier,
      12 * attackMultiplier + 10,
      12 * attackMultiplier + 10 + 1 * healthMultiplier,
      12 * attackMultiplier + 10 + 1 * healthMultiplier,
      12 * attackMultiplier +
        10 +
        1 * healthMultiplier +
        1 * allDamageMultiplier * isGarrison,
      12 * attackMultiplier +
        10 +
        1 * healthMultiplier +
        1 * allDamageMultiplier * isGarrison +
        10,
    ],
    hellish_chest: [
      11 * healthMultiplier,
      11 * healthMultiplier + 10,
      11 * healthMultiplier + 10 + 1 * attackMultiplier,
      11 * healthMultiplier + 10 + 1 * attackMultiplier,
      11 * healthMultiplier +
        10 +
        1 * attackMultiplier +
        1 * allDamageMultiplier * isGarrison,
      11 * healthMultiplier +
        10 +
        1 * attackMultiplier +
        1 * allDamageMultiplier * isGarrison +
        10,
    ],

    //Gloves
    epic_gloves: [
      3 * attackMultiplier + 3 * healthMultiplier,
      3 * attackMultiplier + 3 * healthMultiplier,
      3 * attackMultiplier + 3 * healthMultiplier,
      3 * attackMultiplier + 3 * healthMultiplier,
      3 * attackMultiplier + 3 * healthMultiplier,
      3 * attackMultiplier + 3 * healthMultiplier,
    ],
    navars_gloves: [
      8 * healthMultiplier,
      8 * healthMultiplier + 10,
      8 * healthMultiplier + 10 + 1 * defenseMultiplier,
      8 * healthMultiplier + 10 + 1 * defenseMultiplier,
      8 * healthMultiplier + 10 + 1 * defenseMultiplier,
      8 * healthMultiplier + 10 + 1 * defenseMultiplier,
    ],
    hellish_gloves: [
      7.5 * defenseMultiplier,
      7.5 * defenseMultiplier + 10,
      7.5 * defenseMultiplier + 10 + 1 * defenseMultiplier,
      7.5 * defenseMultiplier + 10 + 1 * defenseMultiplier,
      7.5 * defenseMultiplier + 10 + 1 * defenseMultiplier,
      7.5 * defenseMultiplier + 10 + 1 * defenseMultiplier,
    ],

    //Boots
    epic_boots: [
      5.5 * attackMultiplier,
      5.5 * attackMultiplier,
      5.5 * attackMultiplier,
      5.5 * attackMultiplier,
      5.5 * attackMultiplier,
      5.5 * attackMultiplier,
    ],
    hellish_boots: [
      7.5 * healthMultiplier,
      7.5 * healthMultiplier + 10,
      7.5 * healthMultiplier + 10 + 1 * attackMultiplier,
      7.5 * healthMultiplier + 10 + 1 * attackMultiplier,
      7.5 * healthMultiplier + 10 + 1 * attackMultiplier,
      7.5 * healthMultiplier + 10 + 1 * attackMultiplier,
    ],

    //Legs
    epic_legs: [
      8 * healthMultiplier,
      8 * healthMultiplier,
      8 * healthMultiplier,
      8 * healthMultiplier,
      8 * healthMultiplier,
      8 * healthMultiplier,
    ],
    hellish_legs: [
      11 * attackMultiplier,
      11 * attackMultiplier + 10,
      11 * attackMultiplier + 10 + 2 * healthMultiplier,
      11 * attackMultiplier + 10 + 2 * healthMultiplier,
      11 * attackMultiplier +
        10 +
        2 * healthMultiplier +
        1 * allDamageMultiplier * isGarrison,
      11 * attackMultiplier +
        10 +
        2 * healthMultiplier +
        1 * allDamageMultiplier * isGarrison +
        10,
    ],
    ash_legs: [
      12 * healthMultiplier,
      12 * healthMultiplier + 10,
      12 * healthMultiplier + 10 + 2 * attackMultiplier,
      12 * healthMultiplier + 10 + 2 * attackMultiplier,
      12 * healthMultiplier +
        10 +
        2 * healthMultiplier +
        1 * allDamageMultiplier * isGarrison,
      12 * healthMultiplier +
        10 +
        2 * healthMultiplier +
        1 * allDamageMultiplier * isGarrison +
        10,
    ],

    //Weapon
    epic_weapon: [
      13 * defenseMultiplier,
      13 * defenseMultiplier,
      13 * defenseMultiplier,
      13 * defenseMultiplier,
      13 * defenseMultiplier,
      13 * defenseMultiplier,
    ],
    set_weapon: [
      20 * attackMultiplier,
      20 * attackMultiplier + 10,
      20 * attackMultiplier + 10 + 2 * defenseMultiplier,
      20 * attackMultiplier + 10 + 2 * defenseMultiplier,
      20 * attackMultiplier +
        10 +
        2 * defenseMultiplier +
        2 * allDamageMultiplier * isGarrison,
      20 * attackMultiplier +
        10 +
        2 * defenseMultiplier +
        2 * allDamageMultiplier * isGarrison +
        10,
    ],
    kvk_weapon: [
      25 * attackMultiplier,
      25 * attackMultiplier + 10,
      25 * attackMultiplier + 10 + 2 * defenseMultiplier,
      25 * attackMultiplier + 10 + 2 * defenseMultiplier,
      25 * attackMultiplier +
        10 +
        2 * defenseMultiplier +
        2 * allDamageMultiplier * isGarrison,
      25 * attackMultiplier +
        10 +
        2 * defenseMultiplier +
        2 * allDamageMultiplier * isGarrison +
        10,
    ],

    //Accessory
    epic_accessory: [2, 2, 2, 2, 2, 2],
    legendary_accessory: [
      5,
      5 + 10,
      5 + 10 + 1 * healthMultiplier,
      5 + 10 + 1 * healthMultiplier,
      5 + 10 + 1 * healthMultiplier + 2 * allDamageMultiplier * isGarrison,
      5 + 10 + 1 * healthMultiplier + 2 * allDamageMultiplier * isGarrison + 10,
    ],
  };

  //Helmet Score

  let helmet = equipment["helmet"];
  let helmetSpecialTalent = equipment["helmetSpecialTalent"];
  let helmetMultiplier = 1;

  if (helmetSpecialTalent) {
    helmetMultiplier = 1.3;
  }
  if (helmet === "cavalry-helmet-epic") {
    equipmentScore +=
      equipmentScoreChart["epic_helmet"][Number(equipment["helmetIconic"])] *
      helmetMultiplier;
  } else if (helmet === "set-helmet-legendary") {
    equipmentScore +=
      equipmentScoreChart["set_helmet"][Number(equipment["helmetIconic"])] *
      helmetMultiplier;
  } else if (helmet === "kvk-helmet-legendary") {
    equipmentScore +=
      equipmentScoreChart["kvk_helmet"][Number(equipment["helmetIconic"])] *
      helmetMultiplier;
  }

  //Chest Score
  let chest = equipment["chest"];
  let chestSpecialTalent = equipment["chestSpecialTalent"];
  let chestMultiplier = 1;

  if (chestSpecialTalent) {
    chestMultiplier = 1.3;
  }
  if (chest === "cavalry-chest-epic") {
    equipmentScore +=
      equipmentScoreChart["epic_chest"][Number(equipment["chestIconic"])] *
      chestMultiplier;
  } else if (chest === "shadow-legion-chest-legendary") {
    equipmentScore +=
      equipmentScoreChart["shadow_chest"][Number(equipment["chestIconic"])] *
      chestMultiplier;
  } else if (chest === "hellish-wasteland-chest-legendary") {
    equipmentScore +=
      equipmentScoreChart["hellish_chest"][Number(equipment["chestIconic"])] *
      chestMultiplier;
  }

  let gloves = equipment["gloves"];
  let glovesSpecialTalent = equipment["glovesSpecialTalent"];
  let glovesMultiplier = 1;

  if (glovesSpecialTalent) {
    glovesMultiplier = 1.3;
  }
  if (gloves === "cavalry-gloves-epic") {
    equipmentScore +=
      equipmentScoreChart["epic_gloves"][Number(equipment["glovesIconic"])] *
      glovesMultiplier;
  } else if (gloves === "navar-gloves-legendary") {
    equipmentScore +=
      equipmentScoreChart["navars_gloves"][Number(equipment["glovesIconic"])] *
      glovesMultiplier;
  } else if (gloves === "hellish-gloves-legendary") {
    equipmentScore +=
      equipmentScoreChart["hellish_gloves"][Number(equipment["glovesIconic"])] *
      glovesMultiplier;
  }

  let legs = equipment["legs"];
  let legsSpecialTalent = equipment["legsSpecialTalent"];
  let legsMultiplier = 1;

  if (legsSpecialTalent) {
    legsMultiplier = 1.3;
  }
  if (legs === "cavalry-legs-epic") {
    equipmentScore +=
      equipmentScoreChart["epic_legs"][Number(equipment["legsIconic"])] *
      legsMultiplier;
  } else if (legs === "ash-legs-legendary") {
    equipmentScore +=
      equipmentScoreChart["ash_legs"][Number(equipment["legsIconic"])] *
      legsMultiplier;
  } else if (legs === "hellish-wasteland-legs-legendary") {
    equipmentScore +=
      equipmentScoreChart["hellish_legs"][Number(equipment["legsIconic"])] *
      legsMultiplier;
  }

  let weapon = equipment["weapon"];
  let weaponSpecialTalent = equipment["weaponSpecialTalent"];
  let weaponMultiplier = 1;

  if (weaponSpecialTalent) {
    weaponMultiplier = 1.3;
  }
  if (weapon === "cavalry-weapon-epic") {
    equipmentScore +=
      equipmentScoreChart["epic_weapon"][Number(equipment["weaponIconic"])] *
      weaponMultiplier;
  } else if (weapon === "set-weapon-legendary") {
    equipmentScore +=
      equipmentScoreChart["set_weapon"][Number(equipment["weaponIconic"])] *
      weaponMultiplier;
  } else if (weapon === "kvk-weapon-legendary") {
    equipmentScore +=
      equipmentScoreChart["kvk_weapon"][Number(equipment["weaponIconic"])] *
      weaponMultiplier;
  }

  let boots = equipment["boots"];
  let bootsSpecialTalent = equipment["bootsSpecialTalent"];
  let bootsMultiplier = 1;

  if (bootsSpecialTalent) {
    bootsMultiplier = 1.3;
  }
  if (boots === "cavalry-boots-epic") {
    equipmentScore +=
      equipmentScoreChart["epic_boots"][Number(equipment["bootsIconic"])] *
      bootsMultiplier;
  } else if (boots === "set-boots-legendary") {
    equipmentScore +=
      equipmentScoreChart["hellish_boots"][Number(equipment["bootsIconic"])] *
      bootsMultiplier;
  }

  let accessory1 = equipment["accessory1"];
  let accessory1SpecialTalent = equipment["accessory1SpecialTalent"];
  let accessory1Multiplier = 1;

  if (accessory1SpecialTalent) {
    accessory1Multiplier = 1.3;
  }
  if (accessory1 === "cavalry-accessory-epic") {
    equipmentScore +=
      equipmentScoreChart["epic_accessory"][
        Number(equipment["accessory1Iconic"])
      ] * accessory1Multiplier;
  } else {
    equipmentScore +=
      equipmentScoreChart["legendary_accessory"][
        Number(equipment["accessory1Iconic"])
      ] * accessory1Multiplier;
  }

  let accessory2 = equipment["accessory2"];
  let accessory2SpecialTalent = equipment["accessory2SpecialTalent"];
  let accessory2Multiplier = 1;

  if (accessory2SpecialTalent) {
    accessory2Multiplier = 1.3;
  }
  if (accessory2 === "cavalry-accessory-epic") {
    equipmentScore +=
      equipmentScoreChart["epic_accessory"][
        Number(equipment["accessory2Iconic"])
      ] * accessory2Multiplier;
  } else {
    equipmentScore +=
      equipmentScoreChart["legendary_accessory"][
        Number(equipment["accessory2Iconic"])
      ] * accessory2Multiplier;
  }

  score += equipmentScore;
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

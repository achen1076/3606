import React, { useState } from "react";
import PageLayout from "../components/templates/PageLayout.tsx";
import PageTitle from "../components/molecules/PageTitle.tsx";
import SectionCard from "../components/molecules/SectionCard.tsx";
import { Link } from "react-router-dom";

// Import all score calculators
import weaponScoreCalculator from "../constants/scores/weaponScore.ts";
import helmetScoreCalculator from "../constants/scores/helmetScore.ts";
import chestScoreCalculator from "../constants/scores/chestScore.ts";
import gloveScoreCalculator from "../constants/scores/gloveScore.ts";
import legScoreCalculator from "../constants/scores/legScore.ts";
import bootScoreCalculator from "../constants/scores/bootScore.ts";
import accessoryScoreCalculator from "../constants/scores/accessoryScore.ts";

// Define gear type as a type
type GearType = "weapon" | "helmet" | "chest" | "glove" | "leg" | "boot";
// | "accessory";

export default function AllGearScorePage() {
  const [formType, setFormType] = useState("field");
  const [specialTalent, setSpecialTalent] = useState(false);
  const [selectedGearType, setSelectedGearType] = useState<GearType>("weapon");

  const gearTypes: Record<GearType, string[]> = {
    weapon: [
      "cav-epic-weapon",
      "inf-epic-weapon",
      "arch-epic-weapon",
      "cav-hellish-weapon",
      "cav-kvk-weapon",
      "inf-eternal-weapon",
      "inf-kvk-weapon",
      "arch-dragon-weapon",
      "arch-kvk-weapon",
      "leadership-weapon",
    ],
    helmet: [
      "cav-epic-helmet",
      "inf-epic-helmet",
      "arch-epic-helmet",
      "cav-hellish-helmet",
      "cav-kvk-helmet",
      "inf-eternal-helmet",
      "inf-kvk-helmet",
      "arch-dragon-helmet",
      "arch-kvk-helmet",
      "leadership-helmet",
    ],
    chest: [
      "cav-epic-chest",
      "inf-epic-chest",
      "arch-epic-chest",
      "cav-hellish-chest",
      "cav-shadow-chest",
      "inf-eternal-chest",
      "inf-hope-chest",
      "arch-dragon-chest",
      "arch-milky-chest",
      "leadership-chest",
    ],
    glove: [
      "cav-epic-glove",
      "inf-epic-glove",
      "arch-epic-glove",
      "cav-hellish-glove",
      "cav-navar-glove",
      "inf-eternal-glove",
      "inf-sacred-glove",
      "arch-dragon-glove",
      "arch-ian-glove",
      "leadership-glove",
    ],
    leg: [
      "cav-epic-leg",
      "inf-epic-leg",
      "arch-fanatic-leg",
      "arch-revival-leg",
      "cav-hellish-leg",
      "cav-ash-leg",
      "inf-empire-leg",
      "inf-night-leg",
      "arch-dragon-leg",
      "arch-tasset-leg",
      "leadership-leg",
    ],
    boot: [
      "cav-epic-boot",
      "inf-epic-boot",
      "arch-epic-boot",
      "cav-hellish-boot",
      "cav-mountain-boot",
      "inf-eternal-boot",
      "inf-shio-boot",
      "arch-dragon-boot",
      "arch-commander-boot",
      "leadership-boot",
    ],
  };

  // Define gear types for each category
  const gearNames: Record<GearType, Record<string, string>> = {
    weapon: {
      "cav-epic-weapon": "Cavalry Epic Weapon",
      "inf-epic-weapon": "Infantry Epic Weapon",
      "arch-epic-weapon": "Archers Epic Weapon",
      "cav-hellish-weapon": "Cavalry Hellish Wasteland Weapon",
      "cav-kvk-weapon": "Cavalry KVK Weapon",
      "inf-eternal-weapon": "Infantry Eternal Empire Weapon",
      "inf-kvk-weapon": "Infantry KVK Weapon",
      "arch-dragon-weapon": "Archers Dragons BreathWeapon",
      "arch-kvk-weapon": "Archers KVK Weapon",
      "leadership-weapon": "Leadership Weapon",
    },
    helmet: {
      "cav-epic-helmet": "Cavalry Epic Helmet",
      "inf-epic-helmet": "Infantry Epic Helmet",
      "arch-epic-helmet": "Archers Epic Helmet",
      "cav-hellish-helmet": "Cavalry Hellish Wasteland Helmet",
      "cav-kvk-helmet": "Cavalry KVK Helmet",
      "inf-eternal-helmet": "Infantry Eternal Empire Helmet",
      "inf-kvk-helmet": "Infantry KVK Helmet",
      "arch-dragon-helmet": "Archers Dragons Breath Helmet",
      "arch-kvk-helmet": "Archers KVK Helmet",
      "leadership-helmet": "Leadership Helmet",
    },
    chest: {
      "cav-epic-chest": "Cavalry Epic Chest",
      "inf-epic-chest": "Infantry Epic Chest",
      "arch-epic-chest": "Archers Epic Chest",
      "cav-hellish-chest": "Cavalry Hellish Wasteland Chest",
      "cav-shadow-chest": "Cavalry Shadow Legion Chest",
      "inf-eternal-chest": "Infantry Eternal Empire Chest",
      "inf-hope-chest": "Infantry Hope Cloak",
      "arch-dragon-chest": "Archers Dragons Breath Chest",
      "arch-milky-chest": "Archers Milky Way Chest",
      "leadership-chest": "Leadership Chest",
    },
    glove: {
      "cav-epic-glove": "Cavalry Epic Glove",
      "inf-epic-glove": "Infantry Epic Glove",
      "arch-epic-glove": "Archers Epic Glove",
      "cav-hellish-glove": "Cavalry Hellish Wasteland Glove",
      "cav-navar-glove": "Cavalry Navars Control",
      "inf-eternal-glove": "Infantry Eternal Empire Glove",
      "inf-sacred-glove": "Infantry Sacred Grip",
      "arch-dragon-glove": "Archers Dragons Breath Glove",
      "arch-ian-glove": "Archers Ians Choice",
      "leadership-glove": "Leadership Glove",
    },
    leg: {
      "cav-epic-leg": "Cavalry Epic Leggings",
      "inf-epic-leg": "Infantry Epic Leggings",
      "arch-fanatic-leg": "Archers Fanatic Leggings (Epic)",
      "arch-revival-leg": "Archers Revival Leggings (Epic)",
      "cav-hellish-leg": "Cavalry Hellish Wasteland Leggings",
      "cav-ash-leg": "Cavalry Ash of the Dawn Leggings",
      "inf-empire-leg": "Infantry Eternal Empire Leggings",
      "inf-night-leg": "Infantry Eternal Night Leggings",
      "arch-dragon-leg": "Archers Dragons Breath Leggings",
      "arch-tasset-leg": "Archers Tasset",
      "leadership-leg": "Leadership Leggings",
    },
    boot: {
      "cav-epic-boot": "Cavalry Epic Boots",
      "inf-epic-boot": "Infantry Epic Boots",
      "arch-epic-boot": "Archers Epic Boots",
      "cav-hellish-boot": "Cavalry Hellish Wasteland Boots",
      "cav-mountain-boot": "Cavalry Mountain Crusher Boots",
      "inf-eternal-boot": "Infantry Eternal Empire Boots",
      "inf-shio-boot": "Infantry Shio's Return Boots",
      "arch-dragon-boot": "Archers Dragons Breath Boots",
      "arch-commander-boot": "Archers Commander Boots",
      "leadership-boot": "Leadership Boots",
    },
    // accessory: [
    //   "epic-accessory",
    //   "ring",
    //   "horn",
    //   "drum",
    //   "greatest-glory",
    //   "other",
    // ],
  };

  // Calculate scores for a gear type
  const calculateScores = (gearType: string): number[] => {
    let calculator;

    // Select the appropriate calculator based on the current gear category
    switch (selectedGearType) {
      case "weapon":
        calculator = weaponScoreCalculator;
        break;
      case "helmet":
        calculator = helmetScoreCalculator;
        break;
      case "chest":
        calculator = chestScoreCalculator;
        break;
      case "glove":
        calculator = gloveScoreCalculator;
        break;
      case "leg":
        calculator = legScoreCalculator;
        break;
      case "boot":
        calculator = bootScoreCalculator;
        break;
      // case "accessory":
      //   calculator = accessoryScoreCalculator;
      //   break;
      default:
        calculator = weaponScoreCalculator;
    }

    const scores: number[] = [];
    try {
      for (let iconic = 0; iconic <= 5; iconic++) {
        try {
          const score = calculator(gearType, iconic, specialTalent, formType);
          if (score === undefined || score === null || isNaN(score)) {
            scores.push(0);
          } else {
            scores.push(score);
          }
        } catch (innerError) {
          scores.push(0);
        }
      }
    } catch (error) {
      return [0, 0, 0, 0, 0, 0];
    }
    return scores;
  };

  // Format gear name for display
  const formatGearName = (name: string) => {
    return gearNames[selectedGearType][name];
  };

  // Format score to 2 decimal places with safe handling of undefined/null values
  const formatScore = (score: number | undefined | null) => {
    if (score === undefined || score === null) {
      console.warn("Attempted to format undefined or null score");
      return "0.00";
    }
    return score.toFixed(2);
  };

  return (
    <PageLayout>
      {/* Page Title */}
      <PageTitle
        title="All Gear"
        highlightedText="Score Data"
        subtitle="Detailed score values for all gear types and iconic levels"
      />

      <p className="text-white mb-6">
        Note: Set Bonuses are not included in the scores.
      </p>
      <div className="mb-4">
        <Link
          to="/tools"
          className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors duration-200 border border-gray-700 shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Tools
        </Link>
      </div>

      {/* Controls Section */}
      <section className="w-full py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          {/* Form Type Selection */}
          <div className="flex flex-wrap justify-center space-x-2">
            <button
              className={`px-4 py-2 rounded-lg ${
                formType === "field"
                  ? "bg-rok-purple text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
              onClick={() => setFormType("field")}
            >
              Field
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                formType === "rally"
                  ? "bg-rok-purple text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
              onClick={() => setFormType("rally")}
            >
              Rally
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                formType === "garrison"
                  ? "bg-rok-purple text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
              onClick={() => setFormType("garrison")}
            >
              Garrison
            </button>
          </div>

          {/* Special Talent Toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-white">Special Talent:</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={specialTalent}
                onChange={() => setSpecialTalent(!specialTalent)}
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rok-purple"></div>
            </label>
          </div>

          {/* Gear Type Selection */}
          <div className="flex flex-wrap justify-center space-x-2">
            {(Object.keys(gearTypes) as GearType[]).map((type) => (
              <button
                key={type}
                className={`px-4 py-2 rounded-lg ${
                  selectedGearType === type
                    ? "bg-rok-purple text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
                onClick={() => setSelectedGearType(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* Gear Score Table */}
      <section className="w-full py-4">
        <SectionCard
          title={`${
            selectedGearType.charAt(0).toUpperCase() + selectedGearType.slice(1)
          } Scores (${formType.charAt(0).toUpperCase() + formType.slice(1)}${
            specialTalent ? ", Special Talent" : ""
          })`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="bg-rok-purple text-white">
                  <th className="p-3 text-left">Gear Type</th>
                  <th className="p-3 text-center">Iconic 0</th>
                  <th className="p-3 text-center">Iconic 1</th>
                  <th className="p-3 text-center">Iconic 2</th>
                  <th className="p-3 text-center">Iconic 3</th>
                  <th className="p-3 text-center">Iconic 4</th>
                  <th className="p-3 text-center">Iconic 5</th>
                </tr>
              </thead>
              <tbody>
                {gearTypes[selectedGearType].map((gearType) => {
                  const scores = calculateScores(gearType);
                  if (scores.every((score) => score === 0)) {
                    return null;
                  }
                  return (
                    <tr
                      key={gearType}
                      className="border-b border-gray-700 hover:bg-gray-800"
                    >
                      <td className="p-3 text-left font-medium">
                        {formatGearName(gearType)}
                      </td>
                      {scores.map((score, index) => (
                        <td key={index} className="p-3 text-center">
                          {formatScore(score)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </section>
    </PageLayout>
  );
}

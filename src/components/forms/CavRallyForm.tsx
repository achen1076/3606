import React, { useState } from "react";
import { calculateCavalryScore } from "../helperfunctions/cavScoreCalculator.ts";
export default function CavRallyForm() {
  const [selectedInscriptions, setSelectedInscriptions] = useState<string[]>(
    []
  );

  const [score, setScore] = useState<number>(0);
  const [formType, setFormType] = useState<"rally" | "garrison" | "field">(
    "field"
  );
  const [showScore, setShowScore] = useState<boolean>(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setShowScore(true);

    // Get the form element
    const form = event.currentTarget as HTMLFormElement;

    // Get form values directly using querySelector
    const vipInput = form.querySelector(
      'input[name="vip"]:checked'
    ) as HTMLInputElement;

    // Get all checked checkboxes for city skin
    const citySkinInputs = Array.from(
      form.querySelectorAll('input[name="citySkin"]:checked')
    ).map((el) => el.id);

    // Get equipment values
    const helmetSelect = form.querySelector(
      'select[name="helmet"]'
    ) as HTMLSelectElement;
    const helmetIconicSelect = form.querySelector(
      'select[name="helmetIconic"]'
    ) as HTMLSelectElement;
    const chestSelect = form.querySelector(
      'select[name="chest"]'
    ) as HTMLSelectElement;
    const chestIconicSelect = form.querySelector(
      'select[name="chestIconic"]'
    ) as HTMLSelectElement;
    const bootsSelect = form.querySelector(
      'select[name="boots"]'
    ) as HTMLSelectElement;
    const bootsIconicSelect = form.querySelector(
      'select[name="bootsIconic"]'
    ) as HTMLSelectElement;
    const glovesSelect = form.querySelector(
      'select[name="gloves"]'
    ) as HTMLSelectElement;
    const glovesIconicSelect = form.querySelector(
      'select[name="glovesIconic"]'
    ) as HTMLSelectElement;
    const legsSelect = form.querySelector(
      'select[name="legs"]'
    ) as HTMLSelectElement;
    const legsIconicSelect = form.querySelector(
      'select[name="legsIconic"]'
    ) as HTMLSelectElement;
    const weaponSelect = form.querySelector(
      'select[name="weapon"]'
    ) as HTMLSelectElement;
    const weaponIconicSelect = form.querySelector(
      'select[name="weaponIconic"]'
    ) as HTMLSelectElement;
    const accessory1Select = form.querySelector(
      'select[name="accessory1"]'
    ) as HTMLSelectElement;
    const accessory1IconicSelect = form.querySelector(
      'select[name="accessory1IconicLevel"]'
    ) as HTMLSelectElement;
    const accessory2Select = form.querySelector(
      'select[name="accessory2"]'
    ) as HTMLSelectElement;
    const accessory2IconicSelect = form.querySelector(
      'select[name="accessory2IconicLevel"]'
    ) as HTMLSelectElement;

    const helmetSpecialTalentInput = form.querySelector(
      'input[name="specialTalentHelmet"]'
    ) as HTMLInputElement;
    const chestSpecialTalentInput = form.querySelector(
      'input[name="specialTalentChest"]'
    ) as HTMLInputElement;
    const bootsSpecialTalentInput = form.querySelector(
      'input[name="specialTalentBoots"]'
    ) as HTMLInputElement;
    const glovesSpecialTalentInput = form.querySelector(
      'input[name="specialTalentGloves"]'
    ) as HTMLInputElement;
    const legsSpecialTalentInput = form.querySelector(
      'input[name="specialTalentLegs"]'
    ) as HTMLInputElement;
    const weaponSpecialTalentInput = form.querySelector(
      'input[name="specialTalentWeapon"]'
    ) as HTMLInputElement;
    const accessory1SpecialTalentInput = form.querySelector(
      'input[name="specialTalentAccessory1"]'
    ) as HTMLInputElement;
    const accessory2SpecialTalentInput = form.querySelector(
      'input[name="specialTalentAccessory2"]'
    ) as HTMLInputElement;

    // Get armaments values
    const cavalryAttackInput = form.querySelector(
      'input[name="cavalryAttack"]'
    ) as HTMLInputElement;
    const cavalryDefenseInput = form.querySelector(
      'input[name="cavalryDefense"]'
    ) as HTMLInputElement;
    const cavalryHealthInput = form.querySelector(
      'input[name="cavalryHealth"]'
    ) as HTMLInputElement;
    const allDamageInput = form.querySelector(
      'input[name="allDamage"]'
    ) as HTMLInputElement;

    // Create the form values object
    const formValues = {
      formType: formType,
      vip: vipInput?.value || "",
      citySkin: citySkinInputs,
      equipment: {
        helmet: helmetSelect?.value || "",
        helmetIconic: helmetIconicSelect?.value || "",
        helmetSpecialTalent: helmetSpecialTalentInput?.checked || false,
        chest: chestSelect?.value || "",
        chestIconic: chestIconicSelect?.value || "",
        chestSpecialTalent: chestSpecialTalentInput?.checked || false,
        boots: bootsSelect?.value || "",
        bootsIconic: bootsIconicSelect?.value || "",
        bootsSpecialTalent: bootsSpecialTalentInput?.checked || false,
        gloves: glovesSelect?.value || "",
        glovesIconic: glovesIconicSelect?.value || "",
        glovesSpecialTalent: glovesSpecialTalentInput?.checked || false,
        legs: legsSelect?.value || "",
        legsIconic: legsIconicSelect?.value || "",
        legsSpecialTalent: legsSpecialTalentInput?.checked || false,
        weapon: weaponSelect?.value || "",
        weaponIconic: weaponIconicSelect?.value || "",
        weaponSpecialTalent: weaponSpecialTalentInput?.checked || false,
        accessory1: accessory1Select?.value || "",
        accessory1Iconic: accessory1IconicSelect?.value || "",
        accessory1SpecialTalent: accessory1SpecialTalentInput?.checked || false,
        accessory2: accessory2Select?.value || "",
        accessory2Iconic: accessory2IconicSelect?.value || "",
        accessory2SpecialTalent: accessory2SpecialTalentInput?.checked || false,
      },
      armaments: {
        cavalryAttack: cavalryAttackInput?.value
          ? parseFloat(cavalryAttackInput.value)
          : 0,
        cavalryDefense: cavalryDefenseInput?.value
          ? parseFloat(cavalryDefenseInput.value)
          : 0,
        cavalryHealth: cavalryHealthInput?.value
          ? parseFloat(cavalryHealthInput.value)
          : 0,
        allDamage: allDamageInput?.value ? parseFloat(allDamageInput.value) : 0,
      },
      inscription: selectedInscriptions,
    };

    setScore(calculateCavalryScore(formValues));

    console.log(score);
  };

  return (
    <div className="bg-black/30 p-8 rounded-lg shadow-xl border border-gray-800">
      <h3 className="text-2xl font-bold text-rok-purple-light mb-6 pb-2 border-b border-rok-purple/30">
        Cavalry{" "}
        {formType === "field"
          ? "Field"
          : formType === "garrison"
          ? "Garrison"
          : "Rally"}{" "}
        Form
      </h3>
      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Rally/Garrison/Field Selector */}
        <div className="border-b border-gray-700 pb-6">
          <h4 className="text-lg font-semibold text-rok-purple-light mb-4 flex items-center">
            <span className="bg-rok-purple/20 rounded-full p-1 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-rok-purple-light"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            Form Type
          </h4>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="rally"
                name="formType"
                value="rally"
                checked={formType === "rally"}
                onChange={() => setFormType("rally")}
                className="h-4 w-4 text-rok-purple focus:ring-rok-purple-light border-gray-600 bg-gray-800"
              />
              <label
                htmlFor="rally"
                className="ml-2 block text-sm font-medium text-gray-300"
              >
                Rally Lead
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="garrison"
                name="formType"
                value="garrison"
                checked={formType === "garrison"}
                onChange={() => setFormType("garrison")}
                className="h-4 w-4 text-rok-purple focus:ring-rok-purple-light border-gray-600 bg-gray-800"
              />
              <label
                htmlFor="garrison"
                className="ml-2 block text-sm font-medium text-gray-300"
              >
                Garrison Captain
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="field"
                name="formType"
                value="field"
                checked={formType === "field"}
                onChange={() => setFormType("field")}
                className="h-4 w-4 text-rok-purple focus:ring-rok-purple-light border-gray-600 bg-gray-800"
              />
              <label
                htmlFor="field"
                className="ml-2 block text-sm font-medium text-gray-300"
              >
                Field Fighting
              </label>
            </div>
          </div>
        </div>
        <div className="border-b border-gray-700 pb-6">
          <h4 className="text-lg font-semibold text-rok-purple-light mb-4 flex items-center">
            <span className="bg-rok-purple/20 rounded-full p-1 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-rok-purple-light"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            General Information
          </h4>
          <div className="mt-4">
            <label className="block text-gray-300 mb-2">VIP Level</label>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="vip-13"
                  name="vip"
                  value="13-16"
                  className="mr-2 cursor-pointer accent-rok-purple"
                />
                <label htmlFor="vip-13" className="text-white">
                  13 - 16
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="vip-17"
                  name="vip"
                  value="17"
                  className="mr-2 cursor-pointer accent-rok-purple"
                  required
                />
                <label htmlFor="vip-17" className="text-white">
                  17
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="vip-18"
                  name="vip"
                  value="18"
                  className="mr-2 cursor-pointer"
                />
                <label htmlFor="vip-18" className="text-white">
                  18
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="vip-19"
                  name="vip"
                  value="19+"
                  className="mr-2 cursor-pointer"
                />
                <label htmlFor="vip-19" className="text-white">
                  19+
                </label>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-gray-300 mb-2">City Skin</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="skin-cav-attack-10"
                  name="citySkin"
                  className="mr-2 cursor-pointer"
                />
                <label htmlFor="skin-cav-attack-10" className="text-white">
                  Cav Attack 10%
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="skin-cav-attack-15"
                  name="citySkin"
                  className="mr-2 cursor-pointer"
                />
                <label htmlFor="skin-cav-attack-15" className="text-white">
                  Cav Attack 15%
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="skin-cav-attack-20"
                  name="citySkin"
                  className="mr-2 cursor-pointer"
                />
                <label htmlFor="skin-cav-attack-20" className="text-white">
                  Cav Attack 20%
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="skin-cav-defense-10"
                  name="citySkin"
                  className="mr-2 cursor-pointer"
                />
                <label htmlFor="skin-cav-defense-10" className="text-white">
                  Cav Defense 10%
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="skin-cav-defense-15"
                  name="citySkin"
                  className="mr-2 cursor-pointer"
                />
                <label htmlFor="skin-cav-defense-15" className="text-white">
                  Cav Defense 15%
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="skin-cav-defense-20"
                  name="citySkin"
                  className="mr-2 cursor-pointer"
                />
                <label htmlFor="skin-cav-defense-20" className="text-white">
                  Cav Defense 20%
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="skin-cav-health-5"
                  name="citySkin"
                  className="mr-2 cursor-pointer"
                />
                <label htmlFor="skin-cav-health-5" className="text-white">
                  Cav Health 5%
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="skin-cav-health-10"
                  name="citySkin"
                  className="mr-2 cursor-pointer"
                />
                <label htmlFor="skin-cav-health-10" className="text-white">
                  Cav Health 10%
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="skin-cav-health-15"
                  name="citySkin"
                  className="mr-2 cursor-pointer"
                />
                <label htmlFor="skin-cav-health-15" className="text-white">
                  Cav Health 15%
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="skin-cav-health-20"
                  name="citySkin"
                  className="mr-2 cursor-pointer"
                />
                <label htmlFor="skin-cav-health-20" className="text-white">
                  Cav Health 20%
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="skin-skill-dmg-5"
                  name="citySkin"
                  className="mr-2 cursor-pointer"
                />
                <label htmlFor="skin-skill-dmg-5" className="text-white">
                  Skill Dmg 5%
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="skin-12-defense"
                  name="citySkin"
                  className="mr-2 cursor-pointer"
                />
                <label htmlFor="skin-12-attack" className="text-white">
                  12% Attack
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="skin-12-defense"
                  name="citySkin"
                  className="mr-2 cursor-pointer"
                />
                <label htmlFor="skin-12-defense" className="text-white">
                  12% Defense
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Gear */}
        <div className="border-b border-gray-700 pb-6">
          <h4 className="text-lg font-semibold text-rok-purple-light mb-4 flex items-center">
            <span className="bg-rok-purple/20 rounded-full p-1 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-rok-purple-light"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            Gear
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <div>
                <label className="block text-gray-300 mb-2 text-lg text-rok-purple">
                  Helmet
                </label>
                <select
                  name="helmet"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-rok-purple focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select Helmet</option>
                  <option value="cavalry-helmet-epic">
                    Cavalry Helmet (Epic)
                  </option>
                  <option value="set-helmet-legendary">
                    Set Helmet (Legendary)
                  </option>
                  <option value="kvk-helmet-legendary">
                    KvK Helmet (Legendary)
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">
                  Helmet Iconic Level
                </label>
                <select
                  name="helmetIconic"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-rok-purple focus:border-transparent transition-all duration-200"
                  required
                >
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="flex flex-row space-x-8 items-center mt-2">
                <label className="block text-gray-300">Special Talent?</label>
                <input
                  type="checkbox"
                  id="special-talent-helmet"
                  className="cursor-pointer"
                  name="specialTalentHelmet"
                  value="specialTalentHelmet"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label className="block text-gray-300 mb-2 text-lg text-rok-purple">
                  Chest
                </label>
                <select
                  name="chest"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-rok-purple focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select Chest</option>
                  <option value="cavalry-chest-epic">
                    Cavalry Chest (Epic)
                  </option>
                  <option value="shadow-legion-chest-legendary">
                    Shadow Legion Chest (Legendary)
                  </option>
                  <option value="hellish-wasteland-chest-legendary">
                    Hellish Wasteland Chest (Legendary)
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">
                  Chest Iconic Level
                </label>
                <select
                  name="chestIconic"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-rok-purple focus:border-transparent transition-all duration-200"
                  required
                >
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="flex flex-row space-x-8 items-center mt-2">
                <label className="block text-gray-300">Special Talent?</label>
                <input
                  type="checkbox"
                  id="special-talent-chest"
                  name="specialTalentChest"
                  value="specialTalentChest"
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label className="block text-gray-300 mb-2 text-lg text-rok-purple">
                  Gloves
                </label>
                <select
                  name="gloves"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-rok-purple focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select Gloves</option>
                  <option value="cavalry-gloves-epic">
                    Cavalry Gloves (Epic)
                  </option>
                  <option value="hellish-wasteland-gloves-legendary">
                    Hellish Wasteland Gloves (Legendary)
                  </option>
                  <option value="navar-gloves-legendary">
                    Navar Gloves (Legendary)
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">
                  Gloves Iconic Level
                </label>
                <select
                  name="glovesIconic"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-rok-purple focus:border-transparent transition-all duration-200"
                  required
                >
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="flex flex-row space-x-8 items-center mt-2">
                <label className="block text-gray-300">Special Talent?</label>
                <input
                  type="checkbox"
                  id="special-talent-gloves"
                  className="cursor-pointer"
                  name="specialTalentGloves"
                  value="specialTalentGloves"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <label className="block text-gray-300 mb-2 text-lg text-rok-purple">
                  Legs
                </label>
                <select
                  name="legs"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-rok-purple focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select Legs</option>
                  <option value="cavalry-legs-epic">Cavalry Legs (Epic)</option>
                  <option value="ash-legs-legendary">
                    Ash of Dawn Legs (Legendary)
                  </option>
                  <option value="hellish-wasteland-legs-legendary">
                    Hellish Wasteland Legs (Legendary)
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">
                  Legs Iconic Level
                </label>
                <select
                  name="legsIconic"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-rok-purple focus:border-transparent transition-all duration-200"
                  required
                >
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="flex flex-row space-x-8 items-center mt-2">
                <label className="block text-gray-300">Special Talent?</label>
                <input
                  type="checkbox"
                  id="special-talent-legs"
                  className="cursor-pointer"
                  name="specialTalentLegs"
                  value="specialTalentLegs"
                />
              </div>
            </div>
            <div>
              <div>
                <label className="block text-gray-300 mb-2 text-lg text-rok-purple">
                  Weapon
                </label>
                <select
                  name="weapon"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-rok-purple focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select Weapon</option>
                  <option value="cavalry-weapon-epic">
                    Cavalry Weapon (Epic)
                  </option>
                  <option value="set-weapon-legendary">
                    Set Weapon (Legendary)
                  </option>
                  <option value="kvk-weapon-legendary">
                    KvK Weapon (Legendary)
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">
                  Weapon Iconic Level
                </label>
                <select
                  name="weaponIconic"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-rok-purple focus:border-transparent transition-all duration-200"
                  required
                >
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="flex flex-row space-x-8 items-center mt-2">
                <label className="block text-gray-300">Special Talent?</label>
                <input
                  type="checkbox"
                  id="special-talent-helmet"
                  className="cursor-pointer"
                  name="specialTalentWeapon"
                  value="specialTalentWeapon"
                />
              </div>
            </div>
            <div>
              <div>
                <label className="block text-gray-300 mb-2 text-lg text-rok-purple">
                  Boots
                </label>
                <select
                  name="boots"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-rok-purple focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select Boots</option>
                  <option value="cavalry-boots-epic">
                    Cavalry Boots (Epic)
                  </option>
                  <option value="set-boots-legendary">
                    Set Boots (Legendary)
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">
                  Boots Iconic Level
                </label>
                <select
                  name="bootsIconic"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-rok-purple focus:border-transparent transition-all duration-200"
                  required
                >
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="flex flex-row space-x-8 items-center mt-2">
                <label className="block text-gray-300">Special Talent?</label>
                <input
                  type="checkbox"
                  id="special-talent-boots"
                  name="specialTalentBoots"
                  value="specialTalentBoots"
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div>
              <div>
                <label className="block text-gray-300 mb-2 text-lg text-rok-purple">
                  Accessory 1
                </label>
                <select
                  name="accessory1"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-rok-purple focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select Accessory 1</option>
                  <option value="cavalry-accessory-epic">Epic</option>
                  <option value="ring">Ring</option>
                  <option value="horn">Horn</option>
                  <option value="drum">Drum</option>
                  <option value="greatest-glory">Greatest Glory</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">
                  Accessory 1 Iconic Level
                </label>
                <select
                  name="accessory1IconicLevel"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-rok-purple focus:border-transparent transition-all duration-200"
                  required
                >
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="flex flex-row space-x-8 items-center mt-2">
                <label className="block text-gray-300">Special Talent?</label>
                <input
                  type="checkbox"
                  id="special-talent-accessory1"
                  className="cursor-pointer"
                  name="specialTalentAccessory1"
                />
              </div>
            </div>
            <div>
              <div>
                <label className="block text-gray-300 mb-2 text-lg text-rok-purple">
                  Accessory 2
                </label>
                <select
                  name="accessory2"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-rok-purple focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select Accessory 2</option>
                  <option value="cavalry-accessory-epic">Epic</option>
                  <option value="ring">Ring</option>
                  <option value="horn">Horn</option>
                  <option value="drum">Drum</option>
                  <option value="greatest-glory">Greatest Glory</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">
                  Accessory 2 Iconic Level
                </label>
                <select
                  name="accessory2IconicLevel"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-rok-purple focus:border-transparent transition-all duration-200"
                  required
                >
                  <option>0</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="flex flex-row space-x-8 items-center mt-2">
                <label className="block text-gray-300">Special Talent?</label>
                <input
                  type="checkbox"
                  id="special-talent-accessory2"
                  className="cursor-pointer"
                  name="specialTalentAccessory2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Armaments */}
        <div className="pb-6">
          <h4 className="text-lg font-semibold text-rok-purple-light mb-4 flex items-center">
            <span className="bg-rok-purple/20 rounded-full p-1 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-rok-purple-light"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </span>
            Armaments
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-2">Cavalry Attack</label>
              <input
                type="number"
                name="cavalryAttack"
                placeholder="Cavalry Attack %"
                step="0.1"
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-rok-purple focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">
                Cavalry Defense
              </label>
              <input
                type="number"
                name="cavalryDefense"
                placeholder="Cavalry Defense %"
                step="0.1"
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-rok-purple focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Cavalry Health</label>
              <input
                type="number"
                name="cavalryHealth"
                placeholder="Cavalry Health %"
                step="0.1"
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-rok-purple focus:border-transparent transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">All Damage</label>
              <input
                type="number"
                name="allDamage"
                placeholder="All Damage %"
                step="0.1"
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-rok-purple focus:border-transparent transition-all duration-200"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-gray-300 mb-2">
              Inscriptions (select multiple)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-2 max-h-60 overflow-y-auto p-2 border border-gray-700 rounded-md">
              {[
                "Airtight",
                "Alert",
                "Armored",
                "Artisan",
                "Assertive",
                "Balanced",
                "Bellicose",
                "Bluster",
                "Boiling Blood",
                "Brave",
                "Brawler",
                "Breaker",
                "Brutal",
                "Butterfly",
                "Calm",
                "Causative",
                "Cohesive",
                "Combo",
                "Counterer",
                "Crazed",
                "Daring",
                "Defiant",
                "Deflecter",
                "Demolisher",
                "Desperado",
                "Determined",
                "Devious",
                "Eclipsed",
                "Elite",
                "Embattled",
                "Enduring",
                "Enraged",
                "Evasive",
                "Fearsome",
                "Fit",
                "Flurry",
                "Focus Fire",
                "Guarded",
                "Guardians",
                "Hardy",
                "Hard Headed",
                "Hunter",
                "Infamy",
                "Intrepid",
                "Imploder",
                "Iron Wall",
                "Metallics",
                "Militant",
                "Onslaught",
                "Patronage",
                "Phalanx",
                "Pulverize",
                "Pursuer",
                "Pummeler",
                "Raider",
                "Rapacious",
                "Rattling",
                "Rebuff",
                "Relentless",
                "Requital",
                "Resistant",
                "Respite",
                "Retaliation",
                "Robust",
                "Sentries",
                "Shielded",
                "Siegework",
                "Smite",
                "Spiked",
                "Spirited",
                "Steelskin",
                "Strategic",
                "Striker",
                "Thrasher",
                "Thundering",
                "Toppler",
                "Tremors",
                "Unstoppable",
                "Uplifting",
                "Valiant",
                "Vitality",
                "Warcry",
                "Ward",
                "Warflames",
                "Warhunger",
                "Watchman",
                "Well Clad",
              ].map((inscription) => (
                <div
                  key={inscription}
                  onClick={() => {
                    if (selectedInscriptions.includes(inscription)) {
                      setSelectedInscriptions(
                        selectedInscriptions.filter(
                          (item) => item !== inscription
                        )
                      );
                    } else {
                      setSelectedInscriptions([
                        ...selectedInscriptions,
                        inscription,
                      ]);
                    }
                  }}
                  className={`p-2 rounded-md border cursor-pointer transition-all duration-200 ${
                    selectedInscriptions.includes(inscription)
                      ? "bg-rok-purple text-white border-rok-purple-light"
                      : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
                  }`}
                >
                  {inscription}
                </div>
              ))}
            </div>

            {selectedInscriptions.length > 0 && (
              <div className="mt-2 p-2 bg-rok-purple/10 rounded-md border border-rok-purple/30">
                <p className="text-gray-300 mb-1">Selected Inscriptions:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedInscriptions.map((inscription, index) => (
                    <span
                      key={index}
                      className="bg-rok-purple/20 text-white px-2 py-1 rounded-md text-sm flex items-center"
                    >
                      {inscription}
                      <button
                        className="ml-2 text-gray-400 hover:text-white"
                        onClick={() => {
                          setSelectedInscriptions(
                            selectedInscriptions.filter(
                              (item) => item !== inscription
                            )
                          );
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="bg-rok-purple hover:bg-rok-purple-dark text-white font-bold py-3 px-8 rounded-md shadow-lg transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-rok-purple-light focus:ring-opacity-50 cursor-pointer flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Submit Rally/Garrison Lead Information
          </button>
        </div>

        {/* Score Display */}
        {showScore && (
          <div className="mt-8 p-6 bg-rok-purple/10 border border-rok-purple/30 rounded-lg">
            <h4 className="text-xl font-bold text-white mb-2 flex items-center">
              <span className="bg-rok-purple rounded-full p-1 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Score Results
            </h4>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-black/30 p-4 rounded-lg">
              <div>
                <p className="text-gray-300 mb-1">
                  Your {formType === "rally" ? "Rally" : "Garrison"} Lead Score:
                </p>
                <p className="text-3xl font-bold text-rok-purple-light">
                  {score.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

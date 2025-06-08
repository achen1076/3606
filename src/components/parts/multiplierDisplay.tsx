import React from "react";
import SectionCard from "../molecules/SectionCard.tsx";
import {
  attackMultiplier,
  defenseMultiplier,
  healthMultiplier,
  allDamageMultiplier,
  attackFlatAddition,
  defenseFlatAddition,
  healthFlatAddition,
  weaponIconic5,
  helmetIconic5,
  chestIconic5,
  legIconic5,
  accessoryIconic5,
} from "../../constants/const.ts";

export default function MultiplierDisplay() {
  return (
    <React.Fragment>
      Multipliers Info
      <section className="w-full py-4">
        <SectionCard title="Score Multipliers">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-black/30 rounded-lg">
              <h3 className="text-rok-purple-light font-bold mb-2">
                Attack Multiplier
              </h3>
              <p className="text-white">{attackMultiplier}</p>
            </div>
            <div className="p-4 bg-black/30 rounded-lg">
              <h3 className="text-rok-purple-light font-bold mb-2">
                Defense Multiplier
              </h3>
              <p className="text-white">{defenseMultiplier}</p>
            </div>
            <div className="p-4 bg-black/30 rounded-lg">
              <h3 className="text-rok-purple-light font-bold mb-2">
                Health Multiplier
              </h3>
              <p className="text-white">{healthMultiplier}</p>
            </div>
            <div className="p-4 bg-black/30 rounded-lg">
              <h3 className="text-rok-purple-light font-bold mb-2">
                All Damage Multiplier
              </h3>
              <p className="text-white">{allDamageMultiplier}</p>
            </div>
          </div>
        </SectionCard>
      </section>
      Flat Additions Info
      <section className="w-full py-4">
        <SectionCard title="Flat Additions">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-black/30 rounded-lg">
              <h3 className="text-rok-purple-light font-bold mb-2">
                Attack Flat Addition
              </h3>
              <p className="text-white">{attackFlatAddition}</p>
            </div>
            <div className="p-4 bg-black/30 rounded-lg">
              <h3 className="text-rok-purple-light font-bold mb-2">
                Defense Flat Addition
              </h3>
              <p className="text-white">{defenseFlatAddition}</p>
            </div>
            <div className="p-4 bg-black/30 rounded-lg">
              <h3 className="text-rok-purple-light font-bold mb-2">
                Health Flat Addition
              </h3>
              <p className="text-white">{healthFlatAddition}</p>
            </div>
          </div>
        </SectionCard>
      </section>
      {/* Iconic 5 Bonuses */}
      <section className="w-full py-4">
        <SectionCard title="Iconic 5 Bonuses">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="p-4 bg-black/30 rounded-lg">
              <h3 className="text-rok-purple-light font-bold mb-2">
                Weapon Iconic 5
              </h3>
              <p className="text-white">{weaponIconic5}</p>
            </div>
            <div className="p-4 bg-black/30 rounded-lg">
              <h3 className="text-rok-purple-light font-bold mb-2">
                Helmet Iconic 5
              </h3>
              <p className="text-white">{helmetIconic5}</p>
            </div>
            <div className="p-4 bg-black/30 rounded-lg">
              <h3 className="text-rok-purple-light font-bold mb-2">
                Chest Iconic 5
              </h3>
              <p className="text-white">{chestIconic5}</p>
            </div>
            <div className="p-4 bg-black/30 rounded-lg">
              <h3 className="text-rok-purple-light font-bold mb-2">
                Leg Iconic 5
              </h3>
              <p className="text-white">{legIconic5}</p>
            </div>
            <div className="p-4 bg-black/30 rounded-lg">
              <h3 className="text-rok-purple-light font-bold mb-2">
                Accessory Iconic 5
              </h3>
              <p className="text-white">{accessoryIconic5}</p>
            </div>
          </div>
        </SectionCard>
      </section>
    </React.Fragment>
  );
}

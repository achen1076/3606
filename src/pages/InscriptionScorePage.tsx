import React, { useState, useRef, useEffect } from "react";
import { baseInscriptionValues } from "../constants/inscriptionScore.tsx";
import PageLayout from "../components/templates/PageLayout.tsx";
import PageTitle from "../components/molecules/PageTitle.tsx";

export default function InscriptionScorePage() {
  const [selectedFormation, setSelectedFormation] = useState<string>("wedge");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Convert the baseInscriptionValues object to an array for sorting
  const inscriptionEntries = Object.entries(baseInscriptionValues);

  // Sort inscriptions alphabetically
  inscriptionEntries.sort((a, b) => a[0].localeCompare(b[0]));

  const wedgeSpecial: string[] = [
    "Balanced",
    "Intrepid",
    "Unstoppable",
    "Hunter",
  ];
  const archSpecial: string[] = [
    "Destructive",
    "Straight to the Point",
    "Invincible",
    "Fearless",
  ];
  const deltaSpecial: string[] = [
    "Butterfly",
    "Flurry",
    "Steelskin",
    "Thrasher",
  ];
  const pincerSpecial: string[] = [
    "Airtight",
    "Demolisher",
    "Thundering",
    "Toppler",
  ];

  const wedgeRare: string[] = [
    "Boiling Blood",
    "Crazed",
    "Defiant",
    "Focus Fire",
  ];
  const archRare: string[] = [
    "Even Keeled",
    "Unswerving",
    "Forceful",
    "Battle Ready",
  ];
  const deltaRare: string[] = [
    "Pummeler",
    "Causative",
    "Determined",
    "Relentless",
  ];
  const pincerRare: string[] = [
    "Rattling",
    "Raider",
    "Imploder",
    "Hard Headed",
  ];

  return (
    <PageLayout>
      <PageTitle
        title="Inscription"
        highlightedText="Score Reference"
        subtitle="View inscription values for different formations"
      />
      <p className="text-white mb-6">
        Note: March Speed inscriptions all default to 1.
      </p>

      <div className="bg-black/30 p-6 rounded-lg shadow-xl border border-rok-purple/30 mb-8">
        <div className="mb-6">
          <label className="block text-white mb-2 font-semibold">
            Select Formation:
          </label>
          <div className="relative w-full max-w-xs" ref={dropdownRef}>
            <div className="flex items-center">
              <div className="w-full">
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex justify-between items-center w-full bg-gray-800 text-white py-2 px-4 rounded border border-gray-700 focus:border-rok-purple focus:outline-none hover:border-rok-purple/50 transition-colors duration-200"
                >
                  <span>
                    {selectedFormation.charAt(0).toUpperCase() +
                      selectedFormation.slice(1)}
                  </span>
                  <svg
                    className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                      isOpen ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            {isOpen && (
              <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded shadow-lg">
                {["wedge", "arch", "delta", "pincer"].map((formation) => (
                  <button
                    key={formation}
                    onClick={() => {
                      setSelectedFormation(formation);
                      setIsOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition-colors ${
                      selectedFormation === formation ? "bg-rok-purple/30" : ""
                    }`}
                  >
                    {formation.charAt(0).toUpperCase() + formation.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-white border-collapse">
            <thead>
              <tr className="bg-rok-purple/30 border-b border-rok-purple/50">
                <th className="p-3 text-left font-semibold">Inscription</th>
                <th className="p-3 text-right font-semibold">Score Value</th>
              </tr>
            </thead>
            <tbody>
              {inscriptionEntries.map(([inscription, valueObj]) => {
                // Get the special and rare lists for the selected formation
                let specialList: string[] = [];
                let rareList: string[] = [];

                switch (selectedFormation) {
                  case "wedge":
                    specialList = wedgeSpecial;
                    rareList = wedgeRare;
                    break;
                  case "arch":
                    specialList = archSpecial;
                    rareList = archRare;
                    break;
                  case "delta":
                    specialList = deltaSpecial;
                    rareList = deltaRare;
                    break;
                  case "pincer":
                    specialList = pincerSpecial;
                    rareList = pincerRare;
                    break;
                }

                // Check if this inscription is special or rare for the selected formation
                const isSpecial = specialList.includes(inscription);
                const isRare = rareList.includes(inscription);

                // Only show inscriptions if they're special, rare, or have a value of 1 or more
                if (!isSpecial && !isRare && valueObj[selectedFormation] < 1) {
                  return null;
                }

                return (
                  <tr
                    key={inscription}
                    className={`border-b border-gray-700/50 hover:bg-rok-purple/10 ${
                      isSpecial
                        ? "bg-yellow-600/20"
                        : isRare
                        ? "bg-blue-600/20"
                        : ""
                    }`}
                  >
                    <td className="p-3">{inscription}</td>
                    <td className="p-3 text-right">
                      {valueObj[selectedFormation]?.toFixed(2) || "0"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  );
}

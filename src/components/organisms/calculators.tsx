import React, { useState } from "react";
import CavRallyForm from "../forms/CavRallyForm.tsx";
import InfLeadForm from "../forms/InfLeadForm.tsx";
import ArcherRallyForm from "../forms/ArcherLeadForm.tsx";

export default function Calculators() {
  const [expandedSections, setExpandedSections] = useState<{
    cavalry: boolean;
    archer: boolean;
    infantry: boolean;
  }>({
    cavalry: false,
    archer: false,
    infantry: false,
  });

  const toggleSection = (section: "cavalry" | "archer" | "infantry") => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <section className="w-full py-8">
      <div className="bg-gradient-to-br from-rok-purple/20 to-black rounded-lg p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6">
          Gear and Armament Calculators
        </h2>
        <p className="text-lg text-gray-300 mb-6">
          Use these tools to plan and build marches
        </p>
        <p className="text-sm text-gray-300 mb-6">
          Note: These calculators are currently in beta and may not be perfect.
          Swapping between rally, field, and garrison only affect gear and some
          inscriptions.
        </p>

        {/* Accordion Sections */}
        <div className="space-y-4">
          {/* Cavalry Accordion */}
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection("cavalry")}
              className="w-full flex justify-between items-center p-4 bg-gradient-to-r from-rok-purple/30 to-black text-white hover:from-rok-purple/50 transition-all duration-200"
            >
              <span className="text-xl font-semibold">Cavalry</span>
              <svg
                className={`w-6 h-6 transform transition-transform duration-200 ${
                  expandedSections.cavalry ? "rotate-180" : ""
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
            <div
              className={`transition-all duration-300 overflow-hidden ${
                expandedSections.cavalry
                  ? "max-h-[5000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-4">
                <CavRallyForm />
              </div>
            </div>
          </div>
          {/* Infantry Accordion */}
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection("infantry")}
              className="w-full flex justify-between items-center p-4 bg-gradient-to-r from-rok-purple/30 to-black text-white hover:from-rok-purple/50 transition-all duration-200"
            >
              <span className="text-xl font-semibold">Infantry</span>
              <svg
                className={`w-6 h-6 transform transition-transform duration-200 ${
                  expandedSections.infantry ? "rotate-180" : ""
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
            <div
              className={`transition-all duration-300 overflow-hidden ${
                expandedSections.infantry
                  ? "max-h-[5000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-4">
                <InfLeadForm />
              </div>
            </div>
          </div>

          {/* Archer Accordion */}
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection("archer")}
              className="w-full flex justify-between items-center p-4 bg-gradient-to-r from-rok-purple/30 to-black text-white hover:from-rok-purple/50 transition-all duration-200"
            >
              <span className="text-xl font-semibold">Archer</span>
              <svg
                className={`w-6 h-6 transform transition-transform duration-200 ${
                  expandedSections.archer ? "rotate-180" : ""
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
            <div
              className={`transition-all duration-300 overflow-hidden ${
                expandedSections.archer
                  ? "max-h-[5000px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-4">
                <ArcherRallyForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
        <p className="text-sm text-gray-300 mb-4">
          Note: These calculators are currently in beta and may not be perfect.
          Swapping between rally, field, and garrison only affect gear and some
          inscriptions.
        </p>
        
        {/* Reference Links */}
        <div className="mb-6 flex flex-wrap gap-4">
          <a 
            href="/gear-scores" 
            className="px-4 py-2 bg-rok-purple/30 hover:bg-rok-purple/50 text-white rounded-md flex items-center transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            View Gear Score Reference
          </a>
          <a 
            href="/inscription-scores" 
            className="px-4 py-2 bg-rok-purple/30 hover:bg-rok-purple/50 text-white rounded-md flex items-center transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            View Inscription Score Reference
          </a>
        </div>

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

        {/* Barb For Rally Section */}
        <div className="mt-10 border-t border-gray-700 pt-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Barb Fort Rally Data
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            View and analyze barb fort rally participation data for the kingdom
          </p>
          
          <div className="bg-rok-purple/20 p-6 rounded-lg">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-4">Weekly Rally Data</h3>
                <p className="text-gray-300 mb-4">
                  View the latest weekly rally participation statistics including started and joined rallies.
                </p>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-4">All-Time Rally Data</h3>
                <p className="text-gray-300 mb-4">
                  Track long-term rally participation across the kingdom with historical data.
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <a 
                href="/barbfortrally" 
                className="px-6 py-3 bg-rok-purple hover:bg-rok-purple-dark text-white rounded-md flex items-center transition-all text-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                View Barb Fort Rally Data
              </a>
            </div>
          </div>
        </div>

        {/* Crystal Tech Section */}
        <div className="mt-10 border-t border-gray-700 pt-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Crystal Tech Tree
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Research and develop crystal-based technology for your kingdom
          </p>
          
          <div className="bg-rok-purple/20 p-6 rounded-lg">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-4">Tech Tree</h3>
                <p className="text-gray-300 mb-4">
                  Explore the crystal technology tree and plan your research path.
                </p>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-4">Upgrade Paths</h3>
                <p className="text-gray-300 mb-4">
                  Visualize technology prerequisites and optimize your development strategy.
                </p>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <a 
                href="/crystaltech" 
                className="px-6 py-3 bg-rok-purple hover:bg-rok-purple-dark text-white rounded-md flex items-center transition-all text-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z" clipRule="evenodd" />
                </svg>
                View Crystal Tech Tree
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

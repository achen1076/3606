import React, { useState } from "react";
import PageLayout from "../components/templates/PageLayout.tsx";

export default function FormsPage() {
  const [activeTab, setActiveTab] = useState<string>("cavalry");

  const formUrls = {
    cavalry:
      "https://docs.google.com/forms/d/e/1FAIpQLScsJ5pHD2FygBw1X3kIrewdEPuXRyVLrNTXZvacTWJDTaq6ZQ/viewform?embedded=true",
    infantry:
      "https://docs.google.com/forms/d/e/1FAIpQLScvCCMdzPQI7ZVu2Z4QSxUeJ_114K-X1wur2btEWMyKixGR2g/viewform?embedded=true",
    archer:
      "https://docs.google.com/forms/d/e/1FAIpQLSfUWrnvxnjn5dPNf_AAdmojJKIqqYnZRSzyyXTqQC3-mpmkRQ/viewform?embedded=true",
    mge: "https://docs.google.com/forms/d/e/1FAIpQLScFoLr3bJ0w3jxzFsb6kYUPMTCmcxzW4_7yDIyrVUv1fMwa7w/viewform?embedded=true",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-rok-purple/30">
      <PageLayout>
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-white mb-8">Kingdom Forms</h1>

          {/* Tab Navigation */}
          <div className="flex flex-wrap mb-6 border-b border-gray-700">
            <button
              className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
                activeTab === "cavalry"
                  ? "bg-rok-purple text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("cavalry")}
            >
              Cavalry Lead Form
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
                activeTab === "infantry"
                  ? "bg-rok-purple text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("infantry")}
            >
              Infantry Lead Form
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
                activeTab === "archer"
                  ? "bg-rok-purple text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("archer")}
            >
              Archer Lead Form
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm rounded-t-lg ${
                activeTab === "mge"
                  ? "bg-rok-purple text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("mge")}
            >
              MGE Form
            </button>
          </div>

          {/* Form Container */}
          <div className="bg-black/30 p-4 rounded-lg shadow-lg">
            <div className="relative w-full overflow-hidden pb-[56.25%] h-0">
              <iframe
                src={formUrls[activeTab as keyof typeof formUrls]}
                className="absolute top-0 left-0 w-full h-full border-0"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
              >
                Loading form...
              </iframe>
            </div>
          </div>
        </main>
      </PageLayout>
    </div>
  );
}

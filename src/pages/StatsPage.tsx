import React from "react";
import PageLayout from "../components/templates/PageLayout.tsx";
import PageTitle from "../components/molecules/PageTitle.tsx";
import SectionCard from "../components/molecules/SectionCard.tsx";
import StatCard from "../components/molecules/StatCard.tsx";
import ExcelTable from "../components/parts/ExcelTable.tsx";

export default function StatsPage() {
  return (
    <PageLayout>
      {/* Page Title */}
      <PageTitle
        title="Kingdom"
        highlightedText="Statistics"
        subtitle="Comprehensive data and metrics for Kingdom 3606"
      />

      {/* Kingdom Power Stats */}
      <section className="w-full py-8">
        <SectionCard title="Kingdom Power">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Top 300 Power" value="11.5B" />
            <StatCard title="Top 300 KP" value="79B" />
            <StatCard title="KvK Wins" value="2" />
          </div>
        </SectionCard>
      </section>

      {/* Alliance Stats */}
      <section className="w-full py-8">
        <SectionCard title="Alliance Statistics">
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="bg-rok-purple text-white">
                  <th className="p-3 text-left">Alliance</th>
                  <th className="p-3 text-right">Power</th>
                  <th className="p-3 text-right">KP</th>
                  <th className="p-3 text-right">Members</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="p-3 text-left">~iN</td>
                  <td className="p-3 text-right">7.5B</td>
                  <td className="p-3 text-right">74B</td>
                  <td className="p-3 text-right">153</td>
                </tr>
              </tbody>
            </table>
          </div>
        </SectionCard>
      </section>

      {/* KvK Performance */}
      <section className="w-full py-8">
        <SectionCard title="KvK Performance">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-rok-purple-light mb-4">
                Recent KvK Results
              </h3>
              <div className="space-y-4">
                <div className="bg-black/30 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">Season 3</span>
                    <span className="text-green-400 font-bold">Victory</span>
                  </div>
                  <p className="text-gray-300 mt-2">Top 2 KP</p>
                </div>
                <div className="bg-black/30 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">Season 2</span>
                    <span className="text-green-400 font-bold">Victory</span>
                  </div>
                  <p className="text-gray-300 mt-2">Top 2 KP</p>
                </div>
                <div className="bg-black/30 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">Season 1</span>
                    <span className="text-red-400 font-bold">Loss</span>
                  </div>
                  <p className="text-gray-300 mt-2">
                    Strong performance against 1v3
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-rok-purple-light mb-4">
                Kill Points (Last KvK)
              </h3>
              <div className="bg-black/30 p-4 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-white">Total Kingdom KP</span>
                      <span className="text-white">15.8B</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-rok-purple-light h-2 rounded-full"
                        style={{ width: "95%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-white">T5 Kills</span>
                      <span className="text-white">208M</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-rok-purple-light h-2 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-white">T4 Kills</span>
                      <span className="text-white">1.1B</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-rok-purple-light h-2 rounded-full"
                        style={{ width: "90%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-white">Deaths</span>
                      <span className="text-white">75M</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-rok-purple-light h-2 rounded-full"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>
      </section>

      {/* Player Stats */}
      <section className="w-full py-8">
        <SectionCard title="KvK 3 Player Statistics">
          <div className="mb-4">
            <p className="text-gray-300">
              Player performance data for Kingdom 3606's KvK 3. Click on column
              headers to sort the data.
            </p>
          </div>
          <ExcelTable excelFilePath="/data/3606_k3.xlsx" />
        </SectionCard>
      </section>
    </PageLayout>
  );
}

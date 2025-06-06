import React from "react";
import Header from "../components/parts/header.tsx";
import Footer from "../components/parts/footer.tsx";

export default function LeadsPage() {
  return (
    <div className="overflow-x-hidden bg-black min-h-screen">
      <Header />
      <main className="flex flex-col w-full pt-24 pb-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        {/* Page Title */}
        <section className="w-full py-8 md:py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Kingdom <span className="text-rok-purple-light">Leadership</span>
          </h1>
          <p className="text-lg text-gray-300">
            Meet the dedicated team leading Kingdom 3606 to victory
          </p>
        </section>

        {/* King & Council */}
        <section className="w-full py-8">
          <div className="bg-gradient-to-br from-rok-purple/20 to-black rounded-lg p-6 md:p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Leaders</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* King */}
              <div className="bg-black/30 p-6 rounded-lg text-center">
                <div className="w-32 h-32 mx-auto bg-rok-purple rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-white">👑</span>
                </div>
                <h3 className="text-xl font-bold text-rok-purple-light">
                  BuckNaked
                </h3>
                <p className="text-white font-bold mt-1">King</p>
                <p className="text-gray-400 mt-4 text-sm">
                  "Leading with strategy and strength. Together we conquer."
                </p>
              </div>

              {/* Council Member 1 */}
              <div className="bg-black/30 p-6 rounded-lg text-center">
                <div className="w-32 h-32 mx-auto bg-rok-purple/70 rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-white">⚔️</span>
                </div>
                <h3 className="text-xl font-bold text-rok-purple-light">
                  TSN Stitch
                </h3>
                <p className="text-white font-bold mt-1">War Lead</p>
                <p className="text-gray-400 mt-4 text-sm">
                  "Specializing in battle strategy and field control."
                </p>
              </div>

              {/* Council Member 2 */}
              <div className="bg-black/30 p-6 rounded-lg text-center">
                <div className="w-32 h-32 mx-auto bg-rok-purple/70 rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-white">🏛️</span>
                </div>
                <h3 className="text-xl font-bold text-rok-purple-light">
                  BuckNaked
                </h3>
                <p className="text-white font-bold mt-1">Diplomacy</p>
                <p className="text-gray-400 mt-4 text-sm">
                  "Managing kingdom relations and strategic alliances."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Alliance Leaders */}
        <section className="w-full py-8">
          <div className="bg-gradient-to-br from-rok-purple/20 to-black rounded-lg p-6 md:p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Council</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Alliance Leader 1 */}
              <div className="bg-black/30 p-5 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-rok-purple rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-white">A</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-rok-purple-light">
                      Achen
                    </h3>
                    <p className="text-white text-sm">War Lead / Stats</p>
                  </div>
                </div>
              </div>

              {/* Alliance Leader 2 */}
              <div className="bg-black/30 p-5 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-rok-purple rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-white">M</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-rok-purple-light">
                      Mondu
                    </h3>
                    <p className="text-white text-sm">War and Ark Lead</p>
                  </div>
                </div>
              </div>

              {/* Alliance Leader 3 */}
              <div className="bg-black/30 p-5 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-rok-purple rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-white">K</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-rok-purple-light">
                      Kasper
                    </h3>
                    <p className="text-white text-sm">War Lead / Migration</p>
                  </div>
                </div>
              </div>

              {/* Alliance Leader 4 */}
              <div className="bg-black/30 p-5 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-rok-purple rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-white">R</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-rok-purple-light">
                      Rokishi
                    </h3>
                    <p className="text-white text-sm">Migration</p>
                  </div>
                </div>
              </div>
              {/* Alliance Leader 5 */}
              <div className="bg-black/30 p-5 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-rok-purple rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-white">N</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-rok-purple-light">
                      Nanog
                    </h3>
                    <p className="text-white text-sm">Player Management</p>
                  </div>
                </div>
              </div>
              {/* Alliance Leader 5 */}
              <div className="bg-black/30 p-5 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-rok-purple rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-white">D</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-rok-purple-light">
                      Dory
                    </h3>
                    <p className="text-white text-sm">Event Planner</p>
                  </div>
                </div>
              </div>
              {/* Alliance Leader 5 */}
              <div className="bg-black/30 p-5 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-rok-purple rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-white">T</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-rok-purple-light">
                      Tati
                    </h3>
                    <p className="text-white text-sm">Officer</p>
                  </div>
                </div>
              </div>
              {/* Alliance Leader 5 */}
              <div className="bg-black/30 p-5 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-rok-purple rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl font-bold text-white">G</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-rok-purple-light">
                      Geo
                    </h3>
                    <p className="text-white text-sm">Officer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Officers & Specialists */}
        <section className="w-full py-8">
          <div className="bg-gradient-to-br from-rok-purple/20 to-black rounded-lg p-6 md:p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">
              Rally / Garrison Leads
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* War Coordinator */}
              <div className="bg-black/30 p-5 rounded-lg">
                <h3 className="text-xl font-bold text-rok-purple-light mb-3">
                  Rally Leads
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-rok-purple/60 rounded-full flex items-center justify-center mr-3">
                      <span className="text-lg font-bold text-white">A</span>
                    </div>
                    <div>
                      <p className="text-white font-bold">Achen</p>
                      <p className="text-gray-400 text-sm">Cav Rally Lead</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-rok-purple/60 rounded-full flex items-center justify-center mr-3">
                      <span className="text-lg font-bold text-white">A</span>
                    </div>
                    <div>
                      <p className="text-white font-bold">Achen</p>
                      <p className="text-gray-400 text-sm">Inf Rally Lead</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-rok-purple/60 rounded-full flex items-center justify-center mr-3">
                      <span className="text-lg font-bold text-white">A</span>
                    </div>
                    <div>
                      <p className="text-white font-bold">Achen</p>
                      <p className="text-gray-400 text-sm">
                        Archery Rally Lead
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resource Management */}
              <div className="bg-black/30 p-5 rounded-lg">
                <h3 className="text-xl font-bold text-rok-purple-light mb-3">
                  Garrison Leads
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-rok-purple/60 rounded-full flex items-center justify-center mr-3">
                      <span className="text-lg font-bold text-white">A</span>
                    </div>
                    <div>
                      <p className="text-white font-bold">Achen</p>
                      <p className="text-gray-400 text-sm">Cav Garrison Lead</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-rok-purple/60 rounded-full flex items-center justify-center mr-3">
                      <span className="text-lg font-bold text-white">A</span>
                    </div>
                    <div>
                      <p className="text-white font-bold">Achen</p>
                      <p className="text-gray-400 text-sm">Inf Garrison Lead</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-rok-purple/60 rounded-full flex items-center justify-center mr-3">
                      <span className="text-lg font-bold text-white">A</span>
                    </div>
                    <div>
                      <p className="text-white font-bold">Achen</p>
                      <p className="text-gray-400 text-sm">
                        Archery Garrison Lead
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Leadership */}
        <section className="w-full py-8">
          <div className="bg-rok-purple rounded-lg p-8 text-center shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Contact Our Leadership
            </h2>
            <p className="text-white mb-6">
              Have questions or want to join our kingdom? Our leadership team is
              here to help!
            </p>
            <a className="inline-block bg-white text-rok-purple font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors">
              Contact Us
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

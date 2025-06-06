import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-rok-purple/30 py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-xl font-bold flex items-center">
              <span className="text-white">Kingdom </span>
              <span className="text-rok-purple-light ml-1">3606</span>
            </Link>
            <p className="text-gray-400 mt-4 text-sm">
              A powerful alliance in Rise of Kingdoms. Join us for glory and
              conquest!
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="text-rok-purple-light font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/stats"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Stats
                </Link>
              </li>
              <li>
                <Link
                  to="/leads"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Leadership
                </Link>
              </li>
              <li>
                <Link
                  to="/tools"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Tools
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-rok-purple-light font-bold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-rok-purple/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Kingdom 3606. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs mt-2 md:mt-0">
            Rise of Kingdoms is a registered trademark of Lilith Games. This
            site is not affiliated with Lilith Games.
          </p>
        </div>
      </div>
    </footer>
  );
}

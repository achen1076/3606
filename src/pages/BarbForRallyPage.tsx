import React, { useState, useEffect } from "react";
import PageLayout from "../components/templates/PageLayout.tsx";
import PageTitle from "../components/molecules/PageTitle.tsx";
import SectionCard from "../components/molecules/SectionCard.tsx";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.tsx";

interface RallyData {
  governor_id: string;
  started: number;
  joined: number;
  name: string;
  total: number;
}

type SortField = "governor_id" | "name" | "started" | "joined" | "total";
type SortDirection = "asc" | "desc";

interface TableProps {
  data: RallyData[];
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
  title: string;
}

// Table component to avoid code duplication
const RallyTable: React.FC<TableProps> = ({
  data,
  searchTerm,
  isLoading,
  error,
  title,
}) => {
  // State for sorting
  const [sortField, setSortField] = useState<SortField>("total");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Handle column header click for sorting
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      // Toggle direction if same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new field and default to descending
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // First sort the entire dataset to establish ranks
  const rankedData = [...data]
    .sort((a, b) => {
      // Default sort by total in descending order for establishing ranks
      return b.total - a.total;
    })
    .map((item, index) => ({
      ...item,
      originalRank: index + 1, // Add original rank based on total
    }));

  // Filter data based on search term
  const filteredData = rankedData.filter((item) => {
    if (!searchTerm) return true;

    const searchTermLower = searchTerm.toLowerCase();
    const nameMatch =
      item.name && typeof item.name === "string"
        ? item.name.toLowerCase().includes(searchTermLower)
        : false;
    const idMatch =
      item.governor_id && typeof item.governor_id === "string"
        ? item.governor_id.toLowerCase().includes(searchTermLower)
        : false;
    return nameMatch || idMatch;
  });

  // Sort the filtered data
  const sortedData = [...filteredData].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    // Handle string comparison for governor_id and name
    if (sortField === "governor_id" || sortField === "name") {
      aValue = String(aValue || "").toLowerCase();
      bValue = String(bValue || "").toLowerCase();

      if (sortDirection === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    }
    // Handle numeric comparison
    else {
      if (sortDirection === "asc") {
        return Number(aValue) - Number(bValue);
      } else {
        return Number(bValue) - Number(aValue);
      }
    }
  });

  // Helper for sort indicator
  const getSortIndicator = (field: SortField) => {
    if (field !== sortField) return null;
    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  return (
    <SectionCard title={title}>
      {isLoading ? (
        <div className="flex justify-center items-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-rok-purple"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 p-2 text-center text-sm">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-white text-sm">
            <thead>
              <tr className="bg-rok-purple text-white">
                <th className="p-2 text-center w-12">#</th>
                <th
                  className="p-2 text-left cursor-pointer hover:bg-rok-purple-dark"
                  onClick={() => handleSort("governor_id")}
                >
                  Governor ID{getSortIndicator("governor_id")}
                </th>
                <th
                  className="p-2 text-left cursor-pointer hover:bg-rok-purple-dark"
                  onClick={() => handleSort("name")}
                >
                  Name{getSortIndicator("name")}
                </th>
                <th
                  className="p-2 text-center cursor-pointer hover:bg-rok-purple-dark"
                  onClick={() => handleSort("started")}
                >
                  Started{getSortIndicator("started")}
                </th>
                <th
                  className="p-2 text-center cursor-pointer hover:bg-rok-purple-dark"
                  onClick={() => handleSort("joined")}
                >
                  Joined{getSortIndicator("joined")}
                </th>
                <th
                  className="p-2 text-center cursor-pointer hover:bg-rok-purple-dark"
                  onClick={() => handleSort("total")}
                >
                  Total{getSortIndicator("total")}
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.length > 0 ? (
                sortedData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-700 hover:bg-gray-800"
                  >
                    <td className="p-2 text-center font-medium">
                      {item.originalRank}
                    </td>
                    <td className="p-2 text-left">{item.governor_id}</td>
                    <td className="p-2 text-left">{item.name}</td>
                    <td className="p-2 text-center">{item.started}</td>
                    <td className="p-2 text-center">{item.joined}</td>
                    <td className="p-2 text-center">{item.total}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="p-2 text-center text-gray-400 text-sm"
                  >
                    No matching records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </SectionCard>
  );
};

export default function BarbForRallyPage() {
  const { user, isLoggedIn } = useAuth();
  const [weeklyData, setWeeklyData] = useState<RallyData[]>([]);
  const [entireData, setEntireData] = useState<RallyData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingWeekly, setIsLoadingWeekly] = useState(true);
  const [isLoadingEntire, setIsLoadingEntire] = useState(true);
  const [weeklyError, setWeeklyError] = useState<string | null>(null);
  const [entireError, setEntireError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"weekly" | "entire">("weekly");

  // Check if the current user is an admin
  const isAdmin = isLoggedIn && user?.role === "admin";

  // Helper function to parse CSV data
  const parseCSVData = (text: string): RallyData[] => {
    const rows = text.split("\n");
    const parsedData: RallyData[] = [];

    // Process each row (skip header)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].trim();
      if (row === "") continue; // Skip empty rows

      // Special handling for CSV with potential special characters in the name field
      // The CSV format is: governor_id,started,cancelled,completed,hit_target,joined,name

      // First, get the position of the 6th comma which is before the name field
      let commaCount = 0;
      let lastCommaPos = -1;

      for (let j = 0; j < row.length; j++) {
        if (row[j] === ",") {
          commaCount++;
          lastCommaPos = j;
          if (commaCount === 6) break; // Found the 6th comma
        }
      }

      if (commaCount < 6) continue; // Skip malformed rows

      // Extract fields
      const beforeName = row.substring(0, lastCommaPos);
      const fields = beforeName.split(",");
      const name = row.substring(lastCommaPos + 1); // Everything after the 6th comma is the name

      // Get the required fields
      const governorId = fields[0] || "";
      const started = parseInt(fields[1]) || 0;
      const joined = parseInt(fields[5]) || 0;

      parsedData.push({
        governor_id: governorId,
        started: started,
        joined: joined,
        name: name || "Unknown",
        total: started + joined,
      });
    }

    // Filter out any invalid entries
    const validData = parsedData.filter(
      (item) => item.governor_id !== undefined && item.name !== undefined
    );

    // Sort by total in descending order
    return [...validData].sort((a, b) => b.total - a.total);
  };

  // Function to fetch data without automatically updating timestamp
  const fetchData = async () => {
    await Promise.all([fetchWeeklyData(), fetchEntireData()]);
    // Note: We don't automatically update the timestamp here anymore
  };

  // The timestamp is set manually in the code
  // This is a hardcoded timestamp that should be updated manually in the codebase
  // Format: "YYYY-MM-DDThh:mm:ss-04:00" for EST timezone
  // Example: August 11, 2025 7:56 PM EST = "2025-08-11T19:56:00-04:00"
  // Note: The -04:00 part specifies the EST timezone offset
  const MANUAL_TIMESTAMP = new Date("2025-08-31T20:00:00-04:00"); // August 31, 2025 08:00:00 PM EST

  // Function to fetch weekly data
  const fetchWeeklyData = async () => {
    try {
      setIsLoadingWeekly(true);
      const response = await fetch("/data/rally_data_weekly.csv");
      const text = await response.text();

      const sortedData = parseCSVData(text);
      setWeeklyData(sortedData);
      setIsLoadingWeekly(false);
    } catch (err) {
      console.error("Error fetching or parsing weekly CSV data:", err);
      setWeeklyError(
        "Failed to load weekly rally data. Please try again later."
      );
      setIsLoadingWeekly(false);
    }
  };

  // Function to fetch entire data
  const fetchEntireData = async () => {
    try {
      setIsLoadingEntire(true);
      const response = await fetch("/data/rally_data_entire.csv");
      const text = await response.text();

      const sortedData = parseCSVData(text);
      setEntireData(sortedData);
      setIsLoadingEntire(false);
    } catch (err) {
      console.error("Error fetching or parsing entire CSV data:", err);
      setEntireError(
        "Failed to load entire rally data. Please try again later."
      );
      setIsLoadingEntire(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PageLayout>
      {/* Page Title */}
      <PageTitle
        title="Barb Fort"
        highlightedText="Rallys"
        subtitle="Rally participation data"
      />

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

      {/* Last Updated Timestamp and Update Button */}
      <div className="mb-4">
        <div className="text-gray-400 text-sm flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
          <span>
            Data last updated:{" "}
            {MANUAL_TIMESTAMP.toLocaleString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
              timeZoneName: "short",
            })}
          </span>
        </div>
      </div>

      {/* Search Section */}
      <section className="w-full py-4">
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name or governor ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-rok-purple"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="w-full py-2">
        <div className="flex border-b border-gray-700 mb-4">
          <button
            onClick={() => setActiveTab("weekly")}
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === "weekly"
                ? "border-b-2 border-rok-purple text-rok-purple-light"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Weekly Rally Data
          </button>
          <button
            onClick={() => setActiveTab("entire")}
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === "entire"
                ? "border-b-2 border-rok-purple text-rok-purple-light"
                : "text-gray-400 hover:text-white"
            }`}
          >
            All-Time Rally Data
          </button>
        </div>

        {/* Tab Content */}
        <div className="w-full">
          {/* Weekly Rally Data Table */}
          {activeTab === "weekly" && (
            <RallyTable
              data={weeklyData}
              searchTerm={searchTerm}
              isLoading={isLoadingWeekly}
              error={weeklyError}
              title="Weekly Rally Data"
            />
          )}

          {/* Entire Rally Data Table */}
          {activeTab === "entire" && (
            <RallyTable
              data={entireData}
              searchTerm={searchTerm}
              isLoading={isLoadingEntire}
              error={entireError}
              title="All-Time Rally Data"
            />
          )}
        </div>
      </div>
    </PageLayout>
  );
}

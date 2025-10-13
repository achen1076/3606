import React, { useState, useEffect, useMemo } from "react";
import * as XLSX from "xlsx";
import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa";
import Navbar from "../components/organisms/navbar.tsx";
import Footer from "../components/parts/footer.tsx";

interface RowData {
  id: number;
  [key: string]: any;
}

interface DeltaMap {
  [key: string]: {
    [column: string]: number;
  };
}

interface SortConfig {
  key: string | null;
  direction: "asc" | "desc" | null;
}

export default function KOABStatsPage() {
  const [data, setData] = useState<RowData[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState("name");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: null,
  });
  const [sortByDelta, setSortByDelta] = useState(false);
  const [deltas, setDeltas] = useState<DeltaMap>({});

  useEffect(() => {
    const fetchExcelData = async () => {
      try {
        // Load original data
        const response1 = await fetch("/KOAB3606.xlsx");
        const arrayBuffer1 = await response1.arrayBuffer();
        const workbook1 = XLSX.read(arrayBuffer1, { type: "array" });
        const worksheet1 = workbook1.Sheets[workbook1.SheetNames[0]];
        const originalData = XLSX.utils.sheet_to_json(worksheet1, {
          header: 1,
        }) as any[][];

        // Load updated data from the "3606" sheet
        const response2 = await fetch("/data/updated_stats.xlsx");
        const arrayBuffer2 = await response2.arrayBuffer();
        const workbook2 = XLSX.read(arrayBuffer2, { type: "array" });
        const worksheet2 = workbook2.Sheets["3606"];
        const updatedData = XLSX.utils.sheet_to_json(worksheet2, {
          header: 1,
        }) as any[][];

        if (originalData.length > 0) {
          const headers = originalData[0] as string[];
          setColumns(headers);

          // Create lookup map for updated data by ID
          const updatedMap: { [key: string]: any } = {};
          if (updatedData.length > 0) {
            const updatedHeaders = updatedData[0] as string[];
            const idIndex = updatedHeaders.findIndex((h) =>
              String(h).toLowerCase().includes("id")
            );

            updatedData.slice(1).forEach((row) => {
              const id = row[idIndex];
              if (id) {
                const rowObj: any = {};
                updatedHeaders.forEach((header, idx) => {
                  rowObj[String(header).toLowerCase()] = row[idx];
                });
                updatedMap[id] = rowObj;
              }
            });
          }

          // Process original data and calculate deltas
          const originalIdIndex = headers.findIndex((h) =>
            String(h).toLowerCase().includes("id")
          );

          const deltaMap: DeltaMap = {};
          const rows = originalData
            .slice(1)
            .filter((row) => {
              // Filter out empty rows - check if any cell has data
              return row.some(
                (cell) => cell !== null && cell !== undefined && cell !== ""
              );
            })
            .map((row, index) => {
              const rowData: RowData = { id: index };
              const governorId = row[originalIdIndex];

              headers.forEach((header, idx) => {
                rowData[header] = row[idx];
              });

              // Calculate deltas if updated data exists
              if (governorId && updatedMap[governorId]) {
                const deltaKey = `row_${index}`;
                deltaMap[deltaKey] = {};

                headers.forEach((header, idx) => {
                  const originalValue = row[idx];
                  const updatedValue =
                    updatedMap[governorId][String(header).toLowerCase()];

                  // Only calculate delta for numeric columns
                  if (
                    originalValue !== undefined &&
                    updatedValue !== undefined
                  ) {
                    const origNum = Number(originalValue);
                    const updNum = Number(updatedValue);

                    if (
                      !isNaN(origNum) &&
                      !isNaN(updNum) &&
                      origNum !== updNum
                    ) {
                      deltaMap[deltaKey][header] = updNum - origNum;
                    }
                  }
                });
              }

              return rowData;
            });

          setData(rows);
          setDeltas(deltaMap);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error loading Excel file:", err);
        setError((err as Error).message);
        setLoading(false);
      }
    };

    fetchExcelData();
  }, []);

  // Format numbers with commas (except for ID column)
  const formatNumber = (value: any, column: string): string => {
    if (value === undefined || value === null || value === "") return "";

    // Don't format ID columns
    const isIdColumn =
      column &&
      (column.toLowerCase().includes("id") || column.toLowerCase() === "id");

    if (isIdColumn) {
      return String(value);
    }

    const num = Number(value);

    // Check if it's DKP column - remove decimals
    const isDKPColumn = column && column.toLowerCase().includes("dkp");

    if (!isNaN(num)) {
      // Round all numbers to integers and format with commas
      if (Math.abs(num) >= 1000 || isDKPColumn) {
        return Math.round(num).toLocaleString();
      } else {
        return Math.round(num).toString();
      }
    }

    return String(value);
  };

  // Handle sorting
  const handleSort = (column: string) => {
    let direction: "asc" | "desc" | null = "asc";

    if (sortConfig.key === column) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = null;
      }
    }

    setSortConfig({ key: column, direction });
  };

  // Get sort icon
  const getSortIcon = (column: string) => {
    if (sortConfig.key !== column) {
      return <FaSort className="text-rok-purple-light opacity-50" />;
    }

    if (sortConfig.direction === "asc") {
      return <FaSortUp className="text-white" />;
    } else if (sortConfig.direction === "desc") {
      return <FaSortDown className="text-white" />;
    }

    return <FaSort className="text-rok-purple-light opacity-50" />;
  };

  // Get name and ID columns
  const nameColumn = useMemo(() => {
    return (
      columns.find(
        (col) =>
          col.toLowerCase().includes("name") ||
          col.toLowerCase().includes("governor")
      ) || columns[0]
    );
  }, [columns]);

  const idColumn = useMemo(() => {
    return (
      columns.find(
        (col) => col.toLowerCase().includes("id") || col.toLowerCase() === "id"
      ) || columns[0]
    );
  }, [columns]);

  // Filter and sort data
  const processedData = useMemo(() => {
    let filtered = [...data];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((row) => {
        const columnToSearch = searchColumn === "name" ? nameColumn : idColumn;
        const value = row[columnToSearch];
        if (value === undefined || value === null) return false;

        const stringValue = String(value).toLowerCase();
        return stringValue.includes(searchTerm.toLowerCase());
      });
    }

    // Apply sorting
    if (sortConfig.key && sortConfig.direction) {
      filtered.sort((a, b) => {
        let aVal, bVal;

        // Sort by delta if enabled
        if (sortByDelta) {
          const aDeltaKey = `row_${a.id}`;
          const bDeltaKey = `row_${b.id}`;
          aVal = deltas[aDeltaKey]?.[sortConfig.key!] || 0;
          bVal = deltas[bDeltaKey]?.[sortConfig.key!] || 0;
        } else {
          // Sort by original + delta (the sum)
          const aDeltaKey = `row_${a.id}`;
          const bDeltaKey = `row_${b.id}`;
          const aDelta = deltas[aDeltaKey]?.[sortConfig.key!];
          const bDelta = deltas[bDeltaKey]?.[sortConfig.key!];

          aVal =
            aDelta !== undefined
              ? (Number(a[sortConfig.key!]) || 0) + aDelta
              : a[sortConfig.key!];
          bVal =
            bDelta !== undefined
              ? (Number(b[sortConfig.key!]) || 0) + bDelta
              : b[sortConfig.key!];
        }

        // Handle null/undefined
        if (aVal === null || aVal === undefined) return 1;
        if (bVal === null || bVal === undefined) return -1;

        // Try numeric comparison first
        const aNum = Number(aVal);
        const bNum = Number(bVal);

        if (!isNaN(aNum) && !isNaN(bNum)) {
          return sortConfig.direction === "asc" ? aNum - bNum : bNum - aNum;
        }

        // String comparison
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();

        if (aStr < bStr) return sortConfig.direction === "asc" ? -1 : 1;
        if (aStr > bStr) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [
    data,
    searchTerm,
    searchColumn,
    nameColumn,
    idColumn,
    sortConfig,
    sortByDelta,
    deltas,
  ]);

  const handleReset = () => {
    setSearchTerm("");
    setSearchColumn("name");
    setSortConfig({ key: null, direction: null });
    setSortByDelta(false);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-24 pb-12 min-h-screen bg-black">
          <div className="w-[90%] mx-auto">
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-rok-purple"></div>
                <div className="mt-4 text-xl text-white">Loading data...</div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="pt-24 pb-12 min-h-screen bg-black">
          <div className="w-[90%] mx-auto">
            <div className="bg-red-900/20 border-l-4 border-red-500 p-6 rounded-2xl">
              <div className="text-xl text-red-300 font-semibold">
                Error Loading Data
              </div>
              <div className="text-red-400 mt-2">{error}</div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="pt-24 min-h-screen bg-black">
        {/* Table Section */}
        <section className="py-8">
          <div className="w-[90%] mx-auto">
            {/* Page Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              3606 KOAB Stats
            </h1>

            {/* Search and Filter Controls */}
            <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="flex-1 w-full md:max-w-md">
                <input
                  type="text"
                  placeholder={
                    searchColumn === "name" ? "Search by name" : "Search by ID"
                  }
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 text-white placeholder-gray-500 border border-white/10 focus:outline-none focus:ring-2 focus:ring-rok-purple-light focus:border-transparent focus:bg-white/10 transition-all duration-200"
                />
              </div>

              <div className="flex items-center gap-6">
                {/* Search Type Radio Buttons */}
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="searchType"
                      value="name"
                      checked={searchColumn === "name"}
                      onChange={(e) => setSearchColumn(e.target.value)}
                      className="w-4 h-4 text-rok-purple accent-rok-purple focus:ring-rok-purple-light"
                    />
                    <span className="text-gray-300 text-sm">Name</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="searchType"
                      value="id"
                      checked={searchColumn === "id"}
                      onChange={(e) => setSearchColumn(e.target.value)}
                      className="w-4 h-4 text-rok-purple accent-rok-purple focus:ring-rok-purple-light"
                    />
                    <span className="text-gray-300 text-sm">ID</span>
                  </label>
                </div>

                {/* Sort by Deltas Toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-gray-300 text-sm">Sort by Deltas</span>
                  <button
                    onClick={() => setSortByDelta(!sortByDelta)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
                      sortByDelta ? "bg-green-500" : "bg-white/10"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                        sortByDelta ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Reset Button */}
                <button
                  onClick={handleReset}
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Table Container */}
            <div className="bg-black rounded-2xl shadow-lg overflow-hidden border border-rok-purple/30">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-rok-purple">
                      {columns.map((column, index) => (
                        <th
                          key={index}
                          onClick={() => handleSort(column)}
                          className="px-6 py-4 text-left text-xs font-bold text-white tracking-wider uppercase whitespace-nowrap cursor-pointer hover:bg-rok-purple-dark transition-colors duration-150 select-none"
                        >
                          <div className="flex items-center gap-2">
                            <span>{column}</span>
                            {getSortIcon(column)}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-black">
                    {processedData.map((row, rowIndex) => {
                      const deltaKey = `row_${row.id}`;
                      const rowDeltas = deltas[deltaKey] || {};

                      return (
                        <tr
                          key={row.id}
                          className={`transition-colors duration-100 border-b border-gray-800/50 ${
                            rowIndex % 2 === 0
                              ? "bg-black hover:bg-rok-purple-dark/20"
                              : "bg-rok-purple-dark/30 hover:bg-rok-purple-dark/40"
                          }`}
                        >
                          {columns.map((column, colIndex) => {
                            const delta = rowDeltas[column];
                            const hasDelta = delta !== undefined;

                            // Calculate percentage for Required KP column
                            // Show (Kill Points delta / Required KP) as percentage
                            let percentage: string | null = null;
                            if (column === "Required KP") {
                              const killPointsDelta = rowDeltas["Kill Points"];
                              const requiredKP =
                                Number(row["Required KP"]) || 0;

                              if (
                                killPointsDelta !== undefined &&
                                requiredKP > 0
                              ) {
                                percentage = ((killPointsDelta / requiredKP) * 100).toFixed(1);
                              }
                            }

                            return (
                              <td
                                key={colIndex}
                                className="px-6 py-4 whitespace-nowrap text-sm"
                              >
                                <div className="flex flex-col items-start gap-1.5">
                                  <span className="text-white font-medium">
                                    {hasDelta
                                      ? formatNumber(
                                          (Number(row[column]) || 0) + delta,
                                          column
                                        )
                                      : formatNumber(row[column], column)}
                                  </span>
                                  {hasDelta && (
                                    <span
                                      className={`inline-flex items-center justify-center text-xs font-semibold px-2.5 py-1 rounded-full min-w-fit ${
                                        delta > 0
                                          ? "bg-green-100 text-green-700"
                                          : "bg-red-100 text-red-700"
                                      }`}
                                    >
                                      {delta > 0 ? "+" : ""}
                                      {formatNumber(delta, column)}
                                    </span>
                                  )}
                                  {percentage !== null && (
                                    <span
                                      className={`inline-flex items-center justify-center text-xs font-semibold px-2.5 py-1 rounded-full min-w-fit ${
                                        parseFloat(percentage) >= 100
                                          ? "bg-green-100 text-green-700"
                                          : parseFloat(percentage) >= 80
                                          ? "bg-yellow-100 text-yellow-700"
                                          : "bg-red-100 text-red-700"
                                      }`}
                                    >
                                      {percentage}%
                                    </span>
                                  )}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer Stats */}
            <div className="mt-4 flex items-center justify-between text-sm text-rok-purple-light">
              <div>
                Showing{" "}
                <span className="font-semibold text-white">
                  {processedData.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-white">{data.length}</span>{" "}
                entries
              </div>
              <div>
                <span className="font-semibold text-white">
                  {columns.length}
                </span>{" "}
                columns total
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

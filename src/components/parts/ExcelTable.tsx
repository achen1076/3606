import React, { useState, useEffect, useMemo } from "react";
import * as XLSX from "xlsx";

interface ExcelTableProps {
  excelFilePath?: string;
  initialSeason?: number;
}

export default function ExcelTable({
  excelFilePath = "/data/3606_k3.xlsx",
  initialSeason = 3,
}: ExcelTableProps) {
  const [currentSeason, setCurrentSeason] = useState<number>(initialSeason);

  // Define file paths for different seasons
  const seasonFilePaths = {
    3: "/data/3606_k3.xlsx",
    4: "/data/3606_k4.xlsx",
  };

  // Update file path when season changes
  const currentFilePath =
    seasonFilePaths[currentSeason as keyof typeof seasonFilePaths] ||
    excelFilePath;
  const [excelData, setExcelData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchColumn, setSearchColumn] = useState<string>("name");
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "ascending" | "descending";
  }>({
    key: null,
    direction: "ascending",
  });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);

  // Load Excel data
  const loadExcelData = async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      // Add a cache-busting query parameter to force a fresh fetch
      const cacheBuster = forceRefresh ? `?refresh=${Date.now()}` : "";
      const fullPath = `${currentFilePath}${cacheBuster}`;

      console.log("Fetching Excel file from:", fullPath);

      const response = await fetch(fullPath);

      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status}. Make sure the file exists at ${excelFilePath}`
        );
      }

      const arrayBuffer = await response.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);

      console.log("Excel file fetched, size:", data.length, "bytes");

      if (data.length === 0) {
        throw new Error("Excel file is empty");
      }

      // Read the Excel file
      const workbook = XLSX.read(data, { type: "array" });

      if (
        !workbook ||
        !workbook.SheetNames ||
        workbook.SheetNames.length === 0
      ) {
        throw new Error("Invalid Excel file format or empty workbook");
      }

      console.log("Excel sheets found:", workbook.SheetNames);

      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];

      if (!worksheet) {
        throw new Error(`Worksheet '${worksheetName}' not found in Excel file`);
      }

      // Convert to JSON with header row
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      console.log("Excel data rows:", jsonData.length);
      console.log("First row sample:", jsonData[0]);

      if (!jsonData || jsonData.length === 0) {
        throw new Error("No data found in Excel file");
      }

      // Extract headers from the first row
      const allHeaders = jsonData[0] as string[];

      if (!allHeaders || allHeaders.length === 0) {
        throw new Error("No headers found in Excel file");
      }

      console.log("Excel headers:", allHeaders);

      // Find indices of specific columns we want to show: Governor Name, Governor ID, Total Dead, and Total KP
      const desiredColumns = [
        "governor name",
        "governor id",
        "total dead",
        "total kp",
      ];

      const columnsToInclude = allHeaders
        .map((header, index) => {
          if (header) {
            const headerLower = header.toString().toLowerCase();
            // Only include columns that match our desired columns
            if (desiredColumns.some((col) => headerLower.includes(col))) {
              return index;
            }
          }
          return null;
        })
        .filter((index) => index !== null) as number[];

      console.log("Columns to include:", columnsToInclude);

      // Categorize columns by type
      const nameColumnIndex = columnsToInclude.find((index) => {
        const header = allHeaders[index].toString().toLowerCase();
        return header.includes("name") || header.includes("governor");
      });

      const idColumnIndex = columnsToInclude.find((index) => {
        const header = allHeaders[index].toString().toLowerCase();
        return header.includes("id");
      });

      const kpColumnIndex = columnsToInclude.find((index) => {
        const header = allHeaders[index].toString().toLowerCase();
        return header.includes("kp") || header.includes("kill points");
      });

      const deadColumnIndex = columnsToInclude.find((index) => {
        const header = allHeaders[index].toString().toLowerCase();
        return header.includes("dead");
      });

      // Arrange columns in logical order: Name, ID, KP, Dead
      const orderedColumnIndices = [
        nameColumnIndex,
        idColumnIndex,
        kpColumnIndex,
        deadColumnIndex,
      ].filter((index) => index !== undefined) as number[];

      console.log("Ordered column indices:", orderedColumnIndices);

      // Create standardized headers with consistent naming
      const standardizedHeaders: string[] = [];

      // Make sure we have the correct headers in the right order
      orderedColumnIndices.forEach((index, arrayIndex) => {
        // First column should be Governor Name
        if (arrayIndex === 0) {
          standardizedHeaders.push("Governor Name");
        }
        // Second column should be Governor ID
        else if (arrayIndex === 1) {
          standardizedHeaders.push("Governor ID");
        }
        // Third column should be Total KP
        else if (arrayIndex === 2) {
          standardizedHeaders.push("Total KP");
        }
        // Fourth column should be Total Dead
        else if (arrayIndex === 3) {
          standardizedHeaders.push("Total Dead");
        }
        // Fallback to original header if we have more columns
        else {
          standardizedHeaders.push(allHeaders[index].toString());
        }
      });

      setHeaders(standardizedHeaders);

      // Extract data rows
      const filteredRows = jsonData.slice(1).map((row: any) => {
        return orderedColumnIndices.map((index) => row[index]);
      });

      setExcelData(filteredRows);
      setLoading(false);
    } catch (error: any) {
      console.error("Error loading Excel file:", error);
      setError(`Failed to load the Excel file. ${error.message}`);
      setLoading(false);
    }
  };

  // Function to manually refresh data
  const handleRefresh = () => {
    loadExcelData(true);
  };

  // Mouse event handlers for drag-to-scroll functionality
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only enable drag on the table body (not headers)
    if ((e.target as HTMLElement).tagName === "TH") return;

    const tableContainer = e.currentTarget;
    setIsDragging(true);
    setStartX(e.pageX - tableContainer.offsetLeft);
    setScrollLeft(tableContainer.scrollLeft);
    tableContainer.classList.add("cursor-grabbing");
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.classList.remove("cursor-grabbing");
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    e.preventDefault();
    const tableContainer = e.currentTarget;
    const x = e.pageX - tableContainer.offsetLeft;
    const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
    tableContainer.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(false);
    e.currentTarget.classList.remove("cursor-grabbing");
  };

  useEffect(() => {
    // Load the Excel file directly from the public directory
    loadExcelData(true);
  }, [currentSeason]);

  // Find the indices of name and ID columns in the headers
  const nameColumnIndex = useMemo(() => {
    if (!headers || headers.length === 0) return -1;
    return headers.findIndex(
      (header) =>
        typeof header === "string" &&
        (header.toLowerCase().includes("name") ||
          header.toLowerCase().includes("governor"))
    );
  }, [headers]);

  const idColumnIndex = useMemo(() => {
    if (!headers || headers.length === 0) return -1;
    return headers.findIndex(
      (header) =>
        typeof header === "string" && header.toLowerCase().includes("id")
    );
  }, [headers]);

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!excelData || excelData.length === 0 || !searchTerm) return excelData;

    // Determine which column to search in
    const columnIndex =
      searchColumn === "name" ? nameColumnIndex : idColumnIndex;
    if (columnIndex === -1) return excelData; // If column not found, return all data

    return excelData.filter((row) => {
      if (!row[columnIndex]) return false;
      return row[columnIndex]
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
  }, [excelData, searchTerm, searchColumn, nameColumnIndex, idColumnIndex]);

  // Handle sorting of columns
  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";

    // If we're already sorting by this key, toggle the direction
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    setSortConfig({ key, direction });
  };

  // Get sorted data based on current sort configuration
  const sortedData = useMemo(() => {
    if (!filteredData || filteredData.length === 0 || !sortConfig.key) {
      return filteredData;
    }

    const sortColumnIndex = parseInt(sortConfig.key, 10);
    if (isNaN(sortColumnIndex)) return filteredData;

    // Get the header for the column we're sorting
    const headerName = headers[sortColumnIndex]?.toLowerCase() || "";

    // Determine if this is a numeric column (KP or Dead)
    const isNumericColumn =
      headerName.includes("kp") ||
      headerName.includes("dead") ||
      headerName.includes("kill");

    return [...filteredData].sort((a, b) => {
      // Get values at the sorted column index
      let aValue = a[sortColumnIndex];
      let bValue = b[sortColumnIndex];

      if (isNumericColumn) {
        // Handle numeric columns (KP, Dead)
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
      } else {
        // Handle string columns (Name, ID)
        aValue = aValue ? aValue.toString().toLowerCase() : "";
        bValue = bValue ? bValue.toString().toLowerCase() : "";
      }

      // Perform the comparison
      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig, headers]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchColumnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchColumn(e.target.value);
  };

  // Format large numbers with K, M, B suffixes
  const formatNumber = (num: number | string | undefined): string => {
    if (num === undefined || num === null) return "0";

    const value = typeof num === "string" ? parseFloat(num) : num;

    if (isNaN(value)) return "0";

    if (value >= 1000000000) {
      return (value / 1000000000).toFixed(1) + "B";
    } else if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + "M";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + "K";
    } else {
      return value.toString();
    }
  };

  // Reset to default state
  const handleReset = () => {
    setSearchTerm("");
    setSortConfig({ key: null, direction: "ascending" });
    // Scroll to top of table container if available
    const tableContainer = document.querySelector(".table-container");
    if (tableContainer) {
      tableContainer.scrollLeft = 0;
      tableContainer.scrollTop = 0;
    }
  };

  return (
    <div className="w-full">
      {/* Title */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-rok-purple">
          KvK {currentSeason} Player Statistics
        </h2>
        <p className="text-gray-400 mt-1">
          Kingdom 3606 player performance data
        </p>
      </div>

      {/* Season Selector */}
      <div className="mb-6 flex justify-center">
        <div className="inline-flex bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setCurrentSeason(3)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              currentSeason === 3
                ? "bg-rok-purple text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            Season 3
          </button>
          <button
            onClick={() => setCurrentSeason(4)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              currentSeason === 4
                ? "bg-rok-purple text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            Season 4
          </button>
        </div>
      </div>

      {/* Search and controls */}
      <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder={`Search by ${searchColumn}`}
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-rok-purple"
          />
          <div className="absolute right-3 top-2.5 text-gray-400">🔍</div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <label
              className={`flex items-center cursor-pointer ${
                searchColumn === "name" ? "text-rok-purple" : "text-gray-400"
              }`}
            >
              <input
                type="radio"
                name="searchColumn"
                value="name"
                checked={searchColumn === "name"}
                onChange={handleSearchColumnChange}
                className="hidden"
              />
              <span className="ml-1">Name</span>
            </label>
            <label
              className={`flex items-center cursor-pointer ${
                searchColumn === "id" ? "text-rok-purple" : "text-gray-400"
              }`}
            >
              <input
                type="radio"
                name="searchColumn"
                value="id"
                checked={searchColumn === "id"}
                onChange={handleSearchColumnChange}
                className="hidden"
              />
              <span className="ml-1">ID</span>
            </label>
          </div>

          <button
            onClick={handleReset}
            className="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-white rounded-md flex items-center"
          >
            <span className="mr-1">↺</span> Reset
          </button>

          <button
            onClick={handleRefresh}
            className="px-3 py-1 bg-rok-purple hover:bg-rok-purple-dark text-white rounded-md flex items-center"
          >
            <span className="mr-1">⟳</span> Refresh
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rok-purple"></div>
          <p className="ml-3 text-white">Loading data...</p>
        </div>
      ) : error ? (
        <div className="bg-red-900/30 border border-red-800 text-white p-4 rounded-lg">
          <p>{error}</p>
        </div>
      ) : (
        <div>
          {sortedData && sortedData.length > 0 ? (
            <div>
              <p className="text-gray-400 text-sm mb-2">
                {sortedData.length} records found
              </p>
              <div
                className={`overflow-x-auto max-h-[70vh] rounded-lg border border-gray-800 ${
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <table className="min-w-full divide-y divide-gray-800 text-white">
                  <thead className="bg-rok-purple sticky top-0">
                    <tr>
                      {headers.map((header, index) => (
                        <th
                          key={index}
                          onClick={() => requestSort(index.toString())}
                          className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-rok-purple-dark ${
                            sortConfig.key === index.toString()
                              ? "bg-rok-purple-dark"
                              : ""
                          }`}
                        >
                          <div className="flex items-center">
                            <span>{header}</span>
                            {sortConfig.key === index.toString() && (
                              <span className="ml-1">
                                {sortConfig.direction === "ascending"
                                  ? "↑"
                                  : "↓"}
                              </span>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-black/20 divide-y divide-gray-800">
                    {sortedData.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={`${
                          rowIndex % 2 === 0 ? "bg-black/30" : "bg-black/10"
                        } hover:bg-rok-purple/20`}
                      >
                        {row.map((cell: any, cellIndex: number) => {
                          // Determine if this column likely contains numeric data
                          const isLikelyNumeric =
                            headers[cellIndex] &&
                            typeof headers[cellIndex] === "string" &&
                            (headers[cellIndex]
                              .toString()
                              .toLowerCase()
                              .includes("kp") ||
                              headers[cellIndex]
                                .toString()
                                .toLowerCase()
                                .includes("dead") ||
                              headers[cellIndex]
                                .toString()
                                .toLowerCase()
                                .includes("kill") ||
                              headers[cellIndex]
                                .toString()
                                .toLowerCase()
                                .includes("power"));

                          return (
                            <td
                              key={cellIndex}
                              className={`px-4 py-2 whitespace-nowrap text-sm ${
                                isLikelyNumeric ? "text-right" : "text-left"
                              }`}
                            >
                              {isLikelyNumeric
                                ? formatNumber(cell)
                                : cell || "N/A"}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-8 text-center text-gray-400">
              No data found in the Excel file or all data filtered out.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

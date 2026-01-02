import React, { useState, useEffect, useMemo } from "react";
import * as XLSX from "xlsx";

interface ExcelTableProps {
  excelFilePath?: string;
  initialSeason?: number | "KOAB";
}

interface DeltaMap {
  [key: string]: {
    [column: string]: number;
  };
}

export default function ExcelTable({
  excelFilePath = "/data/3606_kvk4.xlsx",
  initialSeason = 4,
}: ExcelTableProps) {
  const [currentSeason, setCurrentSeason] = useState<number | "KOAB">(
    initialSeason
  );

  // Define file paths for different seasons
  const seasonFilePaths: {
    [key: number | string]: string | { original: string; updated: string };
  } = {
    2: "/data/3606_k2.xlsx",
    3: "/data/3606_k3.xlsx",
    4: "/data/3606_kvk4.xlsx",
    KOAB: {
      original: "/data/KOAB3606.xlsx",
      updated: "/data/KOAB_updated_stats.xlsx",
    },
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
  const [sortByDelta, setSortByDelta] = useState(false);
  const [deltas, setDeltas] = useState<DeltaMap>({});

  // Load KOAB data with delta tracking
  const loadKOABData = async (forceRefresh = false) => {
    try {
      const cacheBuster = forceRefresh ? `?refresh=${Date.now()}` : "";
      const files = seasonFilePaths["KOAB"] as {
        original: string;
        updated: string;
      };

      // Load original data
      const response1 = await fetch(`${files.original}${cacheBuster}`);
      const arrayBuffer1 = await response1.arrayBuffer();
      const workbook1 = XLSX.read(arrayBuffer1, { type: "array" });
      const worksheet1 = workbook1.Sheets[workbook1.SheetNames[0]];
      const originalData = XLSX.utils.sheet_to_json(worksheet1, {
        header: 1,
      }) as any[][];

      // Load updated data
      const response2 = await fetch(`${files.updated}${cacheBuster}`);
      const arrayBuffer2 = await response2.arrayBuffer();
      const workbook2 = XLSX.read(arrayBuffer2, { type: "array" });
      const worksheet2 = workbook2.Sheets["3606"];
      const updatedData = XLSX.utils.sheet_to_json(worksheet2, {
        header: 1,
      }) as any[][];

      if (originalData.length > 0) {
        const allHeaders = originalData[0] as string[];

        // Filter out DKP and Required columns
        const filteredHeaders = allHeaders.filter(
          (col) => col !== "DKP" && !col.toLowerCase().includes("required")
        );
        setHeaders(filteredHeaders);

        // Create lookup map for updated data
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

        const originalIdIndex = allHeaders.findIndex((h) =>
          String(h).toLowerCase().includes("id")
        );
        const deltaMap: DeltaMap = {};

        const rows = originalData
          .slice(1)
          .filter((row) =>
            row.some(
              (cell) => cell !== null && cell !== undefined && cell !== ""
            )
          )
          .map((row, index) => {
            const governorId = row[originalIdIndex];
            const filteredRow = row.filter(
              (_, idx) =>
                allHeaders[idx] !== "DKP" &&
                !allHeaders[idx].toLowerCase().includes("required")
            );

            // Calculate deltas
            if (governorId && updatedMap[governorId]) {
              const deltaKey = `row_${index}`;
              deltaMap[deltaKey] = {};

              allHeaders.forEach((header, idx) => {
                if (
                  header === "DKP" ||
                  header.toLowerCase().includes("required")
                )
                  return;
                const originalValue = row[idx];
                const updatedValue =
                  updatedMap[governorId][String(header).toLowerCase()];

                if (originalValue !== undefined && updatedValue !== undefined) {
                  const origNum = Number(originalValue);
                  const updNum = Number(updatedValue);

                  if (!isNaN(origNum) && !isNaN(updNum) && origNum !== updNum) {
                    deltaMap[deltaKey][header] = updNum - origNum;
                  }
                }
              });
            }

            return filteredRow;
          });

        setExcelData(rows);
        setDeltas(deltaMap);
      }

      setLoading(false);
    } catch (error: any) {
      console.error("Error loading KOAB data:", error);
      setError(`Failed to load KOAB data. ${error.message}`);
      setLoading(false);
    }
  };

  // Load Excel data
  const loadExcelData = async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      // Check if this is KOAB season (requires delta calculation)
      if (currentSeason === "KOAB") {
        await loadKOABData(forceRefresh);
        return;
      }

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
      setDeltas({});
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
      headerName.includes("kill") ||
      headerName.includes("power");

    return [...filteredData].sort((a, b) => {
      let aValue, bValue;

      // Handle KOAB delta sorting
      if (currentSeason === "KOAB" && sortByDelta && isNumericColumn) {
        const aRowIndex = excelData.indexOf(a);
        const bRowIndex = excelData.indexOf(b);
        const aDeltaKey = `row_${aRowIndex}`;
        const bDeltaKey = `row_${bRowIndex}`;
        aValue = deltas[aDeltaKey]?.[headers[sortColumnIndex]] || 0;
        bValue = deltas[bDeltaKey]?.[headers[sortColumnIndex]] || 0;
      }
      // Handle KOAB total (original + delta) sorting
      else if (currentSeason === "KOAB" && isNumericColumn) {
        const aRowIndex = excelData.indexOf(a);
        const bRowIndex = excelData.indexOf(b);
        const aDeltaKey = `row_${aRowIndex}`;
        const bDeltaKey = `row_${bRowIndex}`;
        const aDelta = deltas[aDeltaKey]?.[headers[sortColumnIndex]];
        const bDelta = deltas[bDeltaKey]?.[headers[sortColumnIndex]];

        aValue =
          aDelta !== undefined
            ? (Number(a[sortColumnIndex]) || 0) + aDelta
            : parseFloat(a[sortColumnIndex]) || 0;
        bValue =
          bDelta !== undefined
            ? (Number(b[sortColumnIndex]) || 0) + bDelta
            : parseFloat(b[sortColumnIndex]) || 0;
      } else {
        // Get values at the sorted column index
        aValue = a[sortColumnIndex];
        bValue = b[sortColumnIndex];

        if (isNumericColumn) {
          // Handle numeric columns (KP, Dead)
          aValue = parseFloat(aValue) || 0;
          bValue = parseFloat(bValue) || 0;
        } else {
          // Handle string columns (Name, ID)
          aValue = aValue ? aValue.toString().toLowerCase() : "";
          bValue = bValue ? bValue.toString().toLowerCase() : "";
        }
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
  }, [
    filteredData,
    sortConfig,
    headers,
    currentSeason,
    sortByDelta,
    deltas,
    excelData,
  ]);

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

  // Format numbers with commas for KOAB (except for ID column)
  const formatNumberKOAB = (value: any, column: string): string => {
    if (value === undefined || value === null || value === "") return "";

    const isIdColumn =
      column &&
      (column.toLowerCase().includes("id") || column.toLowerCase() === "id");
    if (isIdColumn) {
      return String(value);
    }

    const num = Number(value);

    if (!isNaN(num)) {
      if (Math.abs(num) >= 1000) {
        return Math.round(num).toLocaleString();
      } else {
        return Math.round(num).toString();
      }
    }

    return String(value);
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
          {currentSeason === "KOAB" ? "KOAB" : `KvK ${currentSeason}`} Player
          Statistics
        </h2>
        <p className="text-gray-400 mt-1">
          Kingdom 3606 player performance data
        </p>
      </div>

      {/* Season Selector */}
      <div className="mb-6 flex justify-center">
        <div className="inline-flex bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setCurrentSeason(2)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              currentSeason === 2
                ? "bg-rok-purple text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            Season 2
          </button>
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
          <button
            onClick={() => setCurrentSeason("KOAB")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              currentSeason === "KOAB"
                ? "bg-rok-purple text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            KOAB
          </button>
        </div>
      </div>

      {/* Search and controls */}
      <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {currentSeason === "KOAB" && (
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
        )}
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
          {error ===
          "Failed to load the Excel file. Invalid HTML: could not find <table>" ? (
            <p>No data found</p>
          ) : (
            <p>{error}</p>
          )}
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
                    {sortedData.map((row, rowIndex) => {
                      const dataRowIndex = excelData.indexOf(row);
                      const deltaKey = `row_${dataRowIndex}`;
                      const rowDeltas = deltas[deltaKey] || {};

                      return (
                        <tr
                          key={rowIndex}
                          className={`${
                            rowIndex % 2 === 0 ? "bg-black/30" : "bg-black/10"
                          } hover:bg-rok-purple/20`}
                        >
                          {row.map((cell: any, cellIndex: number) => {
                            const headerName = headers[cellIndex];
                            // Determine if this column likely contains numeric data
                            const isLikelyNumeric =
                              headerName &&
                              typeof headerName === "string" &&
                              (headerName
                                .toString()
                                .toLowerCase()
                                .includes("kp") ||
                                headerName
                                  .toString()
                                  .toLowerCase()
                                  .includes("dead") ||
                                headerName
                                  .toString()
                                  .toLowerCase()
                                  .includes("kill") ||
                                headerName
                                  .toString()
                                  .toLowerCase()
                                  .includes("power"));

                            // Special handling for KOAB data with deltas
                            if (currentSeason === "KOAB" && isLikelyNumeric) {
                              const delta = rowDeltas[headerName];
                              const hasDelta = delta !== undefined;

                              return (
                                <td
                                  key={cellIndex}
                                  className="px-4 py-2 whitespace-nowrap text-sm text-right"
                                >
                                  <div className="flex flex-col items-end gap-1.5">
                                    <span className="text-white font-medium">
                                      {hasDelta
                                        ? formatNumberKOAB(
                                            (Number(cell) || 0) + delta,
                                            headerName
                                          )
                                        : formatNumberKOAB(cell, headerName)}
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
                                        {formatNumberKOAB(delta, headerName)}
                                      </span>
                                    )}
                                  </div>
                                </td>
                              );
                            }

                            // Regular rendering for KvK seasons
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
                      );
                    })}
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

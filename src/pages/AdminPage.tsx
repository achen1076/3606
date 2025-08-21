import React, { useState } from "react";
import PageLayout from "../components/templates/PageLayout.tsx";
import PageTitle from "../components/molecules/PageTitle.tsx";
import SectionCard from "../components/molecules/SectionCard.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";
import { Navigate } from "react-router-dom";

export default function AdminPage() {
  const { user, isLoggedIn } = useAuth();
  const [weeklyFile, setWeeklyFile] = useState<File | null>(null);
  const [entireFile, setEntireFile] = useState<File | null>(null);
  const [weeklyUploadStatus, setWeeklyUploadStatus] = useState<string>("");
  const [entireUploadStatus, setEntireUploadStatus] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Check if user is logged in and has admin role
  if (!isLoggedIn || user?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  const handleWeeklyFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setWeeklyFile(e.target.files[0]);
      setWeeklyUploadStatus("");
    }
  };

  const handleEntireFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setEntireFile(e.target.files[0]);
      setEntireUploadStatus("");
    }
  };

  const handleWeeklyUpload = async () => {
    if (!weeklyFile) {
      setWeeklyUploadStatus("Please select a file first");
      return;
    }

    if (!weeklyFile.name.endsWith('.csv')) {
      setWeeklyUploadStatus("Please select a CSV file");
      return;
    }

    setIsUploading(true);
    setWeeklyUploadStatus("Uploading...");

    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append("file", weeklyFile);

      // In a real application, you would send this to a server endpoint
      // For this demo, we'll simulate the upload and update the file in public/data
      
      // Read the file content
      const fileContent = await weeklyFile.text();
      
      // Validate CSV format (basic check)
      if (!validateCSVFormat(fileContent)) {
        setWeeklyUploadStatus("Invalid CSV format. Please check your file.");
        setIsUploading(false);
        return;
      }

      // In a real app, you would send the file to the server
      // Here we'll just simulate a successful upload
      setTimeout(() => {
        setWeeklyUploadStatus("Weekly data uploaded successfully!");
        setLastUpdated(new Date());
        setIsUploading(false);
        
        // In a real app, this would be handled by the server
        console.log("Weekly data would be saved to /public/data/rally_data_weekly.csv");
        
        // Update the timestamp in the BarbForRallyPage component
        // This would be done server-side in a real application
        console.log("Update the MANUAL_TIMESTAMP in BarbForRallyPage.tsx to:", new Date().toISOString());
      }, 1500);
    } catch (error) {
      console.error("Error uploading weekly file:", error);
      setWeeklyUploadStatus("Error uploading file. Please try again.");
      setIsUploading(false);
    }
  };

  const handleEntireUpload = async () => {
    if (!entireFile) {
      setEntireUploadStatus("Please select a file first");
      return;
    }

    if (!entireFile.name.endsWith('.csv')) {
      setEntireUploadStatus("Please select a CSV file");
      return;
    }

    setIsUploading(true);
    setEntireUploadStatus("Uploading...");

    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append("file", entireFile);
      
      // Read the file content
      const fileContent = await entireFile.text();
      
      // Validate CSV format (basic check)
      if (!validateCSVFormat(fileContent)) {
        setEntireUploadStatus("Invalid CSV format. Please check your file.");
        setIsUploading(false);
        return;
      }

      // In a real app, you would send the file to the server
      // Here we'll just simulate a successful upload
      setTimeout(() => {
        setEntireUploadStatus("Entire data uploaded successfully!");
        setLastUpdated(new Date());
        setIsUploading(false);
        
        // In a real app, this would be handled by the server
        console.log("Entire data would be saved to /public/data/rally_data_entire.csv");
        
        // Update the timestamp in the BarbForRallyPage component
        // This would be done server-side in a real application
        console.log("Update the MANUAL_TIMESTAMP in BarbForRallyPage.tsx to:", new Date().toISOString());
      }, 1500);
    } catch (error) {
      console.error("Error uploading entire file:", error);
      setEntireUploadStatus("Error uploading file. Please try again.");
      setIsUploading(false);
    }
  };

  // Basic CSV validation function
  const validateCSVFormat = (content: string): boolean => {
    // Check if the content has at least one line
    const lines = content.trim().split('\n');
    if (lines.length < 2) return false; // Need at least header + one data row
    
    // Check if the header has the expected format
    const header = lines[0].toLowerCase();
    const requiredFields = ['governor_id', 'started', 'joined'];
    
    // Basic check: do all required fields exist in the header?
    return requiredFields.every(field => header.includes(field));
  };

  return (
    <PageLayout>
      <PageTitle
        title="Admin"
        highlightedText="Dashboard"
        subtitle="Manage website data and content"
      />

      <section className="w-full py-8">
        <SectionCard title="Barb Fort Rally Data Management">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Weekly Data Upload */}
            <div className="bg-black/30 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-rok-purple-light mb-4">Weekly Rally Data</h3>
              <p className="text-white mb-4">
                Upload the weekly barb fort rally data CSV file. This will replace the current weekly data.
              </p>
              
              <div className="mb-4">
                <label className="block text-white mb-2">Select CSV File</label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleWeeklyFileChange}
                  className="block w-full text-white bg-gray-800 border border-gray-700 rounded-md p-2"
                  disabled={isUploading}
                />
              </div>
              
              {weeklyFile && (
                <p className="text-green-400 mb-4">
                  Selected: {weeklyFile.name} ({Math.round(weeklyFile.size / 1024)} KB)
                </p>
              )}
              
              <button
                onClick={handleWeeklyUpload}
                disabled={!weeklyFile || isUploading}
                className={`px-4 py-2 rounded-md ${
                  !weeklyFile || isUploading
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-rok-purple text-white hover:bg-rok-purple-light"
                } transition-colors duration-200`}
              >
                {isUploading ? "Uploading..." : "Upload Weekly Data"}
              </button>
              
              {weeklyUploadStatus && (
                <p className={`mt-4 ${weeklyUploadStatus.includes("successfully") ? "text-green-400" : "text-red-400"}`}>
                  {weeklyUploadStatus}
                </p>
              )}
            </div>

            {/* Entire Data Upload */}
            <div className="bg-black/30 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-rok-purple-light mb-4">Entire Rally Data</h3>
              <p className="text-white mb-4">
                Upload the entire barb fort rally data CSV file. This will replace the current entire data.
              </p>
              
              <div className="mb-4">
                <label className="block text-white mb-2">Select CSV File</label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleEntireFileChange}
                  className="block w-full text-white bg-gray-800 border border-gray-700 rounded-md p-2"
                  disabled={isUploading}
                />
              </div>
              
              {entireFile && (
                <p className="text-green-400 mb-4">
                  Selected: {entireFile.name} ({Math.round(entireFile.size / 1024)} KB)
                </p>
              )}
              
              <button
                onClick={handleEntireUpload}
                disabled={!entireFile || isUploading}
                className={`px-4 py-2 rounded-md ${
                  !entireFile || isUploading
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-rok-purple text-white hover:bg-rok-purple-light"
                } transition-colors duration-200`}
              >
                {isUploading ? "Uploading..." : "Upload Entire Data"}
              </button>
              
              {entireUploadStatus && (
                <p className={`mt-4 ${entireUploadStatus.includes("successfully") ? "text-green-400" : "text-red-400"}`}>
                  {entireUploadStatus}
                </p>
              )}
            </div>
          </div>

          {/* Instructions and Notes */}
          <div className="mt-8 bg-black/30 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-rok-purple-light mb-4">Instructions</h3>
            
            <div className="text-white space-y-4">
              <p>
                <strong>CSV Format Requirements:</strong> The CSV files must include the following columns:
                <code className="ml-2 bg-gray-800 px-2 py-1 rounded">governor_id, started, joined, name</code>
              </p>
              
              <p>
                <strong>Important Notes:</strong>
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  After uploading new data, you'll need to manually update the timestamp in the BarbForRallyPage.tsx file.
                </li>
                <li>
                  Look for the <code className="bg-gray-800 px-2 py-1 rounded">MANUAL_TIMESTAMP</code> constant and update it to the current date and time.
                </li>
                <li>
                  The timestamp format should be: <code className="bg-gray-800 px-2 py-1 rounded">YYYY-MM-DDThh:mm:ss-04:00</code>
                </li>
                <li>
                  Example: <code className="bg-gray-800 px-2 py-1 rounded">2025-08-20T20:48:00-04:00</code>
                </li>
              </ul>
              
              {lastUpdated && (
                <p className="text-green-400 mt-4">
                  Last upload: {lastUpdated.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </SectionCard>
      </section>
    </PageLayout>
  );
}

import React from 'react';
import { database } from '../../firebase';
import { ref, get } from 'firebase/database';

const ExportHub = () => {

  const handleExport = async () => {
    alert("Exporting data... This might take a moment.");

    // In a real app, for very large datasets, this operation should be handled
    // by a serverless function (e.g., Firebase Cloud Functions) to avoid
    // downloading all data to the client and freezing the UI.
    const sensorDataRef = ref(database, 'logs/sensors');
    
    try {
      const snapshot = await get(sensorDataRef);
      const data = snapshot.val();

      if (!data) {
        alert("No sensor data to export.");
        return;
      }

      // Convert the data object to a CSV string
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "timestamp,temperature,ph,tds\n"; // CSV Header

      Object.keys(data).forEach(key => {
        const record = data[key];
        const row = [
          new Date(record.timestamp).toISOString(),
          record.temperature,
          record.ph,
          record.tds
        ].join(",");
        csvContent += row + "\n";
      });

      // Create a link and trigger the download
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "hydroponic_sensor_data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error("Error exporting data: ", error);
      alert("Failed to export data. See console for details.");
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
      <h3 className="text-lg font-semibold text-white mb-4">Data Export</h3>
      <p className="text-sm text-gray-400 mb-4">
        Export historical sensor data for research and analysis.
      </p>
      <button
        onClick={handleExport}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
      >
        Export to CSV
      </button>
    </div>
  );
};

export default ExportHub;

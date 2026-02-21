import React, { useState, useEffect } from 'react';
import { database } from '../../firebase';
import { ref, onValue, query, limitToLast } from 'firebase/database';

const AutomationLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const logsRef = ref(database, 'logs/automation');
    // Query the last 10 log entries to avoid pulling too much data
    const recentLogsQuery = query(logsRef, limitToLast(10));

    const unsubscribe = onValue(recentLogsQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsedLogs = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => b.timestamp - a.timestamp); // Sort descending
        setLogs(parsedLogs);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Automation Log</h3>
      <div className="overflow-y-auto h-64">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-300 uppercase bg-gray-700 sticky top-0">
            <tr>
              <th scope="col" className="px-4 py-2">Timestamp</th>
              <th scope="col" className="px-4 py-2">Action</th>
              <th scope="col" className="px-4 py-2">Resulting TDS</th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0 ? logs.map(log => (
              <tr key={log.id} className="bg-gray-800 border-b border-gray-700">
                <td className="px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
                <td className="px-4 py-2">{log.action}</td>
                <td className="px-4 py-2">{log.resultingTDS} ppm</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="3" className="text-center py-4">No recent logs.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AutomationLog;

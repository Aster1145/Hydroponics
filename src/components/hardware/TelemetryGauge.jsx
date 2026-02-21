import React from 'react';

const TelemetryGauge = ({ label, value, unit, min = 0, max = 100 }) => {
  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  const getBackgroundColor = () => {
    if (percentage > 85) return 'bg-red-500';
    if (percentage > 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
      <h3 className="text-lg font-semibold text-white mb-2">{label}</h3>
      <div className="relative w-40 h-40 mx-auto">
        <div className="absolute inset-0 rounded-full bg-gray-700"></div>
        <div 
          className="absolute inset-0 rounded-full transition-all duration-500"
          style={{ background: `conic-gradient(${getBackgroundColor().replace('bg-', '')}-500 ${percentage}%, #4A5568 0)` }}
        >
          <div className="absolute inset-2 rounded-full bg-gray-800"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{value}</span>
          <span className="text-sm text-gray-400">{unit}</span>
        </div>
      </div>
    </div>
  );
};

export default TelemetryGauge;

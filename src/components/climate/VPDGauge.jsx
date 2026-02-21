import React, { useState, useEffect } from 'react';

// VPD Calculation (in kPa)
// T is temperature in Celsius, RH is relative humidity in %
const calculateVPD = (T, RH) => {
    // 1. Calculate Saturation Vapor Pressure (SVP) using the Magnus formula
    const SVP = 0.61078 * Math.exp((17.27 * T) / (T + 237.3));
    // 2. Calculate Actual Vapor Pressure (AVP)
    const AVP = (RH / 100) * SVP;
    // 3. Calculate Vapor Pressure Deficit (VPD)
    const VPD = SVP - AVP;
    return VPD.toFixed(2); // Return value in kPa, rounded to 2 decimal places
};

const VPDGauge = () => {
    // In a real app, this data would come from a live weather API or local sensors
    const [temperature, setTemperature] = useState(24); // Example: 24°C
    const [humidity, setHumidity] = useState(60); // Example: 60%
    const [vpd, setVpd] = useState(0);

    useEffect(() => {
        // TODO: In a real implementation, you would get T and RH from your weather API
        // or from Firebase if you have local sensors.
        setVpd(calculateVPD(temperature, humidity));
    }, [temperature, humidity]);

    const getVPDColor = (vpdValue) => {
        if (vpdValue < 0.4) return 'bg-blue-500'; // Too low (potential mold/fungus)
        if (vpdValue >= 0.4 && vpdValue <= 0.8) return 'bg-green-500'; // Early veg
        if (vpdValue > 0.8 && vpdValue <= 1.2) return 'bg-yellow-500'; // Late veg / Early flower
        if (vpdValue > 1.2 && vpdValue <= 1.6) return 'bg-orange-500'; // Mid-late flower
        return 'bg-red-500'; // Too high (stress/stunted growth)
    }

    const vpdValue = parseFloat(vpd);
    const maxVPD = 2.0; // Set a reasonable max for the gauge display, e.g., 2.0 kPa
    const percentage = Math.max(0, Math.min(100, (vpdValue / maxVPD) * 100));


  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
      <h3 className="text-lg font-semibold text-white mb-2">Vapor Pressure Deficit (VPD)</h3>
       <div className="relative w-40 h-40 mx-auto">
        <div className="absolute inset-0 rounded-full bg-gray-700"></div>
        <div
          className="absolute inset-0 rounded-full transition-all duration-500"
          style={{ background: `conic-gradient(${getVPDColor(vpdValue).replace('bg-','-500')} ${percentage}%, #4A5568 0)` }}
        >
          <div className="absolute inset-2 rounded-full bg-gray-800"></div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{vpd}</span>
          <span className="text-sm text-gray-400">kPa</span>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-2">Based on {temperature}°C & {humidity}% RH</p>
    </div>
  );
};

export default VPDGauge;

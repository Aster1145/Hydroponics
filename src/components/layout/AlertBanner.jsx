import React, { useState, useEffect } from 'react';
import { database } from '../../firebase';
import { ref, onValue } from "firebase/database";

const AlertBanner = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const criticalStatesRef = ref(database, 'criticalStates');
    const unsubscribe = onValue(criticalStatesRef, (snapshot) => {
      const data = snapshot.val();
      const activeAlerts = [];
      if (data) {
        if (data.waterTank === 'empty') {
          activeAlerts.push('CRITICAL: Water Tank is Empty!');
        }
        if (data.tds > 800) {
          activeAlerts.push(`CRITICAL: High TDS Detected - ${data.tds}ppm!`);
        }
        if (data.ph < 5.0 || data.ph > 6.5) {
            activeAlerts.push(`CRITICAL: pH Out of Range - ${data.ph}!`);
        }
        if (data.esp32Connection === 'offline') {
            activeAlerts.push('CRITICAL: ESP32 Disconnected!');
        }
      }
      setAlerts(activeAlerts);
    });

    return () => unsubscribe();
  }, []);

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className="bg-red-600 text-white p-4 text-center animate-pulse">
      <div className="max-w-7xl mx-auto">
        {alerts.map((alert, index) => (
          <p key={index} className="font-bold">{alert}</p>
        ))}
      </div>
    </div>
  );
};

export default AlertBanner;

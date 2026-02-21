import React, { useState, useEffect } from 'react';
import { database } from '../../firebase';
import { ref, onValue } from "firebase/database";

const StatusItem = ({ label, firebasePath, expectedValue = true }) => {
    const [isOk, setIsOk] = useState(false);
    const statusRef = ref(database, firebasePath);

    useEffect(() => {
        const unsubscribe = onValue(statusRef, (snapshot) => {
            setIsOk(snapshot.val() === expectedValue);
        });
        return () => unsubscribe();
    }, [statusRef, expectedValue]);

    return (
        <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
            <span className="text-white font-medium">{label}</span>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${isOk ? 'bg-green-500' : 'bg-red-500'}`}>
                <div className={`w-3 h-3 rounded-full ${isOk ? 'bg-green-300' : 'bg-red-300'}`} />
            </div>
        </div>
    );
};

const StatusIndicator = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Safety Status</h3>
      <div className="space-y-3">
        <StatusItem label="Float Switch OK" firebasePath="hardware/sensors/floatSwitch" expectedValue={true} />
        <StatusItem label="ESP32 Heartbeat" firebasePath="esp32/heartbeat" expectedValue="online" />
      </div>
    </div>
  );
};

export default StatusIndicator;

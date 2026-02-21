import React, { useState, useEffect } from 'react';
import { database } from '../../firebase';
import { ref, set, onValue } from "firebase/database";

const Toggle = ({ label, firebasePath }) => {
    const [isOn, setIsOn] = useState(false);
    const toggleRef = ref(database, firebasePath);

    useEffect(() => {
        const unsubscribe = onValue(toggleRef, (snapshot) => {
            setIsOn(!!snapshot.val());
        });
        return () => unsubscribe();
    }, [toggleRef]);

    const handleToggle = () => {
        set(toggleRef, !isOn).catch(error => console.error("Failed to toggle:", error));
    };

    return (
        <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
            <span className="text-white font-medium">{label}</span>
            <button
                onClick={handleToggle}
                className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none ${isOn ? 'bg-green-500' : 'bg-gray-600'}`}
            >
                <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${isOn ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
        </div>
    );
};


const ManualOverride = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Manual Overrides</h3>
      <div className="space-y-3">
        <Toggle label="Main Pump" firebasePath="hardware/relays/mainPump" />
        <Toggle label="Nutrient Pump A" firebasePath="hardware/relays/nutrientPumpA" />
        <Toggle label="Nutrient Pump B" firebasePath="hardware/relays/nutrientPumpB" />
        <Toggle label="Fresh Water Valve" firebasePath="hardware/relays/freshWaterValve" />
      </div>
    </div>
  );
};

export default ManualOverride;

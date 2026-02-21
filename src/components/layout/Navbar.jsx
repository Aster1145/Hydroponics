import React from 'react';
import { database } from '../../firebase';
import { ref, set } from "firebase/database";

const Navbar = () => {
  const handleMasterKillSwitch = () => {
    if (window.confirm("Are you sure you want to activate the MASTER KILL SWITCH? This will stop all hardware.")) {
      // This is a critical, system-wide command.
      // We are writing 'true' to a specific, high-level 'emergencyStop' node.
      // The ESP32/Arduino should be programmed to listen for changes on this node.
      // When it sees 'true', it should immediately halt all relays, pumps, and valves.
      const emergencyStopRef = ref(database, 'emergencyStop');
      set(emergencyStopRef, true)
        .then(() => alert("MASTER KILL SWITCH ACTIVATED! All systems halting."))
        .catch((error) => console.error("Error activating kill switch: ", error));

      // As a secondary measure, you could also individually turn off all known relays.
      // This is good for redundancy.
      const relays = ['mainPump', 'fertilizerPump1', 'fertilizerPump2', 'freshWaterValve'];
      relays.forEach(relayId => {
        const relayRef = ref(database, `hardware/relays/${relayId}`);
        set(relayRef, false);
      });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-white text-xl font-bold">Hydroponic Dashboard</h1>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              onClick={handleMasterKillSwitch}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              MASTER KILL SWITCH
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

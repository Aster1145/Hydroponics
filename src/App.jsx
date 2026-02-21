import React, { useState, useEffect } from 'react';
import { database } from './firebase';
import { ref, onValue } from 'firebase/database';

// Layout Components
import Navbar from './components/layout/Navbar';
import AlertBanner from './components/layout/AlertBanner';

// Hardware & Control Hub Components
import TelemetryGauge from './components/hardware/TelemetryGauge';
import ManualOverride from './components/hardware/ManualOverride';
import StatusIndicator from './components/hardware/StatusIndicator';

// Climate & Weather Intelligence Components
import WeatherForecast from './components/climate/WeatherForecast';
import VPDGauge from './components/climate/VPDGauge';
import NDVIPlaceholder from './components/climate/NDVIPlaceholder';

// Harvest & Growth Monitor Components
import LifecycleTracker from './components/harvest/LifecycleTracker';
import AutomationLog from './components/harvest/AutomationLog';
import ExportHub from './components/harvest/ExportHub';


function App() {
  const [sensorData, setSensorData] = useState({ temp: 0, tds: 0, ph: 0 });

  useEffect(() => {
    const sensorRef = ref(database, 'sensors/live');
    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensorData(data);
      }
    });

    return () => unsubscribe();
  }, []);
  
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <AlertBanner />
      
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {/* Section 1: Hardware & Control Hub */}
          <div className="lg:col-span-1 xl:col-span-1 space-y-6">
            <h2 className="text-2xl font-bold text-green-400">Hardware Hub</h2>
            <TelemetryGauge label="Water Temp" value={sensorData.temp} unit="°C" min={15} max={30} />
            <TelemetryGauge label="TDS" value={sensorData.tds} unit="ppm" min={300} max={900}/>
            <TelemetryGauge label="pH" value={sensorData.ph} unit="" min={5.0} max={7.0} />
            <ManualOverride />
            <StatusIndicator />
          </div>

          {/* Section 2: Climate & Weather Intelligence */}
          <div className="lg:col-span-1 xl:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-blue-400">Climate Intelligence</h2>
            <WeatherForecast />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <VPDGauge />
                <NDVIPlaceholder />
            </div>
          </div>

          {/* Section 3: Harvest & Growth Monitor */}
          <div className="lg:col-span-1 xl:col-span-1 space-y-6">
            <h2 className="text-2xl font-bold text-yellow-400">Growth Monitor</h2>
            <LifecycleTracker />
            <AutomationLog />
            <ExportHub />
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { database } from '../../firebase';
import { ref, onValue } from 'firebase/database';

const stages = [
  { name: 'Seedling', duration: 14 },   // 2 weeks
  { name: 'Vegetative', duration: 28 }, // 4 weeks
  { name: 'Flowering', duration: 21 },  // 3 weeks
  { name: 'Harvest', duration: 21 },    // 3 weeks
];

const LifecycleTracker = () => {
  const [plantDate, setPlantDate] = useState(null);
  const [dayNumber, setDayNumber] = useState(0);

  useEffect(() => {
    // Fetch the initial planting date from Firebase
    const plantDateRef = ref(database, 'growth/plantDate'); // e.g., "2023-10-27"
    const unsubscribe = onValue(plantDateRef, (snapshot) => {
      const dateStr = snapshot.val();
      if (dateStr) {
        setPlantDate(new Date(dateStr));
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (plantDate) {
      const today = new Date();
      const diffTime = Math.abs(today - plantDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDayNumber(diffDays);
    }
  }, [plantDate]);

  let cumulativeDays = 0;
  let currentStageIndex = -1;

  stages.forEach((stage, index) => {
    cumulativeDays += stage.duration;
    if (dayNumber <= cumulativeDays && currentStageIndex === -1) {
      currentStageIndex = index;
    }
  });

  if (plantDate === null) {
      return (
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-white mb-4">Growth Lifecycle</h3>
              <p className="text-gray-400">Waiting for planting date from Firebase...</p>
          </div>
      )
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-2">Growth Lifecycle</h3>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-300">Planted: {plantDate.toLocaleDateString()}</p>
        <p className="text-lg font-bold text-white">Day {dayNumber}</p>
      </div>
      <div className="flex items-center space-x-2">
        {stages.map((stage, index) => {
          const isActive = index === currentStageIndex;
          const isCompleted = index < currentStageIndex;
          
          let bgColor;
          if (isActive) {
            bgColor = 'bg-green-500 animate-pulse';
          } else if (isCompleted) {
            bgColor = 'bg-green-700';
          } else {
            bgColor = 'bg-gray-600';
          }

          return (
            <div key={stage.name} className="flex-1 text-center">
              <div className={`w-full h-2 rounded-full ${bgColor} mb-1`}></div>
              <p className={`text-xs font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>
                {stage.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LifecycleTracker;

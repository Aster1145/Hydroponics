import React from 'react';

const NDVIPlaceholder = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg h-full flex flex-col">
      <h3 className="text-lg font-semibold text-white mb-4">Satellite Crop Health (NDVI)</h3>
      <div className="flex-grow bg-gray-700 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-400">
          <svg className="w-16 h-16 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          <p className="mt-2 font-semibold">NDVI Image Unavailable</p>
          <p className="text-xs mt-1">Connect to a satellite imagery API (e.g., NASA, Sentinel Hub) to display crop canopy health.</p>
        </div>
      </div>
    </div>
  );
};

export default NDVIPlaceholder;

// LoadingSpinner.js
import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75">
      <div className="flex flex-col items-center">
        <div className="animate-spin text-pink-500 text-6xl">❤️</div>
        <p className="text-pink-600 mt-4 text-xl font-semibold">Cargando...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;

import React from 'react';

const MapImage = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center ">
      <img src="/home.jpg" alt="Map" className="w-full h-full object-cover rounded-md" />
      <button className="relative sm:text-sm md:text-md left-[-47px] text-center bg-blue-500 text-white md:px-4 md:py-2 sm:p-1  rounded-lg hover:bg-blue-600">
        Show Map
      </button>
    </div>
  );
};

export default MapImage;

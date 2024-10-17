import React from 'react';

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black">
      {/* Title */}
      <h1 className="text-6xl font-bold text-white">{title}</h1>
      
      {/* Overview */}
      <p className="py-6 text-lg w-1/4 text-white">{overview}</p>
      
      {/* Buttons */}
      <div className="flex">
        {/* Play Button */}
        <button className="flex items-center bg-gray-500 text-white p-4 px-8 text-xl font-semibold rounded-md shadow-lg hover:bg-opacity-50 transition duration-300 ease-in-out">
          Play
        </button>

        {/* More Info Button */}
        <button className="flex items-center ml-4 bg-gray-500 text-white p-4 px-8 text-xl font-semibold  rounded-md shadow-lg hover:bg-opacity-50 transition duration-300 ease-in-out">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;

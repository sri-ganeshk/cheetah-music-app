import React, { useState } from 'react';

const Card = ({ song }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSpeedChange = (e) => {
    setPlaybackSpeed(parseFloat(e.target.value));
  };

  return (
    <div className="flex flex-col sm:flex-row items-center border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-md">
      <img
        src={song.albumArt}
        alt={song.title}
        className="w-24 h-24 sm:w-16 sm:h-16 object-cover rounded-md mb-4 sm:mb-0 sm:mr-4"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{song.title}</h3>
        <p className="text-gray-600">{song.artist}</p>
      </div>
      <div className="flex items-center space-x-4 mt-4 sm:mt-0">
        <button
          onClick={handlePlayPause}
          className={`px-4 py-2 rounded-lg text-white ${
            isPlaying ? 'bg-red-600' : 'bg-green-600'
          } hover:bg-opacity-80 transition`}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <div className="relative">
          <select
            value={playbackSpeed}
            onChange={handleSpeedChange}
            className="px-3 py-1 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Card;

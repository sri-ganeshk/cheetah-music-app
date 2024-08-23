import React, { useEffect, useState } from 'react';
import token from '../components/ac';

const Popular = () => {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = token
      const playlistId = '37i9dQZF1DXcBWIGoYBM5M'; // Example Playlist ID for "Today's Top Hits"
      
      try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setSongs(data.items);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Popular Songs</h2>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div>
          {songs.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {songs.map((track) => (
                <li key={track.track.id} className="border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white">
                  <img
                    src={track.track.album.images[0]?.url}
                    alt={track.track.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{track.track.name}</h3>
                    <p className="text-gray-600 text-sm">{track.track.artists.map(artist => artist.name).join(', ')}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No popular songs found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Popular

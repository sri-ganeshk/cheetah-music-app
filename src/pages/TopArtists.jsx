// src/components/TopArtists.jsx
import React, { useEffect, useState } from 'react';
import token from '../components/ac';

const TopArtists = () => {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = token;

      try {
        const response = await fetch('https://api.spotify.com/v1/me/top/artists', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setArtists(data.items);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Top Artists</h2>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div>
          {artists.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {artists.map((artist) => (
                <li key={artist.id} className="border border-gray-300 rounded-lg overflow-hidden shadow-md bg-white">
                  <img
                    src={artist.images[0]?.url}
                    alt={artist.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{artist.name}</h3>
                    <p className="text-gray-600 text-sm">Followers: {artist.followers.total}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No top artists found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TopArtists;

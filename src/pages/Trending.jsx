import React, { useEffect, useState } from 'react';
import token from '../components/ac';
import Card from '../components/card';
const Trending = () => {
  const [playlists, setPlaylists] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = token;
      
      try {
        const playlistResponse = await fetch('https://api.spotify.com/v1/browse/featured-playlists', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!playlistResponse.ok) {
          throw new Error(`HTTP error! status: ${playlistResponse.status}`);
        }

        const playlistData = await playlistResponse.json();
        setPlaylists(playlistData.playlists.items);

        const releaseResponse = await fetch('https://api.spotify.com/v1/browse/new-releases', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!releaseResponse.ok) {
          throw new Error(`HTTP error! status: ${releaseResponse.status}`);
        }

        const releaseData = await releaseResponse.json();
        setNewReleases(releaseData.albums.items);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Trending Playlists</h2>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div>
          {playlists.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {playlists.map((playlist) => (
                <Card
                  key={playlist.id}
                  song={{
                    title: playlist.name,
                    artist: playlist.description,
                    albumArt: playlist.images[0]?.url || 'https://via.placeholder.com/80',
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No trending playlists found</p>
          )}
        </div>
      )}

      <h2 className="text-2xl font-bold mt-12 mb-6">New Releases</h2>
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div>
          {newReleases.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {newReleases.map((album) => (
                <Card
                  key={album.id}
                  song={{
                    title: album.name,
                    artist: album.artists.map((artist) => artist.name).join(', '),
                    albumArt: album.images[0]?.url || 'https://via.placeholder.com/80',
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No new releases found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Trending;

import React, { useState } from 'react';
import axios from 'axios';
import Card from './card';
import token from './ac';
const SpotifySearch = () => {
  const [query, setQuery] = useState('');
  const [songs, setSongs] = useState([]);

  const searchSongs = async (e) => {
    e.preventDefault();

    const accessToken = token

    try {
      const response = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: query,
          type: 'track',
          limit: 10,
        },
      });

      setSongs(response.data.tracks.items);
    } catch (error) {
      console.error('Error fetching data from Spotify API', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Search for a Song</h2>
      <form onSubmit={searchSongs} className="mb-4 flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter song name"
          className="border border-gray-300 rounded-lg p-2 flex-1 mr-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>
      <div>
        {songs.length > 0 ? (
          <div className="space-y-4">
            {songs.map((song) => (
              <Card
                key={song.id}
                song={{
                  title: song.name,
                  artist: song.artists.map((artist) => artist.name).join(', '),
                  albumArt: song.album.images[0]?.url || 'https://via.placeholder.com/80', 
                }}
              />
            ))}
          </div>
        ) : (
          <p>No songs found</p>
        )}
      </div>
    </div>
  );
};

export default SpotifySearch;


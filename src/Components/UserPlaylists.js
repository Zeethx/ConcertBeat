import { useEffect, useState } from 'react';

const UserPlaylists = () => {
  const [playlists, setPlaylists] = useState([]);
  const accessToken = localStorage.getItem('accessToken'); // Moved inside useEffect to get the most recent value

  useEffect(() => {
    if (!accessToken) {
      console.error('Access token is not available.');
      return;
    }
    fetch('http://localhost:5000/api/spotify/playlists', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(text => {
      try {
        return JSON.parse(text); // Parse the text to JSON
      } catch (error) {
        throw new Error('Failed to parse JSON');
      }
    })
    .then(data => {
      setPlaylists(data.items || []);
    })
    .catch(error => {
      console.error('There was an error fetching the playlists:', error);
      // You may want to handle token refresh or re-authentication here
    });
  }, [accessToken]); // Empty array to run the effect only once after the component mounts

  return (
    <div>
      <h2>Your Playlists</h2>
      <ul>
        {playlists.map(playlist => (
          <li key={playlist.id}>{playlist.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserPlaylists;

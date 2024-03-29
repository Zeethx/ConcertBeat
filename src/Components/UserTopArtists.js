import React, { useEffect, useState } from 'react';

const UserTopArtists = () => {
  const [artists, setArtists] = useState([]); // Keep state variable names in camelCase
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!accessToken) {
      console.error('Access token is not available.');
      return;
    }

    fetch('http://localhost:5000/api/spotify/top-artists', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      setArtists(data.items);
    })
    .catch(error => {
      console.error('Error fetching top artists:', error);
    });
  }, [accessToken]);

return (
    <div>
        <h2>Your Top Artists</h2>
        <ul>
            {artists && artists.map(artist => (
                    <li key={artist.id}>{artist.name}</li>
            ))}
        </ul>
    </div>
);
}

export default UserTopArtists;

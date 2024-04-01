import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ShowUserConcerts = () => {
    const [artists, setArtists] = useState([]);
    const navigate = useNavigate(); 
    const spotifyAccessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if (spotifyAccessToken) {
            fetch('http://localhost:5000/api/spotify/top-artists', {
                headers: { 'Authorization': `Bearer ${spotifyAccessToken}` },
            })
            .then(response => response.ok ? response.json() : Promise.reject('Failed to fetch top artists'))
            .then(data => setArtists(data.items))
            .catch(error => console.error('Error:', error));
        } else {
            console.error('Missing Spotify access token');
        }
    }, [spotifyAccessToken]);

    // Redirecting to the artist details page when an artist is selected
    const handleSelectArtist = (artistId) => {
        navigate(`/artist/${artistId}`);
    };

    return (
        <div>
            <h2>Your Top Artists</h2>
            <ul>
                {artists.map(artist => (
                    <li key={artist.id} style={{ cursor: 'pointer' }} onClick={() => handleSelectArtist(artist.id)}>
                        <img src={artist.images[0]?.url} alt={artist.name} style={{ width: '50px' }} />
                        {artist.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShowUserConcerts;

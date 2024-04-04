import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShowUserConcerts.css';

const ShowUserConcerts = () => {
    const [artists, setArtists] = useState([]);
    const navigate = useNavigate(); 
    const spotifyAccessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if (spotifyAccessToken) {
            fetch('https://concertbeat-backend.vercel.app/api/spotify/top-artists', {
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
            <h1 className='artist-header'>Your Top Artists</h1>
            <div className='artist-line'></div>
            <div className="artist-grid">
                {artists.map(artist => (
                    <div key={artist.id} className="artist-card" onClick={() => handleSelectArtist(artist.id)}>
                        <img src={artist.images[0]?.url || 'defaultArtistImage.jpg'} alt={artist.name} className="artist-image" />
                        <div className="artist-info">
                            <h3 className="artist-name">{artist.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowUserConcerts;

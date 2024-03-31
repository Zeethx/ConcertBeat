import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

async function fetchArtistData(artistId, accessToken) {
    const headers = { 'Authorization': `Bearer ${accessToken}` };
    
    try {
        const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, { headers });
        const artistData = await artistResponse.json();

        const topTracksResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, { headers });
        const topTracksData = await topTracksResponse.json();

        const albumsResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, { headers });
        const albumsData = await albumsResponse.json();

        return {
            artist: artistData,
            topTracks: topTracksData.tracks,
            albums: albumsData.items,
        };
    } catch (error) {
        console.error('Error fetching artist data:', error);
        throw error;
    }
}

const ArtistDetailsPage = () => {
    const { artistId } = useParams(); 
    const [artistDetails, setArtistDetails] = useState(null);
    const [topTracks, setTopTracks] = useState([]);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken && artistId) {
            fetchArtistData(artistId, accessToken).then(data => {
                setArtistDetails(data.artist);
                setTopTracks(data.topTracks);
                setAlbums(data.albums);
            });
        }
    }, [artistId]);

    if (!artistDetails) {
        return <div>Loading artist details...</div>;
    }

    return (
        <div>
            <h1>{artistDetails.name}</h1>
            <img src={artistDetails.images[0]?.url} alt={artistDetails.name} style={{ width: '100px' }} />
            <p>Followers: {artistDetails.followers.total}</p>
            <h2>Top Tracks</h2>
            <ul>
                {topTracks.map(track => <li key={track.id}>{track.name}</li>)}
            </ul>
            <h2>Albums</h2>
            <ul>
                {albums.map(album => <li key={album.id}>{album.name}</li>)}
            </ul>
        </div>
    );
};

export default ArtistDetailsPage;

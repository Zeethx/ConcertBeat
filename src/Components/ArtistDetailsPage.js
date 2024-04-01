import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Async function to fetch artist details, top tracks, albums, and concerts
async function fetchArtistData(artistId, accessToken, ticketmasterApiKey) {
    const headers = { 'Authorization': `Bearer ${accessToken}` };

    try {
        const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, { headers });
        const artistData = await artistResponse.json();

        const topTracksResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, { headers });
        const topTracksData = await topTracksResponse.json();

        const albumsResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, { headers });
        const albumsData = await albumsResponse.json();

        // Assuming artist names are unique enough for concert searches. Adjust as needed.
        const concertsResponse = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${encodeURIComponent(artistData.name)}&apikey=${ticketmasterApiKey}`);
        const concertsData = await concertsResponse.json();

        return {
            artist: artistData,
            topTracks: topTracksData.tracks,
            albums: albumsData.items,
            concerts: concertsData._embedded ? concertsData._embedded.events : [],
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
    const [concerts, setConcerts] = useState([]);
    const ticketmasterApiKey = process.env.REACT_APP_TICKETMASTER_API_KEY; // Ensure you have this env variable set up

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken && artistId && ticketmasterApiKey) {
            fetchArtistData(artistId, accessToken, ticketmasterApiKey).then(data => {
                setArtistDetails(data.artist);
                setTopTracks(data.topTracks);
                setAlbums(data.albums);
                setConcerts(data.concerts);
            });
        }
    }, [artistId, ticketmasterApiKey]);

    if (!artistDetails) {
        return <div>Loading artist details...</div>;
    }

    return (
        <div>
            <h1>{artistDetails.name}</h1>
            <img src={artistDetails.images[0]?.url} alt={artistDetails.name} style={{ width: '200px' }} />
            <p>Followers: {artistDetails.followers.total}</p>
            <h2>Top Tracks</h2>
            <ul>
                {topTracks.map(track => <li key={track.id}>{track.name}</li>)}
            </ul>
            <h2>Albums</h2>
            <ul>
                {albums.map(album => <li key={album.id}>{album.name}</li>)}
            </ul>
            <h2>Concerts</h2>
            {concerts.length > 0 ? (
                <ul>
                    {concerts.map(concert => (
                        <li key={concert.id}>
                            {concert.name} - {concert.dates.start.localDate}
                            <br />
                            <a href={concert.url} target="_blank" rel="noopener noreferrer">Tickets</a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No concerts found for this artist.</p>
            )}
        </div>
    );
};

export default ArtistDetailsPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ArtistDetailsPage.css';

async function fetchConcertsByCountry(artistName, ticketmasterApiKey, countryCode) {
    try {
        const url = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${encodeURIComponent(artistName)}&countryCode=${countryCode}&apikey=${ticketmasterApiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        return data._embedded ? data._embedded.events : [];
    } catch (error) {
        console.error('Error fetching concerts:', error);
        return [];
    }

}

async function fetchArtistData(artistId, accessToken, ticketmasterApiKey) {
    const headers = { 'Authorization': `Bearer ${accessToken}` };

    try {
        const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, { headers });
        const artistData = await artistResponse.json();

        const topTracksResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`, { headers });
        const topTracksData = await topTracksResponse.json();

        const albumsResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, { headers });
        const albumsData = await albumsResponse.json();

        // Fetch concerts for US and Canada separately
        const usConcerts = await fetchConcertsByCountry(artistData.name, ticketmasterApiKey, 'US');
        const caConcerts = await fetchConcertsByCountry(artistData.name, ticketmasterApiKey, 'CA');

        return {
            artist: artistData,
            topTracks: topTracksData.tracks,
            albums: albumsData.items,
            usConcerts: usConcerts,
            caConcerts: caConcerts,
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
    const [usConcerts, setUsConcerts] = useState([]);
    const [caConcerts, setCaConcerts] = useState([]);
    const ticketmasterApiKey = process.env.REACT_APP_TICKETMASTER_API_KEY;

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken && artistId && ticketmasterApiKey) {
            fetchArtistData(artistId, accessToken, ticketmasterApiKey).then(data => {
                setArtistDetails(data.artist);
                setTopTracks(data.topTracks);
                setAlbums(data.albums);
                setUsConcerts(data.usConcerts);
                setCaConcerts(data.caConcerts);
            });
        }
    }, [artistId, ticketmasterApiKey]);

    if (!artistDetails) {
        return
    }

    return (
        <div>
            <div className='artist-details-page'>
            <h1 className='details-h1'>Artist Details</h1>
            <section className="d-artist-card">
                <div>
                    <img src={artistDetails.images[0]?.url} alt={artistDetails.name} className='d-artist-img' />
                    <h1 className='d-artist-name'>{artistDetails.name}</h1>
                    <p className='followers'>Followers: {artistDetails.followers.total.toLocaleString()}</p>
                </div>
                <div className="d-artist-info">
                    <div className="top-tracks">
                        <h2>Top Tracks</h2>
                        <ol>
                            {topTracks.slice(0, 7).map(track => <li key={track.id}>{track.name}</li>)}
                        </ol>
                    </div>
                    <div className="albums">
                        <h2>Albums</h2>
                        <ul>
                            {albums.slice(0, 7).map(album => <li key={album.id}>{album.name}</li>)}
                        </ul>
                    </div>
                </div>
            </section>
            </div>
            <div className='concerts-container'>
            <h1 className='details-h1'>Available Concerts</h1>
                <section className="concerts">
                <h2 className='details-h2'>Concerts in the US</h2>
                {usConcerts.length > 0 ? (
                    <ul>
                        {usConcerts.map(concert => (
                            <li key={concert.id}>
                                {concert.name} | <span className='concert-date'>{concert.dates.start.localDate}</span>
                                <br />
                                <a href={concert.url} target="_blank" rel="noopener noreferrer">Tickets</a>
                            </li>
                        ))}
                    </ul>
                ) : <p className='concert-error'>No concerts found for this artist in the US.</p>}

                <h2 className='details-h2'>Concerts in Canada</h2>
                {caConcerts.length > 0 ? (
                    <ul>
                        {caConcerts.map(concert => (
                            <li key={concert.id}>
                                {concert.name} | <span className='concert-date'>{concert.dates.start.localDate}</span>
                                <br />
                                <a href={concert.url} target="_blank" rel="noopener noreferrer">Tickets</a>
                            </li>
                        ))}
                    </ul>
                ) : <p className='concert-error'>No concerts found for this artist in Canada.</p>}
                </section>
            </div>
        </div>
    );
}

export default ArtistDetailsPage;
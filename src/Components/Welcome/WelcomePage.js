import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';
import { useAuth } from '../Authentication/Auth';
import { SpotifyLoginButton } from '../Authentication/SpotifyLoginButton';
import Filters from './Filters';

const WelcomePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterParams, setFilterParams] = useState({});
    const navigate = useNavigate();
    const [recommendedConcerts, setRecommendedConcerts] = useState([]);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const apiKey = process.env.REACT_APP_TICKETMASTER_API_KEY;
        
        const fetchRecommendedConcerts = async () => {
            let fetchUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&classificationName=music&countryCode=CA`;
            for (const param in filterParams) {
                if (filterParams[param]) {
                    if (param === 'countryCode') {
                        fetchUrl = fetchUrl.replace('&countryCode=CA', '');
                    }
                    fetchUrl += `&${param}=${encodeURIComponent(filterParams[param])}`;
                }
            }

            try {
                const response = await fetch(fetchUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch recommended concerts');
                }
                const data = await response.json();
                if (data._embedded?.events) {
                    const events = data._embedded.events.map(event => ({
                        id: event.id,
                        name: event.name,
                        date: event.dates.start.localDate,
                        location: event._embedded.venues[0].name,
                        image: event.images[0].url
                    })).slice(0, 15);
                    setRecommendedConcerts(events);
                } else {
                    setRecommendedConcerts([]);
                }
            } catch (error) {
                console.error('Error:', error);
                setRecommendedConcerts([]);
            }
        };

        fetchRecommendedConcerts();
    }, [filterParams]); // apiKey is constant from .env, so it doesn't need to be a dependency

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search-results?query=${encodeURIComponent(searchQuery)}&type=artist`);
        } else {
            console.error('Search query is required');
        }
    };

    const applyFilters = (filters) => {
        setFilterParams(filters);
    };

    return (
        <div className="welcome-page-container">
            <div className="logo-div">
                <img src="images/TextLogo.png" alt="ConcertBeat logo" className="welcome-logo" />
            </div>
            {isAuthenticated ? (
                <form onSubmit={handleSearch} className='welcome-form'>
                    <input
                        type="text"
                        placeholder="Search for artists"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="search-spotify">Search</button>
                </form>
            ) : (
                <div className="welcome-login">
                    <p className='login-message'>Login with Spotify to use all features</p>
                    <SpotifyLoginButton />
                </div>
            )}
            <div className='header-text'>
                <h2 className='welcome-concerts-header'>ConcertBeat's Recommended Concerts</h2>
                <Filters className="filter-icon" onApply={applyFilters} />
            </div>
            <div className="welcome-line"></div>            
            <div className="recommended-concerts">
                {recommendedConcerts.length > 0 ? (
                    recommendedConcerts.map(concert => (
                        <div key={concert.id} className="concert-card" onClick={() => navigate(`/concert/${concert.id}`)}>
                            <img src={concert.image} alt={concert.name} className="concert-image" />
                            <h3>{concert.name}</h3>
                            <p>Date: {concert.date}</p>
                            <p>Location: {concert.location}</p>
                        </div>
                    ))
                ) : (
                    <p className='no-concerts-found'>No concerts found.</p>
                )}
            </div>
        </div>
    );
};

export default WelcomePage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const [recommendedConcerts, setRecommendedConcerts] = useState([]);

    useEffect(() => {
        fetchRecommendedConcerts();
    }, []);

    const fetchRecommendedConcerts = async () => {
        const apiKey = process.env.REACT_APP_TICKETMASTER_API_KEY;
        const fetchUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&classificationName=music&countryCode=CA`;

        try {
            const response = await fetch(fetchUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch recommended concerts');
            }
            const data = await response.json();
            const events = data._embedded?.events.map(event => ({
                id: event.id,
                name: event.name,
                date: event.dates.start.localDate,
                location: event._embedded.venues[0].name,
                image: event.images[0].url
            })).slice(0, 15);

            // filter to only show the same artist once
            const uniqueEvents = [];
            const seenArtists = new Set();
            for (const event of events) {
                if (!seenArtists.has(event.name)) {
                    seenArtists.add(event.name);
                    uniqueEvents.push(event);
                }
            }
            setRecommendedConcerts(uniqueEvents);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search-results?query=${encodeURIComponent(searchQuery)}&type=artist`);
        } else {
            console.error('Search query is required');
        }
    };

    return (
        <div className="welcome-page-container">
            <div className="logo-div">
                <img src="images/TextLogo.png" alt="ConcertBeat logo" className="welcome-logo" />
            </div>
            
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

            <h2 className='welcome-concerts-header'>ConcertBeat's Recommended Concerts</h2>
            <div className="welcome-line"></div>            
            <div className="recommended-concerts">
                {recommendedConcerts.map(concert => (
                    <div key={concert.id} className="concert-card" onClick={() => navigate(`/concert/${concert.id}`)}>
                        <img src={concert.image} alt={concert.name} className="concert-image" />
                        <h3>{concert.name}</h3>
                        <p>Date: {concert.date}</p>
                        <p>Location: {concert.location}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WelcomePage;

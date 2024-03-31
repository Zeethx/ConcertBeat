import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchSpotify } from './Search';
import SearchResults from './SearchResults';
import '../App.css';

const WelcomePage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { searchSpotify, searchResults, isLoading, error } = useSearchSpotify();
    const Navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            searchSpotify(searchQuery, 'artist', accessToken);
        } else {
            console.error('Access token not found');
        }
    };

    const handleSelectArtist = (artistId) => {
        Navigate(`/artist/${artistId}`);
    };

    return (
        <div>
            <h1>Welcome to ConcertBeat!</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for artists..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-spotify">Search</button>
            </form>

            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <SearchResults results={searchResults} onSelectArtist={handleSelectArtist} />

            <button className="logout-button" onClick={() => {
                localStorage.removeItem('accessToken');
                window.location.href = '/';
            }}>
                Logout from Spotify
            </button>
        </div>
    );
};

export default WelcomePage;

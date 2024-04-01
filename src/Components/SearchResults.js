import React from 'react';
import './SearchResults.css';

const SearchResults = ({ results, onSelectArtist }) => {
    const renderArtists = (artists) => {
        return artists.items.map((artist) => (
            <div key={artist.id} className="search-result-item" onClick={() => onSelectArtist(artist.id)}>
                <img src={artist.images[0]?.url} alt={artist.name} className="sr-artist-image" />
                <div className="sr-artist-details">
                    <div className="sr-artist-name">{artist.name}</div>
                    <div className="sr-artist-detail">Followers: {artist.followers.total.toLocaleString()}</div>
                    <div className="sr-artist-detail">Genre: {artist.genres.join(', ')}</div>
                </div>
            </div>
        ));
    };

    return (
        <div className="search-results">
            {results.artists && (
                <div>
                    <h2 className='search-results-header'>Artists</h2>
                    <div className="search-line"></div>
                    {renderArtists(results.artists)}
                </div>
            )}
        </div>
    );
};


export default SearchResults;

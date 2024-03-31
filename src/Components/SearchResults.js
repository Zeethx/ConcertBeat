import React from 'react';

const SearchResults = ({ results, onSelectArtist }) => {
    // Render function for artists
    const renderArtists = (artists) => {
        return artists.items.map((artist) => (
            <div key={artist.id} className="search-result-item" onClick={() => onSelectArtist(artist.id)} style={{ cursor: 'pointer' }}>
                <img src={artist.images[0]?.url} alt={artist.name} style={{ width: 100, height: 100 }} />
                <div>{artist.name}</div>
            </div>
        ));
    };

    // /Maybe needed for artist page
    // const renderTracks = (tracks) => {
    //     return tracks.items.map((track) => (
    //         <div key={track.id} className="search-result-item">
    //             <div>{track.name}</div>
    //             <div>{track.artists.map(artist => artist.name).join(', ')}</div>
    //         </div>
    //     ));
    // };

    return (
        <div className="search-results">
            {results.artists && (
                <div>
                    <h2>Artists</h2>
                    {renderArtists(results.artists)}
                </div>
            )}
        </div>
    );
};

export default SearchResults;

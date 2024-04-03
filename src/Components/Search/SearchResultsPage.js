// SearchResultsPage.js
import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SearchResults from './SearchResults';
import { useSearchSpotify } from './Search';

const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const navigate = useNavigate();
    const { searchSpotify, searchResults, isLoading, error } = useSearchSpotify();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (query && accessToken) {
            searchSpotify(query, 'artist', accessToken);
        }
    }, [query, searchSpotify]);

    const handleSelectArtist = (artistId) => {
        navigate(`/artist/${artistId}`);
    };

    return (
        <div>
            {isLoading}
            {error && <p>Error: {error}</p>}
            <SearchResults results={searchResults} onSelectArtist={handleSelectArtist} />
        </div>
    );
};

export default SearchResultsPage;

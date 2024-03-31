import { useState } from 'react';

export const useSearchSpotify = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchSpotify = async (query, type, accessToken) => {
    if (!query) {
      console.error('Search query is required');
      setError('Search query is required');
      return;
    }

    setIsLoading(true);
    const baseURL = 'https://api.spotify.com/v1/search';
    const queryParams = new URLSearchParams({
      q: query,
      type: type,
      limit: 20,
    });

    try {
      const response = await fetch(`${baseURL}?${queryParams}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching Spotify:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { searchSpotify, searchResults, isLoading, error };
};

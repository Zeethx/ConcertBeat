import { useState } from 'react';

export const useSearchSpotify = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Updated searchSpotify function to return a promise
  const searchSpotify = (query, type, accessToken) => {
    return new Promise(async (resolve, reject) => {
      if (!query) {
        console.error('Search query is required');
        setError('Search query is required');
        reject(new Error('Search query is required')); // Reject the promise if query is missing
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
          const errorMessage = `HTTP error! status: ${response.status}`;
          console.error(errorMessage);
          setError(errorMessage);
          reject(new Error(errorMessage)); // Reject the promise if response is not ok
          return;
        }

        const data = await response.json();
        setSearchResults(data);
        resolve(data); // Resolve the promise with the data
      } catch (error) {
        console.error('Error searching Spotify:', error);
        setError(error.message);
        reject(error); 
      } finally {
        setIsLoading(false);
      }
    });
  };

  return { searchSpotify, searchResults, isLoading, error };
};

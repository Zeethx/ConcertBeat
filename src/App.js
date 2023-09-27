import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import ConcertList from './components/ConcertList';

function App() {
  const [concerts, setConcerts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to fetch concerts from an API (you'll need to implement this)
  const fetchConcerts = async (query) => {
    // Perform API request here and set the concerts state
    // Example:
    // const response = await fetch(`API_ENDPOINT?query=${query}`);
    // const data = await response.json();
    // setConcerts(data);
  };

  useEffect(() => {
    if (searchQuery) {
      fetchConcerts(searchQuery);
    }
  }, [searchQuery]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>ConcertBeat</h1>
        <SearchBar onSearch={setSearchQuery} />
        <ConcertList concerts={concerts} />
      </header>
    </div>
  );
}

export default App;

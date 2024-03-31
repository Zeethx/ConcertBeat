import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home'; 
import {CallbackPage} from './Components/CallbackPage'; 
import WelcomePage from './Components/WelcomePage';
import SearchResults from './Components/SearchResults';
import ArtistDetailsPage from './Components/ArtistDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/artist/:artistId" element={<ArtistDetailsPage />} />
        {/* You can add more routes here as your app expands */}
      </Routes>
    </Router>
  );
}

export default App;

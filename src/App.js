import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/NavBar/Navbar'; 
import {CallbackPage} from './Components/CallbackPage'; 
import WelcomePage from './Components/WelcomePage';
import SearchResults from './Components/SearchResults';
import ArtistDetailsPage from './Components/ArtistDetailsPage';
import ShowUserConcerts from './Components/ShowUserConcerts';
import UserProfile from './Components/UserProfile';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/callback" element={<CallbackPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/artist/:artistId" element={<ArtistDetailsPage />} />
          <Route path="/user-top-concerts" element={<ShowUserConcerts />} />
          <Route path="/user-profile" element={<UserProfile />} />
          {/* You can add more routes here as your app expands */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

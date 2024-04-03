import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import Navbar from './Components/NavBar/Navbar'; 
import {CallbackPage} from './Components/Authentication/CallbackPage'; 
import WelcomePage from './Components/Welcome/WelcomePage';
import SearchResultsPage from './Components/Search/SearchResultsPage';
import ArtistDetailsPage from './Components/ArtistDetails/ArtistDetailsPage';
import ShowUserConcerts from './Components/Concerts/ShowUserConcerts';
import ConcertDetailsPage from './Components/Concerts/ConcertDetailsPage';
import UserProfile from './Components/Profile/UserProfile';
import { AuthProvider } from './Components/Authentication/Auth';
import ProtectedRoute from './Components/Authentication/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/callback" element={<CallbackPage />} />
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/artist/:artistId" element={<ArtistDetailsPage />} />
            <Route path="/concert/:concertId" element={<ConcertDetailsPage />} />
            <Route path="/user-top-concerts" element={<ProtectedRoute>
              <ShowUserConcerts /></ProtectedRoute>} />
            <Route path="/user-profile" element={<ProtectedRoute>
              <UserProfile /></ProtectedRoute>} />
            <Route path="/search-results" element={<ProtectedRoute>
              <SearchResultsPage /></ProtectedRoute>} />
            
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

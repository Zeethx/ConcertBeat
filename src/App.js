import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/NavBar/Navbar'; 
import {CallbackPage} from './Components/CallbackPage'; 
import WelcomePage from './Components/WelcomePage';
import SearchResultsPage from './Components/SearchResultsPage';
import ArtistDetailsPage from './Components/ArtistDetailsPage';
import ShowUserConcerts from './Components/ShowUserConcerts';
import UserProfile from './Components/UserProfile';
import { AuthProvider } from './Components/Auth';
import ProtectedRoute from './Components/ProtectedRoute';

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

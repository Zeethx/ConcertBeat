import React from 'react';
import UserTopArtists from './UserTopArtists';
import UserPlaylists from './UserPlaylists';
import '../App.css';

const WelcomePage = () => {

    return (
        <div>
            <h1>Welcome to ConcertBeat!</h1>
            <UserPlaylists />
            <UserTopArtists />
            {/* ask the user to logout */}
            <button className="logout-button" onClick={() => {
                localStorage.removeItem('accessToken');
                window.location.href = '/';
            }}>
                Logout from Spotify</button>
        </div>
    );
};

export default WelcomePage;
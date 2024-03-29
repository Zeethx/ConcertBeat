import React from 'react';

const clientId = process.env.REACT_APP_CLIENT_ID; 
const redirectUri = process.env.REACT_APP_REDIRECT_URI;
const scopes = [
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
  'user-top-read'
  // add more scopes as needed
];
const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}&response_type=code&show_dialog=true`;

export const SpotifyLoginButton = () => (
 
  <button className="login-button" onClick={() => window.location.href = authUrl}>
    Login with Spotify
  </button>
);
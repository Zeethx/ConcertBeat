import React from 'react';
import { SpotifyLoginButton } from './SpotifyLoginButton'; // Adjust the import path based on your file structure

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Concert Finder</h1>
      <SpotifyLoginButton />
    </div>
  );
};

export default Home;

import React from 'react';
import { SpotifyLoginButton } from './SpotifyLoginButton'; // Adjust the import path based on your file structure
import './Home.css';

const Home = () => {
  return (
    <div className='home-div'>
      {/* <h1>Welcome to ConcertBeat</h1> */}
      <img src="/images/TextLogo.png" alt="Concertbeat" className='logo'/><br/>
      <SpotifyLoginButton />
    </div>
  );
};

export default Home;

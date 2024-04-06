import React from 'react';
import { SpotifyLoginButton } from '../Authentication/SpotifyLoginButton'; // Adjust the import path based on your file structure
import './Home.css';
import { BsArrow90DegUp } from "react-icons/bs";

const Home = () => {
  return (
    <div className="main-home-div">
      <div className='popup-div'>
        <p className='popup-message'>
          <BsArrow90DegUp></BsArrow90DegUp>Continue without logging in
        </p>
      </div>
      <div className='home-div'>
        {/* <h1>Welcome to ConcertBeat</h1> */}
        <img src="/images/TextLogo.png" alt="Concertbeat" className='logo'/><br/>
        <SpotifyLoginButton />
      <p className="code-text">Or Scan the code</p>
      <img src="../images/spotify-code.svg" class="spotify-code" alt='spotify-code'></img>
      </div>
      <div className='footer'>
        <p>You have to be manually added to the spotify users list for the API
          to be available to
          you, <a href='mailto:raghavanand1869@gmail.com' className="mailto-class">
            email me</a> with your name and spotify email to use the app.</p>
      </div>
    </div>
  );
};

export default Home;

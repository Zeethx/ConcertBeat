import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const navigate = useNavigate();
    const spotifyAccessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!spotifyAccessToken) {
                console.error('Missing Spotify access token');
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('https://concertbeat-backend.vercel.app/api/spotify/user-profile', {
                    headers: { 'Authorization': `Bearer ${spotifyAccessToken}` },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user profile');
                }
                const data = await response.json();
                setUserProfile(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUserProfile();
    }, [spotifyAccessToken, navigate]);

    const redirectToSpotifyProfile = () => {
        if (userProfile && userProfile.external_urls && userProfile.external_urls.spotify) {
            window.open(userProfile.external_urls.spotify, '_blank');
        }
    };

    return (
        <div className='user-profile'>
            <h2 className="profile-header">Your Spotify Profile</h2>
            {userProfile ? (
                <div className='profile-div' onClick={redirectToSpotifyProfile} style={{ cursor: 'pointer' }}>
                    <img src={userProfile.images[0]?.url} alt={userProfile.display_name || 'User profile'} className='profile-image' />
                    <p className='profile-p'>Display name: {userProfile.display_name}</p>
                    <p className='profile-p'>Country: {userProfile.country}</p>
                </div>
            ) : (
                <p>Loading your profile...</p>
            )}
        </div>
    );
};

export default UserProfile;

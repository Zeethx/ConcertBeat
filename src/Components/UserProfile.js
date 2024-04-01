import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState(null);
    const navigate = useNavigate(); 
    const spotifyAccessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        // Adjusted the endpoint to a hypothetical one that returns Spotify user profile data
        const fetchUserProfile = async () => {
            if (!spotifyAccessToken) {
                console.error('Missing Spotify access token');
                navigate('/login'); // Redirecting to login if accessToken is not found
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/spotify/user-profile', {
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

    return (
        <div className='user-profile'>
            <h2 className="profile-header">Your Spotify Profile</h2>
            {userProfile ? (
                <div className='profile-div'>
                    <img src={userProfile.images[0]?.url} alt={userProfile.display_name || 'User profile'}  className='profile-image' />
                    <p className='profile-p'>Display name: {userProfile.display_name}</p>
                    <p className='profile-p'>Country: {userProfile.country}</p>
                </div>
            ) : (
                <p>Loading your profile...</p>
            )}
        </div>
    );
}

export default UserProfile;

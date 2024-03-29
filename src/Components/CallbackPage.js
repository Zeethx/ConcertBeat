import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const CallbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');
    if (code) {
      fetch('http://localhost:5000/api/spotify/callback', { // Make sure the URL is correct for your backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setLoading(false);
          // Store tokens in localStorage
          localStorage.setItem('accessToken', data.access_token);
          localStorage.setItem('refreshToken', data.refresh_token);
          // Redirect the user to the home page upon successful login
          navigate('/welcome');
        })
        .catch(error => {
          setLoading(false);
          setError('Failed to login. Please try again.');
          console.error('Error during token exchange:', error);
        });
    } else {
      setLoading(false);
      setError('No code found in the URL to exchange for tokens.');
    }
  }, [location, navigate]); // Added 'navigate' to the dependency array

  if (loading) {
    return <div>Processing your login...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return null;
};

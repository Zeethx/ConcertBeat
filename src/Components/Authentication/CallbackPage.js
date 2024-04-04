import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const CallbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error] = useState('');

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');
    if (code) {
      fetch('https://concertbeat-backend.vercel.app/api/spotify/callback', { 
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
          navigate('/welcome');
        })
        .catch(error => {
          setLoading(false);
          console.error('Error during token exchange:', error);
        });
    } else {
      setLoading(false);
      navigate('/welcome');
    }
  }, [location, navigate]); // Added 'navigate' to the dependency array

  if (loading) {
    return 
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return null;
};

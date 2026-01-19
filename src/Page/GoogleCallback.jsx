import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

// This hook handles Google OAuth callback
export const useGoogleCallback = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');

      if (!code) return; // No OAuth callback

      try {
        console.log('Processing Google OAuth callback...');
        console.log('Code found, exchanging for token...');
        
        // Exchange code for token via Djoser social auth
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/o/google-oauth2/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code,
            state: state || '',
          }),
        });

        const data = await response.json();
        console.log('Backend response received:', data);

        // Djoser social auth returns token in different fields depending on strategy
        // We switched back to jwt strategy, so it should be in 'access'
        const token = data.access || data.token || data.auth_token;

        if (response.ok && token) {
          // Store the token
          localStorage.setItem('token', token);
          console.log('Google login successful, token stored.');
          
          // Clear URL parameters and reload
          setSearchParams({});
          window.location.href = window.location.origin;
        } else {
          console.error('Google auth failed at backend:', data);
          setSearchParams({});
          const errorMsg = data.non_field_errors?.[0] || 
                          data.detail || 
                          'Google authentication failed. Please try again.';
          alert(`Authentication Error: ${errorMsg}`);
        }
      } catch (error) {
        console.error('Error during Google callback process:', error);
        setSearchParams({});
        alert('An unexpected error occurred during Google authentication. Check console for details.');
      }
    };

    handleGoogleCallback();
  }, [searchParams, setSearchParams, navigate]);
};

export default useGoogleCallback;


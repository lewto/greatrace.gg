import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRacing } from '../context/RacingContext';

export default function Callback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { handleOAuthCallback } = useRacing();

  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      handleOAuthCallback(code)
        .then(() => {
          navigate('/dashboard');
        })
        .catch((error) => {
          console.error('OAuth callback error:', error);
          navigate('/', { state: { error: 'Authentication failed' } });
        });
    } else {
      navigate('/');
    }
  }, [searchParams, handleOAuthCallback, navigate]);

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FF1801] border-t-transparent mx-auto"></div>
        <p className="mt-4 text-white font-medium">Connecting to iRacing...</p>
      </div>
    </div>
  );
}
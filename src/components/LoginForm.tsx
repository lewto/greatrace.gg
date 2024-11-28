import React from 'react';
import { Trophy, ExternalLink } from 'lucide-react';
import { useRacing } from '../context/RacingContext';
import { DEVELOPMENT_MODE } from '../services/api/config';

interface LoginFormProps {
  onLogin: () => void;
}

export default function LoginForm({ onLogin }: LoginFormProps) {
  const { login, loading, error } = useRacing();

  const handleDemoLogin = async () => {
    try {
      await login();
      onLogin();
    } catch (err) {
      console.error('Demo login failed:', err);
    }
  };

  const handleIRacingLogin = () => {
    const auth = AuthService.getInstance();
    auth.initiateLogin();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-orbitron bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Connect with iRacing
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          {DEVELOPMENT_MODE 
            ? 'Use demo mode to preview the application'
            : 'Sign in securely with your iRacing account'}
        </p>
      </div>

      <div className="space-y-4">
        {DEVELOPMENT_MODE ? (
          <button
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full glitch-button bg-gradient-to-r from-[#FF1801] to-[#FF4D4D] text-white rounded-lg px-4 py-3 font-medium hover:from-[#FF4D4D] hover:to-[#FF1801] transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              </div>
            ) : (
              'Preview in Demo Mode'
            )}
            <div className="scanline" />
          </button>
        ) : (
          <button
            onClick={handleIRacingLogin}
            className="w-full glitch-button bg-gradient-to-r from-[#FF1801] to-[#FF4D4D] text-white rounded-lg px-4 py-3 font-medium hover:from-[#FF4D4D] hover:to-[#FF1801] transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="flex items-center justify-center space-x-2">
              <Trophy className="w-5 h-5" />
              <span>Sign in with iRacing</span>
            </div>
            <div className="scanline" />
          </button>
        )}

        {error && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <div className="text-center">
          <a
            href="https://www.iracing.com/membership/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <span>Don't have an iRacing account?</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
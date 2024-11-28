import { API_CONFIG as baseConfig } from './config.base';

// Use Vite's import.meta.env for environment variables
const env = {
  IRACING_CLIENT_ID: import.meta.env.VITE_IRACING_CLIENT_ID,
  REDIRECT_URI: import.meta.env.VITE_REDIRECT_URI || 'http://localhost:5173/callback',
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  NODE_ENV: import.meta.env.MODE
};

export const API_CONFIG = {
  ...baseConfig,
  oauth: {
    ...baseConfig.oauth,
    clientId: env.IRACING_CLIENT_ID || '',
    redirectUri: env.REDIRECT_URI,
  }
};

export const DEVELOPMENT_MODE = env.NODE_ENV === 'development';
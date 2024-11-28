export const API_CONFIG = {
  baseUrl: 'https://members-ng.iracing.com',
  oauth: {
    authorizeUrl: 'https://members-oauth.iracing.com/auth/authorize',
    tokenUrl: 'https://members-oauth.iracing.com/auth/token',
    scope: 'openid profile email offline_access',
    clientId: import.meta.env.VITE_IRACING_CLIENT_ID || '',
    redirectUri: import.meta.env.VITE_REDIRECT_URI || 'http://localhost:5173/callback'
  },
  endpoints: {
    member: {
      info: '/data/member/info',
      chart: '/data/member/chart',
      recent: '/data/member/recent_races'
    },
    results: {
      get: '/data/results/get',
      search: '/data/results/search'
    }
  },
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'User-Agent': 'GreatRace.gg/1.0.0'
  }
};
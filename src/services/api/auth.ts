import axios from 'axios';
import { API_CONFIG } from './config';
import { mockDrivers } from '../mockData';

export class AuthService {
  private static instance: AuthService;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private isDemoMode: boolean;

  private constructor() {
    this.isDemoMode = import.meta.env.DEV;
    
    // Restore tokens if they exist
    this.accessToken = localStorage.getItem('iracing_access_token');
    this.refreshToken = localStorage.getItem('iracing_refresh_token');

    // Set up axios interceptors
    this.setupInterceptors();
  }

  private setupInterceptors() {
    axios.interceptors.response.use(
      response => response,
      async error => {
        if (error.response?.status === 401 && this.refreshToken) {
          try {
            await this.refreshAccessToken();
            const config = error.config;
            config.headers.Authorization = `Bearer ${this.accessToken}`;
            return axios(config);
          } catch (refreshError) {
            this.logout();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  initiateLogin(): void {
    if (this.isDemoMode) {
      // In demo mode, simulate successful login with mock data
      this.setTokens('demo-token', 'demo-refresh');
      return;
    }

    const params = new URLSearchParams({
      client_id: API_CONFIG.oauth.clientId,
      redirect_uri: API_CONFIG.oauth.redirectUri,
      response_type: 'code',
      scope: API_CONFIG.oauth.scope
    });

    window.location.href = `${API_CONFIG.oauth.authorizeUrl}?${params.toString()}`;
  }

  async handleCallback(code: string): Promise<void> {
    if (this.isDemoMode) {
      // In demo mode, use mock data
      this.setTokens('demo-token', 'demo-refresh');
      return;
    }

    try {
      const response = await axios.post(API_CONFIG.oauth.tokenUrl, {
        grant_type: 'authorization_code',
        client_id: API_CONFIG.oauth.clientId,
        code,
        redirect_uri: API_CONFIG.oauth.redirectUri
      });

      this.setTokens(response.data.access_token, response.data.refresh_token);
    } catch (error) {
      console.error('Failed to exchange code for tokens:', error);
      throw new Error('Authentication failed');
    }
  }

  private async refreshAccessToken(): Promise<void> {
    if (this.isDemoMode) {
      this.setTokens('demo-token', 'demo-refresh');
      return;
    }

    try {
      const response = await axios.post(API_CONFIG.oauth.tokenUrl, {
        grant_type: 'refresh_token',
        client_id: API_CONFIG.oauth.clientId,
        refresh_token: this.refreshToken
      });

      this.setTokens(response.data.access_token, response.data.refresh_token);
    } catch (error) {
      console.error('Failed to refresh token:', error);
      this.logout();
      throw error;
    }
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('iracing_access_token', accessToken);
    localStorage.setItem('iracing_refresh_token', refreshToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  getDemoDriver() {
    if (this.isDemoMode) {
      return mockDrivers['12345'];
    }
    return null;
  }

  logout(): void {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('iracing_access_token');
    localStorage.removeItem('iracing_refresh_token');
    delete axios.defaults.headers.common['Authorization'];
  }
}
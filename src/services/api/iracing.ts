import axios from 'axios';
import { API_CONFIG } from './config';
import { IRacingAuth } from '../../utils/auth';

export class IRacingAPI {
  private static instance: IRacingAPI;
  private baseUrl: string;
  private token: string | null = null;
  private custId: string | null = null;

  private constructor() {
    this.baseUrl = API_CONFIG.baseUrl;
    
    // Configure axios defaults
    axios.defaults.withCredentials = true;
    
    // Set up interceptors for rate limiting and auth
    axios.interceptors.response.use(
      response => {
        const rateLimits = IRacingAuth.parseRateLimits(response.headers);
        if (rateLimits.remaining <= 0) {
          console.warn('Rate limit reached, waiting until reset...');
        }
        return response;
      },
      error => {
        if (error.response?.status === 401) {
          this.logout();
        }
        return Promise.reject(error);
      }
    );

    // Restore session if exists
    const savedToken = localStorage.getItem('iracing_token');
    const savedCustId = localStorage.getItem('iracing_custid');
    if (savedToken && savedCustId) {
      this.token = savedToken;
      this.custId = savedCustId;
      this.setAuthHeader(savedToken);
    }
  }

  static getInstance(): IRacingAPI {
    if (!IRacingAPI.instance) {
      IRacingAPI.instance = new IRacingAPI();
    }
    return IRacingAPI.instance;
  }

  private setAuthHeader(token: string) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  async login(email: string, password: string): Promise<{ token: string; custId: string }> {
    try {
      const encodedPassword = IRacingAuth.encodePassword(password, email);
      
      const response = await axios.post(
        `${this.baseUrl}/auth`,
        { email, password: encodedPassword },
        { headers: API_CONFIG.headers }
      );

      if (!response.data.authtoken || !response.data.custid) {
        throw new Error('Invalid response from iRacing');
      }

      this.token = response.data.authtoken;
      this.custId = response.data.custid;
      
      // Save session
      localStorage.setItem('iracing_token', this.token);
      localStorage.setItem('iracing_custid', this.custId);
      
      this.setAuthHeader(this.token);

      return {
        token: this.token,
        custId: this.custId
      };
    } catch (error: any) {
      if (error.response?.status === 429) {
        throw new Error('Too many login attempts. Please try again later.');
      }
      if (error.response?.status === 401) {
        throw new Error('Invalid email or password.');
      }
      if (error.response?.status === 503) {
        throw new Error('iRacing is currently under maintenance.');
      }
      throw new Error('Failed to connect to iRacing. Please try again.');
    }
  }

  async getMemberInfo(custId: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/data/member/info`, {
        params: { cust_id: custId }
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Member not found');
      }
      throw new Error('Failed to fetch member information');
    }
  }

  async getRecentRaces(custId: string, limit = 10) {
    try {
      const response = await axios.get(`${this.baseUrl}/data/member/recent_races`, {
        params: { cust_id: custId, limit }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch recent races');
    }
  }

  logout() {
    this.token = null;
    this.custId = null;
    localStorage.removeItem('iracing_token');
    localStorage.removeItem('iracing_custid');
    delete axios.defaults.headers.common['Authorization'];
  }

  isAuthenticated(): boolean {
    return !!this.token && !!this.custId;
  }

  getCustomerId(): string | null {
    return this.custId;
  }
}
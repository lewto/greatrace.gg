import axios from 'axios';
import type { 
  Driver, 
  RaceResult, 
  Track, 
  Car, 
  Series, 
  Achievement,
  CareerStats 
} from '../types/racing';
import { 
  mockDrivers, 
  mockRaceResults, 
  mockAchievements, 
  mockCareerStats 
} from './mockData';

const IS_DEVELOPMENT = import.meta.env.DEV;
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export class IRacingService {
  private token: string | null = null;

  constructor() {
    axios.defaults.withCredentials = true;
  }

  setToken(token: string) {
    this.token = token;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  async login(username: string, password: string) {
    if (IS_DEVELOPMENT) {
      return { token: 'mock-token', driverId: '12345' };
    }

    try {
      const response = await axios.post(`${API_URL}/auth/login`, { username, password });
      this.setToken(response.data.token);
      return response.data;
    } catch (error) {
      throw new Error('Authentication failed');
    }
  }

  async getDriverProfile(driverId: string): Promise<Driver> {
    if (IS_DEVELOPMENT) {
      const driver = mockDrivers[driverId];
      if (!driver) throw new Error('Driver not found');
      return driver;
    }

    const response = await axios.get(`${API_URL}/drivers/${driverId}`);
    return response.data;
  }

  async getRecentRaces(driverId: string, limit: number = 10): Promise<RaceResult[]> {
    if (IS_DEVELOPMENT) {
      const races = mockRaceResults[driverId] || [];
      return races.slice(0, limit);
    }

    const response = await axios.get(`${API_URL}/results/recent`, {
      params: { driverId, limit }
    });
    return response.data;
  }

  async getDriverAchievements(driverId: string): Promise<Achievement[]> {
    if (IS_DEVELOPMENT) {
      return mockAchievements[driverId] || [];
    }

    const response = await axios.get(`${API_URL}/achievements/${driverId}`);
    return response.data;
  }

  async getCareerStats(driverId: string): Promise<CareerStats> {
    if (IS_DEVELOPMENT) {
      const stats = mockCareerStats[driverId];
      if (!stats) throw new Error('Career stats not found');
      return stats;
    }

    const response = await axios.get(`${API_URL}/stats/career/${driverId}`);
    return response.data;
  }
}
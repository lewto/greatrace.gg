import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export class API {
  static async getDriverStats(custId: string) {
    try {
      const response = await axios.get(`${API_URL}/driver/${custId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch driver statistics');
    }
  }

  static async getRecentRaces(custId: string) {
    try {
      const response = await axios.get(`${API_URL}/driver/${custId}/recent-races`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch recent races');
    }
  }
}
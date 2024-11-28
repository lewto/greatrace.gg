import axios from 'axios';
import crypto from 'crypto';
import { createClient } from 'redis';

export class IRacingService {
  constructor() {
    this.baseUrl = 'https://members-ng.iracing.com';
    this.redis = createClient({
      url: process.env.REDIS_URL
    });
    this.setupRedis();
  }

  async setupRedis() {
    await this.redis.connect();
  }

  async getDriverStats(custId) {
    const cacheKey = `driver:${custId}:stats`;
    
    // Try cache first
    const cached = await this.redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    // Fetch from iRacing
    const stats = await this.fetchDriverStats(custId);
    
    // Cache for 5 minutes
    await this.redis.set(cacheKey, JSON.stringify(stats), {
      EX: 300
    });

    return stats;
  }

  async fetchDriverStats(custId) {
    try {
      const response = await axios.get(`${this.baseUrl}/data/member/info`, {
        params: { custid: custId },
        headers: {
          'Authorization': `Bearer ${await this.getAuthToken()}`
        }
      });
      return this.formatDriverStats(response.data);
    } catch (error) {
      console.error('Error fetching driver stats:', error);
      throw new Error('Failed to fetch driver statistics');
    }
  }

  formatDriverStats(data) {
    return {
      name: `${data.first_name} ${data.last_name}`,
      iRating: data.irating,
      safetyRating: data.safety_rating,
      licenseClass: data.license_class,
      division: data.division,
      club: data.club_name,
      starts: data.starts,
      wins: data.wins,
      top5: data.top5,
      poles: data.poles,
      avgStart: data.avg_start,
      avgFinish: data.avg_finish,
      lapsLed: data.laps_led,
      incidents: data.incidents
    };
  }

  async getAuthToken() {
    // Implementation would handle secure token management
    // This is just a placeholder - actual implementation would
    // handle proper authentication flow with iRacing
    return process.env.IRACING_TOKEN;
  }
}
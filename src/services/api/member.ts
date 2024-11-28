import axios from 'axios';
import { API_CONFIG } from './config';
import { AuthService } from './auth';
import type { Driver, CareerStats } from '../../types/racing';

export class MemberService {
  private auth: AuthService;

  constructor() {
    this.auth = AuthService.getInstance();
  }

  private getHeaders() {
    return {
      ...API_CONFIG.headers,
      'Authorization': `Bearer ${this.auth.getToken()}`
    };
  }

  async getProfile(custId: string): Promise<Driver> {
    try {
      const response = await axios.get(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.member.info}`, {
        params: { custid: custId },
        headers: this.getHeaders()
      });
      return this.mapToDriver(response.data);
    } catch (error) {
      throw new Error('Failed to fetch member profile');
    }
  }

  async getStats(custId: string): Promise<CareerStats> {
    try {
      const response = await axios.get(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.member.stats}`, {
        params: { custid: custId },
        headers: this.getHeaders()
      });
      return this.mapToCareerStats(response.data);
    } catch (error) {
      throw new Error('Failed to fetch member stats');
    }
  }

  private mapToDriver(data: any): Driver {
    return {
      id: data.cust_id,
      name: `${data.first_name} ${data.last_name}`,
      iRating: data.irating,
      safetyRating: data.safety_rating,
      licenseClass: data.license_class,
      club: data.club_name,
      division: data.division
    };
  }

  private mapToCareerStats(data: any): CareerStats {
    return {
      starts: data.starts,
      wins: data.wins,
      top5: data.top5,
      poles: data.poles,
      avgStart: data.avg_start,
      avgFinish: data.avg_finish,
      lapsLed: data.laps_led,
      leadLaps: data.lead_laps,
      incidents: data.incidents,
      winPercentage: (data.wins / data.starts) * 100,
      topFivePercentage: (data.top5 / data.starts) * 100
    };
  }
}
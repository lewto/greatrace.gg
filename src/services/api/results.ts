import axios from 'axios';
import { API_CONFIG } from './config';
import { AuthService } from './auth';
import type { RaceResult } from '../../types/racing';

export class ResultsService {
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

  async getRecentRaces(custId: string, limit: number = 10): Promise<RaceResult[]> {
    try {
      const response = await axios.get(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.member.recent}`, {
        params: { 
          custid: custId,
          limit
        },
        headers: this.getHeaders()
      });
      return this.mapToRaceResults(response.data);
    } catch (error) {
      throw new Error('Failed to fetch recent races');
    }
  }

  private mapToRaceResults(data: any[]): RaceResult[] {
    return data.map(race => ({
      id: race.subsession_id,
      sessionId: race.session_id,
      trackId: race.track_id,
      seriesId: race.series_id,
      subsessionId: race.subsession_id,
      startTime: race.start_time,
      finishPosition: race.finish_position,
      startPosition: race.start_position,
      carId: race.car_id,
      carClass: race.car_class_id,
      strength_of_field: race.strength_of_field,
      winner: race.finish_position === 1,
      incidents: race.incidents,
      qualifyingTime: race.best_qual_lap_time,
      fastestLap: race.best_lap_time,
      averageLap: race.average_lap,
      lapsLed: race.laps_led,
      lapsComplete: race.laps_complete,
      championship_points: race.championship_points
    }));
  }
}
import type { Driver, RaceResult, Achievement, CareerStats } from '../types/racing';

export const mockDrivers: Record<string, Driver> = {
  '12345': {
    id: '12345',
    name: 'John Driver',
    iRating: 2500,
    safetyRating: 'A 4.99',
    licenseClass: 'A',
    club: 'California',
    division: 2
  }
};

export const mockRaceResults: Record<string, RaceResult[]> = {
  '12345': [
    {
      id: 'race1',
      sessionId: 'session1',
      trackId: 'daytona',
      seriesId: 'imsa',
      subsessionId: 'sub1',
      startTime: '2024-03-14T18:00:00Z',
      finishPosition: 1,
      startPosition: 3,
      carId: 'ferrari488',
      carClass: 'GT3',
      strength_of_field: 2750,
      winner: true,
      incidents: 0,
      qualifyingTime: '1:42.567',
      fastestLap: '1:43.123',
      averageLap: '1:43.456',
      lapsLed: 15,
      lapsComplete: 30,
      championship_points: 100
    }
  ]
};

export const mockAchievements: Record<string, Achievement[]> = {
  '12345': [
    {
      id: 'ach1',
      type: 'win',
      description: 'First GT3 Victory at Daytona',
      date: '2024-03-14',
      raceId: 'race1',
      seriesId: 'imsa',
      trackId: 'daytona'
    }
  ]
};

export const mockCareerStats: Record<string, CareerStats> = {
  '12345': {
    starts: 150,
    wins: 25,
    top5: 75,
    poles: 20,
    avgStart: 5.2,
    avgFinish: 4.8,
    lapsLed: 500,
    leadLaps: 300,
    incidents: 150,
    winPercentage: 16.67,
    topFivePercentage: 50
  }
};
export interface Driver {
  id: string;
  name: string;
  iRating: number;
  safetyRating: string;
  licenseClass: string;
  club: string;
  division: number;
}

export interface RaceResult {
  id: string;
  sessionId: string;
  trackId: string;
  seriesId: string;
  subsessionId: string;
  startTime: string;
  finishPosition: number;
  startPosition: number;
  carId: string;
  carClass: string;
  strength_of_field: number;
  winner: boolean;
  incidents: number;
  qualifyingTime?: string;
  fastestLap?: string;
  averageLap?: string;
  lapsLed: number;
  lapsComplete: number;
  championship_points: number;
}

export interface Track {
  id: string;
  name: string;
  config: string;
  length: string;
  type: 'oval' | 'road' | 'dirt_oval' | 'dirt_road';
  location: {
    country: string;
    city: string;
  };
}

export interface Car {
  id: string;
  name: string;
  class: string;
  specs: {
    power: string;
    weight: string;
    maxSpeed: string;
  };
}

export interface Series {
  id: string;
  name: string;
  category: string;
  licenseClass: string;
  official: boolean;
  fixedSetup: boolean;
}

export interface Achievement {
  id: string;
  type: 'win' | 'podium' | 'clean_race' | 'fastest_lap' | 'pole_position' | 'perfect_race';
  description: string;
  date: string;
  raceId: string;
  seriesId: string;
  trackId: string;
}

export interface CareerStats {
  starts: number;
  wins: number;
  top5: number;
  poles: number;
  avgStart: number;
  avgFinish: number;
  lapsLed: number;
  leadLaps: number;
  incidents: number;
  winPercentage: number;
  topFivePercentage: number;
}
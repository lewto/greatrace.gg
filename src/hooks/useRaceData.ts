import { useState, useEffect } from 'react';
import type { 
  Driver, 
  RaceResult, 
  Achievement, 
  CareerStats 
} from '../types/racing';

interface UseRaceDataReturn {
  loading: boolean;
  error: Error | null;
  driver: Driver | null;
  recentRaces: RaceResult[];
  achievements: Achievement[];
  careerStats: CareerStats | null;
  refreshData: () => Promise<void>;
}

export function useRaceData(driverId: string): UseRaceDataReturn {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [driver, setDriver] = useState<Driver | null>(null);
  const [recentRaces, setRecentRaces] = useState<RaceResult[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [careerStats, setCareerStats] = useState<CareerStats | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Create a new instance of the iRacing service
      const iRacing = new IRacingService();

      // Fetch all data concurrently
      const [
        driverData,
        racesData,
        achievementsData,
        statsData
      ] = await Promise.all([
        iRacing.getDriverProfile(driverId),
        iRacing.getRecentRaces(driverId),
        iRacing.getDriverAchievements(driverId),
        iRacing.getCareerStats(driverId)
      ]);

      setDriver(driverData);
      setRecentRaces(racesData);
      setAchievements(achievementsData);
      setCareerStats(statsData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch race data'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [driverId]);

  return {
    loading,
    error,
    driver,
    recentRaces,
    achievements,
    careerStats,
    refreshData: fetchData
  };
}
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthService } from '../services/api/auth';
import type { Driver } from '../types/racing';

interface RacingContextType {
  isAuthenticated: boolean;
  driver: Driver | null;
  loading: boolean;
  error: string | null;
  login: () => void;
  logout: () => void;
  handleOAuthCallback: (code: string) => Promise<void>;
}

const RacingContext = createContext<RacingContextType | undefined>(undefined);

export function RacingProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [driver, setDriver] = useState<Driver | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const auth = AuthService.getInstance();

  // Check for existing authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (auth.isAuthenticated()) {
          const demoDriver = auth.getDemoDriver();
          if (demoDriver) {
            setDriver(demoDriver);
            setIsAuthenticated(true);
          }
        }
      } catch (err) {
        console.error('Failed to restore session:', err);
        auth.logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = () => {
    try {
      setLoading(true);
      setError(null);
      auth.initiateLogin();
      
      // In demo mode, set the demo driver
      const demoDriver = auth.getDemoDriver();
      if (demoDriver) {
        setDriver(demoDriver);
        setIsAuthenticated(true);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Authentication failed';
      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthCallback = async (code: string) => {
    try {
      setLoading(true);
      setError(null);
      await auth.handleCallback(code);
      setIsAuthenticated(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Authentication failed';
      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    auth.logout();
    setIsAuthenticated(false);
    setDriver(null);
    setError(null);
  };

  return (
    <RacingContext.Provider value={{
      isAuthenticated,
      driver,
      loading,
      error,
      login,
      logout,
      handleOAuthCallback
    }}>
      {children}
    </RacingContext.Provider>
  );
}

export function useRacing() {
  const context = useContext(RacingContext);
  if (context === undefined) {
    throw new Error('useRacing must be used within a RacingProvider');
  }
  return context;
}
import { CertificateTheme } from '../types';

export const certificateThemes: Record<string, CertificateTheme> = {
  'f1': {
    id: 'f1',
    name: 'Formula 1',
    backgroundGradient: 'from-[#15151E] to-[#0A0A0F]',
    accentColor: '#FF1801',
    positions: {
      '1st': {
        colors: {
          primary: '#FFD700',
          secondary: '#FFA500',
          glow: 'rgba(255, 215, 0, 0.5)',
          border: 'rgba(255, 215, 0, 0.3)'
        }
      },
      '2nd': {
        colors: {
          primary: '#E0E0E0',
          secondary: '#A0A0A0',
          glow: 'rgba(224, 224, 224, 0.5)',
          border: 'rgba(224, 224, 224, 0.3)'
        }
      },
      '3rd': {
        colors: {
          primary: '#CD7F32',
          secondary: '#8B4513',
          glow: 'rgba(205, 127, 50, 0.5)',
          border: 'rgba(205, 127, 50, 0.3)'
        }
      }
    },
    fonts: {
      title: 'font-orbitron',
      body: 'font-inter'
    }
  },
  'gt3': {
    id: 'gt3',
    name: 'GT3',
    backgroundGradient: 'from-[#1A1A1F] to-[#0F0F0F]',
    accentColor: '#00FF00',
    positions: {
      '1st': {
        colors: {
          primary: '#FFD700',
          secondary: '#B8860B',
          glow: 'rgba(255, 215, 0, 0.5)',
          border: 'rgba(255, 215, 0, 0.3)'
        }
      },
      // Add other positions...
    },
    fonts: {
      title: 'font-orbitron',
      body: 'font-inter'
    }
  }
  // Add more themes as needed
};

export const getThemeForSeries = (seriesName: string): string => {
  // Map series names to theme IDs
  const seriesThemeMap: Record<string, string> = {
    'FORMULA 1 WORLD CHAMPIONSHIP': 'f1',
    'GT3 CHALLENGE': 'gt3'
  };
  
  return seriesThemeMap[seriesName] || 'f1';
};
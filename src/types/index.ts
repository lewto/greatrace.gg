export interface IRacingResult {
  position: string;
  driverName: string;
  trackName: string;
  date: string;
  lapTime?: string;
  carName?: string;
  seriesName?: string;
  achievement?: string;
  split?: string;
  startPosition?: string;
  fastestLap?: boolean;
  incidentPoints?: number;
}

export interface CertificateTheme {
  id: string;
  name: string;
  backgroundGradient: string;
  accentColor: string;
  positions: {
    [key: string]: {
      colors: {
        primary: string;
        secondary: string;
        glow: string;
        border: string;
      };
    };
  };
  fonts: {
    title: string;
    body: string;
  };
}

export interface TrackLayout {
  id: string;
  name: string;
  svg: string;
  startLine?: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
}
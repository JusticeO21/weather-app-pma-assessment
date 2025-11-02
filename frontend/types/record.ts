import { ReactNode } from 'react';

export interface WeatherRecord {
    id: number;
    location: string;
    country: string;
    main: string;
    description: string;
    temp: string;
    humidity: string;
    pressure: string;
    wind: string;
    saved_on: string; // ISO date string from the server
}

/**
 * Metric card configuration for weather data display
 */
export interface MetricConfig {
  title: string;
  value: string | number | undefined;
  unit?: string;
  subtitle: string;
  icon: ReactNode;
  fullWidth?: boolean;
}

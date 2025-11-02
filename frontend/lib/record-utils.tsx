import { Thermometer, Droplet, Wind, Gauge, Cloud } from 'lucide-react';
import { WeatherRecord, MetricConfig } from '@/types/record';

/**
 * Generate metric configurations from weather record data
 */
export const getMetricConfigs = (record: WeatherRecord): MetricConfig[] => [
  {
    title: 'Temperature',
    value: record.temp,
    unit: '°C',
    subtitle: 'Temp',
    icon: <Thermometer size={20} className="text-yellow-500" />,
  },
  {
    title: 'Humidity',
    value: record.humidity,
    unit: '%',
    subtitle: 'Humidity',
    icon: <Droplet size={20} className="text-yellow-500" />,
  },
  {
    title: 'Wind Speed',
    value: record.wind,
    unit: 'm/s',
    subtitle: 'Wind',
    icon: <Wind size={20} className="text-yellow-500" />,
  },
  {
    title: 'Pressure',
    value: record.pressure,
    unit: 'hPa',
    subtitle: 'Pressure',
    icon: <Gauge size={20} className="text-yellow-500" />,
  },
  {
    title: 'Weather Conditions',
    value: record.description,
    subtitle: 'Conditions',
    icon: <Cloud size={20} className="text-yellow-500" />,
    fullWidth: true,
  },
];

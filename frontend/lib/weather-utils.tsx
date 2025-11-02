import { Tornado, Waves, CircleGauge, WindArrowDown, ArrowUp, ArrowDown } from 'lucide-react';
import { MetricConfig } from '@/types/record';
import { TodaysInsight } from '@/types/weather';
import { Text } from '@/components/ui/atoms';

/**
 * Generate metric configurations for today's weather highlights
 */
export const getTodaysHighlightConfigs = (todaysInsight: TodaysInsight): MetricConfig[] => [
  {
    title: 'Humidity',
    value: todaysInsight.humidity,
    unit: '%',
    subtitle: 'HMD',
    icon: <CircleGauge size={16} className="text-yellow-500" />,
  },
  {
    title: 'Wind Status',
    value: todaysInsight.windStatus,
    unit: 'km/h',
    subtitle: 'WSW',
    icon: <WindArrowDown size={16} className="text-yellow-500" />,
  },
  {
    title: 'Sunrise & Sunset',
    value: '',
    subtitle: '.',
    icon: (
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-red-500">
            <ArrowUp size={16} className="text-gray-900" />
          </div>
          <div>
            <Text variant="body" className="font-semibold text-gray-900">
              {todaysInsight.sunriseAndSunset.sunrise ?? 'N/A'}
            </Text>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center">
            <ArrowDown size={16} className="text-gray-900" />
          </div>
          <div>
            <Text variant="body" className="font-semibold text-gray-900">
              {todaysInsight.sunriseAndSunset.sunset ?? 'N/A'}
            </Text>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Visibility',
    value: todaysInsight.visibility,
    unit: 'km',
    subtitle: 'VIS',
    icon: <Waves size={16} className="text-yellow-500" />,
  },
  {
    title: 'Pressure',
    value: todaysInsight.pressure,
    unit: 'hPa',
    subtitle: 'Pa',
    icon: <Tornado size={16} className="text-yellow-500" />,
  },
];

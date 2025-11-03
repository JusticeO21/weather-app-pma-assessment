import { Card, Text, WeatherIcon } from '../atoms';
import { Skeleton } from '../atoms';
import { LocationMap } from './location-map';
import { ErrorBoundary } from '../../ErrorBoundary';

interface WeatherCardProps {
  icon: string;
  loading: boolean;
  temperature: string;
  location: string;
  country: string;
  weather: string;
  description: string;
}

/**
 * WeatherCard Component
 *
 * Displays the main current weather information including temperature,
 * condition, and location image.
 *
 * @param temperature - Current temperature
 * @param condition - Weather condition description
 * @param rainChance - Chance of rain percentage
 * @param date - Current date
 * @param time - Current time
 * @param weatherIcon - Type of weather icon to display
 * @param locationImage - Optional location background image URL
 * @param locationName - Name of the location
 */
export const WeatherCard = ({
  icon,
  loading,
  temperature,
  location,
  country,
  weather,
  description,
}: WeatherCardProps) => {
  if (loading) {
    return (
      <Card className="flex-1 flex flex-col h-full gap-5 border shadow-none py-0 p-6">
        <Skeleton className="w-40 h-40 rounded-full mx-auto" />
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-12 w-32" />
        </div>
        <div className="h-px w-full bg-gray-200" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex-1 flex flex-col h-full gap-5  justify-between !shadow-none py-0 !bg-transparent">
      <WeatherIcon icon={weather} priority={true} className="w-40 h-40" />

      <div className="flex flex-col items-baseline gap-4">
        <Text variant="h1" className="text-gray-900">
          {temperature}
        </Text>
      </div>

      <div className="flex items-center gap-2">
        <Text variant="body" className="text-gray-700">
          <span className="font-semibold">{location}</span>, {country}
        </Text>
      </div>

      <div className="h-1 w-full border-b border-gray-200"></div>

      <div>
        <div className="flex items-center gap-2">
          <WeatherIcon as="icon" icon={icon} className="w-7 h-7" />
          <Text variant="body" className="text-gray-500">
            {weather}
          </Text>
        </div>

        <div className="flex items-center gap-2">
          <WeatherIcon icon={weather} className="w-7 h-7" />
          <Text variant="body" className="text-gray-500">
            {description}
          </Text>
        </div>
      </div>
      <ErrorBoundary>
        <LocationMap location={location} country={country} />
      </ErrorBoundary>
    </Card>
  );
};

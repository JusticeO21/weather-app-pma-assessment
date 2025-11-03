'use client';

import { SearchBar, WeatherCard } from '../molecules';
import { useWeatherStore } from '@/stores';

interface SidebarProps {
  onSearch: (query: string) => void;
}

/**
 * Sidebar Component
 *
 * Left sidebar containing search bar and main weather card display.
 *
 * @param weatherData - Current weather data to display
 * @param onSearch - Callback function when search is submitted
 */

export const Sidebar = ({ onSearch }: SidebarProps) => {
  const { main, location, country, loading } = useWeatherStore();

  return (
    <aside className="w-full lg:w-[400px] flex-shrink-0 sticky top-0 bottom-0 h-screen p-6 shadow-lg bg-gray-100">
      <div className="flex flex-col gap-5 h-full">
        <SearchBar onSearch={onSearch} />
        <WeatherCard
          temperature={main.temp}
          country={country}
          icon={main.icon}
          weather={main.main}
          description={main.description}
          location={location}
          loading={loading}
        />
      </div>
    </aside>
  );
};

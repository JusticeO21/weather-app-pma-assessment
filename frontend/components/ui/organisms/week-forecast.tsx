'use client';

import { useState } from 'react';
import { DayCard } from '../molecules';
import { Text } from '../atoms';
import {useForecastStore} from '@/stores';
import { Skeleton, Card } from '../atoms';

/**
 * WeekForecast Component
 *
 * Displays a week's weather forecast with tab navigation between Today and Week views.
 *
 * @param weekData - Array of daily weather data for the week
 */
export const WeekForecast = () => {
   const { forecast, loading } = useForecastStore();
  const [activeTab, setActiveTab] = useState<'today' | 'week'>('week');

  if (loading) {
    return (
      <section className="mt-8">
        <div className="flex gap-8 mb-8">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-16" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {[...Array(7)].map((_, i) => (
            <Card key={i} className="p-4">
              <Skeleton className="h-5 w-12 mx-auto mb-4" />
              <Skeleton className="w-12 h-12 rounded-full mx-auto mb-4" />
              <div className="flex justify-center gap-2">
                <Skeleton className="h-5 w-8" />
                <Skeleton className="h-5 w-8" />
              </div>
              <Skeleton className="h-4 w-16 mx-auto mt-2" />
            </Card>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center gap-8 mb-8">
        <button
          onClick={() => setActiveTab('today')}
          className="relative pb-2 transition-colors"
        >
          <Text
            variant="body"
            className={`font-medium ${
              activeTab === 'today' ? 'text-gray-900' : 'text-gray-400'
            }`}
          >
            Today
          </Text>
          {activeTab === 'today' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab('week')}
          className="relative pb-2 transition-colors"
        >
          <Text
            variant="body"
            className={`font-semibold ${
              activeTab === 'week' ? 'text-gray-900' : 'text-gray-400'
            }`}
          >
            Week
          </Text>
          {activeTab === 'week' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-7">
        {forecast.map((day, index) => (
          <DayCard
            key={index}
            day={day.day}
            temp_min={day.temp_min}
            temp_max={day.temp_max}
            description={day.main}
            icon={day.icon}
          />
        ))}
      </div>
    </section>
  );
};

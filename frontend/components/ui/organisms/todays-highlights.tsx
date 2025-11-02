"use client"
import { Text, Button, Skeleton, Card } from '../atoms';
import { MetricCard } from '../molecules';
import { Save } from 'lucide-react';
import { useWeatherStore } from '@/stores';
import { useSaveWeatherRecord } from '@/hooks/useSaveWeatherRecord';
import { getTodaysHighlightConfigs } from '@/lib/weather-utils';

/**
 * TodaysHighlights Component
 *
 * Displays detailed weather metrics including UV index, wind, humidity,
 * visibility, air quality, and sunrise/sunset times.
 */
export const TodaysHighlights = () => {
  const { todaysInsight, loading, location, country, main } = useWeatherStore();
  const { saveRecord, isSaving } = useSaveWeatherRecord();

  const handleSave = async () => {
    if (!location || !country || !main || !todaysInsight) return;

    await saveRecord({
      location,
      country,
      main: main.main,
      description: main.description,
      temp: main.temp,
      humidity: todaysInsight.humidity,
      pressure: todaysInsight.pressure,
      wind: todaysInsight.windStatus,
    });
  };

  if (loading) {
    return (
      <section className="mt-12">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="p-6">
              <Skeleton className="h-5 w-24 mb-4" />
              <Skeleton className="h-10 w-20 mb-2" />
              <Skeleton className="h-4 w-32" />
            </Card>
          ))}
        </div>
      </section>
    );
  }

  // Generate metric configurations
  const metrics = todaysInsight ? getTodaysHighlightConfigs(todaysInsight) : [];

  return (
    <section className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <Text variant="h3" className="text-gray-900 font-bold">
          Today's Highlights
        </Text>

        <Button
          onClick={handleSave}
          disabled={isSaving || loading}
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 transition-colors cursor-pointer rounded-md"
        >
          {isSaving ? (
            'Saving...'
          ) : (
            <>
              <Save size={16} />
              <span>Save Record</span>
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value ?? ''}
            unit={metric.unit}
            subtitle={metric.subtitle}
            icon={metric.icon}
          />
        ))}
      </div>
    </section>
  );
};

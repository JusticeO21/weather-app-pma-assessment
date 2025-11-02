"use client";

import { RecordCard } from '../molecules/record-card';
import { Skeleton, Text } from '../atoms';
import { WeatherRecord } from '@/types/record';

interface RecordsListProps {
  /** Array of weather records to display */
  records: WeatherRecord[];
  /** Whether the component is in a loading state */
  loading?: boolean;
}

/**
 * Displays a grid of weather record cards
 * Shows loading skeletons when loading is true
 * Shows a message when no records are found
 */
export const RecordsList = ({ records, loading = false }: RecordsListProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 w-full">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-40">
            <Skeleton className="h-full w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="text-center py-12">
        <Text variant="h4" className="text-gray-500">
          No weather records found
        </Text>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 w-full">
      {records.map((record) => (
        <RecordCard key={record.id} {...record} />
      ))}
    </div>
  );
};

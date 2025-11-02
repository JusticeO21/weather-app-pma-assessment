"use client";

import { Card, Text } from '../atoms';
import Link from 'next/link';
import { format } from 'date-fns';
import { WeatherRecord } from '@/types/record';



/**
 * Displays a preview of a weather record in a card format
 * Clicking the card navigates to the record's detail page
 */
export const RecordCard = ({ 
  id, 
  location, 
  country, 
  main, 
  description, 
  temp,
  saved_on 
}: WeatherRecord) => {
  const formattedDate = format(new Date(saved_on), 'PPpp');
  
  return (
    <Link href={`/records/${id}`} className="block h-full" aria-label={`View details for ${location}, ${country}`}>
      <Card className="h-full p-4 hover:shadow-md transition-shadow bg-gray-50 rounded-md">
        <div className="flex justify-between items-start">
          <div>
            <Text variant="h4" className="text-gray-900 text-lg">
              {location}, {country}
            </Text>
            <Text variant="body" className="text-gray-700">
              {formattedDate}
            </Text>
          </div>
          <Text variant="h4" className="text-gray-600">
            {temp}
          </Text>
        </div>
        
        <div className="mt-4">
          <Text variant="body" className="capitalize text-gray-500">
            {main} - {description}
          </Text>
        </div>
      </Card>
    </Link>
  );
};

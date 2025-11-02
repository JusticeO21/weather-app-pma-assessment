'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Text, Skeleton } from '../atoms';
import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface LocationMapProps {
  location: string;
  country: string;
}

interface Coordinates {
  lat: number;
  lon: number;
}

/**
 * LocationMap Component
 * 
 * Displays an interactive OpenStreetMap using Leaflet for the given location.
 * Uses Nominatim for geocoding with caching to respect rate limits.
 */
export const LocationMap = ({ location, country }: LocationMapProps) => {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCoordinates() {
      if (!location) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(false);

      try {
        const searchQuery = `${location}, ${country}`;
        const cacheKey = `geocode_${searchQuery}`;
        
        // Check sessionStorage cache first to avoid rate limits
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          const cachedCoords = JSON.parse(cached);
          setCoords(cachedCoords);
          setLoading(false);
          return;
        }

        // Geocode the location to get coordinates
        const geocodeResponse = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}&limit=1`,
          {
            headers: {
              'User-Agent': 'WeatherApp/1.0',
            },
          }
        );

        if (!geocodeResponse.ok) {
          throw new Error('Geocoding failed');
        }

        const geocodeData = await geocodeResponse.json();

        if (!geocodeData || geocodeData.length === 0) {
          throw new Error('Location not found');
        }

        const { lat, lon } = geocodeData[0];
        const coordinates = { lat: parseFloat(lat), lon: parseFloat(lon) };
        
        sessionStorage.setItem(cacheKey, JSON.stringify(coordinates));
        
        setCoords(coordinates);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching coordinates:', err);
        setError(true);
        setLoading(false);
      }
    }

    fetchCoordinates();
  }, [location, country]);

  if (loading) {
    return (
      <div className="mt-6 rounded-2xl overflow-hidden h-48 relative bg-gray-200">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  if (error || !coords) {
    return (
      <div className="mt-6 rounded-2xl overflow-hidden h-48 relative bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <MapPin size={24} className="text-gray-400 mx-auto mb-2" />
          <Text variant="caption" className="text-gray-500">
            Map unavailable
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-xl  border overflow-hidden h-35 relative">
      <MapContainer
        center={[coords.lat, coords.lon]}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
      
      {/* Overlay with location label */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg z-[1000] pointer-events-none">
        <MapPin size={16} className="text-blue-600" />
        <Text variant="body" className="text-gray-800 font-semibold">
          {location}
        </Text>
      </div>
    </div>
  );
};

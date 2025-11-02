"use client"
import { Sidebar } from '@/components/ui/organisms/sidebar';
import { detectUserLocation } from '@/lib/location-detection';
import { useWeatherStore, useForecastStore } from '@/stores';
import { useEffect } from 'react';
import { Header } from '@/components/ui/organisms/header';
import { dismissToast } from '@/lib/toast';
import Link from 'next/link';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { fetchWeather } = useWeatherStore();
  const { fetchForecast } = useForecastStore();

  useEffect(() => {
    async function fetchInitialData() {
      let loadingToastId: string | number | undefined;
      
      try {
        // Detect user location with GPS -> IP -> Default fallback
        const location = await detectUserLocation('London');
        
        if (loadingToastId) dismissToast(loadingToastId);
        
        await Promise.all([
          fetchWeather(location),
          fetchForecast(location)
        ]);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        if (loadingToastId) dismissToast(loadingToastId);
      }
    }

    fetchInitialData();
  }, [fetchWeather, fetchForecast]);

  const handleSearch = async (query: string) => {
    try {
      await Promise.all([
        fetchWeather(query),
        fetchForecast(query)
      ]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-0">
      <div className="max-w-[1600px] flex flex-col lg:flex-row gap-10">
        <Sidebar onSearch={handleSearch} />
        <main className="flex-1 p-5 flex gap-3 flex-col z-20 bg-gray-100">
           <Header />
          {children}
          <footer className='w-full text-gray-800 mt-5 text-xs'>
            <div className='flex gap-3 '>
            <span>Built by: </span> <Link href="https://www.linkedin.com/in/justice-owusu-43a0a1299/" target="_blank" className='text-blue-500'>Justice Owusu</Link>
            <Link href="https://www.linkedin.com/school/pmaccelerator/" target="_blank" className='text-blue-500'>info: PMAccelerator</Link>
            </div>
            <span>© 2025 Weather App. All rights reserved.</span>
          </footer>
        </main>
      </div>
    </div>
  );
}

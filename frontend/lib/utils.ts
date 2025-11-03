import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getIpLocation(): Promise<string> {
  const response = await fetch('https://ipapi.co/json/');
  const data = await response.json();
  return `${data.latitude}, ${data.longitude}`;
}

export async function getGPSLocation(): Promise<string> {
  return new Promise((resolve) => {
    try {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            resolve(`${latitude}, ${longitude}`);
          },
          async (err) => {
            console.warn('Geolocation failed:', err);
            const ipLoc = await getIpLocation();
            resolve(ipLoc);
          },
        );
      } else {
        console.warn('Geolocation not supported by this browser.');
        getIpLocation().then(resolve);
      }
    } catch (error) {
      console.error('Error fetching GPS location:', error);
      getIpLocation().then(resolve);
    }
  });
}

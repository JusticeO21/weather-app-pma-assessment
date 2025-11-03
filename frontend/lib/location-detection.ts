import { showToast } from './toast';

interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
}

interface IPLocationResponse {
  city?: string;
  country?: string;
  loc?: string; // "latitude,longitude"
}

/**
 * Get user's location using browser GPS
 * @returns Promise with location string (city name or coordinates)
 * @throws Error if GPS is denied or unavailable
 */
async function getGPSLocation(): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const cityName = await reverseGeocode(latitude, longitude);
          resolve(cityName);
        } catch (error) {
          resolve(`${latitude},${longitude}`);
        }
      },
      (error) => {
        let errorMessage = 'Unable to get GPS location';

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'GPS access denied';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'GPS position unavailable';
            break;
          case error.TIMEOUT:
            errorMessage = 'GPS request timed out';
            break;
        }

        reject(new Error(errorMessage));
      },
      {
        timeout: 10000,
        enableHighAccuracy: false,
      },
    );
  });
}

/**
 * Reverse geocode coordinates to city name using OpenStreetMap Nominatim
 * @param latitude - Latitude coordinate
 * @param longitude - Longitude coordinate
 * @returns City name
 */
async function reverseGeocode(
  latitude: number,
  longitude: number,
): Promise<string> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`,
      {
        headers: {
          'User-Agent': 'WeatherApp/1.0',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Reverse geocoding failed');
    }

    const data = await response.json();

    // Try to get city name from various fields
    const city =
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.county ||
      data.name;

    if (city) {
      return city;
    }

    throw new Error('Could not determine city name');
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    throw error;
  }
}

/**
 * Get user's location using IP address
 * Uses ipapi.co free API (no key required)
 * @returns Promise with location string (city name)
 * @throws Error if IP location fails
 */
async function getIPLocation(): Promise<string> {
  try {
    const response = await fetch('https://ipapi.co/json/');

    if (!response.ok) {
      throw new Error('IP location service unavailable');
    }

    const data: IPLocationResponse = await response.json();

    if (data.city) {
      return data.city;
    }

    throw new Error('Could not determine location from IP');
  } catch (error) {
    console.error('IP location error:', error);
    throw error;
  }
}

/**
 * Get user's location with fallback strategy:
 * 1. Try GPS first
 * 2. Fallback to IP geolocation if GPS fails
 * 3. Fallback to default location if all fails
 * @param defaultLocation - Default location to use if all methods fail (default: "London")
 * @returns Promise with location string
 */
export async function detectUserLocation(
  defaultLocation: string = 'London',
): Promise<string> {
  try {
    const gpsLocation = await getGPSLocation();
    return gpsLocation;
  } catch (gpsError) {
    console.warn('GPS location failed:', gpsError);

    const errorMessage =
      gpsError instanceof Error ? gpsError.message : 'GPS failed';
    if (errorMessage.includes('denied')) {
      showToast('info', 'GPS access denied.');
    } else {
      showToast('info', 'GPS unavailable.');
    }

    try {
      const ipLocation = await getIPLocation();
      return ipLocation;
    } catch (ipError) {
      console.warn('IP location failed:', ipError);

      showToast(
        'warning',
        `Could not detect location. Using ${defaultLocation} as default.`,
      );
      return defaultLocation;
    }
  }
}

/**
 * Check if browser supports geolocation
 * @returns true if geolocation is supported
 */
export function isGeolocationSupported(): boolean {
  return 'geolocation' in navigator;
}

export async function checkGPSPermission(): Promise<
  'granted' | 'denied' | 'prompt'
> {
  if (!navigator.permissions) {
    return 'prompt';
  }

  try {
    const result = await navigator.permissions.query({
      name: 'geolocation' as PermissionName,
    });
    return result.state;
  } catch (error) {
    return 'prompt';
  }
}

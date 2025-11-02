import { ForecastState } from '@/types/store';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchForecastData(location: string): Promise<Omit<ForecastState, 'loading' | 'error'>> {
    try {
        const response = await fetch(`${API_URL}/forecast`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ location }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch forecast data');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching forecast data:', error);
        throw error;
    }
}

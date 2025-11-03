const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://weather-app-pma-assessment-production.up.railway.app";

export async function fetchWeatherData(location: string) {
    try {
        const response = await fetch(`${API_URL}/weather`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ location }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

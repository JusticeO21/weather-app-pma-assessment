import { StateCreator } from 'zustand';
import { WeatherState, WeatherActions } from '../../types/store';
import { fetchWeatherData } from "@/lib/api/weather";
import { showToast } from '@/lib/toast';

export type WeatherSlice = WeatherState & WeatherActions;

export const createWeatherSlice: StateCreator<
    WeatherSlice,
    [['zustand/immer', never]],
    [],
    WeatherSlice
> = (set) => ({
    location: '',
    country: '',
    main: {
        main: '',
        description: '',
        temp: '29.2 °C',
        icon: '',
    },
    todaysInsight: {
        humidity: '',
        pressure: '',
        windStatus: '',
        visibility: '',
        airQuality: '',
        sunriseAndSunset: {
            sunrise: null,
            sunset: null,
        },
    },
    loading: true,
    error: null,

    setWeather: (weatherData) =>
        set((state) => ({
            ...state,
            ...weatherData,
        })),

    setLoading: (loading) =>
        set((state) => ({
            ...state,
            loading,
        })),
    
    setError: (error) =>
        set((state) => ({
            ...state,
            error,
        })),

    fetchWeather: async (location: string) => {
        try {
            set({ loading: true, error: null });
            const weather = await fetchWeatherData(location);
            set({
                ...weather,
                loading: false,
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch weather';
            showToast('error', errorMessage);
            set({
                error: errorMessage,
                loading: false,
            });
        }
    },
});

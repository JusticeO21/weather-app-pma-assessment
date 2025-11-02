import { StateCreator } from 'zustand';
import { ForecastState, ForecastActions } from '@/types/store';
import { fetchForecastData } from '@/lib/api/forecast';

export type ForecastSlice = ForecastState & ForecastActions;

export const createForecastSlice: StateCreator<
    ForecastSlice,
    [['zustand/immer', never]],
    [],
    ForecastSlice
> = (set) => ({
    location: '',
    country: '',
    forecast: [],
    loading: true,
    error: null,

    setForecast: (forecastData) =>
        set((state) => ({
            ...state,
            ...forecastData,
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

    fetchForecast: async (location: string) => {
        try {
            set({ loading: true, error: null });
            const forecast = await fetchForecastData(location);
            set({
                location: forecast.location,
                country: forecast.country,
                forecast: forecast.forecast,
                loading: false,
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Failed to fetch forecast',
                loading: false,
            });
        }
    },
});

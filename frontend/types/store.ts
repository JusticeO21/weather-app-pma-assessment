import { MainWeatherInfo, TodaysInsight } from './weather';
import { WeatherRecord } from './record';

export interface RecordState {
  records: WeatherRecord[];
  currentRecord: WeatherRecord | null;
  loading: {
    fetchAll: boolean;
    fetchOne: boolean;
    delete: boolean;
  };
  error: string | null;
}

export interface RecordActions {
  setRecords: (records: WeatherRecord[]) => void;
  setCurrentRecord: (record: WeatherRecord | null) => void;
  setLoading: (loading: Partial<RecordState['loading']>) => void;
  setError: (error: string | null) => void;
  fetchRecords: () => Promise<void>;
  filterRecordsByLocation: (location: string) => Promise<void>;
  getRecord: (id: number) => Promise<WeatherRecord | undefined>;
  addRecord: (record: WeatherRecord) => void;
  removeRecord: (id: number) => void;
  clearCurrentRecord: () => void;
}

export interface WeatherState {
  location: string;
  country: string;
  main: MainWeatherInfo;
  todaysInsight: TodaysInsight;
  loading: boolean;
  error: string | null;
}

export interface WeatherActions {
  setWeather: (weather: Omit<WeatherState, 'loading' | 'error'>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchWeather: (location: string) => Promise<void>;
}

// Add these interfaces to your existing store.ts
export interface DailyForecast {
  date: string;
  day: string;
  temp_min: number;
  temp_max: number;
  description: string;
  main: string;
  icon: string;
}

export interface ForecastState {
  location: string;
  country: string;
  forecast: DailyForecast[];
  loading: boolean;
  error: string | null;
}

export interface ForecastActions {
  setForecast: (forecast: Omit<ForecastState, 'loading' | 'error'>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  fetchForecast: (location: string) => Promise<void>;
}

// Update your WeatherState to include forecast
// export interface WeatherState {
//     // ... your existing WeatherState properties
//     forecast: ForecastState;
//     records: RecordState;
// }

// // Update your WeatherActions to include forecast actions
// export interface WeatherActions {
//     // ... your existing WeatherActions
//     setForecast: (forecast: ForecastState) => void;
// }

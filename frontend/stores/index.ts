import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createWeatherSlice, WeatherSlice } from './slices/weather-slice';
import { createForecastSlice, ForecastSlice } from './slices/forecast-slice';
import { createRecordSlice, RecordSlice } from './slices/record-slice';
import { createDialogSlice, DialogSlice } from './slices/dialog-slice';

// Create separate stores for each slice
export const useWeatherStore = create<WeatherSlice>()(
  devtools(
    immer((...args) => ({
      ...createWeatherSlice(...args),
    }))
  )
);

export const useForecastStore = create<ForecastSlice>()(
  devtools(
    immer((...args) => ({
      ...createForecastSlice(...args),
    }))
  )
);

export const useRecordStore = create<RecordSlice>()(
  devtools(
    immer((...args) => ({
      ...createRecordSlice(...args),
    }))
  )
);

export const useDialogStore = create<DialogSlice>()(
  devtools(
    immer((...args) => ({
      ...createDialogSlice(...args),
    }))
  )
);

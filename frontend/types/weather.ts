export interface SunriseAndSunset {
  sunrise: string | null;
  sunset: string | null;
}

export interface TodaysInsight {
  humidity: string;
  pressure: string;
  windStatus: string;
  visibility: string;
  airQuality: string;
  sunriseAndSunset: SunriseAndSunset;
}

export interface MainWeatherInfo {
  main: string;
  description: string;
  temp: string;
  icon: string;
}

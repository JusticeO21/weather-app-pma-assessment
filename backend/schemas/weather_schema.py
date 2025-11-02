from pydantic import BaseModel, Field
from typing import Optional

class WeatherRequest(BaseModel):
    location: str
    date_range: Optional[str] = None

class SunriseAndSunset(BaseModel):
    sunrise: Optional[str] = Field(None, example="06:00 AM")
    sunset: Optional[str] = Field(None, example="06:14 PM")

class TodaysInsight(BaseModel):
    humidity: Optional[str] = Field(None, example="81 %")
    pressure: Optional[str] = Field(None, example="1014 hPa")
    windStatus: Optional[str] = Field(None, example="6.4 km/h")
    visibility: Optional[str] = Field(None, example="10.0 km")
    airQuality: Optional[str] = Field(None, example="Not available")
    sunriseAndSunset: SunriseAndSunset

class MainWeatherInfo(BaseModel):
    main: Optional[str] = Field(None, example="Clouds")
    description: Optional[str] = Field(None, example="Overcast Clouds")
    temp: Optional[str] = Field(None, example="25.6 °C")
    icon: Optional[str] = Field(None, example="04d")

class WeatherResponse(BaseModel):
    location: Optional[str] = Field(None, example="Kumasi")
    country: Optional[str] = Field(None, example="GH")
    main: MainWeatherInfo
    todaysInsight: TodaysInsight

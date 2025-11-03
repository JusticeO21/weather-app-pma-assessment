from pydantic import BaseModel


class DailyForecast(BaseModel):
    date: str
    temp_min: float
    temp_max: float
    description: str
    icon: str


class WeeklyForecastResponse(BaseModel):
    location: str
    country: str
    forecast: list[DailyForecast]

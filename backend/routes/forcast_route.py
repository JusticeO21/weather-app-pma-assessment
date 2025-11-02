import os
from dotenv import load_dotenv
from fastapi import APIRouter
from schemas.weather_schema import WeatherRequest
from controllers.forcast_controller import get_forecast_controller

load_dotenv()
API_KEY = os.getenv("OPENWEATHER_API_KEY")

router = APIRouter(prefix="/forecast", tags=["weather"])

@router.post("/")
async def weather(req: WeatherRequest):
    loc = req.location.strip()
    return await get_forecast_controller(loc)


import os
from dotenv import load_dotenv
from fastapi import APIRouter
from schemas.weather_schema import WeatherRequest
from controllers.weather_controller import get_weather

load_dotenv()
API_KEY = os.getenv("OPENWEATHER_API_KEY")

router = APIRouter(prefix="/weather", tags=["weather"])

@router.post("/")
async def weather(req: WeatherRequest):
    loc = req.location.strip()
    return await get_weather(loc)


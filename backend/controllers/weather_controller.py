from fastapi import HTTPException
from dotenv import load_dotenv
from utils.formatters import format_weather_data
import requests
import os

load_dotenv()
API_KEY = os.getenv("OPENWEATHER_API_KEY")


async def get_weather(location: str):
    if not API_KEY:
        raise HTTPException(
            status_code=500, detail="OPENWEATHER_API_KEY not set in environment."
        )
    if "," in location:
        parts = [p.strip() for p in location.split(",")]
        try:
            lat = float(parts[0])
            lon = float(parts[1])
            url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
        except ValueError:
            url = f"https://api.openweathermap.org/data/2.5/weather?q={location}&appid={API_KEY}&units=metric"
    else:
        url = f"https://api.openweathermap.org/data/2.5/weather?q={location}&appid={API_KEY}&units=metric"

    res = requests.get(url, timeout=10)
    if res.status_code != 200:
        raise HTTPException(
            status_code=400,
            detail=f"Could not fetch weather for '{location}'. ({res.status_code})",
        )
    payload = res.json()
    return format_weather_data(payload)

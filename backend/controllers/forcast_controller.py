import requests
from fastapi import HTTPException
from utils.formatters import format_forecast_data
from dotenv import load_dotenv
import os

load_dotenv()
API_KEY = os.getenv("OPENWEATHER_API_KEY")


async def get_forecast_controller(loc: str):

    if "," in loc:
        lat, lon = [x.strip() for x in loc.split(",")]
        url = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
    else:
        url = f"https://api.openweathermap.org/data/2.5/forecast?q={loc}&appid={API_KEY}&units=metric"

    res = requests.get(url)
    if res.status_code != 200:
        raise HTTPException(status_code=400, detail="Forecast data not found")

    data = res.json()
    return format_forecast_data(data)

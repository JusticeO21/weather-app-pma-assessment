from schemas.weather_schema import WeatherResponse
from datetime import datetime
def to_time(ts):
        try:
            return datetime.utcfromtimestamp(ts).strftime("%I:%M %p")
        except:
            return None

def mps_to_kmh(ms):
        return round(ms * 3.6, 1)
def format_weather_data(data)->WeatherResponse:
    formatted = {
        "location": data.get("name"),
        "country": data.get("sys", {}).get("country"),
        "main": {
            "main": data["weather"][0]["main"],
            "description": data["weather"][0]["description"].title(),
            "temp": f"{round(data['main']['temp'], 1)} °C",
            "icon": data["weather"][0]["icon"]
        },
        "todaysInsight": {
            "humidity": f"{data['main']['humidity']}",
            "pressure": f"{data['main']['pressure']}",
            "windStatus": f"{mps_to_kmh(data['wind']['speed'])}",
            "visibility": f"{round(data['visibility']/1000, 1)}",
            "airQuality": "Not available",
            "sunriseAndSunset": {
                "sunrise": to_time(data["sys"]["sunrise"]),
                "sunset": to_time(data["sys"]["sunset"])
            }
        }
    }
    return formatted

from datetime import datetime, timedelta
from collections import defaultdict

from datetime import datetime, timedelta
from collections import defaultdict

def format_forecast_data(data: dict) -> dict:
    """
    Format OpenWeather 5-day/3-hour forecast into 7 daily summaries
    with weekday abbreviations (MON, TUE, etc.), main, and description fields.
    """
    grouped = defaultdict(lambda: {
        "temps": [],
        "mains": [],
        "descriptions": [],
        "icons": []
    })

    for entry in data["list"]:
        date = datetime.utcfromtimestamp(entry["dt"]).strftime("%Y-%m-%d")
        grouped[date]["temps"].append(entry["main"]["temp"])
        grouped[date]["mains"].append(entry["weather"][0]["main"])
        grouped[date]["descriptions"].append(entry["weather"][0]["description"])
        grouped[date]["icons"].append(entry["weather"][0]["icon"])

    forecast = []
    sorted_dates = sorted(grouped.keys())

    for date in sorted_dates:
        dt_obj = datetime.strptime(date, "%Y-%m-%d")
        weekday_abbr = dt_obj.strftime("%a")[:3]
        values = grouped[date]

        forecast.append({
            "date": date,
            "day": weekday_abbr,
            "main": max(set(values["mains"]), key=values["mains"].count),
            "description": max(set(values["descriptions"]), key=values["descriptions"].count).title(),
            "icon": max(set(values["icons"]), key=values["icons"].count),
            "temp_min": round(min(values["temps"]), 1),
            "temp_max": round(max(values["temps"]), 1)
        })

    # Extend to 7 days if necessary
    if len(forecast) < 7:
        last_date = datetime.strptime(forecast[-1]["date"], "%Y-%m-%d")
        for i in range(7 - len(forecast)):
            next_date = last_date + timedelta(days=i+1)
            next_day = next_date.strftime("%a").upper()[:3]
            forecast.append({
                "date": next_date.strftime("%Y-%m-%d"),
                "day": next_day,
                "main": forecast[-1]["main"],
                "description": forecast[-1]["description"],
                "icon": forecast[-1]["icon"],
                "temp_min": forecast[-1]["temp_min"],
                "temp_max": forecast[-1]["temp_max"]
            })

    forecast = forecast[:7]  # Ensure only 7 days total

    return {
        "location": data["city"]["name"],
        "country": data["city"]["country"],
        "forecast": forecast
    }

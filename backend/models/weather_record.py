from sqlalchemy import Column, Integer, String, DateTime, JSON
from datetime import datetime
from config.database import Base


class WeatherRecord(Base):
    __tablename__ = "weather_records"

    id = Column(Integer, primary_key=True, index=True)
    location = Column(String, index=True)
    country = Column(String)
    main = Column(String)
    description = Column(String)
    temp = Column(String)
    humidity = Column(String)
    pressure = Column(String)
    wind = Column(String)
    saved_on = Column(DateTime, default=datetime.utcnow)

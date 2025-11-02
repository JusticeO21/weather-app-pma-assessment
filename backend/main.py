from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import importlib
import pkgutil
import routes as routes_pkg
from config.database import Base, engine
from models.weather_record import WeatherRecord

Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Fake News Detector API",
    description="API for detecting fake or real news using 2 ML models",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

for _, module_name, _ in pkgutil.iter_modules(routes_pkg.__path__):
    module = importlib.import_module(f"routes.{module_name}")
    if hasattr(module, "router"):
        app.include_router(module.router)
        print(f"✅ Loaded routes from: {module_name}")

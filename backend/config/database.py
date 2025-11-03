from sqlalchemy import create_engine
from dotenv import load_dotenv
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# SQLite URL
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./backend/local.db")

# Only pass SQLite-specific args if using SQLite
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL)  # PostgreSQL does NOT need connect_args

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

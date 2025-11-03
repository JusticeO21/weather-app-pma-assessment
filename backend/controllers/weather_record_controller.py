from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from models.weather_record import WeatherRecord
from datetime import datetime
from pydantic import BaseModel
import csv
import io
from fastapi.responses import StreamingResponse


class WeatherData(BaseModel):
    location: str
    country: str
    main: str
    description: str
    temp: str
    humidity: str
    pressure: str
    wind: str


def create_weather_record(db: Session, data: WeatherData):
    """
    Create a new weather record entry in the database.
    """
    print(data)
    try:
        record = WeatherRecord(
            location=data.get("location"),
            country=data.get("country"),
            main=data.get("main"),
            description=data.get("description"),
            temp=data.get("temp"),
            humidity=data.get("humidity"),
            pressure=data.get("pressure"),
            wind=data.get("wind"),
            saved_on=datetime.utcnow(),
        )

        db.add(record)
        db.commit()
        db.refresh(record)
        return record

    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(f"Database error while creating weather record: {str(e)}")
    except KeyError as e:
        raise Exception(f"Missing required field in input data: {str(e)}")
    except Exception as e:
        db.rollback()
        raise Exception(f"Unexpected error creating record: {str(e)}")


def get_all_weather_records(db: Session):
    """
    Retrieve all weather records from the database.
    """
    try:
        return db.query(WeatherRecord).order_by(WeatherRecord.saved_on.desc()).all()
    except SQLAlchemyError as e:
        raise Exception(f"Database error while fetching records: {str(e)}")


def get_weather_record_by_id(db: Session, record_id: int):
    """
    Retrieve a single weather record by its unique ID.
    """
    try:
        record = db.query(WeatherRecord).filter(WeatherRecord.id == record_id).first()
        return record
    except SQLAlchemyError as e:
        raise Exception(
            f"Database error while fetching record by ID {record_id}: {str(e)}"
        )
    except Exception as e:
        raise Exception(
            f"Unexpected error retrieving record by ID {record_id}: {str(e)}"
        )


def get_weather_record_by_location(db: Session, location: str):
    """
    Retrieve weather records for a specific location.
    """
    try:
        return (
            db.query(WeatherRecord)
            .filter(WeatherRecord.location.ilike(f"%{location}%"))
            .order_by(WeatherRecord.saved_on.desc())
            .all()
        )
    except SQLAlchemyError as e:
        raise Exception(f"Database error while fetching records by location: {str(e)}")


def export_weather_records_controller(db: Session, record_id: int | None = None):
    """
    Export weather records (all or single) as a CSV stream.
    """
    query = db.query(WeatherRecord)
    if record_id:
        query = query.filter(WeatherRecord.id == record_id)

    records = query.order_by(WeatherRecord.saved_on.desc()).all()
    if not records:
        return None

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(
        [
            "ID",
            "Location",
            "Country",
            "Main",
            "Description",
            "Temp (°C)",
            "Humidity",
            "Pressure",
            "Wind",
            "Saved On",
        ]
    )

    for record in records:
        writer.writerow(
            [
                record.id,
                record.location,
                record.country,
                record.main,
                record.description,
                record.temp,
                record.humidity,
                record.pressure,
                record.wind,
                (
                    record.saved_on.strftime("%Y-%m-%d %H:%M:%S")
                    if record.saved_on
                    else ""
                ),
            ]
        )

    output.seek(0)

    # dynamic filename
    filename = f"weather_record_{record_id}.csv" if record_id else "weather_records.csv"

    return StreamingResponse(
        output,
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename={filename}"},
    )


def update_weather_record_controller(db: Session, record_id: int, updates: dict):
    """
    Update an existing weather record by ID.
    """
    try:
        record = db.query(WeatherRecord).filter(WeatherRecord.id == record_id).first()
        if not record:
            return None

        for key, value in updates.items():
            if hasattr(record, key):
                setattr(record, key, value)

        db.commit()
        db.refresh(record)
        return record

    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(
            f"Database error while updating record ID {record_id}: {str(e)}"
        )
    except Exception as e:
        db.rollback()
        raise Exception(f"Unexpected error updating record: {str(e)}")


def delete_weather_record_controller(db: Session, record_id: int):
    """
    Delete a weather record by ID.
    """
    try:
        record = db.query(WeatherRecord).filter(WeatherRecord.id == record_id).first()
        print(record)
        if not record:
            return None

        db.delete(record)
        db.commit()
        return True

    except SQLAlchemyError as e:
        db.rollback()
        raise Exception(
            f"Database error while deleting record ID {record_id}: {str(e)}"
        )
    except Exception as e:
        db.rollback()
        raise Exception(f"Unexpected error deleting record: {str(e)}")

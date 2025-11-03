from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from config.database import SessionLocal
from controllers.weather_record_controller import (
    create_weather_record,
    get_all_weather_records,
    get_weather_record_by_id,
    get_weather_record_by_location,
    update_weather_record_controller,
    delete_weather_record_controller,
    export_weather_records_controller,
)

router = APIRouter(prefix="/records", tags=["records"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("")
def list_weather_records(db: Session = Depends(get_db)):
    """
    Retrieve all saved weather records.
    """
    try:
        records = get_all_weather_records(db)
        return {"success": True, "count": len(records), "data": records}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/filter")
def list_weather_records_by_location(location: str, db: Session = Depends(get_db)):
    """
    Retrieve all weather records for a given location.
    """
    try:
        records = get_weather_record_by_location(db, location)
        if not records:
            raise HTTPException(
                status_code=404, detail=f"No records found for location '{location}'"
            )
        return {"success": True, "count": len(records), "data": records}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/export")
def export_weather_records(id: int | None = Query(None), db: Session = Depends(get_db)):
    """
    Export all weather records or a single record by ID.
    Example:
      /records/export         → All records
      /record/export?id=3     → Single record
    """
    try:
        response = export_weather_records_controller(db, id)
        if not response:
            raise HTTPException(status_code=404, detail="No records found for export.")
        return response
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{record_id}")
def get_weather_record(record_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a single weather record by its ID.
    """
    try:
        record = get_weather_record_by_id(db, record_id)
        if not record:
            raise HTTPException(
                status_code=404, detail=f"Record with ID {record_id} not found"
            )
        return {"success": True, "data": record}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/save")
def save_weather_record(data: dict, db: Session = Depends(get_db)):
    """
    Save a new weather record to the database.
    """
    try:
        record = create_weather_record(db, data)
        return {
            "success": True,
            "message": "Weather record created successfully",
            "data": record,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.put("/{record_id}")
def update_weather_record(record_id: int, updates: dict, db: Session = Depends(get_db)):
    """
    Update a specific weather record.
    """
    try:
        updated = update_weather_record_controller(db, record_id, updates)
        if not updated:
            raise HTTPException(
                status_code=404, detail=f"Record with ID {record_id} not found"
            )
        return {
            "success": True,
            "message": "Weather record updated successfully",
            "data": updated,
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/{record_id}")
def delete_weather_record(record_id: int, db: Session = Depends(get_db)):
    """
    Delete a specific weather record by ID.
    """
    try:
        deleted = delete_weather_record_controller(db, record_id)
        if not deleted:
            raise HTTPException(
                status_code=404, detail=f"Record with ID {record_id} not found"
            )
        return {
            "success": True,
            "message": f"Record ID {record_id} deleted successfully",
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

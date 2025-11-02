# Weather API Application

A FastAPI-based weather application that provides current weather data, forecasts, and weather record management using the OpenWeatherMap API.

## Features

- **Current Weather**: Fetch real-time weather data for any location
- **Weather Forecast**: Get 7-day weather forecasts
- **Weather Records**: Store, retrieve, update, and delete weather records in a SQLite database
- **Data Export**: Export weather records as CSV files
- **RESTful API**: Well-structured endpoints with proper error handling

## Tech Stack

- **Backend**: FastAPI (Python)
- **Database**: SQLite with SQLAlchemy ORM
- **External API**: OpenWeatherMap API
- **Data Validation**: Pydantic schemas
- **Environment Management**: python-dotenv

## Project Structure

```
├── main.py                    # FastAPI application entry point
├── config/
│   └── database.py           # Database configuration and session management
├── models/
│   └── weather_record.py     # SQLAlchemy model for weather records
├── controllers/
│   ├── weather_controller.py      # Current weather data fetching
│   ├── forcast_controller.py      # Weather forecast handling
│   └── weather_record_controller.py # CRUD operations for weather records
├── routes/
│   ├── weather_route.py      # Weather endpoints
│   ├── forcast_route.py      # Forecast endpoints
│   └── records_route.py      # Weather records management endpoints
├── schemas/
│   ├── weather_schema.py     # Pydantic models for weather data
│   └── forcast_schema.py     # Pydantic models for forecast data
├── utils/
│   └── formatters.py         # Data formatting utilities
├── weather.db               # SQLite database file
├── .env                     # Environment variables
└── README.md                # This file
```

## Installation

1. **Clone the repository** (if applicable) or ensure you have the project files.

2. **Install dependencies**:
   ```bash
   pip install fastapi uvicorn sqlalchemy pydantic python-dotenv requests
   ```

3. **Set up environment variables**:
   - Copy the `.env` file and ensure it contains your OpenWeatherMap API key:
     ```
     OPENWEATHER_API_KEY=your_api_key_here
     ```
   - Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)

4. **Run the application**:
   ```bash
   uvicorn main:app --reload
   ```

The API will be available at `http://localhost:8000`

## API Endpoints

### Weather Endpoints

#### Get Current Weather
- **POST** `/weather/`
- **Description**: Fetch current weather data for a location
- **Request Body**:
  ```json
  {
    "location": "London"
  }
  ```
- **Response**: Formatted weather data including temperature, humidity, wind, etc.

#### Get Weather Forecast
- **POST** `/forecast/`
- **Description**: Get 7-day weather forecast for a location
- **Request Body**:
  ```json
  {
    "location": "London"
  }
  ```
- **Response**: Daily forecast data with min/max temperatures and weather conditions

### Weather Records Management

#### Get All Records
- **GET** `/records/`
- **Description**: Retrieve all saved weather records
- **Response**: List of all weather records ordered by save date

#### Get Records by Location
- **GET** `/records/filter?location=London`
- **Description**: Filter records by location (case-insensitive partial match)
- **Response**: Filtered list of weather records

#### Get Single Record
- **GET** `/records/{record_id}`
- **Description**: Retrieve a specific weather record by ID
- **Response**: Single weather record data

#### Save Weather Record
- **POST** `/records/save`
- **Description**: Save a new weather record to the database
- **Request Body**:
  ```json
  {
    "location": "London",
    "country": "GB",
    "main": "Clouds",
    "description": "Overcast clouds",
    "temp": "15.2",
    "humidity": "78",
    "pressure": "1013",
    "wind": "5.2"
  }
  ```

#### Update Weather Record
- **PUT** `/records/{record_id}`
- **Description**: Update an existing weather record
- **Request Body**: JSON object with fields to update

#### Delete Weather Record
- **DELETE** `/records/{record_id}`
- **Description**: Delete a weather record by ID

#### Export Records
- **GET** `/records/export?id={record_id}` (optional)
- **Description**: Export weather records as CSV
- **Parameters**:
  - `id` (optional): Export single record by ID, or all records if omitted
- **Response**: CSV file download

## Database Schema

The application uses a single SQLite table `weather_records`:

```sql
CREATE TABLE weather_records (
    id INTEGER PRIMARY KEY,
    location VARCHAR NOT NULL,
    country VARCHAR,
    main VARCHAR,
    description VARCHAR,
    temp VARCHAR,
    humidity VARCHAR,
    pressure VARCHAR,
    wind VARCHAR,
    saved_on DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Data Models

### WeatherRecord Model
- `id`: Primary key (auto-increment)
- `location`: Location name (indexed)
- `country`: Country code
- `main`: Main weather condition (e.g., "Clouds", "Rain")
- `description`: Detailed weather description
- `temp`: Temperature in Celsius
- `humidity`: Humidity percentage
- `pressure`: Atmospheric pressure in hPa
- `wind`: Wind speed in km/h
- `saved_on`: Timestamp when record was saved

## Usage Examples

### Fetch Current Weather
```bash
curl -X POST "http://localhost:8000/weather/" \
     -H "Content-Type: application/json" \
     -d '{"location": "New York"}'
```

### Get Weather Records
```bash
curl -X GET "http://localhost:8000/records/"
```

### Save Weather Data
```bash
curl -X POST "http://localhost:8000/records/save" \
     -H "Content-Type: application/json" \
     -d '{
       "location": "Tokyo",
       "country": "JP",
       "main": "Clear",
       "description": "Clear sky",
       "temp": "22.5",
       "humidity": "65",
       "pressure": "1012",
       "wind": "3.1"
     }'
```

## Error Handling

The API includes comprehensive error handling:
- 400: Bad Request (invalid location, API errors)
- 404: Not Found (record/location not found)
- 500: Internal Server Error (database errors, unexpected exceptions)

## Development

### Running Tests
```bash
# Add your test commands here
pytest
```

### API Documentation
When running the application, visit `http://localhost:8000/docs` for interactive Swagger UI documentation.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Built with [FastAPI](https://fastapi.tiangolo.com/)
- Database ORM by [SQLAlchemy](https://www.sqlalchemy.org/)

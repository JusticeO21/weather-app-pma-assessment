# Weather App - Fullstack Application

A modern, responsive fullstack weather application that provides real-time weather information, forecasts, and allows users to save and manage weather records. Built with Next.js 16 (frontend) and FastAPI (backend), featuring a clean UI and robust API architecture.

## 🌟 Features

### Core Functionality
- **Real-time Weather Data**: Get current weather conditions for any location using OpenWeatherMap API
- **7-Day Forecast**: View detailed weather forecasts for the upcoming week
- **Today's Highlights**: Comprehensive weather metrics including humidity, wind status, visibility, pressure, and sunrise/sunset times
- **Location Detection**: Automatic location detection using GPS, IP geolocation, or manual search
- **Weather Records**: Save and manage weather data for future reference in SQLite database
- **Search & Filter**: Search weather records by location with real-time filtering
- **Export Functionality**: Export weather records to CSV format
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### User Experience
- **Intuitive UI**: Clean, modern interface with smooth animations
- **Loading States**: Skeleton loaders and loading indicators throughout the app
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Toast Notifications**: Real-time feedback for user actions
- **Debounced Search**: Optimized search functionality to reduce API calls

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **Zustand** - Lightweight state management with devtools and immer middleware
- **Lucide React** - Beautiful icon library
- **Sonner** - Toast notification system
- **Leaflet** - Interactive maps (for location visualization)

### Backend
- **FastAPI** - Modern, fast web framework for building APIs with Python
- **SQLAlchemy** - SQL toolkit and Object-Relational Mapping (ORM)
- **SQLite** - Lightweight database for data persistence
- **Pydantic** - Data validation and settings management
- **Uvicorn** - ASGI web server implementation for Python
- **OpenWeatherMap API** - External weather data provider

### Development Tools
- **ESLint** - Code linting for frontend
- **PostCSS** - CSS processing
- **Geist Fonts** - Modern typography
- **python-dotenv** - Environment variable management for backend

### Key Dependencies
- `class-variance-authority` - Component variant utilities
- `clsx` - Conditional CSS classes
- `date-fns` - Date manipulation
- `react-leaflet` - React wrapper for Leaflet maps
- `requests` - HTTP library for Python

## 📁 Project Structure

```
weather-app/
├── frontend/                    # Next.js Frontend Application
│   ├── app/                     # Next.js App Router
│   │   ├── (app)/               # Main app layout
│   │   │   ├── layout.tsx       # App layout with sidebar and header
│   │   │   ├── page.tsx         # Home page (weather dashboard)
│   │   │   ├── records/         # Records section
│   │   │   │   ├── page.tsx     # Records list page
│   │   │   │   └── [id]/        # Dynamic record detail page
│   │   │   │       └── page.tsx
│   │   ├── layout.tsx           # Root layout
│   │   ├── globals.css          # Global styles
│   │   └── favicon.ico
│   ├── components/              # Reusable UI components
│   │   └── ui/
│   │       ├── atoms/           # Basic UI elements (Button, Card, etc.)
│   │       ├── molecules/       # Composite components (Cards, Forms)
│   │       ├── organisms/       # Complex components (Header, Sidebar)
│   │       └── template/        # Page-level components
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utility functions and API calls
│   │   ├── api/                 # API integration
│   │   └── utils/               # Helper functions
│   ├── stores/                  # Zustand state management
│   │   ├── slices/              # State slices
│   │   └── index.ts             # Store configuration
│   ├── types/                   # TypeScript type definitions
│   └── public/                  # Static assets
    └── README.md                # Frontend-specific README  
├── backend/                     # FastAPI Backend Application
│   ├── main.py                  # FastAPI application entry point
│   ├── config/
│   │   └── database.py          # Database configuration and session management
│   ├── models/
│   │   └── weather_record.py     # SQLAlchemy model for weather records
│   ├── controllers/
│   │   ├── weather_controller.py      # Current weather data fetching
│   │   ├── forecast_controller.py     # Weather forecast handling
│   │   └── weather_record_controller.py # CRUD operations for weather records
│   ├── routes/
│   │   ├── weather_route.py      # Weather endpoints
│   │   ├── forecast_route.py     # Forecast endpoints
│   │   └── records_route.py      # Weather records management endpoints
│   ├── schemas/
│   │   ├── weather_schema.py     # Pydantic models for weather data
│   │   └── forecast_schema.py    # Pydantic models for forecast data
│   ├── utils/
│   │   └── formatters.py         # Data formatting utilities
│   ├── weather.db               # SQLite database file
│   └── .env                     # Environment variables
    └── README.md                # Backend-specific README
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites
- **Frontend**: Node.js 18+ and npm/pnpm/yarn
- **Backend**: Python 3.8+ and pip
- **External API**: OpenWeatherMap API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Set up the Backend**
   ```bash
   cd backend

   # Create virtual environment (recommended)
   python -m venv venv
   # Activate virtual environment
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate

   # Install dependencies
   pip install fastapi uvicorn sqlalchemy pydantic python-dotenv requests

   # Set up environment variables
   # Create .env file with your OpenWeatherMap API key
   echo "OPENWEATHER_API_KEY=your_api_key_here" > .env

   # Run the backend server
   uvicorn main:app --reload
   ```
   The backend API will be available at `http://localhost:8000`

3. **Set up the Frontend** (in a new terminal)
   ```bash
   cd frontend

   # Install dependencies
   # Using pnpm (recommended)
   pnpm install

   # Or using npm
   npm install

   # Or using yarn
   yarn install

   # Set up environment variables
   # Create .env.local file
   echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

   # Run the development server
   # Using pnpm
   pnpm dev

   # Or using npm
   npm run dev

   # Or using yarn
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📖 Usage

### Viewing Weather Data
- The app automatically detects your location and displays current weather
- Use the search bar in the sidebar to search for weather in other locations
- Switch between "Today" and "Week" views in the forecast section

### Managing Weather Records
- Click "Save Record" to save current weather data to the database
- Navigate to the "Records" page to view all saved records
- Use the search bar to filter records by location
- Click on any record to view detailed information
- Export records to CSV using the "Export All" button

### API Usage
The backend provides a RESTful API with the following endpoints:

#### Weather Endpoints
- `POST /weather/` - Get current weather for a location
- `POST /forecast/` - Get 7-day forecast for a location

#### Records Management
- `GET /records/` - Get all saved weather records
- `GET /records/filter?location=<location>` - Filter records by location
- `GET /records/{id}` - Get specific record by ID
- `POST /records/save` - Save new weather record
- `PUT /records/{id}` - Update existing record
- `DELETE /records/{id}` - Delete record
- `GET /records/export?id={id}` - Export records as CSV

## 🏗️ Architecture

### Frontend Architecture
- **State Management**: Zustand stores for weather data, forecasts, records, and UI state
- **Component Architecture**: Atomic Design principles (atoms, molecules, organisms, templates)
- **API Integration**: RESTful communication with backend API
- **Routing**: Next.js App Router for client-side navigation

### Backend Architecture
- **API Framework**: FastAPI with automatic OpenAPI documentation
- **Database**: SQLite with SQLAlchemy ORM for data persistence
- **Data Validation**: Pydantic schemas for request/response models
- **Error Handling**: Comprehensive HTTP status codes and error messages
- **External Integration**: OpenWeatherMap API for weather data

### Database Schema
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

## 🔧 Available Scripts

### Frontend Scripts
- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint

### Backend Scripts
- `uvicorn main:app --reload` - Start development server
- Visit `http://localhost:8000/docs` for interactive API documentation

## 🌐 Deployment

### Frontend Deployment (Vercel Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Backend Deployment
The backend can be deployed to any platform supporting Python applications:
- Railway
- DigitalOcean App Platform
- AWS Lambda
- Heroku
- Google Cloud Run

### Fullstack Deployment
For production deployment, ensure:
- Backend is deployed and accessible via a public URL
- Frontend environment variables point to the production backend URL
- Database is properly configured for production (consider PostgreSQL for scalability)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Built by**: Justice Owusu
- **Powered by**: PMAccelerator
- **Weather Data**: [OpenWeatherMap](https://openweathermap.org/)
- **Frontend Framework**: [Next.js](https://nextjs.org/) & [React](https://reactjs.org/)
- **Backend Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Database ORM**: [SQLAlchemy](https://www.sqlalchemy.org/)
- **UI Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: [Geist](https://vercel.com/font) by Vercel
- **Maps**: [Leaflet](https://leafletjs.com/)

---

**© 2025 Weather App. All rights reserved.**

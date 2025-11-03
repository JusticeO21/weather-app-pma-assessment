# Weather App

A modern, responsive weather application built with Next.js 16, TypeScript, and Tailwind CSS. This app provides real-time weather information, forecasts, and allows users to save and manage weather records.

## 🌟 Features

### Core Functionality

- **Real-time Weather Data**: Get current weather conditions for any location
- **7-Day Forecast**: View detailed weather forecasts for the upcoming week
- **Today's Highlights**: Comprehensive weather metrics including humidity, wind status, visibility, pressure, and sunrise/sunset times
- **Location Detection**: Automatic location detection using GPS, IP geolocation, or manual search
- **Weather Records**: Save and manage weather data for future reference
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

### Frontend Framework

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript

### State Management

- **Zustand** - Lightweight state management with devtools and immer middleware

### Styling & UI

- **Tailwind CSS 4** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Sonner** - Toast notification system
- **Leaflet** - Interactive maps (for location visualization)

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Geist Fonts** - Modern typography

### Key Dependencies

- `class-variance-authority` - Component variant utilities
- `clsx` - Conditional CSS classes
- `date-fns` - Date manipulation
- `react-leaflet` - React wrapper for Leaflet maps

## 📁 Project Structure

```
my-app/
├── app/                          # Next.js App Router
│   ├── (app)/                    # Main app layout
│   │   ├── layout.tsx           # App layout with sidebar and header
│   │   ├── page.tsx             # Home page (weather dashboard)
│   │   ├── records/             # Records section
│   │   │   ├── page.tsx         # Records list page
│   │   │   └── [id]/            # Dynamic record detail page
│   │   │       └── page.tsx
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   └── favicon.ico
├── components/                   # Reusable UI components
│   └── ui/
│       ├── atoms/               # Basic UI elements (Button, Card, etc.)
│       ├── molecules/           # Composite components (Cards, Forms)
│       ├── organisms/           # Complex components (Header, Sidebar)
│       └── template/            # Page-level components
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions and API calls
│   ├── api/                     # API integration
│   └── utils/                   # Helper functions
├── stores/                       # Zustand state management
│   ├── slices/                  # State slices
│   └── index.ts                 # Store configuration
├── types/                        # TypeScript type definitions
└── public/                       # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn
- A weather API service (the app expects `NEXT_PUBLIC_API_URL` environment variable)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. **Install dependencies**

   ```bash
   # Using pnpm (recommended)
   pnpm install

   # Or using npm
   npm install

   # Or using yarn
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_API_URL=your-weather-api-endpoint
   ```

4. **Run the development server**

   ```bash
   # Using pnpm
   pnpm dev

   # Or using npm
   npm run dev

   # Or using yarn
   yarn dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📖 Usage

### Viewing Weather Data

- The app automatically detects your location and displays current weather
- Use the search bar in the sidebar to search for weather in other locations
- Switch between "Today" and "Week" views in the forecast section

### Managing Weather Records

- Click "Save Record" to save current weather data
- Navigate to the "Records" page to view all saved records
- Use the search bar to filter records by location
- Click on any record to view detailed information
- Export records to CSV using the "Export All" button

### Record Details

- View comprehensive weather metrics for saved records
- Export individual records to CSV
- Delete records with confirmation dialog

## 🏗️ Architecture

### State Management

The app uses Zustand for state management with separate stores for different domains:

- **Weather Store**: Current weather data and today's insights
- **Forecast Store**: 7-day weather forecast
- **Record Store**: Saved weather records management
- **Dialog Store**: Modal and dialog state

### Component Architecture

Following Atomic Design principles:

- **Atoms**: Basic UI elements (Button, Input, Card)
- **Molecules**: Composite components (MetricCard, DayCard)
- **Organisms**: Complex components (Header, Sidebar, RecordList)
- **Templates**: Page-level layouts (Home, Records, RecordDetail)

### API Integration

The app communicates with a backend API for:

- Weather data fetching (`POST /weather`)
- Forecast data (`POST /forecast`)
- Records management (CRUD operations on `/records`)

## 🔧 Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `start` - Start production server
- `lint` - Run ESLint

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform supporting Next.js:

- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built by Justice Owusu
- Powered by PMAccelerator
- Weather data provided by external API service
- Icons by Lucide React
- Fonts by Vercel (Geist)

---

**© 2025 Weather App. All rights reserved.**

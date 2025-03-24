# Portfolio Strategy Tool (PST2)

A comprehensive portfolio management system built with Next.js for managing real estate portfolios, analyzing office locations, and making data-driven decisions.

## Features

- Office location management and visualization
- Department tracking and allocation
- Lease management and financial analysis
- Market data tracking and analysis
- Employee proximity analysis
- Portfolio recommendations
- Interactive maps with Google Maps integration
- Data visualization with Chart.js and Recharts
- Modern UI with TailwindCSS

## Prerequisites

- Node.js >= 20.0.0
- npm or yarn
- Google Maps API key
- SQLite3

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd PST2
   ```

2. Install dependencies:
   ```bash
   cd portfolio-app
   npm install
   ```

3. Create environment variables:
   Create a `.env.local` file in the `portfolio-app` directory with:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   DATABASE_URL=sqlite://./data/portfolio.db
   ```

4. Initialize the database:
   ```bash
   # Create the data directory if it doesn't exist
   mkdir -p data
   
   # Initialize the database with the migration
   sqlite3 data/portfolio.db < migrations/0001_initial.sql
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## Project Structure

- `portfolio-app/` - Main Next.js application
- `migrations/` - Database migration files
- `data/` - Database and data files

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run export` - Export static site

## Database Schema

The application uses SQLite with the following main tables:
- `offices` - Office locations and basic information
- `departments` - Department information
- `leases` - Lease details
- `opex` - Operational expenditures
- `capex_projects` - Capital expenditure projects
- `market_data` - Market rental prices and trends
- `amenities` - Nearby amenities
- `employee_proximity` - Employee location data
- `recommendations` - Portfolio recommendations

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
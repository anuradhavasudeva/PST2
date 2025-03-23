-- Initialize database schema for Portfolio Strategy Application

-- Offices table to store basic information about each office location
CREATE TABLE IF NOT EXISTS offices (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip TEXT NOT NULL,
    country TEXT NOT NULL,
    phone TEXT,
    type TEXT NOT NULL,
    lat REAL NOT NULL,
    lng REAL NOT NULL,
    employees INTEGER,
    owned BOOLEAN NOT NULL
);

-- Departments table to store department information
CREATE TABLE IF NOT EXISTS departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE
);

-- Office_departments junction table for many-to-many relationship
CREATE TABLE IF NOT EXISTS office_departments (
    office_id INTEGER NOT NULL,
    department_id INTEGER NOT NULL,
    employee_count INTEGER,
    PRIMARY KEY (office_id, department_id),
    FOREIGN KEY (office_id) REFERENCES offices(id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

-- Leases table to store lease information
CREATE TABLE IF NOT EXISTS leases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    office_id INTEGER NOT NULL UNIQUE,
    expiry_date TEXT NOT NULL,
    annual_rent REAL NOT NULL,
    FOREIGN KEY (office_id) REFERENCES offices(id) ON DELETE CASCADE
);

-- Operational expenditures table
CREATE TABLE IF NOT EXISTS opex (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    office_id INTEGER NOT NULL UNIQUE,
    annual_total REAL NOT NULL,
    utilities REAL,
    maintenance REAL,
    security REAL,
    other REAL,
    FOREIGN KEY (office_id) REFERENCES offices(id) ON DELETE CASCADE
);

-- Capital expenditure projects table
CREATE TABLE IF NOT EXISTS capex_projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    office_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    budget REAL NOT NULL,
    completion_date TEXT NOT NULL,
    FOREIGN KEY (office_id) REFERENCES offices(id) ON DELETE CASCADE
);

-- Market data table for rental prices in different locations
CREATE TABLE IF NOT EXISTS market_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip TEXT NOT NULL,
    avg_rent_sqft REAL NOT NULL,
    vacancy_rate REAL,
    trend_direction TEXT,
    last_updated TEXT NOT NULL
);

-- Amenities table to store information about nearby amenities
CREATE TABLE IF NOT EXISTS amenities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    office_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    distance REAL,
    rating REAL,
    FOREIGN KEY (office_id) REFERENCES offices(id) ON DELETE CASCADE
);

-- Employee proximity data
CREATE TABLE IF NOT EXISTS employee_proximity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    office_id INTEGER NOT NULL,
    zip_code TEXT NOT NULL,
    employee_count INTEGER NOT NULL,
    avg_commute_time INTEGER,
    FOREIGN KEY (office_id) REFERENCES offices(id) ON DELETE CASCADE
);

-- Portfolio recommendations table
CREATE TABLE IF NOT EXISTS recommendations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    office_id INTEGER NOT NULL UNIQUE,
    recommendation TEXT NOT NULL,
    financial_score REAL NOT NULL,
    location_score REAL NOT NULL,
    employee_score REAL NOT NULL,
    overall_score REAL NOT NULL,
    justification TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (office_id) REFERENCES offices(id) ON DELETE CASCADE
);

-- Insert sample departments
INSERT INTO departments (name) VALUES 
('Executive'),
('Finance'),
('Legal'),
('Marketing'),
('HR'),
('Technology'),
('Operations'),
('Customer Service'),
('Data Center'),
('Innovation'),
('Digital Products'),
('Design'),
('Government Relations'),
('Public Policy'),
('Cybersecurity'),
('Product Development'),
('Partnerships'),
('Ventures'),
('Latin America Operations'),
('Business Development'),
('Customer Support'),
('Processing'),
('Data Analytics'),
('Merchant Solutions'),
('Research'),
('Digital Identity'),
('Fraud Prevention'),
('Customer Experience');

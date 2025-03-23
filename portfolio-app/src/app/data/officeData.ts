// Property interface
interface Property {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  type: string;
  status: "Owned" | "Leased";
  employees: number;
  capacity: number;
  utilization: number;
  currentRate: number;
  marketRate: number;
  annualOpEx: number;
  leaseExpiry: string | null;
  fitoutCost: number;
  moveCost: number;
  financialScore: number;
  recommendation: string;
  reasonToStay: string;
  difference: number;
}

// Mock data for Mastercard US office locations
export const mastercardOffices: Property[] = [
  {
    id: 1,
    name: "Global Headquarters",
    address: "2000 Purchase Street",
    city: "Purchase",
    state: "NY",
    zipCode: "10577",
    type: "Headquarters",
    status: "Owned",
    employees: 1200,
    capacity: 1500,
    utilization: 80,
    currentRate: 0,
    marketRate: 0,
    annualOpEx: 25000000,
    leaseExpiry: null,
    fitoutCost: 100,
    moveCost: 1200000,
    financialScore: 95,
    recommendation: "Stay",
    reasonToStay: "Owned property with optimal utilization",
    difference: 0
  },
  {
    id: 2,
    name: "Operations Center",
    address: "2200 Mastercard Blvd",
    city: "O'Fallon",
    state: "MO",
    zipCode: "63368",
    type: "Operations",
    status: "Owned",
    employees: 2500,
    capacity: 3000,
    utilization: 83,
    currentRate: 0,
    marketRate: 0,
    annualOpEx: 45000000,
    leaseExpiry: null,
    fitoutCost: 85,
    moveCost: 2500000,
    financialScore: 92,
    recommendation: "Stay",
    reasonToStay: "Owned property with high utilization",
    difference: 0
  },
  {
    id: 3,
    name: "New York Office",
    address: "150 5th Ave",
    city: "New York",
    state: "NY",
    zipCode: "10011",
    type: "Tech Hub",
    status: "Leased",
    employees: 850,
    capacity: 1000,
    utilization: 85,
    currentRate: 85,
    marketRate: 95,
    annualOpEx: 15000000,
    leaseExpiry: "2027-08-31",
    fitoutCost: 150,
    moveCost: 850000,
    financialScore: 76,
    recommendation: "Renew",
    reasonToStay: "High utilization and favorable current rate",
    difference: -10.5
  },
  {
    id: 4,
    name: "Arlington Office",
    address: "4250 Fairfax Dr 11th floor",
    city: "Arlington",
    state: "VA",
    zipCode: "22203",
    type: "Tech Hub",
    status: "Leased",
    employees: 420,
    capacity: 500,
    utilization: 84,
    currentRate: 65,
    marketRate: 75,
    annualOpEx: 7500000,
    leaseExpiry: "2026-03-31",
    fitoutCost: 120,
    moveCost: 420000,
    financialScore: 62,
    recommendation: "Evaluate Renewal",
    reasonToStay: "Good utilization but lease expiring soon",
    difference: -13.3
  },
  {
    id: 5,
    name: "San Francisco Office",
    address: "123 Mission Street 4th & 5th Floor",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    type: "Tech Hub",
    status: "Leased",
    employees: 580,
    capacity: 600,
    utilization: 97,
    currentRate: 95,
    marketRate: 110,
    annualOpEx: 12000000,
    leaseExpiry: "2028-12-31",
    fitoutCost: 180,
    moveCost: 580000,
    financialScore: 88,
    recommendation: "Stay",
    reasonToStay: "Excellent utilization despite high rates",
    difference: -13.6
  },
  {
    id: 6,
    name: "Miami Office",
    address: "801 Brickell Ave #1300",
    city: "Miami",
    state: "FL",
    zipCode: "33131",
    type: "Regional Headquarters",
    status: "Leased",
    employees: 320,
    capacity: 400,
    utilization: 80,
    currentRate: 55,
    marketRate: 45,
    annualOpEx: 5000000,
    leaseExpiry: "2025-12-31",
    fitoutCost: 90,
    moveCost: 320000,
    financialScore: 48,
    recommendation: "Relocate",
    reasonToStay: "Current rate above market and lease expiring soon",
    difference: 22.2
  },
  {
    id: 7,
    name: "Kansas City Office",
    address: "11530 N Ambassador Dr",
    city: "Kansas City",
    state: "MO",
    zipCode: "64153",
    type: "Operations",
    status: "Leased",
    employees: 280,
    capacity: 350,
    utilization: 80,
    currentRate: 35,
    marketRate: 30,
    annualOpEx: 4000000,
    leaseExpiry: "2027-06-30",
    fitoutCost: 75,
    moveCost: 280000,
    financialScore: 55,
    recommendation: "Evaluate Renewal",
    reasonToStay: "Good utilization but current rate above market",
    difference: 16.7
  },
  {
    id: 8,
    name: "Chicago Office",
    address: "550 W Jackson Blvd",
    city: "Chicago",
    state: "IL",
    zipCode: "60661",
    type: "Tech Hub",
    status: "Leased",
    employees: 350,
    capacity: 400,
    utilization: 88,
    currentRate: 45,
    marketRate: 50,
    annualOpEx: 6000000,
    leaseExpiry: "2028-03-31",
    fitoutCost: 100,
    moveCost: 350000,
    financialScore: 82,
    recommendation: "Stay",
    reasonToStay: "Good utilization and favorable rates",
    difference: -10
  },
  {
    id: 9,
    name: "Boston Office",
    address: "125 High Street",
    city: "Boston",
    state: "MA",
    zipCode: "02110",
    type: "Tech Hub",
    status: "Leased",
    employees: 290,
    capacity: 350,
    utilization: 83,
    currentRate: 75,
    marketRate: 85,
    annualOpEx: 5500000,
    leaseExpiry: "2027-12-31",
    fitoutCost: 130,
    moveCost: 290000,
    financialScore: 78,
    recommendation: "Renew",
    reasonToStay: "Good utilization and favorable current rate",
    difference: -11.8
  },
  {
    id: 10,
    name: "Atlanta Office",
    address: "1100 Peachtree Street NE",
    city: "Atlanta",
    state: "GA",
    zipCode: "30309",
    type: "Tech Hub",
    status: "Leased",
    employees: 260,
    capacity: 300,
    utilization: 87,
    currentRate: 40,
    marketRate: 45,
    annualOpEx: 4500000,
    leaseExpiry: "2028-06-30",
    fitoutCost: 95,
    moveCost: 260000,
    financialScore: 85,
    recommendation: "Stay",
    reasonToStay: "Excellent utilization and favorable rates",
    difference: -11.1
  }
];

// Standard costs for calculations
export const standardCosts = {
  fitoutCostPerSqft: 100,
  moveCostPerEmployee: 1000,
  annualOpExGrowth: 0.02, // 2% annual growth
  marketRateGrowth: 0.03, // 3% annual growth
  employeeGrowth: 0.02, // 2% annual growth
};

// Calculate ROI for a property
export function calculateROI(property: Property, years = 5) {
  const isOwned = property.status === "Owned";
  
  // Calculate staying costs
  const stayingCosts = {
    year1: property.annualOpEx,
    year2: property.annualOpEx * (1 + standardCosts.annualOpExGrowth),
    year3: property.annualOpEx * Math.pow(1 + standardCosts.annualOpExGrowth, 2),
    year4: property.annualOpEx * Math.pow(1 + standardCosts.annualOpExGrowth, 3),
    year5: property.annualOpEx * Math.pow(1 + standardCosts.annualOpExGrowth, 4),
    total: 0
  };
  
  // Calculate total staying costs
  stayingCosts.total = Object.values(stayingCosts)
    .filter(value => typeof value === 'number')
    .reduce((sum, value) => sum + value, 0);
  
  // Calculate moving costs
  const movingCosts = {
    initialCost: property.fitoutCost * property.capacity * 0.01 + property.moveCost,
    year1: property.annualOpEx * 1.1, // 10% higher in first year due to transition
    year2: property.annualOpEx * (1 + standardCosts.annualOpExGrowth),
    year3: property.annualOpEx * Math.pow(1 + standardCosts.annualOpExGrowth, 2),
    year4: property.annualOpEx * Math.pow(1 + standardCosts.annualOpExGrowth, 3),
    year5: property.annualOpEx * Math.pow(1 + standardCosts.annualOpExGrowth, 4),
    total: 0
  };
  
  // Calculate total moving costs
  movingCosts.total = Object.values(movingCosts)
    .filter(value => typeof value === 'number')
    .reduce((sum, value) => sum + value, 0);
  
  // Calculate net savings
  const netSavings = stayingCosts.total - movingCosts.total;
  
  // Calculate ROI
  const roi = netSavings > 0 
    ? (netSavings / movingCosts.initialCost) * 100 
    : "N/A";
  
  // Determine recommendation
  const recommendation = netSavings > 0 ? "Stay" : "Relocate";
  
  return {
    stayingCosts,
    movingCosts,
    netSavings,
    roi,
    recommendation
  };
} 
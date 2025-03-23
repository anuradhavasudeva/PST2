import React, { useState, useEffect } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement,
  LineElement,
  PointElement
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { mastercardOffices, standardCosts, calculateROI } from '../data/officeData';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

export default function FinancialAnalysis() {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [financialData, setFinancialData] = useState(null);
  const [scenarioType, setScenarioType] = useState('standard'); // standard, optimistic, pessimistic
  const [includeMoveCosts, setIncludeMoveCosts] = useState(true);
  const [includeFitoutCosts, setIncludeFitoutCosts] = useState(true);
  
  useEffect(() => {
    // Set default property on initial load
    if (!selectedProperty && mastercardOffices.length > 0) {
      setSelectedProperty(mastercardOffices[0]);
    }
  }, []);
  
  useEffect(() => {
    if (selectedProperty) {
      // Calculate financial data when property changes
      const roi = calculateROI(selectedProperty, 5);
      setFinancialData(roi);
    }
  }, [selectedProperty, scenarioType, includeMoveCosts, includeFitoutCosts]);
  
  // Handle property selection change
  const handlePropertyChange = (e) => {
    const propertyId = parseInt(e.target.value);
    const property = mastercardOffices.find(p => p.id === propertyId);
    setSelectedProperty(property);
  };
  
  // Handle scenario type change
  const handleScenarioChange = (e) => {
    setScenarioType(e.target.value);
  };
  
  // Toggle cost inclusion
  const toggleMoveCosts = () => {
    setIncludeMoveCosts(!includeMoveCosts);
  };
  
  const toggleFitoutCosts = () => {
    setIncludeFitoutCosts(!includeFitoutCosts);
  };
  
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Prepare chart data for 5-year cost comparison
  const getCostComparisonData = () => {
    if (!financialData) return null;
    
    return {
      labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
      datasets: [
        {
          label: 'Stay Costs',
          data: [
            financialData.stayingCosts.year1,
            financialData.stayingCosts.year2,
            financialData.stayingCosts.year3,
            financialData.stayingCosts.year4,
            financialData.stayingCosts.year5
          ],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1
        },
        {
          label: 'Relocate Costs',
          data: [
            financialData.movingCosts.year1 + (includeFitoutCosts && includeMoveCosts ? financialData.movingCosts.initialCost : 0),
            financialData.movingCosts.year2,
            financialData.movingCosts.year3,
            financialData.movingCosts.year4,
            financialData.movingCosts.year5
          ],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 1
        }
      ]
    };
  };
  
  // Prepare chart data for cost breakdown
  const getCostBreakdownData = () => {
    if (!selectedProperty) return null;
    
    const isOwned = selectedProperty.status === "Owned";
    const rentCost = isOwned ? 0 : selectedProperty.currentRate * selectedProperty.capacity * 0.01 * 12;
    const opexCost = selectedProperty.annualOpEx;
    const fitoutCost = includeFitoutCosts ? selectedProperty.fitoutCost * selectedProperty.capacity * 0.01 : 0;
    const moveCost = includeMoveCosts ? selectedProperty.moveCost : 0;
    
    return {
      labels: ['Rent', 'OpEx', 'Fitout (One-time)', 'Move (One-time)'],
      datasets: [
        {
          data: [rentCost, opexCost, fitoutCost, moveCost],
          backgroundColor: [
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)'
          ],
          borderColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }
      ]
    };
  };
  
  // Prepare chart data for market comparison
  const getMarketComparisonData = () => {
    if (!selectedProperty) return null;
    
    const isOwned = selectedProperty.status === "Owned";
    if (isOwned) return null;
    
    return {
      labels: ['Current Rate', 'Market Rate'],
      datasets: [
        {
          label: '$/sqft',
          data: [selectedProperty.currentRate, selectedProperty.marketRate],
          backgroundColor: [
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 99, 132, 0.5)'
          ],
          borderColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 99, 132)'
          ],
          borderWidth: 1
        }
      ]
    };
  };
  
  // Prepare chart data for cumulative cost comparison
  const getCumulativeCostData = () => {
    if (!financialData) return null;
    
    const stayData = [
      financialData.stayingCosts.year1,
      financialData.stayingCosts.year1 + financialData.stayingCosts.year2,
      financialData.stayingCosts.year1 + financialData.stayingCosts.year2 + financialData.stayingCosts.year3,
      financialData.stayingCosts.year1 + financialData.stayingCosts.year2 + financialData.stayingCosts.year3 + financialData.stayingCosts.year4,
      financialData.stayingCosts.year1 + financialData.stayingCosts.year2 + financialData.stayingCosts.year3 + financialData.stayingCosts.year4 + financialData.stayingCosts.year5
    ];
    
    const initialCost = includeFitoutCosts && includeMoveCosts ? financialData.movingCosts.initialCost : 0;
    const moveData = [
      financialData.movingCosts.year1 + initialCost,
      financialData.movingCosts.year1 + financialData.movingCosts.year2 + initialCost,
      financialData.movingCosts.year1 + financialData.movingCosts.year2 + financialData.movingCosts.year3 + initialCost,
      financialData.movingCosts.year1 + financialData.movingCosts.year2 + financialData.movingCosts.year3 + financialData.movingCosts.year4 + initialCost,
      financialData.movingCosts.year1 + financialData.movingCosts.year2 + financialData.movingCosts.year3 + financialData.movingCosts.year4 + financialData.movingCosts.year5 + initialCost
    ];
    
    return {
      labels: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
      datasets: [
        {
          label: 'Cumulative Stay Costs',
          data: stayData,
          backgroundColor: 'rgba(54, 162, 235, 0.1)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 2,
          fill: true,
          tension: 0.1
        },
        {
          label: 'Cumulative Relocate Costs',
          data: moveData,
          backgroundColor: 'rgba(255, 99, 132, 0.1)',
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 2,
          fill: true,
          tension: 0.1
        }
      ]
    };
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Financial Analysis</h1>
      
      {/* Controls */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Property
            </label>
            <select
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={selectedProperty?.id || ''}
              onChange={handlePropertyChange}
            >
              {mastercardOffices.map(property => (
                <option key={property.id} value={property.id}>
                  {property.name} - {property.city}, {property.state}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Scenario Type
            </label>
            <select
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={scenarioType}
              onChange={handleScenarioChange}
            >
              <option value="standard">Standard</option>
              <option value="optimistic">Optimistic</option>
              <option value="pessimistic">Pessimistic</option>
            </select>
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="flex items-center mb-2">
              <input
                id="include-move-costs"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={includeMoveCosts}
                onChange={toggleMoveCosts}
              />
              <label htmlFor="include-move-costs" className="ml-2 block text-sm text-gray-700">
                Include Move Costs
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="include-fitout-costs"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={includeFitoutCosts}
                onChange={toggleFitoutCosts}
              />
              <label htmlFor="include-fitout-costs" className="ml-2 block text-sm text-gray-700">
                Include Fitout Costs
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {selectedProperty && (
        <>
          {/* Property Overview */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Property Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">{selectedProperty.name}</h3>
                <p className="text-gray-600">{selectedProperty.address}</p>
                <p className="text-gray-600">{selectedProperty.city}, {selectedProperty.state} {selectedProperty.zipCode}</p>
                <p className="mt-2">
                  <span className="font-medium">Status:</span> {selectedProperty.status}
                </p>
                {selectedProperty.status === "Leased" && (
                  <p>
                    <span className="font-medium">Lease Expiry:</span> {selectedProperty.leaseExpiry}
                  </p>
                )}
              </div>
              
              <div>
                <p>
                  <span className="font-medium">Employees:</span> {selectedProperty.employees} / {selectedProperty.capacity}
                </p>
                <p>
                  <span className="font-medium">Utilization:</span> {selectedProperty.utilization}%
                </p>
                <p>
                  <span className="font-medium">Annual OpEx:</span> {formatCurrency(selectedProperty.annualOpEx)}
                </p>
                {selectedProperty.status === "Leased" && (
                  <>
                    <p>
                      <span className="font-medium">Current Rate:</span> ${selectedProperty.currentRate.toFixed(2)}/sqft
                    </p>
                    <p>
                      <span className="font-medium">Market Rate:</span> ${selectedProperty.marketRate.toFixed(2)}/sqft
                    </p>
                    <p>
                      <span className="font-medium">Difference:</span>{' '}
                      <span className={selectedProperty.difference < 0 ? "text-green-600" : "text-red-600"}>
                        {typeof selectedProperty.difference === 'number' ? 
                          (selectedProperty.difference < 0 ? 
                            selectedProperty.difference.toFixed(1) + '%' : 
                            '+' + selectedProperty.difference.toFixed(1) + '%') : 
                          selectedProperty.difference}
                      </span>
                    </p>
                  </>
                )}
              </div>
              
              <div>
                <p>
                  <span className="font-medium">Fitout Cost:</span> ${selectedProperty.fitoutCost.toFixed(2)}/sqft
                </p>
                <p>
                  <span className="font-medium">Move Cost:</span> {formatCurrency(selectedProperty.moveCost)}
                </p>
                <p>
                  <span className="font-medium">Financial Score:</span> {selectedProperty.financialScore}/100
                </p>
                <p className="mt-4">
                  <span className="font-medium">Recommendation:</span>{' '}
                  <span className={
                    selectedProperty.recommendation === "Stay" || 
                    selectedProperty.recommendation === "Renew" ? 
                    "text-green-600 font-semibold" : 
                    selectedProperty.recommendation === "Evaluate Renewal" ? 
                    "text-yellow-600 font-semibold" : 
                    "text-red-600 font-semibold"
                  }>
                    {selectedProperty.recommendation}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedProperty.reasonToStay}
                </p>
              </div>
            </div>
          </div>
          
          {/* Financial Analysis */}
          {financialData && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Financial Analysis</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">5-Year Cost Comparison</h3>
                  {getCostComparisonData() && (
                    <Bar 
                      data={getCostComparisonData()} 
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                          title: {
                            display: true,
                            text: 'Annual Costs by Year'
                          }
                        }
                      }}
                    />
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Cost Breakdown</h3>
                  {getCostBreakdownData() && (
                    <Pie 
                      data={getCostBreakdownData()} 
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                          title: {
                            display: true,
                            text: 'Cost Components'
                          }
                        }
                      }}
                    />
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Cumulative Cost Comparison</h3>
                  {getCumulativeCostData() && (
                    <Line 
                      data={getCumulativeCostData()} 
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                          title: {
                            display: true,
                            text: 'Cumulative Costs Over 5 Years'
                          }
                        }
                      }}
                    />
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Market Rate Comparison</h3>
                  {getMarketComparisonData() ? (
                    <Bar 
                      data={getMarketComparisonData()} 
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            display: false,
                          },
                          title: {
                            display: true,
                            text: 'Current vs Market Rate ($/sqft)'
                          }
                        }
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">Not applicable for owned properties</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Financial Summary */}
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Financial Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-600">5-Year Stay Cost</p>
                    <p className="text-2xl font-bold">{formatCurrency(financialData.stayingCosts.total)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">5-Year Relocate Cost</p>
                    <p className="text-2xl font-bold">{formatCurrency(financialData.movingCosts.total)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Net Savings</p>
                    <p className={`text-2xl font-bold ${financialData.netSavings > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(financialData.netSavings)}
                    </p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <p className="text-sm text-gray-600">Return on Investment (ROI)</p>
                  <p className="text-2xl font-bold">
                    {financialData.roi === "N/A" ? "N/A" : `${financialData.roi.toFixed(1)}%`}
                  </p>
                  <p className="mt-4 text-gray-700">
                    <span className="font-medium">Recommendation:</span>{' '}
                    <span className={financialData.recommendation === "Stay" ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
                      {financialData.recommendation}
                    </span>
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    {financialData.recommendation === "Stay" ? 
                      `Based on the 5-year financial analysis, staying at the current location would save ${formatCurrency(Math.abs(financialData.netSavings))} compared to relocating.` : 
                      `Based on the 5-year financial analysis, relocating would save ${formatCurrency(Math.abs(financialData.netSavings))} compared to staying at the current location.`
                    }
                    {includeFitoutCosts && includeMoveCosts ? 
                      ` This analysis includes one-time fitout costs (${formatCurrency(selectedProperty.fitoutCost * selectedProperty.capacity * 0.01)}) and move costs (${formatCurrency(selectedProperty.moveCost)}).` : 
                      includeFitoutCosts ? 
                      ` This analysis includes one-time fitout costs (${formatCurrency(selectedProperty.fitoutCost * selectedProperty.capacity * 0.01)}) but excludes move costs.` :
                      includeMoveCosts ?
                      ` This analysis includes one-time move costs (${formatCurrency(selectedProperty.moveCost)}) but excludes fitout costs.` :
                      ` This analysis excludes both fitout and move costs.`
                    }
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* What-If Scenarios */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">What-If Scenarios</h2>
            <p className="text-gray-600 mb-4">
              Adjust parameters below to see how they affect the financial analysis and recommendation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Market Parameters</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Market Rate Growth (% per year)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.5"
                      defaultValue="3"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0%</span>
                      <span>5%</span>
                      <span>10%</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      OpEx Inflation (% per year)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.5"
                      defaultValue="2"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>0%</span>
                      <span>5%</span>
                      <span>10%</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employee Growth (% per year)
                    </label>
                    <input
                      type="range"
                      min="-5"
                      max="10"
                      step="0.5"
                      defaultValue="2"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>-5%</span>
                      <span>0%</span>
                      <span>5%</span>
                      <span>10%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Cost Parameters</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fitout Cost ($/sqft)
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="200"
                      step="5"
                      defaultValue={selectedProperty?.fitoutCost || 100}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>$50</span>
                      <span>$125</span>
                      <span>$200</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Move Cost ($ per employee)
                    </label>
                    <input
                      type="range"
                      min="500"
                      max="2000"
                      step="100"
                      defaultValue="1000"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>$500</span>
                      <span>$1,250</span>
                      <span>$2,000</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Analysis Period (years)
                    </label>
                    <div className="flex space-x-4">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        3 Years
                      </button>
                      <button className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        5 Years
                      </button>
                      <button className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        10 Years
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Run What-If Analysis
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

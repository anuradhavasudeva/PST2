import React, { useState, useEffect } from 'react';
import { mastercardOffices, calculateROI } from '../data/officeData';

export default function WhatIfScenarios() {
  // State for scenarios
  const [scenarios, setScenarios] = useState([
    {
      id: 1,
      name: 'Baseline Scenario',
      description: 'Current portfolio with no changes',
      employeeGrowthRate: 2.5,
      opexInflation: 3.0,
      rentInflation: 2.0,
      renewalStrategy: 'market',
      density: 150, // sq ft per employee
      costPerSqFt: {
        premium: 65,
        standard: 45,
        value: 32
      },
      companyPolicy: {
        remoteWorkPercentage: 20,
        deskSharingRatio: 1.2,
        maxCommuteTime: 45
      },
      sustainability: {
        carbonReductionTarget: 15,
        greenBuildingCertification: 'LEED Silver',
        energyEfficiencyMinimum: 'B'
      },
      employeeSatisfaction: {
        amenitiesImportance: 7,
        locationPreference: 'urban',
        transitAccessImportance: 8
      }
    }
  ]);
  
  const [activeScenario, setActiveScenario] = useState(1);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparedScenarios, setComparedScenarios] = useState([]);
  const [showNewScenarioForm, setShowNewScenarioForm] = useState(false);
  const [newScenario, setNewScenario] = useState({
    name: '',
    description: '',
    employeeGrowthRate: 2.5,
    opexInflation: 3.0,
    rentInflation: 2.0,
    renewalStrategy: 'market',
    density: 150,
    costPerSqFt: {
      premium: 65,
      standard: 45,
      value: 32
    },
    companyPolicy: {
      remoteWorkPercentage: 20,
      deskSharingRatio: 1.2,
      maxCommuteTime: 45
    },
    sustainability: {
      carbonReductionTarget: 15,
      greenBuildingCertification: 'LEED Silver',
      energyEfficiencyMinimum: 'B'
    },
    employeeSatisfaction: {
      amenitiesImportance: 7,
      locationPreference: 'urban',
      transitAccessImportance: 8
    }
  });
  
  // Calculate scenario results
  const calculateScenarioResults = (scenario) => {
    // Calculate total costs and savings for the scenario
    let totalCurrentCost = 0;
    let totalProjectedCost = 0;
    let totalSavings = 0;
    let recommendations = [];
    
    mastercardOffices.forEach(office => {
      // Apply scenario parameters to the office
      const modifiedOffice = { ...office };
      
      // Apply density changes
      const originalCapacity = office.capacity;
      const newCapacity = Math.floor(office.squareFeet / scenario.density);
      modifiedOffice.capacity = newCapacity;
      
      // Apply cost per sq ft based on location tier
      let locationTier = 'standard';
      if (office.city === 'New York' || office.city === 'San Francisco') {
        locationTier = 'premium';
      } else if (office.city === 'St. Louis' || office.city === 'Kansas City') {
        locationTier = 'value';
      }
      
      // Adjust market rate based on scenario
      modifiedOffice.marketRate = scenario.costPerSqFt[locationTier];
      
      // Apply remote work policy to employee count
      const effectiveEmployees = Math.ceil(office.employees * (1 - scenario.companyPolicy.remoteWorkPercentage / 100));
      modifiedOffice.effectiveEmployees = effectiveEmployees;
      
      // Apply desk sharing ratio
      const desksNeeded = Math.ceil(effectiveEmployees / scenario.companyPolicy.deskSharingRatio);
      modifiedOffice.desksNeeded = desksNeeded;
      
      // Calculate utilization with new parameters
      modifiedOffice.utilization = Math.min(100, Math.round((desksNeeded / newCapacity) * 100));
      
      // Calculate sustainability score
      const sustainabilityScore = office.energyEfficiency === 'A' || office.energyEfficiency === 'B' ? 10 : 
                                 office.energyEfficiency === 'C' ? 7 : 
                                 office.energyEfficiency === 'D' ? 4 : 2;
      
      // Calculate employee satisfaction score
      const amenitiesScore = office.amenities * (scenario.employeeSatisfaction.amenitiesImportance / 10);
      const transitScore = office.transitAccess * (scenario.employeeSatisfaction.transitAccessImportance / 10);
      const locationScore = scenario.employeeSatisfaction.locationPreference === office.locationType ? 10 : 5;
      const satisfactionScore = (amenitiesScore + transitScore + locationScore) / 3;
      
      modifiedOffice.sustainabilityScore = sustainabilityScore;
      modifiedOffice.satisfactionScore = satisfactionScore;
      
      // Calculate ROI with scenario parameters
      const roi = calculateROI(modifiedOffice, {
        employeeGrowthRate: scenario.employeeGrowthRate,
        opexInflation: scenario.opexInflation,
        rentInflation: scenario.rentInflation,
        renewalStrategy: scenario.renewalStrategy,
        fitoutCost: office.fitoutCost,
        moveCost: office.moveCost
      });
      
      // Add to totals
      totalCurrentCost += roi.currentAnnualCost;
      totalProjectedCost += roi.projectedAnnualCost;
      totalSavings += roi.netSavings;
      
      // Add recommendation
      recommendations.push({
        id: office.id,
        name: office.name,
        city: office.city,
        state: office.state,
        recommendation: roi.recommendation,
        currentCost: roi.currentAnnualCost,
        projectedCost: roi.projectedAnnualCost,
        savings: roi.netSavings,
        utilization: modifiedOffice.utilization,
        sustainabilityScore,
        satisfactionScore
      });
    });
    
    return {
      totalCurrentCost,
      totalProjectedCost,
      totalSavings,
      recommendations,
      averageUtilization: recommendations.reduce((sum, rec) => sum + rec.utilization, 0) / recommendations.length,
      averageSustainability: recommendations.reduce((sum, rec) => sum + rec.sustainabilityScore, 0) / recommendations.length,
      averageSatisfaction: recommendations.reduce((sum, rec) => sum + rec.satisfactionScore, 0) / recommendations.length
    };
  };
  
  // Get active scenario
  const getActiveScenario = () => {
    return scenarios.find(s => s.id === activeScenario);
  };
  
  // Handle new scenario creation
  const handleCreateScenario = () => {
    const newId = Math.max(...scenarios.map(s => s.id)) + 1;
    const createdScenario = {
      ...newScenario,
      id: newId
    };
    
    setScenarios([...scenarios, createdScenario]);
    setActiveScenario(newId);
    setShowNewScenarioForm(false);
    setNewScenario({
      name: '',
      description: '',
      employeeGrowthRate: 2.5,
      opexInflation: 3.0,
      rentInflation: 2.0,
      renewalStrategy: 'market',
      density: 150,
      costPerSqFt: {
        premium: 65,
        standard: 45,
        value: 32
      },
      companyPolicy: {
        remoteWorkPercentage: 20,
        deskSharingRatio: 1.2,
        maxCommuteTime: 45
      },
      sustainability: {
        carbonReductionTarget: 15,
        greenBuildingCertification: 'LEED Silver',
        energyEfficiencyMinimum: 'B'
      },
      employeeSatisfaction: {
        amenitiesImportance: 7,
        locationPreference: 'urban',
        transitAccessImportance: 8
      }
    });
  };
  
  // Handle scenario comparison
  const toggleScenarioComparison = (scenarioId) => {
    if (comparedScenarios.includes(scenarioId)) {
      setComparedScenarios(comparedScenarios.filter(id => id !== scenarioId));
    } else {
      if (comparedScenarios.length < 3) {
        setComparedScenarios([...comparedScenarios, scenarioId]);
      }
    }
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
  
  // Format percentage
  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };
  
  // Calculate results for active scenario
  const activeScenarioResults = calculateScenarioResults(getActiveScenario());
  
  // Calculate results for compared scenarios
  const comparisonResults = comparedScenarios.map(id => {
    const scenario = scenarios.find(s => s.id === id);
    return {
      scenario,
      results: calculateScenarioResults(scenario)
    };
  });
  
  // Find best scenario based on savings
  const getBestScenario = () => {
    if (comparisonResults.length === 0) return null;
    
    return comparisonResults.reduce((best, current) => {
      return current.results.totalSavings > best.results.totalSavings ? current : best;
    }, comparisonResults[0]);
  };
  
  const bestScenario = getBestScenario();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">What-If Scenario Analysis</h1>
      
      {/* Scenario Selection */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-semibold mb-4 md:mb-0">Scenarios</h2>
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                comparisonMode 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setComparisonMode(!comparisonMode)}
            >
              {comparisonMode ? 'Exit Comparison' : 'Compare Scenarios'}
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              onClick={() => setShowNewScenarioForm(true)}
            >
              Create New Scenario
            </button>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scenarios.map((scenario) => (
            <div 
              key={scenario.id} 
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                activeScenario === scenario.id && !comparisonMode
                  ? 'border-blue-500 bg-blue-50'
                  : comparedScenarios.includes(scenario.id)
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => comparisonMode ? toggleScenarioComparison(scenario.id) : setActiveScenario(scenario.id)}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium">{scenario.name}</h3>
                {comparisonMode && (
                  <div className="h-6 w-6 rounded-full border-2 flex items-center justify-center">
                    {comparedScenarios.includes(scenario.id) && (
                      <svg className="h-4 w-4 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">{scenario.description}</p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Employee Growth:</span>
                  <span className="text-sm font-medium">{formatPercentage(scenario.employeeGrowthRate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">OpEx Inflation:</span>
                  <span className="text-sm font-medium">{formatPercentage(scenario.opexInflation)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Rent Inflation:</span>
                  <span className="text-sm font-medium">{formatPercentage(scenario.rentInflation)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Density:</span>
                  <span className="text-sm font-medium">{scenario.density} sq ft/employee</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Remote Work:</span>
                  <span className="text-sm font-medium">{scenario.companyPolicy.remoteWorkPercentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Scenario Comparison */}
      {comparisonMode && comparedScenarios.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Scenario Comparison</h2>
          
          {/* Comparison Summary */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Summary</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Scenario
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Current Cost
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Projected Cost
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Savings
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Avg. Utilization
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sustainability
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Employee Satisfaction
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {comparisonResults.map(({ scenario, results }) => (
                    <tr key={scenario.id} className={bestScenario && bestScenario.scenario.id === scenario.id ? 'bg-green-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {bestScenario && bestScenario.scenario.id === scenario.id && (
                            <span className="flex-shrink-0 h-5 w-5 text-green-600 mr-2">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </span>
                          )}
                          <div className="text-sm font-medium text-gray-900">{scenario.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(results.totalCurrentCost)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(results.totalProjectedCost)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${results.totalSavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(Math.abs(results.totalSavings))}
                          {results.totalSavings >= 0 ? ' saved' : ' cost'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{results.averageUtilization.toFixed(1)}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              results.averageUtilization < 60 
                                ? 'bg-red-500' 
                                : results.averageUtilization < 80 
                                  ? 'bg-yellow-500' 
                                  : 'bg-green-500'
                            }`} 
                            style={{ width: `${results.averageUtilization}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{results.averageSustainability.toFixed(1)}/10</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-green-500" 
                            style={{ width: `${results.averageSustainability * 10}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{results.averageSatisfaction.toFixed(1)}/10</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-blue-500" 
                            style={{ width: `${results.averageSatisfaction * 10}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Best Scenario Highlight */}
            {bestScenario && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-green-800">Recommended Scenario: {bestScenario.scenario.name}</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>This scenario provides the highest cost savings of {formatCurrency(Math.abs(bestScenario.results.totalSavings))} while maintaining:</p>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        <li>Average space utilization of {bestScenario.results.averageUtilization.toFixed(1)}%</li>
                        <li>Sustainability score of {bestScenario.results.averageSustainability.toFixed(1)}/10</li>
                        <li>Employee satisfaction score of {bestScenario.results.averageSatisfaction.toFixed(1)}/10</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Detailed Comparison */}
          <div>
            <h3 className="text-lg font-medium mb-4">Property Recommendations</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property
                    </th>
                    {comparisonResults.map(({ scenario }) => (
                      <th key={scenario.id} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {scenario.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mastercardOffices.map((office) => (
                    <tr key={office.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{office.name}</div>
                        <div className="text-xs text-gray-500">{office.city}, {office.state}</div>
                      </td>
                      {comparisonResults.map(({ scenario, results }) => {
                        const recommendation = results.recommendations.find(r => r.id === office.id);
                        return (
                          <td key={scenario.id} className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              recommendation.recommendation === 'Stay' || recommendation.recommendation === 'Renew'
                                ? 'bg-green-100 text-green-800' 
                                : recommendation.recommendation === 'Evaluate Renewal'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                            }`}>
                              {recommendation.recommendation}
                            </span>
                            <div className="text-xs text-gray-500 mt-1">
                              {recommendation.savings >= 0 
                                ? `Save ${formatCurrency(recommendation.savings)}` 
                                : `Cost ${formatCurrency(Math.abs(recommendation.savings))}`}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* Active Scenario Details (when not in comparison mode) */}
      {!comparisonMode && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Scenario Details: {getActiveScenario().name}</h2>
          
          {/* Scenario Parameters */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Parameters</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Financial Parameters */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Financial Parameters</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Employee Growth Rate:</span>
                    <span className="text-sm font-medium">{formatPercentage(getActiveScenario().employeeGrowthRate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">OpEx Inflation:</span>
                    <span className="text-sm font-medium">{formatPercentage(getActiveScenario().opexInflation)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Rent Inflation:</span>
                    <span className="text-sm font-medium">{formatPercentage(getActiveScenario().rentInflation)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Renewal Strategy:</span>
                    <span className="text-sm font-medium capitalize">{getActiveScenario().renewalStrategy}</span>
                  </div>
                </div>
              </div>
              
              {/* Space Parameters */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Space Parameters</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Density:</span>
                    <span className="text-sm font-medium">{getActiveScenario().density} sq ft/employee</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Premium Location Cost:</span>
                    <span className="text-sm font-medium">${getActiveScenario().costPerSqFt.premium}/sq ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Standard Location Cost:</span>
                    <span className="text-sm font-medium">${getActiveScenario().costPerSqFt.standard}/sq ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Value Location Cost:</span>
                    <span className="text-sm font-medium">${getActiveScenario().costPerSqFt.value}/sq ft</span>
                  </div>
                </div>
              </div>
              
              {/* Company Policy */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Company Policy</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Remote Work:</span>
                    <span className="text-sm font-medium">{getActiveScenario().companyPolicy.remoteWorkPercentage}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Desk Sharing Ratio:</span>
                    <span className="text-sm font-medium">{getActiveScenario().companyPolicy.deskSharingRatio}:1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Max Commute Time:</span>
                    <span className="text-sm font-medium">{getActiveScenario().companyPolicy.maxCommuteTime} min</span>
                  </div>
                </div>
              </div>
              
              {/* Sustainability */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Sustainability</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Carbon Reduction Target:</span>
                    <span className="text-sm font-medium">{getActiveScenario().sustainability.carbonReductionTarget}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Green Building Certification:</span>
                    <span className="text-sm font-medium">{getActiveScenario().sustainability.greenBuildingCertification}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Energy Efficiency Minimum:</span>
                    <span className="text-sm font-medium">{getActiveScenario().sustainability.energyEfficiencyMinimum}</span>
                  </div>
                </div>
              </div>
              
              {/* Employee Satisfaction */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Employee Satisfaction</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Amenities Importance:</span>
                    <span className="text-sm font-medium">{getActiveScenario().employeeSatisfaction.amenitiesImportance}/10</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Location Preference:</span>
                    <span className="text-sm font-medium capitalize">{getActiveScenario().employeeSatisfaction.locationPreference}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Transit Access Importance:</span>
                    <span className="text-sm font-medium">{getActiveScenario().employeeSatisfaction.transitAccessImportance}/10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Scenario Results */}
          <div>
            <h3 className="text-lg font-medium mb-4">Results</h3>
            
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-sm text-gray-600">Total Current Cost</p>
                <p className="text-2xl font-bold">{formatCurrency(activeScenarioResults.totalCurrentCost)}</p>
                <p className="text-xs text-gray-500 mt-1">Annual portfolio cost</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-sm text-gray-600">Total Projected Cost</p>
                <p className="text-2xl font-bold">{formatCurrency(activeScenarioResults.totalProjectedCost)}</p>
                <p className="text-xs text-gray-500 mt-1">After implementing recommendations</p>
              </div>
              <div className={`rounded-lg p-6 ${activeScenarioResults.totalSavings >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                <p className="text-sm text-gray-600">Total Savings</p>
                <p className={`text-2xl font-bold ${activeScenarioResults.totalSavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(Math.abs(activeScenarioResults.totalSavings))}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {activeScenarioResults.totalSavings >= 0 ? 'Annual savings' : 'Additional annual cost'}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-sm text-gray-600">Average Utilization</p>
                <p className="text-2xl font-bold">{activeScenarioResults.averageUtilization.toFixed(1)}%</p>
                <p className="text-xs text-gray-500 mt-1">Across all properties</p>
              </div>
            </div>
            
            {/* Recommendations Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recommendation
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Current Cost
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Projected Cost
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Savings
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Utilization
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sustainability
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Satisfaction
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activeScenarioResults.recommendations.map((rec) => (
                    <tr key={rec.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{rec.name}</div>
                        <div className="text-xs text-gray-500">{rec.city}, {rec.state}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          rec.recommendation === 'Stay' || rec.recommendation === 'Renew'
                            ? 'bg-green-100 text-green-800' 
                            : rec.recommendation === 'Evaluate Renewal'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {rec.recommendation}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(rec.currentCost)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(rec.projectedCost)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${rec.savings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(Math.abs(rec.savings))}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{rec.utilization}%</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              rec.utilization < 60 
                                ? 'bg-red-500' 
                                : rec.utilization < 80 
                                  ? 'bg-yellow-500' 
                                  : 'bg-green-500'
                            }`} 
                            style={{ width: `${rec.utilization}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{rec.sustainabilityScore.toFixed(1)}/10</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-green-500" 
                            style={{ width: `${rec.sustainabilityScore * 10}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{rec.satisfactionScore.toFixed(1)}/10</div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-blue-500" 
                            style={{ width: `${rec.satisfactionScore * 10}%` }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      
      {/* New Scenario Form */}
      {showNewScenarioForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Create New Scenario</h3>
                <button
                  className="text-gray-400 hover:text-gray-500"
                  onClick={() => setShowNewScenarioForm(false)}
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="px-6 py-4">
              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h4 className="text-base font-medium text-gray-900 mb-4">Basic Information</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="scenario-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Scenario Name
                      </label>
                      <input
                        type="text"
                        id="scenario-name"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={newScenario.name}
                        onChange={(e) => setNewScenario({ ...newScenario, name: e.target.value })}
                        placeholder="Enter scenario name"
                      />
                    </div>
                    <div>
                      <label htmlFor="scenario-description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        id="scenario-description"
                        rows={2}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={newScenario.description}
                        onChange={(e) => setNewScenario({ ...newScenario, description: e.target.value })}
                        placeholder="Enter scenario description"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Financial Parameters */}
                <div>
                  <h4 className="text-base font-medium text-gray-900 mb-4">Financial Parameters</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="employee-growth" className="block text-sm font-medium text-gray-700 mb-1">
                        Employee Growth Rate (%)
                      </label>
                      <input
                        type="number"
                        id="employee-growth"
                        step="0.1"
                        min="0"
                        max="20"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={newScenario.employeeGrowthRate}
                        onChange={(e) => setNewScenario({ ...newScenario, employeeGrowthRate: parseFloat(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label htmlFor="opex-inflation" className="block text-sm font-medium text-gray-700 mb-1">
                        OpEx Inflation (%)
                      </label>
                      <input
                        type="number"
                        id="opex-inflation"
                        step="0.1"
                        min="0"
                        max="10"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={newScenario.opexInflation}
                        onChange={(e) => setNewScenario({ ...newScenario, opexInflation: parseFloat(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label htmlFor="rent-inflation" className="block text-sm font-medium text-gray-700 mb-1">
                        Rent Inflation (%)
                      </label>
                      <input
                        type="number"
                        id="rent-inflation"
                        step="0.1"
                        min="0"
                        max="10"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={newScenario.rentInflation}
                        onChange={(e) => setNewScenario({ ...newScenario, rentInflation: parseFloat(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label htmlFor="renewal-strategy" className="block text-sm font-medium text-gray-700 mb-1">
                        Renewal Strategy
                      </label>
                      <select
                        id="renewal-strategy"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={newScenario.renewalStrategy}
                        onChange={(e) => setNewScenario({ ...newScenario, renewalStrategy: e.target.value })}
                      >
                        <option value="market">Market Rate</option>
                        <option value="below-market">Below Market (10% discount)</option>
                        <option value="above-market">Above Market (premium locations)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Space Parameters */}
                <div>
                  <h4 className="text-base font-medium text-gray-900 mb-4">Space Parameters</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="density" className="block text-sm font-medium text-gray-700 mb-1">
                        Density (sq ft per employee)
                      </label>
                      <input
                        type="number"
                        id="density"
                        min="50"
                        max="300"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={newScenario.density}
                        onChange={(e) => setNewScenario({ ...newScenario, density: parseInt(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label htmlFor="premium-cost" className="block text-sm font-medium text-gray-700 mb-1">
                        Premium Location Cost ($/sq ft)
                      </label>
                      <input
                        type="number"
                        id="premium-cost"
                        step="0.01"
                        min="0"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={newScenario.costPerSqFt.premium}
                        onChange={(e) => setNewScenario({ 
                          ...newScenario, 
                          costPerSqFt: {
                            ...newScenario.costPerSqFt,
                            premium: parseFloat(e.target.value)
                          }
                        })}
                      />
                    </div>
                    <div>
                      <label htmlFor="standard-cost" className="block text-sm font-medium text-gray-700 mb-1">
                        Standard Location Cost ($/sq ft)
                      </label>
                      <input
                        type="number"
                        id="standard-cost"
                        step="0.01"
                        min="0"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={newScenario.costPerSqFt.standard}
                        onChange={(e) => setNewScenario({ 
                          ...newScenario, 
                          costPerSqFt: {
                            ...newScenario.costPerSqFt,
                            standard: parseFloat(e.target.value)
                          }
                        })}
                      />
                    </div>
                    <div>
                      <label htmlFor="value-cost" className="block text-sm font-medium text-gray-700 mb-1">
                        Value Location Cost ($/sq ft)
                      </label>
                      <input
                        type="number"
                        id="value-cost"
                        step="0.01"
                        min="0"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={newScenario.costPerSqFt.value}
                        onChange={(e) => setNewScenario({ 
                          ...newScenario, 
                          costPerSqFt: {
                            ...newScenario.costPerSqFt,
                            value: parseFloat(e.target.value)
                          }
                        })}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Company Policy */}
                <div>
                  <h4 className="text-base font-medium text-gray-900 mb-4">Company Policy</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="remote-work" className="block text-sm font-medium text-gray-700 mb-1">
                        Remote Work Percentage (%)
                      </label>
                      <input
                        type="number"
                        id="remote-work"
                        min="0"
                        max="100"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={newScenario.companyPolicy.remoteWorkPercentage}
                        onChange={(e) => setNewScenario({ 
                          ...newScenario, 
                          companyPolicy: {
                            ...newScenario.companyPolicy,
                            remoteWorkPercentage: parseInt(e.target.value)
                          }
                        })}
                      />
                    </div>
                    <div>
                      <label htmlFor="desk-sharing" className="block text-sm font-medium text-gray-700 mb-1">
                        Desk Sharing Ratio
                      </label>
                      <input
                        type="number"
                        id="desk-sharing"
                        step="0.1"
                        min="1"
                        max="3"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={newScenario.companyPolicy.deskSharingRatio}
                        onChange={(e) => setNewScenario({ 
                          ...newScenario, 
                          companyPolicy: {
                            ...newScenario.companyPolicy,
                            deskSharingRatio: parseFloat(e.target.value)
                          }
                        })}
                      />
                    </div>
                    <div>
                      <label htmlFor="max-commute" className="block text-sm font-medium text-gray-700 mb-1">
                        Max Commute Time (minutes)
                      </label>
                      <input
                        type="number"
                        id="max-commute"
                        min="15"
                        max="120"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={newScenario.companyPolicy.maxCommuteTime}
                        onChange={(e) => setNewScenario({ 
                          ...newScenario, 
                          companyPolicy: {
                            ...newScenario.companyPolicy,
                            maxCommuteTime: parseInt(e.target.value)
                          }
                        })}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Sustainability */}
                <div>
                  <h4 className="text-base font-medium text-gray-900 mb-4">Sustainability</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="carbon-reduction" className="block text-sm font-medium text-gray-700 mb-1">
                        Carbon Reduction Target (%)
                      </label>
                      <input
                        type="number"
                        id="carbon-reduction"
                        min="0"
                        max="100"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={newScenario.sustainability.carbonReductionTarget}
                        onChange={(e) => setNewScenario({ 
                          ...newScenario, 
                          sustainability: {
                            ...newScenario.sustainability,
                            carbonReductionTarget: parseInt(e.target.value)
                          }
                        })}
                      />
                    </div>
                    <div>
                      <label htmlFor="green-certification" className="block text-sm font-medium text-gray-700 mb-1">
                        Green Building Certification
                      </label>
                      <select
                        id="green-certification"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={newScenario.sustainability.greenBuildingCertification}
                        onChange={(e) => setNewScenario({ 
                          ...newScenario, 
                          sustainability: {
                            ...newScenario.sustainability,
                            greenBuildingCertification: e.target.value
                          }
                        })}
                      >
                        <option value="None">None</option>
                        <option value="LEED Certified">LEED Certified</option>
                        <option value="LEED Silver">LEED Silver</option>
                        <option value="LEED Gold">LEED Gold</option>
                        <option value="LEED Platinum">LEED Platinum</option>
                        <option value="BREEAM Good">BREEAM Good</option>
                        <option value="BREEAM Very Good">BREEAM Very Good</option>
                        <option value="BREEAM Excellent">BREEAM Excellent</option>
                        <option value="BREEAM Outstanding">BREEAM Outstanding</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="energy-efficiency" className="block text-sm font-medium text-gray-700 mb-1">
                        Energy Efficiency Minimum
                      </label>
                      <select
                        id="energy-efficiency"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={newScenario.sustainability.energyEfficiencyMinimum}
                        onChange={(e) => setNewScenario({ 
                          ...newScenario, 
                          sustainability: {
                            ...newScenario.sustainability,
                            energyEfficiencyMinimum: e.target.value
                          }
                        })}
                      >
                        <option value="A">A (Excellent)</option>
                        <option value="B">B (Good)</option>
                        <option value="C">C (Average)</option>
                        <option value="D">D (Below Average)</option>
                        <option value="E">E (Poor)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Employee Satisfaction */}
                <div>
                  <h4 className="text-base font-medium text-gray-900 mb-4">Employee Satisfaction</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="amenities-importance" className="block text-sm font-medium text-gray-700 mb-1">
                        Amenities Importance (1-10)
                      </label>
                      <input
                        type="number"
                        id="amenities-importance"
                        min="1"
                        max="10"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={newScenario.employeeSatisfaction.amenitiesImportance}
                        onChange={(e) => setNewScenario({ 
                          ...newScenario, 
                          employeeSatisfaction: {
                            ...newScenario.employeeSatisfaction,
                            amenitiesImportance: parseInt(e.target.value)
                          }
                        })}
                      />
                    </div>
                    <div>
                      <label htmlFor="location-preference" className="block text-sm font-medium text-gray-700 mb-1">
                        Location Preference
                      </label>
                      <select
                        id="location-preference"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={newScenario.employeeSatisfaction.locationPreference}
                        onChange={(e) => setNewScenario({ 
                          ...newScenario, 
                          employeeSatisfaction: {
                            ...newScenario.employeeSatisfaction,
                            locationPreference: e.target.value
                          }
                        })}
                      >
                        <option value="urban">Urban</option>
                        <option value="suburban">Suburban</option>
                        <option value="rural">Rural</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="transit-importance" className="block text-sm font-medium text-gray-700 mb-1">
                        Transit Access Importance (1-10)
                      </label>
                      <input
                        type="number"
                        id="transit-importance"
                        min="1"
                        max="10"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={newScenario.employeeSatisfaction.transitAccessImportance}
                        onChange={(e) => setNewScenario({ 
                          ...newScenario, 
                          employeeSatisfaction: {
                            ...newScenario.employeeSatisfaction,
                            transitAccessImportance: parseInt(e.target.value)
                          }
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
                onClick={() => setShowNewScenarioForm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={handleCreateScenario}
                disabled={!newScenario.name}
              >
                Create Scenario
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

"use client"

import React, { useState } from 'react';
import { mastercardOffices, calculateROI } from '../data/officeData';

export default function LeaseSummary() {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Calculate total potential savings
  const totalSavings = mastercardOffices
    .filter(office => office.status === 'Leased')
    .reduce((total, office) => {
      const roi = calculateROI(office);
      return total + (roi.recommendation === 'Relocate' ? Math.abs(roi.netSavings) : 0);
    }, 0);
  
  // Calculate metrics
  const totalProperties = mastercardOffices.length;
  const leasedProperties = mastercardOffices.filter(office => office.status === 'Leased').length;
  const ownedProperties = mastercardOffices.filter(office => office.status === 'Owned').length;
  const expiringLeases = mastercardOffices.filter(office => {
    if (office.status !== 'Leased') return false;
    const expiryDate = new Date(office.leaseExpiry);
    const today = new Date();
    const twoYearsFromNow = new Date();
    twoYearsFromNow.setFullYear(today.getFullYear() + 2);
    return expiryDate <= twoYearsFromNow;
  }).length;
  
  // Sort and filter offices
  const sortedOffices = [...mastercardOffices]
    .filter(office => {
      if (filterStatus === 'all') return true;
      if (filterStatus === 'leased') return office.status === 'Leased';
      if (filterStatus === 'owned') return office.status === 'Owned';
      if (filterStatus === 'expiring') {
        if (office.status !== 'Leased') return false;
        const expiryDate = new Date(office.leaseExpiry);
        const today = new Date();
        const twoYearsFromNow = new Date();
        twoYearsFromNow.setFullYear(today.getFullYear() + 2);
        return expiryDate <= twoYearsFromNow;
      }
      return true;
    })
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      // Handle special cases
      if (sortField === 'leaseExpiry') {
        if (a.status !== 'Leased') aValue = 'N/A';
        if (b.status !== 'Leased') bValue = 'N/A';
        
        if (aValue === 'N/A' && bValue === 'N/A') return 0;
        if (aValue === 'N/A') return 1;
        if (bValue === 'N/A') return -1;
        
        const aDate = new Date(aValue);
        const bDate = new Date(bValue);
        return sortDirection === 'asc' ? aDate - bDate : bDate - aDate;
      }
      
      // Handle numeric values
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      // Handle string values
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
  
  // Handle sort change
  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
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
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Lease Summary Dashboard</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600">Total Properties</p>
          <p className="text-3xl font-bold">{totalProperties}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600">Leased Properties</p>
          <p className="text-3xl font-bold">{leasedProperties}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600">Owned Properties</p>
          <p className="text-3xl font-bold">{ownedProperties}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600">Expiring Leases (2 Years)</p>
          <p className="text-3xl font-bold">{expiringLeases}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 bg-green-50">
          <p className="text-sm text-gray-600">Potential Savings</p>
          <p className="text-3xl font-bold text-green-600">{formatCurrency(totalSavings)}</p>
          <p className="text-xs text-gray-500 mt-1">If all recommendations are followed</p>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-semibold mb-4 md:mb-0">Property Portfolio</h2>
          <div className="flex flex-wrap gap-2">
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filterStatus === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setFilterStatus('all')}
            >
              All Properties
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filterStatus === 'leased' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setFilterStatus('leased')}
            >
              Leased Only
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filterStatus === 'owned' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setFilterStatus('owned')}
            >
              Owned Only
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                filterStatus === 'expiring' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setFilterStatus('expiring')}
            >
              Expiring Leases
            </button>
          </div>
        </div>
      </div>
      
      {/* Property Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  Property
                  {sortField === 'name' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('city')}
                >
                  Location
                  {sortField === 'city' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  Status
                  {sortField === 'status' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('leaseExpiry')}
                >
                  Lease Expiry
                  {sortField === 'leaseExpiry' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('utilization')}
                >
                  Utilization
                  {sortField === 'utilization' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('employees')}
                >
                  Employees
                  {sortField === 'employees' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Cost Per Employee
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('recommendation')}
                >
                  Recommendation
                  {sortField === 'recommendation' && (
                    <span className="ml-1">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Potential Savings
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedOffices.map((office) => {
                const roi = calculateROI(office);
                const isLeased = office.status === 'Leased';
                const annualCost = isLeased 
                  ? (office.currentRate * office.capacity * 0.01 * 12) + office.annualOpEx
                  : office.annualOpEx;
                const costPerEmployee = annualCost / office.employees;
                
                return (
                  <tr key={office.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{office.name}</div>
                      <div className="text-xs text-gray-500">{office.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{office.city}, {office.state}</div>
                      <div className="text-xs text-gray-500">{office.zipCode}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        office.status === 'Owned' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {office.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {isLeased ? office.leaseExpiry : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{office.utilization}%</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            office.utilization < 60 
                              ? 'bg-red-500' 
                              : office.utilization < 80 
                                ? 'bg-yellow-500' 
                                : 'bg-green-500'
                          }`} 
                          style={{ width: `${office.utilization}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {office.employees} / {office.capacity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(costPerEmployee)}/year
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        office.recommendation === 'Stay' || office.recommendation === 'Renew'
                          ? 'bg-green-100 text-green-800' 
                          : office.recommendation === 'Evaluate Renewal'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {office.recommendation}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {isLeased && roi.recommendation === 'Relocate' 
                        ? <span className="text-green-600 font-medium">{formatCurrency(Math.abs(roi.netSavings))}</span>
                        : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href={`/properties/${office.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                        View
                      </a>
                      <a href={`/analysis/financial?property=${office.id}`} className="text-blue-600 hover:text-blue-900">
                        Analyze
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Department Cost Analysis */}
      <h2 className="text-2xl font-bold mt-12 mb-6">Cost Per Department Analysis</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Department Cost Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium">Cost Per Department</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Employees
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Annual Cost
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost Per Employee
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Technology Department */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Technology
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2,340
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(18500000)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(18500000 / 2340)}
                  </td>
                </tr>
                
                {/* Finance Department */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Finance
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    980
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(7200000)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(7200000 / 980)}
                  </td>
                </tr>
                
                {/* Sales Department */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Sales
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    1,450
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(10800000)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(10800000 / 1450)}
                  </td>
                </tr>
                
                {/* Marketing Department */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Marketing
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    860
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(6500000)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(6500000 / 860)}
                  </td>
                </tr>
                
                {/* Operations Department */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Operations
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    1,870
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(12200000)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(12200000 / 1870)}
                  </td>
                </tr>
                
                {/* Legal Department */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Legal
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    320
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(3500000)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(3500000 / 320)}
                  </td>
                </tr>
                
                {/* Executive Department */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Executive
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    180
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(2800000)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(2800000 / 180)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Department Cost Chart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium mb-4">Cost Per Employee by Department</h3>
          <div className="h-80 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              <p className="mt-2">Bar chart will be rendered here</p>
              <p className="text-sm">Showing cost per employee across departments</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Self-Serve Analysis CTA */}
      <div className="bg-blue-50 rounded-lg shadow-md p-8 mt-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-6 md:mb-0 md:mr-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">Want to analyze your own portfolio?</h2>
            <p className="text-blue-600">
              Our self-serve analysis tool allows you to upload your own property data and get instant recommendations.
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Try Self-Serve Analysis
            </button>
            <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md border border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

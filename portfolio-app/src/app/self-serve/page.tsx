import React, { useState, useEffect } from 'react';
import { mastercardOffices } from '../data/officeData';

// Self-serve data import component
export default function DataImport() {
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [importMethod, setImportMethod] = useState('template');
  const [fileUploaded, setFileUploaded] = useState(false);
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [importComplete, setImportComplete] = useState(false);
  
  // Sample template data
  const sampleData = mastercardOffices.slice(0, 3);
  
  // Handle file upload
  const handleFileUpload = (e) => {
    // In a real implementation, this would parse the uploaded file
    // For demo purposes, we'll simulate a file upload
    setFileUploaded(true);
  };
  
  // Handle manual property addition
  const handleAddProperty = () => {
    const newProperty = {
      id: properties.length + 1,
      name: 'New Property',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      status: 'Leased',
      employees: 0,
      capacity: 0,
      utilization: 0,
      currentRate: 0,
      marketRate: 0,
      annualOpEx: 0,
      leaseExpiry: '',
      fitoutCost: 0,
      moveCost: 0
    };
    
    setProperties([...properties, newProperty]);
  };
  
  // Handle property removal
  const handleRemoveProperty = (id) => {
    setProperties(properties.filter(property => property.id !== id));
  };
  
  // Handle property update
  const handlePropertyChange = (id, field, value) => {
    setProperties(properties.map(property => {
      if (property.id === id) {
        return { ...property, [field]: value };
      }
      return property;
    }));
  };
  
  // Handle import completion
  const handleCompleteImport = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setImportComplete(true);
    }, 2000);
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
      <h1 className="text-3xl font-bold mb-6">Self-Serve Portfolio Analysis</h1>
      
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            1
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            2
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            3
          </div>
          <div className={`flex-1 h-1 mx-2 ${step >= 4 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 4 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            4
          </div>
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <div className={`w-10 text-center ${step >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>Company</div>
          <div className={`w-10 text-center ${step >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>Import</div>
          <div className={`w-10 text-center ${step >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>Verify</div>
          <div className={`w-10 text-center ${step >= 4 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>Analyze</div>
        </div>
      </div>
      
      {/* Step 1: Company Information */}
      {step === 1 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Company Information</h2>
          <p className="text-gray-600 mb-6">
            Tell us about your company to help us provide more accurate analysis and recommendations.
          </p>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="company-name" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                id="company-name"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter your company name"
              />
            </div>
            
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                Industry
              </label>
              <select
                id="industry"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              >
                <option value="">Select an industry</option>
                <option value="finance">Finance & Banking</option>
                <option value="technology">Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="professional">Professional Services</option>
                <option value="education">Education</option>
                <option value="government">Government</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="employees" className="block text-sm font-medium text-gray-700 mb-1">
                  Total Employees
                </label>
                <input
                  type="number"
                  id="employees"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter total number of employees"
                />
              </div>
              
              <div>
                <label htmlFor="locations" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Locations
                </label>
                <input
                  type="number"
                  id="locations"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter number of locations"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-1">
                Portfolio Goals
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="goal-cost"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="goal-cost" className="ml-2 block text-sm text-gray-700">
                    Cost Reduction
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="goal-consolidation"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="goal-consolidation" className="ml-2 block text-sm text-gray-700">
                    Portfolio Consolidation
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="goal-expansion"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="goal-expansion" className="ml-2 block text-sm text-gray-700">
                    Expansion Planning
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="goal-optimization"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="goal-optimization" className="ml-2 block text-sm text-gray-700">
                    Space Optimization
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => setStep(2)}
            >
              Continue
            </button>
          </div>
        </div>
      )}
      
      {/* Step 2: Data Import */}
      {step === 2 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Import Property Data</h2>
          <p className="text-gray-600 mb-6">
            Choose how you want to import your property portfolio data.
          </p>
          
          <div className="space-y-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <input
                  id="import-template"
                  name="import-method"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={importMethod === 'template'}
                  onChange={() => setImportMethod('template')}
                />
                <label htmlFor="import-template" className="ml-2 block text-sm font-medium text-gray-700">
                  Use Excel Template
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="import-upload"
                  name="import-method"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={importMethod === 'upload'}
                  onChange={() => setImportMethod('upload')}
                />
                <label htmlFor="import-upload" className="ml-2 block text-sm font-medium text-gray-700">
                  Upload Existing Data
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  id="import-manual"
                  name="import-method"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={importMethod === 'manual'}
                  onChange={() => setImportMethod('manual')}
                />
                <label htmlFor="import-manual" className="ml-2 block text-sm font-medium text-gray-700">
                  Enter Data Manually
                </label>
              </div>
            </div>
            
            {/* Template Download */}
            {importMethod === 'template' && (
              <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Download Template</h3>
                <p className="text-gray-600 mb-4">
                  Download our Excel template, fill it with your property data, and upload it back.
                </p>
                
                <div className="flex flex-col space-y-4">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Download Excel Template
                  </button>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Completed Template
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileUpload} />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          Excel or CSV files up to 10MB
                        </p>
                      </div>
                    </div>
                    
                    {fileUploaded && (
                      <div className="mt-4 p-4 bg-green-50 rounded-md">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-green-800">
                              File uploaded successfully!
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* File Upload */}
            {importMethod === 'upload' && (
              <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Upload Your Data</h3>
                <p className="text-gray-600 mb-4">
                  Upload your existing property data file. We support Excel, CSV, and JSON formats.
                </p>
                
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload-existing" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Upload a file</span>
                        <input id="file-upload-existing" name="file-upload-existing" type="file" className="sr-only" onChange={handleFileUpload} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      Excel, CSV, or JSON files up to 10MB
                    </p>
                  </div>
                </div>
                
                {fileUploaded && (
                  <div className="mt-4 p-4 bg-green-50 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">
                          File uploaded successfully!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Manual Entry */}
            {importMethod === 'manual' && (
              <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Enter Property Data Manually</h3>
                <p className="text-gray-600 mb-4">
                  Add your properties one by one with detailed information.
                </p>
                
                <div className="mb-4">
                  <button
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleAddProperty}
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add Property
                  </button>
                </div>
                
                {properties.length > 0 && (
                  <div className="space-y-6">
                    {properties.map((property, index) => (
                      <div key={property.id} className="p-4 border border-gray-200 rounded-md">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-lg font-medium">Property #{index + 1}</h4>
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleRemoveProperty(property.id)}
                          >
                            Remove
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Property Name
                            </label>
                            <input
                              type="text"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              value={property.name}
                              onChange={(e) => handlePropertyChange(property.id, 'name', e.target.value)}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Address
                            </label>
                            <input
                              type="text"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              value={property.address}
                              onChange={(e) => handlePropertyChange(property.id, 'address', e.target.value)}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              City
                            </label>
                            <input
                              type="text"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              value={property.city}
                              onChange={(e) => handlePropertyChange(property.id, 'city', e.target.value)}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              State
                            </label>
                            <input
                              type="text"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              value={property.state}
                              onChange={(e) => handlePropertyChange(property.id, 'state', e.target.value)}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Status
                            </label>
                            <select
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              value={property.status}
                              onChange={(e) => handlePropertyChange(property.id, 'status', e.target.value)}
                            >
                              <option value="Owned">Owned</option>
                              <option value="Leased">Leased</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Employees
                            </label>
                            <input
                              type="number"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              value={property.employees}
                              onChange={(e) => handlePropertyChange(property.id, 'employees', parseInt(e.target.value))}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Capacity
                            </label>
                            <input
                              type="number"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              value={property.capacity}
                              onChange={(e) => handlePropertyChange(property.id, 'capacity', parseInt(e.target.value))}
                            />
                          </div>
                          
                          {property.status === 'Leased' && (
                            <>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Current Rate ($/sqft)
                                </label>
                                <input
                                  type="number"
                                  step="0.01"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  value={property.currentRate}
                                  onChange={(e) => handlePropertyChange(property.id, 'currentRate', parseFloat(e.target.value))}
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Lease Expiry Date
                                </label>
                                <input
                                  type="date"
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                  value={property.leaseExpiry}
                                  onChange={(e) => handlePropertyChange(property.id, 'leaseExpiry', e.target.value)}
                                />
                              </div>
                            </>
                          )}
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Annual OpEx
                            </label>
                            <input
                              type="number"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              value={property.annualOpEx}
                              onChange={(e) => handlePropertyChange(property.id, 'annualOpEx', parseInt(e.target.value))}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Fitout Cost ($/sqft)
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              value={property.fitoutCost}
                              onChange={(e) => handlePropertyChange(property.id, 'fitoutCost', parseFloat(e.target.value))}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Move Cost ($)
                            </label>
                            <input
                              type="number"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                              value={property.moveCost}
                              onChange={(e) => handlePropertyChange(property.id, 'moveCost', parseInt(e.target.value))}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="mt-8 flex justify-between">
            <button
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setStep(1)}
            >
              Back
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => setStep(3)}
              disabled={importMethod === 'template' && !fileUploaded && importMethod === 'upload' && !fileUploaded && importMethod === 'manual' && properties.length === 0}
            >
              Continue
            </button>
          </div>
        </div>
      )}
      
      {/* Step 3: Verify Data */}
      {step === 3 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Verify Your Data</h2>
          <p className="text-gray-600 mb-6">
            Review your imported property data and make any necessary adjustments.
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lease Expiry
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employees
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Annual OpEx
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Show sample data or user-entered data */}
                {(properties.length > 0 ? properties : sampleData).map((property) => (
                  <tr key={property.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{property.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{property.city}, {property.state}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        property.status === 'Owned' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {property.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {property.status === 'Leased' ? property.leaseExpiry : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {property.employees} / {property.capacity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(property.annualOpEx)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 flex justify-between">
            <button
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setStep(2)}
            >
              Back
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={handleCompleteImport}
            >
              Complete Import
            </button>
          </div>
        </div>
      )}
      
      {/* Step 4: Analysis Ready */}
      {step === 4 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="text-center">
            <svg className="mx-auto h-16 w-16 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Data Import Complete!</h2>
            <p className="mt-2 text-gray-600">
              Your property data has been successfully imported and is ready for analysis.
            </p>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-medium text-blue-800 mb-2">Portfolio Overview</h3>
                <p className="text-blue-600 mb-4">
                  Get a comprehensive view of your entire property portfolio.
                </p>
                <a href="/dashboard" className="text-blue-600 font-medium hover:text-blue-800">
                  View Dashboard →
                </a>
              </div>
              
              <div className="p-6 bg-green-50 rounded-lg">
                <h3 className="text-lg font-medium text-green-800 mb-2">Financial Analysis</h3>
                <p className="text-green-600 mb-4">
                  Analyze costs and identify potential savings opportunities.
                </p>
                <a href="/analysis/financial" className="text-green-600 font-medium hover:text-green-800">
                  Run Analysis →
                </a>
              </div>
              
              <div className="p-6 bg-purple-50 rounded-lg">
                <h3 className="text-lg font-medium text-purple-800 mb-2">What-If Scenarios</h3>
                <p className="text-purple-600 mb-4">
                  Create and compare different scenarios to optimize your portfolio.
                </p>
                <a href="/analysis/what-if" className="text-purple-600 font-medium hover:text-purple-800">
                  Create Scenarios →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Loading State */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-lg font-medium">Processing your data...</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Import Complete Modal */}
      {importComplete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Import Successful!</h3>
              <p className="mt-1 text-sm text-gray-500">
                Your property data has been successfully imported and is ready for analysis.
              </p>
              <div className="mt-4">
                <button
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => {
                    setImportComplete(false);
                    setStep(4);
                  }}
                >
                  Continue to Analysis
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

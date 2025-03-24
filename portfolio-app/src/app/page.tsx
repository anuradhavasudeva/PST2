"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Portfolio Strategy Application</h1>
          <p className="text-gray-500 mt-1">Enterprise Corporate Real Estate Decision Support Tool</p>
        </div>
        <Button>Generate Report</Button>
      </div>
      
      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">10</div>
            <p className="text-sm text-gray-500 mt-1">Across the United States</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8,750</div>
            <p className="text-sm text-gray-500 mt-1">Across all locations</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Annual OpEx</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$58.2M</div>
            <p className="text-sm text-gray-500 mt-1">Total operational expenses</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Annual Rent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$42.7M</div>
            <p className="text-sm text-gray-500 mt-1">For leased properties</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Property Portfolio</CardTitle>
            <CardDescription>View and manage all properties</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Access detailed information about all Mastercard office locations, including lease status, employee distribution, and financial metrics.</p>
            <Link href="/properties">
              <Button className="w-full">View Properties</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Map Visualization</CardTitle>
            <CardDescription>Geographic view of portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Visualize all Mastercard office locations on an interactive map with filters for employee density, amenities, and market rates.</p>
            <Link href="/map">
              <Button className="w-full">Open Map</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>What-If Analysis</CardTitle>
            <CardDescription>Create and compare scenarios</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Generate multiple what-if scenarios, modify property data, and compare options to find the most cost-effective solution.</p>
            <Link href="/analysis/what-if">
              <Button className="w-full">Run Analysis</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      
      {/* Properties Requiring Attention */}
      <Card>
        <CardHeader>
          <CardTitle>Properties Requiring Attention</CardTitle>
          <CardDescription>Based on lease expiry and financial metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Property</th>
                  <th className="text-left py-3 px-4 font-medium">Location</th>
                  <th className="text-left py-3 px-4 font-medium">Lease Expiry</th>
                  <th className="text-left py-3 px-4 font-medium">Financial Score</th>
                  <th className="text-left py-3 px-4 font-medium">Recommendation</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Arlington Office</td>
                  <td className="py-3 px-4">Arlington, VA</td>
                  <td className="py-3 px-4 text-red-600">Mar 31, 2026</td>
                  <td className="py-3 px-4">62/100</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Evaluate Renewal
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Link href="/analysis/what-if">
                      <Button size="sm">Analyze</Button>
                    </Link>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Miami Office</td>
                  <td className="py-3 px-4">Miami, FL</td>
                  <td className="py-3 px-4 text-red-600">Dec 31, 2025</td>
                  <td className="py-3 px-4">48/100</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Relocate
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Link href="/analysis/what-if">
                      <Button size="sm">Analyze</Button>
                    </Link>
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">New York Office</td>
                  <td className="py-3 px-4">New York, NY</td>
                  <td className="py-3 px-4">Aug 31, 2027</td>
                  <td className="py-3 px-4">76/100</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Renew
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Link href="/analysis/what-if">
                      <Button size="sm">Analyze</Button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Financial Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Overview</CardTitle>
          <CardDescription>Portfolio financial metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
            <p className="text-gray-500">Financial Overview Chart will be displayed here</p>
          </div>
        </CardContent>
      </Card>
      
      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 mr-3"></div>
              <div>
                <p className="font-medium">What-If scenario "Reduced OpEx" created</p>
                <p className="text-sm text-gray-500">Today at 10:23 AM</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3"></div>
              <div>
                <p className="font-medium">Arlington Office data updated</p>
                <p className="text-sm text-gray-500">Yesterday at 2:45 PM</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 mt-2 rounded-full bg-purple-500 mr-3"></div>
              <div>
                <p className="font-medium">Financial analysis for Miami Office completed</p>
                <p className="text-sm text-gray-500">Mar 22, 2025</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

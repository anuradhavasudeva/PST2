import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AnalysisPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Portfolio Analysis</h2>
        <div className="flex space-x-2">
          <Button variant="outline">Export Data</Button>
          <Button>Generate Report</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Annual Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$45.3M</div>
            <p className="text-xs text-muted-foreground mt-1">Combined Opex & Lease Costs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cost Per Employee</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$6,750</div>
            <p className="text-xs text-muted-foreground mt-1">Annual Average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Owned vs Leased</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">20% / 80%</div>
            <p className="text-xs text-muted-foreground mt-1">By Property Count</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Optimization Potential</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$3.8M</div>
            <p className="text-xs text-muted-foreground mt-1">Annual Savings Opportunity</p>
          </CardContent>
        </Card>
      </div>

      {/* Analysis Tabs */}
      <Tabs defaultValue="financial">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="financial">Financial Analysis</TabsTrigger>
          <TabsTrigger value="location">Location Analysis</TabsTrigger>
          <TabsTrigger value="employee">Employee Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="financial" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cost Distribution by Property</CardTitle>
              <CardDescription>Annual operational and lease costs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-gray-500">Cost Distribution Chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Opex Breakdown</CardTitle>
                <CardDescription>By category across portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Opex Breakdown Chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Lease Cost Trend</CardTitle>
                <CardDescription>5-year projection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Lease Cost Trend Chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Market Rate Comparison</CardTitle>
              <CardDescription>Current lease rates vs. market rates by location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Property</th>
                      <th className="text-left py-3 px-4 font-medium">Location</th>
                      <th className="text-left py-3 px-4 font-medium">Current Rate</th>
                      <th className="text-left py-3 px-4 font-medium">Market Rate</th>
                      <th className="text-left py-3 px-4 font-medium">Difference</th>
                      <th className="text-left py-3 px-4 font-medium">Market Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">New York Office</td>
                      <td className="py-3 px-4">New York, NY</td>
                      <td className="py-3 px-4">$75.00/sqft</td>
                      <td className="py-3 px-4">$78.50/sqft</td>
                      <td className="py-3 px-4 text-green-600">-4.5%</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center text-red-600">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><polyline points="18 15 12 9 6 15"></polyline></svg>
                          Rising
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">Arlington Office</td>
                      <td className="py-3 px-4">Arlington, VA</td>
                      <td className="py-3 px-4">$45.00/sqft</td>
                      <td className="py-3 px-4">$42.75/sqft</td>
                      <td className="py-3 px-4 text-red-600">+5.3%</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center text-green-600">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><polyline points="6 9 12 15 18 9"></polyline></svg>
                          Falling
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">San Francisco Office</td>
                      <td className="py-3 px-4">San Francisco, CA</td>
                      <td className="py-3 px-4">$68.00/sqft</td>
                      <td className="py-3 px-4">$72.25/sqft</td>
                      <td className="py-3 px-4 text-green-600">-5.9%</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center text-red-600">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><polyline points="18 15 12 9 6 15"></polyline></svg>
                          Rising
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="location" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Property distribution across regions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-gray-500">Geographic Distribution Map will be displayed here</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Amenities Score by Location</CardTitle>
                <CardDescription>Access to restaurants, gyms, shopping, etc.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Amenities Score Chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Transit Accessibility</CardTitle>
                <CardDescription>Public transportation options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Transit Accessibility Chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="employee" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Distribution</CardTitle>
              <CardDescription>By department and location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-gray-500">Employee Distribution Chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Average Commute Time</CardTitle>
                <CardDescription>By location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Commute Time Chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Employee Zip Code Density</CardTitle>
                <CardDescription>Heat map of employee residences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Employee Density Map will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="recommendations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Recommendations</CardTitle>
              <CardDescription>Strategic actions for property portfolio optimization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Property</th>
                      <th className="text-left py-3 px-4 font-medium">Location</th>
                      <th className="text-left py-3 px-4 font-medium">Recommendation</th>
                      <th className="text-left py-3 px-4 font-medium">Financial Impact</th>
                      <th className="text-left py-3 px-4 font-medium">Timeline</th>
                      <th className="text-left py-3 px-4 font-medium">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">Arlington Office</td>
                      <td className="py-3 px-4">Arlington, VA</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                          Evaluate Renewal
                        </span>
                      </td>
                      <td className="py-3 px-4">$420K annual savings</td>
                      <td className="py-3 px-4">Q1 2026</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-800 ring-1 ring-inset ring-red-600/20">
                          High
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">Kansas City Office</td>
                      <td className="py-3 px-4">Kansas City, MO</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-800 ring-1 ring-inset ring-red-600/20">
                          Relocate
                        </span>
                      </td>
                      <td className="py-3 px-4">$350K annual savings</td>
                      <td className="py-3 px-4">Q3 2026</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                          Medium
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">Boston Office</td>
                      <td className="py-3 px-4">Boston, MA</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-800 ring-1 ring-inset ring-blue-600/20">
                          Renegotiate
                        </span>
                      </td>
                      <td className="py-3 px-4">$280K annual savings</td>
                      <td className="py-3 px-4">Q4 2026</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                          Medium
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">Atlanta Office</td>
                      <td className="py-3 px-4">Atlanta, GA</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-600/20">
                          Stay
                        </span>
                      </td>
                      <td className="py-3 px-4">$0 (maintain)</td>
                      <td className="py-3 px-4">N/A</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-800 ring-1 ring-inset ring-gray-600/20">
                          Low
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Potential Savings</CardTitle>
              <CardDescription>Projected financial impact of recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-gray-500">Potential Savings Chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

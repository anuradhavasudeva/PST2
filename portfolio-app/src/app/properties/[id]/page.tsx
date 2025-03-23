import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  // In a real application, we would fetch the property data based on the ID
  // For now, we'll use hardcoded data for property ID 1 (Global Headquarters)
  const property = {
    id: 1,
    name: "Global Headquarters",
    address: "2000 Purchase Street",
    city: "Purchase",
    state: "NY",
    zip: "10577",
    country: "United States",
    phone: "+1.914.249.2000",
    type: "Headquarters",
    employees: 1200,
    departments: ["Executive", "Finance", "Legal", "Marketing", "HR"],
    lease: {
      expiry: "2030-12-31",
      annual_rent: 12500000,
      owned: true
    },
    opex: {
      annual: 8500000,
      utilities: 2100000,
      maintenance: 1800000,
      security: 950000,
      other: 3650000
    },
    capex: {
      ongoing_projects: [
        {
          name: "Lobby Renovation",
          budget: 3500000,
          completion_date: "2025-09-30"
        },
        {
          name: "HVAC Upgrade",
          budget: 2800000,
          completion_date: "2026-03-31"
        }
      ]
    },
    recommendation: {
      action: "Stay",
      financial_score: 85,
      location_score: 92,
      employee_score: 88,
      overall_score: 88,
      justification: "This is the global headquarters with significant investment in owned property. The location is strategic and the facility serves as the company's main corporate presence. Recent and planned renovations will maintain the property's value and functionality."
    },
    market_data: {
      avg_rent_sqft: 65.75,
      vacancy_rate: 0.08,
      trend_direction: "up"
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{property.name}</h2>
          <p className="text-gray-500">{property.address}, {property.city}, {property.state} {property.zip}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Edit</Button>
          <Button>Generate Report</Button>
        </div>
      </div>

      {/* Property Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Type:</span>
                <span className="font-medium">{property.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Employees:</span>
                <span className="font-medium">{property.employees}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Phone:</span>
                <span className="font-medium">{property.phone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status:</span>
                <span className="font-medium text-green-600">{property.lease.owned ? "Owned" : "Leased"}</span>
              </div>
              {!property.lease.owned && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Lease Expiry:</span>
                  <span className="font-medium">{new Date(property.lease.expiry).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Financial Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {!property.lease.owned && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Annual Rent:</span>
                  <span className="font-medium">${(property.lease.annual_rent / 1000000).toFixed(1)}M</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Annual Opex:</span>
                <span className="font-medium">${(property.opex.annual / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Capex Projects:</span>
                <span className="font-medium">{property.capex.ongoing_projects.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Market Rent:</span>
                <span className="font-medium">${property.market_data.avg_rent_sqft}/sqft</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Vacancy Rate:</span>
                <span className="font-medium">{(property.market_data.vacancy_rate * 100).toFixed(1)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommendation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{property.recommendation.action}</div>
                  <div className="text-sm text-gray-500">Recommended Action</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Financial Score:</span>
                  <span className="font-medium">{property.recommendation.financial_score}/100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Location Score:</span>
                  <span className="font-medium">{property.recommendation.location_score}/100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Employee Score:</span>
                  <span className="font-medium">{property.recommendation.employee_score}/100</span>
                </div>
                <div className="flex justify-between text-sm font-semibold">
                  <span>Overall Score:</span>
                  <span>{property.recommendation.overall_score}/100</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="financial">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="financial">Financial Analysis</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="location">Location Analysis</TabsTrigger>
          <TabsTrigger value="projects">Capex Projects</TabsTrigger>
        </TabsList>
        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Operational Expenditure Breakdown</CardTitle>
              <CardDescription>Annual operational costs by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-gray-500">Opex Breakdown Chart will be displayed here</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Utilities:</span>
                    <span className="font-medium">${(property.opex.utilities / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Maintenance:</span>
                    <span className="font-medium">${(property.opex.maintenance / 1000000).toFixed(1)}M</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Security:</span>
                    <span className="font-medium">${(property.opex.security / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Other:</span>
                    <span className="font-medium">${(property.opex.other / 1000000).toFixed(1)}M</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Market Comparison</CardTitle>
              <CardDescription>Current costs vs. market rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-gray-500">Market Comparison Chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="departments">
          <Card>
            <CardHeader>
              <CardTitle>Department Distribution</CardTitle>
              <CardDescription>Employee distribution by department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-gray-500">Department Distribution Chart will be displayed here</p>
              </div>
              <div className="mt-4">
                <h4 className="font-medium mb-2">Departments</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {property.departments.map((dept, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>{dept}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="location">
          <Card>
            <CardHeader>
              <CardTitle>Location Analysis</CardTitle>
              <CardDescription>Proximity to employees and amenities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                <p className="text-gray-500">Location Map will be displayed here</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h4 className="font-medium mb-2">Employee Proximity</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Average Commute:</span>
                      <span className="font-medium">28 minutes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Within 30 min:</span>
                      <span className="font-medium">65%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Public Transit Access:</span>
                      <span className="font-medium">Good</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Nearby Amenities</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Restaurants:</span>
                      <span className="font-medium">12 within 0.5 miles</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Gyms/Fitness:</span>
                      <span className="font-medium">3 within 0.5 miles</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shopping:</span>
                      <span className="font-medium">Major center 1.2 miles</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Capital Expenditure Projects</CardTitle>
              <CardDescription>Ongoing and planned improvement projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Project</th>
                      <th className="text-left py-3 px-4 font-medium">Budget</th>
                      <th className="text-left py-3 px-4 font-medium">Completion Date</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {property.capex.ongoing_projects.map((project, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{project.name}</td>
                        <td className="py-3 px-4">${(project.budget / 1000000).toFixed(1)}M</td>
                        <td className="py-3 px-4">{new Date(project.completion_date).toLocaleDateString()}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-800 ring-1 ring-inset ring-blue-600/20">
                            In Progress
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4">
                <Button variant="outline">Add New Project</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recommendation Justification */}
      <Card>
        <CardHeader>
          <CardTitle>Recommendation Justification</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{property.recommendation.justification}</p>
        </CardContent>
      </Card>
    </div>
  );
}

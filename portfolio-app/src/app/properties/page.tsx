import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PropertiesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Properties</h2>
        <div className="flex space-x-2">
          <Button variant="outline">Filter</Button>
          <Button>Add Property</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Property Card 1 - Global Headquarters */}
        <Card className="overflow-hidden">
          <div className="h-48 bg-gray-200 relative">
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white px-3 py-1">
              Headquarters
            </div>
          </div>
          <CardHeader>
            <CardTitle>Global Headquarters</CardTitle>
            <CardDescription>Purchase, NY</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Employees:</span>
                <span className="font-medium">1,200</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Annual Opex:</span>
                <span className="font-medium">$8.5M</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status:</span>
                <span className="font-medium text-green-600">Owned</span>
              </div>
              <div className="pt-4">
                <Link href="/properties/1">
                  <Button variant="outline" className="w-full">View Details</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Card 2 - Operations Center */}
        <Card className="overflow-hidden">
          <div className="h-48 bg-gray-200 relative">
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white px-3 py-1">
              Operations
            </div>
          </div>
          <CardHeader>
            <CardTitle>Operations Center</CardTitle>
            <CardDescription>O'Fallon, MO</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Employees:</span>
                <span className="font-medium">2,500</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Annual Opex:</span>
                <span className="font-medium">$14.2M</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status:</span>
                <span className="font-medium text-green-600">Owned</span>
              </div>
              <div className="pt-4">
                <Link href="/properties/2">
                  <Button variant="outline" className="w-full">View Details</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Card 3 - New York Office */}
        <Card className="overflow-hidden">
          <div className="h-48 bg-gray-200 relative">
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white px-3 py-1">
              Tech Hub
            </div>
          </div>
          <CardHeader>
            <CardTitle>New York Office</CardTitle>
            <CardDescription>New York, NY</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Employees:</span>
                <span className="font-medium">850</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Annual Opex:</span>
                <span className="font-medium">$6.2M</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Lease Expiry:</span>
                <span className="font-medium text-yellow-600">Aug 2027</span>
              </div>
              <div className="pt-4">
                <Link href="/properties/3">
                  <Button variant="outline" className="w-full">View Details</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Card 4 - Arlington Office */}
        <Card className="overflow-hidden">
          <div className="h-48 bg-gray-200 relative">
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white px-3 py-1">
              Tech Hub
            </div>
          </div>
          <CardHeader>
            <CardTitle>Arlington Office</CardTitle>
            <CardDescription>Arlington, VA</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Employees:</span>
                <span className="font-medium">420</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Annual Opex:</span>
                <span className="font-medium">$2.9M</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Lease Expiry:</span>
                <span className="font-medium text-red-600">Mar 2026</span>
              </div>
              <div className="pt-4">
                <Link href="/properties/4">
                  <Button variant="outline" className="w-full">View Details</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Card 5 - San Francisco Office */}
        <Card className="overflow-hidden">
          <div className="h-48 bg-gray-200 relative">
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white px-3 py-1">
              Tech Hub
            </div>
          </div>
          <CardHeader>
            <CardTitle>San Francisco Office</CardTitle>
            <CardDescription>San Francisco, CA</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Employees:</span>
                <span className="font-medium">580</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Annual Opex:</span>
                <span className="font-medium">$4.8M</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Lease Expiry:</span>
                <span className="font-medium">May 2028</span>
              </div>
              <div className="pt-4">
                <Link href="/properties/5">
                  <Button variant="outline" className="w-full">View Details</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Property Card 6 - Miami Office */}
        <Card className="overflow-hidden">
          <div className="h-48 bg-gray-200 relative">
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white px-3 py-1">
              Regional HQ
            </div>
          </div>
          <CardHeader>
            <CardTitle>Miami Office</CardTitle>
            <CardDescription>Miami, FL</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Employees:</span>
                <span className="font-medium">320</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Annual Opex:</span>
                <span className="font-medium">$2.4M</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Lease Expiry:</span>
                <span className="font-medium">Dec 2027</span>
              </div>
              <div className="pt-4">
                <Link href="/properties/6">
                  <Button variant="outline" className="w-full">View Details</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center mt-6">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  );
}

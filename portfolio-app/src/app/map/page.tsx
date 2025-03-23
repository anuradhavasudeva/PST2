'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock data for Mastercard US office locations
const officeLocations = [
  {
    id: 1,
    name: "Global Headquarters",
    address: "2000 Purchase Street",
    city: "Purchase",
    state: "NY",
    zip: "10577",
    type: "Headquarters",
    lat: 41.0464,
    lng: -73.7142,
    employees: 1200,
    owned: true
  },
  {
    id: 2,
    name: "Operations Center",
    address: "2200 Mastercard Blvd",
    city: "O'Fallon",
    state: "MO",
    zip: "63368",
    type: "Operations",
    lat: 38.8006,
    lng: -90.7662,
    employees: 2500,
    owned: true
  },
  {
    id: 3,
    name: "New York Office",
    address: "150 5th Ave",
    city: "New York",
    state: "NY",
    zip: "10011",
    type: "Tech Hub",
    lat: 40.7395,
    lng: -73.9905,
    employees: 850,
    owned: false
  },
  {
    id: 4,
    name: "Arlington Office",
    address: "4250 Fairfax Dr 11th floor",
    city: "Arlington",
    state: "VA",
    zip: "22203",
    type: "Tech Hub",
    lat: 38.8816,
    lng: -77.1127,
    employees: 420,
    owned: false
  },
  {
    id: 5,
    name: "San Francisco Office",
    address: "123 Mission Street 4th & 5th Floor",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    type: "Tech Hub",
    lat: 37.7909,
    lng: -122.3946,
    employees: 580,
    owned: false
  },
  {
    id: 6,
    name: "Miami Office",
    address: "801 Brickell Ave #1300",
    city: "Miami",
    state: "FL",
    zip: "33131",
    type: "Regional Headquarters",
    lat: 25.7650,
    lng: -80.1936,
    employees: 320,
    owned: false
  },
  {
    id: 7,
    name: "Kansas City Office",
    address: "11530 N Ambassador Dr",
    city: "Kansas City",
    state: "MO",
    zip: "64153",
    type: "Operations",
    lat: 39.2968,
    lng: -94.7177,
    employees: 280,
    owned: false
  },
  {
    id: 8,
    name: "Chicago Office",
    address: "550 W Jackson Blvd",
    city: "Chicago",
    state: "IL",
    zip: "60661",
    type: "Tech Hub",
    lat: 41.8781,
    lng: -87.6298,
    employees: 350,
    owned: false
  },
  {
    id: 9,
    name: "Boston Office",
    address: "125 High Street",
    city: "Boston",
    state: "MA",
    zip: "02110",
    type: "Tech Hub",
    lat: 42.3601,
    lng: -71.0589,
    employees: 290,
    owned: false
  },
  {
    id: 10,
    name: "Atlanta Office",
    address: "1100 Peachtree Street NE",
    city: "Atlanta",
    state: "GA",
    zip: "30309",
    type: "Tech Hub",
    lat: 33.7490,
    lng: -84.3880,
    employees: 260,
    owned: false
  }
];

export default function MapPage() {
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [showEmployeeDensity, setShowEmployeeDensity] = useState(true);
  const [showAmenities, setShowAmenities] = useState(false);
  const [showTransit, setShowTransit] = useState(false);
  const [showMarketRates, setShowMarketRates] = useState(false);

  // Function to initialize the map
  const initializeMap = () => {
    if (window.google && !mapInstance) {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 39.8283, lng: -98.5795 }, // Center of US
        zoom: 4,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });
      
      setMapInstance(map);
      
      // Create markers for each office location
      const newMarkers = officeLocations.map(office => {
        // Determine marker icon based on office type
        let iconUrl = '';
        let iconSize = new window.google.maps.Size(24, 24);
        
        switch(office.type) {
          case 'Headquarters':
            iconUrl = 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
            iconSize = new window.google.maps.Size(32, 32);
            break;
          case 'Tech Hub':
            iconUrl = 'https://maps.google.com/mapfiles/ms/icons/green-dot.png';
            break;
          case 'Operations':
            iconUrl = 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
            break;
          case 'Regional Headquarters':
            iconUrl = 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png';
            break;
          default:
            iconUrl = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
        }
        
        const marker = new window.google.maps.Marker({
          position: { lat: office.lat, lng: office.lng },
          map: map,
          title: office.name,
          icon: {
            url: iconUrl,
            scaledSize: iconSize
          },
          animation: window.google.maps.Animation.DROP
        });
        
        // Create info window for each marker
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; max-width: 200px;">
              <h3 style="margin: 0 0 5px 0; font-size: 16px;">${office.name}</h3>
              <p style="margin: 0 0 5px 0; font-size: 12px;">${office.address}, ${office.city}, ${office.state}</p>
              <p style="margin: 0 0 5px 0; font-size: 12px;">Employees: ${office.employees}</p>
              <p style="margin: 0; font-size: 12px;">Status: ${office.owned ? 'Owned' : 'Leased'}</p>
            </div>
          `
        });
        
        // Add click event to marker
        marker.addListener('click', () => {
          // Close any open info windows
          markers.forEach(m => m.infoWindow.close());
          
          // Open this info window
          infoWindow.open(map, marker);
          
          // Set selected office
          setSelectedOffice(office);
        });
        
        return { marker, infoWindow, office };
      });
      
      setMarkers(newMarkers);
      
      // Add circles to represent employee density if enabled
      if (showEmployeeDensity) {
        officeLocations.forEach(office => {
          const circle = new window.google.maps.Circle({
            strokeColor: '#FF6B6B',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF6B6B',
            fillOpacity: 0.15,
            map: map,
            center: { lat: office.lat, lng: office.lng },
            radius: office.employees * 20 // Scale circle size based on employee count
          });
        });
      }
    }
  };

  // Load Google Maps script
  useEffect(() => {
    if (!window.google) {
      // For a real application, you would use an actual API key
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=DEMO_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setMapLoaded(true);
        initializeMap();
      };
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(script);
      };
    } else {
      setMapLoaded(true);
      initializeMap();
    }
  }, []);

  // Update map when filters change
  useEffect(() => {
    if (mapInstance && markers.length > 0) {
      // Update employee density circles
      // In a real application, we would implement this functionality
      console.log("Filter changed:", { 
        showEmployeeDensity, 
        showAmenities, 
        showTransit, 
        showMarketRates 
      });
    }
  }, [showEmployeeDensity, showAmenities, showTransit, showMarketRates, mapInstance, markers]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Map View</h2>
        <div className="flex space-x-2">
          <Button variant="outline">Filter</Button>
          <Button>Export Map</Button>
        </div>
      </div>

      {/* Map Container */}
      <Card>
        <CardContent className="p-0">
          <div id="map" className="h-[600px] bg-gray-100 relative">
            {!mapLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-500">Loading map...</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Map Legend and Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span>Headquarters</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>Tech Hubs</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span>Operations Centers</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                <span>Regional Headquarters</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded border-2 border-green-500"></div>
                <span>Owned Properties</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded border-2 border-blue-500"></div>
                <span>Leased - Long Term</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded border-2 border-yellow-500"></div>
                <span>Leased - Expiring Soon</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded border-2 border-red-500"></div>
                <span>Recommended for Relocation</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Map Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="show-employees" 
                  className="rounded" 
                  checked={showEmployeeDensity}
                  onChange={(e) => setShowEmployeeDensity(e.target.checked)}
                />
                <label htmlFor="show-employees">Show Employee Density</label>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="show-amenities" 
                  className="rounded"
                  checked={showAmenities}
                  onChange={(e) => setShowAmenities(e.target.checked)}
                />
                <label htmlFor="show-amenities">Show Nearby Amenities</label>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="show-transit" 
                  className="rounded"
                  checked={showTransit}
                  onChange={(e) => setShowTransit(e.target.checked)}
                />
                <label htmlFor="show-transit">Show Transit Options</label>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="show-market" 
                  className="rounded"
                  checked={showMarketRates}
                  onChange={(e) => setShowMarketRates(e.target.checked)}
                />
                <label htmlFor="show-market">Show Market Rates Overlay</label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Property Quick View */}
      <Card>
        <CardHeader>
          <CardTitle>Properties Overview</CardTitle>
          <CardDescription>
            {selectedOffice ? `Selected: ${selectedOffice.name}` : 'Click on a property on the map to see details'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Property</th>
                  <th className="text-left py-3 px-4 font-medium">Location</th>
                  <th className="text-left py-3 px-4 font-medium">Type</th>
                  <th className="text-left py-3 px-4 font-medium">Employees</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {officeLocations.slice(0, 5).map(office => (
                  <tr 
                    key={office.id} 
                    className={`border-b hover:bg-gray-50 ${selectedOffice && selectedOffice.id === office.id ? 'bg-blue-50' : ''}`}
                  >
                    <td className="py-3 px-4">{office.name}</td>
                    <td className="py-3 px-4">{office.city}, {office.state}</td>
                    <td className="py-3 px-4">{office.type}</td>
                    <td className="py-3 px-4">{office.employees}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                        office.owned 
                          ? 'bg-green-50 text-green-800 ring-green-600/20' 
                          : 'bg-yellow-50 text-yellow-800 ring-yellow-600/20'
                      }`}>
                        {office.owned ? 'Owned' : 'Leased'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          // Find and click the corresponding marker
                          const marker = markers.find(m => m.office.id === office.id);
                          if (marker) {
                            window.google.maps.event.trigger(marker.marker, 'click');
                          }
                        }}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

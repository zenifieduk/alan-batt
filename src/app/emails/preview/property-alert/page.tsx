'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Property {
  id: string;
  title: string;
  address: string;
  price: string;
  description: string;
  image: string;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  status: 'new' | 'reduced' | 'featured';
  daysOnMarket?: number;
}

const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Newly Listed - Family Home',
    address: 'Orchard Lane, Aspull, WN2',
    price: '£325,000',
    description: 'Beautiful 3-bedroom family home with garden and garage. Recently renovated throughout.',
    image: '/api/placeholder/400/300',
    bedrooms: 3,
    bathrooms: 1,
    propertyType: 'Semi-Detached',
    status: 'new',
    daysOnMarket: 1
  },
  {
    id: '2',
    title: 'Price Reduced - Investment Property',
    address: 'Church Street, Hindley, WN2',
    price: '£280,000',
    description: 'Great investment opportunity. Currently tenanted with good rental yield.',
    image: '/api/placeholder/400/300',
    bedrooms: 3,
    bathrooms: 1,
    propertyType: 'Terraced',
    status: 'reduced',
    daysOnMarket: 15
  },
  {
    id: '3',
    title: 'Just Added - Modern Apartment',
    address: 'Wigan Central, WN1',
    price: '£185,000',
    description: 'Contemporary 2-bedroom apartment in the heart of Wigan. Perfect for professionals.',
    image: '/api/placeholder/400/300',
    bedrooms: 2,
    bathrooms: 1,
    propertyType: 'Apartment',
    status: 'new',
    daysOnMarket: 2
  }
];

export default function PropertyAlertPreview() {
  const [properties] = useState<Property[]>(mockProperties);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">NEW</span>;
      case 'reduced':
        return <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">REDUCED</span>;
      case 'featured':
        return <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">FEATURED</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Email Container */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl">🏠</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Alan Batt</h1>
              <p className="text-green-100">Estate Agents</p>
            </div>
          </div>
          <p className="text-xl font-semibold">Property Alert</p>
          <p className="text-green-100 mt-2">Latest Properties Just Added to Our Portfolio</p>
        </div>

        {/* Navigation Bar */}
        <div className="bg-gray-100 p-4">
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="text-green-600 hover:text-green-800 font-medium">Find a property</a>
            <a href="#" className="text-green-600 hover:text-green-800 font-medium">Book a valuation</a>
            <a href="#" className="text-green-600 hover:text-green-800 font-medium">Contact us</a>
          </div>
        </div>

        {/* Alert Introduction */}
        <div className="p-8 border-b border-gray-200 bg-green-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">New Properties Available</h2>
            <p className="text-gray-700 mb-4">
              We&apos;ve just added these fantastic properties to our portfolio. 
              Don&apos;t miss out on these opportunities - they&apos;re likely to go quickly!
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                View All Properties
              </button>
              <button className="border border-green-600 text-green-600 px-6 py-2 rounded-lg hover:bg-green-50 transition-colors font-semibold">
                Set Up Alerts
              </button>
            </div>
          </div>
        </div>

        {/* Properties List */}
        <div className="p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Latest Listings</h3>
          
          <div className="space-y-6">
            {properties.map((property) => (
              <div key={property.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/3 relative">
                    <img 
                      src={property.image} 
                      alt={property.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      {getStatusBadge(property.status)}
                    </div>
                    {property.daysOnMarket && (
                      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {property.daysOnMarket} day{property.daysOnMarket !== 1 ? 's' : ''} on market
                      </div>
                    )}
                  </div>
                  
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-xl font-bold text-gray-900">{property.title}</h4>
                      <p className="text-2xl font-bold text-green-600">{property.price}</p>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{property.address}</p>
                    
                    <div className="flex space-x-4 mb-4 text-sm text-gray-600">
                      <span>🏠 {property.propertyType}</span>
                      <span>🛏️ {property.bedrooms} beds</span>
                      <span>🚿 {property.bathrooms} baths</span>
                    </div>
                    
                    <p className="text-gray-700 mb-6 leading-relaxed">{property.description}</p>
                    
                    <div className="flex space-x-3">
                      <button className="flex-1 bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors font-medium">
                        Book Viewing
                      </button>
                      <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-200 transition-colors font-medium">
                        View Details
                      </button>
                      <button className="px-4 py-2 border border-green-600 text-green-600 rounded text-sm hover:bg-green-50 transition-colors font-medium">
                        Contact Agent
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="p-8 border-b border-gray-200 bg-gray-50">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Market Snapshot</h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">3</div>
              <div className="text-sm text-gray-600">New Properties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">45</div>
              <div className="text-sm text-gray-600">Avg Days on Market</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
              <div className="text-sm text-gray-600">Properties Sold This Month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">£285K</div>
              <div className="text-sm text-gray-600">Average Price</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-green-50 p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Don&apos;t Miss Out on Great Properties</h3>
          <p className="text-gray-600 mb-6">
            Set up property alerts to be notified as soon as new properties matching your criteria become available.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
              Set Up Property Alerts
            </button>
            <button className="border border-green-600 text-green-600 px-8 py-3 rounded-lg hover:bg-green-50 transition-colors font-semibold">
              Book a Valuation
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-800 text-white p-8 text-center">
          <div className="mb-4">
            <h4 className="text-xl font-bold mb-2">Alan Batt Estate Agents</h4>
            <p className="text-gray-300">Your trusted partner in property</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <h5 className="font-semibold mb-2">Contact</h5>
              <p className="text-gray-300 text-sm">📞 01942 123 456</p>
              <p className="text-gray-300 text-sm">📧 info@alanbatt.co.uk</p>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Services</h5>
              <p className="text-gray-300 text-sm">🏠 Sales</p>
              <p className="text-gray-300 text-sm">🔑 Lettings</p>
            </div>
            <div>
              <h5 className="font-semibold mb-2">Follow Us</h5>
              <p className="text-gray-300 text-sm">📱 Facebook</p>
              <p className="text-gray-300 text-sm">📸 Instagram</p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-4">
            <p className="text-gray-400 text-sm">
              © 2025 Alan Batt Estate Agents. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Preview Controls */}
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 border">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-700">Preview Mode</span>
          <Link
            href="/emails"
            className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-colors"
          >
            Back to Templates
          </Link>
        </div>
      </div>
    </div>
  );
}

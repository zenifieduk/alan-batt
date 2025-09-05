'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Property {
  id: string;
  title: string;
  address: string;
  price: string;
  image: string;
  type: string;
  seasonalFeature: string;
}

const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Cozy Winter Family Home',
    address: 'Winstanley, WN3',
    price: '£425,000',
    image: '/api/placeholder/300/200',
    type: 'Semi-Detached',
    seasonalFeature: 'Perfect for winter with log burner and double glazing'
  },
  {
    id: '2',
    title: 'Summer Garden Paradise',
    address: 'Standish, WN6',
    price: '£375,000',
    image: '/api/placeholder/300/200',
    type: 'Detached',
    seasonalFeature: 'Large garden perfect for summer entertaining'
  }
];

export default function SeasonalSpecialPreview() {
  const [properties] = useState<Property[]>(mockProperties);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Email Container */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl">🍂</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Alan Batt</h1>
              <p className="text-orange-100">Estate Agents</p>
            </div>
          </div>
          <p className="text-xl font-semibold">Autumn Property Special</p>
          <p className="text-orange-100 mt-2">Cozy Homes Perfect for the Changing Seasons</p>
        </div>

        {/* Navigation Bar */}
        <div className="bg-gray-100 p-4">
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="text-orange-600 hover:text-orange-800 font-medium">Find a property</a>
            <a href="#" className="text-orange-600 hover:text-orange-800 font-medium">Book a valuation</a>
            <a href="#" className="text-orange-600 hover:text-orange-800 font-medium">Contact us</a>
          </div>
        </div>

        {/* Seasonal Introduction */}
        <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-red-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Autumn</h2>
            <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
              As the leaves change color and the weather cools, it&apos;s the perfect time to find your dream home. 
              Autumn brings unique opportunities in the property market, with many sellers looking to complete 
              transactions before the winter months.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors font-semibold">
                View Autumn Properties
              </button>
              <button className="border border-orange-600 text-orange-600 px-6 py-2 rounded-lg hover:bg-orange-50 transition-colors font-semibold">
                Seasonal Tips
              </button>
            </div>
          </div>
        </div>

        {/* Seasonal Tips */}
        <div className="p-8 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Autumn Property Tips</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-orange-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">🍂 Why Autumn is Great for Buyers</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Less competition from other buyers</li>
                <li>• Sellers often more motivated</li>
                <li>• Better chance of negotiating prices</li>
                <li>• Can see properties in different weather</li>
              </ul>
            </div>
            
            <div className="bg-red-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">🏠 What to Look For</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Heating systems and insulation</li>
                <li>• Double glazing and draft proofing</li>
                <li>• Garden drainage and maintenance</li>
                <li>• Roof condition and gutters</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Featured Properties */}
        <div className="p-8 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Seasonal Property Highlights</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {properties.map((property) => (
              <div key={property.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">{property.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{property.address}</p>
                  <p className="text-lg font-bold text-green-600 mb-2">{property.price}</p>
                  <p className="text-sm text-gray-600 mb-3">{property.type}</p>
                  <p className="text-sm text-orange-600 mb-4 italic">{property.seasonalFeature}</p>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-200 transition-colors">
                      View Details
                    </button>
                    <button className="flex-1 bg-orange-600 text-white px-4 py-2 rounded text-sm hover:bg-orange-700 transition-colors">
                      Book Viewing
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seasonal Market Update */}
        <div className="p-8 border-b border-gray-200 bg-orange-50">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Autumn Market Update</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Autumn 2025 Trends</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-orange-500 text-xl">📈</span>
                  <span className="text-gray-700">Family homes in high demand</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-red-500 text-xl">🏠</span>
                  <span className="text-gray-700">Properties with gardens popular</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-500 text-xl">💰</span>
                  <span className="text-gray-700">Good negotiation opportunities</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Seasonal Advice</h4>
              <p className="text-gray-700 leading-relaxed">
                Autumn is an excellent time to buy property. The market typically sees a slight dip in activity, 
                giving buyers more negotiating power. Properties with good heating and insulation become 
                particularly attractive as the weather cools.
              </p>
            </div>
          </div>
        </div>

        {/* Special Offers */}
        <div className="p-8 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Autumn Special Offers</h3>
          
          <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-lg p-6">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">🎃 Halloween Special</h4>
              <p className="text-gray-700 mb-4">
                Book a viewing this month and receive a free property valuation for your current home!
              </p>
              <div className="bg-white rounded-lg p-4 inline-block">
                <p className="text-2xl font-bold text-orange-600">Free Valuation</p>
                <p className="text-sm text-gray-600">Worth £150</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-orange-50 p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Ready for Your Autumn Property Search?</h3>
          <p className="text-gray-600 mb-6">
            Don&apos;t let the changing seasons slow down your property search. Autumn offers unique opportunities 
            to find your perfect home.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold">
              Start Your Search
            </button>
            <button className="border border-orange-600 text-orange-600 px-8 py-3 rounded-lg hover:bg-orange-50 transition-colors font-semibold">
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
            className="bg-orange-600 text-white px-4 py-2 rounded text-sm hover:bg-orange-700 transition-colors"
          >
            Back to Templates
          </Link>
        </div>
      </div>
    </div>
  );
}

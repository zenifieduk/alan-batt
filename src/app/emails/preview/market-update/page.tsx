'use client';

import { useState } from 'react';
import Link from 'next/link';

interface MarketData {
  averagePrice: string;
  priceChange: string;
  daysOnMarket: string;
  propertiesSold: string;
  marketTrend: 'up' | 'down' | 'stable';
}

const mockMarketData: MarketData = {
  averagePrice: '£285,000',
  priceChange: '+2.3%',
  daysOnMarket: '45',
  propertiesSold: '127',
  marketTrend: 'up'
};

const mockProperties = [
  {
    id: '1',
    title: 'Modern Family Home',
    address: 'Wigan Central',
    price: '£425,000',
    image: '/api/placeholder/300/200',
    type: 'Detached'
  },
  {
    id: '2',
    title: 'Investment Property',
    address: 'Wigan North',
    price: '£185,000',
    image: '/api/placeholder/300/200',
    type: 'Semi-Detached'
  }
];

export default function MarketUpdatePreview() {
  const [marketData] = useState<MarketData>(mockMarketData);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Email Container */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Alan Batt</h1>
              <p className="text-purple-100">Estate Agents</p>
            </div>
          </div>
          <p className="text-xl font-semibold">Wigan Property Market Update</p>
          <p className="text-purple-100 mt-2">August 2025 - Your Monthly Market Insights</p>
        </div>

        {/* Navigation Bar */}
        <div className="bg-gray-100 p-4">
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">Find a property</a>
            <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">Book a valuation</a>
            <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">Contact us</a>
          </div>
        </div>

        {/* Market Overview */}
        <div className="p-8 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Market Overview</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{marketData.averagePrice}</div>
              <div className="text-sm text-blue-700">Average Price</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{marketData.priceChange}</div>
              <div className="text-sm text-green-700">Price Change</div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">{marketData.daysOnMarket}</div>
              <div className="text-sm text-orange-700">Days on Market</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{marketData.propertiesSold}</div>
              <div className="text-sm text-purple-700">Properties Sold</div>
            </div>
          </div>

          {/* Market Trend */}
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Trend</h3>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl">
                {marketData.marketTrend === 'up' ? '📈' : marketData.marketTrend === 'down' ? '📉' : '➡️'}
              </span>
              <span className="text-lg font-medium text-gray-700">
                {marketData.marketTrend === 'up' ? 'Market is trending upward' : 
                 marketData.marketTrend === 'down' ? 'Market is trending downward' : 'Market is stable'}
              </span>
            </div>
          </div>
        </div>

        {/* Market Analysis */}
        <div className="p-8 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Market Analysis</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">What&apos;s Driving the Market?</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Strong buyer demand</p>
                    <p className="text-sm text-gray-600">First-time buyers and families are actively searching</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Limited supply</p>
                    <p className="text-sm text-gray-600">Fewer properties coming to market</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Interest rate stability</p>
                    <p className="text-sm text-gray-600">Mortgage rates remain competitive</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">What to Expect</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Continued price growth</p>
                    <p className="text-sm text-gray-600">Moderate increases expected</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Seasonal adjustments</p>
                    <p className="text-sm text-gray-600">Autumn market typically strong</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Investment opportunities</p>
                    <p className="text-sm text-gray-600">Rental yields remain attractive</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Properties */}
        <div className="p-8 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Featured Properties</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {mockProperties.map((property) => (
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
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-200 transition-colors">
                      View Details
                    </button>
                    <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700 transition-colors">
                      Book Viewing
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expert Insights */}
        <div className="p-8 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Expert Insights</h3>
          
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">👨‍💼</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Alan Batt - Market Expert</h4>
                <p className="text-gray-700 leading-relaxed">
                  &ldquo;The Wigan property market continues to show resilience with strong fundamentals. 
                  We&apos;re seeing increased activity from both buyers and sellers, creating a balanced market. 
                  For sellers, this is an excellent time to list as demand remains high. For buyers, 
                  while prices are rising, the market offers good value compared to surrounding areas.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-purple-50 p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Stay Informed About Your Local Market</h3>
          <p className="text-gray-600 mb-6">
            Get monthly market updates, property alerts, and expert insights delivered to your inbox.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
              Subscribe to Updates
            </button>
            <button className="border border-purple-600 text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-50 transition-colors font-semibold">
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
            className="bg-purple-600 text-white px-4 py-2 rounded text-sm hover:bg-purple-700 transition-colors"
          >
            Back to Templates
          </Link>
        </div>
      </div>
    </div>
  );
}

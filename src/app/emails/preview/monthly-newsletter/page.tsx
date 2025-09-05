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
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
}

const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Family Home in Winstanley',
    address: 'Rylance Road, Winstanley, WN3',
    price: '£400,000',
    image: '/api/placeholder/300/200',
    type: 'Semi-Detached'
  },
  {
    id: '2',
    title: 'Modern Apartment',
    address: 'Wigan Central, WN1',
    price: '£185,000',
    image: '/api/placeholder/300/200',
    type: 'Apartment'
  },
  {
    id: '3',
    title: 'Investment Property',
    address: 'Hindley, WN2',
    price: '£280,000',
    image: '/api/placeholder/300/200',
    type: 'Terraced'
  }
];

const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Wigan Property Market - August 2025 Update',
    excerpt: 'Discover the latest trends, price movements, and market insights for the Wigan property market this month.',
    image: '/api/placeholder/300/200',
    category: 'Market Update'
  },
  {
    id: '2',
    title: 'Top 5 Tips for First-Time Buyers in 2025',
    excerpt: 'Essential advice for first-time buyers navigating the current property market conditions.',
    image: '/api/placeholder/300/200',
    category: 'Buying Guide'
  }
];

export default function MonthlyNewsletterPreview() {
  const [properties] = useState<Property[]>(mockProperties);
  const [blogPosts] = useState<BlogPost[]>(mockBlogPosts);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Email Container */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl">📧</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Alan Batt</h1>
              <p className="text-purple-100">Estate Agents</p>
            </div>
          </div>
          <p className="text-xl font-semibold">Monthly Newsletter</p>
          <p className="text-purple-100 mt-2">August 2025 - Your Complete Property Update</p>
        </div>

        {/* Navigation Bar */}
        <div className="bg-gray-100 p-4">
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">Find a property</a>
            <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">Book a valuation</a>
            <a href="#" className="text-purple-600 hover:text-purple-800 font-medium">Contact us</a>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="p-8 border-b border-gray-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Our Monthly Newsletter</h2>
            <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
              Thank you for subscribing to our monthly property newsletter. This month we bring you the latest 
              properties, market insights, expert advice, and company updates. We hope you find this information 
              valuable in your property journey.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                View All Properties
              </button>
              <button className="border border-purple-600 text-purple-600 px-6 py-2 rounded-lg hover:bg-purple-50 transition-colors font-semibold">
                Book a Valuation
              </button>
            </div>
          </div>
        </div>

        {/* Featured Properties */}
        <div className="p-8 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Featured Properties</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
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

        {/* Blog Posts */}
        <div className="p-8 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Latest Articles & Insights</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <div key={post.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mb-2">
                    {post.category}
                  </span>
                  <h4 className="font-semibold text-gray-900 mb-2">{post.title}</h4>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  
                  <button className="w-full bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors font-medium">
                    Read Full Article
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Update */}
        <div className="p-8 border-b border-gray-200 bg-blue-50">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Market Update</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">August 2025 Highlights</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-green-500 text-xl">📈</span>
                  <span className="text-gray-700">Average prices up 2.3% this month</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-blue-500 text-xl">🏠</span>
                  <span className="text-gray-700">127 properties sold in Wigan</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-purple-500 text-xl">⏱️</span>
                  <span className="text-gray-700">Average time on market: 45 days</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">What&apos;s Next?</h4>
              <p className="text-gray-700 leading-relaxed">
                The autumn market is expected to be strong with continued buyer demand. 
                We&apos;re seeing increased activity from families looking to move before the new school year.
              </p>
            </div>
          </div>
        </div>

        {/* Company News */}
        <div className="p-8 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Company News & Updates</h3>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🏆</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Alan Batt Wins Best Estate Agent Award</h4>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We&apos;re delighted to announce that Alan Batt Estate Agents has been named 
                  &ldquo;Best Estate Agent in Wigan&rdquo; for the third consecutive year at the 
                  North West Property Awards 2025.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  This recognition reflects our commitment to providing exceptional service 
                  and our deep understanding of the local property market.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="p-8 border-b border-gray-200 bg-gray-50">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Follow Us on Social Media</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-3xl mb-3">📱</div>
              <h4 className="font-semibold text-gray-900 mb-2">Facebook</h4>
              <p className="text-gray-600 text-sm mb-3">Get daily property updates and market insights</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors">
                Follow Us
              </button>
            </div>
            
            <div className="text-center p-4">
              <div className="text-3xl mb-3">📸</div>
              <h4 className="font-semibold text-gray-900 mb-2">Instagram</h4>
              <p className="text-gray-600 text-sm mb-3">Beautiful property photography and behind-the-scenes</p>
              <button className="bg-pink-600 text-white px-4 py-2 rounded text-sm hover:bg-pink-700 transition-colors">
                Follow Us
              </button>
            </div>
            
            <div className="text-center p-4">
              <div className="text-3xl mb-3">💼</div>
              <h4 className="font-semibold text-gray-900 mb-2">LinkedIn</h4>
              <p className="text-gray-600 text-sm mb-3">Professional insights and company updates</p>
              <button className="bg-blue-700 text-white px-4 py-2 rounded text-sm hover:bg-blue-800 transition-colors">
                Follow Us
              </button>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-purple-50 p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Take the Next Step?</h3>
          <p className="text-gray-600 mb-6">
            Whether you&apos;re looking to buy, sell, or just want to stay informed about the local property market, 
            we&apos;re here to help.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
              Contact Us Today
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
            <p className="text-gray-400 text-sm mt-2">
              You&apos;re receiving this email because you subscribed to our newsletter. 
              <a href="#" className="text-gray-300 hover:text-white ml-1">Unsubscribe</a>
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

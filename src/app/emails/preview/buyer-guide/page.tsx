'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Tip {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
}

const mockTips: Tip[] = [
  {
    id: '1',
    title: 'Get Your Finances in Order',
    description: 'Before you start viewing properties, ensure you have a mortgage agreement in principle and know your budget limits.',
    icon: '💰',
    category: 'Financial'
  },
  {
    id: '2',
    title: 'Research the Area',
    description: 'Visit the area at different times of day, check local schools, transport links, and amenities.',
    icon: '🔍',
    category: 'Research'
  },
  {
    id: '3',
    title: 'Don&apos;t Skip the Survey',
    description: 'A professional survey can reveal hidden issues that could cost you thousands in repairs.',
    icon: '🏠',
    category: 'Due Diligence'
  },
  {
    id: '4',
    title: 'Negotiate Wisely',
    description: 'Start with a reasonable offer based on market research, not just the asking price.',
    icon: '🤝',
    category: 'Negotiation'
  }
];

export default function BuyerGuidePreview() {
  const [tips] = useState<Tip[]>(mockTips);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Email Container */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl">📚</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Alan Batt</h1>
              <p className="text-teal-100">Estate Agents</p>
            </div>
          </div>
          <p className="text-xl font-semibold">First-Time Buyer Guide</p>
          <p className="text-teal-100 mt-2">Essential Tips for Your Property Journey</p>
        </div>

        {/* Navigation Bar */}
        <div className="bg-gray-100 p-4">
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="text-teal-600 hover:text-teal-800 font-medium">Find a property</a>
            <a href="#" className="text-teal-600 hover:text-teal-800 font-medium">Book a valuation</a>
            <a href="#" className="text-teal-600 hover:text-teal-800 font-medium">Contact us</a>
          </div>
        </div>

        {/* Introduction */}
        <div className="p-8 border-b border-gray-200 bg-teal-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Complete Buying Guide</h2>
            <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
              Buying your first home is one of the biggest decisions you&apos;ll ever make. This guide is designed 
              to help you navigate the process with confidence, from initial research to moving day.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors font-semibold">
                Download Full Guide
              </button>
              <button className="border border-teal-600 text-teal-600 px-6 py-2 rounded-lg hover:bg-teal-50 transition-colors font-semibold">
                Book Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Essential Tips */}
        <div className="p-8 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Essential Buying Tips</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip) => (
              <div key={tip.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{tip.icon}</div>
                  <div>
                    <span className="inline-block bg-teal-100 text-teal-800 px-2 py-1 rounded text-xs font-medium mb-2">
                      {tip.category}
                    </span>
                    <h4 className="font-semibold text-gray-900 mb-2">{tip.title}</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{tip.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buying Process */}
        <div className="p-8 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">The Buying Process</h3>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <h4 className="font-semibold text-gray-900">Research & Planning</h4>
                <p className="text-gray-600 text-sm">Define your needs, research areas, and get your finances in order</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <h4 className="font-semibold text-gray-900">Property Search</h4>
                <p className="text-gray-600 text-sm">View properties, attend open houses, and shortlist your favorites</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <h4 className="font-semibold text-gray-900">Making an Offer</h4>
                <p className="text-gray-600 text-sm">Negotiate the price and terms with the seller</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
              <div>
                <h4 className="font-semibold text-gray-900">Legal Process</h4>
                <p className="text-gray-600 text-sm">Conveyancing, surveys, and finalizing the purchase</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
              <div>
                <h4 className="font-semibold text-gray-900">Completion</h4>
                <p className="text-gray-600 text-sm">Exchange contracts and move into your new home</p>
              </div>
            </div>
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="p-8 border-b border-gray-200 bg-red-50">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Common Mistakes to Avoid</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-red-200">
              <h4 className="font-semibold text-gray-900 mb-4 text-red-600">❌ Don&apos;t Skip the Survey</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                While it might seem like an extra cost, a professional survey can save you thousands 
                by identifying hidden structural issues or necessary repairs.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-red-200">
              <h4 className="font-semibold text-gray-900 mb-4 text-red-600">❌ Don&apos;t Rush the Decision</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Take your time to view multiple properties and don&apos;t feel pressured to make an offer 
                immediately. This is a major investment decision.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-red-200">
              <h4 className="font-semibold text-gray-900 mb-4 text-red-600">❌ Don&apos;t Ignore Hidden Costs</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Factor in stamp duty, legal fees, moving costs, and any immediate repairs or renovations 
                when calculating your total budget.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-red-200">
              <h4 className="font-semibold text-gray-900 mb-4 text-red-600">❌ Don&apos;t Forget About the Area</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Research the neighborhood thoroughly - visit at different times, check crime rates, 
                and consider future development plans that might affect the area.
              </p>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="p-8 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Helpful Resources</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="text-3xl mb-3">📋</div>
              <h4 className="font-semibold text-gray-900 mb-2">Buying Checklist</h4>
              <p className="text-gray-600 text-sm mb-4">Complete checklist for first-time buyers</p>
              <button className="bg-teal-600 text-white px-4 py-2 rounded text-sm hover:bg-teal-700 transition-colors">
                Download
              </button>
            </div>
            
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="text-3xl mb-3">💰</div>
              <h4 className="font-semibold text-gray-900 mb-2">Cost Calculator</h4>
              <p className="text-gray-600 text-sm mb-4">Calculate all your buying costs</p>
              <button className="bg-teal-600 text-white px-4 py-2 rounded text-sm hover:bg-teal-700 transition-colors">
                Use Calculator
              </button>
            </div>
            
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="text-3xl mb-3">📞</div>
              <h4 className="font-semibold text-gray-900 mb-2">Expert Advice</h4>
              <p className="text-gray-600 text-sm mb-4">Book a free consultation</p>
              <button className="bg-teal-600 text-white px-4 py-2 rounded text-sm hover:bg-teal-700 transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-teal-50 p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to Start Your Property Journey?</h3>
          <p className="text-gray-600 mb-6">
            Our team of experts is here to guide you through every step of the buying process. 
            Get in touch today for personalized advice and support.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold">
              Book Free Consultation
            </button>
            <button className="border border-teal-600 text-teal-600 px-8 py-3 rounded-lg hover:bg-teal-50 transition-colors font-semibold">
              Download Full Guide
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
            className="bg-teal-600 text-white px-4 py-2 rounded text-sm hover:bg-teal-700 transition-colors"
          >
            Back to Templates
          </Link>
        </div>
      </div>
    </div>
  );
}

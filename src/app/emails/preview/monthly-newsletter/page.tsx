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
  receptions: number;
  sqft: number;
  propertyType: string;
}

// Real property data from Alan Batt
const realProperties: Property[] = [
  {
    id: '1',
    title: 'Grove Road, Upholland, WN8',
    address: 'Grove Road, Upholland, WN8',
    price: '£775,000',
    description: 'Set within approximately 0.5 acres of mature gardens occupying an elevated plot with sweeping lawns and far reaching views across Winter Hill in the heart of the historic village of Upholland, is this fantastic property that stands out from the rest with an impressive double fronted façade making for a dramatic yet charming impression. The property embraces the individual nuances of times gone by but with a keen eye for detail and modern convenience.',
    image: '/property-images/Grove-Road-image-1.jpg',
    bedrooms: 5,
    bathrooms: 4,
    receptions: 4,
    sqft: 3210,
    propertyType: 'Detached'
  },
  {
    id: '2',
    title: 'Bannister Way, Winstanley, WN3',
    address: 'Bannister Way, Winstanley, WN3',
    price: '£375,000 In Excess of',
    description: 'Introducing this exceptional five-bedroom detached residence—a harmonious blend of elegance, comfort, and lifestyle convenience. A spacious entrance hall welcomes you, offering access to key ground floor rooms and a separate water closet. The generous living room features bay windows and a charming fireplace, perfect for relaxed evenings or stylish entertaining.',
    image: '/property-images/Bannister-Way-image-1.jpg',
    bedrooms: 5,
    bathrooms: 2,
    receptions: 1,
    sqft: 1321,
    propertyType: 'Detached'
  },
  {
    id: '3',
    title: 'Tideswell Avenue, Orrell, WN5',
    address: 'Tideswell Avenue, Orrell, WN5',
    price: '£450,000 Offers in Region of',
    description: 'This exquisite 6-bedroom detached house offers a perfect blend of modern design and everyday functionality. Located in the sought-after area of Orrell, this property provides exceptional family living space with contemporary finishes throughout.',
    image: '/property-images/Tideswell-Avenue-image-1.jpg',
    bedrooms: 6,
    bathrooms: 3,
    receptions: 2,
    sqft: 1566,
    propertyType: 'Detached'
  }
];

export default function MonthlyNewsletterPreview() {
  const [mainProperty] = useState<Property>(realProperties[0]);
  const [secondaryProperties] = useState<Property[]>(realProperties.slice(1));

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Email Container */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg">
        {/* Top Header - Alan Batt Blue */}
        <div className="bg-[#29377c] text-white p-6">
          <div className="flex justify-between items-start">
            {/* Left - View in browser */}
            <div className="text-gray-300 text-sm">
              <a href="#" className="hover:text-white">View in browser</a>
            </div>
            
            {/* Center - Logo */}
            <div className="text-center">
              <img 
                src="/alan-batt-logo.svg" 
                alt="Alan Batt Sales & Lettings" 
                className="h-16 mx-auto mb-2"
              />
              <p className="text-gray-300 text-sm">SALES & LETTINGS</p>
            </div>
            
            {/* Right - Navigation */}
            <div className="text-right space-y-2">
              <div><a href="#" className="text-white hover:text-gray-200 text-sm">Find a property</a></div>
              <div><a href="#" className="text-white hover:text-gray-200 text-sm">Book a valuation</a></div>
              <div><a href="#" className="text-white hover:text-gray-200 text-sm">Contact us</a></div>
            </div>
          </div>
        </div>

        {/* Main Content Area - White Background */}
        <div className="p-8">
          {/* Introduction Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">August Newsletter</h2>
            <p className="text-gray-600 mb-4 max-w-3xl mx-auto">
              Welcome to our Monthly Newsletter. Here we showcase the latest properties, market insights, and updates from Alan Batt.
            </p>
            <p className="text-gray-600 max-w-3xl mx-auto">
              If you would like to arrange a viewing on any of the below properties or have one that you would like to sell or let, then please{' '}
              <a href="#" className="text-[#058895] underline hover:text-[#047a85]">contact us</a>.
            </p>
          </div>

          {/* Featured Property - Grove Road */}
          <div className="mb-12">
            {/* Main Image */}
            <div className="mb-4">
              <img 
                src={mainProperty.image} 
                alt={mainProperty.title}
                className="w-full h-80 object-cover rounded-lg"
              />
            </div>
            
            {/* Gallery Images */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <img src="/property-images/Grove-Road-image-2.jpg" alt="Property detail" className="w-full h-32 object-cover rounded" />
              <img src="/property-images/Grove-Road-image-3.jpg" alt="Property detail" className="w-full h-32 object-cover rounded" />
              <img src="/property-images/Grove-Road-image-4.jpg" alt="Property detail" className="w-full h-32 object-cover rounded" />
            </div>
            
            {/* Property Details */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{mainProperty.title}</h3>
              <p className="text-3xl font-bold text-gray-800 mb-4">{mainProperty.price}</p>
              <div className="flex justify-center space-x-6 mb-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-[#29377c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {mainProperty.propertyType}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-[#058895]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                  </svg>
                  {mainProperty.bedrooms} beds
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-[#f37054]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                  {mainProperty.bathrooms} baths
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-[#29377c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  {mainProperty.receptions} rec
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1 text-[#058895]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                  {mainProperty.sqft.toLocaleString()} sqft
                </span>
              </div>
              <p className="text-gray-600 text-center leading-relaxed mb-4 line-clamp-3">
                {mainProperty.description}
              </p>
              <div className="text-center">
                <button className="bg-[#f37054] text-white px-6 py-2 rounded-lg hover:bg-[#e65a3f] transition-colors font-semibold">
                  View Property
                </button>
              </div>
            </div>
            
            {/* Call to Action Buttons */}
            <div className="flex justify-center space-x-4">
              <a href="https://www.alanbatt.co.uk/property-valuation/" className="bg-[#058895] text-white px-8 py-3 rounded-lg hover:bg-[#047a85] transition-colors font-semibold inline-block text-center">
                Book a valuation
              </a>
              <a href="https://www.alanbatt.co.uk/contact-us" className="bg-[#f37054] text-white px-8 py-3 rounded-lg hover:bg-[#e65a3f] transition-colors font-semibold inline-block text-center">
                Contact us
              </a>
            </div>
          </div>

          {/* Secondary Properties - 2 Column Layout with Fixed Icons */}
          <div className="mb-12">
            <div className="grid md:grid-cols-2 gap-6">
              {secondaryProperties.map((property) => (
                <div key={property.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h4 className="font-bold text-gray-800 mb-1">{property.title}</h4>
                    <p className="text-lg font-bold text-gray-800 mb-3">{property.price}</p>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="flex flex-col items-center text-center">
                        <svg className="w-5 h-5 mb-1 text-[#29377c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="text-xs text-gray-600">{property.propertyType}</span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <svg className="w-5 h-5 mb-1 text-[#058895]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                        </svg>
                        <span className="text-xs text-gray-600">{property.bedrooms} beds</span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <svg className="w-5 h-5 mb-1 text-[#f37054]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                        </svg>
                        <span className="text-xs text-gray-600">{property.bathrooms} baths</span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <svg className="w-5 h-5 mb-1 text-[#058895]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                        <span className="text-xs text-gray-600">{property.sqft.toLocaleString()} sqft</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {property.description}
                    </p>
                    <div className="text-center">
                      <button className="bg-[#f37054] text-white px-4 py-2 rounded-lg hover:bg-[#e65a3f] transition-colors font-semibold text-sm">
                        View Property
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service Promotion Blocks - 3 Column Layout with New Email Images */}
          <div className="mb-12">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img 
                  src="/email-images/abemail1.jpg" 
                  alt="Early bird alerts" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 overlay-30"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 text-center">
                  <h4 className="font-bold mb-3 text-lg">Early bird property alerts</h4>
                  <p className="text-base">Be first to hear about properties that suit you</p>
                </div>
              </div>
              
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img 
                  src="/email-images/abemail2.jpg" 
                  alt="Selling property" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 overlay-30"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 text-center">
                  <h4 className="font-bold mb-3 text-lg">Selling or letting your property?</h4>
                  <p className="text-base">Book a FREE valuation today!</p>
                </div>
              </div>
              
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img src="/email-images/abemail3.jpg" alt="Letting property" className="w-full h-full object-cover" />
                <div className="absolute inset-0 overlay-30"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 text-center">
                  <h4 className="font-bold mb-3 text-lg">Letting your property</h4>
                  <p className="text-base">Have complete peace of mind</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Alan Batt Blue */}
        <div className="bg-[#29377c] text-white p-8">
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            {/* Left - Contact Information */}
            <div>
              <h4 className="font-semibold mb-4">Contact Information</h4>
              <div className="space-y-2 text-sm">
                <p>78 Market Street, Wigan, WN1 1HX</p>
                <p>01942 233 999</p>
                <p>sales@alanbatt.co.uk</p>
                <p>rentals@alanbatt.co.uk</p>
              </div>
            </div>
            
            {/* Right - Social Media */}
            <div className="text-right">
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex justify-end space-x-4">
                <a href="#" className="text-white hover:text-gray-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-gray-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.84-.5l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.66.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Disclaimer Text */}
          <div className="border-t border-gray-600 pt-6 text-center">
            <div className="space-y-2 text-gray-300 text-sm">
              <p>This email was sent to dan@magicalogical.co.uk</p>
              <p>You received this email because you are registered with Alan Batt</p>
              <p><a href="#" className="text-gray-300 hover:text-white underline">Unsubscribe here</a></p>

            </div>
          </div>
        </div>
      </div>

      {/* Preview Controls */}
      <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 border">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-gray-700">Preview Mode</span>
          <Link
            href="/emails"
            className="bg-[#29377c] text-white px-4 py-2 rounded text-sm hover:bg-[#1e2a5c] transition-colors"
          >
            Back to Templates
          </Link>
        </div>
      </div>
    </div>
  );
}

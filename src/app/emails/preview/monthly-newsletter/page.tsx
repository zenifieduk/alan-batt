'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchBlogPosts } from '@/lib/email-utils';

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
  const [secondaryProperties] = useState<Property[]>(realProperties.slice(1, 3)); // Take 2 properties for 2-column layout
  const [blogPosts, setBlogPosts] = useState<Array<{
    id: string;
    title: string;
    excerpt: string;
    date?: string;
    slug: string;
    image?: string;
  }>>([]);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Load blog posts on component mount
  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const posts = await fetchBlogPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      }
    };
    loadBlogPosts();
  }, []);

  const handleSendTestEmail = async () => {
    setIsSendingEmail(true);
    try {
      const response = await fetch('/api/emails/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'dan@magicalogical.co.uk', // You can change this to your email
          subject: 'Test Newsletter - Alan Batt Properties',
          previewText: 'Check out our latest properties and market insights',
          mainProperty: mainProperty,
          secondaryProperties: secondaryProperties,
          blogPosts: blogPosts,
          templateId: 'newsletter'
        }),
      });

      const result = await response.json();
      if (result.success) {
        setEmailSent(true);
        setTimeout(() => setEmailSent(false), 5000);
      } else {
        console.error('Failed to send email:', result.error);
        alert('Failed to send test email. Please check the console for details.');
      }
    } catch (error) {
      console.error('Error sending test email:', error);
      alert('Error sending test email. Please check the console for details.');
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Add Goudy font link */}
      <link rel="stylesheet" href="https://use.typekit.net/bwg2coj.css" />
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
                className="h-24 mx-auto mb-2"
              />
              <p className="text-gray-300 text-sm">SALES & LETTINGS</p>
            </div>
            
            {/* Right - Navigation */}
            <div className="text-right space-y-2">
              <div><a href="https://www.alanbatt.co.uk/property-search/?orderby=price_desc&showstc=on" className="text-white hover:text-gray-200 text-sm">Find a property</a></div>
              <div><a href="https://www.alanbatt.co.uk/property-valuation/" className="text-white hover:text-gray-200 text-sm">Book a valuation</a></div>
              <div><a href="https://www.alanbatt.co.uk/contact-us/" className="text-white hover:text-gray-200 text-sm">Contact us</a></div>
            </div>
          </div>
        </div>

        {/* Main Content Area - White Background */}
        <div className="p-8">
          {/* Introduction Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: '"goudy-old-style", serif' }}>August Newsletter</h2>
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
              <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: '"goudy-old-style", serif' }}>{mainProperty.title}</h3>
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
                    <h4 className="font-bold text-gray-800 mb-1" style={{ fontFamily: '"goudy-old-style", serif' }}>{property.title}</h4>
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

          {/* Blog Posts Section */}
          {blogPosts.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center" style={{ fontFamily: '"goudy-old-style", serif' }}>
                Latest Market Insights
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {blogPosts.slice(0, 4).map((post) => (
                  <div key={post.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    {post.image && (
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h4 className="font-bold text-gray-800 mb-2" style={{ fontFamily: '"goudy-old-style", serif' }}>
                        {post.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">{post.date || 'Recent'}</span>
                        <a 
                          href={`/content/${post.slug}`}
                          className="text-[#058895] text-sm font-semibold hover:text-[#047a85]"
                        >
                          Read More →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
                  <h4 className="font-bold mb-3 text-lg" style={{ fontFamily: '"goudy-old-style", serif' }}>Early bird property alerts</h4>
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
                  <h4 className="font-bold mb-3 text-lg" style={{ fontFamily: '"goudy-old-style", serif' }}>Selling or letting your property?</h4>
                  <p className="text-base">Book a FREE valuation today!</p>
                </div>
              </div>
              
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img src="/email-images/abemail3.jpg" alt="Letting property" className="w-full h-full object-cover" />
                <div className="absolute inset-0 overlay-30"></div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 text-center">
                  <h4 className="font-bold mb-3 text-lg" style={{ fontFamily: '"goudy-old-style", serif' }}>Letting your property</h4>
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
              <h4 className="font-semibold mb-4" style={{ fontFamily: '"goudy-old-style", serif' }}>Contact Information</h4>
              <div className="space-y-2 text-sm">
                <p>78 Market Street, Wigan, WN1 1HX</p>
                <p><a href="tel:01942233999" className="text-white hover:text-gray-200">01942 233 999</a></p>
                <p><a href="mailto:sales@alanbatt.co.uk" className="text-white hover:text-gray-200">sales@alanbatt.co.uk</a></p>
                <p><a href="mailto:rentals@alanbatt.co.uk" className="text-white hover:text-gray-200">rentals@alanbatt.co.uk</a></p>
              </div>
            </div>
            
            {/* Right - Social Media */}
            <div className="text-right">
              <h4 className="font-semibold mb-4" style={{ fontFamily: '"goudy-old-style", serif' }}>Follow Us</h4>
              <div className="flex justify-end space-x-4">
                <a href="https://www.facebook.com/alanbattuk" className="text-white hover:text-gray-200" title="Facebook">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/alanbatt_estates/" className="text-white hover:text-gray-200" title="Instagram">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281c-.49 0-.98-.49-.98-.98s.49-.98.98-.98.98.49.98.98-.49.98-.98.98zm-7.83 1.297c-1.297 0-2.448 1.151-2.448 2.448s1.151 2.448 2.448 2.448 2.448-1.151 2.448-2.448-1.151-2.448-2.448-2.448z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/alan-batt-sales-lettings/" className="text-white hover:text-gray-200" title="LinkedIn">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
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
          <button
            onClick={handleSendTestEmail}
            disabled={isSendingEmail}
            className={`px-4 py-2 rounded text-sm transition-colors ${
              isSendingEmail 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : emailSent
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-[#f37054] text-white hover:bg-[#e65a3f]'
            }`}
          >
            {isSendingEmail ? 'Sending...' : emailSent ? 'Email Sent!' : 'Send Test Email'}
          </button>
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

'use client';

import { notFound } from 'next/navigation';
import { fetchProperties, fetchBlogPosts, Property, BlogPost } from '@/lib/email-utils';
import { useState, useEffect } from 'react';

interface EmailPreviewPageProps {
  params: Promise<{ id: string }>;
}

export default function EmailPreviewPage({ params }: EmailPreviewPageProps) {
  const [id, setId] = useState<string>('');
  const [properties, setProperties] = useState<Property[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const resolvedParams = await params;
        setId(resolvedParams.id);
        
        // Add a small delay to simulate loading and prevent hydration issues
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const fetchedProperties = await fetchProperties();
        const fetchedBlogPosts = await fetchBlogPosts();
        
        setProperties(fetchedProperties);
        setBlogPosts(fetchedBlogPosts);
        setLoading(false);
      } catch (error) {
        console.error('Error loading email data:', error);
        setLoading(false);
      }
    };
    
    loadData();
  }, [params]);

  // Generate email content based on the ID
  let emailTitle = '';
  
  // Map email IDs to their content and titles
  const emailConfigs = {
    '1': {
      title: 'August Newsletter',
      mainProperty: properties[0] || null,
      secondaryProperties: properties.slice(1, 3),
      blogPosts: blogPosts.slice(0, 2)
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#29377c] mx-auto mb-4"></div>
            <p className="text-slate-600">Loading email preview...</p>
          </div>
        </div>
      </div>
    );
  }

  const config = emailConfigs[id as keyof typeof emailConfigs];
  
  if (!config) {
    notFound();
  }

  emailTitle = config.title;
  
  // Use the original hot properties layout
  const mainProperty = properties[0];
  const secondaryProperties = properties.slice(1);

  const emailContent = (
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4" style={{ fontFamily: '"goudy-old-style", serif' }}>{emailTitle}</h2>
            <p className="text-gray-600 mb-4 max-w-3xl mx-auto">
              Welcome to our Monthly Newsletter. Here we showcase the latest properties, market insights, and updates from Alan Batt.
            </p>
            <p className="text-gray-600 max-w-3xl mx-auto">
              If you would like to arrange a viewing on any of the below properties or have one that you would like to sell or let, then please{' '}
              <a href="#" className="text-blue-700 underline hover:text-blue-800">contact us</a>.
            </p>
          </div>

          {/* Featured Property */}
          {mainProperty && (
            <div className="mb-12">
              {/* Main Image */}
              <div className="mb-4">
                <img 
                  src={mainProperty.mainImage} 
                  alt={mainProperty.title}
                  className="w-full h-80 object-cover rounded-lg"
                />
              </div>
              
              {/* Gallery Images */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {mainProperty.galleryImages?.slice(0, 3).map((image: string, index: number) => (
                  <img key={index} src={image} alt="Property detail" className="w-full h-32 object-cover rounded" />
                ))}
              </div>
              
              {/* Property Details */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: '"goudy-old-style", serif' }}>{mainProperty.title}</h3>
                <p className="text-3xl font-bold text-gray-800 mb-4">{mainProperty.price}</p>
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
          )}

          {/* Secondary Properties - 2 Column Layout */}
          {secondaryProperties.length > 0 && (
            <div className="mb-12">
              <div className="grid md:grid-cols-2 gap-6">
                {secondaryProperties.map((property: Property) => (
                  <div key={property.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <img 
                      src={property.mainImage} 
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 text-center">
                      <h4 className="font-bold text-gray-800 mb-1" style={{ fontFamily: '"goudy-old-style", serif' }}>{property.title}</h4>
                      <p className="text-lg font-bold text-gray-800 mb-3">{property.price}</p>
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
          )}

          {/* Latest Articles Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center" style={{ fontFamily: '"goudy-old-style", serif' }}>Latest Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Article 1 - Divorce/Separation */}
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src="/images/blog/divorce-separation-property.jpg" 
                  alt="Selling your house due to divorce or separation"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-bold text-gray-800 mb-2 text-lg line-clamp-1" style={{ fontFamily: '"goudy-old-style", serif' }}>Selling Your House Due to Divorce or Separation</h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    When relationships break down, selling your shared home can be one of the most challenging aspects of the process. Our guide covers key considerations, legal requirements, and practical steps to help you navigate this difficult time.
                  </p>
                  <div className="text-center">
                    <a 
                      href="https://www.alanbatt.co.uk/selling-your-house-due-to-divorce-or-separation-key-considerations/" 
                      className="bg-[#058895] text-white px-4 py-2 rounded-lg hover:bg-[#047a85] transition-colors font-semibold text-sm inline-block"
                    >
                      Read Article
                    </a>
                  </div>
                </div>
              </div>

              {/* Article 2 - Care Fees FAQ */}
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src="/images/blog/care-fees-property.jpg" 
                  alt="Your FAQs on Care Fees, Property, and Selling Your Home"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-bold text-gray-800 mb-2 text-lg line-clamp-1" style={{ fontFamily: '"goudy-old-style", serif' }}>Your FAQs on Care Fees, Property, and Selling Your Home</h4>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    Planning for later life and care fees can feel overwhelming. We answer the most common questions about financial assessments, asset protection, and the practical steps involved in selling your home when care is needed.
                  </p>
                  <div className="text-center">
                    <a 
                      href="https://www.alanbatt.co.uk/your-faqs-on-care-fees-property-and-selling-your-home/" 
                      className="bg-[#058895] text-white px-4 py-2 rounded-lg hover:bg-[#047a85] transition-colors font-semibold text-sm inline-block"
                    >
                      Read Article
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Promotion Blocks - 3 Column Layout */}
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
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
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

    </div>
  );

  return emailContent;
}

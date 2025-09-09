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
      const resolvedParams = await params;
      setId(resolvedParams.id);
      
      const fetchedProperties = await fetchProperties();
      const fetchedBlogPosts = await fetchBlogPosts();
      
      setProperties(fetchedProperties);
      setBlogPosts(fetchedBlogPosts);
      setLoading(false);
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{emailTitle}</h2>
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
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{mainProperty.title}</h3>
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
                      <h4 className="font-bold text-gray-800 mb-1">{property.title}</h4>
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
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Latest Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Article 1 - Divorce/Separation */}
              <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src="/images/blog/divorce-separation-property.jpg" 
                  alt="Selling your house due to divorce or separation"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-bold text-gray-800 mb-2 text-lg">Selling Your House Due to Divorce or Separation</h4>
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
                  <h4 className="font-bold text-gray-800 mb-2 text-lg">Your FAQs on Care Fees, Property, and Selling Your Home</h4>
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

    </div>
  );

  return emailContent;
}

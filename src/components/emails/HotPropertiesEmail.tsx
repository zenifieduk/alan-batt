import React from 'react';
import { Property, BlogPost } from '@/lib/email-utils';

interface HotPropertiesEmailProps {
  mainProperty: Property;
  secondaryProperties: Property[];
  blogPosts: BlogPost[];
  subject: string;
  previewText: string;
  companyName?: string;
  companyLogo?: string;
  companyAddress?: string;
  companyPhone?: string;
  salesEmail?: string;
  rentalsEmail?: string;
}

export default function HotPropertiesEmail({
  mainProperty,
  secondaryProperties,
  blogPosts,
  companyName = 'Alan Batt Sales & Lettings',
  companyLogo = '/logo.png',
  companyAddress = '78 Market Street, Wigan, WN1 1HX',
  companyPhone = '01942 233 999',
  salesEmail = 'sales@alanbatt.co.uk',
  rentalsEmail = 'rentals@alanbatt.co.uk'
}: HotPropertiesEmailProps) {
  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '600px', 
      margin: '0 auto',
      backgroundColor: '#f8f9fa'
    }}>
      {/* Email Container */}
      <div style={{ 
        backgroundColor: '#ffffff',
        padding: '0',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        
        {/* Header */}
        <div style={{ 
          backgroundColor: '#29377c',
          padding: '20px',
          color: '#ffffff'
        }}>
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            {/* Left - View in browser */}
            <div style={{ fontSize: '12px', color: '#d1d5db' }}>
              <a href="#" style={{ color: '#d1d5db', textDecoration: 'none' }}>View in browser</a>
            </div>
            
            {/* Center - Logo */}
            <div style={{ textAlign: 'center' }}>
              <img 
                src={companyLogo} 
                alt={companyName}
                style={{ 
                  height: '60px',
                  maxWidth: '200px',
                  marginBottom: '8px'
                }}
              />
              <p style={{ 
                color: '#d1d5db',
                margin: '0',
                fontSize: '12px'
              }}>
                SALES & LETTINGS
              </p>
            </div>
            
            {/* Right - Navigation */}
            <div style={{ textAlign: 'right', fontSize: '12px' }}>
              <div style={{ marginBottom: '4px' }}>
                <a href="https://www.alanbatt.co.uk/property-search/?orderby=price_desc&showstc=on" style={{ color: '#ffffff', textDecoration: 'none' }}>Find a property</a>
              </div>
              <div style={{ marginBottom: '4px' }}>
                <a href="https://www.alanbatt.co.uk/property-valuation/" style={{ color: '#ffffff', textDecoration: 'none' }}>Book a valuation</a>
              </div>
              <div>
                <a href="https://www.alanbatt.co.uk/contact-us/" style={{ color: '#ffffff', textDecoration: 'none' }}>Contact us</a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ padding: '30px 20px' }}>
          
          {/* Title */}
          <div style={{ 
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            <h2 style={{ 
              color: '#1f2937',
              fontSize: '28px',
              margin: '0 0 15px 0',
              fontWeight: 'bold'
            }}>
              August Hot Properties
            </h2>
            <p style={{ 
              color: '#6b7280',
              fontSize: '16px',
              lineHeight: '1.6',
              margin: '0 0 20px 0'
            }}>
              Welcome to our Hot Properties. Here we showcase just some of the latest properties Alan Batt have to offer.
            </p>
            <p style={{ 
              color: '#6b7280',
              fontSize: '16px',
              lineHeight: '1.6',
              margin: '0'
            }}>
              If you would like to arrange a viewing on any of the below properties or have one that you would like to sell or let, then please contact us.
            </p>
          </div>

          {/* Main Featured Property */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ 
              border: '2px solid #1e3a8a',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <img 
                src={mainProperty.mainImage} 
                alt={mainProperty.title}
                style={{ 
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover'
                }}
              />
              <div style={{ padding: '25px' }}>
                <h3 style={{ 
                  color: '#1f2937',
                  fontSize: '22px',
                  margin: '0 0 10px 0',
                  fontWeight: 'bold',
                  textAlign: 'center'
                }}>
                  {mainProperty.title}
                </h3>
                <p style={{ 
                  color: '#6b7280',
                  fontSize: '16px',
                  margin: '0 0 15px 0',
                  textAlign: 'center'
                }}>
                  📍 {mainProperty.address}
                </p>
                <p style={{ 
                  color: '#059669',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  margin: '0 0 20px 0',
                  textAlign: 'center'
                }}>
                  {mainProperty.price}
                </p>
                <p style={{ 
                  color: '#4b5563',
                  fontSize: '16px',
                  lineHeight: '1.6',
                  margin: '0 0 20px 0',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: '3',
                  WebkitBoxOrient: 'vertical',
                  textOverflow: 'ellipsis',
                  textAlign: 'center'
                }}>
                  {mainProperty.description}
                </p>
                <div style={{ textAlign: 'center' }}>
                                  <a 
                  href={`https://www.alanbatt.co.uk/properties/${mainProperty.slug}`}
                  style={{ 
                    display: 'inline-block',
                    backgroundColor: '#f37054',
                    color: '#ffffff',
                    padding: '12px 24px',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  View Property
                </a>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Properties Grid */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ 
              color: '#1f2937',
              fontSize: '22px',
              margin: '0 0 20px 0',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              More Properties
            </h3>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px'
            }}>
              {secondaryProperties.map((property) => (
                <div key={property.id} style={{ 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  <img 
                    src={property.mainImage} 
                    alt={property.title}
                    style={{ 
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ padding: '15px' }}>
                    <h4 style={{ 
                      color: '#1f2937',
                      fontSize: '16px',
                      margin: '0 0 8px 0',
                      fontWeight: 'bold'
                    }}>
                      {property.title}
                    </h4>
                    <p style={{ 
                      color: '#6b7280',
                      fontSize: '14px',
                      margin: '0 0 8px 0'
                    }}>
                      📍 {property.address}
                    </p>
                    <p style={{ 
                      color: '#059669',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      margin: '0 0 12px 0'
                    }}>
                      {property.price}
                    </p>
                    <p style={{ 
                      color: '#4b5563',
                      fontSize: '14px',
                      lineHeight: '1.4',
                      margin: '0 0 12px 0',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: '3',
                      WebkitBoxOrient: 'vertical',
                      textOverflow: 'ellipsis'
                    }}>
                      {property.description}
                    </p>
                    <a 
                      href={`https://www.alanbatt.co.uk/properties/${property.slug}`}
                      style={{ 
                        display: 'inline-block',
                        backgroundColor: '#f37054',
                        color: '#ffffff',
                        padding: '8px 16px',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        fontSize: '14px'
                      }}
                    >
                      View Property
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div style={{ 
            textAlign: 'center',
            backgroundColor: '#f3f4f6',
            padding: '25px',
            borderRadius: '8px',
            marginBottom: '30px'
          }}>
            <h3 style={{ 
              color: '#1f2937',
              fontSize: '20px',
              margin: '0 0 15px 0',
              fontWeight: 'bold'
            }}>
              Find your next property
            </h3>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a 
                href="https://www.alanbatt.co.uk/property-valuation/"
                style={{ 
                  display: 'inline-block',
                  backgroundColor: '#059669',
                  color: '#ffffff',
                  padding: '12px 24px',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                Book a valuation
              </a>
              <a 
                href="https://www.alanbatt.co.uk/contact-us"
                style={{ 
                  display: 'inline-block',
                  backgroundColor: '#1e3a8a',
                  color: '#ffffff',
                  padding: '12px 24px',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                Contact us
              </a>
            </div>
          </div>

          {/* Blog Posts */}
          {blogPosts.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ 
                color: '#1f2937',
                fontSize: '22px',
                margin: '0 0 20px 0',
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                Market Insights & Guides
              </h3>
              
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '20px'
              }}>
                {blogPosts.map((post) => (
                  <div key={post.id} style={{ 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    overflow: 'hidden'
                  }}>
                    {post.image && (
                      <img 
                        src={post.image} 
                        alt={post.title}
                        style={{ 
                          width: '100%',
                          height: '120px',
                          objectFit: 'cover'
                        }}
                      />
                    )}
                    <div style={{ padding: '15px' }}>
                      <h4 style={{ 
                        color: '#1f2937',
                        fontSize: '16px',
                        margin: '0 0 8px 0',
                        fontWeight: 'bold'
                      }}>
                        {post.title}
                      </h4>
                      <p style={{ 
                        color: '#6b7280',
                        fontSize: '14px',
                        lineHeight: '1.4',
                        margin: '0 0 12px 0'
                      }}>
                        {post.excerpt}
                      </p>
                      <a 
                        href={`https://www.alanbatt.co.uk/blog/${post.slug}`}
                        style={{ 
                          color: '#1e3a8a',
                          textDecoration: 'none',
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}
                      >
                        Read More →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Service Promotion Blocks */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ 
              color: '#1f2937',
              fontSize: '22px',
              margin: '0 0 20px 0',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              Our Services
            </h3>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px'
            }}>
              <div style={{ 
                position: 'relative',
                height: '192px',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <img 
                  src="/email-images/abemail1.jpg" 
                  alt="Early bird alerts" 
                  style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ 
                  position: 'absolute',
                  inset: '0',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)'
                }}></div>
                <div style={{ 
                  position: 'absolute',
                  inset: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '24px',
                  textAlign: 'center'
                }}>
                  <h4 style={{ 
                    color: '#ffffff',
                    fontSize: '18px',
                    margin: '0 0 12px 0',
                    fontWeight: 'bold'
                  }}>
                    Early bird property alerts
                  </h4>
                  <p style={{ 
                    color: '#ffffff',
                    fontSize: '16px',
                    margin: '0'
                  }}>
                    Be first to hear about properties that suit you
                  </p>
                </div>
              </div>
              
              <div style={{ 
                position: 'relative',
                height: '192px',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <img 
                  src="/email-images/abemail2.jpg" 
                  alt="Selling property" 
                  style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ 
                  position: 'absolute',
                  inset: '0',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)'
                }}></div>
                <div style={{ 
                  position: 'absolute',
                  inset: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '24px',
                  textAlign: 'center'
                }}>
                  <h4 style={{ 
                    color: '#ffffff',
                    fontSize: '18px',
                    margin: '0 0 12px 0',
                    fontWeight: 'bold'
                  }}>
                    Selling or letting your property?
                  </h4>
                  <p style={{ 
                    color: '#ffffff',
                    fontSize: '16px',
                    margin: '0'
                  }}>
                    Book a FREE valuation today!
                  </p>
                </div>
              </div>
              
              <div style={{ 
                position: 'relative',
                height: '192px',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <img 
                  src="/email-images/abemail3.jpg" 
                  alt="Letting property" 
                  style={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ 
                  position: 'absolute',
                  inset: '0',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)'
                }}></div>
                <div style={{ 
                  position: 'absolute',
                  inset: '0',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '24px',
                  textAlign: 'center'
                }}>
                  <h4 style={{ 
                    color: '#ffffff',
                    fontSize: '18px',
                    margin: '0 0 12px 0',
                    fontWeight: 'bold'
                  }}>
                    Letting your property
                  </h4>
                  <p style={{ 
                    color: '#ffffff',
                    fontSize: '16px',
                    margin: '0'
                  }}>
                    Have complete peace of mind
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div style={{ 
            backgroundColor: '#1e3a8a',
            color: '#ffffff',
            padding: '25px',
            borderRadius: '8px',
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            <h3 style={{ 
              fontSize: '20px',
              margin: '0 0 15px 0',
              fontWeight: 'bold'
            }}>
              Qualified Advice For Over 40 Years
            </h3>
            <p style={{ 
              fontSize: '16px',
              lineHeight: '1.6',
              margin: '0 0 20px 0',
              opacity: 0.9
            }}>
              At Alan Batt Sales &amp; Lettings, we are here to simplify the process for you. Our reputation for trustworthiness and dedication makes us one of the most respected agents in the area. Here&apos;s our guide to help you through each step of buying a property with us from budgets to making an offer…
            </p>
            <a 
              href="https://www.alanbatt.co.uk/guide"
              style={{ 
                display: 'inline-block',
                backgroundColor: '#ffffff',
                color: '#1e3a8a',
                padding: '12px 24px',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
            >
              Read our guide
            </a>
          </div>
        </div>

        {/* Footer */}
        <div style={{ 
          backgroundColor: '#29377c',
          color: '#ffffff',
          padding: '30px 20px'
        }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '30px',
            marginBottom: '20px',
            maxWidth: '600px',
            margin: '0 auto 20px auto'
          }}>
            {/* Left - Contact Information */}
            <div>
              <h4 style={{ 
                margin: '0 0 15px 0',
                fontSize: '16px',
                fontWeight: 'bold',
                fontFamily: '"goudy-old-style", serif'
              }}>
                Contact Information
              </h4>
              <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
                <p style={{ margin: '0 0 8px 0' }}>{companyAddress}</p>
                <p style={{ margin: '0 0 8px 0' }}>
                  <a href={`tel:${companyPhone.replace(/\s/g, '')}`} style={{ color: '#ffffff', textDecoration: 'none' }}>
                    {companyPhone}
                  </a>
                </p>
                <p style={{ margin: '0 0 8px 0' }}>
                  <a href={`mailto:${salesEmail}`} style={{ color: '#ffffff', textDecoration: 'none' }}>
                    {salesEmail}
                  </a>
                </p>
                <p style={{ margin: '0' }}>
                  <a href={`mailto:${rentalsEmail}`} style={{ color: '#ffffff', textDecoration: 'none' }}>
                    {rentalsEmail}
                  </a>
                </p>
              </div>
            </div>
            
            {/* Right - Social Media */}
            <div style={{ textAlign: 'right' }}>
              <h4 style={{ 
                margin: '0 0 15px 0',
                fontSize: '16px',
                fontWeight: 'bold',
                fontFamily: '"goudy-old-style", serif'
              }}>
                Follow Us
              </h4>
              <div style={{ 
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '15px'
              }}>
                <a href="https://www.facebook.com/alanbattuk" style={{ color: '#ffffff', textDecoration: 'none' }} title="Facebook">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/alanbatt_estates/" style={{ color: '#ffffff', textDecoration: 'none' }} title="Instagram">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281c-.49 0-.98-.49-.98-.98s.49-.98.98-.98.98.49.98.98-.49.98-.98.98zm-7.83 1.297c-1.297 0-2.448 1.151-2.448 2.448s1.151 2.448 2.448 2.448 2.448-1.151 2.448-2.448-1.151-2.448-2.448-2.448z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/alan-batt-sales-lettings/" style={{ color: '#ffffff', textDecoration: 'none' }} title="LinkedIn">
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Disclaimer Text */}
          <div style={{ 
            borderTop: '1px solid #4b5563',
            paddingTop: '20px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '12px', color: '#d1d5db', lineHeight: '1.6' }}>
              <p style={{ margin: '0 0 8px 0' }}>This email was sent to [recipient email]</p>
              <p style={{ margin: '0 0 8px 0' }}>You received this email because you are registered with Alan Batt</p>
              <p style={{ margin: '0' }}>
                <a href="#" style={{ color: '#d1d5db', textDecoration: 'underline' }}>Unsubscribe here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

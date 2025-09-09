import React from 'react';
import { Property, BlogPost } from '@/lib/email-utils';

interface PropertyNewsletterEmailProps {
  mainProperty: Property;
  secondaryProperties: Property[];
  blogPosts: BlogPost[];
  companyName?: string;
  companyLogo?: string;
  companyAddress?: string;
  companyPhone?: string;
  salesEmail?: string;
  rentalsEmail?: string;
}

export default function PropertyNewsletterEmail({
  mainProperty,
  secondaryProperties,
  blogPosts,
  companyName = 'Alan Batt Sales & Lettings',
  companyLogo = '/logo.png',
  companyAddress = '78 Market Street, Wigan, WN1 1HX',
  companyPhone = '01942 233 999',
  salesEmail = 'sales@alanbatt.co.uk',
  rentalsEmail = 'rentals@alanbatt.co.uk'
}: PropertyNewsletterEmailProps) {
  return (
    <html>
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/bwg2coj.css" />
      </head>
      <body>
        <div style={{ 
          fontFamily: '"goudy-old-style", serif', 
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
          textAlign: 'center'
        }}>
          <img 
            src={companyLogo} 
            alt={companyName}
            style={{ 
              height: '60px',
              maxWidth: '200px'
            }}
          />
          <h1 style={{ 
            color: '#ffffff',
            margin: '15px 0 0 0',
            fontSize: '24px',
            fontWeight: 'bold'
          }}>
            {companyName}
          </h1>
          <p style={{ 
            color: '#e5e7eb',
            margin: '5px 0 0 0',
            fontSize: '14px'
          }}>
            Your Trusted Property Partner in Wigan
          </p>
        </div>

        {/* Main Content */}
        <div style={{ padding: '30px 20px' }}>
          
          {/* Introduction */}
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
              Wigan Property Market Update
            </h2>
            <p style={{ 
              color: '#6b7280',
              fontSize: '16px',
              lineHeight: '1.6',
              margin: '0'
            }}>
              Discover the latest properties and market insights from your local experts
            </p>
          </div>

          {/* Main Featured Property */}
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ 
              color: '#1f2937',
              fontSize: '22px',
              margin: '0 0 20px 0',
              fontWeight: 'bold'
            }}>
              Featured Property
            </h3>
            
            <div style={{ 
              border: '2px solid #29377c',
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
                <h4 style={{ 
                  color: '#1f2937',
                  fontSize: '20px',
                  margin: '0 0 10px 0',
                  fontWeight: 'bold'
                }}>
                  {mainProperty.title}
                </h4>
                <p style={{ 
                  color: '#6b7280',
                  fontSize: '16px',
                  margin: '0 0 15px 0',
                  lineHeight: '1.4'
                }}>
                  {mainProperty.description}
                </p>
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '15px'
                }}>
                  <span style={{ 
                    color: '#29377c',
                    fontSize: '24px',
                    fontWeight: 'bold'
                  }}>
                    {mainProperty.price}
                  </span>
                </div>
                <a 
                  href={`https://alanbatt.co.uk/property/${mainProperty.id}`}
                  style={{ 
                    backgroundColor: '#29377c',
                    color: '#ffffff',
                    textDecoration: 'none',
                    padding: '12px 24px',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    display: 'inline-block'
                  }}
                >
                  View Property
                </a>
              </div>
            </div>
          </div>

          {/* Featured Properties */}
          {secondaryProperties.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ 
                color: '#1f2937',
                fontSize: '22px',
                margin: '0 0 20px 0',
                fontWeight: 'bold'
              }}>
                More Properties
              </h3>
              
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
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
                        height: '180px',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{ padding: '20px' }}>
                      <h4 style={{ 
                        color: '#1f2937',
                        fontSize: '18px',
                        margin: '0 0 10px 0',
                        fontWeight: 'bold'
                      }}>
                        {property.title}
                      </h4>
                      <p style={{ 
                        color: '#6b7280',
                        fontSize: '14px',
                        margin: '0 0 15px 0',
                        lineHeight: '1.4'
                      }}>
                        {property.description}
                      </p>
                      <div style={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '15px'
                      }}>
                        <span style={{ 
                          color: '#29377c',
                          fontSize: '20px',
                          fontWeight: 'bold'
                        }}>
                          {property.price}
                        </span>
                      </div>
                      <a 
                        href={`https://alanbatt.co.uk/property/${property.id}`}
                        style={{ 
                          backgroundColor: '#29377c',
                          color: '#ffffff',
                          textDecoration: 'none',
                          padding: '10px 20px',
                          borderRadius: '6px',
                          fontWeight: 'bold',
                          fontSize: '14px',
                          display: 'inline-block'
                        }}
                      >
                        View Property
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blog Posts */}
          {blogPosts.length > 0 && (
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ 
                color: '#1f2937',
                fontSize: '22px',
                margin: '0 0 20px 0',
                fontWeight: 'bold',
                borderBottom: '2px solid #e5e7eb',
                paddingBottom: '10px'
              }}>
                Latest Market Insights
              </h3>
              
              {blogPosts.map((post) => (
                <div key={post.id} style={{ 
                  display: 'flex',
                  marginBottom: '20px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt={post.title}
                      style={{ 
                        width: '120px',
                        height: '90px',
                        objectFit: 'cover',
                        flexShrink: 0
                      }}
                    />
                  )}
                  <div style={{ 
                    padding: '15px',
                    flex: 1
                  }}>
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
                      margin: '0 0 10px 0'
                    }}>
                      {post.excerpt}
                    </p>
                    <a 
                      href={`https://alanbatt.co.uk/blog/${post.slug}`}
                      style={{ 
                        color: '#29377c',
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
          )}

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
              Need Help with Your Property?
            </h3>
            <p style={{ 
              color: '#6b7280',
              fontSize: '16px',
              margin: '0 0 20px 0'
            }}>
              Our expert team is here to help you buy, sell, or let your property
            </p>
            <div style={{ 
              display: 'flex',
              gap: '15px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a 
                href="https://alanbatt.co.uk/valuation"
                style={{ 
                  backgroundColor: '#29377c',
                  color: '#ffffff',
                  textDecoration: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  fontSize: '14px'
                }}
              >
                Book Valuation
              </a>
              <a 
                href="https://alanbatt.co.uk/contact"
                style={{ 
                  backgroundColor: '#ffffff',
                  color: '#29377c',
                  textDecoration: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  border: '2px solid #29377c'
                }}
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Stats Section */}
          <div style={{ 
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '25px',
            marginBottom: '30px'
          }}>
            <h3 style={{ 
              color: '#1f2937',
              fontSize: '20px',
              margin: '0 0 20px 0',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              Why Choose Alan Batt?
            </h3>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '20px',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>
                  25+
                </div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                  Years Experience
                </div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>
                  500+
                </div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                  Properties Sold
                </div>
              </div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>
                  98.2%
                </div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                  Asking Price Achieved
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ 
          backgroundColor: '#111827',
          color: '#ffffff',
          padding: '30px 20px',
          textAlign: 'center'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <img 
              src={companyLogo} 
              alt={companyName}
              style={{ 
                height: '40px',
                maxWidth: '150px',
                marginBottom: '15px'
              }}
            />
            <p style={{ 
              margin: '0 0 15px 0',
              fontSize: '14px',
              color: '#9ca3af'
            }}>
              {companyAddress}
            </p>
            <p style={{ 
              margin: '0 0 15px 0',
              fontSize: '14px',
              color: '#9ca3af'
            }}>
              📞 {companyPhone} | ✉️ {salesEmail} | 📧 {rentalsEmail}
            </p>
          </div>
          
          <div style={{ 
            borderTop: '1px solid #374151',
            paddingTop: '20px'
          }}>
            <p style={{ 
              margin: '0 0 15px 0',
              fontSize: '12px',
              color: '#9ca3af'
            }}>
              © 2025 {companyName}. All rights reserved.
            </p>
            <div style={{ 
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              flexWrap: 'wrap'
            }}>
              <a 
                href="https://alanbatt.co.uk/privacy"
                style={{ 
                  color: '#9ca3af',
                  textDecoration: 'none',
                  fontSize: '12px'
                }}
              >
                Privacy Policy
              </a>
              <a 
                href="https://alanbatt.co.uk/terms"
                style={{ 
                  color: '#9ca3af',
                  textDecoration: 'none',
                  fontSize: '12px'
                }}
              >
                Terms of Service
              </a>
              <a 
                href="https://alanbatt.co.uk/unsubscribe"
                style={{ 
                  color: '#9ca3af',
                  textDecoration: 'none',
                  fontSize: '12px'
                }}
              >
                Unsubscribe
              </a>
            </div>
          </div>
        </div>
      </div>
        </div>
      </body>
    </html>
  );
}

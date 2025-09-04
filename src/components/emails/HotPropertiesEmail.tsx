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
          backgroundColor: '#1e3a8a',
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
              fontSize: '16px',
              color: '#ffffff'
            }}>
              {companyAddress}
            </p>
            <p style={{ 
              margin: '0 0 15px 0',
              fontSize: '16px',
              color: '#ffffff'
            }}>
              📞 {companyPhone}
            </p>
            <div style={{ 
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              flexWrap: 'wrap',
              marginBottom: '15px'
            }}>
              <a 
                href={`mailto:${salesEmail}`}
                style={{ 
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '16px'
                }}
              >
                {salesEmail}
              </a>
              <a 
                href={`mailto:${rentalsEmail}`}
                style={{ 
                  color: '#ffffff',
                  textDecoration: 'none',
                  fontSize: '16px'
                }}
              >
                {rentalsEmail}
              </a>
            </div>
          </div>
          
          <div style={{ 
            borderTop: '1px solid #374151',
            paddingTop: '20px'
          }}>
            <p style={{ 
              margin: '0 0 15px 0',
              fontSize: '14px',
              color: '#9ca3af'
            }}>
              This email was sent to [recipient] 
            </p>
            <p style={{ 
              margin: '0 0 15px 0',
              fontSize: '14px',
              color: '#9ca3af'
            }}>
              You received this email because you are registered with Alan Batt
            </p>
            <div style={{ 
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              flexWrap: 'wrap'
            }}>
              <a 
                href="https://www.alanbatt.co.uk/unsubscribe"
                style={{ 
                  color: '#9ca3af',
                  textDecoration: 'none',
                  fontSize: '14px'
                }}
              >
                Unsubscribe here
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

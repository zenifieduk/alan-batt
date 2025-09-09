'use client';

import { useState } from 'react';
import { Property, BlogPost } from '@/lib/email-utils';
import PropertyNewsletterEmail from '@/components/emails/PropertyNewsletterEmail';

interface NewsletterBuilder {
  subject: string;
  previewText: string;
  featuredProperty: Property | null;
  propertyRows: Property[][]; // Changed to support multiple property rows
  articles: BlogPost[];
  recipients: string[];
}

export default function LiveEmailBuilderPage() {
  // Updated to fix scraping issues
  const [builder, setBuilder] = useState<NewsletterBuilder>({
    subject: '',
    previewText: '',
    featuredProperty: null,
    propertyRows: [], // Changed from additionalProperties to propertyRows
    articles: [],
    recipients: []
  });

  const [loading, setLoading] = useState(false);
  const [scraping, setScraping] = useState(false);
  const [newRecipient, setNewRecipient] = useState('');
  const [featuredPropertyUrl, setFeaturedPropertyUrl] = useState('');
  const [propertyRow1Url1, setPropertyRow1Url1] = useState('');
  const [propertyRow1Url2, setPropertyRow1Url2] = useState('');
  const [articleUrl1, setArticleUrl1] = useState('');
  const [articleUrl2, setArticleUrl2] = useState('');


  const scrapeContent = async (type: 'featured' | 'property1' | 'property2' | 'article1' | 'article2') => {
    let urls = '';
    if (type === 'featured') {
      urls = featuredPropertyUrl;
    } else if (type === 'property1') {
      urls = propertyRow1Url1;
    } else if (type === 'property2') {
      urls = propertyRow1Url2;
    } else if (type === 'article1') {
      urls = articleUrl1;
    } else if (type === 'article2') {
      urls = articleUrl2;
    }
    
    if (!urls.trim()) {
      alert('Please enter a URL');
      return;
    }

    setScraping(true);
    try {
      const response = await fetch('/api/emails/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: type.startsWith('article') ? 'blogs' : 'properties', 
          urls: [urls] 
        }),
      });

      const result = await response.json();
      if (result.success && result.data.length > 0) {
        const scrapedItem = result.data[0];
        
        if (type === 'featured') {
          // Add as featured property
          setBuilder(prev => ({ ...prev, featuredProperty: scrapedItem }));
          setFeaturedPropertyUrl('');
        } else if (type === 'property1') {
          // Add to property row 1, position 1
          setBuilder(prev => {
            const newPropertyRows = [...prev.propertyRows];
            if (!newPropertyRows[0]) {
              newPropertyRows[0] = [];
            }
            newPropertyRows[0][0] = scrapedItem;
            return { ...prev, propertyRows: newPropertyRows };
          });
          setPropertyRow1Url1('');
        } else if (type === 'property2') {
          // Add to property row 1, position 2
          setBuilder(prev => {
            const newPropertyRows = [...prev.propertyRows];
            if (!newPropertyRows[0]) {
              newPropertyRows[0] = [];
            }
            newPropertyRows[0][1] = scrapedItem;
            return { ...prev, propertyRows: newPropertyRows };
          });
          setPropertyRow1Url2('');
        } else if (type === 'article1') {
          // Add as first article
          setBuilder(prev => ({ 
            ...prev, 
            articles: [scrapedItem, ...prev.articles.slice(1)]
          }));
          setArticleUrl1('');
        } else if (type === 'article2') {
          // Add as second article
          setBuilder(prev => ({ 
            ...prev, 
            articles: [...prev.articles.slice(0, 1), scrapedItem, ...prev.articles.slice(2)]
          }));
          setArticleUrl2('');
        }
        console.log('Scraped item:', scrapedItem);
        console.log('Current builder state:', builder);
        alert(`Successfully scraped ${type}!`);
      } else {
        alert(`Failed to scrape ${type}: ${result.error || 'No data returned'}`);
      }
    } catch (error) {
      console.error('Error scraping content:', error);
      alert('Failed to scrape content');
    } finally {
      setScraping(false);
    }
  };

  const addRecipient = () => {
    if (newRecipient && !builder.recipients.includes(newRecipient)) {
      setBuilder(prev => ({
        ...prev,
        recipients: [...prev.recipients, newRecipient]
      }));
      setNewRecipient('');
    }
  };

  const removeRecipient = (email: string) => {
    setBuilder(prev => ({
      ...prev,
      recipients: prev.recipients.filter(r => r !== email)
    }));
  };

  const sendNewsletter = async () => {
    if (!builder.featuredProperty || builder.recipients.length === 0) {
      alert('Please select a featured property and add at least one recipient');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/emails/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: builder.recipients,
          subject: builder.subject || `Hot Properties Newsletter - ${new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`,
          previewText: builder.previewText,
          mainProperty: builder.featuredProperty,
          secondaryProperties: builder.propertyRows.flat().slice(0, 4), // Flatten all property rows into secondary properties, limit to 4
          blogPosts: builder.articles,
          templateId: 'newsletter'
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Newsletter sent successfully!');
        // Reset builder
        setBuilder({
          subject: '',
          previewText: '',
          featuredProperty: null,
          propertyRows: [],
          articles: [],
          recipients: []
        });
      } else {
        alert(`Failed to send newsletter: ${result.error}`);
      }
    } catch (error) {
      console.error('Error sending newsletter:', error);
      alert('Failed to send newsletter');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Live Email Builder
          </h1>
          <p className="text-lg text-slate-600">
            Build your newsletter and see it update in real-time
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Builder Panel */}
          <div className="space-y-6">
            {/* Email Details */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Email Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={builder.subject}
                    onChange={(e) => setBuilder(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Hot Properties Newsletter - January 2025"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#29377c] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Preview Text
                  </label>
                  <textarea
                    value={builder.previewText}
                    onChange={(e) => setBuilder(prev => ({ ...prev, previewText: e.target.value }))}
                    placeholder="Check out our latest hot properties for January 2025"
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#29377c] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Featured Property */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Featured Property</h2>
              
              {!builder.featuredProperty ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Featured Property URL
                    </label>
                    <input
                      type="url"
                      value={featuredPropertyUrl}
                      onChange={(e) => setFeaturedPropertyUrl(e.target.value)}
                      placeholder="https://www.alanbatt.co.uk/properties/sale/wigan/wigan/longshaw-old-road-billinge-wn5/"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#29377c] focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={() => scrapeContent('featured')}
                    disabled={scraping || !featuredPropertyUrl.trim()}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {scraping ? 'Scraping...' : 'Scrape Featured Property'}
                  </button>
                </div>
              ) : (
                <div className="border-2 border-[#29377c] rounded-lg p-4 bg-blue-50">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-slate-900">Featured Property</h3>
                    <button
                      onClick={() => setBuilder(prev => ({ ...prev, featuredProperty: null }))}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <img
                    src={builder.featuredProperty.mainImage}
                    alt={builder.featuredProperty.title}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <h4 className="font-semibold text-slate-900">{builder.featuredProperty.title}</h4>
                  <p className="text-sm text-slate-600">{builder.featuredProperty.price}</p>
                </div>
              )}
            </div>

            {/* Property Rows */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Property Row 1</h2>
              <p className="text-sm text-slate-600 mb-4">
                Add 2 properties for the 2-column layout in row 1.
              </p>
              
              {/* Property 1 */}
              <div className="mb-4 p-4 border-2 border-dashed border-slate-300 rounded-lg">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Property 1 URL
                    </label>
                    <input
                      type="url"
                      value={propertyRow1Url1}
                      onChange={(e) => setPropertyRow1Url1(e.target.value)}
                      placeholder="https://www.alanbatt.co.uk/properties/sale/wigan/wigan/greenfield-avenue-ince-wn2/"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#29377c] focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={() => scrapeContent('property1')}
                    disabled={scraping || !propertyRow1Url1.trim()}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {scraping ? 'Scraping...' : 'Scrape Property 1'}
                  </button>
                </div>
              </div>

              {/* Property 2 */}
              <div className="mb-4 p-4 border-2 border-dashed border-slate-300 rounded-lg">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Property 2 URL
                    </label>
                    <input
                      type="url"
                      value={propertyRow1Url2}
                      onChange={(e) => setPropertyRow1Url2(e.target.value)}
                      placeholder="https://www.alanbatt.co.uk/properties/sale/uncategorized/wigan/mitchell-street-wigan-wn5/"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#29377c] focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={() => scrapeContent('property2')}
                    disabled={scraping || !propertyRow1Url2.trim()}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {scraping ? 'Scraping...' : 'Scrape Property 2'}
                  </button>
                </div>
              </div>

              {/* Debug Info */}
              <div className="mb-4 p-2 bg-gray-100 rounded text-xs">
                <strong>Debug:</strong> Property rows: {JSON.stringify(builder.propertyRows, null, 2)}
              </div>

              {/* Display Property Rows */}
              {builder.propertyRows.map((row, rowIndex) => (
                <div key={rowIndex} className="mb-4 border-2 border-[#29377c] rounded-lg p-4 bg-blue-50">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-slate-900">Property Row {rowIndex + 1}</h3>
                    <button
                      onClick={() => setBuilder(prev => ({
                        ...prev,
                        propertyRows: prev.propertyRows.filter((_, i) => i !== rowIndex)
                      }))}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove Row
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {row.map((property, propertyIndex) => (
                      <div key={property.id} className="p-3 bg-white rounded border">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-slate-900 text-xs">Property {propertyIndex + 1}</h4>
                          <button
                            onClick={() => setBuilder(prev => {
                              const newPropertyRows = [...prev.propertyRows];
                              newPropertyRows[rowIndex] = newPropertyRows[rowIndex].filter((_, i) => i !== propertyIndex);
                              return { ...prev, propertyRows: newPropertyRows };
                            })}
                            className="text-red-500 hover:text-red-700 text-xs"
                          >
                            Remove
                          </button>
                        </div>
                        <img
                          src={property.mainImage}
                          alt={property.title}
                          className="w-full h-20 object-cover rounded mb-2"
                        />
                        <h5 className="font-medium text-slate-900 text-xs">{property.title}</h5>
                        <p className="text-xs text-slate-600">{property.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Articles */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Articles</h2>
              
              {/* Article 1 */}
              <div className="mb-4 p-4 border-2 border-dashed border-slate-300 rounded-lg">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Article 1 URL
                    </label>
                    <input
                      type="url"
                      value={articleUrl1}
                      onChange={(e) => setArticleUrl1(e.target.value)}
                      placeholder="https://www.alanbatt.co.uk/the-stepping-stones-to-a-successful-letting/"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#29377c] focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={() => scrapeContent('article1')}
                    disabled={scraping || !articleUrl1.trim()}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {scraping ? 'Scraping...' : 'Scrape Article 1'}
                  </button>
                </div>
              </div>
              
              {/* Article 2 */}
              <div className="mb-4 p-4 border-2 border-dashed border-slate-300 rounded-lg">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Article 2 URL
                    </label>
                    <input
                      type="url"
                      value={articleUrl2}
                      onChange={(e) => setArticleUrl2(e.target.value)}
                      placeholder="https://www.alanbatt.co.uk/the-growing-divide-how-rising-housing-costs-are-reshaping-homeownership-dreams-in-the-uk/"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#29377c] focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={() => scrapeContent('article2')}
                    disabled={scraping || !articleUrl2.trim()}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {scraping ? 'Scraping...' : 'Scrape Article 2'}
                  </button>
                </div>
              </div>

              {/* Display Articles */}
              {builder.articles.map((article, index) => (
                <div key={article.id} className="mb-4 border-2 border-[#29377c] rounded-lg p-4 bg-blue-50">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-slate-900">Article {index + 1}</h3>
                    <button
                      onClick={() => setBuilder(prev => ({
                        ...prev,
                        articles: prev.articles.filter((_, i) => i !== index)
                      }))}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  {article.image && (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                  )}
                  <h4 className="font-semibold text-slate-900">{article.title}</h4>
                  <p className="text-sm text-slate-600 line-clamp-2">{article.excerpt}</p>
                </div>
              ))}
            </div>

            {/* Recipients */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Recipients</h2>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={newRecipient}
                    onChange={(e) => setNewRecipient(e.target.value)}
                    placeholder="Enter email address"
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#29377c] focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && addRecipient()}
                  />
                  <button
                    onClick={addRecipient}
                    className="px-4 py-2 bg-[#29377c] text-white rounded-lg hover:bg-[#1f2a5e] transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {builder.recipients.map((email) => (
                    <div key={email} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                      <span className="text-sm text-slate-700">{email}</span>
                      <button
                        onClick={() => removeRecipient(email)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="space-y-3">
                <button
                  onClick={sendNewsletter}
                  disabled={loading || !builder.featuredProperty || builder.recipients.length === 0}
                  className="w-full bg-[#29377c] text-white py-3 px-4 rounded-lg hover:bg-[#1f2a5e] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Newsletter'}
                </button>
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Live Preview</h2>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              {builder.featuredProperty ? (
                <PropertyNewsletterEmail
                  mainProperty={builder.featuredProperty}
                  secondaryProperties={builder.propertyRows.flat().slice(0, 4)} // Limit to 4 properties for better layout
                  blogPosts={builder.articles}
                  companyName="Alan Batt Estate Agents"
                  companyLogo="/logo.png"
                  companyAddress="78 Market Street, Wigan, WN1 1HX"
                  companyPhone="01942 233 999"
                  salesEmail="sales@alanbatt.co.uk"
                  rentalsEmail="rentals@alanbatt.co.uk"
                />
              ) : (
                <div className="p-12 text-center text-slate-500">
                  <div className="text-4xl mb-4">📧</div>
                  <p>Select a featured property to see the preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

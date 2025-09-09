'use client';

import { useState } from 'react';
import { Property, BlogPost } from '@/lib/email-utils';
import PropertyNewsletterEmail from '@/components/emails/PropertyNewsletterEmail';

interface NewsletterBuilder {
  subject: string;
  previewText: string;
  featuredProperty: Property | null;
  additionalProperties: Property[];
  articles: BlogPost[];
  recipients: string[];
}

export default function LiveEmailBuilderPage() {
  const [builder, setBuilder] = useState<NewsletterBuilder>({
    subject: '',
    previewText: '',
    featuredProperty: null,
    additionalProperties: [],
    articles: [],
    recipients: []
  });

  const [loading, setLoading] = useState(false);
  const [scraping, setScraping] = useState(false);
  const [newRecipient, setNewRecipient] = useState('');
  const [propertyUrls, setPropertyUrls] = useState('');
  const [articleUrls, setArticleUrls] = useState('');


  const scrapeContent = async (type: 'properties' | 'articles') => {
    const urls = type === 'properties' ? propertyUrls : articleUrls;
    
    if (!urls.trim()) {
      alert('Please enter a URL');
      return;
    }

    setScraping(true);
    try {
      const response = await fetch('/api/emails/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: type === 'properties' ? 'properties' : 'blogs', urls: [urls] }),
      });

      const result = await response.json();
      if (result.success && result.data.length > 0) {
        const scrapedItem = result.data[0];
        
        if (type === 'properties') {
          if (!builder.featuredProperty) {
            // Add as featured property
            setBuilder(prev => ({ ...prev, featuredProperty: scrapedItem }));
          } else {
            // Add as additional property
            setBuilder(prev => ({ 
              ...prev, 
              additionalProperties: [...prev.additionalProperties, scrapedItem]
            }));
          }
          setPropertyUrls('');
        } else {
          // Add as article
          setBuilder(prev => ({ 
            ...prev, 
            articles: [...prev.articles, scrapedItem]
          }));
          setArticleUrls('');
        }
        alert(`Successfully scraped ${type.slice(0, -1)}!`);
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
          secondaryProperties: builder.additionalProperties,
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
          additionalProperties: [],
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
                      Property URL
                    </label>
                    <input
                      type="url"
                      value={propertyUrls}
                      onChange={(e) => setPropertyUrls(e.target.value)}
                      placeholder="https://example.com/property-url"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#29377c] focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={() => scrapeContent('properties')}
                    disabled={scraping || !propertyUrls.trim()}
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

            {/* Additional Properties */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Additional Properties</h2>
              
              {/* Add New Property */}
              <div className="mb-4 p-4 border-2 border-dashed border-slate-300 rounded-lg">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Property URL
                    </label>
                    <input
                      type="url"
                      value={propertyUrls}
                      onChange={(e) => setPropertyUrls(e.target.value)}
                      placeholder="https://example.com/property-url"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#29377c] focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={() => scrapeContent('properties')}
                    disabled={scraping || !propertyUrls.trim() || builder.additionalProperties.length >= 2}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {scraping ? 'Scraping...' : `Add Property ${builder.additionalProperties.length + 1}`}
                  </button>
                </div>
              </div>

              {/* Display Additional Properties */}
              {builder.additionalProperties.map((property, index) => (
                <div key={property.id} className="mb-4 border-2 border-[#29377c] rounded-lg p-4 bg-blue-50">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-slate-900">Property {index + 1}</h3>
                    <button
                      onClick={() => setBuilder(prev => ({
                        ...prev,
                        additionalProperties: prev.additionalProperties.filter((_, i) => i !== index)
                      }))}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <img
                    src={property.mainImage}
                    alt={property.title}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <h4 className="font-semibold text-slate-900">{property.title}</h4>
                  <p className="text-sm text-slate-600">{property.price}</p>
                </div>
              ))}
            </div>

            {/* Articles */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Articles</h2>
              
              {/* Add New Article */}
              <div className="mb-4 p-4 border-2 border-dashed border-slate-300 rounded-lg">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Article URL
                    </label>
                    <input
                      type="url"
                      value={articleUrls}
                      onChange={(e) => setArticleUrls(e.target.value)}
                      placeholder="https://www.alanbatt.co.uk/article-url"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#29377c] focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={() => scrapeContent('articles')}
                    disabled={scraping || !articleUrls.trim()}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {scraping ? 'Scraping...' : 'Add Article'}
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
                  secondaryProperties={builder.additionalProperties}
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

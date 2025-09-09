'use client';

import { useState, useEffect } from 'react';
import { Property, BlogPost } from '@/lib/email-utils';

interface NewsletterFormData {
  subject: string;
  previewText: string;
  mainProperty: Property | null;
  secondaryProperties: Property[];
  blogPosts: BlogPost[];
  recipients: string[];
}

export default function CreateNewsletterPage() {
  const [formData, setFormData] = useState<NewsletterFormData>({
    subject: '',
    previewText: '',
    mainProperty: null,
    secondaryProperties: [],
    blogPosts: [],
    recipients: []
  });

  const [availableProperties, setAvailableProperties] = useState<Property[]>([]);
  const [availableBlogPosts, setAvailableBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [, setPreviewMode] = useState(false);
  const [newRecipient, setNewRecipient] = useState('');
  const [scrapingUrls, setScrapingUrls] = useState({
    properties: '',
    blogs: ''
  });
  const [scraping, setScraping] = useState(false);

  // Load available data
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api/emails/data');
        const data = await response.json();
        setAvailableProperties(data.properties || []);
        setAvailableBlogPosts(data.blogPosts || []);
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
    loadData();
  }, []);

  const handlePropertySelect = (property: Property, type: 'main' | 'secondary') => {
    if (type === 'main') {
      setFormData(prev => ({ ...prev, mainProperty: property }));
    } else {
      setFormData(prev => ({
        ...prev,
        secondaryProperties: prev.secondaryProperties.includes(property)
          ? prev.secondaryProperties.filter(p => p.id !== property.id)
          : [...prev.secondaryProperties, property]
      }));
    }
  };

  const handleBlogPostSelect = (blogPost: BlogPost) => {
    setFormData(prev => ({
      ...prev,
      blogPosts: prev.blogPosts.includes(blogPost)
        ? prev.blogPosts.filter(b => b.id !== blogPost.id)
        : [...prev.blogPosts, blogPost]
    }));
  };

  const addRecipient = () => {
    if (newRecipient && !formData.recipients.includes(newRecipient)) {
      setFormData(prev => ({
        ...prev,
        recipients: [...prev.recipients, newRecipient]
      }));
      setNewRecipient('');
    }
  };

  const removeRecipient = (email: string) => {
    setFormData(prev => ({
      ...prev,
      recipients: prev.recipients.filter(r => r !== email)
    }));
  };

  const scrapeContent = async (type: 'properties' | 'blogs') => {
    const urls = scrapingUrls[type].split('\n').filter(url => url.trim());
    if (urls.length === 0) {
      alert('Please enter at least one URL');
      return;
    }

    setScraping(true);
    try {
      const response = await fetch('/api/emails/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          urls
        }),
      });

      const result = await response.json();
      if (result.success) {
        if (type === 'properties') {
          setAvailableProperties(prev => [...prev, ...result.data]);
        } else {
          setAvailableBlogPosts(prev => [...prev, ...result.data]);
        }
        setScrapingUrls(prev => ({ ...prev, [type]: '' }));
        alert(`Successfully scraped ${result.count} ${type}`);
      } else {
        alert(`Failed to scrape ${type}: ${result.error}`);
      }
    } catch (error) {
      console.error('Error scraping content:', error);
      alert('Failed to scrape content');
    } finally {
      setScraping(false);
    }
  };

  const handlePreview = async () => {
    setPreviewMode(true);
    // Preview will be handled by opening a new window/tab
    const previewUrl = `/emails/preview/create?${new URLSearchParams({
      subject: formData.subject,
      previewText: formData.previewText,
      mainProperty: formData.mainProperty?.id || '',
      secondaryProperties: formData.secondaryProperties.map(p => p.id).join(','),
      blogPosts: formData.blogPosts.map(b => b.id).join(',')
    })}`;
    window.open(previewUrl, '_blank');
  };

  const handleSend = async () => {
    if (!formData.mainProperty || formData.recipients.length === 0) {
      alert('Please select a main property and add at least one recipient');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/emails/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: formData.recipients,
          subject: formData.subject || `Hot Properties Newsletter - ${new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`,
          previewText: formData.previewText,
          mainProperty: formData.mainProperty,
          secondaryProperties: formData.secondaryProperties,
          blogPosts: formData.blogPosts,
          templateId: 'newsletter'
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert('Newsletter sent successfully!');
        // Reset form
        setFormData({
          subject: '',
          previewText: '',
          mainProperty: null,
          secondaryProperties: [],
          blogPosts: [],
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Create Newsletter
          </h1>
          <p className="text-lg text-slate-600">
            Build and send your property newsletter with custom content
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
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
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Hot Properties Newsletter - January 2025"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#29377c] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Preview Text
                  </label>
                  <textarea
                    value={formData.previewText}
                    onChange={(e) => setFormData(prev => ({ ...prev, previewText: e.target.value }))}
                    placeholder="Check out our latest hot properties for January 2025"
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#29377c] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Property Selection */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Select Properties</h2>
              
              {/* Main Property */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Featured Property</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableProperties.map((property) => (
                    <div
                      key={property.id}
                      onClick={() => handlePropertySelect(property, 'main')}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.mainProperty?.id === property.id
                          ? 'border-[#29377c] bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
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
              </div>

              {/* Secondary Properties */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-3">Additional Properties</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableProperties.map((property) => (
                    <div
                      key={property.id}
                      onClick={() => handlePropertySelect(property, 'secondary')}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.secondaryProperties.some(p => p.id === property.id)
                          ? 'border-[#29377c] bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
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
              </div>
            </div>

            {/* Content Scraping */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Scrape Content from URLs</h2>
              <p className="text-slate-600 text-sm mb-6">
                Enter URLs to automatically scrape property and blog content for your newsletter
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Property URLs */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Property URLs</h3>
                  <textarea
                    value={scrapingUrls.properties}
                    onChange={(e) => setScrapingUrls(prev => ({ ...prev, properties: e.target.value }))}
                    placeholder="Enter property URLs (one per line):&#10;https://example.com/property-1&#10;https://example.com/property-2"
                    rows={4}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#29377c] focus:border-transparent text-sm"
                  />
                  <button
                    onClick={() => scrapeContent('properties')}
                    disabled={scraping || !scrapingUrls.properties.trim()}
                    className="mt-2 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {scraping ? 'Scraping...' : 'Scrape Properties'}
                  </button>
                </div>

                {/* Blog URLs */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">Blog URLs</h3>
                  <textarea
                    value={scrapingUrls.blogs}
                    onChange={(e) => setScrapingUrls(prev => ({ ...prev, blogs: e.target.value }))}
                    placeholder="Enter blog URLs (one per line):&#10;https://example.com/blog-1&#10;https://example.com/blog-2"
                    rows={4}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#29377c] focus:border-transparent text-sm"
                  />
                  <button
                    onClick={() => scrapeContent('blogs')}
                    disabled={scraping || !scrapingUrls.blogs.trim()}
                    className="mt-2 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {scraping ? 'Scraping...' : 'Scrape Blogs'}
                  </button>
                </div>
              </div>
            </div>

            {/* Blog Posts */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Select Blog Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableBlogPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => handleBlogPostSelect(post)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.blogPosts.some(b => b.id === post.id)
                        ? 'border-[#29377c] bg-blue-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-32 object-cover rounded mb-3"
                      />
                    )}
                    <h4 className="font-semibold text-slate-900">{post.title}</h4>
                    <p className="text-sm text-slate-600 line-clamp-2">{post.excerpt}</p>
                  </div>
                ))}
              </div>
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
                  {formData.recipients.map((email) => (
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
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={handlePreview}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Preview Email
                </button>
                <button
                  onClick={handleSend}
                  disabled={loading || !formData.mainProperty || formData.recipients.length === 0}
                  className="w-full bg-[#29377c] text-white py-3 px-4 rounded-lg hover:bg-[#1f2a5e] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Newsletter'}
                </button>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Featured Property:</span>
                  <span className="font-medium">
                    {formData.mainProperty ? 'Selected' : 'None'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Additional Properties:</span>
                  <span className="font-medium">{formData.secondaryProperties.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Blog Posts:</span>
                  <span className="font-medium">{formData.blogPosts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Recipients:</span>
                  <span className="font-medium">{formData.recipients.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

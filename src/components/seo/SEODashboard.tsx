'use client';

import { useState, useEffect } from 'react';
import { SEOMetrics } from '@/types/seo';

import { SERPWidget } from './SERPWidget';
import { PageSpeedWidget } from './PageSpeedWidget';
import { KeywordsWidget } from './KeywordsWidget';

export default function SEODashboard() {
  const [seoData, setSeoData] = useState<SEOMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('serp');

  useEffect(() => {
    loadSEOData();
  }, []);

  const loadSEOData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/seo');
      if (response.ok) {
        const result = await response.json();
        setSeoData(result.data);
      } else {
        setError('Failed to load SEO data');
      }
    } catch (err) {
      setError('Error loading SEO data');
      console.error('Error loading SEO data:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    loadSEOData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-lg text-slate-600">Loading SEO data for alanbatt.co.uk...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !seoData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="bg-red-100 rounded-full h-32 w-32 flex items-center justify-center mx-auto mb-6">
              <span className="text-6xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Error Loading SEO Data</h2>
            <p className="text-slate-600 mb-6">{error || 'Failed to load SEO data'}</p>
            <button
              onClick={refreshData}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">SEO Dashboard</h1>
              <p className="text-slate-600 mt-1">
                alanbatt.co.uk • Last updated: {new Date(seoData.lastUpdated).toLocaleString()}
              </p>
            </div>
            <button
              onClick={refreshData}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'serp', label: 'SERP Analysis', icon: '' },
              { id: 'page-speed', label: 'Page Speed', icon: '' },
              { id: 'keywords', label: 'Keywords', icon: '' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">


        {activeTab === 'serp' && (
          <SERPWidget data={seoData.serpData} />
        )}

        {activeTab === 'page-speed' && (
          <PageSpeedWidget data={seoData.pageSpeed} />
        )}

        {activeTab === 'keywords' && (
          <KeywordsWidget data={seoData.keywords} />
        )}
      </div>
    </div>
  );
}

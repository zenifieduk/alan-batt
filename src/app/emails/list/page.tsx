'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NewsletterItem {
  id: string;
  title: string;
  subject: string;
  createdAt: Date;
  status: 'draft' | 'sent' | 'scheduled';
  recipients: number;
  properties: number;
  articles: number;
}

export default function EmailListPage() {
  const [newsletters, setNewsletters] = useState<NewsletterItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real email data - only the actual created email
    const realNewsletters: NewsletterItem[] = [
      {
        id: '1',
        title: 'August Newsletter',
        subject: 'August Newsletter - Latest Properties & Market Updates',
        createdAt: new Date('2025-08-01'),
        status: 'sent',
        recipients: 0, // No fake stats - will be populated when actually sent
        properties: 3,
        articles: 2
      }
    ];

    setTimeout(() => {
      setNewsletters(realNewsletters);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return '✅';
      case 'draft':
        return '📝';
      case 'scheduled':
        return '⏰';
      default:
        return '📄';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#29377c] mx-auto mb-4"></div>
            <p className="text-slate-600">Loading newsletters...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Newsletter Library
            </h1>
            <p className="text-lg text-slate-600">
              View and manage all your created newsletters
            </p>
          </div>
          <Link
            href="/emails/create"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Create New Newsletter
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
            <div className="text-2xl font-bold text-slate-900">{newsletters.length}</div>
            <div className="text-sm text-slate-600">Total Newsletters</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
            <div className="text-2xl font-bold text-green-600">
              {newsletters.filter(n => n.status === 'sent').length}
            </div>
            <div className="text-sm text-slate-600">Sent</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
            <div className="text-2xl font-bold text-yellow-600">
              {newsletters.filter(n => n.status === 'draft').length}
            </div>
            <div className="text-sm text-slate-600">Drafts</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-6">
            <div className="text-2xl font-bold text-blue-600">
              {newsletters.reduce((sum, n) => sum + n.recipients, 0) || '0'}
            </div>
            <div className="text-sm text-slate-600">Total Recipients</div>
          </div>
        </div>

        {/* Newsletter List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-bold text-slate-900">All Newsletters</h2>
          </div>
          
          <div className="divide-y divide-slate-200">
            {newsletters.map((newsletter) => (
              <div key={newsletter.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {newsletter.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(newsletter.status)}`}>
                        {getStatusIcon(newsletter.status)} {newsletter.status.charAt(0).toUpperCase() + newsletter.status.slice(1)}
                      </span>
                    </div>
                    
                    <p className="text-slate-600 text-sm mb-3">
                      Subject: {newsletter.subject}
                    </p>
                    
                    <div className="flex items-center gap-6 text-sm text-slate-500">
                      <span>📅 {newsletter.createdAt.toLocaleDateString()}</span>
                      <span>👥 {newsletter.recipients > 0 ? `${newsletter.recipients} recipients` : 'Not sent yet'}</span>
                      <span>🏠 {newsletter.properties} properties</span>
                      <span>📰 {newsletter.articles} articles</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Link
                      href={`/emails/preview/${newsletter.id}`}
                      className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-slate-700 font-medium"
                    >
                      Preview
                    </Link>
                    
                    {newsletter.status === 'draft' && (
                      <Link
                        href={`/emails/edit/${newsletter.id}`}
                        className="px-4 py-2 bg-[#29377c] text-white rounded-lg hover:bg-[#1f2a5e] transition-colors font-medium"
                      >
                        Edit
                      </Link>
                    )}
                    
                    {newsletter.status === 'sent' && (
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                        Resend
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {newsletters.length === 0 && (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">📧</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No newsletters yet</h3>
              <p className="text-slate-600 mb-6">Create your first newsletter to get started</p>
              <Link
                href="/emails/create"
                className="bg-[#29377c] text-white px-6 py-3 rounded-lg hover:bg-[#1f2a5e] transition-colors font-medium"
              >
                Create Newsletter
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

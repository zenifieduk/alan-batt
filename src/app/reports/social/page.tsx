'use client';

import { useState } from 'react';
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Facebook, BarChart3, RefreshCw } from "lucide-react"
import SocialMediaDashboard from '@/components/analytics/dashboard/SocialMediaDashboard'
import { useSocialData } from '@/lib/hooks/useSocialData'

export default function SocialAnalyticsPage() {
  const [currentPeriod, setCurrentPeriod] = useState('all');
  const { data, loading, error, meta, refresh } = useSocialData(currentPeriod);

  const handlePeriodChange = (period: string) => {
    setCurrentPeriod(period);
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <main className="px-8 py-16 pt-24 md:pt-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-lg text-slate-600">Loading your social media data...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <main className="px-8 py-16 pt-24 md:pt-16">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 max-w-md mx-auto">
              <h2 className="text-xl font-bold text-red-800 mb-4">Error Loading Data</h2>
              <p className="text-red-700 mb-4">{error}</p>
              <Button onClick={refresh} className="bg-red-600 hover:bg-red-700 text-white">
                Try Again
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Main Content */}
      <main className="px-8 py-16 pt-24 md:pt-16">
        <div className="max-w-6xl mx-auto">


          {/* Reports Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-2">
              <div className="flex space-x-1">
                <Button 
                  variant="ghost" 
                  className="px-6 py-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200"
                  disabled
                >
                  <Facebook className="h-4 w-4 mr-2" />
                  Social Analytics
                </Button>
                <Button 
                  variant="ghost" 
                  asChild
                  className="px-6 py-2 rounded-xl hover:bg-slate-50 text-slate-600"
                >
                  <Link href="/reports">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Web Analytics
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Facebook className="h-6 w-6 text-blue-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Social Media Analytics</h1>
            </div>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Live insights from your Facebook and Instagram CSV data exports
            </p>
            <div className="mt-4 flex items-center justify-center space-x-4">
              <Button onClick={refresh} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
              <span className="text-sm text-slate-500">
                Last updated: {data?.lastUpdated ? new Date(data.lastUpdated).toLocaleString() : 'Unknown'}
              </span>
            </div>
          </div>

          {/* Data Status */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <div className="flex items-center space-x-3">
              <div className="h-5 w-5 bg-green-500 rounded-full"></div>
              <div>
                <h3 className="font-semibold text-green-800">CSV Data Loaded</h3>
                <p className="text-green-700 text-sm">
                  Your Facebook and Instagram CSV files have been automatically processed and analytics are displayed below.
                </p>
              </div>
            </div>
          </div>

          {/* Social Media Dashboard */}
          <SocialMediaDashboard 
            data={data}
            loading={loading}
            error={error}
            meta={meta || undefined}
            onRefresh={refresh}
            onPeriodChange={handlePeriodChange}
            currentPeriod={currentPeriod}
          />





          {/* Data Source Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Data Source Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <p><strong>Source:</strong> Facebook Business Suite & Instagram CSV Exports</p>
                <p><strong>Date Range:</strong> Last 90 days</p>
                <p><strong>Update Frequency:</strong> Manual (when you export new data)</p>
              </div>
              <div>
                <p><strong>Metrics Included:</strong> Views, Follows, Reach, Interactions, Visits, Link Clicks</p>
                <p><strong>Data Format:</strong> Business Suite Standard Export</p>
                <p><strong>Last Export:</strong> {data?.lastUpdated ? new Date(data.lastUpdated).toLocaleDateString() : 'Unknown'}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-slate-500">
        <p>&copy; 2025 Alan Batt Technology Hub. Social media analytics powered by CSV data exports.</p>
      </footer>
    </div>
  )
}

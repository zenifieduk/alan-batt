"use client";

import { useState } from 'react';
import { Users, Eye, MousePointer, Clock, TrendingUp, Calendar } from 'lucide-react';
import { MetricCard } from '../cards/MetricCard';
import { PageViewsChart } from '../charts/PageViewsChart';
import { TrafficSourcesChart } from '../charts/TrafficSourcesChart';
import { RealTimeWidget } from './RealTimeWidget';
import { useAnalytics } from '@/lib/hooks/useAnalytics';

interface AnalyticsData {
  dateRange?: {
    start: string;
    end: string;
    period: string;
  };
  overview: {
    sessions: { value: number; changePercent: number };
    users: { value: number; changePercent: number };
    pageViews: { value: number; changePercent: number };
    bounceRate: { value: number; changePercent: number };
    sessionDuration: { value: number; changePercent: number };
  };
  trends: {
    pageViews: Array<{
      date: string;
      pageViews: number;
      sessions: number;
    }>;
  };
  trafficSources: Array<{
    source: string;
    sessions: number;
    percentage: number;
  }>;
}

// Dashboard with live data
const mockAnalyticsData: AnalyticsData = {
  dateRange: {
    start: '2024-01-01',
    end: '2024-01-30',
    period: '30d',
  },
  overview: {
    sessions: { value: 12547, changePercent: 18.2 },
    users: { value: 8943, changePercent: 15.7 },
    pageViews: { value: 23891, changePercent: 22.1 },
    bounceRate: { value: 42.3, changePercent: -5.8 },
    sessionDuration: { value: 185, changePercent: 12.4 },
  },
  trends: {
    pageViews: [
      { date: '2024-01-15', pageViews: 1850, sessions: 1240 },
      { date: '2024-01-16', pageViews: 2100, sessions: 1450 },
      { date: '2024-01-17', pageViews: 1920, sessions: 1320 },
      { date: '2024-01-18', pageViews: 2350, sessions: 1680 },
      { date: '2024-01-19', pageViews: 2180, sessions: 1520 },
      { date: '2024-01-20', pageViews: 2450, sessions: 1750 },
      { date: '2024-01-21', pageViews: 2680, sessions: 1890 },
    ],
  },
  trafficSources: [
    { source: 'Organic Search', sessions: 4892, percentage: 38.9 },
    { source: 'Direct', sessions: 3516, percentage: 28.0 },
    { source: 'Social Media', sessions: 2205, percentage: 17.6 },
    { source: 'Referral', sessions: 1354, percentage: 10.8 },
    { source: 'Email', sessions: 580, percentage: 4.6 },
  ],
};

export function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState('30d');

  const { data: analyticsData, loading, error, refresh } = useAnalytics({
    refreshInterval: 60000, // Refresh every minute
    dateRange,
    autoRefresh: true,
  });

  // Debug logging to verify date range changes
  console.log('🔄 Dashboard - Current date range:', dateRange);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatBounceRate = (rate: number) => {
    return `${rate.toFixed(1)}%`;
  };

  const formatDateRange = (period: string) => {
    switch (period) {
      case '7d': return 'Last 7 days';
      case '14d': return 'Last 14 days';
      case '30d': return 'Last 30 days';
      case '90d': return 'Last 90 days';
      default: return 'Last 30 days';
    }
  };

  if (loading && !analyticsData) {
    return (
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Analytics Dashboard
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Loading analytics data...
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 animate-pulse">
              <div className="h-4 bg-slate-200 rounded mb-2"></div>
              <div className="h-8 bg-slate-200 rounded mb-2"></div>
              <div className="h-3 bg-slate-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-bold text-red-600 mb-4">Error Loading Dashboard</h2>
        <p className="text-slate-600">{error}</p>
      </div>
    );
  }

  const data = (analyticsData as AnalyticsData) || mockAnalyticsData;

  // Check if we have real data (not zeros)
  const hasRealData = data?.overview?.users?.value > 0 || data?.overview?.sessions?.value > 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Analytics Dashboard
          {hasRealData && (
            <span className="ml-3 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Live Data
            </span>
          )}
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-6">
          {hasRealData
            ? "Real-time insights and performance metrics for your website"
            : "Loading analytics data from Google Analytics 4..."
          }
        </p>

        {/* Real-Time Activity Widget */}
        <div className="mb-6">
          <RealTimeWidget />
        </div>

        {/* Date Range Selector */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <div className="flex items-center space-x-2 text-slate-600">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">Time Period:</span>
          </div>
          <div className="flex space-x-2">
            {['7d', '14d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  dateRange === range
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/60 text-slate-600 hover:bg-white/80'
                }`}
              >
                {formatDateRange(range)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Date Range Display */}
        {data.dateRange && (
          <div className="text-sm text-slate-500">
            Showing data from {data.dateRange.start} to {data.dateRange.end}
            <span className="ml-2 text-blue-600 font-medium">
              ({formatDateRange(data.dateRange.period)})
            </span>
          </div>
        )}

        {/* Current Selection Indicator */}
        <div className="flex items-center justify-center space-x-4 mt-4">
          <div className="text-xs text-slate-400">
            Selected: <span className="font-medium text-blue-600">{formatDateRange(dateRange)}</span>
          </div>

          {/* Manual Refresh Button */}
          <button
            onClick={refresh}
            disabled={loading}
            className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
          >
            <TrendingUp className="h-3 w-3" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard
          title="Total Sessions"
          value={data.overview.sessions.value}
          changePercent={data.overview.sessions.changePercent}
          icon={<Users className="h-5 w-5 text-blue-600" />}
          comparisonPeriod={formatDateRange(dateRange).toLowerCase()}
        />
        
        <MetricCard
          title="Unique Users"
          value={data.overview.users.value}
          changePercent={data.overview.users.changePercent}
          icon={<Eye className="h-5 w-5 text-green-600" />}
          comparisonPeriod={formatDateRange(dateRange).toLowerCase()}
        />
        
        <MetricCard
          title="Page Views"
          value={data.overview.pageViews.value}
          changePercent={data.overview.pageViews.changePercent}
          icon={<MousePointer className="h-5 w-5 text-purple-600" />}
          comparisonPeriod={formatDateRange(dateRange).toLowerCase()}
        />
        
        <MetricCard
          title="Bounce Rate"
          value={formatBounceRate(data.overview.bounceRate.value)}
          changePercent={data.overview.bounceRate.changePercent}
          icon={<TrendingUp className="h-5 w-5 text-orange-600" />}
          comparisonPeriod={formatDateRange(dateRange).toLowerCase()}
        />
        
        <MetricCard
          title="Avg. Session"
          value={formatDuration(data.overview.sessionDuration.value)}
          changePercent={data.overview.sessionDuration.changePercent}
          icon={<Clock className="h-5 w-5 text-indigo-600" />}
          comparisonPeriod={formatDateRange(dateRange).toLowerCase()}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Page Views Trend */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Page Views & Sessions Over Time</h2>
          <p className="text-sm text-slate-600 mb-4">Daily trends for the selected period</p>
          <PageViewsChart data={data.trends.pageViews} />
        </div>

        {/* Traffic Sources */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 min-h-[500px]">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Traffic Sources Breakdown</h2>
          <p className="text-sm text-slate-600 mb-4">Where your visitors are coming from</p>
          <TrafficSourcesChart data={data.trafficSources} />
        </div>
      </div>

    </div>
  );
}
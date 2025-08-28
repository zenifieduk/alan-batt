/**
 * Example GA4 Dashboard Components for Next.js with TypeScript
 * Beautiful, responsive analytics dashboard components using Recharts
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type {
  AnalyticsDashboardData,
  OverviewMetrics,
  TrafficData,
  RealtimeData,
  PageMetrics,
  SourceMetrics,
  DeviceMetrics,
} from '@/types/analytics';

// Custom hook for fetching analytics data
function useAnalytics(dateRange: { startDate: string; endDate: string }) {
  const [data, setData] = useState<AnalyticsDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `/api/analytics/dashboard?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.message || 'Failed to fetch analytics data');
        }
        
        setData(result.data);
      } catch (err: any) {
        console.error('Analytics fetch error:', err);
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange.startDate, dateRange.endDate]);

  return { data, loading, error };
}

// Overview metrics cards component
interface MetricCardProps {
  title: string;
  value: number;
  previousValue?: number;
  format?: 'number' | 'currency' | 'percentage' | 'duration';
  icon?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  previousValue, 
  format = 'number',
  icon 
}) => {
  const formatValue = (val: number, fmt: string): string => {
    switch (fmt) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(val);
      case 'percentage':
        return `${val.toFixed(2)}%`;
      case 'duration':
        const minutes = Math.floor(val / 60);
        const seconds = Math.floor(val % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
      default:
        return new Intl.NumberFormat('en-US').format(val);
    }
  };

  const growth = previousValue 
    ? ((value - previousValue) / previousValue) * 100 
    : 0;

  const isPositive = growth > 0;
  const isNegative = growth < 0;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {icon}
          <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        </div>
        {previousValue !== undefined && (
          <div className={`text-sm flex items-center ${
            isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-500'
          }`}>
            <span className="mr-1">
              {isPositive ? '↗' : isNegative ? '↘' : '→'}
            </span>
            {Math.abs(growth).toFixed(1)}%
          </div>
        )}
      </div>
      <div className="mt-2">
        <p className="text-3xl font-bold text-gray-900">
          {formatValue(value, format)}
        </p>
        {previousValue !== undefined && (
          <p className="text-xs text-gray-500 mt-1">
            vs {formatValue(previousValue, format)} prev period
          </p>
        )}
      </div>
    </div>
  );
};

// Overview section component
interface OverviewSectionProps {
  data: OverviewMetrics;
}

const OverviewSection: React.FC<OverviewSectionProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
      <MetricCard
        title="Total Users"
        value={data.totalUsers}
        previousValue={data.previousPeriod?.totalUsers}
        icon={<span className="text-blue-500">👥</span>}
      />
      <MetricCard
        title="New Users"
        value={data.newUsers}
        previousValue={data.previousPeriod?.newUsers}
        icon={<span className="text-green-500">👤</span>}
      />
      <MetricCard
        title="Sessions"
        value={data.sessions}
        previousValue={data.previousPeriod?.sessions}
        icon={<span className="text-purple-500">📊</span>}
      />
      <MetricCard
        title="Page Views"
        value={data.pageViews}
        previousValue={data.previousPeriod?.pageViews}
        icon={<span className="text-orange-500">📄</span>}
      />
      <MetricCard
        title="Bounce Rate"
        value={data.bounceRate}
        previousValue={data.previousPeriod?.bounceRate}
        format="percentage"
        icon={<span className="text-red-500">⚡</span>}
      />
    </div>
  );
};

// Traffic chart component
interface TrafficChartProps {
  data: TrafficData[];
}

const TrafficChart: React.FC<TrafficChartProps> = ({ data }) => {
  const chartData = data.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }),
  }));

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Traffic Over Time</h3>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            formatter={(value, name) => [
              new Intl.NumberFormat().format(value as number),
              name === 'activeUsers' ? 'Users' : 
              name === 'sessions' ? 'Sessions' : 
              name === 'pageViews' ? 'Page Views' : name
            ]}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="activeUsers"
            stackId="1"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.6}
            name="Users"
          />
          <Area
            type="monotone"
            dataKey="sessions"
            stackId="1"
            stroke="#10B981"
            fill="#10B981"
            fillOpacity={0.6}
            name="Sessions"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// Real-time users component
interface RealTimeUsersProps {
  data: RealtimeData;
}

const RealTimeUsers: React.FC<RealTimeUsersProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Real-time Users</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Live</span>
        </div>
      </div>
      
      <div className="text-center mb-6">
        <p className="text-4xl font-bold text-green-600">{data.activeUsers}</p>
        <p className="text-sm text-gray-600">users right now</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Top Countries</h4>
          <div className="space-y-1">
            {data.topCountries.slice(0, 3).map((country, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{country.country}</span>
                <span className="font-medium">{country.activeUsers}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">Devices</h4>
          <div className="space-y-1">
            {data.deviceBreakdown.map((device, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="capitalize">{device.deviceCategory}</span>
                <span className="font-medium">{device.activeUsers}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Top pages table component
interface TopPagesProps {
  data: PageMetrics[];
}

const TopPages: React.FC<TopPagesProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Top Pages</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 text-sm font-medium text-gray-600">Page</th>
              <th className="text-right py-2 text-sm font-medium text-gray-600">Views</th>
              <th className="text-right py-2 text-sm font-medium text-gray-600">Avg Time</th>
              <th className="text-right py-2 text-sm font-medium text-gray-600">Bounce Rate</th>
            </tr>
          </thead>
          <tbody>
            {data.map((page, index) => (
              <tr key={index} className="border-b last:border-0">
                <td className="py-3">
                  <div>
                    <p className="font-medium text-sm text-gray-900 truncate max-w-xs">
                      {page.pageTitle || page.pagePath}
                    </p>
                    <p className="text-xs text-gray-500 truncate max-w-xs">
                      {page.pagePath}
                    </p>
                  </div>
                </td>
                <td className="text-right py-3 text-sm">
                  {new Intl.NumberFormat().format(page.views)}
                </td>
                <td className="text-right py-3 text-sm">
                  {Math.floor(page.averageTimeOnPage / 60)}:
                  {Math.floor(page.averageTimeOnPage % 60).toString().padStart(2, '0')}
                </td>
                <td className="text-right py-3 text-sm">
                  {page.bounceRate.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Traffic sources chart
interface TrafficSourcesProps {
  data: SourceMetrics[];
}

const TrafficSources: React.FC<TrafficSourcesProps> = ({ data }) => {
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];
  
  const chartData = data.map((source, index) => ({
    name: `${source.source}${source.medium !== '(none)' ? ` / ${source.medium}` : ''}`,
    value: source.sessions,
    percentage: (source.sessions / data.reduce((sum, s) => sum + s.sessions, 0)) * 100,
    color: colors[index % colors.length],
  }));

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [
                new Intl.NumberFormat().format(value as number),
                'Sessions'
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="space-y-3">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium truncate max-w-xs">
                  {item.name}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  {new Intl.NumberFormat().format(item.value)}
                </p>
                <p className="text-xs text-gray-500">
                  {item.percentage.toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Device breakdown chart
interface DeviceBreakdownProps {
  data: DeviceMetrics[];
}

const DeviceBreakdown: React.FC<DeviceBreakdownProps> = ({ data }) => {
  const chartData = data.map(device => ({
    device: device.deviceCategory,
    users: device.users,
    sessions: device.sessions,
    conversionRate: device.conversionRate,
  }));

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Device Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="device" />
          <YAxis />
          <Tooltip
            formatter={(value, name) => [
              new Intl.NumberFormat().format(value as number),
              name === 'users' ? 'Users' : 'Sessions'
            ]}
          />
          <Legend />
          <Bar dataKey="users" fill="#3B82F6" name="Users" />
          <Bar dataKey="sessions" fill="#10B981" name="Sessions" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Date range selector
interface DateRangeSelectorProps {
  value: { startDate: string; endDate: string };
  onChange: (range: { startDate: string; endDate: string }) => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ value, onChange }) => {
  const presets = [
    { label: 'Last 7 days', startDate: '7daysAgo', endDate: 'today' },
    { label: 'Last 30 days', startDate: '30daysAgo', endDate: 'today' },
    { label: 'Last 90 days', startDate: '90daysAgo', endDate: 'today' },
    { label: 'Last 6 months', startDate: '180daysAgo', endDate: 'today' },
    { label: 'Last year', startDate: '365daysAgo', endDate: 'today' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <label className="text-sm font-medium text-gray-700 mr-2">Date Range:</label>
      {presets.map((preset) => (
        <button
          key={preset.label}
          onClick={() => onChange(preset)}
          className={`px-3 py-1 text-sm rounded-md border ${
            value.startDate === preset.startDate && value.endDate === preset.endDate
              ? 'bg-blue-50 border-blue-200 text-blue-700'
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
};

// Main dashboard component
const AnalyticsDashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState({
    startDate: '30daysAgo',
    endDate: 'today',
  });

  const { data, loading, error } = useAnalytics(dateRange);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error Loading Analytics
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No analytics data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Comprehensive insights into your website performance
          </p>
        </div>

        <DateRangeSelector value={dateRange} onChange={setDateRange} />

        <OverviewSection data={data.overview} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <TrafficChart data={data.traffic} />
          </div>
          <RealTimeUsers data={data.realtime} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <TrafficSources data={data.sources} />
          <DeviceBreakdown data={data.devices} />
        </div>

        <TopPages data={data.topPages} />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

// Export individual components for reuse
export {
  MetricCard,
  OverviewSection,
  TrafficChart,
  RealTimeUsers,
  TopPages,
  TrafficSources,
  DeviceBreakdown,
  DateRangeSelector,
  useAnalytics,
};
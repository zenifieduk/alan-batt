"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, BarChart3, TrendingUp, Users, Eye, Share2, ExternalLink, Calendar } from 'lucide-react';
import SocialMediaTrendsChart from '../charts/SocialMediaTrendsChart';
import { formatNumber } from '@/lib/utils';

interface DailyMetric {
  date: string;
  views: number;
  follows: number;
  reach: number;
  interactions: number;
  visits: number;
  linkClicks: number;
}

interface SocialMediaData {
  views: number;
  follows: number;
  reach: number;
  interactions: number;
  visits: number;
  linkClicks: number;
  dailyMetrics: DailyMetric[];
}

interface CombinedMetrics {
  facebook: SocialMediaData;
  instagram: SocialMediaData;
  lastUpdated: string;
}

interface SocialMediaMeta {
  dateRange?: {
    start: string;
    end: string;
  };
  totalDays?: number;
  lastUpdated?: string;
}

interface SocialMediaDashboardProps {
  data: CombinedMetrics | null;
  loading: boolean;
  error: string | null;
  meta?: SocialMediaMeta;
  onRefresh: () => void;
  onPeriodChange?: (period: string) => void;
  currentPeriod?: string;
}

export default function SocialMediaDashboard({ 
  data, 
  loading, 
  error, 
  meta,
  onRefresh,
  onPeriodChange,
  currentPeriod = 'all'
}: SocialMediaDashboardProps) {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([
    'views', 'follows', 'reach', 'interactions'
  ]);

  const periodOptions = [
    { value: '1week', label: '1 Week' },
    { value: '1month', label: '1 Month' },
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
    { value: 'year', label: 'This Year' },
    { value: 'all', label: 'All Time' }
  ];

  const metricConfigs = {
    views: {
      title: 'Content Views',
      icon: Eye,
      description: 'Total views across all content',
      color: 'text-blue-600'
    },
    follows: {
      title: 'Followers Growth',
      icon: Users,
      description: 'New followers over time',
      color: 'text-green-600'
    },
    reach: {
      title: 'Content Reach',
      icon: Share2,
      description: 'Unique users reached',
      color: 'text-purple-600'
    },
    interactions: {
      title: 'Engagement',
      icon: TrendingUp,
      description: 'Likes, comments, shares',
      color: 'text-orange-600'
    },
    visits: {
      title: 'Profile Visits',
      icon: BarChart3,
      description: 'Profile page visits',
      color: 'text-indigo-600'
    },
    linkClicks: {
      title: 'Link Clicks',
      icon: ExternalLink,
      description: 'Clicks on bio links',
      color: 'text-pink-600'
    }
  };

  const toggleMetric = (metric: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metric) 
        ? prev.filter(m => m !== metric)
        : [...prev, metric]
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-slate-600">Loading social media data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="bg-red-50 rounded-full p-3 w-16 h-16 mx-auto mb-4">
            <BarChart3 className="h-10 w-10 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Data</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <Button onClick={onRefresh} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <BarChart3 className="h-12 w-12 mx-auto mb-4 text-slate-400" />
          <p className="text-slate-600">No data available</p>
        </div>
      </div>
    );
  }

  const totalFacebook = Object.values(data.facebook).reduce((sum, val) => 
    typeof val === 'number' ? sum + val : sum, 0
  );
  const totalInstagram = Object.values(data.instagram).reduce((sum, val) => 
    typeof val === 'number' ? sum + val : sum, 0
  );

  return (
    <div className="space-y-6">
      {/* Header with Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-900 flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              Facebook Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {formatNumber(totalFacebook)}
            </div>
            <p className="text-xs text-blue-700 mt-1">
              All metrics combined
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-pink-900 flex items-center">
              <div className="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
              Instagram Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-pink-900">
              {formatNumber(totalInstagram)}
            </div>
            <p className="text-xs text-pink-700 mt-1">
              All metrics combined
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-900 flex items-center">
              <RefreshCw className="h-4 w-4 mr-2" />
              Last Updated
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium text-slate-900">
              {new Date(data.lastUpdated).toLocaleString()}
            </div>
            <Button 
              onClick={onRefresh} 
              variant="ghost" 
              size="sm" 
              className="mt-2 h-8 px-3 text-xs"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Refresh
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Period Filter Controls */}
      {onPeriodChange && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Time Period
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {periodOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={currentPeriod === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPeriodChange(option.value)}
                  className="text-sm"
                >
                  {option.label}
                </Button>
              ))}
            </div>
            {meta && (
              <div className="mt-3 text-sm text-slate-600">
                <p>
                  Showing data from <strong>{meta.dateRange?.start}</strong> to{' '}
                  <strong>{meta.dateRange?.end}</strong>
                  {meta.totalDays && (
                    <span> ({meta.totalDays} days of data)</span>
                  )}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Metric Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Select Metrics to Display</CardTitle>
          <p className="text-sm text-slate-600">
            Choose which metrics you want to see in the charts below
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Object.entries(metricConfigs).map(([key, config]) => {
              const Icon = config.icon;
              const isSelected = selectedMetrics.includes(key);
              
              return (
                <Button
                  key={key}
                  variant={isSelected ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleMetric(key)}
                  className={`text-xs px-3 py-1 h-8 transition-all duration-200 ${
                    isSelected 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md border-blue-600' 
                      : 'hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700'
                  }`}
                >
                  <Icon className="h-3 w-3 mr-1" />
                  {config.title}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

              {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {selectedMetrics.map(metric => {
            const config = metricConfigs[metric as keyof typeof metricConfigs];
            if (!config) return null;

            const facebookData = data.facebook.dailyMetrics.filter(d => 
              d.date && d[metric as keyof DailyMetric] !== undefined
            );
            const instagramData = data.instagram.dailyMetrics.filter(d => 
              d.date && d[metric as keyof DailyMetric] !== undefined
            );



            return (
              <SocialMediaTrendsChart
                key={metric}
                facebookData={facebookData}
                instagramData={instagramData}
                metricType={metric}
                title={config.title}
              />
            );
          })}
        </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(metricConfigs).map(([key, config]) => {
              const Icon = config.icon;
              const facebookValue = data.facebook[key as keyof SocialMediaData] as number;
              const instagramValue = data.instagram[key as keyof SocialMediaData] as number;
              
              return (
                <div key={key} className="text-center">
                  <Icon className={`h-6 w-6 mx-auto mb-2 ${config.color}`} />
                  <div className="text-sm font-medium text-slate-900">{config.title}</div>
                  <div className="text-xs text-slate-500 mb-1">Facebook</div>
                  <div className="text-lg font-bold text-blue-600">
                    {formatNumber(facebookValue)}
                  </div>
                  <div className="text-xs text-slate-500 mb-1 mt-2">Instagram</div>
                  <div className="text-lg font-bold text-pink-600">
                    {formatNumber(instagramValue)}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

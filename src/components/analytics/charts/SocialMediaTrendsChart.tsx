"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, BarChart3, Calendar, Filter } from 'lucide-react';

interface DailyMetric {
  date: string;
  views: number;
  follows: number;
  reach: number;
  interactions: number;
  visits: number;
  linkClicks: number;
}

interface SocialMediaTrendsChartProps {
  facebookData: DailyMetric[];
  instagramData: DailyMetric[];
  metricType: string;
  title: string;
}

type TimeFilter = '7d' | '30d' | '90d';

export default function SocialMediaTrendsChart({ 
  facebookData, 
  instagramData, 
  metricType, 
  title 
}: SocialMediaTrendsChartProps) {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('30d');
  const [showInstagram, setShowInstagram] = useState(true);
  const [showFacebook, setShowFacebook] = useState(true);

  const filteredData = useMemo(() => {
    // For demo/test data, show all available data instead of filtering by current date
    // This allows the charts to work with historical CSV data
    if (facebookData.length > 0 || instagramData.length > 0) {
      // Get the date range from the actual data
      const allDates = [...facebookData, ...instagramData]
        .map(item => new Date(item.date))
        .filter(date => !isNaN(date.getTime()));
      
      if (allDates.length > 0) {
        const minDate = new Date(Math.min(...allDates.map(d => d.getTime())));
        const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())));
        
        // Calculate how many days of data we have
        const totalDays = Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
        
        // Adjust the time filter based on available data
        let daysToShow = 90; // Default to 90 days
        switch (timeFilter) {
          case '7d':
            daysToShow = Math.min(7, totalDays);
            break;
          case '30d':
            daysToShow = Math.min(30, totalDays);
            break;
          case '90d':
            daysToShow = totalDays;
            break;
        }
        
        // Show the most recent days of available data
        const cutoffDate = new Date(maxDate.getTime() - (daysToShow - 1) * 24 * 60 * 60 * 1000);
        
        const filterData = (data: DailyMetric[]) => 
          data.filter(item => new Date(item.date) >= cutoffDate);
        
        return {
          facebook: filterData(facebookData),
          instagram: filterData(instagramData)
        };
      }
    }
    
    // Fallback: return all data if no valid dates found
    return {
      facebook: facebookData,
      instagram: instagramData
    };
  }, [facebookData, instagramData, timeFilter]);

  // Helper function to get metric value based on metricType
  const getMetricValue = (item: DailyMetric, metricType: string): number => {
    switch (metricType) {
      case 'views': return item.views || 0;
      case 'follows': return item.follows || 0;
      case 'reach': return item.reach || 0;
      case 'interactions': return item.interactions || 0;
      case 'visits': return item.visits || 0;
      case 'linkClicks': return item.linkClicks || 0;
      default: return 0;
    }
  };

  // Use all filtered data - don't filter out 0 values as they're valid data points
  const filteredFacebookData = filteredData.facebook;
  const filteredInstagramData = filteredData.instagram;

  const maxValue = Math.max(
    ...filteredFacebookData.map(d => getMetricValue(d, metricType)),
    ...filteredInstagramData.map(d => getMetricValue(d, metricType)),
    1
  ) || 1; // Ensure we always have a positive value

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (timeFilter === '7d') {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else if (timeFilter === '30d') {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    }
  };

  const getTrend = (data: DailyMetric[]) => {
    if (data.length < 2) return { direction: 'neutral', percentage: 0 };
    
    const recent = data.slice(-7).reduce((sum, d) => sum + getMetricValue(d, metricType), 0) / 7;
    const previous = data.slice(-14, -7).reduce((sum, d) => sum + getMetricValue(d, metricType), 0) / 7;
    
    if (previous === 0) return { direction: 'neutral', percentage: 0 };
    
    const percentage = ((recent - previous) / previous) * 100;
    return {
      direction: percentage > 0 ? 'up' : percentage < 0 ? 'down' : 'neutral',
      percentage: Math.abs(percentage)
    };
  };

  const facebookTrend = getTrend(filteredFacebookData);
  const instagramTrend = getTrend(filteredInstagramData);

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-slate-500" />
            <span className="text-sm text-slate-600">Filters:</span>
          </div>
        </div>
        
        {/* Time Filter Buttons */}
        <div className="flex space-x-1">
          {(['7d', '30d', '90d'] as TimeFilter[]).map((filter) => (
            <Button
              key={filter}
              variant={timeFilter === filter ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeFilter(filter)}
              className="text-xs px-3 py-1 h-8"
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Platform Toggle */}
        <div className="flex space-x-2">
          <Button
            variant={showFacebook ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowFacebook(!showFacebook)}
            className="text-xs px-3 py-1 h-8 bg-blue-600 hover:bg-blue-700"
          >
            Facebook
          </Button>
          <Button
            variant={showInstagram ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowInstagram(!showInstagram)}
            className="text-xs px-3 py-1 h-8 bg-pink-600 hover:bg-pink-700"
          >
            Instagram
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Trend Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {showFacebook && (
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-900">Facebook</span>
                <div className="flex items-center space-x-1">
                  {facebookTrend.direction === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : facebookTrend.direction === 'down' ? (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  ) : (
                    <BarChart3 className="h-4 w-4 text-slate-600" />
                  )}
                  <span className={`text-xs font-medium ${
                    facebookTrend.direction === 'up' ? 'text-green-600' : 
                    facebookTrend.direction === 'down' ? 'text-red-600' : 'text-slate-600'
                  }`}>
                    {facebookTrend.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-900">
                {filteredFacebookData.reduce((sum, d) => sum + getMetricValue(d, metricType), 0).toLocaleString()}
              </div>
            </div>
          )}
          
          {showInstagram && (
            <div className="bg-pink-50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-pink-900">Instagram</span>
                <div className="flex items-center space-x-1">
                  {instagramTrend.direction === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : instagramTrend.direction === 'down' ? (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  ) : (
                    <BarChart3 className="h-4 w-4 text-slate-600" />
                  )}
                  <span className={`text-xs font-medium ${
                    instagramTrend.direction === 'up' ? 'text-green-600' : 
                    instagramTrend.direction === 'down' ? 'text-red-600' : 'text-slate-600'
                  }`}>
                    {instagramTrend.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="text-2xl font-bold text-pink-900">
                {filteredInstagramData.reduce((sum, d) => sum + getMetricValue(d, metricType), 0).toLocaleString()}
              </div>
            </div>
          )}
        </div>

        {/* Chart */}
        <div className="space-y-4">
          {showFacebook && filteredFacebookData.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-700">Facebook</span>
                <span className="text-xs text-slate-500">
                  {filteredFacebookData.length} data points
                </span>
              </div>
              <div className="flex items-end space-x-1 h-32">
                {filteredFacebookData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-blue-500 rounded-t-sm transition-all duration-200 hover:bg-blue-600"
                      style={{ 
                        height: `${Math.max((getMetricValue(data, metricType) / maxValue) * 100, 2)}%`,
                        minHeight: '2px'
                      }}
                      title={`${formatDate(data.date)}: ${getMetricValue(data, metricType).toLocaleString()}`}
                    />
                    {timeFilter === '7d' && (
                      <span className="text-xs text-slate-500 mt-1">
                        {formatDate(data.date)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {showInstagram && filteredInstagramData.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-pink-700">Instagram</span>
                <span className="text-xs text-slate-500">
                  {filteredInstagramData.length} data points
                </span>
              </div>
              <div className="flex items-end space-x-1 h-32">
                {filteredInstagramData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-pink-500 rounded-t-sm transition-all duration-200 hover:bg-pink-600"
                      style={{ 
                        height: `${Math.max((getMetricValue(data, metricType) / maxValue) * 100, 2)}%`,
                        minHeight: '2px'
                      }}
                      title={`${formatDate(data.date)}: ${getMetricValue(data, metricType).toLocaleString()}`}
                    />
                    {timeFilter === '7d' && (
                      <span className="text-xs text-slate-500 mt-1">
                        {formatDate(data.date)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {(!showFacebook && !showInstagram) && (
            <div className="text-center py-8 text-slate-500">
              <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Select at least one platform to view data</p>
            </div>
          )}
        </div>

        {/* X-axis labels for longer time periods */}
        {timeFilter !== '7d' && (
          <div className="flex justify-between mt-4 text-xs text-slate-500">
            <span>{filteredFacebookData[0]?.date ? formatDate(filteredFacebookData[0].date) : ''}</span>
            <span>{filteredFacebookData[filteredFacebookData.length - 1]?.date ? formatDate(filteredFacebookData[filteredFacebookData.length - 1].date) : ''}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

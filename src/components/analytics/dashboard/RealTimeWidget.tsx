"use client";

import { useState, useEffect } from 'react';
import { Users, Eye, Smartphone, Monitor } from 'lucide-react';
import { useRealTimeAnalytics } from '@/lib/hooks/useAnalytics';

interface RealTimeData {
  activeUsers: number;
  pageViews: number;
  topPages: Array<{
    page: string;
    activeUsers: number;
  }>;
  topCountries: Array<{
    country: string;
    activeUsers: number;
  }>;
  devices: Array<{
    category: string;
    activeUsers: number;
  }>;
  timestamp?: string;
  quotaExhausted?: boolean;
  apiLimitation?: boolean;
  quotaResetTime?: string;
}



// Mock real-time data for when GA4 is unavailable
const mockRealTimeData: RealTimeData = {
  activeUsers: 0, // Will be updated with real data when available
  pageViews: 0,
  topPages: [],
  topCountries: [],
  devices: [],
  quotaExhausted: false,
  apiLimitation: false,
};

export function RealTimeWidget() {
  const { data: realTimeData, loading, error } = useRealTimeAnalytics({ refreshInterval: 5000 });
  const [pulse, setPulse] = useState(false);

  // Pulse animation for live indicator
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Show mock data while loading or if there's an error
  const data = realTimeData || mockRealTimeData;

  // Determine if we have real data (not mock)
  const hasRealData = realTimeData && !error;

  if (loading && !realTimeData) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-slate-200 rounded mb-4 w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 bg-slate-200 rounded"></div>
                <div className="h-8 bg-slate-200 rounded"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getDeviceIcon = (category: string) => {
    switch (category) {
      case 'mobile':
        return <Smartphone className="h-4 w-4" />;
      case 'desktop':
        return <Monitor className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Real-Time Activity</h2>
            {data.quotaExhausted && (
              <p className="text-xs text-orange-600 mt-1">
                ⚠️ GA4 Quota exhausted - data will resume in {data.quotaResetTime}
              </p>
            )}
            {data.apiLimitation && !data.quotaExhausted && (
              <p className="text-xs text-blue-600 mt-1">
                ℹ️ GA4 real-time API limitations - some features unavailable
              </p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              data.quotaExhausted
                ? 'bg-orange-500'
                : data.apiLimitation
                  ? 'bg-blue-500'
                  : hasRealData
                    ? `bg-green-500 ${pulse ? 'animate-ping' : ''}`
                    : 'bg-yellow-500'
            }`}></div>
            <span className={`text-sm ${
              data.quotaExhausted
                ? 'text-orange-600'
                : data.apiLimitation
                  ? 'text-blue-600'
                  : hasRealData
                    ? 'text-slate-600'
                    : 'text-yellow-600'
            }`}>
              {data.quotaExhausted ? 'Quota Exhausted' : data.apiLimitation ? 'API Limited' : hasRealData ? 'Live' : 'Updating'}
            </span>
            {data.timestamp && !data.quotaExhausted && !data.apiLimitation && hasRealData && (
              <span className="text-xs text-slate-400">
                {new Date(data.timestamp).toLocaleTimeString('en-GB', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </span>
            )}
          </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Users */}
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Users className="w-8 h-8 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">
            {data.activeUsers}
          </div>
          <div className="text-sm text-slate-600">Active Users</div>
          <div className="text-xs text-slate-400">(in last 30 minutes)</div>
        </div>

        {/* Page Views */}
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <Eye className="w-8 h-8 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">
            {data.pageViews}
          </div>
          <div className="text-sm text-slate-600">Page Views</div>
          <div className="text-xs text-slate-400">(in last 30 minutes)</div>
        </div>

        {/* Top Countries & Devices */}
        <div>
          <h3 className="font-semibold text-slate-900 mb-3">Locations & Devices</h3>
          
          {/* Countries */}
          <div className="mb-4">
            <h4 className="text-xs uppercase tracking-wide text-slate-500 mb-2">Countries</h4>
            <div className="space-y-1">
              {data.topCountries.slice(0, 3).map((country, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 truncate">{country.country}</span>
                  <span className="text-sm font-medium text-slate-900">{country.activeUsers}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Devices */}
          <div>
            <h4 className="text-xs uppercase tracking-wide text-slate-500 mb-2">Devices</h4>
            <div className="space-y-1">
              {data.devices.map((device, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="flex items-center text-sm text-slate-600">
                    {getDeviceIcon(device.category)}
                    <span className="ml-2 capitalize">{device.category}</span>
                  </span>
                  <span className="text-sm font-medium text-slate-900">{device.activeUsers}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
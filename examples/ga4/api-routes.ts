/**
 * Example GA4 API routes for Next.js App Router
 * These routes demonstrate how to implement various analytics endpoints
 */

// src/app/api/analytics/overview/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getOverviewMetrics } from '@/lib/analytics/ga4-client';
import type { OverviewMetrics } from '@/types/analytics';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate') || '30daysAgo';
    const endDate = searchParams.get('endDate') || 'today';
    const includeComparison = searchParams.get('comparison') === 'true';

    let data: OverviewMetrics & { previousPeriod?: OverviewMetrics; growth?: Record<string, number> } = 
      await getOverviewMetrics(startDate, endDate);

    // Add period comparison if requested
    if (includeComparison) {
      const daysDiff = calculateDateDiff(startDate, endDate);
      const previousStartDate = subtractDays(startDate, daysDiff);
      const previousEndDate = subtractDays(endDate, daysDiff);
      
      const previousPeriod = await getOverviewMetrics(previousStartDate, previousEndDate);
      
      data.previousPeriod = previousPeriod;
      data.growth = {
        totalUsers: calculateGrowthPercentage(data.totalUsers, previousPeriod.totalUsers),
        activeUsers: calculateGrowthPercentage(data.activeUsers, previousPeriod.activeUsers),
        newUsers: calculateGrowthPercentage(data.newUsers, previousPeriod.newUsers),
        sessions: calculateGrowthPercentage(data.sessions, previousPeriod.sessions),
        pageViews: calculateGrowthPercentage(data.pageViews, previousPeriod.pageViews),
        bounceRate: calculateGrowthPercentage(data.bounceRate, previousPeriod.bounceRate),
        averageSessionDuration: calculateGrowthPercentage(data.averageSessionDuration, previousPeriod.averageSessionDuration),
        engagementRate: calculateGrowthPercentage(data.engagementRate, previousPeriod.engagementRate),
        conversions: calculateGrowthPercentage(data.conversions, previousPeriod.conversions),
        revenue: calculateGrowthPercentage(data.revenue, previousPeriod.revenue),
      };
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error('Overview API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch overview data',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

// Helper functions
function calculateDateDiff(startDate: string, endDate: string): number {
  if (startDate.endsWith('daysAgo')) {
    return parseInt(startDate.replace('daysAgo', ''));
  }
  
  const start = new Date(startDate);
  const end = endDate === 'today' ? new Date() : new Date(endDate);
  return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

function subtractDays(dateStr: string, days: number): string {
  if (dateStr.endsWith('daysAgo')) {
    const currentDays = parseInt(dateStr.replace('daysAgo', ''));
    return `${currentDays + days}daysAgo`;
  }
  
  if (dateStr === 'today') {
    return `${days}daysAgo`;
  }
  
  const date = new Date(dateStr);
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}

function calculateGrowthPercentage(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

// src/app/api/analytics/traffic/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getTrafficData } from '@/lib/analytics/ga4-client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate') || '30daysAgo';
    const endDate = searchParams.get('endDate') || 'today';

    const data = await getTrafficData(startDate, endDate);

    return NextResponse.json({
      success: true,
      data,
      summary: {
        totalSessions: data.reduce((sum, item) => sum + item.sessions, 0),
        totalPageViews: data.reduce((sum, item) => sum + item.pageViews, 0),
        averageBounceRate: data.length > 0 
          ? data.reduce((sum, item) => sum + item.bounceRate, 0) / data.length 
          : 0,
        trend: calculateTrend(data.map(item => item.sessions)),
      },
    });
  } catch (error: any) {
    console.error('Traffic API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch traffic data',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

function calculateTrend(values: number[]): 'up' | 'down' | 'stable' {
  if (values.length < 2) return 'stable';
  
  const firstHalf = values.slice(0, Math.floor(values.length / 2));
  const secondHalf = values.slice(Math.floor(values.length / 2));
  
  const firstAvg = firstHalf.reduce((sum, val) => sum + val, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((sum, val) => sum + val, 0) / secondHalf.length;
  
  const change = ((secondAvg - firstAvg) / firstAvg) * 100;
  
  if (change > 5) return 'up';
  if (change < -5) return 'down';
  return 'stable';
}

// src/app/api/analytics/realtime/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getRealtimeData } from '@/lib/analytics/ga4-client';

export async function GET(request: NextRequest) {
  try {
    const data = await getRealtimeData();

    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Realtime API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch realtime data',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

// src/app/api/analytics/pages/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getTopPages } from '@/lib/analytics/ga4-client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate') || '30daysAgo';
    const endDate = searchParams.get('endDate') || 'today';
    const limit = parseInt(searchParams.get('limit') || '10');

    const data = await getTopPages(startDate, endDate, limit);

    return NextResponse.json({
      success: true,
      data,
      summary: {
        totalViews: data.reduce((sum, page) => sum + page.views, 0),
        averageBounceRate: data.length > 0 
          ? data.reduce((sum, page) => sum + page.bounceRate, 0) / data.length 
          : 0,
        topPerformer: data.length > 0 ? data[0] : null,
      },
    });
  } catch (error: any) {
    console.error('Pages API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch pages data',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

// src/app/api/analytics/sources/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getTrafficSources } from '@/lib/analytics/ga4-client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate') || '30daysAgo';
    const endDate = searchParams.get('endDate') || 'today';
    const limit = parseInt(searchParams.get('limit') || '10');

    const data = await getTrafficSources(startDate, endDate, limit);

    return NextResponse.json({
      success: true,
      data,
      summary: {
        totalSessions: data.reduce((sum, source) => sum + source.sessions, 0),
        totalRevenue: data.reduce((sum, source) => sum + source.revenue, 0),
        averageConversionRate: data.length > 0 
          ? data.reduce((sum, source) => sum + source.conversionRate, 0) / data.length 
          : 0,
        topSource: data.length > 0 ? data[0] : null,
      },
    });
  } catch (error: any) {
    console.error('Sources API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch sources data',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

// src/app/api/analytics/devices/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDeviceMetrics } from '@/lib/analytics/ga4-client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate') || '30daysAgo';
    const endDate = searchParams.get('endDate') || 'today';

    const data = await getDeviceMetrics(startDate, endDate);

    return NextResponse.json({
      success: true,
      data,
      summary: {
        totalUsers: data.reduce((sum, device) => sum + device.users, 0),
        mobilePercentage: data.length > 0 
          ? (data.find(d => d.deviceCategory === 'mobile')?.users || 0) / 
            data.reduce((sum, device) => sum + device.users, 0) * 100 
          : 0,
        topDevice: data.length > 0 ? data[0] : null,
      },
    });
  } catch (error: any) {
    console.error('Devices API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch devices data',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

// src/app/api/analytics/demographics/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDemographicsData } from '@/lib/analytics/ga4-client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dimension = (searchParams.get('dimension') as 'country' | 'city') || 'country';
    const startDate = searchParams.get('startDate') || '30daysAgo';
    const endDate = searchParams.get('endDate') || 'today';
    const limit = parseInt(searchParams.get('limit') || '10');

    const data = await getDemographicsData(dimension, startDate, endDate, limit);

    return NextResponse.json({
      success: true,
      data,
      summary: {
        totalUsers: data.reduce((sum, item) => sum + item.users, 0),
        topLocation: data.length > 0 ? data[0] : null,
        diversity: data.length, // Number of different locations
      },
    });
  } catch (error: any) {
    console.error('Demographics API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch demographics data',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

// src/app/api/analytics/dashboard/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getDashboardData } from '@/lib/analytics/ga4-client';
import { unstable_cache } from 'next/cache';

// Cache dashboard data for 1 hour to reduce API calls
const getCachedDashboardData = unstable_cache(
  async (startDate: string, endDate: string) => {
    return await getDashboardData(startDate, endDate);
  },
  ['dashboard-analytics'],
  {
    revalidate: 3600, // 1 hour
    tags: ['analytics', 'dashboard'],
  }
);

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate') || '30daysAgo';
    const endDate = searchParams.get('endDate') || 'today';
    const useCache = searchParams.get('cache') !== 'false';

    const data = useCache 
      ? await getCachedDashboardData(startDate, endDate)
      : await getDashboardData(startDate, endDate);

    return NextResponse.json({
      success: true,
      data,
      meta: {
        dateRange: { startDate, endDate },
        lastUpdated: new Date().toISOString(),
        cached: useCache,
      },
    });
  } catch (error: any) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch dashboard data',
        message: error.message,
        code: error.code || 'UNKNOWN_ERROR',
      },
      { status: 500 }
    );
  }
}

// Middleware for rate limiting (optional)
// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const rateLimitMap = new Map();

export function middleware(request: NextRequest) {
  // Only apply to analytics API routes
  if (!request.nextUrl.pathname.startsWith('/api/analytics/')) {
    return NextResponse.next();
  }

  const ip = request.ip ?? '127.0.0.1';
  const limit = 100; // Limit each IP to 100 requests per hour
  const windowMs = 60 * 60 * 1000; // 1 hour

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, {
      count: 0,
      lastReset: Date.now(),
    });
  }

  const ipData = rateLimitMap.get(ip);

  if (Date.now() - ipData.lastReset > windowMs) {
    ipData.count = 0;
    ipData.lastReset = Date.now();
  }

  if (ipData.count >= limit) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }

  ipData.count += 1;

  return NextResponse.next();
}

export const config = {
  matcher: '/api/analytics/:path*',
};
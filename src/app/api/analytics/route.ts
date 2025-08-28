import { NextRequest, NextResponse } from 'next/server';
import { getOverviewMetrics, getTrendData, getRealTimeData } from '@/lib/analytics/ga4-server';

// Helper function to get date range
function getDateRange(range: string = '30d') {
  const endDate = new Date();
  const startDate = new Date();
  
  switch (range) {
    case '7d':
      startDate.setDate(endDate.getDate() - 7);
      break;
    case '14d':
      startDate.setDate(endDate.getDate() - 14);
      break;
    case '30d':
      startDate.setDate(endDate.getDate() - 30);
      break;
    case '90d':
      startDate.setDate(endDate.getDate() - 90);
      break;
    default:
      startDate.setDate(endDate.getDate() - 30);
  }
  
  return { startDate, endDate };
}

// Generate realistic real-time data that changes frequently
function generateRealTimeData() {
  const currentHour = new Date().getHours();
  
  // Adjust active users based on time of day (UK timezone)
  let baseActiveUsers = 15;
  if (currentHour >= 9 && currentHour <= 17) { // Business hours
    baseActiveUsers = 40;
  } else if (currentHour >= 18 && currentHour <= 22) { // Evening
    baseActiveUsers = 60;
  } else if (currentHour >= 23 || currentHour <= 6) { // Night
    baseActiveUsers = 8;
  }
  
  const activeUsers = baseActiveUsers + Math.floor(Math.random() * 20) - 10;
  
  // Generate page data proportionally
  const pages = [
    { page: '/', weight: 0.35 },
    { page: '/ai', weight: 0.25 },
    { page: '/content', weight: 0.15 },
    { page: '/markets', weight: 0.12 },
    { page: '/reports', weight: 0.08 },
    { page: '/new-dev', weight: 0.05 },
  ];
  
  const topPages = pages.map(p => ({
    page: p.page,
    activeUsers: Math.max(1, Math.floor(activeUsers * p.weight * (0.8 + Math.random() * 0.4)))
  })).sort((a, b) => b.activeUsers - a.activeUsers);
  
  // Generate country data
  const countries = [
    { country: 'United Kingdom', weight: 0.45 },
    { country: 'United States', weight: 0.20 },
    { country: 'Canada', weight: 0.12 },
    { country: 'Australia', weight: 0.10 },
    { country: 'Germany', weight: 0.08 },
    { country: 'Netherlands', weight: 0.05 },
  ];
  
  const topCountries = countries.map(c => ({
    country: c.country,
    activeUsers: Math.max(1, Math.floor(activeUsers * c.weight * (0.7 + Math.random() * 0.6)))
  })).sort((a, b) => b.activeUsers - a.activeUsers);
  
  // Generate device data
  const devices = [
    { category: 'desktop', weight: 0.55 },
    { category: 'mobile', weight: 0.35 },
    { category: 'tablet', weight: 0.10 },
  ];
  
  const deviceData = devices.map(d => ({
    category: d.category,
    activeUsers: Math.max(1, Math.floor(activeUsers * d.weight * (0.8 + Math.random() * 0.4)))
  }));
  
  return {
    activeUsers: Math.max(1, activeUsers),
    topPages: topPages.slice(0, 5),
    topCountries: topCountries.slice(0, 5),
    devices: deviceData,
    timestamp: new Date().toISOString(),
  };
}

// Mock Google Analytics data for demonstration
// In production, replace with actual GA4 API calls
function generateMockAnalyticsData(dateRange: string = '30d') {
  const { startDate, endDate } = getDateRange(dateRange);
  const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Generate trends data for the specified date range
  const trends = Array.from({ length: daysDiff }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    return {
      date: date.toISOString().split('T')[0],
      pageViews: Math.floor(Math.random() * 1000) + 1500,
      sessions: Math.floor(Math.random() * 600) + 1000,
    };
  });

  // Generate realistic numbers based on date range
  const baseMultiplier = daysDiff / 30; // Scale based on period length
  const randomVariation = 0.8 + Math.random() * 0.4; // ±20% variation
  
  const sessions = Math.floor(12547 * baseMultiplier * randomVariation);
  const users = Math.floor(8943 * baseMultiplier * randomVariation);
  const pageViews = Math.floor(23891 * baseMultiplier * randomVariation);
  const bounceRate = 35 + Math.random() * 15; // 35-50% range
  const sessionDuration = 120 + Math.random() * 120; // 2-4 minutes

  return {
    dateRange: {
      start: startDate.toISOString().split('T')[0],
      end: endDate.toISOString().split('T')[0],
      period: dateRange,
    },
    overview: {
      sessions: { value: sessions, changePercent: -10 + Math.random() * 30 },
      users: { value: users, changePercent: -10 + Math.random() * 30 },
      pageViews: { value: pageViews, changePercent: -10 + Math.random() * 30 },
      bounceRate: { value: Math.round(bounceRate * 10) / 10, changePercent: -15 + Math.random() * 20 },
      sessionDuration: { value: Math.round(sessionDuration), changePercent: -10 + Math.random() * 25 },
    },
    trends: {
      pageViews: trends,
    },
    trafficSources: [
      { source: 'Organic Search', sessions: Math.floor(sessions * 0.389), percentage: 38.9 },
      { source: 'Direct', sessions: Math.floor(sessions * 0.280), percentage: 28.0 },
      { source: 'Social Media', sessions: Math.floor(sessions * 0.176), percentage: 17.6 },
      { source: 'Referral', sessions: Math.floor(sessions * 0.108), percentage: 10.8 },
      { source: 'Email', sessions: Math.floor(sessions * 0.046), percentage: 4.6 },
    ],
    realTime: generateRealTimeData(),
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const metric = searchParams.get('metric');
    const dateRange = searchParams.get('dateRange') || '30d';

    // Return specific data based on query parameters
    if (metric === 'realtime') {
      const data = await getRealTimeData();
      return NextResponse.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    }

    if (metric === 'trends') {
      const data = await getTrendData(dateRange);
      return NextResponse.json({
        success: true,
        data,
        dateRange: {
          start: new Date(Date.now() - parseInt(dateRange.replace('d', '')) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          end: new Date().toISOString().split('T')[0],
          period: dateRange,
        },
      });
    }

    // Return all data by default
    const data = await getOverviewMetrics(dateRange);
    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch analytics data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { metrics, dateRange, dimensions } = body;

    // In production, this would call the actual GA4 API
    // const analytics = google.analytics('v4');
    // const response = await analytics.reports.batchGet({...});

    // For now, return mock data
    return NextResponse.json({
      success: true,
      data: generateMockAnalyticsData(dateRange), // Use the new function here
      query: { metrics, dateRange, dimensions },
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process analytics request' },
      { status: 500 }
    );
  }
}
// Google Analytics 4 API Client - Client-side Implementation

export interface GA4Config {
  propertyId: string;
  clientEmail?: string;
  privateKey?: string;
  clientId?: string;
  clientSecret?: string;
}

export interface GA4Metric {
  name: string;
  value: number;
  changePercent?: number;
}

export interface GA4ReportRequest {
  dateRanges: Array<{
    startDate: string;
    endDate: string;
  }>;
  metrics: Array<{
    name: string;
  }>;
  dimensions?: Array<{
    name: string;
  }>;
}

export class GA4Client {
  private config: GA4Config;

  constructor(config: GA4Config) {
    this.config = config;
  }

  /**
   * Fetch analytics data - client-side calls API endpoints
   */
  async fetchAnalyticsData(params?: {
    metric?: string;
    dateRange?: string;
  }): Promise<unknown> {
    // Always call API endpoint from client
    const url = new URL('/api/analytics', window.location.origin);

    if (params?.metric) {
      url.searchParams.set('metric', params.metric);
    }

    if (params?.dateRange) {
      url.searchParams.set('dateRange', params.dateRange);
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Analytics API error: ${response.statusText}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Unknown error');
    }

    return result.data;
  }

  /**
   * Fetch real-time analytics data
   */
  async fetchRealTimeData(): Promise<unknown> {
    return this.fetchAnalyticsData({ metric: 'realtime' });
  }

  /**
   * Fetch trend data for charts
   */
  async fetchTrendData(dateRange?: string): Promise<unknown> {
    return this.fetchAnalyticsData({ metric: 'trends', dateRange });
  }

  /**
   * Submit a custom analytics report request
   */
  async submitReportRequest(request: GA4ReportRequest): Promise<unknown> {
    try {
      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`Analytics API error: ${response.statusText}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Unknown error');
      }

      return result.data;
    } catch (error) {
      console.error('GA4 Client error:', error);
      throw error;
    }
  }
}

// Factory function to create GA4 client instance
export function createGA4Client(config?: Partial<GA4Config>): GA4Client {
  const defaultConfig: GA4Config = {
    propertyId: process.env.NEXT_PUBLIC_GA4_PROPERTY_ID || 'demo',
    ...config,
  };

  return new GA4Client(defaultConfig);
}

// Utility functions for data formatting
export function formatMetricValue(value: number, metricType: string): string {
  switch (metricType) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
    
    case 'percentage':
      return `${value.toFixed(1)}%`;
    
    case 'duration':
      const minutes = Math.floor(value / 60);
      const seconds = value % 60;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    case 'number':
    default:
      return value.toLocaleString();
  }
}

export function calculateChangePercent(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}
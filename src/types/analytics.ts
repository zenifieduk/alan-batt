// Google Analytics 4 TypeScript definitions
export interface GA4Metric {
  name: string;
  value: number;
  previousValue?: number;
  change?: number;
  changePercent?: number;
}

export interface GA4Dimension {
  name: string;
  value: string;
}

export interface GA4ReportRow {
  dimensions: GA4Dimension[];
  metrics: GA4Metric[];
}

export interface GA4ReportData {
  rows: GA4ReportRow[];
  metadata: {
    totalCount: number;
    samplingLevel: string;
  };
}

export interface AnalyticsData {
  overview: {
    sessions: GA4Metric;
    users: GA4Metric;
    pageViews: GA4Metric;
    bounceRate: GA4Metric;
    sessionDuration: GA4Metric;
  };
  traffic: {
    sources: Array<{
      source: string;
      sessions: number;
      percentage: number;
    }>;
    devices: Array<{
      category: string;
      sessions: number;
      percentage: number;
    }>;
  };
  realTime: {
    activeUsers: number;
    topPages: Array<{
      page: string;
      activeUsers: number;
    }>;
    topCountries: Array<{
      country: string;
      activeUsers: number;
    }>;
  };
  trends: {
    sessions: Array<{
      date: string;
      value: number;
    }>;
    pageViews: Array<{
      date: string;
      value: number;
    }>;
  };
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface DashboardConfig {
  propertyId: string;
  dateRange: DateRange;
  refreshInterval: number;
  metrics: string[];
}
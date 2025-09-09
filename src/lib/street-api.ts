import { 
  StreetApiConfig, 
  StreetDashboardData, 
  StreetSalesData, 
  StreetValuationData, 
  StreetViewingData,
  StreetProperty,
  StreetApiResponse 
} from '@/types/street';

export class StreetApiService {
  private config: StreetApiConfig;

  constructor(config: StreetApiConfig) {
    this.config = config;
  }

  private async makeRequest<T>(endpoint: string, params?: Record<string, string>): Promise<StreetApiResponse<T>> {
    try {
      const url = new URL(`${this.config.baseUrl}${endpoint}`);
      
      // Add API key to headers
      const headers: HeadersInit = {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      };

      // Add query parameters
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, value);
        });
      }

      // Add branch ID if provided
      if (this.config.branchId) {
        url.searchParams.append('branch_id', this.config.branchId);
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers,
      });

      if (!response.ok) {
        throw new Error(`Street API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('Street API request failed:', error);
      return {
        success: false,
        data: null as T,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async getSalesData(period: string = '30d'): Promise<StreetApiResponse<StreetSalesData>> {
    const params = {
      period,
      include_sold: 'true',
      include_details: 'true',
    };

    return this.makeRequest<StreetSalesData>('/sales', params);
  }

  async getValuationData(period: string = '30d'): Promise<StreetApiResponse<StreetValuationData>> {
    const params = {
      period,
      include_details: 'true',
    };

    return this.makeRequest<StreetValuationData>('/valuations', params);
  }

  async getViewingData(period: string = '30d'): Promise<StreetApiResponse<StreetViewingData>> {
    const params = {
      period,
      include_details: 'true',
    };

    return this.makeRequest<StreetViewingData>('/viewings', params);
  }

  async getDashboardData(period: string = '30d'): Promise<StreetApiResponse<StreetDashboardData>> {
    try {
      // Fetch all data in parallel
      const [salesResponse, valuationsResponse, viewingsResponse] = await Promise.all([
        this.getSalesData(period),
        this.getValuationData(period),
        this.getViewingData(period),
      ]);

      // Check if any requests failed or data is null
      if (!salesResponse.success || !valuationsResponse.success || !viewingsResponse.success ||
          !salesResponse.data || !valuationsResponse.data || !viewingsResponse.data) {
        return {
          success: false,
          data: null,
          error: 'Failed to fetch one or more data sources',
        };
      }

      const dashboardData: StreetDashboardData = {
        sales: salesResponse.data,
        valuations: valuationsResponse.data,
        viewings: viewingsResponse.data,
        lastUpdated: new Date().toISOString(),
      };

      return {
        success: true,
        data: dashboardData,
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async getRecentProperties(limit: number = 10): Promise<StreetApiResponse<StreetProperty[]>> {
    const params = {
      limit: limit.toString(),
      include_sold: 'true',
      sort: 'date_listed',
      order: 'desc',
    };

    return this.makeRequest<StreetProperty[]>('/properties', params);
  }
}

// Mock data generator for development/testing
export function generateMockStreetData(): StreetDashboardData {
  const now = new Date();
  const startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  
  const mockSales: StreetSalesData = {
    period: {
      start: startDate.toISOString().split('T')[0],
      end: now.toISOString().split('T')[0],
      label: 'Last 30 days',
    },
    metrics: {
      totalSales: 23,
      totalValue: 8750000,
      averagePrice: 380435,
      averageDaysOnMarket: 45,
      salesByType: [
        { propertyType: 'Detached', count: 12, averagePrice: 425000 },
        { propertyType: 'Semi-Detached', count: 7, averagePrice: 285000 },
        { propertyType: 'Terraced', count: 3, averagePrice: 195000 },
        { propertyType: 'Apartment', count: 1, averagePrice: 165000 },
      ],
      salesByPriceRange: [
        { range: '£150k - £250k', count: 4 },
        { range: '£250k - £350k', count: 8 },
        { range: '£350k - £500k', count: 9 },
        { range: '£500k+', count: 2 },
      ],
    },
    recentSales: [
      {
        id: '1',
        address: 'Grove Road, Upholland, WN8',
        price: 775000,
        status: 'sold',
        propertyType: 'Detached',
        bedrooms: 5,
        bathrooms: 4,
        receptions: 4,
        sqft: 3210,
        dateListed: '2024-11-15',
        dateSold: '2024-12-10',
        salePrice: 775000,
        images: ['/property-images/Grove-Road-image-1.jpg'],
        description: 'Set within approximately 0.5 acres of mature gardens...',
      },
      {
        id: '2',
        address: 'Bannister Way, Winstanley, WN3',
        price: 375000,
        status: 'sold',
        propertyType: 'Detached',
        bedrooms: 5,
        bathrooms: 2,
        receptions: 1,
        sqft: 1321,
        dateListed: '2024-11-20',
        dateSold: '2024-12-05',
        salePrice: 375000,
        images: ['/property-images/Bannister-Way-image-1.jpg'],
        description: 'Introducing this exceptional five-bedroom detached residence...',
      },
    ],
    marketTrends: {
      priceChange: 3.2,
      volumeChange: 15.8,
      daysOnMarketChange: -8.5,
    },
  };

  const mockValuations: StreetValuationData = {
    period: {
      start: startDate.toISOString().split('T')[0],
      end: now.toISOString().split('T')[0],
    },
    metrics: {
      totalValuations: 18,
      averageValuation: 295000,
      valuationsByType: [
        { propertyType: 'Detached', count: 8, averageValue: 385000 },
        { propertyType: 'Semi-Detached', count: 6, averageValue: 245000 },
        { propertyType: 'Terraced', count: 3, averageValue: 185000 },
        { propertyType: 'Apartment', count: 1, averageValue: 145000 },
      ],
    },
    recentValuations: [
      {
        id: 'val1',
        address: '123 Main Street, Wigan',
        valuation: 275000,
        date: '2024-12-08',
        propertyType: 'Semi-Detached',
      },
      {
        id: 'val2',
        address: '456 Oak Avenue, Orrell',
        valuation: 425000,
        date: '2024-12-07',
        propertyType: 'Detached',
      },
    ],
  };

  const mockViewings: StreetViewingData = {
    period: {
      start: startDate.toISOString().split('T')[0],
      end: now.toISOString().split('T')[0],
    },
    metrics: {
      totalViewings: 67,
      viewingsByProperty: [
        { propertyId: '1', address: 'Grove Road, Upholland', viewings: 12 },
        { propertyId: '2', address: 'Bannister Way, Winstanley', viewings: 8 },
        { propertyId: '3', address: 'Tideswell Avenue, Orrell', viewings: 15 },
      ],
      averageViewingsPerProperty: 4.2,
    },
    recentViewings: [
      {
        id: 'view1',
        propertyId: '1',
        address: 'Grove Road, Upholland, WN8',
        date: '2024-12-09',
        status: 'completed',
      },
      {
        id: 'view2',
        propertyId: '2',
        address: 'Bannister Way, Winstanley, WN3',
        date: '2024-12-08',
        status: 'scheduled',
      },
    ],
  };

  return {
    sales: mockSales,
    valuations: mockValuations,
    viewings: mockViewings,
    lastUpdated: now.toISOString(),
  };
}

// Factory function to create Street API service
export function createStreetApiService(): StreetApiService {
  const config: StreetApiConfig = {
    apiKey: process.env.STREET_API_KEY || 'mock-api-key',
    baseUrl: process.env.STREET_API_BASE_URL || 'https://api.street.co.uk/v1',
    branchId: process.env.STREET_BRANCH_ID,
  };

  return new StreetApiService(config);
}

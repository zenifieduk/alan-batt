// Street Open API Types
export interface StreetApiConfig {
  apiKey: string;
  baseUrl: string;
  branchId?: string;
}

export interface StreetProperty {
  id: string;
  address: string;
  price: number;
  status: 'for-sale' | 'sold' | 'under-offer' | 'withdrawn';
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  receptions: number;
  sqft: number;
  dateListed: string;
  dateSold?: string;
  salePrice?: number;
  images: string[];
  description: string;
}

export interface StreetSalesData {
  period: {
    start: string;
    end: string;
    label: string;
  };
  metrics: {
    totalSales: number;
    totalValue: number;
    averagePrice: number;
    averageDaysOnMarket: number;
    salesByType: Array<{
      propertyType: string;
      count: number;
      averagePrice: number;
    }>;
    salesByPriceRange: Array<{
      range: string;
      count: number;
    }>;
  };
  recentSales: StreetProperty[];
  marketTrends: {
    priceChange: number;
    volumeChange: number;
    daysOnMarketChange: number;
  };
}

export interface StreetValuationData {
  period: {
    start: string;
    end: string;
  };
  metrics: {
    totalValuations: number;
    averageValuation: number;
    valuationsByType: Array<{
      propertyType: string;
      count: number;
      averageValue: number;
    }>;
  };
  recentValuations: Array<{
    id: string;
    address: string;
    valuation: number;
    date: string;
    propertyType: string;
  }>;
}

export interface StreetViewingData {
  period: {
    start: string;
    end: string;
  };
  metrics: {
    totalViewings: number;
    viewingsByProperty: Array<{
      propertyId: string;
      address: string;
      viewings: number;
    }>;
    averageViewingsPerProperty: number;
  };
  recentViewings: Array<{
    id: string;
    propertyId: string;
    address: string;
    date: string;
    status: 'scheduled' | 'completed' | 'cancelled';
  }>;
}

export interface StreetDashboardData {
  sales: StreetSalesData;
  valuations: StreetValuationData;
  viewings: StreetViewingData;
  lastUpdated: string;
}

export interface StreetApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

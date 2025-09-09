import { NextRequest, NextResponse } from 'next/server';
import { createStreetApiService, generateMockStreetData } from '@/lib/street-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30d';
    const useMock = searchParams.get('mock') === 'true' || !process.env.STREET_API_KEY;

    console.log('🏠 Loading Street property data...', { period, useMock });

    let data;

    if (useMock) {
      // Use mock data for development or when API key is not available
      console.log('📊 Using mock Street data');
      data = generateMockStreetData();
    } else {
      // Use real Street API
      const streetApi = createStreetApiService();
      const response = await streetApi.getDashboardData(period);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch Street data');
      }
      
      data = response.data;
    }

    return NextResponse.json({
      success: true,
      data,
      meta: {
        period,
        lastUpdated: new Date().toISOString(),
        source: useMock ? 'mock' : 'street-api',
      },
      message: 'Street property data loaded successfully',
    });
  } catch (error) {
    console.error('❌ Error loading Street data:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Failed to load Street property data',
      },
      { status: 500 }
    );
  }
}

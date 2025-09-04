import { NextRequest, NextResponse } from 'next/server';
import { SERPAPIService } from '@/lib/serp-api-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { keywords } = body;

    if (!keywords || !Array.isArray(keywords)) {
      return NextResponse.json(
        { success: false, error: 'Keywords array is required' },
        { status: 400 }
      );
    }

    console.log('🚀 Internal SERP API called with keywords:', keywords);

    // Use the SERP API service to get real data
    const serpData = await SERPAPIService.loadAllSERPData();

    return NextResponse.json({
      success: true,
      data: serpData,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Internal SERP API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch SERP data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

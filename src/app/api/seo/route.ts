import { NextRequest, NextResponse } from 'next/server';
import { SEODataLoader } from '@/lib/seo-data-loader';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const metric = searchParams.get('metric');
    const dateRange = searchParams.get('dateRange') || '30d';

    console.log('🚀 SEO API called with metric:', metric, 'dateRange:', dateRange);

    // Load all SEO data
    const seoData = await SEODataLoader.loadAllSEOData();

    // Return specific data based on query parameters
    if (metric === 'search-console') {
      return NextResponse.json({
        success: true,
        data: seoData.searchConsole,
        timestamp: new Date().toISOString(),
      });
    }

    if (metric === 'page-speed') {
      return NextResponse.json({
        success: true,
        data: seoData.pageSpeed,
        timestamp: new Date().toISOString(),
      });
    }

    if (metric === 'technical') {
      return NextResponse.json({
        success: true,
        data: seoData.technical,
        timestamp: new Date().toISOString(),
      });
    }

    if (metric === 'keywords') {
      return NextResponse.json({
        success: true,
        data: seoData.keywords,
        timestamp: new Date().toISOString(),
      });
    }

    if (metric === 'backlinks') {
      return NextResponse.json({
        success: true,
        data: seoData.backlinks,
        timestamp: new Date().toISOString(),
      });
    }

    if (metric === 'serp') {
      return NextResponse.json({
        success: true,
        data: seoData.serpData,
        timestamp: new Date().toISOString(),
      });
    }

    // Return all data by default
    return NextResponse.json({
      success: true,
      data: seoData,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('SEO API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch SEO data',
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

    console.log('📊 SEO API POST request:', { metrics, dateRange, dimensions });

    // In production, this would call the actual SEO APIs
    // For now, return mock data
    const seoData = await SEODataLoader.loadAllSEOData();

    return NextResponse.json({
      success: true,
      data: seoData,
      query: { metrics, dateRange, dimensions },
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('SEO API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process SEO request' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { scrapeProperties, scrapeBlogPosts } from '@/lib/content-scraper';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, urls } = body;

    if (!type || !urls || !Array.isArray(urls)) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: type, urls' },
        { status: 400 }
      );
    }

    if (urls.length === 0) {
      return NextResponse.json(
        { success: false, error: 'At least one URL is required' },
        { status: 400 }
      );
    }

    let result;
    switch (type) {
      case 'properties':
        result = await scrapeProperties(urls);
        break;
      case 'blogs':
        result = await scrapeBlogPosts(urls);
        break;
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid type. Must be "properties" or "blogs"' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: result,
      count: result.length
    });

  } catch (error) {
    console.error('Error scraping content:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to scrape content',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

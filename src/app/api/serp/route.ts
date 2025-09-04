import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, location = 'United Kingdom', device = 'desktop', num = 20 } = body;

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    console.log(`🔍 SERP API called for query: ${query}`);

    // This is where we would call the real SERP API server
    // For now, we'll simulate the API response structure
    // In production, this would be replaced with actual SERP API calls
    
    // Simulate API response delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate realistic SERP data based on the query
    const serpData = generateSERPResponse(query, location, device, num);

    return NextResponse.json({
      success: true,
      data: serpData,
      query,
      location,
      device,
      num,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('SERP API error:', error);
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

/**
 * Generate realistic SERP response data
 * This would be replaced with actual SERP API calls
 */
function generateSERPResponse(query: string, location: string, device: string, num: number) {
  const domain = 'alanbatt.co.uk';
  const competitors = [
    'rightmove.co.uk',
    'zoopla.co.uk',
    'onthemarket.com',
    'purplebricks.co.uk',
    'openrent.co.uk'
  ];

  const organicResults = [];
  
  for (let i = 0; i < Math.min(num, 20); i++) {
    const isOurDomain = Math.random() > 0.7; // 30% chance it's our domain
    const competitor = competitors[Math.floor(Math.random() * competitors.length)];
    
    organicResults.push({
      position: i + 1,
      title: generateTitle(query, isOurDomain),
      link: isOurDomain 
        ? `https://${domain}/${query.replace(/\s+/g, '-')}` 
        : `https://${competitor}/${query.replace(/\s+/g, '-')}`,
      snippet: generateSnippet(query, isOurDomain),
      domain: isOurDomain ? domain : competitor,
      isOurDomain,
    });
  }

  // Add featured snippet if applicable
  let featuredSnippet = null;
  if (Math.random() > 0.7) { // 30% chance of featured snippet
    featuredSnippet = {
      title: `Best ${query} in Wigan`,
      snippet: `Find the best ${query} with Alan Batt Estate Agents. Professional service and local expertise in Wigan, Greater Manchester.`,
      link: `https://${domain}/${query.replace(/\s+/g, '-')}`,
    };
  }

  return {
    organic_results: organicResults,
    featured_snippet: featuredSnippet,
    search_metadata: {
      query,
      location,
      device,
      total_results: Math.floor(Math.random() * 1000000) + 100000,
      search_time: Math.random() * 2 + 0.5,
    }
  };
}

function generateTitle(query: string, isOurDomain: boolean): string {
  if (isOurDomain) {
    const titles = [
      `${query.charAt(0).toUpperCase() + query.slice(1)} - Alan Batt Estate Agents`,
      `Best ${query} in Wigan | Alan Batt`,
      `${query.charAt(0).toUpperCase() + query.slice(1)} Wigan - Alan Batt Estate Agents`,
      `Professional ${query} Services - Alan Batt Wigan`
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  } else {
    const titles = [
      `${query.charAt(0).toUpperCase() + query.slice(1)} - Find Properties`,
      `Search ${query} - Property Listings`,
      `${query.charAt(0).toUpperCase() + query.slice(1)} - Property Search`,
      `Find ${query} - Real Estate Platform`
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }
}

function generateSnippet(query: string, isOurDomain: boolean): string {
  if (isOurDomain) {
    return `Find the best ${query} with Alan Batt Estate Agents. Professional service and local expertise in Wigan, Greater Manchester. Contact us today for expert advice.`;
  } else {
    return `Search thousands of ${query} listings. Compare prices, locations, and features. Find your perfect property with our comprehensive search tools.`;
  }
}

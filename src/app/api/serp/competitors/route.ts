import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      keyword, 
      domain = 'alanbatt.co.uk',
      num_results = 10,
      include_features = false
    } = body;

    if (!keyword) {
      return NextResponse.json(
        { success: false, error: 'Keyword parameter is required' },
        { status: 400 }
      );
    }

    console.log(`🔍 Competitor analysis API called for: ${keyword}`);

    // This is where we would call the real SERP API server
    // For now, we'll simulate the API response structure
    // In production, this would be replaced with actual SERP API calls
    
    // Simulate API response delay
    await new Promise(resolve => setTimeout(resolve, 600));

    // Generate realistic competitor analysis data
    const competitorData = generateCompetitorAnalysisData(keyword, domain, num_results, include_features);

    return NextResponse.json({
      success: true,
      data: competitorData,
      keyword,
      domain,
      num_results,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Competitor analysis API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch competitor analysis data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * Generate realistic competitor analysis data
 * This would be replaced with actual SERP API calls
 */
function generateCompetitorAnalysisData(keyword: string, domain: string, numResults: number, includeFeatures: boolean) {
  const competitors = [
    {
      domain: 'rightmove.co.uk',
      domainAuthority: 91,
      position: 1,
      title: `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} - Find Properties`,
      url: `https://rightmove.co.uk/properties/${keyword.replace(/\s+/g, '-')}`,
      features: includeFeatures ? ['Featured Snippet', 'Local Pack'] : [],
    },
    {
      domain: 'zoopla.co.uk',
      domainAuthority: 89,
      position: 2,
      title: `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} - Property Search`,
      url: `https://zoopla.co.uk/for-sale/${keyword.replace(/\s+/g, '-')}`,
      features: includeFeatures ? ['Local Pack'] : [],
    },
    {
      domain: 'onthemarket.com',
      domainAuthority: 87,
      position: 3,
      title: `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} - Real Estate`,
      url: `https://onthemarket.com/properties/${keyword.replace(/\s+/g, '-')}`,
      features: includeFeatures ? [] : [],
    },
    {
      domain: 'purplebricks.co.uk',
      domainAuthority: 85,
      position: 4,
      title: `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} - Property Listings`,
      url: `https://purplebricks.co.uk/properties/${keyword.replace(/\s+/g, '-')}`,
      features: includeFeatures ? [] : [],
    },
    {
      domain: 'openrent.co.uk',
      domainAuthority: 83,
      position: 5,
      title: `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} - Rental Properties`,
      url: `https://openrent.co.uk/properties/${keyword.replace(/\s+/g, '-')}`,
      features: includeFeatures ? [] : [],
    },
    {
      domain: 'gumtree.com',
      domainAuthority: 81,
      position: 6,
      title: `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} - Classifieds`,
      url: `https://gumtree.com/properties/${keyword.replace(/\s+/g, '-')}`,
      features: includeFeatures ? [] : [],
    },
    {
      domain: 'facebook.com',
      domainAuthority: 95,
      position: 7,
      title: `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} - Facebook Marketplace`,
      url: `https://facebook.com/marketplace/${keyword.replace(/\s+/g, '-')}`,
      features: includeFeatures ? ['Social Results'] : [],
    },
    {
      domain: 'prime-location.com',
      domainAuthority: 79,
      position: 8,
      title: `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} - Prime Location`,
      url: `https://prime-location.com/properties/${keyword.replace(/\s+/g, '-')}`,
      features: includeFeatures ? [] : [],
    },
    {
      domain: 'zoopla.co.uk',
      domainAuthority: 89,
      position: 9,
      title: `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} - Zoopla`,
      url: `https://zoopla.co.uk/for-rent/${keyword.replace(/\s+/g, '-')}`,
      features: includeFeatures ? [] : [],
    },
    {
      domain: 'zoopla.co.uk',
      domainAuthority: 89,
      position: 10,
      title: `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} - Property News`,
      url: `https://zoopla.co.uk/news/${keyword.replace(/\s+/g, '-')}`,
      features: includeFeatures ? [] : [],
    }
  ];

  // Add our domain if not already present
  const ourDomainExists = competitors.some(c => c.domain === domain);
  if (!ourDomainExists) {
    const ourPosition = Math.floor(Math.random() * 15) + 1;
    competitors.splice(ourPosition - 1, 0, {
      domain: domain,
      domainAuthority: 75,
      position: ourPosition,
      title: `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} - Alan Batt Estate Agents`,
      url: `https://${domain}/${keyword.replace(/\s+/g, '-')}`,
      features: includeFeatures ? ['Local Business'] : [],
    });
  }

  // Sort by position and limit results
  competitors.sort((a, b) => a.position - b.position);
  const limitedCompetitors = competitors.slice(0, numResults);

  return {
    keyword,
    ourDomain: domain,
    ourPosition: limitedCompetitors.find(c => c.domain === domain)?.position || 0,
    competitors: limitedCompetitors,
    analysis: {
      totalCompetitors: limitedCompetitors.length,
      averageDomainAuthority: Math.round(
        limitedCompetitors.reduce((sum, c) => sum + c.domainAuthority, 0) / limitedCompetitors.length
      ),
      competitionLevel: getCompetitionLevel(limitedCompetitors),
      opportunities: generateOpportunities(keyword, limitedCompetitors),
    }
  };
}

function getCompetitionLevel(competitors: any[]): string {
  const avgAuthority = competitors.reduce((sum, c) => sum + c.domainAuthority, 0) / competitors.length;
  
  if (avgAuthority > 85) return 'Very High';
  if (avgAuthority > 75) return 'High';
  if (avgAuthority > 65) return 'Medium';
  return 'Low';
}

function generateOpportunities(keyword: string, competitors: any[]): string[] {
  const opportunities = [];
  
  if (competitors.length < 5) {
    opportunities.push('Low competition - good opportunity to rank');
  }
  
  if (competitors.some(c => c.features.includes('Featured Snippet'))) {
    opportunities.push('Featured snippet opportunity available');
  }
  
  if (competitors.some(c => c.features.includes('Local Pack'))) {
    opportunities.push('Local pack optimization opportunity');
  }
  
  if (competitors.length > 0) {
    const avgAuthority = competitors.reduce((sum, c) => sum + c.domainAuthority, 0) / competitors.length;
    if (avgAuthority < 70) {
      opportunities.push('Competitors have lower domain authority');
    }
  }
  
  if (opportunities.length === 0) {
    opportunities.push('Focus on content quality and user experience');
  }
  
  return opportunities;
}

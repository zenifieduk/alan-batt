export interface SEOMetrics {
  searchConsole: SearchConsoleData;
  pageSpeed: PageSpeedData;
  technical: TechnicalSEOData;
  keywords: KeywordData;
  backlinks: BacklinkData;
  serpData: SERPData;
  lastUpdated: string;
}

export interface SERPData {
  domain: string;
  searchResults: SearchResult[];
  featuredSnippets: FeaturedSnippet[];
  knowledgeGraph: KnowledgeGraphData;
  relatedSearches: string[];
  searchVolume: number;
  competition: string;
  lastUpdated: string;
}

export interface SearchResult {
  position: number;
  title: string;
  url: string;
  description: string;
  domain: string;
  isOurDomain: boolean;
  featuredSnippet?: boolean;
  knowledgeGraph?: boolean;
}

export interface FeaturedSnippet {
  query: string;
  title: string;
  description: string;
  url: string;
  position: number;
}

export interface KnowledgeGraphData {
  title: string;
  description: string;
  image?: string;
  attributes: Array<{ label: string; value: string }>;
}

export interface SearchConsoleData {
  clicks: number;
  impressions: number;
  ctr: number;
  averagePosition: number;
  totalQueries: number;
  topQueries: Array<{
    query: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
  topPages: Array<{
    page: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }>;
  deviceBreakdown: {
    desktop: { clicks: number; impressions: number; ctr: number };
    mobile: { clicks: number; impressions: number; ctr: number };
    tablet: { clicks: number; impressions: number; ctr: number };
  };
  countryBreakdown: Array<{
    country: string;
    clicks: number;
    impressions: number;
    ctr: number;
  }>;
}

export interface PageSpeedData {
  mobile: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    firstInputDelay: number;
    cumulativeLayoutShift: number;
  };
  desktop: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    firstInputDelay: number;
    cumulativeLayoutShift: number;
  };
  overall: {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  };
}

export interface TechnicalSEOData {
  crawlability: {
    totalPages: number;
    indexedPages: number;
    blockedPages: number;
    crawlErrors: number;
  };
  structuredData: {
    totalSchemas: number;
    validSchemas: number;
    errors: number;
    warnings: number;
  };
  metaTags: {
    titleIssues: number;
    descriptionIssues: number;
    duplicateTitles: number;
    duplicateDescriptions: number;
  };
  images: {
    totalImages: number;
    imagesWithoutAlt: number;
    oversizedImages: number;
  };
  links: {
    internalLinks: number;
    externalLinks: number;
    brokenLinks: number;
  };
}

export interface KeywordData {
  totalKeywords: number;
  rankingKeywords: Array<{
    keyword: string;
    position: number;
    searchVolume: number;
    difficulty: number;
    url: string;
    change: number;
  }>;
  keywordGaps: Array<{
    keyword: string;
    searchVolume: number;
    difficulty: number;
    opportunity: 'high' | 'medium' | 'low';
  }>;
  competitorKeywords: Array<{
    keyword: string;
    ourPosition: number;
    competitorPositions: Array<{
      competitor: string;
      position: number;
    }>;
  }>;
}

export interface BacklinkData {
  totalBacklinks: number;
  referringDomains: number;
  domainAuthority: number;
  spamScore: number;
  topBacklinks: Array<{
    url: string;
    domainAuthority: number;
    anchorText: string;
    followType: 'follow' | 'nofollow';
    firstSeen: string;
  }>;
  backlinkTypes: {
    dofollow: number;
    nofollow: number;
    sponsored: number;
    ugc: number;
  };
  anchorTextDistribution: Array<{
    anchorText: string;
    count: number;
    percentage: number;
  }>;
}

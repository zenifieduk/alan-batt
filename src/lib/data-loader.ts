/**
 * Data Loader for Facebook and Instagram CSV files
 * Reads and combines data from multiple CSV exports
 */

import { CSVProcessor } from './csv-processor';

interface DailyMetricData {
  date: string;
  views: number;
  follows: number;
  reach: number;
  interactions: number;
  visits: number;
  linkClicks: number;
  impressions?: number;
  engagement?: number;
  audienceSize?: number;
}

interface MetricData {
  dailyMetrics: DailyMetricData[];
}

interface PlatformData {
  views: number;
  follows: number;
  reach: number;
  interactions: number;
  visits: number;
  linkClicks: number;
  viewsData: MetricData;
  followsData: MetricData;
  reachData: MetricData;
  interactionsData: MetricData;
  visitsData: MetricData;
  linkClicksData: MetricData;
}


export interface CombinedMetrics {
  facebook: {
    views: number;
    follows: number;
    reach: number;
    interactions: number;
    visits: number;
    linkClicks: number;
    dailyMetrics: Array<{
      date: string;
      views: number;
      follows: number;
      reach: number;
      interactions: number;
      visits: number;
      linkClicks: number;
    }>;
  };
  instagram: {
    views: number;
    follows: number;
    reach: number;
    interactions: number;
    visits: number;
    linkClicks: number;
    dailyMetrics: Array<{
      date: string;
      views: number;
      follows: number;
      reach: number;
      interactions: number;
      visits: number;
      linkClicks: number;
    }>;
  };
  lastUpdated: string;
}

export class DataLoader {
  /**
   * Load all CSV files and combine metrics
   */
  static async loadAllData(): Promise<CombinedMetrics> {
    try {
      console.log('🚀 Starting to load all data...');
      
      // Load Facebook data
      const facebookData = await this.loadFacebookData();
      console.log('📘 Facebook data loaded:', facebookData);
      
      // Load Instagram data
      const instagramData = await this.loadInstagramData();
      console.log('📷 Instagram data loaded:', instagramData);
      
      // Combine daily metrics
      const combinedDailyMetrics = this.combineDailyMetrics(facebookData, instagramData);
      console.log('🔗 Combined daily metrics:', combinedDailyMetrics);
      
      const result = {
        facebook: {
          views: facebookData.views || 0,
          follows: facebookData.follows || 0,
          reach: facebookData.reach || 0,
          interactions: facebookData.interactions || 0,
          visits: facebookData.visits || 0,
          linkClicks: facebookData.linkClicks || 0,
          dailyMetrics: combinedDailyMetrics.facebook
        },
        instagram: {
          views: instagramData.views || 0,
          follows: instagramData.follows || 0,
          reach: instagramData.reach || 0,
          interactions: instagramData.interactions || 0,
          visits: instagramData.visits || 0,
          linkClicks: instagramData.linkClicks || 0,
          dailyMetrics: combinedDailyMetrics.instagram
        },
        lastUpdated: new Date().toISOString()
      };
      
      console.log('✅ Final result:', result);
      console.log('📊 Facebook summary:', {
        views: result.facebook.views,
        follows: result.facebook.follows,
        reach: result.facebook.reach,
        interactions: result.facebook.interactions,
        visits: result.facebook.visits,
        linkClicks: result.facebook.linkClicks,
        dailyMetricsCount: result.facebook.dailyMetrics.length
      });
      console.log('📊 Instagram summary:', {
        views: result.instagram.views,
        follows: result.instagram.follows,
        reach: result.instagram.reach,
        interactions: result.instagram.interactions,
        visits: result.instagram.visits,
        linkClicks: result.instagram.linkClicks,
        dailyMetricsCount: result.instagram.dailyMetrics.length
      });
      
      return result;
    } catch (error) {
      console.error('❌ Error loading data:', error);
      throw error;
    }
  }

  /**
   * Load Facebook CSV files
   */
  private static async loadFacebookData(): Promise<PlatformData> {
    const files = [
      'Views.csv',
      'Follows.csv',
      'Reach.csv',
      'Interactions.csv',
      'Visits.csv',
      'Link clicks.csv'
    ];

    const data: PlatformData = {
      views: 0,
      follows: 0,
      reach: 0,
      interactions: 0,
      visits: 0,
      linkClicks: 0,
      viewsData: { dailyMetrics: [] },
      followsData: { dailyMetrics: [] },
      reachData: { dailyMetrics: [] },
      interactionsData: { dailyMetrics: [] },
      visitsData: { dailyMetrics: [] },
      linkClicksData: { dailyMetrics: [] }
    };
    
    for (const filename of files) {
      try {
        console.log(`🔍 Loading Facebook ${filename}...`);
        const response = await fetch(`/data/facebook/${filename}`);
        console.log(`📡 Response for ${filename}:`, response.status, response.ok);
        
        if (response.ok) {
          const csvContent = await response.text();
          // The CSV files are UTF-16 encoded, so we need to handle this properly
          // For now, we'll use the text as-is since fetch should handle encoding
          console.log(`📄 CSV content length for ${filename}:`, csvContent.length);
          console.log(`📄 CSV content preview for ${filename}:`, csvContent.substring(0, 200));
          
          if (csvContent.length === 0) {
            console.warn(`⚠️ Empty CSV content for ${filename}`);
            continue;
          }
          
          const processedData = CSVProcessor.processCSV(csvContent, 'facebook', filename);
          console.log(`⚙️ Processed data for ${filename}:`, processedData.metadata);
          console.log(`📊 Processed data rows for ${filename}:`, processedData.rows.length);
          console.log(`📊 First row for ${filename}:`, processedData.rows[0]);
          console.log(`📊 Last row for ${filename}:`, processedData.rows[processedData.rows.length - 1]);
          
          const metrics = CSVProcessor.extractMetrics(processedData);
          console.log(`📈 Extracted metrics for ${filename}:`, metrics);
          
          // Store metrics based on type
          switch (processedData.metadata.metricType) {
            case 'Views':
              data.views = metrics.pageImpressions || 0;
              data.viewsData = {
                dailyMetrics: metrics.dailyMetrics || []
              };
              console.log(`✅ Set Facebook views to:`, data.views);
              break;
            case 'Follows':
              data.follows = metrics.pageFollowers || 0;
              data.followsData = {
                dailyMetrics: metrics.dailyMetrics || []
              };
              console.log(`✅ Set Facebook follows to:`, data.follows);
              break;
            case 'Reach':
              data.reach = metrics.pageReach || 0;
              data.reachData = {
                dailyMetrics: metrics.dailyMetrics || []
              };
              console.log(`✅ Set Facebook reach to:`, data.reach);
              break;
            case 'Interactions':
              data.interactions = metrics.pageEngagement || 0;
              data.interactionsData = {
                dailyMetrics: metrics.dailyMetrics || []
              };
              console.log(`✅ Set Facebook interactions to:`, data.interactions);
              break;
            case 'Visits':
              data.visits = metrics.pageImpressions || 0;
              data.visitsData = {
                dailyMetrics: metrics.dailyMetrics || []
              };
              console.log(`✅ Set Facebook visits to:`, data.visits);
              break;
            case 'Link Clicks':
              data.linkClicks = metrics.pageImpressions || 0;
              data.linkClicksData = {
                dailyMetrics: metrics.dailyMetrics || []
              };
              console.log(`✅ Set Facebook linkClicks to:`, data.linkClicks);
              break;
          }
        } else {
          console.warn(`⚠️ Failed to load ${filename}: HTTP ${response.status}`);
        }
      } catch (error) {
        console.warn(`❌ Failed to load ${filename}:`, error);
      }
    }

    console.log(`🎯 Final Facebook data object:`, data);
    return data;
  }

  /**
   * Load Instagram CSV files
   */
  private static async loadInstagramData(): Promise<PlatformData> {
    const files = [
      'Views.csv',
      'Follows.csv',
      'Reach.csv',
      'Interactions.csv',
      'Visits.csv',
      'Link clicks.csv'
    ];

    const data: PlatformData = {
      views: 0,
      follows: 0,
      reach: 0,
      interactions: 0,
      visits: 0,
      linkClicks: 0,
      viewsData: { dailyMetrics: [] },
      followsData: { dailyMetrics: [] },
      reachData: { dailyMetrics: [] },
      interactionsData: { dailyMetrics: [] },
      visitsData: { dailyMetrics: [] },
      linkClicksData: { dailyMetrics: [] }
    };
    
    for (const filename of files) {
      try {
        console.log(`Loading Instagram ${filename}...`);
        const response = await fetch(`/data/instagram/${filename}`);
        console.log(`Instagram response for ${filename}:`, response.status, response.ok);
        
        if (response.ok) {
          const csvContent = await response.text();
          console.log(`Instagram CSV content length for ${filename}:`, csvContent.length);
          
          const processedData = CSVProcessor.processCSV(csvContent, 'instagram', filename);
          console.log(`Instagram processed data for ${filename}:`, processedData.metadata);
          
          const metrics = CSVProcessor.extractMetrics(processedData);
          console.log(`Instagram extracted metrics for ${filename}:`, metrics);
          
          // Store metrics based on type
          switch (processedData.metadata.metricType) {
            case 'Views':
              data.views = metrics.pageImpressions || 0;
              data.viewsData = {
                dailyMetrics: metrics.dailyMetrics || []
              };
              console.log(`Instagram set views to:`, data.views);
              break;
            case 'Follows':
              data.follows = metrics.audienceSize || 0;
              data.followsData = {
                dailyMetrics: metrics.dailyMetrics || []
              };
              console.log(`Instagram set follows to:`, data.follows);
              break;
            case 'Reach':
              data.reach = metrics.pageReach || 0;
              data.reachData = {
                dailyMetrics: metrics.dailyMetrics || []
              };
              console.log(`Instagram set reach to:`, data.reach);
              break;
            case 'Interactions':
              data.interactions = metrics.pageEngagement || 0;
              data.interactionsData = {
                dailyMetrics: metrics.dailyMetrics || []
              };
              console.log(`Instagram set interactions to:`, data.interactions);
              break;
            case 'Visits':
              data.visits = metrics.pageImpressions || 0;
              data.visitsData = {
                dailyMetrics: metrics.dailyMetrics || []
              };
              console.log(`Instagram set visits to:`, data.visits);
              break;
            case 'Link Clicks':
              data.linkClicks = metrics.pageImpressions || 0;
              data.linkClicksData = {
                dailyMetrics: metrics.dailyMetrics || []
              };
              console.log(`Instagram set linkClicks to:`, data.linkClicks);
              break;
          }
        } else {
          console.warn(`Failed to load Instagram ${filename}: HTTP ${response.status}`);
        }
      } catch (error) {
        console.warn(`Failed to load Instagram ${filename}:`, error);
      }
    }

    return data;
  }

  /**
   * Combine daily metrics from all sources
   */
  private static combineDailyMetrics(facebookData: PlatformData, instagramData: PlatformData): {
    facebook: Array<DailyMetricData>;
    instagram: Array<DailyMetricData>;
  } {
    const facebookDaily: DailyMetricData[] = [];
    const instagramDaily: DailyMetricData[] = [];

    // Process Facebook daily metrics - create a map by date to merge metrics
    const facebookDateMap = new Map<string, DailyMetricData>();

    // Process each metric type and merge by date
    if (facebookData.viewsData?.dailyMetrics) {
      facebookData.viewsData.dailyMetrics.forEach((day: DailyMetricData) => {
        const date = day.date;
        if (!facebookDateMap.has(date)) {
          facebookDateMap.set(date, {
            date,
            views: 0,
            follows: 0,
            reach: 0,
            interactions: 0,
            visits: 0,
            linkClicks: 0
          });
        }
        const existingData = facebookDateMap.get(date);
        if (existingData) {
          existingData.views = day.views || 0;
        }
      });
    }

    if (facebookData.followsData?.dailyMetrics) {
      facebookData.followsData.dailyMetrics.forEach((day: DailyMetricData) => {
        const date = day.date;
        if (!facebookDateMap.has(date)) {
          facebookDateMap.set(date, {
            date,
            views: 0,
            follows: 0,
            reach: 0,
            interactions: 0,
            visits: 0,
            linkClicks: 0
          });
        }
        const existingData = facebookDateMap.get(date);
        if (existingData) {
          existingData.follows = day.follows || 0;
        }
      });
    }

    if (facebookData.reachData?.dailyMetrics) {
      facebookData.reachData.dailyMetrics.forEach((day: DailyMetricData) => {
        const date = day.date;
        if (!facebookDateMap.has(date)) {
          facebookDateMap.set(date, {
            date,
            views: 0,
            follows: 0,
            reach: 0,
            interactions: 0,
            visits: 0,
            linkClicks: 0
          });
        }
        const existingData = facebookDateMap.get(date);
        if (existingData) {
          existingData.reach = day.reach || 0;
        }
      });
    }

    if (facebookData.interactionsData?.dailyMetrics) {
      facebookData.interactionsData.dailyMetrics.forEach((day: DailyMetricData) => {
        const date = day.date;
        if (!facebookDateMap.has(date)) {
          facebookDateMap.set(date, {
            date,
            views: 0,
            follows: 0,
            reach: 0,
            interactions: 0,
            visits: 0,
            linkClicks: 0
          });
        }
        const existingData = facebookDateMap.get(date);
        if (existingData) {
          existingData.interactions = day.interactions || 0;
        }
      });
    }

    if (facebookData.visitsData?.dailyMetrics) {
      facebookData.visitsData.dailyMetrics.forEach((day: DailyMetricData) => {
        const date = day.date;
        if (!facebookDateMap.has(date)) {
          facebookDateMap.set(date, {
            date,
            views: 0,
            follows: 0,
            reach: 0,
            interactions: 0,
            visits: 0,
            linkClicks: 0
          });
        }
        const existingData = facebookDateMap.get(date);
        if (existingData) {
          existingData.visits = day.visits || 0;
        }
      });
    }

    if (facebookData.linkClicksData?.dailyMetrics) {
      facebookData.linkClicksData.dailyMetrics.forEach((day: DailyMetricData) => {
        const date = day.date;
        if (!facebookDateMap.has(date)) {
          facebookDateMap.set(date, {
            date,
            views: 0,
            follows: 0,
            reach: 0,
            interactions: 0,
            visits: 0,
            linkClicks: 0
          });
        }
        const existingData = facebookDateMap.get(date);
        if (existingData) {
          existingData.linkClicks = day.linkClicks || 0;
        }
      });
    }

    // Convert map to array and sort by date
    facebookDaily.push(...Array.from(facebookDateMap.values()));

    // Process Instagram daily metrics - create a map by date to merge metrics
    const instagramDateMap = new Map<string, DailyMetricData>();

    if (instagramData.viewsData?.dailyMetrics) {
      instagramData.viewsData.dailyMetrics.forEach((day: DailyMetricData) => {
        const date = day.date;
        if (!instagramDateMap.has(date)) {
          instagramDateMap.set(date, {
            date,
            views: 0,
            follows: 0,
            reach: 0,
            interactions: 0,
            visits: 0,
            linkClicks: 0
          });
        }
        const existingData = instagramDateMap.get(date);
        if (existingData) {
          existingData.views = day.views || 0;
        }
      });
    }

    if (instagramData.followsData?.dailyMetrics) {
      instagramData.followsData.dailyMetrics.forEach((day: DailyMetricData) => {
        const date = day.date;
        if (!instagramDateMap.has(date)) {
          instagramDateMap.set(date, {
            date,
            views: 0,
            follows: 0,
            reach: 0,
            interactions: 0,
            visits: 0,
            linkClicks: 0
          });
        }
        const existingData = instagramDateMap.get(date);
        if (existingData) {
          existingData.follows = day.follows || 0;
        }
      });
    }

    if (instagramData.reachData?.dailyMetrics) {
      instagramData.reachData.dailyMetrics.forEach((day: DailyMetricData) => {
        const date = day.date;
        if (!instagramDateMap.has(date)) {
          instagramDateMap.set(date, {
            date,
            views: 0,
            follows: 0,
            reach: 0,
            interactions: 0,
            visits: 0,
            linkClicks: 0
          });
        }
        const existingData = instagramDateMap.get(date);
        if (existingData) {
          existingData.reach = day.reach || 0;
        }
      });
    }

    if (instagramData.interactionsData?.dailyMetrics) {
      instagramData.interactionsData.dailyMetrics.forEach((day: DailyMetricData) => {
        const date = day.date;
        if (!instagramDateMap.has(date)) {
          instagramDateMap.set(date, {
            date,
            views: 0,
            follows: 0,
            reach: 0,
            interactions: 0,
            visits: 0,
            linkClicks: 0
          });
        }
        const existingData = instagramDateMap.get(date);
        if (existingData) {
          existingData.interactions = day.interactions || 0;
        }
      });
    }

    if (instagramData.visitsData?.dailyMetrics) {
      instagramData.visitsData.dailyMetrics.forEach((day: DailyMetricData) => {
        const date = day.date;
        if (!instagramDateMap.has(date)) {
          instagramDateMap.set(date, {
            date,
            views: 0,
            follows: 0,
            reach: 0,
            interactions: 0,
            visits: 0,
            linkClicks: 0
          });
        }
        const existingData = instagramDateMap.get(date);
        if (existingData) {
          existingData.visits = day.visits || 0;
        }
      });
    }

    if (instagramData.linkClicksData?.dailyMetrics) {
      instagramData.linkClicksData.dailyMetrics.forEach((day: DailyMetricData) => {
        const date = day.date;
        if (!instagramDateMap.has(date)) {
          instagramDateMap.set(date, {
            date,
            views: 0,
            follows: 0,
            reach: 0,
            interactions: 0,
            visits: 0,
            linkClicks: 0
          });
        }
        const existingData = instagramDateMap.get(date);
        if (existingData) {
          existingData.linkClicks = day.linkClicks || 0;
        }
      });
    }

    // Convert map to array and sort by date
    instagramDaily.push(...Array.from(instagramDateMap.values()));

    // Filter out days where all metrics are 0 to avoid showing empty data
    const filterEmptyDays = (data: DailyMetricData[]) => {
      return data.filter(day => 
        day.views > 0 || day.follows > 0 || day.reach > 0 || 
        day.interactions > 0 || day.visits > 0 || day.linkClicks > 0
      );
    };

    return {
      facebook: filterEmptyDays(facebookDaily).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
      instagram: filterEmptyDays(instagramDaily).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    };
  }

  /**
   * Get summary statistics
   */
  static getSummaryStats(metrics: CombinedMetrics): {
    totalFollowers: number;
    totalReach: number;
    totalViews: number;
    totalEngagement: number;
    growthRate: number;
  } {
    const totalFollowers = (metrics.facebook.follows || 0) + (metrics.instagram.follows || 0);
    const totalReach = (metrics.facebook.reach || 0) + (metrics.instagram.reach || 0);
    const totalViews = (metrics.facebook.views || 0) + (metrics.instagram.views || 0);
    const totalEngagement = (metrics.facebook.interactions || 0) + (metrics.instagram.interactions || 0);

    // Calculate growth rate (simplified)
    const growthRate = totalFollowers > 0 ? ((totalFollowers / 100) - 1) * 100 : 0;

    return {
      totalFollowers,
      totalReach,
      totalViews,
      totalEngagement,
      growthRate: Math.round(growthRate * 100) / 100
    };
  }
}

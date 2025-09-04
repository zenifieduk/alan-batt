import { NextResponse } from 'next/server';
import { CSVProcessor } from '@/lib/csv-processor';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    console.log('🚀 Loading social media data from CSV files...');
    
    const result = {
      facebook: {
        views: 0,
        follows: 0,
        reach: 0,
        interactions: 0,
        visits: 0,
        linkClicks: 0,
        dailyMetrics: [] as Array<{
          date: string;
          views: number;
          follows: number;
          reach: number;
          interactions: number;
          visits: number;
          linkClicks: number;
        }>
      },
      instagram: {
        views: 0,
        follows: 0,
        reach: 0,
        interactions: 0,
        visits: 0,
        linkClicks: 0,
        dailyMetrics: [] as Array<{
          date: string;
          views: number;
          follows: number;
          reach: number;
          interactions: number;
          visits: number;
          linkClicks: number;
        }>
      },
      lastUpdated: new Date().toISOString()
    };

    // Load Facebook data
    const facebookFiles = [
      { name: 'Views.csv', metric: 'views', field: 'impressions' },
      { name: 'Follows.csv', metric: 'follows', field: 'follows' },
      { name: 'Reach.csv', metric: 'reach', field: 'reach' },
      { name: 'Interactions.csv', metric: 'interactions', field: 'interactions' },
      { name: 'Visits.csv', metric: 'visits', field: 'visits' },
      { name: 'Link clicks.csv', metric: 'linkClicks', field: 'linkClicks' }
    ];

    // Store daily metrics from each file
    const facebookDailyMetrics: { [date: string]: any } = {};

    for (const file of facebookFiles) {
      try {
        const filePath = path.join(process.cwd(), 'public', 'data', 'facebook', file.name);
        if (fs.existsSync(filePath)) {
          // Read with UTF-16 encoding since the files are UTF-16
          const csvContent = fs.readFileSync(filePath, 'utf16le');
          console.log(`📄 Processing Facebook ${file.name}...`);
          
          const processed = CSVProcessor.processCSV(csvContent, 'facebook', file.name);
          const metrics = CSVProcessor.extractMetrics(processed);
          
          // Set the appropriate metric
          switch (file.metric) {
            case 'views':
              result.facebook.views = metrics.pageImpressions || 0;
              break;
            case 'follows':
              result.facebook.follows = metrics.pageFollowers || 0;
              break;
            case 'reach':
              result.facebook.reach = metrics.pageReach || 0;
              break;
            case 'interactions':
              result.facebook.interactions = metrics.pageEngagement || 0;
              break;
            case 'visits':
              result.facebook.visits = metrics.pageImpressions || 0;
              break;
            case 'linkClicks':
              result.facebook.linkClicks = metrics.pageImpressions || 0;
              break;
          }
          
          // Add daily metrics to the combined object
          if (metrics.dailyMetrics) {
            metrics.dailyMetrics.forEach((day: any) => {
              if (!facebookDailyMetrics[day.date]) {
                facebookDailyMetrics[day.date] = {
                  date: day.date,
                  views: 0,
                  follows: 0,
                  reach: 0,
                  interactions: 0,
                  visits: 0,
                  linkClicks: 0
                };
              }
              
              // Set the appropriate field based on the file type
              // The CSV processor returns the data in specific fields, so we need to map them correctly
              switch (file.metric) {
                case 'views':
                  facebookDailyMetrics[day.date].views = day.views || 0;
                  break;
                case 'follows':
                  facebookDailyMetrics[day.date].follows = day.follows || 0;
                  break;
                case 'reach':
                  facebookDailyMetrics[day.date].reach = day.reach || 0;
                  break;
                case 'interactions':
                  facebookDailyMetrics[day.date].interactions = day.interactions || 0;
                  break;
                case 'visits':
                  facebookDailyMetrics[day.date].visits = day.visits || 0;
                  break;
                case 'linkClicks':
                  facebookDailyMetrics[day.date].linkClicks = day.linkClicks || 0;
                  break;
              }
            });
          }
          
          console.log(`✅ Facebook ${file.metric}:`, result.facebook[file.metric as keyof typeof result.facebook]);
        }
      } catch (error) {
        console.warn(`⚠️ Failed to process Facebook ${file.name}:`, error);
      }
    }

    // Convert the daily metrics object to an array and sort by date
    result.facebook.dailyMetrics = Object.values(facebookDailyMetrics)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Load Instagram data
    const instagramFiles = [
      { name: 'Views.csv', metric: 'views', field: 'impressions' },
      { name: 'Follows.csv', metric: 'follows', field: 'follows' },
      { name: 'Reach.csv', metric: 'reach', field: 'reach' },
      { name: 'Interactions.csv', metric: 'interactions', field: 'interactions' },
      { name: 'Visits.csv', metric: 'visits', field: 'visits' },
      { name: 'Link clicks.csv', metric: 'linkClicks', field: 'linkClicks' }
    ];

    // Store daily metrics from each file
    const instagramDailyMetrics: { [date: string]: any } = {};

    for (const file of instagramFiles) {
      try {
        const filePath = path.join(process.cwd(), 'public', 'data', 'instagram', file.name);
        if (fs.existsSync(filePath)) {
          // Read with UTF-16 encoding since the files are UTF-16
          const csvContent = fs.readFileSync(filePath, 'utf16le');
          console.log(`📄 Processing Instagram ${file.name}...`);
          
          const processed = CSVProcessor.processCSV(csvContent, 'instagram', file.name);
          const metrics = CSVProcessor.extractMetrics(processed);
          
          // Set the appropriate metric
          switch (file.metric) {
            case 'views':
              result.instagram.views = metrics.pageImpressions || 0;
              break;
            case 'follows':
              result.instagram.follows = metrics.audienceSize || 0;
              break;
            case 'reach':
              result.instagram.reach = metrics.pageReach || 0;
              break;
            case 'interactions':
              result.instagram.interactions = metrics.pageEngagement || 0;
              break;
            case 'visits':
              result.instagram.visits = metrics.pageImpressions || 0;
              break;
            case 'linkClicks':
              result.instagram.linkClicks = metrics.pageImpressions || 0;
              break;
          }
          
          // Add daily metrics to the combined object
          if (metrics.dailyMetrics) {
            metrics.dailyMetrics.forEach((day: any) => {
              if (!instagramDailyMetrics[day.date]) {
                instagramDailyMetrics[day.date] = {
                  date: day.date,
                  views: 0,
                  follows: 0,
                  reach: 0,
                  interactions: 0,
                  visits: 0,
                  linkClicks: 0
                };
              }
              
              // Set the appropriate field based on the file type
              // The CSV processor returns the data in specific fields, so we need to map them correctly
              switch (file.metric) {
                case 'views':
                  instagramDailyMetrics[day.date].views = day.impressions || 0;
                  break;
                case 'follows':
                  instagramDailyMetrics[day.date].follows = day.follows || 0;
                  break;
                case 'reach':
                  instagramDailyMetrics[day.date].reach = day.reach || 0;
                  break;
                case 'interactions':
                  instagramDailyMetrics[day.date].interactions = day.interactions || day.engagement || 0;
                  break;
                case 'visits':
                  instagramDailyMetrics[day.date].visits = day.visits || 0;
                  break;
                case 'linkClicks':
                  instagramDailyMetrics[day.date].linkClicks = day.linkClicks || 0;
                  break;
              }
            });
          }
          
          console.log(`✅ Instagram ${file.metric}:`, result.instagram[file.metric as keyof typeof result.instagram]);
        }
      } catch (error) {
        console.warn(`⚠️ Failed to process Instagram ${file.name}:`, error);
      }
    }

    // Convert the daily metrics object to an array and sort by date
    result.instagram.dailyMetrics = Object.values(instagramDailyMetrics)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Filter out days where all metrics are 0 to avoid showing empty data
    const filterEmptyDays = (data: any[]) => {
      return data.filter(day => 
        day.views > 0 || day.follows > 0 || day.reach > 0 || 
        day.interactions > 0 || day.visits > 0 || day.linkClicks > 0
      );
    };

    // Apply filtering to both platforms
    result.facebook.dailyMetrics = filterEmptyDays(result.facebook.dailyMetrics);
    result.instagram.dailyMetrics = filterEmptyDays(result.instagram.dailyMetrics);

    console.log('📊 Final result:', result);
    console.log('📅 Facebook daily metrics sample:', result.facebook.dailyMetrics.slice(0, 3));
    console.log('📅 Instagram daily metrics sample:', result.instagram.dailyMetrics.slice(0, 3));
    
    return NextResponse.json({
      success: true,
      data: result,
      message: 'Social media data loaded successfully'
    });
  } catch (error) {
    console.error('❌ Error loading social data:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Failed to load social media data'
    }, { status: 500 });
  }
}

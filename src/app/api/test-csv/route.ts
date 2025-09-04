import { NextResponse } from 'next/server';
import { CSVProcessor } from '@/lib/csv-processor';
import { DataLoader } from '@/lib/data-loader';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    console.log('🧪 Testing CSV processing with real files...');
    
    // Test 1: Process a single CSV file manually
    const facebookViewsPath = path.join(process.cwd(), 'public', 'data', 'facebook', 'Views.csv');
    
    // Read with UTF-16 encoding since the files are UTF-16
    const facebookViewsContent = fs.readFileSync(facebookViewsPath, 'utf16le');
    
    console.log('📄 Facebook Views CSV content preview:', facebookViewsContent.substring(0, 200));
    
    const processed = CSVProcessor.processCSV(facebookViewsContent, 'facebook', 'Views.csv');
    console.log('📊 Processed CSV:', processed);
    
    const metrics = CSVProcessor.extractMetrics(processed);
    console.log('📈 Extracted metrics:', metrics);
    
    // Test 2: Try to load all data using DataLoader
    console.log('🚀 Testing DataLoader.loadAllData()...');
    const allData = await DataLoader.loadAllData();
    console.log('📊 All data loaded:', allData);
    
    return NextResponse.json({
      success: true,
      singleFileTest: {
        processed,
        metrics
      },
      allDataTest: {
        facebook: {
          views: allData.facebook.views,
          follows: allData.facebook.follows,
          reach: allData.facebook.reach,
          interactions: allData.facebook.interactions,
          visits: allData.facebook.visits,
          linkClicks: allData.facebook.linkClicks,
          dailyMetricsCount: allData.facebook.dailyMetrics.length
        },
        instagram: {
          views: allData.instagram.views,
          follows: allData.instagram.follows,
          reach: allData.instagram.reach,
          interactions: allData.instagram.interactions,
          visits: allData.instagram.visits,
          linkClicks: allData.instagram.linkClicks,
          dailyMetricsCount: allData.instagram.dailyMetrics.length
        }
      },
      message: 'CSV processing test with real files completed'
    });
  } catch (error) {
    console.error('❌ CSV test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'CSV processing test failed'
    }, { status: 500 });
  }
}

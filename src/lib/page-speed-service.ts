import { PageSpeedData } from '@/types/seo';

export class PageSpeedService {
  private static readonly API_KEY = process.env.GOOGLE_PAGESPEED_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_PAGESPEED_API_KEY || '';
  private static readonly BASE_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
  private static readonly DOMAIN = 'alanbatt.co.uk';

  /**
   * Get real PageSpeed data for a URL
   */
  static async getPageSpeedData(url: string = `https://${this.DOMAIN}`): Promise<PageSpeedData> {
    try {
      console.log(`🚀 Getting real PageSpeed data for: ${url}`);
      
      if (!this.API_KEY) {
        console.log('⚠️ No Google PageSpeed API key found - returning empty data');
        return {
          mobile: {
            performance: 0,
            accessibility: 0,
            bestPractices: 0,
            seo: 0,
            firstContentfulPaint: 0,
            largestContentfulPaint: 0,
            firstInputDelay: 0,
            cumulativeLayoutShift: 0,
          },
          desktop: {
            performance: 0,
            accessibility: 0,
            bestPractices: 0,
            seo: 0,
            firstContentfulPaint: 0,
            largestContentfulPaint: 0,
            firstInputDelay: 0,
            cumulativeLayoutShift: 0,
          },
          overall: {
            performance: 0,
            accessibility: 0,
            bestPractices: 0,
            seo: 0,
          },
        };
      }

      // Get both mobile and desktop data
      const [mobileData, desktopData] = await Promise.all([
        this.fetchPageSpeedData(url, 'mobile'),
        this.fetchPageSpeedData(url, 'desktop')
      ]);

      // Process and combine the data
      const processedData = this.processPageSpeedData(mobileData, desktopData);
      
      console.log('✅ Real PageSpeed data loaded successfully');
      return processedData;
      
    } catch (error) {
      console.error('Error getting PageSpeed data:', error);
      throw new Error(`Failed to get PageSpeed data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Fetch PageSpeed data from Google API
   */
  private static async fetchPageSpeedData(url: string, strategy: 'mobile' | 'desktop'): Promise<any> {
    const params = new URLSearchParams({
      url,
      key: this.API_KEY,
      strategy,
      category: 'performance'
    });

    const response = await fetch(`${this.BASE_URL}?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`PageSpeed API error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Process raw PageSpeed API data into our format
   */
  private static processPageSpeedData(mobileData: any, desktopData: any): PageSpeedData {
    const mobileMetrics = this.extractMetrics(mobileData);
    const desktopMetrics = this.extractMetrics(desktopData);

    return {
      mobile: {
        performance: mobileMetrics.performance,
        accessibility: mobileMetrics.accessibility,
        bestPractices: mobileMetrics.bestPractices,
        seo: mobileMetrics.seo,
        firstContentfulPaint: mobileMetrics.fcp,
        largestContentfulPaint: mobileMetrics.lcp,
        firstInputDelay: mobileMetrics.fid,
        cumulativeLayoutShift: mobileMetrics.cls
      },
      desktop: {
        performance: desktopMetrics.performance,
        accessibility: desktopMetrics.accessibility,
        bestPractices: desktopMetrics.bestPractices,
        seo: desktopMetrics.seo,
        firstContentfulPaint: desktopMetrics.fcp,
        largestContentfulPaint: desktopMetrics.lcp,
        firstInputDelay: desktopMetrics.fid,
        cumulativeLayoutShift: desktopMetrics.cls
      },
      overall: {
        performance: Math.round((mobileMetrics.performance + desktopMetrics.performance) / 2),
        accessibility: Math.round((mobileMetrics.accessibility + desktopMetrics.accessibility) / 2),
        bestPractices: Math.round((mobileMetrics.bestPractices + desktopMetrics.bestPractices) / 2),
        seo: Math.round((mobileMetrics.seo + desktopMetrics.seo) / 2)
      }
    };
  }

  /**
   * Extract metrics from PageSpeed API response
   */
  private static extractMetrics(data: any) {
    const lighthouseResult = data.lighthouseResult;
    const categories = lighthouseResult?.categories || {};
    const audits = lighthouseResult?.audits || {};

    return {
      performance: Math.round((categories.performance?.score || 0) * 100),
      accessibility: Math.round((categories.accessibility?.score || 0) * 100),
      bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
      seo: Math.round((categories.seo?.score || 0) * 100),
      fcp: this.extractTimeMetric(audits['first-contentful-paint']),
      lcp: this.extractTimeMetric(audits['largest-contentful-paint']),
      fid: this.extractTimeMetric(audits['max-potential-fid']),
      cls: this.extractCLSMetric(audits['cumulative-layout-shift'])
    };
  }

  /**
   * Extract time metric from audit
   */
  private static extractTimeMetric(audit: any): number {
    if (!audit || !audit.numericValue) return 0;
    return Math.round(audit.numericValue / 1000); // Convert from milliseconds to seconds
  }

  /**
   * Extract CLS metric from audit
   */
  private static extractCLSMetric(audit: any): number {
    if (!audit || !audit.numericValue) return 0;
    return Math.round(audit.numericValue * 1000) / 1000; // Keep 3 decimal places
  }

  /**
   * Generate recommendations based on metrics
   */
  private static generateRecommendations(mobileMetrics: any, desktopMetrics: any): string[] {
    const recommendations = [];
    
    // Performance recommendations
    if (mobileMetrics.performance < 70 || desktopMetrics.performance < 70) {
      recommendations.push('Optimize images and reduce JavaScript bundle size');
    }
    
    if (mobileMetrics.lcp > 2.5 || desktopMetrics.lcp > 2.5) {
      recommendations.push('Improve Largest Contentful Paint by optimizing above-the-fold content');
    }
    
    if (mobileMetrics.cls > 0.1 || desktopMetrics.cls > 0.1) {
      recommendations.push('Reduce Cumulative Layout Shift by setting explicit dimensions for images and ads');
    }
    
    // Accessibility recommendations
    if (mobileMetrics.accessibility < 80 || desktopMetrics.accessibility < 80) {
      recommendations.push('Improve accessibility by adding alt text and proper ARIA labels');
    }
    
    // Best practices recommendations
    if (mobileMetrics.bestPractices < 80 || desktopMetrics.bestPractices < 80) {
      recommendations.push('Follow web development best practices and security guidelines');
    }
    
    // SEO recommendations
    if (mobileMetrics.seo < 80 || desktopMetrics.seo < 80) {
      recommendations.push('Optimize meta tags, headings, and content structure for better SEO');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Great job! Your site is performing well across all metrics');
    }
    
    return recommendations;
  }


}

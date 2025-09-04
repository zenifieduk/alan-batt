/**
 * CSV Processor for Facebook and Instagram Exported Data
 * Handles the CSV files exported from Business Suite
 */

export interface CSVData {
  headers: string[];
  rows: Array<Record<string, string | number>>;
  metadata: {
    source: 'facebook' | 'instagram';
    dateRange: string;
    totalRows: number;
    metricType: string;
  };
}

export interface ProcessedMetrics {
  // Page Performance
  pageLikes?: number;
  pageFollowers?: number;
  pageReach?: number;
  pageImpressions?: number;
  pageEngagement?: number;
  
  // Content Performance
  totalPosts?: number;
  averageEngagement?: number;
  topPosts?: Array<{
    message: string;
    engagement: number;
    reach: number;
    type: string;
  }>;
  
  // Audience Insights
  audienceSize?: number;
  audienceGrowth?: number;
  
  // Engagement Trends - Updated to match dashboard expectations
  dailyMetrics?: Array<{
    date: string;
    views: number;
    follows: number;
    reach: number;
    interactions: number;
    visits: number;
    linkClicks: number;
  }>;
  
  lastUpdated: string;
}

export class CSVProcessor {
  /**
   * Process CSV content and extract data
   */
  static processCSV(csvContent: string, source: 'facebook' | 'instagram', filename: string): CSVData {
    try {
      // Remove UTF-16 BOM if present
      let cleanContent = csvContent;
      if (csvContent.charCodeAt(0) === 0xFEFF) {
        cleanContent = csvContent.slice(1);
      }
      
      const lines = cleanContent.trim().split('\n');
      
      // Handle Business Suite format with sep=, header
      let startIndex = 0;
      if (lines[0].startsWith('sep=')) {
        startIndex = 1;
      }
      
      // Extract metric type from filename or content
      const metricType = this.extractMetricType(filename, lines[startIndex]);
      
      // The actual headers are on the line after the metric type
      const headerIndex = startIndex + 1;
      const headers = this.parseCSVLine(lines[headerIndex]);
      
              // The data rows start after the headers
        const rows = lines.slice(headerIndex + 1).map(line => {
          const values = this.parseCSVLine(line);
          const row: Record<string, string | number> = {};
          headers.forEach((header, index) => {
            const value = values[index];
            // Don't convert date columns to numbers
            if (header.toLowerCase().includes('date')) {
              row[header] = value;
            } else {
              // Try to convert to number if possible
              const numValue = parseFloat(value);
              row[header] = isNaN(numValue) ? value : numValue;
            }
          });
          return row;
        });

      return {
        headers,
        rows,
        metadata: {
          source,
          dateRange: this.extractDateRange(rows),
          totalRows: rows.length,
          metricType
        }
      };
    } catch (error) {
      console.error('Error processing CSV:', error);
      throw new Error('Failed to process CSV file');
    }
  }

  /**
   * Parse a CSV line, handling quoted values properly
   */
  private static parseCSVLine(line: string): string[] {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim().replace(/^"|"$/g, ''));
        current = '';
      } else {
        current += char;
      }
    }
    
    // Add the last value
    result.push(current.trim().replace(/^"|"$/g, ''));
    
    return result;
  }

  /**
   * Extract metric type from filename or content
   */
  private static extractMetricType(filename: string, firstLine: string): string {
    const filenameLower = filename.toLowerCase();
    
    if (filenameLower.includes('views')) return 'Views';
    if (filenameLower.includes('follows')) return 'Follows';
    if (filenameLower.includes('reach')) return 'Reach';
    if (filenameLower.includes('interactions')) return 'Interactions';
    if (filenameLower.includes('visits')) return 'Visits';
    if (filenameLower.includes('link clicks')) return 'Link Clicks';
    
    // Try to extract from first line content
    if (firstLine.includes('Views')) return 'Views';
    if (firstLine.includes('follows')) return 'Follows';
    if (firstLine.includes('Reach')) return 'Reach';
    if (firstLine.includes('Interactions')) return 'Interactions';
    if (firstLine.includes('Visits')) return 'Visits';
    if (firstLine.includes('Link clicks')) return 'Link Clicks';
    
    return 'Unknown';
  }

  /**
   * Extract metrics from processed CSV data
   */
  static extractMetrics(csvData: CSVData): ProcessedMetrics {
    const metrics: ProcessedMetrics = {
      lastUpdated: new Date().toISOString()
    };

    if (csvData.metadata.source === 'facebook') {
      return this.extractFacebookMetrics(csvData);
    } else if (csvData.metadata.source === 'instagram') {
      return this.extractInstagramMetrics(csvData);
    }

    return metrics;
  }

  /**
   * Extract Facebook-specific metrics
   */
  private static extractFacebookMetrics(csvData: CSVData): ProcessedMetrics {
    const metrics: ProcessedMetrics = {
      lastUpdated: new Date().toISOString()
    };

    // Find relevant columns
    const headers = csvData.headers;
    const rows = csvData.rows;

    // Get latest values (usually last row)
    if (rows.length > 0) {
      // Calculate the sum of all values instead of just taking the last row
      const dateCol = headers.find(h => h.toLowerCase().includes('date'));
      const primaryCol = headers.find(h => h.toLowerCase().includes('primary'));
      
      if (dateCol && primaryCol) {
        let totalValue = 0;
        rows.forEach(row => {
          if (row[dateCol] && row[primaryCol]) {
            totalValue += Number(row[primaryCol]) || 0;
          }
        });
        
        // Extract based on metric type
        switch (csvData.metadata.metricType) {
          case 'Views':
            metrics.pageImpressions = totalValue;
            break;
          case 'Follows':
            metrics.pageFollowers = totalValue;
            break;
          case 'Reach':
            metrics.pageReach = totalValue;
            break;
          case 'Interactions':
            metrics.pageEngagement = totalValue;
            break;
          case 'Visits':
            metrics.pageImpressions = totalValue;
            break;
          case 'Link Clicks':
            metrics.pageImpressions = totalValue;
            break;
        }
      }
    }

    // Extract daily metrics if date column exists
    const dateCol = headers.find(h => h.toLowerCase().includes('date'));
    const primaryCol = headers.find(h => h.toLowerCase().includes('primary'));
    
    if (dateCol && primaryCol) {
      metrics.dailyMetrics = rows
        .filter(row => row[dateCol] && row[primaryCol])
        .map(row => {
          const date = String(row[dateCol]).split('T')[0]; // Extract just the date part
          const value = Number(row[primaryCol]) || 0;
          
          // Initialize with 0 values, will be populated from other files
          const dailyMetric = {
            date,
            views: 0,
            follows: 0,
            reach: 0,
            interactions: 0,
            visits: 0,
            linkClicks: 0
          };
          
          // Set the appropriate metric based on type
          switch (csvData.metadata.metricType) {
            case 'Views':
              dailyMetric.views = value;
              break;
            case 'Follows':
              dailyMetric.follows = value;
              break;
            case 'Reach':
              dailyMetric.reach = value;
              break;
            case 'Interactions':
              dailyMetric.interactions = value;
              break;
            case 'Visits':
              dailyMetric.visits = value;
              break;
            case 'Link Clicks':
              dailyMetric.linkClicks = value;
              break;
          }
          
          return dailyMetric;
        })
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    return metrics;
  }

  /**
   * Extract Instagram-specific metrics
   */
  private static extractInstagramMetrics(csvData: CSVData): ProcessedMetrics {
    const metrics: ProcessedMetrics = {
      lastUpdated: new Date().toISOString()
    };

    // Find relevant columns
    const headers = csvData.headers;
    const rows = csvData.rows;

    // Get latest values
    if (rows.length > 0) {
      // Calculate the sum of all values instead of just taking the last row
      const dateCol = headers.find(h => h.toLowerCase().includes('date'));
      const primaryCol = headers.find(h => h.toLowerCase().includes('primary'));
      
      if (dateCol && primaryCol) {
        let totalValue = 0;
        rows.forEach(row => {
          if (row[dateCol] && row[primaryCol]) {
            totalValue += Number(row[primaryCol]) || 0;
          }
        });
        
        // Extract based on metric type
        switch (csvData.metadata.metricType) {
          case 'Views':
            metrics.pageImpressions = totalValue;
            break;
          case 'Follows':
            metrics.audienceSize = totalValue;
            break;
          case 'Reach':
            metrics.pageReach = totalValue;
            break;
          case 'Interactions':
            metrics.pageEngagement = totalValue;
            break;
          case 'Visits':
            metrics.pageImpressions = totalValue;
            break;
          case 'Link Clicks':
            metrics.pageImpressions = totalValue;
            break;
        }
      }
    }

    // Extract daily metrics if date column exists
    const dateCol = headers.find(h => h.toLowerCase().includes('date'));
    const primaryCol = headers.find(h => h.toLowerCase().includes('primary'));
    
    if (dateCol && primaryCol) {
      metrics.dailyMetrics = rows
        .filter(row => row[dateCol] && row[primaryCol])
        .map(row => {
          const date = String(row[dateCol]).split('T')[0];
          const value = Number(row[primaryCol]) || 0;
          
          // Initialize with 0 values, will be populated from other files
          const dailyMetric = {
            date,
            views: 0,
            follows: 0,
            reach: 0,
            interactions: 0,
            visits: 0,
            linkClicks: 0
          };
          
          // Set the appropriate metric based on type
          switch (csvData.metadata.metricType) {
            case 'Views':
              dailyMetric.views = value;
              break;
            case 'Follows':
              dailyMetric.follows = value;
              break;
            case 'Reach':
              dailyMetric.reach = value;
              break;
            case 'Interactions':
              dailyMetric.interactions = value;
              break;
            case 'Visits':
              dailyMetric.visits = value;
              break;
            case 'Link Clicks':
              dailyMetric.linkClicks = value;
              break;
          }
          
          return dailyMetric;
        })
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    return metrics;
  }

  /**
   * Extract date range from CSV data
   */
  private static extractDateRange(rows: Array<Record<string, string | number>>): string {
    const dateCol = Object.keys(rows[0] || {}).find(key => 
      key.toLowerCase().includes('date') || key.toLowerCase().includes('time')
    );

    if (!dateCol || rows.length === 0) {
      return 'Unknown date range';
    }

    const dates = rows
      .map(row => row[dateCol])
      .filter(date => date)
      .map(date => new Date(String(date)))
      .filter(date => !isNaN(date.getTime()));

    if (dates.length === 0) {
      return 'Unknown date range';
    }

    const startDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const endDate = new Date(Math.max(...dates.map(d => d.getTime())));

    return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
  }

  /**
   * Validate CSV structure
   */
  static validateCSV(csvContent: string): boolean {
    try {
      const lines = csvContent.trim().split('\n');
      if (lines.length < 2) return false;
      
      // Handle Business Suite format
      let startIndex = 0;
      if (lines[0].startsWith('sep=')) {
        startIndex = 1;
      }
      
      const headers = this.parseCSVLine(lines[startIndex]);
      const hasDate = headers.some(h => h.toLowerCase().includes('date'));
      const hasPrimary = headers.some(h => h.toLowerCase().includes('primary'));
      
      return hasDate && hasPrimary;
    } catch {
      return false;
    }
  }

  /**
   * Get CSV template for reference
   */
  static getCSVTemplate(source: 'facebook' | 'instagram'): string {
    if (source === 'facebook') {
      return `sep=,
"Views"
"Date","Primary"
"2025-06-05T00:00:00","46201"
"2025-06-06T00:00:00","37730"`;
    } else {
      return `sep=,
"Followers"
"Date","Primary"
"2025-06-05T00:00:00","500"
"2025-06-06T00:00:00","505"`;
    }
  }
}

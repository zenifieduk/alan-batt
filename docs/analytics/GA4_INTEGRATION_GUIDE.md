# Google Analytics 4 (GA4) Integration Guide for Next.js

## Complete Guide to GA4 API Integration with Next.js and TypeScript

This comprehensive guide covers everything you need to integrate Google Analytics 4 with a Next.js application, including API access, authentication, and building beautiful analytics dashboards.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [GA4 API Setup & Authentication](#ga4-api-setup--authentication)
3. [Available Data & API Endpoints](#available-data--api-endpoints)
4. [Next.js Implementation](#nextjs-implementation)
5. [TypeScript Types & Interfaces](#typescript-types--interfaces)
6. [Dashboard Components](#dashboard-components)
7. [Rate Limits & Best Practices](#rate-limits--best-practices)
8. [Deployment Considerations](#deployment-considerations)

## Prerequisites

### Required Dependencies

```bash
npm install @google-analytics/data googleapis next-auth
npm install -D @types/node
```

### GA4 Property Requirements

- Active Google Analytics 4 property
- Google Cloud Platform project
- Service Account with Analytics API access
- Editor access to the GA4 property

## GA4 API Setup & Authentication

### 1. Create Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create or select a project
3. Enable the Google Analytics Data API
4. Create a Service Account:
   - IAM & Admin → Service Accounts → Create Service Account
   - Download the JSON credentials file
5. Add Service Account to GA4:
   - In GA4, go to Admin → Account Access Management
   - Add the service account email with Viewer permissions

### 2. Environment Variables Setup

Create `.env.local`:

```bash
# GA4 Configuration
GA4_PROPERTY_ID=your-property-id
GOOGLE_APPLICATION_CREDENTIALS_BASE64=your-base64-encoded-json-credentials

# Optional: OAuth for client-side tracking
GOOGLE_CLIENT_ID=your-oauth-client-id
GOOGLE_CLIENT_SECRET=your-oauth-client-secret
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

### 3. Credential Encoding

Encode your service account JSON for deployment:

```bash
base64 -i path/to/your/service-account.json
```

## Available Data & API Endpoints

### Core Metrics Available

#### Traffic Metrics
- `activeUsers` - Active users
- `newUsers` - New users  
- `sessions` - Sessions
- `bounceRate` - Bounce rate
- `sessionDuration` - Average session duration
- `screenPageViews` - Page views

#### Engagement Metrics
- `userEngagementDuration` - User engagement duration
- `engagedSessions` - Engaged sessions
- `engagementRate` - Engagement rate
- `eventCount` - Total events

#### Conversion Metrics
- `conversions` - Goal conversions
- `totalRevenue` - Revenue
- `purchaseRevenue` - Purchase revenue
- `ecommercePurchases` - E-commerce purchases

### Core Dimensions Available

#### User Dimensions
- `country` - User country
- `city` - User city
- `deviceCategory` - Device type (mobile, desktop, tablet)
- `operatingSystem` - Operating system
- `browser` - Browser name

#### Content Dimensions
- `pagePath` - Page path
- `pageTitle` - Page title
- `landingPage` - Landing page
- `exitPage` - Exit page

#### Acquisition Dimensions
- `sessionSource` - Traffic source
- `sessionMedium` - Traffic medium
- `sessionCampaign` - Campaign name
- `firstUserSource` - First user source

#### Time Dimensions
- `date` - Date (YYYYMMDD)
- `hour` - Hour of day
- `dayOfWeek` - Day of week
- `week` - Week
- `month` - Month

### API Endpoints

#### 1. runReport (Core Reporting)
```typescript
const response = await analyticsDataClient.runReport({
  property: `properties/${propertyId}`,
  dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
  dimensions: [{ name: 'pagePath' }],
  metrics: [{ name: 'activeUsers' }],
});
```

#### 2. runRealtimeReport (Real-time Data)
```typescript
const response = await analyticsDataClient.runRealtimeReport({
  property: `properties/${propertyId}`,
  dimensions: [{ name: 'country' }],
  metrics: [{ name: 'activeUsers' }],
});
```

#### 3. batchRunReports (Multiple Reports)
```typescript
const response = await analyticsDataClient.batchRunReports({
  property: `properties/${propertyId}`,
  requests: [
    {
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'activeUsers' }],
    },
    {
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [{ name: 'sessions' }],
    }
  ],
});
```

#### 4. getMetadata (Available Dimensions & Metrics)
```typescript
const response = await analyticsDataClient.getMetadata({
  name: `properties/${propertyId}/metadata`,
});
```

## Next.js Implementation

### 1. Analytics Client Setup

```typescript
// src/lib/analytics/client.ts
import { BetaAnalyticsDataClient } from '@google-analytics/data';

let analyticsDataClient: BetaAnalyticsDataClient;

if (process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64) {
  const credentials = JSON.parse(
    Buffer.from(
      process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64,
      'base64'
    ).toString()
  );

  analyticsDataClient = new BetaAnalyticsDataClient({
    projectId: credentials.project_id,
    credentials: {
      client_email: credentials.client_email,
      private_key: credentials.private_key,
    },
  });
} else {
  throw new Error('Google Analytics credentials not configured');
}

export { analyticsDataClient };
```

### 2. API Route Examples

```typescript
// src/app/api/analytics/overview/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { analyticsDataClient } from '@/lib/analytics/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate') || '30daysAgo';
    const endDate = searchParams.get('endDate') || 'today';

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${process.env.GA4_PROPERTY_ID}`,
      dateRanges: [{ startDate, endDate }],
      dimensions: [
        { name: 'date' },
        { name: 'deviceCategory' },
      ],
      metrics: [
        { name: 'activeUsers' },
        { name: 'sessions' },
        { name: 'screenPageViews' },
        { name: 'bounceRate' },
      ],
    });

    return NextResponse.json({
      data: response.rows?.map(row => ({
        date: row.dimensionValues?.[0]?.value,
        deviceCategory: row.dimensionValues?.[1]?.value,
        activeUsers: parseInt(row.metricValues?.[0]?.value || '0'),
        sessions: parseInt(row.metricValues?.[1]?.value || '0'),
        pageViews: parseInt(row.metricValues?.[2]?.value || '0'),
        bounceRate: parseFloat(row.metricValues?.[3]?.value || '0'),
      })) || [],
      metadata: response.metadata,
    });
  } catch (error) {
    console.error('Analytics API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}
```

### 3. Real-time Data API

```typescript
// src/app/api/analytics/realtime/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { analyticsDataClient } from '@/lib/analytics/client';

export async function GET(request: NextRequest) {
  try {
    const [response] = await analyticsDataClient.runRealtimeReport({
      property: `properties/${process.env.GA4_PROPERTY_ID}`,
      dimensions: [
        { name: 'country' },
        { name: 'deviceCategory' },
      ],
      metrics: [
        { name: 'activeUsers' },
      ],
    });

    return NextResponse.json({
      data: response.rows?.map(row => ({
        country: row.dimensionValues?.[0]?.value,
        deviceCategory: row.dimensionValues?.[1]?.value,
        activeUsers: parseInt(row.metricValues?.[0]?.value || '0'),
      })) || [],
      totalUsers: response.totals?.[0]?.metricValues?.[0]?.value || '0',
    });
  } catch (error) {
    console.error('Real-time Analytics Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch real-time data' },
      { status: 500 }
    );
  }
}
```

## Rate Limits & Best Practices

### 2025 GA4 API Quotas

#### Daily Limits
- **Core Requests**: 25,000 tokens per day per property
- **Realtime Requests**: 10,000 tokens per day per property
- **Concurrent Requests**: 10 simultaneous requests

#### Token Consumption
- Simple requests: 1-5 tokens
- Complex requests: 10+ tokens
- Factors affecting tokens:
  - Number of dimensions/metrics
  - Date range size
  - Filter complexity

### Best Practices for Quota Management

#### 1. Implement Caching
```typescript
// src/lib/analytics/cache.ts
import { unstable_cache } from 'next/cache';

export const getCachedAnalyticsData = unstable_cache(
  async (startDate: string, endDate: string) => {
    // Your analytics API call here
    return await fetchAnalyticsData(startDate, endDate);
  },
  ['analytics-data'],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ['analytics'],
  }
);
```

#### 2. Batch Requests
```typescript
// Combine multiple requests into one
const batchResponse = await analyticsDataClient.batchRunReports({
  property: `properties/${propertyId}`,
  requests: [
    // Traffic overview
    {
      dateRanges: [{ startDate, endDate }],
      metrics: [{ name: 'activeUsers' }, { name: 'sessions' }],
    },
    // Device breakdown
    {
      dateRanges: [{ startDate, endDate }],
      dimensions: [{ name: 'deviceCategory' }],
      metrics: [{ name: 'sessions' }],
    },
  ],
});
```

#### 3. Request Optimization
```typescript
// Use minimal date ranges and combine dimensions
const optimizedRequest = {
  property: `properties/${propertyId}`,
  dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }], // Shorter range
  dimensions: [
    { name: 'date' },
    { name: 'deviceCategory' }, // Combine related dimensions
  ],
  metrics: [
    { name: 'activeUsers' },
    { name: 'sessions' },
  ],
  limit: 100, // Limit results
};
```

#### 4. Error Handling & Retry Logic
```typescript
async function makeAnalyticsRequest(requestConfig: any, retries = 3): Promise<any> {
  try {
    const [response] = await analyticsDataClient.runReport(requestConfig);
    return response;
  } catch (error: any) {
    if (error.code === 429 && retries > 0) {
      // Rate limit hit, wait and retry
      const delay = Math.pow(2, 3 - retries) * 1000; // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, delay));
      return makeAnalyticsRequest(requestConfig, retries - 1);
    }
    throw error;
  }
}
```

## Deployment Considerations

### Vercel Deployment
1. Add environment variables to Vercel dashboard
2. Ensure base64 encoding is preserved
3. Use Edge Runtime for better performance:

```typescript
export const runtime = 'edge';
```

### Security Best Practices
1. Never commit credentials to version control
2. Use environment variables for all sensitive data
3. Implement API route protection:

```typescript
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  // Analytics logic here
}
```

### Performance Optimization
1. Implement proper caching strategies
2. Use React Query for client-side data management
3. Consider server-side rendering for critical metrics
4. Implement pagination for large datasets

## Troubleshooting

### Common Issues

1. **403 Forbidden**: Service account not added to GA4 property
2. **400 Bad Request**: Invalid dimension/metric combinations
3. **429 Too Many Requests**: Quota limits exceeded
4. **Invalid Credentials**: Base64 encoding issues

### Debug Mode
```typescript
const analyticsDataClient = new BetaAnalyticsDataClient({
  projectId: credentials.project_id,
  credentials: {
    client_email: credentials.client_email,
    private_key: credentials.private_key,
  },
  // Enable debug mode
  libName: 'gax',
  libVersion: '1.0.0',
});
```

## Advanced Features

### Custom Events Tracking
```typescript
// Client-side event tracking
import { gtag } from 'ga-gtag';

gtag('event', 'purchase', {
  transaction_id: 'T_12345',
  value: 25.42,
  currency: 'USD',
  items: [{
    item_id: 'SKU_12345',
    item_name: 'Product Name',
    quantity: 1,
  }],
});
```

### Cohort Analysis
```typescript
const cohortResponse = await analyticsDataClient.runReport({
  property: `properties/${propertyId}`,
  dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
  dimensions: [
    { name: 'cohort' },
    { name: 'cohortNthDay' },
  ],
  metrics: [{ name: 'cohortActiveUsers' }],
});
```

This guide provides a complete foundation for integrating GA4 with Next.js applications. The implementation follows 2025 best practices and addresses the latest API limitations and quota restrictions.
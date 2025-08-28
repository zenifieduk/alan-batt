# GA4 Setup Guide: Step-by-Step Implementation

This guide provides complete setup instructions for integrating Google Analytics 4 with your Next.js application.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Google Cloud & GA4 Setup](#google-cloud--ga4-setup)
3. [Service Account Configuration](#service-account-configuration)
4. [Next.js Project Setup](#nextjs-project-setup)
5. [Environment Configuration](#environment-configuration)
6. [Testing Your Setup](#testing-your-setup)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

Before starting, ensure you have:

- [ ] Google Analytics 4 property set up
- [ ] Google Cloud Platform account
- [ ] Next.js 13+ project
- [ ] Node.js 18+ installed
- [ ] Editor access to your GA4 property

## Google Cloud & GA4 Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Enter project name: `your-app-analytics`
4. Click "Create"

### Step 2: Enable Google Analytics Data API

1. In your Google Cloud project, go to "APIs & Services" → "Library"
2. Search for "Google Analytics Data API"
3. Click on it and press "Enable"
4. Wait for the API to be enabled

### Step 3: Get Your GA4 Property ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your GA4 property
3. Go to Admin → Property Settings
4. Copy your Property ID (format: 123456789)

## Service Account Configuration

### Step 1: Create Service Account

1. In Google Cloud Console, go to "IAM & Admin" → "Service Accounts"
2. Click "Create Service Account"
3. Fill in details:
   - **Service account name**: `ga4-analytics-reader`
   - **Service account ID**: `ga4-analytics-reader`
   - **Description**: `Service account for GA4 API access`
4. Click "Create and Continue"

### Step 2: Download Credentials

1. In the service accounts list, click on your new service account
2. Go to "Keys" tab
3. Click "Add Key" → "Create new key"
4. Choose "JSON" format
5. Click "Create" - this downloads your credentials file
6. **Important**: Keep this file secure and never commit to version control

### Step 3: Add Service Account to GA4

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your GA4 property
3. Go to Admin → Account Access Management
4. Click the "+" button → "Add users"
5. Enter your service account email (from the JSON file)
6. Select "Viewer" permissions
7. Click "Add"

## Next.js Project Setup

### Step 1: Install Dependencies

```bash
npm install @google-analytics/data googleapis
npm install -D @types/node
```

### Step 2: Create Directory Structure

```bash
mkdir -p src/lib/analytics src/types examples/ga4 docs/analytics
```

### Step 3: Set Up Types

Copy the TypeScript types from `/src/types/analytics.ts` (already provided in the guide).

### Step 4: Create GA4 Client

Copy the GA4 client from `/src/lib/analytics/ga4-client.ts` (already provided in the guide).

### Step 5: Set Up API Routes

Create the following API routes in your `src/app/api/analytics/` directory:

```
src/app/api/analytics/
├── overview/
│   └── route.ts
├── traffic/
│   └── route.ts
├── realtime/
│   └── route.ts
├── pages/
│   └── route.ts
├── sources/
│   └── route.ts
├── devices/
│   └── route.ts
├── demographics/
│   └── route.ts
└── dashboard/
    └── route.ts
```

Use the examples from `/examples/ga4/api-routes.ts` as templates.

## Environment Configuration

### Step 1: Prepare Credentials

1. Take your downloaded JSON credentials file
2. Base64 encode it:

```bash
# On macOS/Linux:
base64 -i path/to/your/service-account.json

# On Windows:
certutil -encode path/to/your/service-account.json temp.b64 && findstr /v /c:- temp.b64
```

### Step 2: Set Environment Variables

Create `.env.local`:

```bash
# GA4 Configuration
GA4_PROPERTY_ID=your-property-id-here
GOOGLE_APPLICATION_CREDENTIALS_BASE64=your-base64-encoded-json-here

# Optional: For OAuth (client-side tracking)
GOOGLE_CLIENT_ID=your-oauth-client-id
GOOGLE_CLIENT_SECRET=your-oauth-client-secret
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

### Step 3: Update .gitignore

Ensure your `.gitignore` includes:

```
# Environment files
.env
.env.local
.env.production

# Service account keys
*service-account*.json
*credentials*.json
```

## Testing Your Setup

### Step 1: Test API Connection

Create a test page `src/app/test-analytics/page.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';

export default function TestAnalytics() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/analytics/overview?startDate=7daysAgo&endDate=today')
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error);
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Analytics Test</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

### Step 2: Run Development Server

```bash
npm run dev
```

### Step 3: Visit Test Page

Go to `http://localhost:3000/test-analytics`

**Expected Results:**
- ✅ Data loads successfully with metrics
- ❌ Error messages indicate configuration issues

### Step 4: Common Test Issues

**403 Forbidden Error:**
- Service account not added to GA4 property
- Wrong property ID in environment variables

**401 Unauthorized:**
- Invalid credentials
- Base64 encoding issues

**400 Bad Request:**
- Invalid date formats
- Incompatible dimension/metric combinations

## Deployment

### Vercel Deployment

1. **Add Environment Variables:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all variables from your `.env.local`
   - Ensure base64 strings are properly copied

2. **Deploy:**
   ```bash
   vercel --prod
   ```

3. **Verify:**
   - Visit your deployed analytics endpoints
   - Check Vercel logs for any errors

### Other Platforms

**Netlify:**
- Add environment variables in Site Settings → Environment Variables

**Railway:**
- Add variables in Dashboard → Variables tab

**DigitalOcean App Platform:**
- Configure in App Spec → Environment Variables

## Advanced Configuration

### Rate Limit Management

Create `src/lib/analytics/rate-limiter.ts`:

```typescript
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private limits = {
    perHour: 25000,
    perDay: 50000,
    concurrent: 10,
  };

  canMakeRequest(key: string = 'default'): boolean {
    const now = Date.now();
    const hourAgo = now - 60 * 60 * 1000;
    
    if (!this.requests.has(key)) {
      this.requests.set(key, []);
    }
    
    const keyRequests = this.requests.get(key)!;
    const recentRequests = keyRequests.filter(time => time > hourAgo);
    
    return recentRequests.length < this.limits.perHour;
  }

  recordRequest(key: string = 'default'): void {
    const now = Date.now();
    if (!this.requests.has(key)) {
      this.requests.set(key, []);
    }
    this.requests.get(key)!.push(now);
  }
}

export const rateLimiter = new RateLimiter();
```

### Caching Strategy

Update your API routes with caching:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';

const getCachedAnalytics = unstable_cache(
  async (startDate: string, endDate: string) => {
    return await getOverviewMetrics(startDate, endDate);
  },
  ['analytics-overview'],
  {
    revalidate: 3600, // 1 hour
    tags: ['analytics'],
  }
);

export async function GET(request: NextRequest) {
  // Use cached version for better performance
  const data = await getCachedAnalytics(startDate, endDate);
  return NextResponse.json({ success: true, data });
}
```

## Troubleshooting

### Common Issues & Solutions

#### Issue: "Property not found" Error

**Solution:**
1. Verify GA4_PROPERTY_ID is correct (numbers only)
2. Ensure service account has access to the property
3. Check that it's a GA4 property, not Universal Analytics

#### Issue: Base64 Encoding Problems

**Solution:**
```bash
# Ensure no line breaks in the base64 string
base64 -w 0 service-account.json > credentials.b64

# Or use online tools like base64encode.org
```

#### Issue: Rate Limit Exceeded

**Solution:**
1. Implement caching (shown above)
2. Reduce API call frequency
3. Use batch requests where possible
4. Consider upgrading to GA4 360

#### Issue: CORS Errors in Development

**Solution:**
Add to `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/analytics/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### Debug Mode

Enable debug logging in your GA4 client:

```typescript
// In ga4-client.ts
const analyticsDataClient = new BetaAnalyticsDataClient({
  projectId: credentials.project_id,
  credentials: {
    client_email: credentials.client_email,
    private_key: credentials.private_key,
  },
  // Add debug configuration
  libName: 'nextjs-ga4-dashboard',
  libVersion: '1.0.0',
});

// Add request logging
console.log('Making GA4 API request:', {
  property: `properties/${propertyId}`,
  dateRanges: [{ startDate, endDate }],
  // ... other request details
});
```

### Performance Optimization

1. **Implement Request Batching:**
   ```typescript
   const batchRequests = await analyticsDataClient.batchRunReports({
     property: `properties/${propertyId}`,
     requests: [
       // Multiple requests in one call
     ],
   });
   ```

2. **Use Server-Side Caching:**
   ```typescript
   import { Redis } from '@upstash/redis';
   
   const redis = new Redis({
     url: process.env.UPSTASH_REDIS_REST_URL,
     token: process.env.UPSTASH_REDIS_REST_TOKEN,
   });
   
   // Cache analytics data
   await redis.setex(`analytics:${key}`, 3600, JSON.stringify(data));
   ```

3. **Implement Progressive Loading:**
   - Load overview metrics first
   - Load detailed charts asynchronously
   - Show loading states for better UX

## Support & Resources

### Documentation Links
- [GA4 Data API Documentation](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Google Cloud Console](https://console.cloud.google.com/)

### Community Resources
- [GA4 API Community Forum](https://support.google.com/analytics/community)
- [Next.js Discord](https://discord.com/invite/bUG2bvbtHy)
- [Stack Overflow - ga4-api tag](https://stackoverflow.com/questions/tagged/ga4-api)

### Monitoring & Alerts

Set up monitoring for your analytics API:

1. **Vercel Analytics** (for Vercel deployments)
2. **Google Cloud Monitoring** (for API quota usage)
3. **Custom monitoring** with services like DataDog or New Relic

This completes your GA4 integration setup. Your analytics dashboard should now be fully functional with real-time data from Google Analytics 4.
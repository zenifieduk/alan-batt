import { SEOMetrics } from '@/types/seo';

interface SEOOverviewCardsProps {
  seoData: SEOMetrics;
}

export function SEOOverviewCards({ seoData }: SEOOverviewCardsProps) {
  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Search Console Overview */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Search Console</h3>
          <span className="text-2xl"></span>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Clicks</span>
            <span className="font-semibold text-slate-900">{seoData.searchConsole.clicks.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Impressions</span>
            <span className="font-semibold text-slate-900">{seoData.searchConsole.impressions.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">CTR</span>
            <span className="font-semibold text-slate-900">{seoData.searchConsole.ctr}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Avg Position</span>
            <span className="font-semibold text-slate-900">{seoData.searchConsole.averagePosition}</span>
          </div>
        </div>
      </div>

      {/* Page Speed Overview */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Page Speed</h3>
          <span className="text-2xl"></span>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Performance</span>
            <span className={`font-semibold ${getPerformanceColor(seoData.pageSpeed.overall.performance)}`}>
              {seoData.pageSpeed.overall.performance}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Accessibility</span>
            <span className={`font-semibold ${getPerformanceColor(seoData.pageSpeed.overall.accessibility)}`}>
              {seoData.pageSpeed.overall.accessibility}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Best Practices</span>
            <span className={`font-semibold ${getPerformanceColor(seoData.pageSpeed.overall.bestPractices)}`}>
              {seoData.pageSpeed.overall.bestPractices}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">SEO Score</span>
            <span className={`font-semibold ${getPerformanceColor(seoData.pageSpeed.overall.seo)}`}>
              {seoData.pageSpeed.overall.seo}
            </span>
          </div>
        </div>
      </div>

      {/* Technical SEO Overview */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Technical SEO</h3>
          <span className="text-2xl"></span>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Indexed Pages</span>
            <span className="font-semibold text-slate-900">
              {seoData.technical.crawlability.indexedPages}/{seoData.technical.crawlability.totalPages}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Structured Data</span>
            <span className="font-semibold text-slate-900">
              {seoData.technical.structuredData.validSchemas}/{seoData.technical.structuredData.totalSchemas}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Images w/o Alt</span>
            <span className="font-semibold text-slate-900">{seoData.technical.images.imagesWithoutAlt}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Broken Links</span>
            <span className="font-semibold text-slate-900">{seoData.technical.links.brokenLinks}</span>
          </div>
        </div>
      </div>

      {/* Keywords Overview */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Keywords</h3>
          <span className="text-2xl"></span>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Total Keywords</span>
            <span className="font-semibold text-slate-900">{seoData.keywords.totalKeywords}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Top 3 Positions</span>
            <span className="font-semibold text-slate-900">
              {seoData.keywords.rankingKeywords.filter(k => k.position <= 3).length}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Top 10 Positions</span>
            <span className="font-semibold text-slate-900">
              {seoData.keywords.rankingKeywords.filter(k => k.position <= 10).length}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Keyword Gaps</span>
            <span className="font-semibold text-slate-900">{seoData.keywords.keywordGaps.length}</span>
          </div>
        </div>
      </div>

      {/* Backlinks Overview */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Backlinks</h3>
          <span className="text-2xl"></span>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Total Backlinks</span>
            <span className="font-semibold text-slate-900">{seoData.backlinks.totalBacklinks.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Referring Domains</span>
            <span className="font-semibold text-slate-900">{seoData.backlinks.referringDomains}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Domain Authority</span>
            <span className="font-semibold text-slate-900">{seoData.backlinks.domainAuthority}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Spam Score</span>
            <span className="font-semibold text-slate-900">{seoData.backlinks.spamScore}</span>
          </div>
        </div>
      </div>

      {/* Core Web Vitals */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Core Web Vitals</h3>
          <span className="text-2xl"></span>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">FCP (Mobile)</span>
            <span className="font-semibold text-slate-900">{seoData.pageSpeed.mobile.firstContentfulPaint}s</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">LCP (Mobile)</span>
            <span className="font-semibold text-slate-900">{seoData.pageSpeed.mobile.largestContentfulPaint}s</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">FID (Mobile)</span>
            <span className="font-semibold text-slate-900">{seoData.pageSpeed.mobile.firstInputDelay}s</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">CLS (Mobile)</span>
            <span className="font-semibold text-slate-900">{seoData.pageSpeed.mobile.cumulativeLayoutShift}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

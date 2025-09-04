import { TechnicalSEOData } from '@/types/seo';

interface TechnicalSEOWidgetProps {
  data: TechnicalSEOData;
}

export function TechnicalSEOWidget({ data }: TechnicalSEOWidgetProps) {
  const getStatusColor = (issues: number) => {
    if (issues === 0) return 'text-green-600';
    if (issues <= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBgColor = (issues: number) => {
    if (issues === 0) return 'bg-green-100';
    if (issues <= 5) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getStatusIcon = (issues: number) => {
    if (issues === 0) return '✅';
    if (issues <= 5) return '⚠️';
    return '❌';
  };

  return (
    <div className="space-y-8">
      {/* Crawlability Overview */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Crawlability & Indexing</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{data.crawlability.totalPages}</div>
            <div className="text-sm text-slate-600">Total Pages</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{data.crawlability.indexedPages}</div>
            <div className="text-sm text-slate-600">Indexed Pages</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{data.crawlability.blockedPages}</div>
            <div className="text-sm text-slate-600">Blocked Pages</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{data.crawlability.crawlErrors}</div>
            <div className="text-sm text-slate-600">Crawl Errors</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">Indexing Rate</span>
            <span className="text-sm text-slate-600">
              {((data.crawlability.indexedPages / data.crawlability.totalPages) * 100).toFixed(1)}%
            </span>
          </div>
          <div className="mt-2 w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(data.crawlability.indexedPages / data.crawlability.totalPages) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Structured Data */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Structured Data</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg">
            <div className="text-2xl font-bold text-indigo-600">{data.structuredData.totalSchemas}</div>
            <div className="text-sm text-slate-600">Total Schemas</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{data.structuredData.validSchemas}</div>
            <div className="text-sm text-slate-600">Valid Schemas</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{data.structuredData.errors}</div>
            <div className="text-sm text-slate-600">Schema Errors</div>
          </div>
        </div>

        {data.structuredData.warnings > 0 && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-yellow-600">⚠️</span>
              <span className="text-sm text-yellow-800">
                {data.structuredData.warnings} schema warnings detected
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Meta Tags */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Meta Tags & Content</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-md font-medium text-slate-700">Title Tags</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Title Issues</span>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBgColor(data.metaTags.titleIssues)} ${getStatusColor(data.metaTags.titleIssues)}`}>
                  {getStatusIcon(data.metaTags.titleIssues)} {data.metaTags.titleIssues}
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Duplicate Titles</span>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBgColor(data.metaTags.duplicateTitles)} ${getStatusColor(data.metaTags.duplicateTitles)}`}>
                  {getStatusIcon(data.metaTags.duplicateTitles)} {data.metaTags.duplicateTitles}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-md font-medium text-slate-700">Meta Descriptions</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Description Issues</span>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBgColor(data.metaTags.descriptionIssues)} ${getStatusColor(data.metaTags.descriptionIssues)}`}>
                  {getStatusIcon(data.metaTags.descriptionIssues)} {data.metaTags.descriptionIssues}
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Duplicate Descriptions</span>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBgColor(data.metaTags.duplicateDescriptions)} ${getStatusColor(data.metaTags.duplicateDescriptions)}`}>
                  {getStatusIcon(data.metaTags.duplicateDescriptions)} {data.metaTags.duplicateDescriptions}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Images & Links */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Images & Links</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Images */}
          <div>
            <h4 className="text-md font-medium text-slate-700 mb-4">Image Optimization</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Total Images</span>
                <span className="text-sm font-medium text-slate-900">{data.images.totalImages}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Missing Alt Text</span>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBgColor(data.images.imagesWithoutAlt)} ${getStatusColor(data.images.imagesWithoutAlt)}`}>
                  {getStatusIcon(data.images.imagesWithoutAlt)} {data.images.imagesWithoutAlt}
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Oversized Images</span>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBgColor(data.images.oversizedImages)} ${getStatusColor(data.images.oversizedImages)}`}>
                  {getStatusIcon(data.images.oversizedImages)} {data.images.oversizedImages}
                </div>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-md font-medium text-slate-700 mb-4">Link Structure</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Internal Links</span>
                <span className="text-sm font-medium text-slate-900">{data.links.internalLinks}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">External Links</span>
                <span className="text-sm font-medium text-slate-900">{data.links.externalLinks}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Broken Links</span>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBgColor(data.links.brokenLinks)} ${getStatusColor(data.links.brokenLinks)}`}>
                  {getStatusIcon(data.links.brokenLinks)} {data.links.brokenLinks}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical SEO Score */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Technical SEO Score</h3>
        
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600">
              {(() => {
                const totalIssues = data.crawlability.crawlErrors + data.structuredData.errors + 
                                   data.metaTags.titleIssues + data.metaTags.descriptionIssues + 
                                   data.images.imagesWithoutAlt + data.images.oversizedImages + 
                                   data.links.brokenLinks;
                const maxIssues = 50; // Arbitrary max score
                const score = Math.max(0, 100 - (totalIssues / maxIssues) * 100);
                return Math.round(score);
              })()}
            </div>
            <div className="text-sm text-slate-600">out of 100</div>
          </div>
          
          <div className="flex-1">
            <div className="text-sm text-slate-600 mb-2">Overall Technical Health</div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(() => {
                    const totalIssues = data.crawlability.crawlErrors + data.structuredData.errors + 
                                       data.metaTags.titleIssues + data.metaTags.descriptionIssues + 
                                       data.images.imagesWithoutAlt + data.images.oversizedImages + 
                                       data.links.brokenLinks;
                    const maxIssues = 50;
                    const score = Math.max(0, 100 - (totalIssues / maxIssues) * 100);
                    return score;
                  })()}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

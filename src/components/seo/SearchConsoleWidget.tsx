import { SearchConsoleData } from '@/types/seo';

interface SearchConsoleWidgetProps {
  data: SearchConsoleData;
}

export function SearchConsoleWidget({ data }: SearchConsoleWidgetProps) {
  const getCTRColor = (ctr: number) => {
    if (ctr >= 5) return 'text-green-600';
    if (ctr >= 2) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPositionColor = (position: number) => {
    if (position <= 3) return 'text-green-600';
    if (position <= 10) return 'text-yellow-600';
    if (position <= 20) return 'text-orange-600';
    return 'text-red-600';
  };

  const getPositionBgColor = (position: number) => {
    if (position <= 3) return 'bg-green-100';
    if (position <= 10) return 'bg-yellow-100';
    if (position <= 20) return 'bg-orange-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-8">
      {/* Performance Overview */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Search Performance Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{data.clicks.toLocaleString()}</div>
            <div className="text-sm text-slate-600">Total Clicks</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{data.impressions.toLocaleString()}</div>
            <div className="text-sm text-slate-600">Total Impressions</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <div className={`text-2xl font-bold ${getCTRColor(data.ctr)}`}>
              {data.ctr.toFixed(2)}%
            </div>
            <div className="text-sm text-slate-600">Click-Through Rate</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg">
            <div className={`text-2xl font-bold ${getPositionColor(data.averagePosition)}`}>
              {data.averagePosition.toFixed(1)}
            </div>
            <div className="text-sm text-slate-600">Average Position</div>
          </div>
        </div>

        {/* Performance Trends */}
        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Performance Score</span>
            <span className="text-sm text-slate-600">
              {((data.clicks / data.impressions) * 100).toFixed(1)}% engagement
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (data.clicks / data.impressions) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Top Performing Queries */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Top Performing Queries</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Query</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Clicks</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Impressions</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">CTR</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Position</th>
              </tr>
            </thead>
            <tbody>
              {data.topQueries.map((query, index) => (
                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-900">{query.query}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-slate-600">{query.clicks}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-slate-600">{query.impressions.toLocaleString()}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className={`text-sm font-medium ${getCTRColor(query.ctr)}`}>
                      {query.ctr.toFixed(2)}%
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${getPositionBgColor(query.position)} ${getPositionColor(query.position)}`}>
                      {query.position.toFixed(1)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Performing Pages */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Top Performing Pages</h3>
        
        <div className="space-y-4">
          {data.topPages.map((page, index) => (
            <div key={index} className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-slate-900 mb-2">{page.page}</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Clicks:</span>
                      <span className="ml-2 font-medium text-slate-900">{page.clicks}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Impressions:</span>
                      <span className="ml-2 font-medium text-slate-900">{page.impressions.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">CTR:</span>
                      <span className={`ml-2 font-medium ${getCTRColor(page.ctr)}`}>
                        {page.ctr.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getPositionBgColor(page.position)} ${getPositionColor(page.position)}`}>
                  Position {page.position.toFixed(1)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Device & Country Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Device Breakdown */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Device Performance</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium text-slate-700">Desktop</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-slate-900">{data.deviceBreakdown.desktop.clicks}</div>
                <div className="text-xs text-slate-500">{data.deviceBreakdown.desktop.ctr.toFixed(2)}% CTR</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium text-slate-700">Mobile</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-slate-900">{data.deviceBreakdown.mobile.clicks}</div>
                <div className="text-xs text-slate-500">{data.deviceBreakdown.mobile.ctr.toFixed(2)}% CTR</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="text-sm font-medium text-slate-700">Tablet</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-slate-900">{data.deviceBreakdown.tablet.clicks}</div>
                <div className="text-xs text-slate-500">{data.deviceBreakdown.tablet.ctr.toFixed(2)}% CTR</div>
              </div>
            </div>
          </div>
        </div>

        {/* Country Breakdown */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Top Countries</h3>
          
          <div className="space-y-3">
            {data.countryBreakdown.slice(0, 5).map((country, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm font-medium text-slate-700">{country.country}</span>
                <div className="text-right">
                  <div className="text-sm font-medium text-slate-900">{country.clicks}</div>
                  <div className="text-xs text-slate-500">{country.ctr.toFixed(2)}% CTR</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search Console Insights */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Search Console Insights</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="font-medium text-blue-800">Performance Highlights</span>
            </div>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• {data.totalQueries} unique queries tracked</li>
              <li>• {data.clicks.toLocaleString()} total clicks this period</li>
              <li>• {data.ctr.toFixed(2)}% overall click-through rate</li>
              <li>• Average position: {data.averagePosition.toFixed(1)}</li>
            </ul>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium text-green-800">Recommendations</span>
            </div>
            <ul className="text-sm text-green-700 space-y-1">
              {data.averagePosition > 10 && <li>• Focus on improving rankings for top queries</li>}
              {data.ctr < 3 && <li>• Optimize meta descriptions to improve CTR</li>}
              {data.deviceBreakdown.mobile.clicks > data.deviceBreakdown.desktop.clicks && <li>• Mobile-first optimization is working well</li>}
              <li>• Monitor featured snippet opportunities</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

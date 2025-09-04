import { PageSpeedData } from '@/types/seo';

interface PageSpeedWidgetProps {
  data: PageSpeedData;
}

export function PageSpeedWidget({ data }: PageSpeedWidgetProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 50) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const formatTime = (seconds: number) => {
    return `${seconds.toFixed(2)}s`;
  };

  return (
    <div className="space-y-8">
      {/* Overall Performance Score */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Page Speed Performance</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mobile Performance */}
          <div>
            <h4 className="text-md font-medium text-slate-700 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Mobile Performance
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Performance</span>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(data.mobile.performance)} ${getScoreColor(data.mobile.performance)}`}>
                  {data.mobile.performance}/100
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Accessibility</span>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(data.mobile.accessibility)} ${getScoreColor(data.mobile.accessibility)}`}>
                  {data.mobile.accessibility}/100
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Best Practices</span>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(data.mobile.bestPractices)} ${getScoreColor(data.mobile.bestPractices)}`}>
                  {data.mobile.bestPractices}/100
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">SEO</span>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(data.mobile.seo)} ${getScoreColor(data.mobile.seo)}`}>
                  {data.mobile.seo}/100
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Performance */}
          <div>
            <h4 className="text-md font-medium text-slate-700 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Desktop Performance
            </h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Performance</span>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(data.desktop.performance)} ${getScoreColor(data.desktop.performance)}`}>
                  {data.desktop.performance}/100
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Accessibility</span>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(data.desktop.accessibility)} ${getScoreColor(data.desktop.accessibility)}`}>
                  {data.desktop.accessibility}/100
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Best Practices</span>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(data.desktop.bestPractices)} ${getScoreColor(data.desktop.bestPractices)}`}>
                  {data.desktop.bestPractices}/100
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">SEO</span>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(data.desktop.seo)} ${getScoreColor(data.desktop.seo)}`}>
                  {data.desktop.seo}/100
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Web Vitals */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Core Web Vitals</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mobile Core Web Vitals */}
          <div>
            <h4 className="text-md font-medium text-slate-700 mb-4">Mobile</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">First Contentful Paint</span>
                <span className={`text-sm font-medium ${data.mobile.firstContentfulPaint <= 1.8 ? 'text-green-600' : data.mobile.firstContentfulPaint <= 3.0 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {formatTime(data.mobile.firstContentfulPaint)}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Largest Contentful Paint</span>
                <span className={`text-sm font-medium ${data.mobile.largestContentfulPaint <= 2.5 ? 'text-green-600' : data.mobile.largestContentfulPaint <= 4.0 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {formatTime(data.mobile.largestContentfulPaint)}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">First Input Delay</span>
                <span className={`text-sm font-medium ${data.mobile.firstInputDelay <= 0.1 ? 'text-green-600' : data.mobile.firstInputDelay <= 0.3 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {formatTime(data.mobile.firstInputDelay)}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Cumulative Layout Shift</span>
                <span className={`text-sm font-medium ${data.mobile.cumulativeLayoutShift <= 0.1 ? 'text-green-600' : data.mobile.cumulativeLayoutShift <= 0.25 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {data.mobile.cumulativeLayoutShift.toFixed(3)}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Core Web Vitals */}
          <div>
            <h4 className="text-md font-medium text-slate-700 mb-4">Desktop</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">First Contentful Paint</span>
                <span className={`text-sm font-medium ${data.desktop.firstContentfulPaint <= 1.8 ? 'text-green-600' : data.desktop.firstContentfulPaint <= 3.0 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {formatTime(data.desktop.firstContentfulPaint)}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Largest Contentful Paint</span>
                <span className={`text-sm font-medium ${data.desktop.largestContentfulPaint <= 2.5 ? 'text-green-600' : data.desktop.largestContentfulPaint <= 4.0 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {formatTime(data.desktop.largestContentfulPaint)}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">First Input Delay</span>
                <span className={`text-sm font-medium ${data.desktop.firstInputDelay <= 0.1 ? 'text-green-600' : data.desktop.firstInputDelay <= 0.3 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {formatTime(data.desktop.firstInputDelay)}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Cumulative Layout Shift</span>
                <span className={`text-sm font-medium ${data.desktop.cumulativeLayoutShift <= 0.1 ? 'text-green-600' : data.desktop.cumulativeLayoutShift <= 0.25 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {data.desktop.cumulativeLayoutShift.toFixed(3)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Performance Summary</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className={`text-2xl font-bold ${getScoreColor(data.overall.performance)}`}>
              {data.overall.performance}
            </div>
            <div className="text-sm text-slate-600">Performance</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <div className={`text-2xl font-bold ${getScoreColor(data.overall.accessibility)}`}>
              {data.overall.accessibility}
            </div>
            <div className="text-sm text-slate-600">Accessibility</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <div className={`text-2xl font-bold ${getScoreColor(data.overall.bestPractices)}`}>
              {data.overall.bestPractices}
            </div>
            <div className="text-sm text-slate-600">Best Practices</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg">
            <div className={`text-2xl font-bold ${getScoreColor(data.overall.seo)}`}>
              {data.overall.seo}
            </div>
            <div className="text-sm text-slate-600">SEO</div>
          </div>
        </div>
      </div>
    </div>
  );
}

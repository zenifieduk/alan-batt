import { KeywordData } from '@/types/seo';

interface KeywordsWidgetProps {
  data: KeywordData;
}

export function KeywordsWidget({ data }: KeywordsWidgetProps) {
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

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 30) return 'text-green-600';
    if (difficulty <= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return '↗️';
    if (change < 0) return '↘️';
    return '→';
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-slate-600';
  };

  const getOpportunityColor = (opportunity: string) => {
    switch (opportunity) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-red-600 bg-red-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  return (
    <div className="space-y-8">
      {/* Keyword Overview */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Keyword Rankings Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{data.totalKeywords}</div>
            <div className="text-sm text-slate-600">Total Keywords</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {data.rankingKeywords.filter(k => k.position <= 10).length}
            </div>
            <div className="text-sm text-slate-600">Top 10 Rankings</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {data.rankingKeywords.filter(k => k.position <= 3).length}
            </div>
            <div className="text-sm text-slate-600">Top 3 Rankings</div>
          </div>
        </div>
      </div>

      {/* Current Rankings */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Current Keyword Rankings</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Keyword</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Position</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Search Volume</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Difficulty</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Change</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">URL</th>
              </tr>
            </thead>
            <tbody>
              {data.rankingKeywords.map((keyword, index) => (
                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-900">{keyword.keyword}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${getPositionBgColor(keyword.position)} ${getPositionColor(keyword.position)}`}>
                      #{keyword.position}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-slate-600">{keyword.searchVolume.toLocaleString()}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className={`text-sm font-medium ${getDifficultyColor(keyword.difficulty)}`}>
                      {keyword.difficulty}/100
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className={`flex items-center gap-1 text-sm font-medium ${getChangeColor(keyword.change)}`}>
                      <span>{getChangeIcon(keyword.change)}</span>
                      {keyword.change > 0 ? `+${keyword.change}` : keyword.change}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-slate-600 max-w-xs truncate">
                      <a href={keyword.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                        {keyword.url}
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Keyword Gaps */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Keyword Opportunities</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.keywordGaps.map((gap, index) => (
            <div key={index} className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h4 className="font-medium text-slate-900 text-sm">{gap.keyword}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOpportunityColor(gap.opportunity)}`}>
                  {gap.opportunity.toUpperCase()}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Search Volume:</span>
                  <span className="font-medium text-slate-900">{gap.searchVolume.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Difficulty:</span>
                  <span className={`font-medium ${getDifficultyColor(gap.difficulty)}`}>
                    {gap.difficulty}/100
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competitor Analysis */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Competitor Keyword Analysis</h3>
        
        {data.competitorKeywords.map((competitor, index) => (
          <div key={index} className="mb-6 last:mb-0">
            <h4 className="font-medium text-slate-900 mb-4">{competitor.keyword}</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg text-center">
                <div className="text-lg font-bold text-blue-600">#{competitor.ourPosition}</div>
                <div className="text-xs text-slate-600">Our Position</div>
              </div>
              
              {competitor.competitorPositions.map((comp, compIndex) => (
                <div key={compIndex} className="p-3 bg-slate-50 rounded-lg text-center">
                  <div className="text-lg font-bold text-slate-600">#{comp.position}</div>
                  <div className="text-xs text-slate-600">{comp.competitor}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Keyword Performance Chart */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Keyword Performance Trends</h3>
        
        <div className="space-y-4">
          {data.rankingKeywords.slice(0, 5).map((keyword, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-32 text-sm text-slate-600 truncate">{keyword.keyword}</div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-500">Position #{keyword.position}</span>
                  <span className="text-xs text-slate-500">{keyword.searchVolume.toLocaleString()} searches</span>
                </div>
                
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.max(0, 100 - (keyword.position / 20) * 100)}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              <div className={`text-sm font-medium ${getChangeColor(keyword.change)}`}>
                {getChangeIcon(keyword.change)} {keyword.change > 0 ? `+${keyword.change}` : keyword.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

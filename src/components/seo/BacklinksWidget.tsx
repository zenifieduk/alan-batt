import { BacklinkData } from '@/types/seo';

interface BacklinksWidgetProps {
  data: BacklinkData;
}

export function BacklinksWidget({ data }: BacklinksWidgetProps) {
  const getAuthorityColor = (authority: number) => {
    if (authority >= 70) return 'text-green-600';
    if (authority >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAuthorityBgColor = (authority: number) => {
    if (authority >= 70) return 'bg-green-100';
    if (authority >= 40) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getSpamScoreColor = (score: number) => {
    if (score <= 2) return 'text-green-600';
    if (score <= 5) return 'text-yellow-600';
    return 'text-red-600';
  };



  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      {/* Backlink Overview */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Backlink Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{data.totalBacklinks.toLocaleString()}</div>
            <div className="text-sm text-slate-600">Total Backlinks</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{data.referringDomains.toLocaleString()}</div>
            <div className="text-sm text-slate-600">Referring Domains</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <div className={`text-2xl font-bold ${getAuthorityColor(data.domainAuthority)}`}>
              {data.domainAuthority}
            </div>
            <div className="text-sm text-slate-600">Domain Authority</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
            <div className={`text-2xl font-bold ${getSpamScoreColor(data.spamScore)}`}>
              {data.spamScore}
            </div>
            <div className="text-sm text-slate-600">Spam Score</div>
          </div>
        </div>

        {/* Domain Authority Progress */}
        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Domain Authority Progress</span>
            <span className="text-sm text-slate-600">{data.domainAuthority}/100</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${data.domainAuthority}%` }}
            ></div>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            {data.domainAuthority < 30 && 'Low authority - focus on quality content and link building'}
            {data.domainAuthority >= 30 && data.domainAuthority < 60 && 'Medium authority - continue building quality backlinks'}
            {data.domainAuthority >= 60 && 'High authority - maintain quality and focus on competitive keywords'}
          </div>
        </div>
      </div>

      {/* Top Backlinks */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Top Backlinks</h3>
        
        <div className="space-y-4">
          {data.topBacklinks.map((backlink, index) => (
            <div key={index} className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <a 
                    href={backlink.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm break-all"
                  >
                    {backlink.url}
                  </a>
                  <div className="text-xs text-slate-500 mt-1">
                    Anchor: &quot;{backlink.anchorText}&quot; • First seen: {formatDate(backlink.firstSeen)}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getAuthorityBgColor(backlink.domainAuthority)} ${getAuthorityColor(backlink.domainAuthority)}`}>
                    DA {backlink.domainAuthority}
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    backlink.followType === 'follow' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {backlink.followType}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Backlink Types */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Backlink Types Distribution</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Link Types */}
          <div>
            <h4 className="text-md font-medium text-slate-700 mb-4">Link Types</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-slate-600">Dofollow Links</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-green-600">{data.backlinkTypes.dofollow}</span>
                  <span className="text-xs text-slate-500">
                    ({((data.backlinkTypes.dofollow / data.totalBacklinks) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">Nofollow Links</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-600">{data.backlinkTypes.nofollow}</span>
                  <span className="text-xs text-slate-500">
                    ({((data.backlinkTypes.nofollow / data.totalBacklinks) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="text-sm text-slate-600">Sponsored Links</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-yellow-600">{data.backlinkTypes.sponsored}</span>
                  <span className="text-xs text-slate-500">
                    ({((data.backlinkTypes.sponsored / data.totalBacklinks) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <span className="text-sm text-slate-600">UGC Links</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-purple-600">{data.backlinkTypes.ugc}</span>
                  <span className="text-xs text-slate-500">
                    ({((data.backlinkTypes.ugc / data.totalBacklinks) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Anchor Text Distribution */}
          <div>
            <h4 className="text-md font-medium text-slate-700 mb-4">Top Anchor Text</h4>
            <div className="space-y-3">
              {data.anchorTextDistribution.slice(0, 5).map((anchor, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-600 truncate max-w-32">{anchor.anchorText}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-900">{anchor.count}</span>
                    <span className="text-xs text-slate-500">({anchor.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Backlink Quality Score */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Backlink Quality Score</h3>
        
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600">
              {(() => {
                // Calculate quality score based on various factors
                const authorityScore = Math.min(100, (data.domainAuthority / 100) * 40);
                const spamPenalty = Math.max(0, (data.spamScore - 2) * -10);
                const diversityScore = Math.min(30, (data.referringDomains / data.totalBacklinks) * 100);
                const dofollowScore = Math.min(30, (data.backlinkTypes.dofollow / data.totalBacklinks) * 100);
                
                const totalScore = Math.max(0, Math.round(authorityScore + diversityScore + dofollowScore + spamPenalty));
                return totalScore;
              })()}
            </div>
            <div className="text-sm text-slate-600">out of 100</div>
          </div>
          
          <div className="flex-1">
            <div className="text-sm text-slate-600 mb-2">Overall Backlink Health</div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(() => {
                    const authorityScore = Math.min(100, (data.domainAuthority / 100) * 40);
                    const spamPenalty = Math.max(0, (data.spamScore - 2) * -10);
                    const diversityScore = Math.min(30, (data.referringDomains / data.totalBacklinks) * 100);
                    const dofollowScore = Math.min(30, (data.backlinkTypes.dofollow / data.totalBacklinks) * 100);
                    
                    const totalScore = Math.max(0, Math.round(authorityScore + diversityScore + dofollowScore + spamPenalty));
                    return totalScore;
                  })()}%` 
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-3 bg-slate-50 rounded-lg">
            <div className="font-medium text-slate-700 mb-1">Strengths</div>
            <ul className="text-slate-600 space-y-1">
              {data.domainAuthority >= 40 && <li>• Good domain authority</li>}
              {data.spamScore <= 3 && <li>• Low spam score</li>}
              {data.backlinkTypes.dofollow > data.backlinkTypes.nofollow && <li>• High dofollow ratio</li>}
              {data.referringDomains > 50 && <li>• Diverse link sources</li>}
            </ul>
          </div>
          
          <div className="p-3 bg-slate-50 rounded-lg">
            <div className="font-medium text-slate-700 mb-1">Areas for Improvement</div>
            <ul className="text-slate-600 space-y-1">
              {data.domainAuthority < 40 && <li>• Increase domain authority</li>}
              {data.spamScore > 3 && <li>• Reduce spam score</li>}
              {data.backlinkTypes.dofollow < data.backlinkTypes.nofollow && <li>• Increase dofollow links</li>}
              {data.referringDomains < 50 && <li>• Diversify link sources</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

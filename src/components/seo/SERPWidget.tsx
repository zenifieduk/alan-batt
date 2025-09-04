import { SERPData } from '@/types/seo';

interface SERPWidgetProps {
  data: SERPData;
}

export function SERPWidget({ data }: SERPWidgetProps) {
  return (
    <div className="space-y-8">
      {/* SERP Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <h3 className="text-sm font-medium text-slate-500 mb-2">Search Volume</h3>
          <p className="text-3xl font-bold text-slate-900">
            {data.searchVolume > 0 ? data.searchVolume.toLocaleString() : 'No data'}
          </p>
          <p className="text-sm text-slate-600 mt-1">Total monthly searches</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <h3 className="text-sm font-medium text-slate-500 mb-2">Competition Level</h3>
          <p className="text-3xl font-bold text-slate-900">
            {data.competition && data.competition !== 'Unknown' ? data.competition : 'No data'}
          </p>
          <p className="text-sm text-slate-600 mt-1">Market difficulty</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <h3 className="text-sm font-medium text-slate-500 mb-2">Featured Snippets</h3>
          <p className="text-3xl font-bold text-slate-900">
            {data.featuredSnippets.length > 0 ? data.featuredSnippets.length : 'No data'}
          </p>
          <p className="text-sm text-slate-600 mt-1">Position 0 results</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <h3 className="text-sm font-medium text-slate-500 mb-2">Our Rankings</h3>
          <p className="text-3xl font-bold text-slate-900">
            {data.searchResults.filter(r => r.isOurDomain).length > 0 ? data.searchResults.filter(r => r.isOurDomain).length : 'No data'}
          </p>
          <p className="text-sm text-slate-600 mt-1">Top 20 positions</p>
        </div>
      </div>

      {/* Knowledge Graph */}
      {data.knowledgeGraph && (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Knowledge Graph</h3>
          <div className="flex items-start gap-6">
            {data.knowledgeGraph.image && (
              <img 
                src={data.knowledgeGraph.image} 
                alt={data.knowledgeGraph.title}
                className="w-24 h-24 rounded-lg object-cover"
              />
            )}
            <div className="flex-1">
              <h4 className="text-xl font-semibold text-slate-900 mb-2">{data.knowledgeGraph.title}</h4>
              <p className="text-slate-600 mb-4">{data.knowledgeGraph.description}</p>
              <div className="grid grid-cols-2 gap-4">
                {data.knowledgeGraph.attributes.map((attr, index) => (
                  <div key={index}>
                    <span className="text-sm font-medium text-slate-500">{attr.label}:</span>
                    <span className="ml-2 text-slate-900">{attr.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Search Results Analysis</h3>
        {data.searchResults.length > 0 ? (
          <div className="space-y-4">
            {data.searchResults.slice(0, 10).map((result, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg border ${
                result.isOurDomain 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-slate-200 bg-slate-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      result.isOurDomain 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-slate-100 text-slate-800'
                    }`}>
                      #{result.position}
                    </span>
                    {result.featuredSnippet && (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        Featured Snippet
                      </span>
                    )}
                    {result.isOurDomain && (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                        Our Domain
                      </span>
                    )}
                  </div>
                  <h4 className="font-medium text-slate-900 mb-1">{result.title}</h4>
                  <p className="text-sm text-slate-600 mb-2">{result.description}</p>
                  <p className="text-xs text-slate-500">{result.url}</p>
                </div>
              </div>
            </div>
          ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-slate-500 text-lg">No search results available</p>
            <p className="text-slate-400 text-sm mt-2">SERP data is not currently available</p>
          </div>
        )}
      </div>

      {/* Featured Snippets */}
      {data.featuredSnippets.length > 0 && (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Featured Snippets</h3>
          <div className="space-y-4">
            {data.featuredSnippets.map((snippet, index) => (
              <div key={index} className="p-4 rounded-lg border border-blue-200 bg-blue-50">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    Position #{snippet.position}
                  </span>
                  <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    Featured Snippet
                  </span>
                </div>
                <h4 className="font-medium text-slate-900 mb-1">{snippet.title}</h4>
                <p className="text-sm text-slate-600 mb-2">{snippet.description}</p>
                <p className="text-xs text-slate-500">{snippet.url}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Searches */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Related Searches</h3>
        {data.relatedSearches.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {data.relatedSearches.map((search, index) => (
              <span 
                key={index}
                className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm hover:bg-slate-200 transition-colors cursor-pointer"
              >
                {search}
              </span>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-slate-500">No related searches available</p>
          </div>
        )}
      </div>
    </div>
  );
}

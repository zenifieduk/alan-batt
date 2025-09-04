import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { FileText, Newspaper, Share2, Mail, ArrowRight, Sparkles, Github, Calendar, Clock, User, Tag, ExternalLink, CheckCircle, Eye, Users, TrendingUp } from "lucide-react"

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  status: 'draft' | 'review' | 'approved' | 'published'
  category: 'News & Insights Post' | 'Social Post' | 'Email'
}

const blogPosts: BlogPost[] = [
  {
    slug: 'north-west-uk-property-market-insights-june-2025',
    title: 'North West UK Property Market Insights - June 2025: Wigan and Surrounding Areas',
    excerpt: 'Comprehensive analysis of the North West property market with Wigan emerging as a standout performer. Detailed insights into regional trends, investment opportunities, and market forecasts.',
    date: '19th June 2025',
    readTime: '8 minutes',
    status: 'draft',
    category: 'News & Insights Post'
  },
  {
    slug: 'how-increased-home-supply-will-affect-wigan-house-prices-2025',
    title: 'How Increased Home Supply Will Affect Wigan House Prices in 2025',
    excerpt: 'Analysis of Wigan\'s unprecedented housing supply increases and their impact on property prices. Explore how over 1,000 new homes at Mosley Common will shape the local market.',
    date: '12th June 2025',
    readTime: '7 minutes',
    status: 'draft',
    category: 'News & Insights Post'
  },
  {
    slug: 'uk-house-price-data-lag-2025',
    title: 'Why UK House Price Data is 6 Months Behind Reality (And How Smart Buyers Are Staying Ahead in 2025)',
    excerpt: 'Official UK house price data lags 2-6 months behind actual market conditions. Discover how to read real-time market signals and make informed property decisions.',
    date: '3rd June 2025',
    readTime: '5 minutes',
    status: 'draft',
    category: 'News & Insights Post'
  },
  {
    slug: 'wigan-property-market-2025-outlook',
    title: 'Wigan Property Market 2025: Investment Opportunities and Market Trends',
    excerpt: 'In-depth analysis of Wigan\'s property market performance in 2025, including emerging investment hotspots, price trends, and future development plans.',
    date: '25th June 2025',
    readTime: '6 minutes',
    status: 'draft',
    category: 'News & Insights Post'
  },
  {
    slug: 'social-media-property-tips-2025',
    title: 'Top 10 Property Investment Tips for Social Media in 2025',
    excerpt: 'Engaging social media content featuring practical property investment advice, market insights, and tips for first-time buyers and investors.',
    date: '28th June 2025',
    readTime: '3 minutes',
    status: 'draft',
    category: 'Social Post'
  },
  {
    slug: 'email-newsletter-june-2025',
    title: 'June 2025 Property Market Newsletter: Wigan and North West Updates',
    excerpt: 'Monthly newsletter featuring the latest property market updates, investment opportunities, and expert insights for subscribers.',
    date: '30th June 2025',
    readTime: '4 minutes',
    status: 'draft',
    category: 'News & Insights Post'
  },
  {
    slug: 'july-2025-property-market-summer-insights',
    title: 'July 2025 Property Market: Summer Insights and Investment Opportunities',
    excerpt: 'Comprehensive analysis of the summer property market with July performance data, seasonal trends, and strategic investment opportunities for the summer months.',
    date: '15th July 2025',
    readTime: '7 minutes',
    status: 'draft',
    category: 'News & Insights Post'
  },
  {
    slug: 'summer-property-social-content-2025',
    title: 'Summer Property Social Media Content: July-August 2025',
    excerpt: 'Complete social media content guide for the summer property market with content themes, hashtags, platform strategies, and engagement tips.',
    date: '20th July 2025',
    readTime: '4 minutes',
    status: 'draft',
    category: 'Social Post'
  },
  {
    slug: 'july-august-newsletter-2025',
    title: 'July-August 2025 Property Market Newsletter: Summer Insights and Autumn Preparation',
    excerpt: 'Comprehensive summer market update covering July performance, August forecasts, autumn preparation strategies, and investment opportunities.',
    date: '30th July 2025',
    readTime: '5 minutes',
    status: 'draft',
    category: 'News & Insights Post'
  },
  {
    slug: 'august-2025-property-market-forecast',
    title: 'August 2025 Property Market Forecast: Autumn Market Preparation',
    excerpt: 'Strategic forecast for August 2025 with autumn market predictions, investment strategies, and preparation guidance for the busy autumn season.',
    date: '25th August 2025',
    readTime: '8 minutes',
    status: 'draft',
    category: 'News & Insights Post'
  },
  {
    slug: 'august-2025-wigan-property-market-update',
    title: 'August 2025 Wigan Property Market Update: Summer Peak and Autumn Preparation',
    excerpt: 'Comprehensive August 2025 market analysis for Wigan with updated statistics, investment hotspots, and strategic insights for the autumn market ahead.',
    date: '25th August 2025',
    readTime: '7 minutes',
    status: 'published',
    category: 'News & Insights Post'
  },
  {
    slug: 'august-2025-property-market-newsletter',
    title: 'August 2025 Property Market Newsletter: Summer Peak and Autumn Preparation',
    excerpt: 'August property market newsletter featuring summer performance analysis, investment opportunities, and strategic preparation for the autumn market surge.',
    date: '30th August 2025',
    readTime: '5 minutes',
    status: 'published',
    category: 'News & Insights Post'
  }
  // Add more posts here as they're created
]

export default function ContentPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'review': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'published': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
      case 'published':
        return <CheckCircle className="w-4 h-4" />
      case 'review':
        return <Eye className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'News & Insights Post': return 'bg-blue-100 text-blue-800'
      case 'Social Post': return 'bg-purple-100 text-purple-800'
      case 'Email': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'News & Insights Post': return <Newspaper className="w-4 h-4" />
      case 'Social Post': return <Share2 className="w-4 h-4" />
      case 'Email': return <Mail className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  const categoryStats = {
    'News & Insights Post': blogPosts.filter(p => p.category === 'News & Insights Post').length,
    'Social Post': blogPosts.filter(p => p.category === 'Social Post').length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Main Content */}
      <main className="px-8 py-16 pt-24 md:pt-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900">
              Content Repository
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
              Professional content creation and management across all channels - articles, social posts, and newsletters.
            </p>
          </div>

          {/* Content Categories Overview */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Newspaper className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-semibold text-blue-900">News & Insights</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">{categoryStats['News & Insights Post']}</div>
              <div className="text-sm text-blue-700">Long-form articles</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Share2 className="w-5 h-5 text-purple-600 mr-2" />
                <span className="font-semibold text-purple-900">Social Posts</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">{categoryStats['Social Post']}</div>
              <div className="text-sm text-purple-700">Social media content</div>
            </div>
          </div>

          {/* Status Overview */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 p-4 text-center">
              <div className="text-2xl font-bold text-slate-900">{blogPosts.length}</div>
              <div className="text-sm text-slate-600">Total Content</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{blogPosts.filter(p => p.status === 'published').length}</div>
              <div className="text-sm text-slate-600">Published</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{blogPosts.filter(p => p.status === 'review').length}</div>
              <div className="text-sm text-slate-600">In Review</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{blogPosts.filter(p => p.status === 'draft').length}</div>
              <div className="text-sm text-slate-600">Drafts</div>
            </div>
          </div>

          {/* Content Posts */}
          <div className="space-y-6">
            {blogPosts
              .sort((a, b) => {
                // Convert dates to Date objects for proper sorting
                const dateA = new Date(a.date.replace(/(\d+)(st|nd|rd|th)/, '$1'));
                const dateB = new Date(b.date.replace(/(\d+)(st|nd|rd|th)/, '$1'));
                return dateB.getTime() - dateA.getTime(); // Newest first
              })
              .map((post) => (
              <div key={post.slug} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getCategoryColor(post.category).replace('text-', 'text-').replace('bg-', 'bg-')}`}>
                      {getCategoryIcon(post.category)}
                    </div>
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>
                  
                  <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(post.status)}`}>
                    {getStatusIcon(post.status)}
                    <span className="capitalize">{post.status}</span>
                  </div>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">
                  {post.title}
                </h2>
                
                <p className="text-slate-700 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-slate-500">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{post.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{post.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/content/${post.slug}`} className="flex items-center">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={`/content/${post.slug}`} className="flex items-center">
                        Read Content
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Content Management Info */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-white/30 p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Client Review Process</h3>
              <p className="text-slate-600 text-sm mb-4">
                All content goes through a structured review and approval process. Clients can preview content across all formats, 
                provide feedback, and approve before publication or distribution.
              </p>
              <div className="text-xs text-slate-500">
                Draft → Review → Approved → Published/Sent
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-white/30 p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Multi-Channel Strategy</h3>
              <p className="text-slate-600 text-sm mb-4">
                Comprehensive content strategy across news articles, social media posts, and newsletters. 
                Consistent messaging adapted for each platform and audience.
              </p>
              <div className="text-xs text-slate-500">
                Content types: Articles • Social Posts • Newsletters
              </div>
            </div>
          </div>

          {/* Add New Content */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 mt-12 text-center">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Create New Content</h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Ready to add more content to your repository? Choose the type of content you need and our team 
              will create professional, engaging material tailored to your audience.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Button variant="outline" asChild>
                <Link href="mailto:hello@alanbatt.co.uk?subject=News Article Request">
                  <Newspaper className="w-4 h-4 mr-2" />
                  Request Article
                </Link>
              </Button>
              <Button asChild>
                <Link href="mailto:hello@alanbatt.co.uk?subject=Social Content Request">
                  <Share2 className="w-4 h-4 mr-2" />
                  Social Content
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-slate-500">
        <p>&copy; 2025 Alan Batt Technology Hub. Professional content creation and management.</p>
      </footer>
    </div>
  )
} 
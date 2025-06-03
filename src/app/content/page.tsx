import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Sparkles, FileText, Github, Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react"
import { MobileMenu } from "@/components/ui/mobile-menu"

export default function ContentPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Alan Batt Technology Hub</span>
          </div>
          <div className="flex items-center space-x-6">
            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden lg:flex items-center space-x-6">
              <Button variant="ghost" asChild>
                <Link href="/">Home</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/ai">AI</Link>
              </Button>
              <Button variant="ghost" asChild className="bg-blue-50 text-blue-600">
                <Link href="/content">Content</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/new-dev">New Dev</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/reports">Reports</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/seo">SEO</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/markets">Markets</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/downloads">Downloads</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="https://github.com/zenifieduk/alan-batt" target="_blank">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Link>
              </Button>
              <Button variant="outline" size="sm">
                Contact
              </Button>
            </div>
            
            {/* Mobile Menu */}
            <MobileMenu currentPage="content" />
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900">
              News & Insights
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
              Stay informed with the latest property market analysis, data insights, and professional perspectives.
            </p>
          </div>

          {/* Featured Article */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-orange-600">Featured Analysis</span>
            </div>
            
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why UK House Price Data is 6 Months Behind Reality (And How Smart Buyers Are Staying Ahead in 2025)
            </h2>
            
            <div className="flex items-center space-x-6 mb-6 text-slate-500">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">3rd June 2025</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">5 minutes read</span>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-800 font-medium">
                <strong>Quick takeaway:</strong> Official UK house price data lags 2-6 months behind actual market conditions. 
                Whilst Land Registry data shows what happened, smart property decisions require understanding what's happening now. 
                Here's how to read the real market signals.
              </p>
            </div>

            <div className="prose prose-slate max-w-none mb-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">The Data Lag Problem Most People Don't Know About</h3>
              <p className="text-slate-700 mb-4">
                When BBC News reports "UK house prices rose 6.4% this year" or you check your property's value online, you're looking at <strong>old news</strong>. 
                The uncomfortable truth about UK housing market data is that it consistently runs months behind reality.
              </p>
              
              <p className="text-slate-700 mb-4">
                HM Land Registry data typically lags 2-6 months behind because transactions must complete and be formally registered before appearing in statistics. 
                The ONS House Price Index uses 13-month revision periods for accuracy, which means even their "current" data reflects past market conditions.
              </p>

              <h3 className="text-xl font-semibold text-slate-900 mb-3 mt-6">Why This Matters in 2025</h3>
              <p className="text-slate-700 mb-4">
                <strong>The market you're buying or selling in today is fundamentally different from the data you're seeing.</strong> Understanding this data lag changes everything about how you should approach property decisions.
              </p>

              <ul className="list-disc list-inside text-slate-700 space-y-2 mb-6">
                <li>Asking prices on Rightmove and Zoopla show current market sentiment</li>
                <li>Mortgage approval rates indicate demand trends happening right now</li>
                <li>Days on market reveal real-time supply and demand balance</li>
                <li>Local estate agent insights capture immediate neighbourhood changes</li>
              </ul>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="mailto:hello@alanbatt.co.uk" className="flex items-center">
                  Read Full Analysis
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Article Management */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-white/30 p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Market Research</h3>
              <p className="text-slate-600 text-sm mb-4">
                In-depth analysis of property market trends, data interpretation, and professional insights for informed decision-making.
              </p>
              <div className="text-xs text-slate-500">
                Updated weekly • Next: UK English compliance updates
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-white/30 p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Industry Insights</h3>
              <p className="text-slate-600 text-sm mb-4">
                Professional perspectives on property investment, market timing, and strategic approaches to buying and selling.
              </p>
              <div className="text-xs text-slate-500">
                File location: public/articles/ • Format: Markdown
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-slate-500">
        <p>&copy; 2025 Alan Batt Technology Hub. Professional property market insights.</p>
      </footer>
    </div>
  )
} 
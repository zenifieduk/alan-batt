"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Sparkles, Github, TrendingUp, TrendingDown, Home, PoundSterling, Calendar, BarChart3 } from "lucide-react"
import { MobileMenu } from "@/components/ui/mobile-menu"

export default function MarketsPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const marketData = {
    may2025: {
      propertiesForSale: 2112,
      newListings: 582,
      askingPrice: 245890,
      pricePerSqFt: 235,
      salesAgreed: 463,
      salesAgreedPrice: 223450,
      salesAgreedPricePerSqFt: 226
    },
    may2024: {
      propertiesForSale: 1890,
      newListings: 452,
      askingPrice: 233500,
      pricePerSqFt: 226,
      salesAgreed: 442,
      salesAgreedPrice: 210890,
      salesAgreedPricePerSqFt: 214
    }
  }

  const yearOverYearChanges = {
    propertiesForSale: 11.75,
    newListings: 28.76,
    salesAgreed: 4.75,
    withdrawn: -39.47,
    fallThroughs: -86.61,
    newListingsPrice: 5.31,
    salesAgreedPrice: 5.96
  }

  const keyMetrics = [
    {
      title: "Base Rate",
      value: "4.25%",
      change: "-0.25%",
      trend: "down",
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      title: "2-Year Fixed Mortgage",
      value: "4.52%",
      change: "-0.17%",
      trend: "down",
      icon: <Home className="w-5 h-5" />
    },
    {
      title: "Average Property Price",
      value: "£245,890",
      change: "+5.31%",
      trend: "up",
      icon: <PoundSterling className="w-5 h-5" />
    },
    {
      title: "Sales Agreed",
      value: "463",
      change: "+4.75%",
      trend: "up",
      icon: <TrendingUp className="w-5 h-5" />
    }
  ]

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-GB').format(num)
  }

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0
    }).format(num)
  }

  const TabButton = ({ id, label, active, onClick }: { 
    id: string
    label: string
    active: boolean
    onClick: (id: string) => void
  }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-4 py-2 font-medium rounded-lg transition-colors ${
        active 
          ? 'bg-indigo-600 text-white' 
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
      }`}
    >
      {label}
    </button>
  )

  const MetricCard = ({ title, value, change, trend, icon }: {
    title: string
    value: string
    change: string
    trend: string
    icon: React.ReactNode
  }) => (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="text-slate-600">{icon}</div>
        <div className={`flex items-center text-sm font-medium ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
          {change}
        </div>
      </div>
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <div className="text-sm text-slate-600 mt-1">{title}</div>
    </div>
  )

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
              <Button variant="ghost" asChild>
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
              <Button variant="ghost" asChild className="bg-blue-50 text-blue-600">
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
            </div>
            
            {/* Mobile Menu */}
            <MobileMenu currentPage="markets" />
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Market Report Component */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold">UK Property Market Report</h1>
                  <p className="text-indigo-100 mt-2 text-lg">May 2025 - Alan Batt Local Market Update</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{formatCurrency(marketData.may2025.askingPrice)}</div>
                  <div className="text-indigo-100">Average asking price</div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-slate-200 p-6">
              <div className="flex flex-wrap gap-2">
                <TabButton 
                  id="overview" 
                  label="Overview" 
                  active={activeTab === 'overview'} 
                  onClick={setActiveTab} 
                />
                <TabButton 
                  id="metrics" 
                  label="Key Metrics" 
                  active={activeTab === 'metrics'} 
                  onClick={setActiveTab} 
                />
                <TabButton 
                  id="trends" 
                  label="Market Trends" 
                  active={activeTab === 'trends'} 
                  onClick={setActiveTab} 
                />
                <TabButton 
                  id="mortgages" 
                  label="Mortgages" 
                  active={activeTab === 'mortgages'} 
                  onClick={setActiveTab} 
                />
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {keyMetrics.map((metric, index) => (
                      <MetricCard key={index} {...metric} />
                    ))}
                  </div>

                  <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-200">
                    <h3 className="text-2xl font-semibold text-slate-900 mb-4">Market Summary</h3>
                    <p className="text-slate-700 leading-relaxed text-lg">
                      The UK property market is demonstrating remarkable resilience following the stamp duty 
                      adjustments and Bank of England&apos;s base rate cut to 4.25%. With fall-throughs down 86.61% 
                      year-over-year and new listings up 28.76%, market confidence is steadily improving.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-6">
                      <h4 className="text-xl font-semibold text-slate-900 mb-4">Supply & Demand</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Properties for Sale</span>
                          <span className="font-semibold text-slate-900">{formatNumber(marketData.may2025.propertiesForSale)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">New Listings</span>
                          <span className="font-semibold text-slate-900">{formatNumber(marketData.may2025.newListings)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Sales Agreed</span>
                          <span className="font-semibold text-slate-900">{formatNumber(marketData.may2025.salesAgreed)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-6">
                      <h4 className="text-xl font-semibold text-slate-900 mb-4">Year-over-Year Growth</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">New Listings</span>
                          <span className="text-green-600 font-semibold">+{yearOverYearChanges.newListings}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Properties for Sale</span>
                          <span className="text-green-600 font-semibold">+{yearOverYearChanges.propertiesForSale}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Fall-throughs</span>
                          <span className="text-green-600 font-semibold">{yearOverYearChanges.fallThroughs}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'metrics' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-slate-900">Key Performance Metrics</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-slate-300 rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="border border-slate-300 px-4 py-3 text-left font-semibold">Year</th>
                          <th className="border border-slate-300 px-4 py-3 text-right font-semibold">Properties for Sale</th>
                          <th className="border border-slate-300 px-4 py-3 text-right font-semibold">New Listings</th>
                          <th className="border border-slate-300 px-4 py-3 text-right font-semibold">Asking Price</th>
                          <th className="border border-slate-300 px-4 py-3 text-right font-semibold">Sales Agreed</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-slate-300 px-4 py-3 font-medium">May 2025</td>
                          <td className="border border-slate-300 px-4 py-3 text-right">{formatNumber(marketData.may2025.propertiesForSale)}</td>
                          <td className="border border-slate-300 px-4 py-3 text-right">{formatNumber(marketData.may2025.newListings)}</td>
                          <td className="border border-slate-300 px-4 py-3 text-right">{formatCurrency(marketData.may2025.askingPrice)}</td>
                          <td className="border border-slate-300 px-4 py-3 text-right">{formatNumber(marketData.may2025.salesAgreed)}</td>
                        </tr>
                        <tr className="bg-slate-50">
                          <td className="border border-slate-300 px-4 py-3 font-medium">May 2024</td>
                          <td className="border border-slate-300 px-4 py-3 text-right">{formatNumber(marketData.may2024.propertiesForSale)}</td>
                          <td className="border border-slate-300 px-4 py-3 text-right">{formatNumber(marketData.may2024.newListings)}</td>
                          <td className="border border-slate-300 px-4 py-3 text-right">{formatCurrency(marketData.may2024.askingPrice)}</td>
                          <td className="border border-slate-300 px-4 py-3 text-right">{formatNumber(marketData.may2024.salesAgreed)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'trends' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-slate-900">Market Trends Analysis</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                      <h4 className="font-semibold text-green-800 mb-4 text-lg">Positive Trends</h4>
                      <ul className="space-y-2 text-green-700">
                        <li>• Fall-throughs down 86.61%</li>
                        <li>• New listings up 28.76%</li>
                        <li>• Mortgage rates below 4%</li>
                        <li>• Supply 35% above average</li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                      <h4 className="font-semibold text-blue-800 mb-4 text-lg">Market Stability</h4>
                      <ul className="space-y-2 text-blue-700">
                        <li>• 16 months of 60k+ approvals</li>
                        <li>• Inflation stable at 2.6%</li>
                        <li>• Wages outpacing inflation</li>
                        <li>• Base rate on downward path</li>
                      </ul>
                    </div>
                    
                    <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
                      <h4 className="font-semibold text-purple-800 mb-4 text-lg">Future Outlook</h4>
                      <ul className="space-y-2 text-purple-700">
                        <li>• 5-6% more sales expected</li>
                        <li>• Modest price growth</li>
                        <li>• Rate cuts to 3.75% likely</li>
                        <li>• Market resilience proven</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'mortgages' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-slate-900">Mortgage Market Update</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-6">
                      <h4 className="font-semibold text-slate-900 mb-4 text-xl">Current Rates</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Base Rate</span>
                          <span className="text-3xl font-bold text-indigo-600">4.25%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">2-Year Fixed</span>
                          <span className="text-xl font-semibold">4.52%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">5-Year Fixed</span>
                          <span className="text-xl font-semibold">4.48%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/60 backdrop-blur-sm border border-slate-200 rounded-2xl p-6">
                      <h4 className="font-semibold text-slate-900 mb-4 text-xl">Market Activity</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-600">April Approvals</span>
                          <span className="font-semibold">65,410</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">5% Deposit Products</span>
                          <span className="font-semibold">458</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Buying Power Boost</span>
                          <span className="font-semibold text-green-600">10-15%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                    <h4 className="font-semibold text-amber-800 mb-4 text-xl">Rent vs Buy Analysis</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <span className="text-amber-700">Average 90% LTV Mortgage Payment:</span>
                        <div className="text-3xl font-bold text-amber-800">£1,315/month</div>
                      </div>
                      <div>
                        <span className="text-amber-700">Average Rental Payment:</span>
                        <div className="text-3xl font-bold text-amber-800">£1,365/month</div>
                      </div>
                    </div>
                    <p className="text-amber-700 mt-4 font-semibold text-lg">
                      Buying is now approximately £50 cheaper per month than renting
                    </p>
                  </div>
                </div>
              )}
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
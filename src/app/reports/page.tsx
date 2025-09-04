import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { BarChart3, Facebook } from "lucide-react"
import { AnalyticsDashboard } from "@/components/analytics/dashboard/AnalyticsDashboard"

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Main Content */}
      <main className="px-8 py-16 pt-24 md:pt-16">
        <div className="max-w-6xl mx-auto">
          {/* Reports Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-2">
              <div className="flex space-x-1">
                <Button 
                  variant="ghost" 
                  asChild
                  className="px-6 py-2 rounded-xl hover:bg-slate-50 text-slate-600"
                >
                  <Link href="/reports/facebook">
                    <Facebook className="h-4 w-4 mr-2" />
                    Social Media
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  className="px-6 py-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200"
                  disabled
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Web Analytics
                </Button>
              </div>
            </div>
          </div>

          {/* Reports Navigation */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Reports & Analytics
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Comprehensive insights across all your digital platforms
              </p>
            </div>
            
            {/* Reports Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Web Reports Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Web Reports</h2>
                    <p className="text-slate-600">Google Analytics & Website Performance</p>
                  </div>
                </div>
                <p className="text-slate-600 mb-6">
                  Track website traffic, user behavior, and conversion metrics with real-time Google Analytics data.
                </p>
                <div className="space-y-4">
                  <div className="text-sm text-slate-500">
                    <span className="font-medium">Includes:</span> Page views, sessions, traffic sources, user engagement
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    View Web Analytics
                  </Button>
                </div>
              </div>

              {/* Facebook Reports Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Facebook className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Facebook Reports</h2>
                    <p className="text-slate-600">Social Media Performance & Insights</p>
                  </div>
                </div>
                <p className="text-slate-600 mb-6">
                  Monitor Facebook page performance, content engagement, and audience insights.
                </p>
                <div className="space-y-4">
                  <div className="text-sm text-slate-500">
                    <span className="font-medium">Includes:</span> Page engagement, post performance, audience demographics
                  </div>
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Link href="/reports/facebook">View Facebook Analytics</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Web Analytics Dashboard */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Web Analytics Dashboard</h2>
              <p className="text-slate-600">Real-time website performance metrics</p>
            </div>
            <AnalyticsDashboard />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-slate-500">
        <p>&copy; 2024 Alan Batt Technology Hub. Analytics dashboard coming soon.</p>
      </footer>
    </div>
  )
} 
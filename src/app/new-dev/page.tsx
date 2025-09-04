import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Sparkles, Code, Github } from "lucide-react"

export default function NewDevPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Main Content */}
      <main className="px-8 py-16 pt-24 md:pt-16 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="mb-16">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Code className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900">
              New Development
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
              Latest development projects, prototypes, and innovative solutions.
            </p>
          </div>

          {/* Coming Soon */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Coming Soon</h2>
            <p className="text-slate-600">
              New development showcase and project management features are currently in development.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-8 text-center text-slate-500">
        <p>&copy; 2024 Alan Batt Technology Hub. Development showcase coming soon.</p>
      </footer>
    </div>
  )
} 
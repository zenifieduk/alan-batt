"use client"

import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  Search, 
  TrendingUp, 
  FileText, 
  Bot, 
  Download, 
  Code,
  ArrowRight,
  Mail,
  Target,
  Lightbulb,
  Users
} from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <main className="px-8 py-16 pt-24 md:pt-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-20">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <div className="relative w-48 h-20 md:w-64 md:h-24">
                <Image
                  src="/alan-batt-logo.svg"
                  alt="Alan Batt Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            
            <div className="mb-8">
              <span className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-white ring-1 ring-inset ring-blue-300/20 mb-6" style={{backgroundColor: '#29377c'}}>
                <Lightbulb className="h-4 w-4 mr-2" />
                Business Information Dashboard
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight" style={{color: '#29377c'}}>
              Tech Hub
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-12 max-w-4xl mx-auto">
              Access your analytics, content, AI tools, and market data in one place
            </p>
          </div>

          {/* Service Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {/* Reports Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl transition-shadow">
              <div className="mb-6">
                <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4" style={{backgroundColor: '#29377c'}}>
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{color: '#29377c'}}>Reports & Analytics</h3>
                <p className="text-slate-600 leading-relaxed">
                  Web analytics, social media insights, and performance tracking data.
                </p>
              </div>
              <Button 
                className="w-full text-white font-semibold py-3" 
                style={{backgroundColor: '#f37054'}}
                asChild
              >
                <Link href="/reports">
                  View Reports
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* SEO Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl transition-shadow">
              <div className="mb-6">
                <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4" style={{backgroundColor: '#058895'}}>
                  <Search className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{color: '#29377c'}}>SEO Tools</h3>
                <p className="text-slate-600 leading-relaxed">
                  Search engine optimisation tools and website performance analysis.
                </p>
              </div>
              <Button 
                className="w-full text-white font-semibold py-3" 
                style={{backgroundColor: '#f37054'}}
                asChild
              >
                <Link href="/seo">
                  Optimize SEO
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Markets Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl transition-shadow">
              <div className="mb-6">
                <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4" style={{backgroundColor: '#29377c'}}>
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{color: '#29377c'}}>Market Data</h3>
                <p className="text-slate-600 leading-relaxed">
                  Property market data, trends analysis, and local market insights.
                </p>
              </div>
              <Button 
                className="w-full text-white font-semibold py-3" 
                style={{backgroundColor: '#f37054'}}
                asChild
              >
                <Link href="/markets">
                  Explore Markets
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Content Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl transition-shadow">
              <div className="mb-6">
                <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4" style={{backgroundColor: '#058895'}}>
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{color: '#29377c'}}>Content</h3>
                <p className="text-slate-600 leading-relaxed">
                  Content creation, management, and distribution tools.
                </p>
              </div>
              <Button 
                className="w-full text-white font-semibold py-3" 
                style={{backgroundColor: '#f37054'}}
                asChild
              >
                <Link href="/content">
                  Manage Content
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* AI Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl transition-shadow">
              <div className="mb-6">
                <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4" style={{backgroundColor: '#29377c'}}>
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{color: '#29377c'}}>AI Tools</h3>
                <p className="text-slate-600 leading-relaxed">
                  AI chatbots, voice agents, and automation tools.
                </p>
              </div>
              <Button 
                className="w-full text-white font-semibold py-3" 
                style={{backgroundColor: '#f37054'}}
                asChild
              >
                <Link href="/ai">
                  Explore AI
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Downloads Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl transition-shadow">
              <div className="mb-6">
                <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4" style={{backgroundColor: '#058895'}}>
                  <Download className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{color: '#29377c'}}>Downloads</h3>
                <p className="text-slate-600 leading-relaxed">
                  Reports, templates, guides, and other resources.
                </p>
              </div>
              <Button 
                className="w-full text-white font-semibold py-3" 
                style={{backgroundColor: '#f37054'}}
                asChild
              >
                <Link href="/downloads">
                  Browse Resources
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Additional Services Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {/* Development Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl transition-shadow">
              <div className="mb-6">
                <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4" style={{backgroundColor: '#29377c'}}>
                  <Code className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{color: '#29377c'}}>Development</h3>
                <p className="text-slate-600 leading-relaxed">
                  Latest projects, prototypes, and technical developments.
                </p>
              </div>
              <Button 
                className="w-full text-white font-semibold py-3" 
                style={{backgroundColor: '#f37054'}}
                asChild
              >
                <Link href="/new-dev">
                  View Portfolio
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Newsletter Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl transition-shadow">
              <div className="mb-6">
                <div className="h-12 w-12 rounded-lg flex items-center justify-center mb-4" style={{backgroundColor: '#058895'}}>
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{color: '#29377c'}}>Email Newsletters</h3>
                <p className="text-slate-600 leading-relaxed">
                  Email campaigns, newsletters, and automated communications.
                </p>
              </div>
              <Button 
                className="w-full text-white font-semibold py-3" 
                style={{backgroundColor: '#f37054'}}
                asChild
              >
                <Link href="/emails">
                  Manage Emails
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Key Features Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{color: '#29377c'}}>
                About This Hub
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                A centralized platform for accessing all your business information and tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#29377c'}}>
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3" style={{color: '#29377c'}}>Centralized</h4>
                <p className="text-slate-600">
                  All your business information and tools in one organised location.
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#058895'}}>
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3" style={{color: '#29377c'}}>Data Access</h4>
                <p className="text-slate-600">
                  Analytics, reports, and market data for informed decision making.
                </p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#f37054'}}>
                  <Lightbulb className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold mb-3" style={{color: '#29377c'}}>Tools & Automation</h4>
                <p className="text-slate-600">
                  AI tools, content management, and automation features.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-8 text-center text-slate-500 mt-20">
        <p>&copy; 2024 Alan Batt Tech Hub. Business information and tools dashboard.</p>
      </footer>
    </div>
  )
}

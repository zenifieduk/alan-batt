"use client"

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Github, Rocket, Sparkles, Palette, Zap, Bot } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Alan Batt</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/ai">
                <Bot className="h-4 w-4 mr-2" />
                AI Demo
              </Link>
            </Button>
            <Button variant="outline" size="sm">
              <Github className="h-4 w-4 mr-2" />
              GitHub
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
              <Rocket className="h-3 w-3 mr-1" />
              Next.js 15 + Tailwind CSS v4
            </span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
            Ready to Build
            <span className="block text-primary">Something Amazing</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your React project is set up with Next.js 15, Tailwind CSS v4, TypeScript, 
            and all the modern tools you need to build beautiful, fast applications.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="lg" className="text-base px-8" asChild>
              <Link href="/ai">
                <Bot className="h-4 w-4 mr-2" />
                Try AI Demo
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-base px-8">
              <Palette className="h-4 w-4 mr-2" />
              View Components
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="mb-4">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Zap className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground">
              Built with Next.js 15 and optimized for performance with the latest React features.
            </p>
          </div>
          
          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="mb-4">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Palette className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Beautiful Design</h3>
            <p className="text-muted-foreground">
              Tailwind CSS v4 with a comprehensive design system and dark mode support.
            </p>
          </div>
          
          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="mb-4">
              <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Bot className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Powered</h3>
            <p className="text-muted-foreground">
              Experience our AI agents with ElevenLabs voice technology integration.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-16 p-8 rounded-lg border bg-card text-card-foreground shadow-sm max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
              <span className="font-semibold">Next.js 15</span>
              <span className="text-muted-foreground">React Framework</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
              <span className="font-semibold">Tailwind v4</span>
              <span className="text-muted-foreground">CSS Framework</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
              <span className="font-semibold">TypeScript</span>
              <span className="text-muted-foreground">Type Safety</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
              <span className="font-semibold">ElevenLabs</span>
              <span className="text-muted-foreground">Voice AI</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-muted-foreground">
        <p>&copy; 2024 Alan Batt. Ready to build something amazing.</p>
      </footer>
    </div>
  )
}

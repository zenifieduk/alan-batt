"use client"

import { Button } from "@/components/ui/button"
import EllieVoiceAgent from "@/components/EllieVoiceAgent"
import { MessageCircle, Phone, Sparkles, Mic } from "lucide-react"

export default function AIPage() {
  const handleTalkToEllie = () => {
    // This will be handled by the EllieVoiceAgent component
    console.log("Starting conversation with Ellie")
  }

  const handleChatWithTrevor = () => {
    // External demo link
    window.open('https://classiccarclubs.uk', '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* EllieVoiceAgent floating widget */}
      <EllieVoiceAgent />

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
              <a href="/">Home</a>
            </Button>
            <Button variant="outline" size="sm">
              Contact
            </Button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-slate-900">
              Try Our AI Agents Now - Live Demo
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto">
              Experience our AI agents in action. Click below to start a real conversation with Ellie,
              our voice booking agent.
            </p>
          </div>

          {/* Demo Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Talk to Ellie Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <Phone className="w-8 h-8 text-blue-600" />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Talk to Ellie
                </h2>

                {/* Description */}
                <p className="text-slate-600 mb-3">
                  Voice booking agent powered by ElevenLabs
                </p>

                {/* Call to Action */}
                <p className="text-slate-700 font-medium mb-8">
                  Click below to start talking with Ellie
                </p>

                {/* Button */}
                <Button 
                  onClick={handleTalkToEllie}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 px-8 text-lg font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  <Mic className="w-5 h-5 mr-3" />
                  Start Voice Call
                </Button>
              </div>
            </div>

            {/* Chat with Trevor Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                  <MessageCircle className="w-8 h-8 text-green-600" />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Chat with Trevor
                </h2>

                {/* Description */}
                <p className="text-slate-600 mb-3">
                  Classic car expert chatbot (External Demo)
                </p>

                {/* Additional Info */}
                <p className="text-slate-700 font-medium mb-8">
                  Available on ClassicCarClubs.uk
                </p>

                {/* Button */}
                <Button 
                  onClick={handleChatWithTrevor}
                  variant="outline"
                  className="w-full border-2 border-green-500 text-green-600 hover:bg-green-50 py-4 px-8 text-lg font-medium rounded-xl transition-all duration-300"
                  size="lg"
                >
                  <MessageCircle className="w-5 h-5 mr-3" />
                  Request Demo
                </Button>
              </div>
            </div>
          </div>

          {/* Live Demo Note */}
          <div className="mt-12 p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-slate-700">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="font-medium">
                Live Demo: Ellie uses real ElevenLabs AI technology and will respond naturally to your questions about our services
              </span>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Natural Voice</h3>
              <p className="text-slate-600">
                Powered by ElevenLabs for natural, human-like conversation
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Intelligent Chat</h3>
              <p className="text-slate-600">
                Context-aware responses tailored to your specific needs
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Real-time</h3>
              <p className="text-slate-600">
                Instant responses with advanced AI understanding
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-slate-500">
        <p>&copy; 2024 Alan Batt. Experience the future of AI conversation.</p>
      </footer>
    </div>
  )
} 
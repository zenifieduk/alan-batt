import { NextRequest, NextResponse } from 'next/server'

interface Message {
  id: string
  content: string
  sender: 'user' | 'agent'
  timestamp: Date
}

interface ChatRequest {
  message: string
  agentId: string
  conversationHistory?: Message[]
}

// Simple conversation state management
const conversationStates = new Map<string, {
  context: string[]
  lastTopic: string
  userInfo: any
  messageCount: number
}>()

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json()
    const { message, agentId, conversationHistory = [] } = body

    if (!message || !agentId) {
      return NextResponse.json(
        { error: 'Message and agentId are required' },
        { status: 400 }
      )
    }

    // Create a simple session ID based on timestamp and agent
    const sessionId = `${agentId}-session`
    
    // Get or create conversation state
    let state = conversationStates.get(sessionId) || {
      context: [],
      lastTopic: '',
      userInfo: {},
      messageCount: 0
    }

    state.messageCount++
    state.context.push(message.toLowerCase())

    // Keep only last 5 messages for context
    if (state.context.length > 5) {
      state.context = state.context.slice(-5)
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1500))

    // Generate intelligent response based on conversation flow
    const response = generateIntelligentResponse(message.toLowerCase(), state, conversationHistory)

    // Update conversation state
    conversationStates.set(sessionId, state)

    return NextResponse.json({ response })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function generateIntelligentResponse(message: string, state: any, history: Message[]): string {
  // Track conversation topics to avoid repetition
  const recentMessages = history.slice(-4).map(h => h.content.toLowerCase())
  const hasRepeatedTopic = recentMessages.some(msg => 
    msg.includes('property') && state.context.filter((c: string) => c.includes('property')).length > 2
  )

  // Greeting detection
  if (state.messageCount === 1 && (message.includes('hello') || message.includes('hi') || message.includes('hey'))) {
    state.lastTopic = 'greeting'
    return "Hello! I'm Ellie, your AI property assistant. I'm here to help you with property searches, viewings, bookings, and connecting you with Alan Batt. What can I help you with today?"
  }

  // Follow-up after greeting
  if (state.lastTopic === 'greeting' && !message.includes('property') && !message.includes('book') && !message.includes('viewing')) {
    state.lastTopic = 'general_inquiry'
    return "Great! I can assist you with several things: finding available properties, booking viewings, checking rental prices, or connecting you directly with Alan Batt. What would you like to explore first?"
  }

  // Avoid repeating property information if already discussed
  if (hasRepeatedTopic && (message.includes('property') || message.includes('house') || message.includes('flat'))) {
    state.lastTopic = 'property_details'
    return "I notice we've been discussing properties. Let me help you take the next step! Would you like me to: 1) Book a viewing for a specific property, 2) Get you in touch with Alan Batt directly, or 3) Check what's available in a particular area and price range?"
  }

  // Location-specific inquiries
  if (message.includes('area') || message.includes('location') || message.includes('where') || message.match(/\b(london|manchester|birmingham|leeds|liverpool|bristol|sheffield|edinburgh|glasgow|cardiff)\b/i)) {
    state.lastTopic = 'location'
    state.userInfo.interested_location = true
    return "Excellent! Location is key when finding the right property. Alan Batt has properties across various areas. To give you the most relevant options, could you tell me your preferred area and roughly what your budget range is? I can then check what's currently available and arrange viewings."
  }

  // Budget/pricing inquiries
  if (message.includes('budget') || message.includes('price') || message.includes('cost') || message.includes('rent') || message.includes('£') || message.includes('thousand')) {
    state.lastTopic = 'budget'
    state.userInfo.interested_budget = true
    return "Perfect! Understanding your budget helps me find the best matches. Based on your budget, I can search Alan Batt's portfolio and arrange viewings for properties that fit. Would you also like me to set up email alerts for new properties that come available in your price range?"
  }

  // Booking/viewing specific
  if (message.includes('book') || message.includes('viewing') || message.includes('appointment') || message.includes('schedule') || message.includes('see')) {
    state.lastTopic = 'booking'
    return "I'd be happy to arrange a property viewing for you! To book with Alan Batt, I'll need: 1) Which property you're interested in (or property type/area if browsing), 2) Your preferred dates/times, and 3) Your contact details. I can check availability and send you confirmation details. What property catches your interest?"
  }

  // Contact/direct communication
  if (message.includes('contact') || message.includes('speak to alan') || message.includes('call') || message.includes('email') || message.includes('phone')) {
    state.lastTopic = 'contact'
    return "I can definitely connect you with Alan Batt directly! He can provide detailed property advice and handle complex inquiries personally. Would you prefer: 1) Email contact (I can send your details and he'll email you), 2) Phone consultation (I can arrange a callback), or 3) Immediate notification for urgent matters?"
  }

  // Thank you responses
  if (message.includes('thank') || message.includes('thanks')) {
    return "You're very welcome! I'm here whenever you need help with property matters. Feel free to ask about viewings, availability, or if you'd like me to connect you with Alan Batt directly. Is there anything else I can help you with today?"
  }

  // Availability questions
  if (message.includes('available') || message.includes('free') || message.includes('when')) {
    state.lastTopic = 'availability'
    return "I can check availability for both properties and viewing appointments! Alan Batt's schedule typically allows for viewings throughout the week. For property availability, I'd need to know your preferred area and property type. Would you like me to check what's currently available or help you schedule a viewing?"
  }

  // General property services
  if (message.includes('service') || message.includes('help') || message.includes('what can you')) {
    state.lastTopic = 'services'
    return "I can help you with a full range of property services: property search and recommendations, viewing arrangements, rental applications, connecting you with Alan Batt for consultations, market updates, and answering questions about specific properties. What specific area would you like to focus on?"
  }

  // Default intelligent response based on context
  if (state.messageCount > 3) {
    return "I want to make sure I'm giving you the most helpful information. It sounds like you're interested in property services - let me connect you directly with Alan Batt who can provide personalized assistance. Would you like me to arrange a phone call or email contact? This way you can get detailed, specific answers to your questions."
  }

  // Fallback for unclear messages
  return "I'm here to help you with Alan Batt's property services! I can assist with property searches, booking viewings, discussing available rentals, or connecting you directly with Alan. Could you let me know what specific aspect of property services you're most interested in right now?"
}

export async function GET() {
  return NextResponse.json({ message: 'Chat API is running' })
} 
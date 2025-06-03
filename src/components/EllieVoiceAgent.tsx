'use client'

import React, { useState, useCallback } from 'react';
import { useConversation } from '@elevenlabs/react';
import { PhoneCall, Mic, PhoneOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EllieVoiceAgent = () => {
  const [hasRequestedMicPermission, setHasRequestedMicPermission] = useState(false);
  const [micPermissionGranted, setMicPermissionGranted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const conversation = useConversation({
    onConnect: () => {
      console.log('Connected to Ellie');
    },
    onDisconnect: () => {
      console.log('Disconnected from Ellie');
    },
    onMessage: (message) => {
      console.log('Message from Ellie:', message);
      // You could track conversations here for lead generation
    },
    onError: (error) => {
      console.error('Conversation error:', error);
    },
  });

  const requestMicrophonePermission = useCallback(async () => {
    if (hasRequestedMicPermission) return;
    
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicPermissionGranted(true);
      setHasRequestedMicPermission(true);
    } catch (error) {
      console.error('Microphone permission denied:', error);
      setMicPermissionGranted(false);
      setHasRequestedMicPermission(true);
    }
  }, [hasRequestedMicPermission]);

  const startConversationWithEllie = useCallback(async () => {
    try {
      if (!micPermissionGranted) {
        await requestMicrophonePermission();
        return;
      }

      await conversation.startSession({
        agentId: 'VWLyW7SVbYSgU5J9PSN9', // Ellie's agent ID
      });
    } catch (error) {
      console.error('Failed to start conversation with Ellie:', error);
    }
  }, [conversation, micPermissionGranted, requestMicrophonePermission]);

  const endConversation = useCallback(async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.error('Failed to end conversation:', error);
    }
  }, [conversation]);

  const toggleWidget = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={toggleWidget}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          size="icon"
          aria-label="Talk to Ellie - AI Sales Assistant"
        >
          <PhoneCall className="w-6 h-6" />
        </Button>
      </div>

      {/* Voice Agent Widget */}
      {isVisible && (
        <div className="fixed bottom-20 right-6 z-50 bg-card/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-border w-80 max-w-[90vw]">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <PhoneCall className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Talk to Ellie</h3>
                  <p className="text-sm text-muted-foreground">AI Sales Assistant</p>
                </div>
              </div>
              <Button
                onClick={toggleWidget}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground h-6 w-6 p-0"
              >
                ×
              </Button>
            </div>

            {/* Status */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${
                  conversation.status === 'connected' ? 'bg-green-500' : 'bg-muted-foreground'
                }`} />
                <span className="text-muted-foreground">
                  {conversation.status === 'connected' ? 'Connected' : 'Ready to connect'}
                </span>
              </div>
              {conversation.isSpeaking && (
                <div className="flex items-center space-x-2 text-sm text-purple-600 mt-1">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Ellie is speaking...</span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-4">
              Hi! I&apos;m Ellie, your AI sales assistant. I can help you learn about our services, 
              answer questions, and guide you through our offerings. Click below to start a voice conversation!
            </p>

            {/* Microphone Permission Request */}
            {!hasRequestedMicPermission && (
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                  Ellie needs microphone access to have a conversation with you.
                </p>
                <Button
                  onClick={requestMicrophonePermission}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Allow Microphone
                </Button>
              </div>
            )}

            {/* Mic Permission Denied */}
            {hasRequestedMicPermission && !micPermissionGranted && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                <p className="text-sm text-red-800 dark:text-red-200 mb-3">
                  Microphone access is required for voice conversations. Please enable it in your browser settings.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {conversation.status === 'disconnected' ? (
                <Button
                  onClick={startConversationWithEllie}
                  disabled={!micPermissionGranted}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-muted disabled:to-muted text-white"
                >
                  <Mic className="w-4 h-4 mr-2" />
                  Start Voice Conversation
                </Button>
              ) : (
                <Button
                  onClick={endConversation}
                  variant="destructive"
                  className="w-full"
                >
                  <PhoneOff className="w-4 h-4 mr-2" />
                  End Conversation
                </Button>
              )}

              {/* Fallback to External Link */}
              <Button
                onClick={() => window.open('https://elevenlabs.io/convai/conversation/VWLyW7SVbYSgU5J9PSN9', '_blank')}
                variant="outline"
                className="w-full"
              >
                <PhoneCall className="w-4 h-4 mr-2" />
                Open in New Tab
              </Button>
            </div>

            {/* Lead Generation Note */}
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Conversations help us understand your needs better
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default EllieVoiceAgent; 
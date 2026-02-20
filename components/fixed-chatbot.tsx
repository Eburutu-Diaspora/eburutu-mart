'use client'

import { useState } from 'react'
import { MessageCircle, X, Minimize2, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function FixedChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  return (
    <>
      {/* Fixed Chat Button - Bottom Right */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#1a237e] hover:bg-[#0d1453] text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
          aria-label="Open chat assistant"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="font-medium">Chat with us</span>
        </button>
      )}

      {/* Fixed Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 bg-white rounded-lg shadow-2xl border border-gray-200 transition-all duration-300 ${
            isMinimized ? 'w-72 h-14' : 'w-[380px] h-[600px]'
          }`}
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#1a237e] text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <span className="font-semibold">Eburutu Mart Assistant</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label={isMinimized ? 'Maximize chat' : 'Minimize chat'}
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          {!isMinimized && (
            <div className="h-[calc(100%-56px)]">
              <iframe
                src="https://apps.abacus.ai/chatllm/?appId=136d70a8d4&hideTopBar=2"
                className="w-full h-full rounded-b-lg"
                title="Eburutu Mart Chat Assistant"
                allow="microphone"
              />
            </div>
          )}
        </div>
      )}
    </>
  )
}

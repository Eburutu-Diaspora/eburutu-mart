'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Minimize2, Maximize2, Send, RefreshCw } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  error?: boolean
}

const SUGGESTED_QUESTIONS = [
  'How do I become a seller?',
  'What categories are available?',
  'How do I contact a seller?',
  'Is Eburutu Mart free to use?',
]

export function FixedChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! Welcome to Eburutu Mart 🌍 I'm here to help you find products or list your own. What can I help you with today?",
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [retryMessage, setRetryMessage] = useState<Message | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, isMinimized])

  const sendMessage = async (text?: string) => {
    const messageText = text ?? input.trim()
    if (!messageText || isLoading) return

    const userMessage: Message = { role: 'user', content: messageText }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsLoading(true)
    setRetryMessage(null)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(({ role, content }) => ({ role, content })),
        }),
      })

      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()

      if (data.message) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.message }])
      } else {
        throw new Error('Empty response')
      }
    } catch {
      setRetryMessage(userMessage)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I had trouble responding. Please try again.',
          error: true,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleRetry = () => {
    if (!retryMessage) return
    setMessages((prev) => prev.filter((_, i) => i !== prev.length - 1))
    sendMessage(retryMessage.content)
  }

  const showSuggestions = messages.length === 1

  return (
    <>
      {/* Floating button — only when chat is closed */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#1a237e] hover:bg-[#0d1453] text-white px-4 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105"
          aria-label="Open chat assistant"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="font-medium">Chat with us</span>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          className={`fixed z-50 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col transition-all duration-300
            ${isMinimized
              ? 'bottom-6 right-6 w-72 h-14'
              : 'bottom-0 right-0 left-0 h-[75vh] sm:bottom-6 sm:right-6 sm:left-auto sm:w-[380px] sm:h-[560px] rounded-b-none sm:rounded-b-xl'
            }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#1a237e] text-white rounded-t-xl shrink-0">
            <div className="flex items-center gap-2">
              <div className="relative">
                <MessageCircle className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border border-white" />
              </div>
              <div>
                <span className="font-semibold text-sm block">Eburutu Mart Assistant</span>
                {!isMinimized && <span className="text-xs text-blue-200">Online</span>}
              </div>
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
                onClick={() => { setIsOpen(false); setIsMinimized(false) }}
                className="p-1 hover:bg-white/20 rounded transition-colors"
                aria-label="Close chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[82%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#1a237e] text-white rounded-br-sm'
                          : msg.error
                          ? 'bg-red-50 text-red-700 border border-red-200 rounded-bl-sm'
                          : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm'
                      }`}
                    >
                      {msg.content}
                      {msg.error && retryMessage && (
                        <button
                          onClick={handleRetry}
                          className="flex items-center gap-1 mt-1 text-xs text-red-500 hover:text-red-700"
                        >
                          <RefreshCw className="h-3 w-3" /> Retry
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {showSuggestions && (
                  <div className="space-y-1.5 pt-1">
                    <p className="text-xs text-gray-400 px-1">Suggested questions:</p>
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="block w-full text-left text-xs bg-white border border-[#1a237e]/20 text-[#1a237e] rounded-lg px-3 py-2 hover:bg-[#1a237e]/5 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-sm px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="flex items-center gap-2 p-3 border-t border-gray-200 bg-white rounded-b-xl shrink-0">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message…"
                  className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1a237e]/30 focus:border-[#1a237e] bg-gray-50"
                  disabled={isLoading}
                  maxLength={500}
                />
                <button
                  onClick={() => sendMessage()}
                  disabled={isLoading || !input.trim()}
                  className="p-2.5 bg-[#1a237e] text-white rounded-full hover:bg-[#0d1453] disabled:opacity-40 transition-all hover:scale-105 disabled:hover:scale-100"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

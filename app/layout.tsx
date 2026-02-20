
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { FixedChatbot } from '@/components/fixed-chatbot'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eburutu Mart - Connect | Shop | Celebrate',
  description: 'The premier marketplace for African diaspora community. Connect with your heritage, shop authentic African products, and celebrate African culture worldwide.',
  keywords: 'Eburutu Mart, African marketplace, diaspora, African products, cultural marketplace, African community',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://apps.abacus.ai/chatllm/appllm-lib.js" />
      </head>
      <body className={inter.className}>
        <Providers>
          {children}
          <FixedChatbot />
        </Providers>
      </body>
    </html>
  )
}

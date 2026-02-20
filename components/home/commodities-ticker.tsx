'use client'

import { useState, useEffect, useRef } from 'react'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface Commodity {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  currency: string
}

const initialCommodities: Commodity[] = [
  { symbol: 'COCOA', name: 'Cocoa', price: 8245.00, change: 125.50, changePercent: 1.55, currency: 'USD' },
  { symbol: 'COFFEE', name: 'Coffee', price: 245.35, change: -3.20, changePercent: -1.29, currency: 'USD' },
  { symbol: 'GOLD', name: 'Gold', price: 2035.80, change: 12.40, changePercent: 0.61, currency: 'USD' },
  { symbol: 'CRUDE', name: 'Brent Crude', price: 78.45, change: 1.85, changePercent: 2.42, currency: 'USD' },
  { symbol: 'PALM', name: 'Palm Oil', price: 3890.00, change: -45.00, changePercent: -1.14, currency: 'MYR' },
  { symbol: 'COTTON', name: 'Cotton', price: 82.75, change: 0.45, changePercent: 0.55, currency: 'USD' },
  { symbol: 'CASHEW', name: 'Cashew Nuts', price: 1250.00, change: 35.00, changePercent: 2.88, currency: 'USD' },
  { symbol: 'RUBBER', name: 'Rubber', price: 156.30, change: -2.10, changePercent: -1.33, currency: 'USD' },
  { symbol: 'TEA', name: 'Tea', price: 2.85, change: 0.05, changePercent: 1.79, currency: 'USD' },
  { symbol: 'SUGAR', name: 'Sugar', price: 23.45, change: 0.00, changePercent: 0.00, currency: 'USD' },
  { symbol: 'NGN', name: 'Naira/USD', price: 1520.50, change: -15.30, changePercent: -1.00, currency: '' },
  { symbol: 'GHS', name: 'Cedi/USD', price: 12.85, change: 0.12, changePercent: 0.94, currency: '' },
  { symbol: 'KES', name: 'Shilling/USD', price: 154.20, change: -0.80, changePercent: -0.52, currency: '' },
  { symbol: 'ZAR', name: 'Rand/USD', price: 18.95, change: 0.25, changePercent: 1.34, currency: '' },
]

export function CommoditiesTicker() {
  const [commodities, setCommodities] = useState<Commodity[]>(initialCommodities)
  const tickerRef = useRef<HTMLDivElement>(null)

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCommodities(prev => prev.map(commodity => {
        const randomChange = (Math.random() - 0.5) * commodity.price * 0.002
        const newPrice = commodity.price + randomChange
        const newChange = commodity.change + randomChange
        const newChangePercent = (newChange / (commodity.price - commodity.change)) * 100
        
        return {
          ...commodity,
          price: Math.round(newPrice * 100) / 100,
          change: Math.round(newChange * 100) / 100,
          changePercent: Math.round(newChangePercent * 100) / 100,
        }
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-green-500'
    if (change < 0) return 'text-red-500'
    return 'text-gray-400'
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-3 w-3" />
    if (change < 0) return <TrendingDown className="h-3 w-3" />
    return <Minus className="h-3 w-3" />
  }

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'USD') return `$${price.toLocaleString()}`
    if (currency === 'MYR') return `RM${price.toLocaleString()}`
    return price.toLocaleString()
  }

  // Duplicate commodities for seamless loop
  const tickerItems = [...commodities, ...commodities]

  return (
    <div className="bg-[#1a237e] text-white py-2 overflow-hidden">
      <div className="flex items-center">
        <div className="flex-shrink-0 bg-[#00c853] px-4 py-1 text-sm font-semibold z-10">
          LIVE COMMODITIES
        </div>
        <div className="flex-1 overflow-hidden">
          <div 
            ref={tickerRef}
            className="flex animate-ticker whitespace-nowrap"
            style={{
              animation: 'ticker 60s linear infinite',
            }}
          >
            {tickerItems.map((commodity, index) => (
              <div 
                key={`${commodity.symbol}-${index}`}
                className="inline-flex items-center space-x-2 px-6 border-r border-white/20"
              >
                <span className="font-semibold text-yellow-400">{commodity.symbol}</span>
                <span className="text-white/90">{commodity.name}</span>
                <span className="font-medium">{formatPrice(commodity.price, commodity.currency)}</span>
                <span className={`flex items-center space-x-1 ${getChangeColor(commodity.change)}`}>
                  {getChangeIcon(commodity.change)}
                  <span>{commodity.change >= 0 ? '+' : ''}{commodity.change.toFixed(2)}</span>
                  <span>({commodity.changePercent >= 0 ? '+' : ''}{commodity.changePercent.toFixed(2)}%)</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-ticker {
          animation: ticker 60s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}

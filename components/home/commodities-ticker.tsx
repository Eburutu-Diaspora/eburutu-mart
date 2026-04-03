'use client'

import { useState, useEffect } from 'react'
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
  const [mounted, setMounted] = useState(false)
  const [commodities, setCommodities] = useState<Commodity[]>(initialCommodities)

  useEffect(() => {
    setMounted(true)
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
    if (change > 0) return '#22c55e'
    if (change < 0) return '#ef4444'
    return '#9ca3af'
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp style={{ width: 12, height: 12, display: 'inline' }} />
    if (change < 0) return <TrendingDown style={{ width: 12, height: 12, display: 'inline' }} />
    return <Minus style={{ width: 12, height: 12, display: 'inline' }} />
  }

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'USD') return `$${price.toLocaleString()}`
    if (currency === 'MYR') return `RM${price.toLocaleString()}`
    return price.toLocaleString()
  }

  const tickerItems = [...commodities, ...commodities]

  return (
    <div style={{
      backgroundColor: '#1a237e',
      color: 'white',
      height: '36px',
      maxHeight: '36px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    }}>
      <div style={{
        flexShrink: 0,
        backgroundColor: '#00c853',
        padding: '0 16px',
        fontSize: '12px',
        fontWeight: 700,
        whiteSpace: 'nowrap',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
      }}>
        LIVE COMMODITIES
      </div>

      {mounted && (
        <div style={{ flex: 1, minWidth: 0, overflow: 'hidden', height: '100%', display: 'flex', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            animation: 'eburutu-ticker 60s linear infinite',
          }}>
            {tickerItems.map((commodity, index) => (
              <div
                key={`${commodity.symbol}-${index}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '0 20px',
                  borderRight: '1px solid rgba(255,255,255,0.2)',
                  flexShrink: 0,
                  fontSize: '12px',
                }}
              >
                <span style={{ fontWeight: 700, color: '#facc15' }}>{commodity.symbol}</span>
                <span style={{ color: 'rgba(255,255,255,0.85)' }}>{commodity.name}</span>
                <span>{formatPrice(commodity.price, commodity.currency)}</span>
                <span style={{ color: getChangeColor(commodity.change), display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                  {getChangeIcon(commodity.change)}
                  {commodity.change >= 0 ? '+' : ''}{commodity.change.toFixed(2)}({commodity.changePercent >= 0 ? '+' : ''}{commodity.changePercent.toFixed(2)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`@keyframes eburutu-ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </div>
  )
}


'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Users,
  Store,
  Package,
  MessageCircle,
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle,
  Loader2,
} from 'lucide-react'
import Link from 'next/link'

interface AdminStats {
  totalUsers: number
  totalSellers: number
  totalProducts: number
  totalMessages: number
}

interface PendingTopic {
  id: string
  title: string
  content: string
  createdAt: string
  author: { id: string; name: string | null; email: string }
  category: { name: string; color: string }
}

interface PendingReply {
  id: string
  content: string
  createdAt: string
  author: { id: string; name: string | null; email: string }
  topic: { id: string; title: string }
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return mins + 'm ago'
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return hrs + 'h ago'
  return Math.floor(hrs / 24) + 'd ago'
}

export function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'community'>('overview')
  const [pendingTopics, setPendingTopics] = useState<PendingTopic[]>([])
  const [pendingReplies, setPendingReplies] = useState<PendingReply[]>([])
  const [communityLoading, setCommunityLoading] = useState(false)
  const [moderating, setModerating] = useState<string | null>(null)

  useEffect(() => { fetchAdminStats() }, [])

  const fetchAdminStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching admin stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCommunityQueue = useCallback(async () => {
    setCommunityLoading(true)
    try {
      const res = await fetch('/api/admin/community')
      const data = await res.json()
      setPendingTopics(data.pendingTopics || [])
      setPendingReplies(data.pendingReplies || [])
    } catch {
      setPendingTopics([])
      setPendingReplies([])
    } finally {
      setCommunityLoading(false)
    }
  }, [])

  useEffect(() => {
    if (activeTab === 'community') fetchCommunityQueue()
  }, [activeTab, fetchCommunityQueue])

  const moderate = async (type: 'topic' | 'reply', id: string, action: 'approve' | 'reject') => {
    setModerating(id)
    try {
      await fetch('/api/admin/community', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id, action })
      })
      if (type === 'topic') {
        setPendingTopics(prev => prev.filter(t => t.id !== id))
      } else {
        setPendingReplies(prev => prev.filter(r => r.id !== id))
      }
    } catch {
      alert('Action failed. Please try again.')
    } finally {
      setModerating(null)
    }
  }

  const adminStats = [
    { title: 'Total Users', value: stats?.totalUsers?.toString() || '0', icon: Users, color: 'from-blue-500 to-purple-500' },
    { title: 'Active Sellers', value: stats?.totalSellers?.toString() || '0', icon: Store, color: 'from-green-500 to-teal-500' },
    { title: 'Total Products', value: stats?.totalProducts?.toString() || '0', icon: Package, color: 'from-orange-500 to-red-500' },
    { title: 'Messages', value: stats?.totalMessages?.toString() || '0', icon: MessageCircle, color: 'from-yellow-500 to-amber-500' },
  ]

  const adminActions = [
    { title: 'Manage Users', description: 'View and manage user accounts', icon: Users, href: '/admin/users', color: 'from-blue-500 to-cyan-500' },
    { title: 'Product Moderation', description: 'Review and moderate listings', icon: Package, href: '/admin/products', color: 'from-purple-500 to-pink-500' },
    { title: 'Community Board', description: 'Approve discussions and replies', icon: MessageCircle, href: '#', color: 'from-green-500 to-emerald-500', onClick: () => setActiveTab('community') },
    { title: 'Platform Analytics', description: 'View marketplace statistics', icon: TrendingUp, href: '/admin/analytics', color: 'from-gray-500 to-slate-500' },
  ]

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your EburutuMart platform</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${activeTab === 'community' ? 'bg-primary text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
          >
            <MessageCircle className="w-4 h-4" />
            Community
            {(pendingTopics.length + pendingReplies.length) > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {pendingTopics.length + pendingReplies.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {adminStats.map((stat) => {
              const StatIcon = stat.icon
              return (
                <Card key={stat.title} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-3xl font-bold mt-1">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}>
                        <StatIcon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminActions.map((action) => {
              const ActionIcon = action.icon
              return (
                <Card key={action.title} className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
                  {action.onClick ? (
                    <CardContent className="p-6" onClick={action.onClick}>
                      <div className={`p-3 rounded-full bg-gradient-to-r ${action.color} w-fit mb-4`}>
                        <ActionIcon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold mb-2">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </CardContent>
                  ) : (
                    <Link href={action.href}>
                      <CardContent className="p-6">
                        <div className={`p-3 rounded-full bg-gradient-to-r ${action.color} w-fit mb-4`}>
                          <ActionIcon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold mb-2">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </CardContent>
                    </Link>
                  )}
                </Card>
              )
            })}
          </div>
        </>
      )}

      {activeTab === 'community' && (
        <div className="space-y-6">
          {communityLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">
                    Pending Discussions
                    {pendingTopics.length > 0 && (
                      <Badge className="ml-2 bg-amber-500">{pendingTopics.length}</Badge>
                    )}
                  </h2>
                  <button onClick={fetchCommunityQueue} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Refresh
                  </button>
                </div>
                {pendingTopics.length === 0 ? (
                  <Card>
                    <CardContent className="py-10 text-center">
                      <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
                      <p className="text-muted-foreground">No pending discussions. All caught up!</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {pendingTopics.map(topic => (
                      <Card key={topic.id} className="border-l-4 border-l-amber-400">
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: topic.category.color + '20', color: topic.category.color }}>
                                  {topic.category.name}
                                </span>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {timeAgo(topic.createdAt)}
                                </span>
                              </div>
                              <h3 className="font-semibold mb-1">{topic.title}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{topic.content}</p>
                              <p className="text-xs text-muted-foreground">
                                Posted by <strong>{topic.author.name || 'Unknown'}</strong> ({topic.author.email})
                              </p>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <button
                                onClick={() => moderate('topic', topic.id, 'approve')}
                                disabled={moderating === topic.id}
                                className="flex items-center gap-1.5 bg-green-600 hover:bg-green-500 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors disabled:opacity-60"
                              >
                                {moderating === topic.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle className="w-3 h-3" />}
                                Approve
                              </button>
                              <button
                                onClick={() => moderate('topic', topic.id, 'reject')}
                                disabled={moderating === topic.id}
                                className="flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors disabled:opacity-60"
                              >
                                {moderating === topic.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <XCircle className="w-3 h-3" />}
                                Reject
                              </button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">
                    Pending Replies
                    {pendingReplies.length > 0 && (
                      <Badge className="ml-2 bg-blue-500">{pendingReplies.length}</Badge>
                    )}
                  </h2>
                </div>
                {pendingReplies.length === 0 ? (
                  <Card>
                    <CardContent className="py-10 text-center">
                      <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
                      <p className="text-muted-foreground">No pending replies. All caught up!</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {pendingReplies.map(reply => (
                      <Card key={reply.id} className="border-l-4 border-l-blue-400">
                        <CardContent className="p-5">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className="text-xs text-muted-foreground">
                                  Reply to: <Link href={'/community/' + reply.topic.id} className="text-primary hover:underline">{reply.topic.title}</Link>
                                </span>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {timeAgo(reply.createdAt)}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-3 mb-2">{reply.content}</p>
                              <p className="text-xs text-muted-foreground">
                                By <strong>{reply.author.name || 'Unknown'}</strong> ({reply.author.email})
                              </p>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <button
                                onClick={() => moderate('reply', reply.id, 'approve')}
                                disabled={moderating === reply.id}
                                className="flex items-center gap-1.5 bg-green-600 hover:bg-green-500 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors disabled:opacity-60"
                              >
                                {moderating === reply.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle className="w-3 h-3" />}
                                Approve
                              </button>
                              <button
                                onClick={() => moderate('reply', reply.id, 'reject')}
                                disabled={moderating === reply.id}
                                className="flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors disabled:opacity-60"
                              >
                                {moderating === reply.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <XCircle className="w-3 h-3" />}
                                Reject
                              </button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

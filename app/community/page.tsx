'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import {
  MessageCircle,
  Users,
  Globe,
  MapPin,
  Briefcase,
  Calendar,
  ShoppingBag,
  Utensils,
  ChevronUp,
  Eye,
  Clock,
  Send,
  X,
  CheckCircle,
  Loader2,
  Pin,
} from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
  color: string
  icon: string
  _count: { topics: number }
}

interface Topic {
  id: string
  title: string
  content: string
  isPinned: boolean
  viewCount: number
  createdAt: string
  author: { id: string; name: string | null; avatar: string | null }
  category: { id: string; name: string; slug: string; color: string }
  _count: { replies: number; votes: number }
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  MessageCircle,
  Users,
  Globe,
  MapPin,
  Briefcase,
  Calendar,
  ShoppingBag,
  Utensils,
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return mins + 'm ago'
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return hrs + 'h ago'
  return Math.floor(hrs / 24) + 'd ago'
}

function Avatar({ name, avatar, size = 32 }: { name: string | null; avatar: string | null; size?: number }) {
  const initials = (name || 'A').charAt(0).toUpperCase()
  const colors = ['#16a34a', '#8b5cf6', '#ef4444', '#f59e0b', '#3b82f6', '#14b8a6', '#f43f5e', '#64748b']
  const color = colors[(name || 'A').charCodeAt(0) % colors.length]
  if (avatar) {
    return <img src={avatar} alt={name || ''} style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }} />
  }
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.4, fontWeight: 500, color: 'white', flexShrink: 0 }}>
      {initials}
    </div>
  )
}

export default function CommunityPage() {
  const { data: session } = useSession()
  const [categories, setCategories] = useState<Category[]>([])
  const [topics, setTopics] = useState<Topic[]>([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [showNewTopic, setShowNewTopic] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [newCategoryId, setNewCategoryId] = useState('')
  const [postStatus, setPostStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [postError, setPostError] = useState('')
  const [votedTopics, setVotedTopics] = useState<Set<string>>(new Set())

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch('/api/community/categories')
      const data = await res.json()
      setCategories(Array.isArray(data) ? data : [])
    } catch {
      setCategories([])
    }
  }, [])

  const fetchTopics = useCallback(async () => {
    setIsLoading(true)
    try {
      const url = activeCategory === 'all'
        ? '/api/community/topics'
        : '/api/community/topics?category=' + activeCategory
      const res = await fetch(url)
      const data = await res.json()
      setTopics(Array.isArray(data.topics) ? data.topics : [])
    } catch {
      setTopics([])
    } finally {
      setIsLoading(false)
    }
  }, [activeCategory])

  useEffect(() => { fetchCategories() }, [fetchCategories])
  useEffect(() => { fetchTopics() }, [fetchTopics])

  const handleVote = async (topicId: string) => {
    if (!session) return
    try {
      const res = await fetch('/api/community/topics/' + topicId + '/vote', { method: 'POST' })
      const data = await res.json()
      setVotedTopics(prev => {
        const next = new Set(prev)
        if (data.voted) next.add(topicId)
        else next.delete(topicId)
        return next
      })
      setTopics(prev => prev.map(t => {
        if (t.id !== topicId) return t
        const delta = data.voted ? 1 : -1
        return { ...t, _count: { ...t._count, votes: t._count.votes + delta } }
      }))
    } catch {}
  }

  const handlePost = async () => {
    if (!newTitle.trim() || !newContent.trim() || !newCategoryId) {
      setPostError('Please fill in all fields')
      return
    }
    setPostStatus('loading')
    setPostError('')
    try {
      const res = await fetch('/api/community/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, content: newContent, categoryId: newCategoryId })
      })
      if (res.ok) {
        setPostStatus('success')
        setNewTitle('')
        setNewContent('')
        setNewCategoryId('')
        setTimeout(() => { setPostStatus('idle'); setShowNewTopic(false) }, 3000)
      } else {
        const d = await res.json()
        setPostError(d.error || 'Failed to post')
        setPostStatus('error')
      }
    } catch {
      setPostError('Something went wrong. Please try again.')
      setPostStatus('error')
    }
  }

  const totalTopics = categories.reduce((sum, c) => sum + (c._count?.topics || 0), 0)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-background-tertiary)' }}>
      <Header />
      <main style={{ flex: 1 }}>

        <div style={{ background: 'linear-gradient(135deg, #14532d, #166534, #d97706)', color: 'white', padding: '2rem 1.5rem' }}>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.75rem' }}>
              <div style={{ width: 8, height: 8, background: '#86efac', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />
              <span style={{ fontSize: 12, opacity: 0.85 }}>Live community discussions</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 500, marginBottom: '0.4rem' }}>
                  The Diaspora <span style={{ color: '#fde047' }}>Community Board</span>
                </h1>
                <p style={{ fontSize: 13, opacity: 0.8, maxWidth: 480, lineHeight: 1.6 }}>
                  Real conversations by and for the African diaspora. Share experiences, ask questions, discover resources.
                </p>
              </div>
              <button
                onClick={() => session ? setShowNewTopic(true) : window.location.href = '/auth/login'}
                style={{ background: '#fde047', color: '#111', fontWeight: 500, padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}
              >
                <MessageCircle style={{ width: 15, height: 15 }} />
                Start a Discussion
              </button>
            </div>
          </div>
        </div>

        {showNewTopic && (
          <div style={{ background: 'var(--color-background-primary)', borderBottom: '0.5px solid var(--color-border-tertiary)', padding: '1.25rem 1.5rem' }}>
            <div style={{ maxWidth: 900, margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h3 style={{ fontSize: 14, fontWeight: 500 }}>Start a new discussion</h3>
                <button onClick={() => { setShowNewTopic(false); setPostStatus('idle'); setPostError('') }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
                  <X style={{ width: 18, height: 18 }} />
                </button>
              </div>
              {postStatus === 'success' ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--color-background-success)', color: 'var(--color-text-success)', padding: '12px 16px', borderRadius: 8, fontSize: 13 }}>
                  <CheckCircle style={{ width: 16, height: 16 }} />
                  Your discussion has been submitted and is awaiting admin approval. Thank you!
                </div>
              ) : (
                <div style={{ display: 'grid', gap: 10 }}>
                  <input
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    placeholder="Discussion title..."
                    style={{ width: '100%', padding: '9px 12px', border: '0.5px solid var(--color-border-secondary)', borderRadius: 8, fontSize: 13, background: 'var(--color-background-secondary)', color: 'var(--color-text-primary)' }}
                  />
                  <select
                    value={newCategoryId}
                    onChange={e => setNewCategoryId(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', border: '0.5px solid var(--color-border-secondary)', borderRadius: 8, fontSize: 13, background: 'var(--color-background-secondary)', color: 'var(--color-text-primary)' }}
                  >
                    <option value="">Select a category...</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                  <textarea
                    value={newContent}
                    onChange={e => setNewContent(e.target.value)}
                    placeholder="Share your thoughts, questions or experiences..."
                    rows={4}
                    style={{ width: '100%', padding: '9px 12px', border: '0.5px solid var(--color-border-secondary)', borderRadius: 8, fontSize: 13, background: 'var(--color-background-secondary)', color: 'var(--color-text-primary)', resize: 'none', fontFamily: 'var(--font-sans)' }}
                  />
                  {postError && <p style={{ fontSize: 12, color: 'var(--color-text-danger)' }}>{postError}</p>}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>Your post will be reviewed before appearing publicly</span>
                    <button
                      onClick={handlePost}
                      disabled={postStatus === 'loading'}
                      style={{ background: '#16a34a', color: 'white', fontWeight: 500, padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6, opacity: postStatus === 'loading' ? 0.7 : 1 }}
                    >
                      {postStatus === 'loading' ? <Loader2 style={{ width: 14, height: 14 }} /> : <Send style={{ width: 14, height: 14 }} />}
                      Post Discussion
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div style={{ maxWidth: 900, margin: '0 auto', padding: '1.25rem 1.5rem', display: 'grid', gridTemplateColumns: '190px 1fr', gap: 16 }}>

          <aside>
            <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 10, overflow: 'hidden', marginBottom: 12 }}>
              <div style={{ padding: '10px 12px', borderBottom: '0.5px solid var(--color-border-tertiary)' }}>
                <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Categories</p>
              </div>
              <div style={{ padding: '6px 0' }}>
                <button
                  onClick={() => setActiveCategory('all')}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px', background: activeCategory === 'all' ? 'var(--color-background-secondary)' : 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: activeCategory === 'all' ? 'var(--color-text-primary)' : 'var(--color-text-secondary)', fontWeight: activeCategory === 'all' ? 500 : 400, textAlign: 'left' }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#16a34a', flexShrink: 0 }} />
                  All Topics
                  <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--color-text-tertiary)' }}>{totalTopics}</span>
                </button>
                {categories.map(cat => {
                  const IconComp = iconMap[cat.icon] || MessageCircle
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.slug)}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px', background: activeCategory === cat.slug ? 'var(--color-background-secondary)' : 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: activeCategory === cat.slug ? 'var(--color-text-primary)' : 'var(--color-text-secondary)', fontWeight: activeCategory === cat.slug ? 500 : 400, textAlign: 'left' }}
                    >
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: cat.color, flexShrink: 0 }} />
                      <span style={{ flex: 1, textAlign: 'left', fontSize: 12, lineHeight: 1.3 }}>{cat.name}</span>
                      <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>{cat._count?.topics || 0}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 10, padding: '12px' }}>
              <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Community rules</p>
              {['Be respectful', 'No spam or ads', 'Stay on topic', 'Protect privacy', 'English or native languages welcome'].map((rule, i) => (
                <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6, fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                  <span style={{ color: '#16a34a', fontWeight: 500, flexShrink: 0 }}>{i + 1}.</span>
                  {rule}
                </div>
              ))}
            </div>
          </aside>

          <div>
            {isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem', color: 'var(--color-text-tertiary)' }}>
                <Loader2 style={{ width: 24, height: 24, animation: 'spin 1s linear infinite' }} />
              </div>
            ) : topics.length === 0 ? (
              <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 10, padding: '3rem', textAlign: 'center' }}>
                <MessageCircle style={{ width: 40, height: 40, color: 'var(--color-text-tertiary)', margin: '0 auto 1rem' }} />
                <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 6 }}>No discussions yet in this category</p>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>Be the first to start a conversation</p>
                <button
                  onClick={() => session ? setShowNewTopic(true) : window.location.href = '/auth/login'}
                  style={{ background: '#16a34a', color: 'white', fontWeight: 500, padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13 }}
                >
                  Start a Discussion
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {topics.map(topic => (
                  <div
                    key={topic.id}
                    style={{ background: 'var(--color-background-primary)', border: topic.isPinned ? '0.5px solid var(--color-border-success)' : '0.5px solid var(--color-border-tertiary)', borderRadius: 10, padding: '12px 14px', display: 'grid', gridTemplateColumns: '38px 1fr', gap: 10 }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <button
                        onClick={() => handleVote(topic.id)}
                        style={{ width: 32, height: 28, border: '0.5px solid', borderColor: votedTopics.has(topic.id) ? 'var(--color-border-success)' : 'var(--color-border-tertiary)', borderRadius: 6, background: votedTopics.has(topic.id) ? 'var(--color-background-success)' : 'none', cursor: session ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', color: votedTopics.has(topic.id) ? 'var(--color-text-success)' : 'var(--color-text-secondary)', fontSize: 12 }}
                        title={session ? 'Upvote' : 'Sign in to vote'}
                      >
                        <ChevronUp style={{ width: 14, height: 14 }} />
                      </button>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{topic._count.votes}</span>
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
                        {topic.isPinned && (
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 10, padding: '2px 7px', borderRadius: 999, background: 'var(--color-background-warning)', color: 'var(--color-text-warning)', fontWeight: 500 }}>
                            <Pin style={{ width: 10, height: 10 }} /> Pinned
                          </span>
                        )}
                        <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 999, fontWeight: 500, background: topic.category.color + '20', color: topic.category.color }}>
                          {topic.category.name}
                        </span>
                      </div>
                      <Link href={'/community/' + topic.id} style={{ textDecoration: 'none' }}>
                        <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 4, lineHeight: 1.4, cursor: 'pointer' }}>
                          {topic.title}
                        </p>
                      </Link>
                      <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: 8, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {topic.content}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, color: 'var(--color-text-tertiary)', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Avatar name={topic.author.name} avatar={topic.author.avatar} size={18} />
                          <span>{topic.author.name || 'Anonymous'}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                          <MessageCircle style={{ width: 12, height: 12 }} />
                          {topic._count.replies} {topic._count.replies === 1 ? 'reply' : 'replies'}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                          <Eye style={{ width: 12, height: 12 }} />
                          {topic.viewCount} views
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                          <Clock style={{ width: 12, height: 12 }} />
                          {timeAgo(topic.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!session && (
              <div style={{ background: 'var(--color-background-secondary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 10, padding: '1.25rem', textAlign: 'center', marginTop: 12 }}>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 10 }}>
                  <strong style={{ color: 'var(--color-text-primary)' }}>Join the conversation.</strong> Sign in or create a free account to post and reply.
                </p>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                  <Link href="/auth/login">
                    <button style={{ background: '#16a34a', color: 'white', fontWeight: 500, padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13 }}>Sign In</button>
                  </Link>
                  <Link href="/auth/register">
                    <button style={{ background: 'none', color: '#16a34a', fontWeight: 500, padding: '8px 18px', borderRadius: 8, border: '1px solid #16a34a', cursor: 'pointer', fontSize: 13 }}>Create Account</button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}} @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

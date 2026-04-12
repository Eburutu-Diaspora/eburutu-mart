'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/navigation/footer'
import {
  ChevronUp,
  MessageCircle,
  ArrowLeft,
  Send,
  Clock,
  Eye,
  Loader2,
  CheckCircle,
  Pin,
} from 'lucide-react'

interface Reply {
  id: string
  content: string
  createdAt: string
  author: { id: string; name: string | null; avatar: string | null }
  _count: { votes: number }
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
  replies: Reply[]
  _count: { votes: number }
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return mins + 'm ago'
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return hrs + 'h ago'
  return Math.floor(hrs / 24) + 'd ago'
}

function Avatar({ name, avatar, size = 36 }: { name: string | null; avatar: string | null; size?: number }) {
  const initials = (name || 'A').charAt(0).toUpperCase()
  const colors = ['#16a34a', '#8b5cf6', '#ef4444', '#f59e0b', '#3b82f6', '#14b8a6', '#f43f5e', '#64748b']
  const color = colors[(name || 'A').charCodeAt(0) % colors.length]
  if (avatar) {
    return <img src={avatar} alt={name || ''} style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
  }
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.38, fontWeight: 500, color: 'white', flexShrink: 0 }}>
      {initials}
    </div>
  )
}

export default function TopicPage() {
  const { data: session } = useSession()
  const params = useParams()
  const topicId = params.id as string

  const [topic, setTopic] = useState<Topic | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [replyStatus, setReplyStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [replyError, setReplyError] = useState('')
  const [voted, setVoted] = useState(false)
  const [voteCount, setVoteCount] = useState(0)

  const fetchTopic = useCallback(async () => {
    try {
      const res = await fetch('/api/community/topics/' + topicId)
      if (res.status === 404) { setNotFound(true); return }
      const data = await res.json()
      setTopic(data)
      setVoteCount(data._count?.votes || 0)
    } catch {
      setNotFound(true)
    } finally {
      setIsLoading(false)
    }
  }, [topicId])

  useEffect(() => { fetchTopic() }, [fetchTopic])

  const handleVote = async () => {
    if (!session) return
    try {
      const res = await fetch('/api/community/topics/' + topicId + '/vote', { method: 'POST' })
      const data = await res.json()
      setVoted(data.voted)
      setVoteCount(prev => prev + (data.voted ? 1 : -1))
    } catch {}
  }

  const handleReply = async () => {
    if (!replyContent.trim()) {
      setReplyError('Please write something before posting')
      return
    }
    setReplyStatus('loading')
    setReplyError('')
    try {
      const res = await fetch('/api/community/topics/' + topicId + '/replies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: replyContent })
      })
      if (res.ok) {
        setReplyStatus('success')
        setReplyContent('')
        setTimeout(() => setReplyStatus('idle'), 4000)
      } else {
        const d = await res.json()
        setReplyError(d.error || 'Failed to post reply')
        setReplyStatus('error')
      }
    } catch {
      setReplyError('Something went wrong. Please try again.')
      setReplyStatus('error')
    }
  }

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Loader2 style={{ width: 28, height: 28, color: 'var(--color-text-tertiary)', animation: 'spin 1s linear infinite' }} />
        </main>
        <Footer />
        <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      </div>
    )
  }

  if (notFound || !topic) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, padding: '2rem' }}>
          <MessageCircle style={{ width: 40, height: 40, color: 'var(--color-text-tertiary)' }} />
          <p style={{ fontSize: 15, fontWeight: 500 }}>Discussion not found</p>
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>This topic may have been removed or is awaiting approval.</p>
          <Link href="/community">
            <button style={{ background: '#16a34a', color: 'white', fontWeight: 500, padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13 }}>Back to Community</button>
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-background-tertiary)' }}>
      <Header />
      <main style={{ flex: 1 }}>

        <div style={{ background: 'var(--color-background-primary)', borderBottom: '0.5px solid var(--color-border-tertiary)', padding: '0.75rem 1.5rem' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <Link href="/community" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13, color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
              <ArrowLeft style={{ width: 14, height: 14 }} />
              Back to Community Board
            </Link>
          </div>
        </div>

        <div style={{ maxWidth: 800, margin: '0 auto', padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: 12 }}>

          <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 10, padding: '1.25rem 1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
              {topic.isPinned && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 10, padding: '2px 7px', borderRadius: 999, background: 'var(--color-background-warning)', color: 'var(--color-text-warning)', fontWeight: 500 }}>
                  <Pin style={{ width: 10, height: 10 }} /> Pinned
                </span>
              )}
              <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, fontWeight: 500, background: topic.category.color + '20', color: topic.category.color }}>
                {topic.category.name}
              </span>
            </div>

            <h1 style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: '1rem', lineHeight: 1.4 }}>{topic.title}</h1>

            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <Avatar name={topic.author.name} avatar={topic.author.avatar} size={36} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{topic.author.name || 'Anonymous'}</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 11, color: 'var(--color-text-tertiary)' }}>
                    <Clock style={{ width: 11, height: 11 }} />
                    {timeAgo(topic.createdAt)}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 11, color: 'var(--color-text-tertiary)' }}>
                    <Eye style={{ width: 11, height: 11 }} />
                    {topic.viewCount} views
                  </span>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--color-text-primary)', whiteSpace: 'pre-wrap' }}>{topic.content}</p>
              </div>
            </div>

            <div style={{ borderTop: '0.5px solid var(--color-border-tertiary)', marginTop: '1rem', paddingTop: '0.75rem', display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                onClick={handleVote}
                title={session ? 'Upvote this discussion' : 'Sign in to vote'}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 12px', border: '0.5px solid', borderColor: voted ? 'var(--color-border-success)' : 'var(--color-border-tertiary)', borderRadius: 8, background: voted ? 'var(--color-background-success)' : 'none', color: voted ? 'var(--color-text-success)' : 'var(--color-text-secondary)', cursor: session ? 'pointer' : 'default', fontSize: 13 }}
              >
                <ChevronUp style={{ width: 15, height: 15 }} />
                {voteCount} {voteCount === 1 ? 'upvote' : 'upvotes'}
              </button>
              <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <MessageCircle style={{ width: 13, height: 13 }} />
                {topic.replies.length} {topic.replies.length === 1 ? 'reply' : 'replies'}
              </span>
            </div>
          </div>

          {topic.replies.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {topic.replies.length} {topic.replies.length === 1 ? 'Reply' : 'Replies'}
              </p>
              {topic.replies.map((reply, index) => (
                <div key={reply.id} style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 10, padding: '1rem 1.25rem' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <Avatar name={reply.author.name} avatar={reply.author.avatar} size={30} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 500 }}>{reply.author.name || 'Anonymous'}</span>
                        <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                          <Clock style={{ width: 10, height: 10 }} />
                          {timeAgo(reply.createdAt)}
                        </span>
                        <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>#{index + 1}</span>
                      </div>
                      <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--color-text-primary)', whiteSpace: 'pre-wrap' }}>{reply.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ background: 'var(--color-background-primary)', border: '0.5px solid var(--color-border-tertiary)', borderRadius: 10, padding: '1.25rem 1.5rem' }}>
            <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 12 }}>
              {session ? 'Post a reply' : 'Join the conversation'}
            </h3>
            {!session ? (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 12 }}>Sign in or create a free account to reply to this discussion.</p>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                  <Link href="/auth/login">
                    <button style={{ background: '#16a34a', color: 'white', fontWeight: 500, padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13 }}>Sign In</button>
                  </Link>
                  <Link href="/auth/register">
                    <button style={{ background: 'none', color: '#16a34a', fontWeight: 500, padding: '8px 18px', borderRadius: 8, border: '1px solid #16a34a', cursor: 'pointer', fontSize: 13 }}>Create Account</button>
                  </Link>
                </div>
              </div>
            ) : replyStatus === 'success' ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--color-background-success)', color: 'var(--color-text-success)', padding: '12px 16px', borderRadius: 8, fontSize: 13 }}>
                <CheckCircle style={{ width: 16, height: 16 }} />
                Your reply has been submitted and is awaiting admin approval. Thank you!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <Avatar name={session.user?.name || null} avatar={session.user?.image || null} size={30} />
                  <textarea
                    value={replyContent}
                    onChange={e => { setReplyContent(e.target.value); setReplyError('') }}
                    placeholder="Share your thoughts on this discussion..."
                    rows={4}
                    style={{ flex: 1, padding: '9px 12px', border: '0.5px solid var(--color-border-secondary)', borderRadius: 8, fontSize: 13, background: 'var(--color-background-secondary)', color: 'var(--color-text-primary)', resize: 'none', fontFamily: 'var(--font-sans)' }}
                  />
                </div>
                {replyError && <p style={{ fontSize: 12, color: 'var(--color-text-danger)' }}>{replyError}</p>}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>Replies are reviewed before appearing publicly</span>
                  <button
                    onClick={handleReply}
                    disabled={replyStatus === 'loading'}
                    style={{ background: '#16a34a', color: 'white', fontWeight: 500, padding: '8px 18px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 6, opacity: replyStatus === 'loading' ? 0.7 : 1 }}
                  >
                    {replyStatus === 'loading' ? <Loader2 style={{ width: 14, height: 14 }} /> : <Send style={{ width: 14, height: 14 }} />}
                    Post Reply
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
      <Footer />
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

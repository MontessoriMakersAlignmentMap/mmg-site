'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import EmptyState from '../../components/EmptyState'

export default function CommunityBoardPage() {
  const [profile, setProfile] = useState<any>(null)
  const [cohortId, setCohortId] = useState('')
  const [posts, setPosts] = useState<any[]>([])
  const [replies, setReplies] = useState<Record<string, any[]>>({})
  const [loading, setLoading] = useState(true)
  const [showAsk, setShowAsk] = useState(false)
  const [form, setForm] = useState({ title: '', body: '' })
  const [creating, setCreating] = useState(false)
  const [replyForm, setReplyForm] = useState<Record<string, string>>({})
  const [replyingTo, setReplyingTo] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: prof } = await supabase.from('residency_profiles').select('*').eq('id', user.id).single()
      setProfile(prof)

      const { data: resident } = await supabase
        .from('residency_residents')
        .select('cohort_id')
        .eq('profile_id', user.id)
        .single()

      if (resident?.cohort_id) {
        setCohortId(resident.cohort_id)

        const { data: postData } = await supabase
          .from('residency_cohort_posts')
          .select('*, author:residency_profiles(first_name, last_name)')
          .eq('cohort_id', resident.cohort_id)
          .is('deleted_at', null)
          .order('pinned', { ascending: false })
          .order('created_at', { ascending: false })

        if (postData) {
          setPosts(postData)

          // Load replies for all posts
          const postIds = postData.map(p => p.id)
          if (postIds.length > 0) {
            const { data: replyData } = await supabase
              .from('residency_post_replies')
              .select('*, author:residency_profiles(first_name, last_name)')
              .in('post_id', postIds)
              .is('deleted_at', null)
              .order('created_at')

            const grouped: Record<string, any[]> = {}
            for (const r of replyData || []) {
              if (!grouped[r.post_id]) grouped[r.post_id] = []
              grouped[r.post_id].push(r)
            }
            setReplies(grouped)
          }
        }
      }
      setLoading(false)
    }
    load()
  }, [])

  async function loadPosts() {
    const { data: postData } = await supabase
      .from('residency_cohort_posts')
      .select('*, author:residency_profiles(first_name, last_name, role)')
      .eq('cohort_id', cohortId)
      .is('deleted_at', null)
      .order('pinned', { ascending: false })
      .order('created_at', { ascending: false })
    setPosts(postData || [])

    const replyMap: Record<string, any[]> = {}
    for (const p of postData || []) {
      const { data: r } = await supabase
        .from('residency_post_replies')
        .select('*, author:residency_profiles(first_name, last_name, role)')
        .eq('post_id', p.id)
        .is('deleted_at', null)
        .order('created_at')
      replyMap[p.id] = r || []
    }
    setReplies(replyMap)
  }

  async function askQuestion() {
    if (!form.title || !form.body || !profile) return
    setCreating(true)
    const { error } = await supabase.from('residency_cohort_posts').insert({
      cohort_id: cohortId,
      author_id: profile.id,
      author_role: profile.role,
      post_type: 'question',
      title: form.title,
      body: form.body,
    })
    if (!error) {
      setForm({ title: '', body: '' })
      setShowAsk(false)
      await loadPosts()
    }
    setCreating(false)
  }

  async function submitReply(postId: string) {
    const body = replyForm[postId]
    if (!body?.trim() || !profile) return
    const { error } = await supabase.from('residency_post_replies').insert({
      post_id: postId,
      author_id: profile.id,
      author_role: profile.role,
      body: body.trim(),
    })
    if (!error) {
      setReplyForm(prev => ({ ...prev, [postId]: '' }))
      setReplyingTo(null)
      await loadPosts()
    }
  }

  async function deleteOwnPost(postId: string) {
    if (!confirm('Delete this post? This cannot be undone.')) return
    await supabase.from('residency_cohort_posts').update({ deleted_at: new Date().toISOString() }).eq('id', postId).eq('author_id', profile.id)
    await loadPosts()
  }

  async function deleteOwnReply(replyId: string) {
    if (!confirm('Delete this reply?')) return
    await supabase.from('residency_post_replies').update({ deleted_at: new Date().toISOString() }).eq('id', replyId).eq('author_id', profile.id)
    await loadPosts()
  }

  if (loading) return <div className="r-loading" role="status"><span>Loading</span><span className="r-loading-dot"><span></span><span></span><span></span></span></div>

  const announcements = posts.filter(p => p.post_type === 'announcement')
  const questions = posts.filter(p => p.post_type === 'question' && !p.resolved)
  const resolved = posts.filter(p => p.post_type === 'question' && p.resolved)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>Community Board</h1>
          <p style={{ color: 'var(--r-text-muted)', fontSize: '0.875rem' }}>
            Announcements and questions from your cohort.
          </p>
        </div>
        <button className="r-btn r-btn-primary" onClick={() => setShowAsk(!showAsk)}>
          {showAsk ? 'Cancel' : 'Ask a Question'}
        </button>
      </div>

      {showAsk && (
        <div className="r-card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Ask the Community</h2>
          <div style={{ marginBottom: '1rem' }}>
            <input className="r-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Your question (title)" />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <textarea className="r-textarea" value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} rows={3} placeholder="More details about your question..." />
          </div>
          <button className="r-btn r-btn-primary" onClick={askQuestion} disabled={creating || !form.title || !form.body}>
            {creating ? 'Posting...' : 'Post Question'}
          </button>
        </div>
      )}

      {posts.length === 0 ? (
        <EmptyState title="Nothing here yet" message="Your instructor will post announcements, and you can ask questions." />
      ) : (
        <>
          {announcements.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              {announcements.map(p => (
                <div key={p.id} className="r-card" style={{
                  marginBottom: '0.75rem', borderLeft: p.pinned ? '3px solid var(--r-gold)' : undefined,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div>
                      {p.pinned && <span style={{ fontSize: '0.5625rem', fontWeight: 600, color: 'var(--r-gold)', textTransform: 'uppercase', marginRight: '0.375rem' }}>Pinned</span>}
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, display: 'inline', margin: 0 }}>{p.title}</h3>
                    </div>
                    <span style={{ fontSize: '0.625rem', color: 'var(--r-text-muted)', flexShrink: 0 }}>
                      {new Date(p.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginBottom: '0.5rem' }}>
                    {p.author?.first_name} {p.author?.last_name} &middot; Instructor
                  </p>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{p.body}</p>
                </div>
              ))}
            </div>
          )}

          {questions.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.75rem' }}>
                Open Questions ({questions.length})
              </h2>
              {questions.map(p => (
                <PostWithReplies
                  key={p.id}
                  post={p}
                  replies={replies[p.id] || []}
                  profile={profile}
                  replyForm={replyForm}
                  setReplyForm={setReplyForm}
                  replyingTo={replyingTo}
                  setReplyingTo={setReplyingTo}
                  submitReply={submitReply}
                  deleteOwnPost={deleteOwnPost}
                  deleteOwnReply={deleteOwnReply}
                />
              ))}
            </div>
          )}

          {resolved.length > 0 && (
            <div>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--r-text-muted)', marginBottom: '0.75rem' }}>
                Answered ({resolved.length})
              </h2>
              {resolved.map(p => (
                <PostWithReplies
                  key={p.id}
                  post={p}
                  replies={replies[p.id] || []}
                  profile={profile}
                  replyForm={replyForm}
                  setReplyForm={setReplyForm}
                  replyingTo={replyingTo}
                  setReplyingTo={setReplyingTo}
                  submitReply={submitReply}
                  deleteOwnPost={deleteOwnPost}
                  deleteOwnReply={deleteOwnReply}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

function PostWithReplies({
  post, replies, profile, replyForm, setReplyForm, replyingTo, setReplyingTo, submitReply, deleteOwnPost, deleteOwnReply,
}: any) {
  const isAuthor = profile?.id === post.author_id

  return (
    <div className="r-card" style={{ marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>
          {post.resolved && <span style={{ fontSize: '0.625rem', color: 'var(--r-success)', marginRight: '0.375rem' }}>ANSWERED</span>}
          {post.title}
        </h3>
        <span style={{ fontSize: '0.625rem', color: 'var(--r-text-muted)', flexShrink: 0 }}>
          {new Date(post.created_at).toLocaleDateString()}
        </span>
      </div>
      <p style={{ fontSize: '0.75rem', color: 'var(--r-text-muted)', marginBottom: '0.5rem' }}>
        {post.author?.first_name} {post.author?.last_name}
      </p>
      <p style={{ fontSize: '0.875rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{post.body}</p>

      {/* Replies */}
      {replies.length > 0 && (
        <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--r-border)' }}>
          {replies.map((r: any) => (
            <div key={r.id} style={{ marginBottom: '0.625rem', paddingLeft: '1rem', borderLeft: '2px solid var(--r-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--r-text-muted)' }}>
                  {r.author?.first_name} {r.author?.last_name}
                  {r.author_role === 'instructor' && <span style={{ color: 'var(--r-navy)', marginLeft: '0.25rem' }}>(Instructor)</span>}
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.625rem', color: 'var(--r-text-muted)' }}>{new Date(r.created_at).toLocaleDateString()}</span>
                  {profile?.id === r.author_id && (
                    <button onClick={() => deleteOwnReply(r.id)} style={{ fontSize: '0.625rem', color: '#c62828', background: 'none', border: 'none', cursor: 'pointer' }}>
                      Delete
                    </button>
                  )}
                </div>
              </div>
              <p style={{ fontSize: '0.8125rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{r.body}</p>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <button onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}
          style={{ fontSize: '0.6875rem', color: 'var(--r-navy)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
          Reply
        </button>
        {isAuthor && (
          <button onClick={() => deleteOwnPost(post.id)} style={{ fontSize: '0.6875rem', color: '#c62828', background: 'none', border: 'none', cursor: 'pointer' }}>
            Delete
          </button>
        )}
      </div>

      {replyingTo === post.id && (
        <div style={{ marginTop: '0.625rem', display: 'flex', gap: '0.5rem' }}>
          <input
            className="r-input"
            style={{ fontSize: '0.8125rem', flex: 1 }}
            value={replyForm[post.id] || ''}
            onChange={e => setReplyForm({ ...replyForm, [post.id]: e.target.value })}
            placeholder="Write a reply..."
            onKeyDown={e => { if (e.key === 'Enter') submitReply(post.id) }}
          />
          <button className="r-btn r-btn-primary" style={{ fontSize: '0.75rem' }} onClick={() => submitReply(post.id)}>
            Send
          </button>
        </div>
      )}
    </div>
  )
}

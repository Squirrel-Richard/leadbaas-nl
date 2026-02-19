'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function InloggenPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Onjuist emailadres of wachtwoord')
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--bg)' }}>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="orb absolute w-96 h-96 opacity-10" style={{ background: '#6366f1', top: '-10%', right: '-10%' }} />
      </div>
      <div className="glass p-8 w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="text-xl font-black gradient-text">LeadBaas.nl</Link>
          <h1 className="text-2xl font-black mt-4 mb-2">Inloggen</h1>
          <p className="text-gray-400 text-sm">Welkom terug</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Email</label>
            <input className="input" type="email" placeholder="jij@bedrijf.nl" value={email}
              onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Wachtwoord</label>
            <input className="input" type="password" placeholder="••••••••" value={password}
              onChange={e => setPassword(e.target.value)} required />
          </div>

          {error && (
            <div className="text-red-400 text-sm p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)' }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading}
            className="btn-primary w-full py-3 text-sm font-semibold disabled:opacity-50">
            {loading ? 'Inloggen...' : 'Inloggen →'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500 space-y-2">
          <div>Nog geen account?{' '}
            <Link href="/aanmelden" className="text-indigo-400 hover:text-indigo-300">Aanmelden</Link>
          </div>
          <div>
            <Link href="/wachtwoord-vergeten" className="text-gray-600 hover:text-gray-400 text-xs">Wachtwoord vergeten?</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

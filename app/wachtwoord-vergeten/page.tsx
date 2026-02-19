'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function WachtwoordVergetenPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?next=/dashboard/instellingen`,
    })
    setSent(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--bg)' }}>
      <div className="glass p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-xl font-black gradient-text">LeadBaas.nl</Link>
          <h1 className="text-2xl font-black mt-4 mb-2">Wachtwoord vergeten</h1>
        </div>
        {sent ? (
          <div className="text-center">
            <div className="text-4xl mb-4">📬</div>
            <p className="text-gray-300 mb-4">Check je email voor de resetlink.</p>
            <Link href="/inloggen" className="text-indigo-400 hover:text-indigo-300 text-sm">← Terug naar inloggen</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Email</label>
              <input className="input" type="email" placeholder="jij@bedrijf.nl" value={email}
                onChange={e => setEmail(e.target.value)} required />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-sm disabled:opacity-50">
              {loading ? 'Versturen...' : 'Resetlink versturen →'}
            </button>
            <div className="text-center">
              <Link href="/inloggen" className="text-gray-500 text-sm hover:text-gray-300">← Terug</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

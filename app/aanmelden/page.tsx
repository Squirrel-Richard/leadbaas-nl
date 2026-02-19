'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function AanmeldenForm() {
  const searchParams = useSearchParams()
  const plan = searchParams.get('plan') || 'gratis'
  const emailParam = searchParams.get('email') || ''

  const [email, setEmail] = useState(emailParam)
  const [password, setPassword] = useState('')
  const [naam, setNaam] = useState('')
  const [bedrijf, setBedrijf] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: naam, company_name: bedrijf, plan },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="text-5xl mb-4">📬</div>
        <h2 className="text-2xl font-black mb-3">Check je email!</h2>
        <p className="text-gray-400 mb-6">We hebben een bevestigingslink gestuurd naar <span className="text-white font-semibold">{email}</span></p>
        <Link href="/" className="text-indigo-400 hover:text-indigo-300 text-sm">← Terug naar home</Link>
      </div>
    )
  }

  return (
    <>
      <div className="text-center mb-8">
        <Link href="/" className="text-xl font-black gradient-text">LeadBaas.nl</Link>
        <h1 className="text-2xl font-black mt-4 mb-2">Account aanmaken</h1>
        <p className="text-gray-400 text-sm">
          {plan === 'gratis' ? '14 dagen gratis proberen, geen creditcard nodig' :
           plan === 'solo' ? '14 dagen gratis, daarna €29/maand' : '14 dagen gratis, daarna €79/maand'}
        </p>
        {plan !== 'gratis' && (
          <div className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8' }}>
            Plan: {plan.charAt(0).toUpperCase() + plan.slice(1)}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Je naam *</label>
          <input className="input" type="text" placeholder="Jan de Vries" value={naam}
            onChange={e => setNaam(e.target.value)} required />
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Bedrijfsnaam</label>
          <input className="input" type="text" placeholder="Mijn BV" value={bedrijf}
            onChange={e => setBedrijf(e.target.value)} />
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Email *</label>
          <input className="input" type="email" placeholder="jij@bedrijf.nl" value={email}
            onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Wachtwoord *</label>
          <input className="input" type="password" placeholder="Minimaal 8 tekens" value={password}
            onChange={e => setPassword(e.target.value)} required minLength={8} />
        </div>

        {error && (
          <div className="text-red-400 text-sm p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)' }}>
            {error}
          </div>
        )}

        <button type="submit" disabled={loading}
          className="btn-primary w-full py-3 text-sm font-semibold disabled:opacity-50">
          {loading ? 'Bezig...' : 'Account aanmaken →'}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        Al een account?{' '}
        <Link href="/inloggen" className="text-indigo-400 hover:text-indigo-300">Inloggen</Link>
      </div>
      <div className="mt-4 text-center text-xs text-gray-600">
        Door je aan te melden ga je akkoord met onze{' '}
        <Link href="/privacy" className="underline">privacyverklaring</Link>
      </div>
    </>
  )
}

export default function AanmeldenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12" style={{ background: 'var(--bg)' }}>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="orb absolute w-96 h-96 opacity-10" style={{ background: '#6366f1', top: '-10%', left: '-10%' }} />
        <div className="orb-2 orb absolute w-64 h-64 opacity-08" style={{ background: '#10b981', bottom: '-5%', right: '-5%' }} />
      </div>
      <div className="glass p-8 w-full max-w-md relative z-10">
        <Suspense fallback={<div className="text-center text-gray-400">Laden...</div>}>
          <AanmeldenForm />
        </Suspense>
      </div>
    </div>
  )
}

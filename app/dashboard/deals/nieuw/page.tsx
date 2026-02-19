'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const STAGES = [
  { key: 'prospect', label: 'Prospect' },
  { key: 'contact', label: 'Contact' },
  { key: 'offerte', label: 'Offerte' },
  { key: 'onderhandeling', label: 'Onderhandeling' },
  { key: 'gewonnen', label: 'Gewonnen' },
  { key: 'verloren', label: 'Verloren' },
]

const SOURCES = ['Website', 'Referral', 'LinkedIn', 'Cold outreach', 'Beurs/event', 'Anders']

function NieuwDealForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const defaultStage = searchParams.get('stage') || 'prospect'

  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [stage, setStage] = useState(defaultStage)
  const [closeDate, setCloseDate] = useState('')
  const [probability, setProbability] = useState('50')
  const [source, setSource] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase.from('lb_deals').insert({
      user_id: user?.id,
      title,
      value: value ? Number(value) : null,
      stage,
      expected_close_date: closeDate || null,
      probability: Number(probability),
      source: source || null,
      notes: notes || null,
    })

    if (error) {
      setError('Fout bij opslaan: ' + error.message)
      setLoading(false)
    } else {
      router.push('/dashboard/pipeline')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="text-xs text-gray-400 mb-1 block">Dealnaam *</label>
        <input className="input" type="text" placeholder="Website redesign - Bakkerij de Laan" value={title}
          onChange={e => setTitle(e.target.value)} required />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Waarde (€)</label>
          <input className="input" type="number" placeholder="5000" value={value}
            onChange={e => setValue(e.target.value)} min="0" />
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Kans (%)</label>
          <input className="input" type="number" placeholder="50" value={probability}
            onChange={e => setProbability(e.target.value)} min="0" max="100" />
        </div>
      </div>

      <div>
        <label className="text-xs text-gray-400 mb-1 block">Fase *</label>
        <select className="input" value={stage} onChange={e => setStage(e.target.value)} required>
          {STAGES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
        </select>
      </div>

      <div>
        <label className="text-xs text-gray-400 mb-1 block">Verwachte sluitdatum</label>
        <input className="input" type="date" value={closeDate} onChange={e => setCloseDate(e.target.value)} />
      </div>

      <div>
        <label className="text-xs text-gray-400 mb-1 block">Bron</label>
        <select className="input" value={source} onChange={e => setSource(e.target.value)}>
          <option value="">Selecteer bron</option>
          {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label className="text-xs text-gray-400 mb-1 block">Notities</label>
        <textarea className="input" rows={3} placeholder="Extra info over deze deal..."
          value={notes} onChange={e => setNotes(e.target.value)} />
      </div>

      {error && (
        <div className="text-red-400 text-sm p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)' }}>
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button type="submit" disabled={loading} className="btn-primary flex-1 py-3 text-sm disabled:opacity-50">
          {loading ? 'Opslaan...' : 'Deal toevoegen →'}
        </button>
        <Link href="/dashboard/pipeline" className="btn-secondary px-6 py-3 text-sm">
          Annuleren
        </Link>
      </div>
    </form>
  )
}

export default function NieuwDealPage() {
  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-6">
        <Link href="/dashboard/pipeline" className="text-sm text-gray-500 hover:text-gray-300">← Pipeline</Link>
        <h1 className="text-2xl font-black mt-2">Nieuwe deal toevoegen</h1>
      </div>
      <div className="glass p-6">
        <Suspense fallback={<div className="text-gray-400">Laden...</div>}>
          <NieuwDealForm />
        </Suspense>
      </div>
    </div>
  )
}

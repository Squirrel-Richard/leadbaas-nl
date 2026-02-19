'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function NieuwBedrijfPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', website: '', phone: '', email: '', city: '', industry: '', kvk_number: '', notes: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('lb_companies').insert({ ...form, user_id: user?.id })
    if (error) { setError(error.message); setLoading(false) }
    else router.push('/dashboard/bedrijven')
  }

  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-6">
        <Link href="/dashboard/bedrijven" className="text-sm text-gray-500 hover:text-gray-300">← Bedrijven</Link>
        <h1 className="text-2xl font-black mt-2">Bedrijf toevoegen</h1>
      </div>
      <div className="glass p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Bedrijfsnaam *</label>
            <input className="input" placeholder="Bakkerij de Laan BV" value={form.name} onChange={set('name')} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">KvK-nummer</label>
              <input className="input" placeholder="12345678" value={form.kvk_number} onChange={set('kvk_number')} />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Stad</label>
              <input className="input" placeholder="Amsterdam" value={form.city} onChange={set('city')} />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Website</label>
            <input className="input" type="url" placeholder="https://bedrijf.nl" value={form.website} onChange={set('website')} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Email</label>
              <input className="input" type="email" placeholder="info@bedrijf.nl" value={form.email} onChange={set('email')} />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Telefoon</label>
              <input className="input" placeholder="020-1234567" value={form.phone} onChange={set('phone')} />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Branche</label>
            <input className="input" placeholder="Horeca, Bouw, IT, etc." value={form.industry} onChange={set('industry')} />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Notities</label>
            <textarea className="input" rows={3} placeholder="Aantekeningen over dit bedrijf..." value={form.notes} onChange={set('notes')} />
          </div>
          {error && <div className="text-red-400 text-sm p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)' }}>{error}</div>}
          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="btn-primary flex-1 py-3 text-sm disabled:opacity-50">
              {loading ? 'Opslaan...' : 'Bedrijf toevoegen →'}
            </button>
            <Link href="/dashboard/bedrijven" className="btn-secondary px-6 py-3 text-sm">Annuleren</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

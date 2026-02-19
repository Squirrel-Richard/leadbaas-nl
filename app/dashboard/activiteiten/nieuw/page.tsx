'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const TYPES = [
  { key: 'note', label: '📝 Notitie' },
  { key: 'call', label: '📞 Gesprek' },
  { key: 'email', label: '📧 Email' },
  { key: 'meeting', label: '🤝 Meeting' },
  { key: 'whatsapp', label: '💬 WhatsApp' },
  { key: 'task', label: '✅ Taak' },
]

export default function NieuweActiviteitPage() {
  const router = useRouter()
  const [form, setForm] = useState({ type: 'note', title: '', description: '', due_date: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('lb_activities').insert({ ...form, user_id: user?.id, due_date: form.due_date || null })
    if (error) { setError(error.message); setLoading(false) }
    else router.push('/dashboard/activiteiten')
  }

  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-6">
        <Link href="/dashboard/activiteiten" className="text-sm text-gray-500 hover:text-gray-300">← Activiteiten</Link>
        <h1 className="text-2xl font-black mt-2">Activiteit loggen</h1>
      </div>
      <div className="glass p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Type *</label>
            <select className="input" value={form.type} onChange={set('type')}>
              {TYPES.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Titel *</label>
            <input className="input" placeholder="Gebeld met Jan over offerte" value={form.title} onChange={set('title')} required />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Beschrijving</label>
            <textarea className="input" rows={4} placeholder="Details..." value={form.description} onChange={set('description')} />
          </div>
          {form.type === 'task' && (
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Deadline</label>
              <input className="input" type="datetime-local" value={form.due_date} onChange={set('due_date')} />
            </div>
          )}
          {error && <div className="text-red-400 text-sm p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)' }}>{error}</div>}
          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="btn-primary flex-1 py-3 text-sm disabled:opacity-50">
              {loading ? 'Opslaan...' : 'Activiteit loggen →'}
            </button>
            <Link href="/dashboard/activiteiten" className="btn-secondary px-6 py-3 text-sm">Annuleren</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

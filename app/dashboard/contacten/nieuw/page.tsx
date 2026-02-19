'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function NieuwContactPage() {
  const router = useRouter()
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', phone: '', role: '', notes: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase.from('lb_contacts').insert({ ...form, user_id: user?.id })
    if (error) { setError(error.message); setLoading(false) }
    else router.push('/dashboard/contacten')
  }

  return (
    <div className="p-6 max-w-2xl">
      <div className="mb-6">
        <Link href="/dashboard/contacten" className="text-sm text-gray-500 hover:text-gray-300">← Contacten</Link>
        <h1 className="text-2xl font-black mt-2">Contact toevoegen</h1>
      </div>
      <div className="glass p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Voornaam *</label>
              <input className="input" placeholder="Jan" value={form.first_name} onChange={set('first_name')} required />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Achternaam</label>
              <input className="input" placeholder="de Vries" value={form.last_name} onChange={set('last_name')} />
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Email</label>
            <input className="input" type="email" placeholder="jan@bedrijf.nl" value={form.email} onChange={set('email')} />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Telefoon</label>
            <input className="input" placeholder="+31 6 12345678" value={form.phone} onChange={set('phone')} />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Functie</label>
            <input className="input" placeholder="Directeur" value={form.role} onChange={set('role')} />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Notities</label>
            <textarea className="input" rows={3} placeholder="Aantekeningen over dit contact..." value={form.notes} onChange={set('notes')} />
          </div>
          {error && <div className="text-red-400 text-sm p-3 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)' }}>{error}</div>}
          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="btn-primary flex-1 py-3 text-sm disabled:opacity-50">
              {loading ? 'Opslaan...' : 'Contact toevoegen →'}
            </button>
            <Link href="/dashboard/contacten" className="btn-secondary px-6 py-3 text-sm">Annuleren</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function InstellingenPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase
    .from('lb_profiles')
    .select('full_name, company_name, plan')
    .eq('id', user?.id)
    .single()

  const planLabels: Record<string, string> = { gratis: 'Gratis', solo: 'Solo — €29/m', team: 'Team — €79/m' }
  const plan = profile?.plan || 'gratis'

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-black mb-6">Instellingen</h1>

      <div className="glass p-6 mb-4">
        <h2 className="font-bold mb-4">Account</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--border)' }}>
            <span className="text-gray-400">Naam</span>
            <span>{profile?.full_name || user?.email}</span>
          </div>
          <div className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--border)' }}>
            <span className="text-gray-400">Email</span>
            <span>{user?.email}</span>
          </div>
          <div className="flex justify-between py-2 border-b" style={{ borderColor: 'var(--border)' }}>
            <span className="text-gray-400">Bedrijf</span>
            <span>{profile?.company_name || '—'}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-400">Huidig plan</span>
            <span className="text-indigo-400 font-semibold">{planLabels[plan]}</span>
          </div>
        </div>
      </div>

      {plan === 'gratis' && (
        <div className="glass p-6 mb-4" style={{ borderColor: 'rgba(99,102,241,0.3)', background: 'rgba(99,102,241,0.06)' }}>
          <h2 className="font-bold mb-2 gradient-text">Upgrade naar Solo</h2>
          <p className="text-gray-400 text-sm mb-4">Onbeperkt contacten, deals en alle functies voor €29/maand.</p>
          <Link href="/abonnement/upgrade" className="btn-primary text-sm px-4 py-2">Upgraden →</Link>
        </div>
      )}

      <div className="glass p-6">
        <h2 className="font-bold mb-4">Gevaarlijke zone</h2>
        <form action="/auth/logout" method="POST">
          <button type="submit" className="text-red-400 text-sm hover:text-red-300 transition-colors">
            Uitloggen
          </button>
        </form>
      </div>
    </div>
  )
}

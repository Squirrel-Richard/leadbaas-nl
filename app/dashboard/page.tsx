import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch summary stats
  const [dealsRes, contactenRes, bedrijvenRes, recentRes] = await Promise.all([
    supabase.from('lb_deals').select('stage, value').eq('user_id', user?.id),
    supabase.from('lb_contacts').select('id', { count: 'exact', head: true }).eq('user_id', user?.id),
    supabase.from('lb_companies').select('id', { count: 'exact', head: true }).eq('user_id', user?.id),
    supabase.from('lb_deals').select('id, title, stage, value, created_at').eq('user_id', user?.id).order('created_at', { ascending: false }).limit(5),
  ])

  const deals = dealsRes.data || []
  const openDeals = deals.filter(d => !['gewonnen', 'verloren'].includes(d.stage))
  const gewonnenDeals = deals.filter(d => d.stage === 'gewonnen')
  const pipelineWaarde = openDeals.reduce((sum, d) => sum + (Number(d.value) || 0), 0)
  const gewonnenWaarde = gewonnenDeals.reduce((sum, d) => sum + (Number(d.value) || 0), 0)

  const stageColors: Record<string, string> = {
    prospect: '#818cf8', contact: '#60a5fa', offerte: '#fbbf24',
    onderhandeling: '#fb923c', gewonnen: '#34d399', verloren: '#f87171',
  }
  const stageLabels: Record<string, string> = {
    prospect: 'Prospect', contact: 'Contact', offerte: 'Offerte',
    onderhandeling: 'Onderhandeling', gewonnen: 'Gewonnen', verloren: 'Verloren',
  }

  return (
    <div className="p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-black mb-1">Goedemiddag 👋</h1>
        <p className="text-gray-400 text-sm">Hier is je overzicht van vandaag</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Open deals', value: openDeals.length, icon: '🤝', color: '#818cf8' },
          { label: 'Pipeline waarde', value: `€ ${pipelineWaarde.toLocaleString('nl-NL')}`, icon: '💰', color: '#10b981' },
          { label: 'Gewonnen (totaal)', value: `€ ${gewonnenWaarde.toLocaleString('nl-NL')}`, icon: '🏆', color: '#fbbf24' },
          { label: 'Contacten', value: (contactenRes.count || 0), icon: '👥', color: '#60a5fa' },
        ].map((stat, i) => (
          <div key={i} className="glass p-5">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent deals */}
        <div className="glass p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold">Recente deals</h2>
            <Link href="/dashboard/pipeline" className="text-xs text-indigo-400 hover:text-indigo-300">Alle deals →</Link>
          </div>
          {(recentRes.data || []).length === 0 ? (
            <div className="text-center py-8">
              <div className="text-3xl mb-3">🎯</div>
              <p className="text-gray-400 text-sm">Nog geen deals. Voeg je eerste lead toe!</p>
              <Link href="/dashboard/deals/nieuw" className="btn-primary text-sm px-4 py-2 mt-4 inline-block">
                + Deal toevoegen
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {(recentRes.data || []).map((deal) => (
                <div key={deal.id} className="flex items-center justify-between p-3 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div>
                    <div className="font-semibold text-sm">{deal.title}</div>
                    <div className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block"
                      style={{ background: `${stageColors[deal.stage]}22`, color: stageColors[deal.stage] }}>
                      {stageLabels[deal.stage]}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-sm" style={{ color: '#10b981' }}>
                      {deal.value ? `€ ${Number(deal.value).toLocaleString('nl-NL')}` : '—'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="glass p-5">
          <h2 className="font-bold mb-4">Snelle acties</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { href: '/dashboard/deals/nieuw', icon: '🤝', label: 'Nieuwe deal' },
              { href: '/dashboard/contacten/nieuw', icon: '👤', label: 'Contact toevoegen' },
              { href: '/dashboard/bedrijven/nieuw', icon: '🏢', label: 'Bedrijf toevoegen' },
              { href: '/dashboard/activiteiten/nieuw', icon: '📝', label: 'Activiteit loggen' },
            ].map((action, i) => (
              <Link key={i} href={action.href}
                className="flex flex-col items-center gap-2 p-4 rounded-xl text-center transition-all hover:border-indigo-500/30"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="text-2xl">{action.icon}</span>
                <span className="text-xs font-medium text-gray-300">{action.label}</span>
              </Link>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-lg" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <div className="text-xs text-indigo-300 font-semibold mb-1">💡 Pro tip</div>
            <p className="text-xs text-gray-400">
              Koppel LeadBaas aan WAppZakelijk voor automatische WhatsApp follow-ups na elke nieuwe deal.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

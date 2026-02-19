import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

const stageColors: Record<string, string> = {
  prospect: '#818cf8', contact: '#60a5fa', offerte: '#fbbf24',
  onderhandeling: '#fb923c', gewonnen: '#34d399', verloren: '#f87171',
}
const stageLabels: Record<string, string> = {
  prospect: 'Prospect', contact: 'Contact', offerte: 'Offerte',
  onderhandeling: 'Onderhandeling', gewonnen: 'Gewonnen', verloren: 'Verloren',
}

export default async function DealsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: deals } = await supabase
    .from('lb_deals')
    .select('id, title, stage, value, expected_close_date, lb_companies(name)')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black mb-1">Deals</h1>
          <p className="text-gray-400 text-sm">{deals?.length || 0} deals</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/pipeline" className="btn-secondary text-sm px-4 py-2">Pipeline view</Link>
          <Link href="/dashboard/deals/nieuw" className="btn-primary text-sm px-4 py-2">+ Nieuwe deal</Link>
        </div>
      </div>

      {(!deals || deals.length === 0) ? (
        <div className="glass p-12 text-center">
          <div className="text-4xl mb-4">🤝</div>
          <h2 className="text-lg font-bold mb-2">Nog geen deals</h2>
          <p className="text-gray-400 text-sm mb-6">Voeg je eerste lead toe</p>
          <Link href="/dashboard/deals/nieuw" className="btn-primary text-sm px-6 py-3">Deal toevoegen →</Link>
        </div>
      ) : (
        <div className="glass overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left" style={{ borderColor: 'var(--border)' }}>
                <th className="px-4 py-3 text-gray-400 font-medium">Deal</th>
                <th className="px-4 py-3 text-gray-400 font-medium">Bedrijf</th>
                <th className="px-4 py-3 text-gray-400 font-medium">Fase</th>
                <th className="px-4 py-3 text-gray-400 font-medium">Waarde</th>
                <th className="px-4 py-3 text-gray-400 font-medium">Sluitdatum</th>
              </tr>
            </thead>
            <tbody>
              {deals.map((deal, i) => (
                <tr key={deal.id} className="border-b hover:bg-white/[0.02] transition-colors"
                  style={{ borderColor: i === deals.length - 1 ? 'transparent' : 'var(--border)' }}>
                  <td className="px-4 py-3">
                    <Link href={`/dashboard/deals/${deal.id}`} className="font-semibold hover:text-indigo-400 transition-colors">
                      {deal.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {(deal.lb_companies as unknown as { name: string } | null)?.name || '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 rounded-full"
                      style={{ background: `${stageColors[deal.stage]}22`, color: stageColors[deal.stage] }}>
                      {stageLabels[deal.stage]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    {deal.value ? `€ ${Number(deal.value).toLocaleString('nl-NL')}` : '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {deal.expected_close_date ? new Date(deal.expected_close_date).toLocaleDateString('nl-NL') : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

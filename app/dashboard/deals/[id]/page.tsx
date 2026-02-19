import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'

const stageColors: Record<string, string> = {
  prospect: '#818cf8', contact: '#60a5fa', offerte: '#fbbf24',
  onderhandeling: '#fb923c', gewonnen: '#34d399', verloren: '#f87171',
}
const stageLabels: Record<string, string> = {
  prospect: 'Prospect', contact: 'Contact', offerte: 'Offerte',
  onderhandeling: 'Onderhandeling', gewonnen: 'Gewonnen', verloren: 'Verloren',
}

export default async function DealDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: deal } = await supabase
    .from('lb_deals')
    .select('*, lb_companies(name, city), lb_contacts(first_name, last_name, email, phone)')
    .eq('id', id)
    .eq('user_id', user?.id)
    .single()

  if (!deal) notFound()

  const { data: activities } = await supabase
    .from('lb_activities')
    .select('id, type, title, description, created_at')
    .eq('deal_id', id)
    .order('created_at', { ascending: false })

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-6">
        <Link href="/dashboard/pipeline" className="text-sm text-gray-500 hover:text-gray-300">← Pipeline</Link>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black">{deal.title}</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs px-2 py-1 rounded-full font-semibold"
              style={{ background: `${stageColors[deal.stage]}22`, color: stageColors[deal.stage] }}>
              {stageLabels[deal.stage]}
            </span>
            {deal.value && (
              <span className="text-sm font-bold text-green-400">
                € {Number(deal.value).toLocaleString('nl-NL')}
              </span>
            )}
          </div>
        </div>
        <Link href={`/dashboard/deals/${id}/bewerken`} className="btn-secondary text-sm px-4 py-2">
          Bewerken
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="glass p-5">
          <h2 className="font-bold text-sm mb-3 text-gray-400">Deal info</h2>
          <div className="space-y-2 text-sm">
            {deal.lb_companies && (
              <div className="flex justify-between">
                <span className="text-gray-500">Bedrijf</span>
                <span>{(deal.lb_companies as { name: string }).name}</span>
              </div>
            )}
            {deal.probability !== null && (
              <div className="flex justify-between">
                <span className="text-gray-500">Kans</span>
                <span>{deal.probability}%</span>
              </div>
            )}
            {deal.expected_close_date && (
              <div className="flex justify-between">
                <span className="text-gray-500">Sluitdatum</span>
                <span>{new Date(deal.expected_close_date).toLocaleDateString('nl-NL')}</span>
              </div>
            )}
            {deal.source && (
              <div className="flex justify-between">
                <span className="text-gray-500">Bron</span>
                <span>{deal.source}</span>
              </div>
            )}
          </div>
        </div>

        {deal.lb_contacts && (
          <div className="glass p-5">
            <h2 className="font-bold text-sm mb-3 text-gray-400">Contact</h2>
            <div className="text-sm space-y-1">
              <div className="font-semibold">
                {(deal.lb_contacts as { first_name: string; last_name: string | null }).first_name}{' '}
                {(deal.lb_contacts as { last_name: string | null }).last_name}
              </div>
              {(deal.lb_contacts as { email?: string }).email && (
                <div className="text-gray-400">{(deal.lb_contacts as { email: string }).email}</div>
              )}
            </div>
          </div>
        )}
      </div>

      {deal.notes && (
        <div className="glass p-5 mb-6">
          <h2 className="font-bold text-sm mb-3 text-gray-400">Notities</h2>
          <p className="text-sm text-gray-300 leading-relaxed">{deal.notes}</p>
        </div>
      )}

      <div className="glass p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-sm">Activiteiten</h2>
          <Link href={`/dashboard/activiteiten/nieuw?deal=${id}`} className="text-xs text-indigo-400 hover:text-indigo-300">
            + Activiteit loggen
          </Link>
        </div>
        {(!activities || activities.length === 0) ? (
          <p className="text-gray-500 text-sm">Nog geen activiteiten voor deze deal</p>
        ) : (
          <div className="space-y-3">
            {activities.map(a => (
              <div key={a.id} className="flex gap-3 text-sm">
                <div className="w-8 text-center">{a.type === 'call' ? '📞' : a.type === 'email' ? '📧' : a.type === 'meeting' ? '🤝' : '📝'}</div>
                <div>
                  <div className="font-medium">{a.title}</div>
                  {a.description && <div className="text-gray-400 text-xs">{a.description}</div>}
                  <div className="text-gray-600 text-xs">{new Date(a.created_at).toLocaleDateString('nl-NL')}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

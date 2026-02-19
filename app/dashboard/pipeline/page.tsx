import { createClient } from '@/lib/supabase/server'
import PipelineBoard from '@/components/dashboard/PipelineBoard'

const STAGES = [
  { key: 'prospect', label: 'Prospect', color: '#818cf8' },
  { key: 'contact', label: 'Contact', color: '#60a5fa' },
  { key: 'offerte', label: 'Offerte', color: '#fbbf24' },
  { key: 'onderhandeling', label: 'Onderhandeling', color: '#fb923c' },
  { key: 'gewonnen', label: 'Gewonnen', color: '#34d399' },
  { key: 'verloren', label: 'Verloren', color: '#f87171' },
]

export default async function PipelinePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: deals } = await supabase
    .from('lb_deals')
    .select(`
      id, title, value, stage, expected_close_date, probability,
      lb_companies(name),
      lb_contacts(first_name, last_name)
    `)
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black mb-1">Sales Pipeline</h1>
          <p className="text-gray-400 text-sm">Beheer je leads van prospect tot gewonnen deal</p>
        </div>
        <a href="/dashboard/deals/nieuw" className="btn-primary text-sm px-4 py-2">
          + Nieuwe deal
        </a>
      </div>

      <PipelineBoard stages={STAGES} deals={deals || []} />
    </div>
  )
}

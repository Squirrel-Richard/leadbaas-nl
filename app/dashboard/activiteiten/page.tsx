import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

const ACTIVITY_ICONS: Record<string, string> = {
  note: '📝', call: '📞', email: '📧', meeting: '🤝', whatsapp: '💬', task: '✅',
}

export default async function ActiviteitenPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: activities } = await supabase
    .from('lb_activities')
    .select('id, type, title, description, completed, due_date, created_at')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black mb-1">Activiteiten</h1>
          <p className="text-gray-400 text-sm">Recente activiteiten en taken</p>
        </div>
        <Link href="/dashboard/activiteiten/nieuw" className="btn-primary text-sm px-4 py-2">
          + Activiteit loggen
        </Link>
      </div>

      {(!activities || activities.length === 0) ? (
        <div className="glass p-12 text-center">
          <div className="text-4xl mb-4">📝</div>
          <h2 className="text-lg font-bold mb-2">Nog geen activiteiten</h2>
          <p className="text-gray-400 text-sm mb-6">Log je eerste call, email of meeting</p>
          <Link href="/dashboard/activiteiten/nieuw" className="btn-primary text-sm px-6 py-3">Activiteit loggen →</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map(a => (
            <div key={a.id} className="glass p-4 flex items-start gap-4">
              <div className="text-2xl">{ACTIVITY_ICONS[a.type] || '📝'}</div>
              <div className="flex-1">
                <div className="font-semibold text-sm">{a.title}</div>
                {a.description && <div className="text-gray-400 text-xs mt-1">{a.description}</div>}
                <div className="text-gray-600 text-xs mt-2">
                  {new Date(a.created_at).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
              {a.completed && <div className="text-green-400 text-xs">✅ Klaar</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

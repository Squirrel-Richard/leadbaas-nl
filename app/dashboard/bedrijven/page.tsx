import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function BedrijvenPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: bedrijven } = await supabase
    .from('lb_companies')
    .select('id, name, website, phone, email, city, industry')
    .eq('user_id', user?.id)
    .order('name')

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black mb-1">Bedrijven</h1>
          <p className="text-gray-400 text-sm">{bedrijven?.length || 0} bedrijven</p>
        </div>
        <Link href="/dashboard/bedrijven/nieuw" className="btn-primary text-sm px-4 py-2">
          + Bedrijf toevoegen
        </Link>
      </div>

      {(!bedrijven || bedrijven.length === 0) ? (
        <div className="glass p-12 text-center">
          <div className="text-4xl mb-4">🏢</div>
          <h2 className="text-lg font-bold mb-2">Nog geen bedrijven</h2>
          <p className="text-gray-400 text-sm mb-6">Voeg je eerste klant of prospect toe</p>
          <Link href="/dashboard/bedrijven/nieuw" className="btn-primary text-sm px-6 py-3">Bedrijf toevoegen →</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bedrijven.map(b => (
            <Link key={b.id} href={`/dashboard/bedrijven/${b.id}`}>
              <div className="glass p-5 hover:border-indigo-500/30 transition-colors cursor-pointer">
                <div className="font-bold mb-1">{b.name}</div>
                {b.city && <div className="text-xs text-gray-400 mb-2">📍 {b.city}</div>}
                {b.industry && <div className="text-xs text-gray-500">{b.industry}</div>}
                {b.email && <div className="text-xs text-gray-500 mt-1">{b.email}</div>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

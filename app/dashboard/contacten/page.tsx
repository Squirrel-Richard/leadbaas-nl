import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function ContactenPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: contacten } = await supabase
    .from('lb_contacts')
    .select('id, first_name, last_name, email, phone, role, lb_companies(name)')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false })

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black mb-1">Contacten</h1>
          <p className="text-gray-400 text-sm">{contacten?.length || 0} contactpersonen</p>
        </div>
        <Link href="/dashboard/contacten/nieuw" className="btn-primary text-sm px-4 py-2">
          + Contact toevoegen
        </Link>
      </div>

      {(!contacten || contacten.length === 0) ? (
        <div className="glass p-12 text-center">
          <div className="text-4xl mb-4">👥</div>
          <h2 className="text-lg font-bold mb-2">Nog geen contacten</h2>
          <p className="text-gray-400 text-sm mb-6">Voeg je eerste contactpersoon toe</p>
          <Link href="/dashboard/contacten/nieuw" className="btn-primary text-sm px-6 py-3">
            Contact toevoegen →
          </Link>
        </div>
      ) : (
        <div className="glass overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left" style={{ borderColor: 'var(--border)' }}>
                <th className="px-4 py-3 text-gray-400 font-medium">Naam</th>
                <th className="px-4 py-3 text-gray-400 font-medium">Bedrijf</th>
                <th className="px-4 py-3 text-gray-400 font-medium">Email</th>
                <th className="px-4 py-3 text-gray-400 font-medium">Telefoon</th>
                <th className="px-4 py-3 text-gray-400 font-medium">Functie</th>
              </tr>
            </thead>
            <tbody>
              {contacten.map((contact, i) => (
                <tr key={contact.id}
                  className="border-b hover:bg-white/[0.02] transition-colors cursor-pointer"
                  style={{ borderColor: i === contacten.length - 1 ? 'transparent' : 'var(--border)' }}>
                  <td className="px-4 py-3">
                    <Link href={`/dashboard/contacten/${contact.id}`} className="font-semibold hover:text-indigo-400 transition-colors">
                      {contact.first_name} {contact.last_name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {(contact.lb_companies as unknown as { name: string } | null)?.name || '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-400">{contact.email || '—'}</td>
                  <td className="px-4 py-3 text-gray-400">{contact.phone || '—'}</td>
                  <td className="px-4 py-3 text-gray-400">{contact.role || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

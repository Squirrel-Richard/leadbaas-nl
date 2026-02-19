import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen px-6 py-20" style={{ background: 'var(--bg)' }}>
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-indigo-400 text-sm hover:text-indigo-300">← Terug naar home</Link>
        <h1 className="text-3xl font-black mt-6 mb-4">Privacyverklaring</h1>
        <div className="text-gray-400 text-sm leading-relaxed space-y-4">
          <p>LeadBaas.nl is een product van AIOW BV, gevestigd in Hoofddorp, Nederland.</p>
          <h2 className="text-white font-bold text-lg mt-6">Gegevens die we verzamelen</h2>
          <p>Wij verzamelen alleen gegevens die u zelf invoert: naam, emailadres, bedrijfsnaam en CRM-gegevens (contacten, deals, notities).</p>
          <h2 className="text-white font-bold text-lg mt-6">Gebruik van gegevens</h2>
          <p>Uw gegevens worden uitsluitend gebruikt om de LeadBaas-dienst te leveren. Wij verkopen geen gegevens aan derden.</p>
          <h2 className="text-white font-bold text-lg mt-6">Opslag</h2>
          <p>Gegevens worden opgeslagen bij Supabase (EU-West regio, Ierland) en zijn versleuteld opgeslagen.</p>
          <h2 className="text-white font-bold text-lg mt-6">Contact</h2>
          <p>Vragen over privacy? Mail naar info@aiow.nl</p>
        </div>
      </div>
    </div>
  )
}

import Link from 'next/link'

export default function UpgradePage() {
  return (
    <div className="min-h-screen px-6 py-20" style={{ background: 'var(--bg)' }}>
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-black mb-4">Upgrade je plan</h1>
        <p className="text-gray-400 mb-12">Kies het plan dat bij je past</p>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { name: 'Solo', price: 29, features: ['Onbeperkt contacten', 'Onbeperkt deals', 'Follow-up reminders', 'Omzetprognose', 'WhatsApp integratie'] },
            { name: 'Team', price: 79, features: ['Alles van Solo', 'Tot 5 gebruikers', 'Gedeelde pipeline', 'Teamrapportages'] },
          ].map((plan, i) => (
            <div key={i} className="glass p-8">
              <h2 className="text-xl font-black mb-2">{plan.name}</h2>
              <div className="text-4xl font-black gradient-text mb-6">€{plan.price}/m</div>
              <ul className="space-y-3 mb-8 text-left">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <span className="text-green-400">✓</span>
                    <span className="text-gray-300">{f}</span>
                  </li>
                ))}
              </ul>
              <Link href={`/aanmelden?plan=${plan.name.toLowerCase()}`} className="btn-primary block text-center py-3">
                Kies {plan.name} →
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/dashboard" className="text-gray-500 text-sm hover:text-gray-300">← Terug naar dashboard</Link>
        </div>
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'

const STAGES = [
  { key: 'prospect', label: 'Prospect', color: '#818cf8', count: 4, value: '€ 24.500' },
  { key: 'contact', label: 'Contact', color: '#60a5fa', count: 3, value: '€ 18.900' },
  { key: 'offerte', label: 'Offerte', color: '#fbbf24', count: 2, value: '€ 31.200' },
  { key: 'gewonnen', label: 'Gewonnen', color: '#34d399', count: 6, value: '€ 87.000' },
]

const DEMO_DEALS = [
  { stage: 'prospect', name: 'Bouwbedrijf de Laan', value: '€ 8.500', contact: 'Kees de Laan', days: 2 },
  { stage: 'prospect', name: 'Horeca Partners BV', value: '€ 4.200', contact: 'Sandra Visser', days: 5 },
  { stage: 'contact', name: 'IT Solutions Utrecht', value: '€ 12.000', contact: 'Jeroen Bakker', days: 1 },
  { stage: 'offerte', name: 'Schoonmaakbedrijf Rein', value: '€ 15.600', contact: 'Rina Schoon', days: 8 },
  { stage: 'gewonnen', name: 'Transport Hendriks', value: '€ 28.000', contact: 'Piet Hendriks', days: 12 },
]

export default function HomePage() {
  const [email, setEmail] = useState('')

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Background orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="orb absolute w-[500px] h-[500px] opacity-[0.12]"
          style={{ background: '#6366f1', top: '-15%', left: '-10%' }} />
        <div className="orb-2 orb absolute w-80 h-80 opacity-[0.08]"
          style={{ background: '#10b981', top: '30%', right: '-5%' }} />
        <div className="orb absolute w-96 h-96 opacity-[0.07]"
          style={{ background: '#6366f1', bottom: '-10%', left: '50%' }} />
      </div>

      {/* Nav */}
      <nav className="relative z-50 border-b" style={{ borderColor: 'var(--border)', background: 'rgba(7,7,16,0.8)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-black gradient-text">LeadBaas.nl</div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</Link>
            <Link href="#pipeline" className="text-sm text-gray-400 hover:text-white transition-colors">Pipeline</Link>
            <Link href="#prijzen" className="text-sm text-gray-400 hover:text-white transition-colors">Prijzen</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/inloggen" className="text-sm text-gray-400 hover:text-white transition-colors">Inloggen</Link>
            <Link href="/aanmelden" className="btn-primary text-sm py-2 px-4">Gratis starten →</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 pt-24 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-8"
              style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8' }}>
              🎯 CRM voor echte Nederlandse ondernemers
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Stop met leads<br />
              <span className="gradient-text">verliezen in Excel</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
              LeadBaas houdt al je leads, klanten en deals bij. Geen ingewikkeld CRM. 
              Geen Engelse UI. Gewoon overzicht, in het Nederlands, voor €29 per maand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/aanmelden" className="btn-primary text-lg px-8 py-4">
                Gratis 14 dagen proberen →
              </Link>
              <Link href="#pipeline" className="btn-secondary text-lg px-8 py-4">
                Bekijk pipeline demo
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { value: '100%', label: 'Nederlands', sub: 'Interface + support' },
              { value: '14 d', label: 'Gratis proberen', sub: 'Geen creditcard' },
              { value: '< 5min', label: 'Setup', sub: 'Meteen aan de slag' },
              { value: 'iDEAL', label: 'Betalen', sub: 'Of creditcard' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }} className="glass p-6 text-center">
                <div className="text-3xl font-black gradient-text mb-1">{s.value}</div>
                <div className="text-white font-semibold text-sm">{s.label}</div>
                <div className="text-gray-500 text-xs mt-1">{s.sub}</div>
              </motion.div>
            ))}
          </div>

          {/* Pipeline demo */}
          <motion.div id="pipeline" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }} className="glass p-6 text-left overflow-x-auto">
            <div className="text-sm text-gray-500 mb-4 text-center">Live pipeline voorbeeld — jouw leads, jouw deals</div>
            <div className="flex gap-4 min-w-[800px]">
              {STAGES.map((stage) => (
                <div key={stage.key} className="flex-1">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="text-xs font-bold uppercase tracking-wider" style={{ color: stage.color }}>
                      {stage.label}
                    </div>
                    <div className="text-xs text-gray-500">{stage.count} deals</div>
                  </div>
                  <div className="space-y-2">
                    {DEMO_DEALS.filter(d => d.stage === stage.key).map((deal, i) => (
                      <div key={i} className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div className="font-semibold text-sm text-white mb-1">{deal.name}</div>
                        <div className="text-xs text-gray-400 mb-2">{deal.contact}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold" style={{ color: stage.color }}>{deal.value}</span>
                          <span className="text-xs text-gray-600">{deal.days}d geleden</span>
                        </div>
                      </div>
                    ))}
                    <div className="p-2 rounded-xl border-dashed border text-center text-xs text-gray-600 cursor-pointer hover:text-gray-400 transition-colors" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                      + Deal toevoegen
                    </div>
                  </div>
                  <div className="mt-3 px-1 text-xs font-semibold" style={{ color: stage.color }}>
                    {stage.value} totaal
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Alles wat je nodig hebt</h2>
            <p className="text-gray-400 text-lg">Geen overkill. Precies genoeg voor een Nederlandse ondernemer.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '📊', title: 'Visuele pipeline', desc: 'Sleep je deals van prospect naar gewonnen. Altijd overzicht over je salesproces.' },
              { icon: '👥', title: 'Klanten & contacten', desc: 'Alle info op één plek: bedrijfsgegevens, KvK-nummer, contactpersonen, notities.' },
              { icon: '📝', title: 'Activiteiten log', desc: 'Log calls, emails, WhatsApp-gesprekken en meetings. Nooit meer vergeten wanneer je contact had.' },
              { icon: '⏰', title: 'Follow-up reminders', desc: 'Stel herinneringen in: "bel Kees terug volgende week" — LeadBaas stuurt je een alert.' },
              { icon: '📈', title: 'Omzetprognose', desc: 'Zie hoeveel je deze maand waarschijnlijk binnenhaalt op basis van je actieve deals.' },
              { icon: '🔗', title: 'WhatsApp integratie', desc: 'Stuur snel een WhatsApp vanuit LeadBaas. Samen met WAppZakelijk: volledig geautomatiseerd.' },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                className="glass p-6 hover:border-indigo-500/30 transition-colors">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Waarom niet HubSpot of Salesforce?</h2>
            <p className="text-gray-400">Omdat die zijn gebouwd voor enterprise bedrijven met 50+ salesmedewerkers.</p>
          </div>
          <div className="glass p-6">
            <div className="grid grid-cols-4 gap-4 text-sm mb-4">
              <div className="text-gray-500"></div>
              <div className="text-center font-bold gradient-text">LeadBaas</div>
              <div className="text-center text-gray-500">HubSpot</div>
              <div className="text-center text-gray-500">Teamleider</div>
            </div>
            {[
              ['Prijs', '€29/m', '€800/m+', '€60/m+'],
              ['Taal', '🇳🇱 NL', '🇺🇸 EN', '🇧🇪 Mix'],
              ['iDEAL betaling', '✅', '❌', '✅'],
              ['Setup tijd', '< 5 min', '1-3 weken', '2-5 uur'],
              ['Overkill features', '❌', '✅', '✅'],
              ['WhatsApp integratie', '✅', '❌', '❌'],
              ['KvK-nummer veld', '✅', '❌', '✅'],
            ].map(([feature, lb, hs, tl], i) => (
              <div key={i} className="grid grid-cols-4 gap-4 py-3 border-t text-sm" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <div className="text-gray-400">{feature}</div>
                <div className="text-center font-semibold" style={{ color: lb.startsWith('€') ? '#818cf8' : lb === '✅' ? '#34d399' : lb === '❌' ? '#f87171' : 'white' }}>{lb}</div>
                <div className="text-center text-gray-500">{hs}</div>
                <div className="text-center text-gray-500">{tl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Wat ondernemers zeggen</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Marco van Dijk', role: 'Elektrotechnisch installateur, Utrecht', text: 'Eindelijk een CRM dat gewoon werkt. Geen cursus nodig, geen IT-er erbij. In 10 minuten had ik al mijn klanten ingevoerd.' },
              { name: 'Lisa Kramer', role: 'Marketing consultant, Amsterdam', text: 'Ik gebruik LeadBaas al 3 maanden. De pipeline is precies wat ik nodig heb. Nooit meer offertes verliezen.' },
              { name: 'Ahmed Bouali', role: 'Webdesigner ZZP, Den Haag', text: 'Teamleider was te duur voor mij alleen. HubSpot snapte ik niet. LeadBaas is perfect voor een zzp\'er.' },
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }} className="glass p-6">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-400">★</span>)}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">&quot;{t.text}&quot;</p>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-gray-500 text-xs">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="prijzen" className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Transparante prijzen</h2>
            <p className="text-gray-400">Gratis starten, betalen als je groeit. iDEAL, creditcard of Bancontact.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Gratis', price: 0, desc: 'Probeer zonder risico',
                features: ['50 contacten', '10 actieve deals', 'Basis pipeline', 'Email support'],
                cta: 'Start gratis', href: '/aanmelden', highlight: false,
              },
              {
                name: 'Solo', price: 29, desc: 'Voor de zelfstandige ondernemer',
                features: ['Onbeperkt contacten', 'Onbeperkt deals', 'Volledige pipeline', 'Activiteiten log', 'Follow-up reminders', 'Omzetprognose', 'WhatsApp integratie', 'iDEAL betaling'],
                cta: 'Start Solo — €29/m', href: '/aanmelden?plan=solo', highlight: true,
              },
              {
                name: 'Team', price: 79, desc: 'Voor kleine teams (2-5 personen)',
                features: ['Alles van Solo', 'Tot 5 gebruikers', 'Gedeelde pipeline', 'Teamactiviteiten', 'Rapportages', 'Prioriteit support'],
                cta: 'Start Team — €79/m', href: '/aanmelden?plan=team', highlight: false,
              },
            ].map((plan, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                className={`glass p-8 relative ${plan.highlight ? 'border-indigo-500/40' : ''}`}
                style={plan.highlight ? { borderColor: 'rgba(99,102,241,0.4)', background: 'rgba(99,102,241,0.06)' } : {}}>
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs px-3 py-1 rounded-full font-semibold"
                    style={{ background: '#6366f1' }}>
                    Meest gekozen
                  </div>
                )}
                <div className="mb-6">
                  <div className="text-lg font-bold mb-1">{plan.name}</div>
                  <div className="text-gray-400 text-sm mb-4">{plan.desc}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black">{plan.price === 0 ? 'Gratis' : `€${plan.price}`}</span>
                    {plan.price > 0 && <span className="text-gray-400 text-sm">/maand</span>}
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <span className="text-green-400">✓</span>
                      <span className="text-gray-300">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href={plan.href}
                  className={`block text-center py-3 rounded-xl font-semibold transition-all ${plan.highlight ? 'btn-primary' : 'btn-secondary'}`}>
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8 text-gray-500 text-sm">
            Maandelijks opzegbaar. Geen verborgen kosten. 14 dagen geld-terug garantie.
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass p-12" style={{ background: 'rgba(99,102,241,0.07)', borderColor: 'rgba(99,102,241,0.3)' }}>
            <h2 className="text-4xl font-black mb-4">Klaar om leads te winnen?</h2>
            <p className="text-gray-400 mb-8">Gratis 14 dagen proberen. Geen creditcard nodig. Annuleer wanneer je wil.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="jouw@email.nl" value={email} onChange={e => setEmail(e.target.value)}
                className="input flex-1" />
              <Link href={`/aanmelden${email ? `?email=${encodeURIComponent(email)}` : ''}`}
                className="btn-primary px-6 py-3 whitespace-nowrap">
                Start gratis →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="gradient-text font-black text-xl">LeadBaas.nl</div>
          <div className="flex gap-8">
            <Link href="/prijzen" className="text-gray-500 hover:text-white text-sm transition-colors">Prijzen</Link>
            <Link href="/aanmelden" className="text-gray-500 hover:text-white text-sm transition-colors">Aanmelden</Link>
            <Link href="/inloggen" className="text-gray-500 hover:text-white text-sm transition-colors">Inloggen</Link>
            <Link href="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy</Link>
          </div>
          <div className="text-gray-600 text-sm">© 2026 LeadBaas.nl — AIOW BV</div>
        </div>
      </footer>
    </div>
  )
}

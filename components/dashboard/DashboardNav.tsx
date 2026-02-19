'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Overzicht', icon: '📊' },
  { href: '/dashboard/pipeline', label: 'Pipeline', icon: '📋' },
  { href: '/dashboard/deals', label: 'Deals', icon: '🤝' },
  { href: '/dashboard/contacten', label: 'Contacten', icon: '👥' },
  { href: '/dashboard/bedrijven', label: 'Bedrijven', icon: '🏢' },
  { href: '/dashboard/activiteiten', label: 'Activiteiten', icon: '📝' },
  { href: '/dashboard/instellingen', label: 'Instellingen', icon: '⚙️' },
]

export default function DashboardNav() {
  const path = usePathname()

  return (
    <aside className="w-56 border-r flex flex-col" style={{ borderColor: 'var(--border)', background: 'rgba(0,0,0,0.3)', minHeight: '100vh' }}>
      <div className="p-5 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="font-black gradient-text text-lg">LeadBaas</div>
        <div className="text-xs text-gray-500 mt-0.5">CRM Dashboard</div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {NAV_ITEMS.map(item => {
          const active = path === item.href || (item.href !== '/dashboard' && path.startsWith(item.href))
          return (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all"
              style={{
                background: active ? 'rgba(99,102,241,0.15)' : 'transparent',
                color: active ? '#818cf8' : '#94a3b8',
                border: active ? '1px solid rgba(99,102,241,0.2)' : '1px solid transparent',
              }}>
              <span>{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="p-3 border-t" style={{ borderColor: 'var(--border)' }}>
        <form action="/auth/logout" method="POST">
          <button type="submit" className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-gray-300 transition-colors">
            <span>🚪</span>
            <span>Uitloggen</span>
          </button>
        </form>
      </div>
    </aside>
  )
}

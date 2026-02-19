import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LeadBaas.nl — CRM voor Nederlandse MKB & ZZP',
  description: 'Beheer al je leads, klanten en deals op één plek. Simpel CRM voor Nederlandse ondernemers. Geen gedoe, altijd overzicht. Gratis starten.',
  keywords: 'CRM Nederland, leads beheren, klanten beheer, ZZP CRM, MKB CRM, verkooppipeline, offertes bijhouden',
  openGraph: {
    title: 'LeadBaas.nl — CRM voor Nederlandse MKB & ZZP',
    description: 'Beheer al je leads, klanten en deals op één plek. Gratis starten.',
    url: 'https://leadbaas.nl',
    siteName: 'LeadBaas',
    locale: 'nl_NL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LeadBaas.nl — CRM voor NL ondernemers',
    description: 'Beheer leads, klanten en deals op één plek.',
  },
  alternates: {
    canonical: 'https://leadbaas.nl',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  )
}

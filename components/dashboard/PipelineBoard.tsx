'use client'

import Link from 'next/link'

interface Stage { key: string; label: string; color: string }
interface Deal {
  id: string
  title: string
  value: number | null
  stage: string
  expected_close_date: string | null
  probability: number | null
  lb_companies?: { name: string }[] | { name: string } | null
  lb_contacts?: { first_name: string; last_name: string | null }[] | { first_name: string; last_name: string | null } | null
}

interface Props {
  stages: Stage[]
  deals: Deal[]
}

export default function PipelineBoard({ stages, deals }: Props) {
  const getDealsByStage = (stage: string) => deals.filter(d => d.stage === stage)
  const getStageValue = (stage: string) =>
    getDealsByStage(stage).reduce((sum, d) => sum + (Number(d.value) || 0), 0)

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4" style={{ minWidth: `${stages.length * 240}px` }}>
        {stages.map(stage => {
          const stageDeals = getDealsByStage(stage.key)
          const totalVal = getStageValue(stage.key)

          return (
            <div key={stage.key} className="flex-1" style={{ minWidth: '220px' }}>
              {/* Stage header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: stage.color }} />
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: stage.color }}>
                    {stage.label}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{stageDeals.length}</span>
              </div>

              {/* Stage value */}
              <div className="text-xs font-semibold px-1 mb-3" style={{ color: stage.color }}>
                {totalVal > 0 ? `€ ${totalVal.toLocaleString('nl-NL')}` : '—'}
              </div>

              {/* Deal cards */}
              <div className="space-y-2">
                {stageDeals.map(deal => (
                  <Link key={deal.id} href={`/dashboard/deals/${deal.id}`}>
                    <div className="p-3 rounded-xl cursor-pointer hover:border-opacity-30 transition-all"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <div className="font-semibold text-sm text-white mb-1 truncate">{deal.title}</div>
                      {deal.lb_companies && (
                        <div className="text-xs text-gray-500 mb-1">
                          {Array.isArray(deal.lb_companies) ? deal.lb_companies[0]?.name : deal.lb_companies.name}
                        </div>
                      )}
                      {deal.lb_contacts && (
                        <div className="text-xs text-gray-600">
                          {Array.isArray(deal.lb_contacts)
                            ? `${deal.lb_contacts[0]?.first_name || ''} ${deal.lb_contacts[0]?.last_name || ''}`
                            : `${deal.lb_contacts.first_name} ${deal.lb_contacts.last_name || ''}`}
                        </div>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-bold" style={{ color: stage.color }}>
                          {deal.value ? `€ ${Number(deal.value).toLocaleString('nl-NL')}` : '—'}
                        </span>
                        {deal.probability !== null && (
                          <span className="text-xs text-gray-600">{deal.probability}%</span>
                        )}
                      </div>
                      {deal.expected_close_date && (
                        <div className="text-xs text-gray-600 mt-1">
                          Sluitdatum: {new Date(deal.expected_close_date).toLocaleDateString('nl-NL')}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}

                {/* Add deal button */}
                <Link href={`/dashboard/deals/nieuw?stage=${stage.key}`}
                  className="block p-2 rounded-xl text-center text-xs text-gray-600 hover:text-gray-400 transition-colors border-dashed border"
                  style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  + Deal toevoegen
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

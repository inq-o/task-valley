import { CATEGORY_ICONS, STAT_NAMES } from '@/lib/defaults'
import type { VillageZone } from '@/types'

interface Props {
  zone: VillageZone
  completedToday: boolean
}

const TIER_SIZE = 5

function getBarPct(completions: number): number {
  if (completions === 0) return 0
  if (completions % TIER_SIZE === 0) return 100
  return ((completions % TIER_SIZE) / TIER_SIZE) * 100
}

export function StatBar({ zone, completedToday }: Props) {
  const stat = STAT_NAMES[zone.category]
  const icon = CATEGORY_ICONS[zone.category]
  const tier = Math.floor(zone.totalCompletions / TIER_SIZE)
  const pct = getBarPct(zone.totalCompletions)

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base leading-none">{icon}</span>
          <span className="w-8 text-[13px] font-bold text-white/60">{stat}</span>
          {tier > 0 && (
            <span className="rounded bg-amber-400/10 px-1 py-0.5 text-[9px] font-semibold text-amber-400/70">
              Lv.{tier + 1}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {completedToday && (
            <span className="text-[10px] font-bold text-amber-400">+1 ▲</span>
          )}
          <span className="w-6 text-right text-[13px] font-bold tabular-nums text-white/80">
            {zone.totalCompletions}
          </span>
        </div>
      </div>

      <div className="h-1 w-full overflow-hidden rounded-full bg-white/8">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: completedToday
              ? 'rgba(245,158,11,1)'
              : zone.totalCompletions > 0
                ? 'rgba(245,158,11,0.5)'
                : 'rgba(255,255,255,0.15)',
            boxShadow: completedToday ? '0 0 8px rgba(245,158,11,0.6)' : 'none',
          }}
        />
      </div>
    </div>
  )
}

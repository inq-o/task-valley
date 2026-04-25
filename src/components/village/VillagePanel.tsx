import { VillageZoneCard } from '@/components/village/VillageZoneCard'
import type { VillageZone } from '@/types'

interface Props {
  zones: VillageZone[]
  level: number
  allDone?: boolean
}

export function VillagePanel({ zones, level, allDone = false }: Props) {
  return (
    <div
      className="relative flex h-full flex-col overflow-hidden rounded-2xl"
      style={{ background: 'radial-gradient(ellipse at 50% 20%, #100c1e 0%, #06060d 100%)' }}
    >
      {/* 전체 완료 pulse glow */}
      {allDone && (
        <div
          className="pointer-events-none absolute inset-0 animate-pulse"
          style={{ background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.13) 0%, transparent 68%)' }}
          aria-hidden="true"
        />
      )}

      {/* 마을 레벨 배지 */}
      <div className="relative z-10 px-4 pt-4">
        <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 ring-1 backdrop-blur-sm transition-all duration-700 ${
          allDone
            ? 'bg-amber-400/15 ring-amber-400/40'
            : 'bg-white/5 ring-white/8'
        }`}>
          <span className={`h-1.5 w-1.5 rounded-full transition-all duration-700 ${
            allDone
              ? 'bg-amber-300 shadow-[0_0_6px_rgba(245,158,11,0.9)]'
              : 'bg-amber-400'
          }`} />
          {allDone ? (
            <>
              <span className="text-[11px] font-medium text-amber-300">오늘 완료</span>
              <span className="text-[11px] font-semibold text-amber-300">✨</span>
            </>
          ) : (
            <>
              <span className="text-[11px] font-medium text-white/60">마을 회복률</span>
              <span className="text-[11px] font-semibold text-amber-400">{level}%</span>
            </>
          )}
        </div>
      </div>

      {/* 2x2 구역 카드 */}
      <div className="relative z-10 grid flex-1 grid-cols-2 gap-2.5 p-4">
        {zones.map((zone) => (
          <VillageZoneCard key={zone.category} zone={zone} />
        ))}
      </div>
    </div>
  )
}

import { CATEGORY_ICONS, ZONE_LABELS } from '@/lib/defaults'
import type { VillageZone } from '@/types'

interface Props {
  zone: VillageZone
}

function getCardBg(p: number): string {
  if (p === 0)   return 'rgba(8, 8, 18, 0.78)'
  if (p <= 25)   return 'rgba(14, 12, 26, 0.78)'
  if (p <= 50)   return 'rgba(26, 17, 8, 0.80)'
  if (p <= 75)   return 'rgba(44, 27, 6, 0.82)'
  return                'rgba(58, 34, 5, 0.85)'
}

function getGlow(p: number): string {
  if (p < 60) return 'none'
  const a = ((p - 60) / 40) * 0.18
  return `inset 0 0 28px rgba(245,158,11,${a}), 0 0 12px rgba(245,158,11,${a * 0.5})`
}

function litCount(p: number): number {
  return Math.round((p / 100) * 5)
}

export function VillageZoneCard({ zone }: Props) {
  const lit = litCount(zone.progress)
  const isDone = zone.progress === 100

  return (
    <article
      className="flex flex-col overflow-hidden rounded-xl p-3 ring-1 ring-white/8 backdrop-blur-sm transition-all duration-700"
      style={{
        background: getCardBg(zone.progress),
        boxShadow: getGlow(zone.progress),
      }}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-sm leading-none">{CATEGORY_ICONS[zone.category]}</span>
          <span className="text-[11px] font-medium text-white/55">
            {ZONE_LABELS[zone.category]}
          </span>
        </div>
        <span
          className={`text-[10px] font-semibold tabular-nums transition-colors duration-500 ${
            zone.progress > 0 ? 'text-amber-400' : 'text-white/20'
          }`}
        >
          {isDone ? '✨ 완료' : `${zone.progress}%`}
        </span>
      </div>

      {/* 건물 + 창문 */}
      <div className="relative my-3 flex flex-1 flex-col items-center justify-end">
        <div className="relative w-4/5 rounded-t-sm bg-black/35 pb-1 pt-3">
          {/* 창문 2행 */}
          <div className="mb-1.5 flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-sm transition-all duration-500 ${
                  i < lit
                    ? 'bg-amber-400 shadow-[0_0_7px_rgba(245,158,11,0.85)]'
                    : 'bg-white/8'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-center gap-2">
            {[3, 4].map((i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-sm transition-all duration-500 ${
                  i < lit
                    ? 'bg-amber-400 shadow-[0_0_7px_rgba(245,158,11,0.85)]'
                    : 'bg-white/8'
                }`}
              />
            ))}
          </div>
          {/* 문 */}
          <div className="mx-auto mt-1.5 h-3 w-3 rounded-t-sm bg-black/50" />
        </div>
      </div>

      {/* 진행바 */}
      <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-amber-400 transition-all duration-700"
          style={{ width: `${zone.progress}%` }}
        />
      </div>
    </article>
  )
}

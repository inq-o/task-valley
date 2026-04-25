import { CATEGORY_ICONS, ZONE_LABELS } from '@/lib/defaults'
import type { VillageZone } from '@/types'

interface Props {
  zone: VillageZone
}

function getStage(p: number): 0 | 1 | 2 | 3 | 4 {
  if (p === 0) return 0
  if (p <= 25) return 1
  if (p <= 50) return 2
  if (p <= 75) return 3
  return 4
}

const STAGE_LABELS = ['폐허', '기초', '건설중', '성장중', '완성']

const CARD_BG = [
  'rgba(8,8,18,0.9)',
  'rgba(12,10,22,0.9)',
  'rgba(22,14,6,0.9)',
  'rgba(34,20,4,0.9)',
  'rgba(46,27,3,0.9)',
]

const BUILDING_HEIGHT = [0, 28, 46, 62, 78] // percentage of building area

const WINDOW_ROWS = [0, 0, 1, 2, 3]

export function VillageZoneCard({ zone }: Props) {
  const stage = getStage(zone.progress)
  const heightPct = BUILDING_HEIGHT[stage]
  const windowRows = WINDOW_ROWS[stage]
  const ringOpacity = [0.06, 0.08, 0.18, 0.35, 0.55][stage]
  const ringColor = stage <= 1
    ? `rgba(255,255,255,${ringOpacity})`
    : `rgba(245,158,11,${ringOpacity})`
  const glowStrength = stage >= 3 ? (stage - 2) * 0.07 : 0

  return (
    <article
      className="flex flex-col overflow-hidden rounded-xl p-3 transition-all duration-700"
      style={{
        background: CARD_BG[stage],
        outline: `1px solid ${ringColor}`,
        boxShadow: glowStrength > 0
          ? `inset 0 0 28px rgba(245,158,11,${glowStrength}), 0 0 12px rgba(245,158,11,${glowStrength * 0.4})`
          : 'none',
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
        <span className={`text-[10px] font-semibold tabular-nums transition-colors duration-500 ${
          stage > 0 ? 'text-amber-400' : 'text-white/20'
        }`}>
          {zone.progress === 100 ? '✨' : `${zone.progress}%`}
        </span>
      </div>

      {/* 건물 영역 */}
      <div className="relative my-2 flex flex-1 flex-col justify-end overflow-hidden" style={{ minHeight: 72 }}>
        {/* 지면 */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />

        {stage === 0 ? (
          /* 폐허 — 돌무더기 */
          <div className="mb-px flex items-end justify-center gap-1">
            {[5, 3, 7, 4, 6, 3].map((h, i) => (
              <div
                key={i}
                className="rounded-sm bg-white/[0.07] transition-all duration-700"
                style={{ width: 4 + (i % 2) * 2, height: h }}
              />
            ))}
          </div>
        ) : (
          /* 건물 */
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t transition-all duration-700"
            style={{
              width: '58%',
              height: `${heightPct}%`,
              background: stage >= 3
                ? 'rgba(52,30,4,0.92)'
                : 'rgba(16,12,24,0.92)',
              outline: `1px solid rgba(255,255,255,${0.04 + stage * 0.025})`,
            }}
          >
            {/* 창문 그리드 */}
            <div className="absolute inset-x-0 top-2 flex flex-col gap-1.5 px-2">
              {Array.from({ length: windowRows }).map((_, row) => (
                <div key={row} className="flex justify-center gap-1.5">
                  {[0, 1, 2].map((col) => {
                    const lit = stage === 4 || (stage === 3) || (stage === 2 && col !== 1)
                    return (
                      <span
                        key={col}
                        className="rounded-sm transition-all duration-500"
                        style={{
                          width: 4,
                          height: 4,
                          background: lit
                            ? `rgba(245,158,11,${0.55 + stage * 0.1})`
                            : 'rgba(255,255,255,0.07)',
                          boxShadow: lit && stage >= 3
                            ? `0 0 5px rgba(245,158,11,${0.6 + (stage - 3) * 0.2})`
                            : 'none',
                        }}
                      />
                    )
                  })}
                </div>
              ))}
            </div>

            {/* 문 */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-sm"
              style={{ width: 7, height: 9, background: 'rgba(0,0,0,0.55)' }}
            />

            {/* stage 4: 지붕 장식 */}
            {stage === 4 && (
              <div
                className="absolute -top-1.5 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 animate-pulse"
                style={{ width: 5, height: 5, boxShadow: '0 0 8px rgba(245,158,11,1)' }}
              />
            )}
          </div>
        )}
      </div>

      {/* 단계 레이블 */}
      <div className="mb-1.5 text-center">
        <span className={`text-[9px] uppercase tracking-widest transition-colors duration-500 ${
          stage > 0 ? 'text-amber-500/60' : 'text-white/18'
        }`}>
          {STAGE_LABELS[stage]}
        </span>
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

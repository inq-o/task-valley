import { VillageZoneCard } from '@/components/village/VillageZoneCard'
import type { TaskCategory, VillageZone } from '@/types'
import Image from 'next/image'

interface Props {
  zones: VillageZone[]
  level: number
  allDone?: boolean
}

const maskPositions: Record<TaskCategory, string> = {
  exercise: '22% 28%',
  study:    '72% 22%',
  coding:   '25% 72%',
  rest:     '74% 74%',
}

export function VillagePanel({ zones, level, allDone = false }: Props) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl">
      {/* 배경 이미지 */}
      <Image
        src="/village_dark.png"
        alt="Task Valley"
        fill
        className="object-cover object-center"
        priority
      />

      {/* 구역별 screen blend 조명 */}
      {zones.map((zone) => {
        if (zone.progress === 0) return null
        const pos = maskPositions[zone.category]
        const mask = `radial-gradient(ellipse 58% 58% at ${pos}, black 20%, transparent 72%)`
        return (
          <div
            key={zone.category}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{
              opacity: zone.progress / 100,
              mixBlendMode: 'screen',
              WebkitMaskImage: mask,
              maskImage: mask,
            }}
            aria-hidden="true"
          >
            <Image src="/village_lit.png" alt="" fill className="object-cover object-center" />
          </div>
        )
      })}

      {/* 어두운 그라디언트 오버레이 — 카드 가독성 향상 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />

      {/* 전체 완료 pulse glow */}
      {allDone && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.18) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
      )}

      {/* 마을 레벨 배지 */}
      <div className="relative z-10 px-4 pt-4">
        <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 ring-1 backdrop-blur-sm transition-all duration-700 ${
          allDone
            ? 'bg-amber-400/15 ring-amber-400/40'
            : 'bg-black/50 ring-white/8'
        }`}>
          <span className={`h-1.5 w-1.5 rounded-full transition-colors duration-700 ${allDone ? 'bg-amber-300 shadow-[0_0_6px_rgba(245,158,11,0.9)]' : 'bg-amber-400'}`} />
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

import { VillageZoneCard } from '@/components/village/VillageZoneCard'
import type { VillageZone } from '@/types'
import Image from 'next/image'

interface Props {
  zones: VillageZone[]
  level: number
}

export function VillagePanel({ zones, level }: Props) {
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

      {/* 어두운 그라디언트 오버레이 — 카드 가독성 향상 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40" />

      {/* 마을 레벨 배지 */}
      <div className="relative z-10 px-4 pt-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-black/50 px-3 py-1.5 ring-1 ring-white/8 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          <span className="text-[11px] font-medium text-white/60">마을 회복률</span>
          <span className="text-[11px] font-semibold text-amber-400">{level}%</span>
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

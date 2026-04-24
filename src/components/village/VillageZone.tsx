import type { TaskCategory, VillageStage, VillageZone as VillageZoneType } from '@/types'
import Image from 'next/image'

interface VillageZoneProps {
  zone: VillageZoneType
}

const categoryClipPaths: Record<TaskCategory, string> = {
  exercise: 'polygon(0 0, 50% 0, 50% 50%, 0 50%)',     // 좌측 상단
  study: 'polygon(50% 0, 100% 0, 100% 50%, 50% 50%)',   // 우측 상단
  coding: 'polygon(0 50%, 50% 50%, 50% 100%, 0 100%)',  // 좌측 하단
  rest: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)', // 우측 하단
}

// v0.1.1: Claude Code가 14일짜리 로직을 넣기 전 임시 매핑
// 나중에 opacity를 0~100% 등으로 자유롭게 바꿀 수 있습니다.
const stageOpacity: Record<VillageStage, string> = {
  0: 'opacity-0',
  1: 'opacity-30',
  2: 'opacity-60',
  3: 'opacity-100',
}

export function VillageZone({ zone }: VillageZoneProps) {
  const opacityClass = stageOpacity[zone.stage] || 'opacity-0'

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${opacityClass}`}
      style={{ clipPath: categoryClipPaths[zone.category] }}
    >
      <Image
        src="/village_lit.png"
        alt={`${zone.category} 구역 불빛`}
        fill
        className="object-cover object-center"
      />
    </div>
  )
}

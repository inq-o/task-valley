import type { TaskCategory, VillageStage, VillageZone as VillageZoneType } from '@/types'
import Image from 'next/image'

interface VillageZoneProps {
  zone: VillageZoneType
}

const categoryClipPaths: Record<TaskCategory, string> = {
  exercise: 'polygon(0 0, 50% 0, 50% 50%, 0 50%)',
  study: 'polygon(50% 0, 100% 0, 100% 50%, 50% 50%)',
  coding: 'polygon(0 50%, 50% 50%, 50% 100%, 0 100%)',
  rest: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)',
}

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
      aria-hidden="true"
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

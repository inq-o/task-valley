import type { TaskCategory, VillageStage, VillageZone as VillageZoneType } from '@/types'
import Image from 'next/image'

interface VillageZoneProps {
  zone: VillageZoneType
}

const zoneMaskPositions: Record<TaskCategory, string> = {
  exercise: '22% 28%',
  study: '72% 22%',
  coding: '25% 72%',
  rest: '74% 74%',
}

const stageOpacityValue: Record<VillageStage, number> = {
  0: 0,
  1: 0.6,
  2: 0.85,
  3: 1,
}

export function VillageZone({ zone }: VillageZoneProps) {
  const maskPos = zoneMaskPositions[zone.category]
  const opacity = stageOpacityValue[zone.stage]
  const maskImage = `radial-gradient(ellipse 55% 55% at ${maskPos}, black 25%, transparent 70%)`

  return (
    <div
      className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
      style={{
        opacity,
        mixBlendMode: 'screen',
        WebkitMaskImage: maskImage,
        maskImage,
      }}
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

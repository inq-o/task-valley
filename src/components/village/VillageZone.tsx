import type { TaskCategory, VillageZone as VillageZoneType } from '@/types'
import Image from 'next/image'

interface VillageZoneProps {
  zone: VillageZoneType
}

const maskPositions: Record<TaskCategory, string> = {
  exercise: '22% 28%',
  study:    '72% 22%',
  coding:   '25% 72%',
  rest:     '74% 74%',
}

export function VillageZone({ zone }: VillageZoneProps) {
  if (zone.progress === 0) return null

  const pos = maskPositions[zone.category]
  const opacity = zone.progress / 100
  const mask = `radial-gradient(ellipse 58% 58% at ${pos}, black 20%, transparent 72%)`

  return (
    <div
      className="absolute inset-0 transition-opacity duration-700 ease-in-out"
      style={{
        opacity,
        mixBlendMode: 'screen',
        WebkitMaskImage: mask,
        maskImage: mask,
      }}
      aria-hidden="true"
    >
      <Image
        src="/village_lit.png"
        alt=""
        fill
        className="object-cover object-center"
      />
    </div>
  )
}

import { VillageZone } from '@/components/village/VillageZone'
import type { TaskCategory } from '@/types'
import type { VillageZone as VillageZoneType } from '@/types'
import Image from 'next/image'

interface VillageMapProps {
  zones: VillageZoneType[]
}

const zoneClipPaths: Record<TaskCategory, string> = {
  exercise: 'polygon(0 0, 50% 0, 50% 50%, 0 50%)',
  study: 'polygon(50% 0, 100% 0, 100% 50%, 50% 50%)',
  coding: 'polygon(0 50%, 50% 50%, 50% 100%, 0 100%)',
  rest: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)',
}

export function VillageMap({ zones }: VillageMapProps) {
  const inactiveZones = zones.filter((zone) => zone.stage === 0)

  return (
    <section className="relative flex-1 w-full overflow-hidden bg-village-bg">
      {inactiveZones.map((zone) => (
        <Image
          key={zone.category}
          src="/village_dark.png"
          alt="어두운 마을 전경"
          fill
          className="object-cover object-center"
          priority={zone.category === 'exercise'}
          style={{ clipPath: zoneClipPaths[zone.category] }}
        />
      ))}

      {zones.map((zone) => (
        <VillageZone key={zone.category} zone={zone} />
      ))}
    </section>
  )
}

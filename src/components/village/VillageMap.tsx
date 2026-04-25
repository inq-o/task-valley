import { VillageZone } from '@/components/village/VillageZone'
import type { VillageZone as VillageZoneType } from '@/types'
import Image from 'next/image'

interface VillageMapProps {
  zones: VillageZoneType[]
}

export function VillageMap({ zones }: VillageMapProps) {
  return (
    <div className="absolute inset-0">
      <Image
        src="/village_dark.png"
        alt="Task Valley"
        fill
        className="object-cover object-center"
        priority
      />
      {zones.map((zone) => (
        <VillageZone key={zone.category} zone={zone} />
      ))}
    </div>
  )
}

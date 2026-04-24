import { VillageZone } from '@/components/village/VillageZone'
import type { VillageZone as VillageZoneType } from '@/types'
import Image from 'next/image'

interface VillageMapProps {
  zones: VillageZoneType[]
}

export function VillageMap({ zones }: VillageMapProps) {
  return (
    <section className="relative h-full w-full overflow-hidden bg-village-bg">
      <Image
        src="/village_dark.png"
        alt="어두운 마을 전경"
        fill
        className="object-cover object-center"
        priority
      />

      {zones.map((zone) => (
        <VillageZone key={zone.category} zone={zone} />
      ))}
    </section>
  )
}

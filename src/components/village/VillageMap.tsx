import { VillageZone } from '@/components/village/VillageZone'
import type { VillageZone as VillageZoneType } from '@/types'
import Image from 'next/image'

interface VillageMapProps {
  zones: VillageZoneType[]
}

export function VillageMap({ zones }: VillageMapProps) {
  return (
    <section className="relative h-full w-full bg-[#05050a]">
      {/* Base Dark Village Image */}
      <Image
        src="/village_dark.png"
        alt="어두운 마을 전경"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Lit Village Overlays (4 Zones) */}
      {zones.map((zone) => (
        <VillageZone key={zone.category} zone={zone} />
      ))}
    </section>
  )
}

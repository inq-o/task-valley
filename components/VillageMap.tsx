import { VillageZone } from '@/components/VillageZone'
import type { VillageZone as VillageZoneType } from '@/types'

interface VillageMapProps {
  zones: VillageZoneType[]
}

export function VillageMap({ zones }: VillageMapProps) {
  return (
    <section className="relative flex flex-1 flex-col border border-village-border bg-village-panel p-3 sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-village-text-muted">Task Valley</p>
          <h2 className="mt-1 text-xl font-semibold">마을 복구 현황</h2>
        </div>
        <div className="hidden h-2 w-24 bg-gradient-to-r from-village-border to-village-energy-amber sm:block" />
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2 sm:gap-3">
        {zones.map((zone) => (
          <VillageZone key={zone.category} zone={zone} />
        ))}
      </div>
    </section>
  )
}

import { ZONE_LABELS } from '@/lib/defaults'
import type { TaskCategory, VillageStage, VillageZone as VillageZoneType } from '@/types'

interface VillageZoneProps {
  zone: VillageZoneType
}

const stageClassNames: Record<VillageStage, string> = {
  0: 'bg-village-surface shadow-none',
  1: 'bg-village-energy-stage1 shadow-none',
  2: 'bg-village-energy-stage2 shadow-none',
  3: 'bg-village-energy-stage3 shadow-glow',
}

const zoneLayouts: Record<TaskCategory, string[]> = {
  exercise: ['left-5 top-6 h-12 w-3', 'left-10 top-10 h-8 w-3', 'left-16 top-7 h-11 w-3'],
  study: ['left-5 top-7 h-12 w-4', 'left-11 top-5 h-14 w-4', 'left-[4.25rem] top-8 h-11 w-4'],
  coding: ['left-5 top-8 h-4 w-4', 'left-11 top-12 h-4 w-4', 'left-[4.25rem] top-8 h-4 w-4'],
  rest: ['left-7 top-10 h-4 w-4', 'left-12 top-6 h-5 w-5', 'left-[4.5rem] top-12 h-3 w-6'],
}

const litWindowCounts: Record<VillageStage, number> = {
  0: 0,
  1: 1,
  2: 3,
  3: 5,
}

export function VillageZone({ zone }: VillageZoneProps) {
  const litWindowCount = litWindowCounts[zone.stage]

  return (
    <article
      className={`relative min-h-40 overflow-hidden border border-village-border p-3 transition-[background-color,box-shadow,border-color] duration-700 ease-in-out sm:min-h-56 ${stageClassNames[zone.stage]}`}
    >
      <div className="absolute inset-x-3 bottom-3 h-2 bg-black/20" />
      <div className="absolute bottom-5 left-1/2 h-7 w-8 -translate-x-1/2 bg-black/20" />

      {zoneLayouts[zone.category].map((className, index) => (
        <div
          key={className}
          className={`absolute ${className} border border-village-border bg-black/20`}
          aria-hidden="true"
        >
          <div
            className={`m-1 h-2 w-2 transition-colors duration-700 ${
              index < litWindowCount ? 'bg-village-energy-amber' : 'bg-village-border/60'
            }`}
          />
        </div>
      ))}

      {Array.from({ length: Math.max(0, litWindowCount - 3) }).map((_, index) => (
        <div
          key={index}
          className="absolute h-2 w-2 bg-village-energy-amber shadow-glow transition-colors duration-700"
          style={{
            right: `${18 + index * 18}px`,
            top: `${32 + index * 24}px`,
          }}
          aria-hidden="true"
        />
      ))}

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-village-text-muted">
            Stage {zone.stage}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-village-text-primary">
            {ZONE_LABELS[zone.category]}
          </h3>
        </div>
        <p className="mt-24 text-xs text-village-text-muted sm:mt-32">
          복구 {zone.totalCompletions}회
        </p>
      </div>
    </article>
  )
}

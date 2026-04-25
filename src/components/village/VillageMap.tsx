import type { VillageState } from '@/types'
import type { TaskCategory } from '@/types'

interface Props {
  village: VillageState
}

const ZONE_LABELS: Record<TaskCategory, string> = {
  exercise: '훈련장',
  study:    '도서관',
  coding:   '작업장',
  rest:     '공원',
}
const ZONE_ICONS: Record<TaskCategory, string> = {
  exercise: '⚔️',
  study:    '📖',
  coding:   '⚙️',
  rest:     '🌿',
}
const ZONE_ORDER: TaskCategory[] = ['exercise', 'study', 'coding', 'rest']

function stageStyle(c: number) {
  if (c === 0) return { bg: '#1a1a2e', glow: 'none',                              border: 'rgba(255,255,255,0.05)' }
  if (c < 3)   return { bg: '#2a2a3d', glow: 'none',                              border: 'rgba(255,255,255,0.07)' }
  if (c < 6)   return { bg: '#3d3020', glow: '0 0 12px rgba(245,158,11,0.12)',    border: 'rgba(245,158,11,0.08)'  }
  return             { bg: '#5c4a1e', glow: '0 0 18px rgba(245,158,11,0.22)',    border: 'rgba(245,158,11,0.18)'  }
}

function litCount(c: number): number {
  if (c === 0) return 0
  if (c < 3)   return 1
  if (c < 6)   return 2
  return 4
}

const W = (lit: boolean) => ({
  background: lit ? '#f59e0b' : 'rgba(255,255,255,0.08)',
  boxShadow:  lit ? '0 0 6px rgba(245,158,11,0.8)' : 'none',
  transition: 'all 0.7s',
})

function TrainingZone({ lit }: { lit: number }) {
  const ws = [0, 1].map(i => i < lit)
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={{ position: 'absolute', bottom: 28, left: 14, width: 56, height: 6,  background: 'rgba(255,255,255,0.10)', borderRadius: 1 }} />
      {[0, 16, 32].map(x => <div key={x} style={{ position: 'absolute', bottom: 34, left: 14 + x, width: 8, height: 14, background: 'rgba(255,255,255,0.10)', borderRadius: 1 }} />)}
      <div style={{ position: 'absolute', bottom: 6, left: 14, width: 56, height: 22, background: 'rgba(255,255,255,0.10)', borderRadius: 1 }} />
      {[22, 38].map((x, i) => (
        <div key={x} style={{ position: 'absolute', bottom: 14, left: x, width: 6, height: 6, borderRadius: 1, ...W(ws[i]) }} />
      ))}
    </div>
  )
}

function LibraryZone({ lit }: { lit: number }) {
  const heights = [36, 28, 40, 22, 34, 30]
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {heights.map((h, i) => (
        <div key={i} style={{ position: 'absolute', bottom: 6, left: 16 + i * 8, width: 6, height: h, ...W(i < lit) }} />
      ))}
      <div style={{ position: 'absolute', bottom: 4, left: 14, width: 52, height: 3, background: 'rgba(255,255,255,0.12)' }} />
    </div>
  )
}

function WorkshopZone({ lit }: { lit: number }) {
  const rows = [44, 30, 16]
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {rows.map(b => <div key={b} style={{ position: 'absolute', bottom: b, left: 14, width: 50, height: 10, background: 'rgba(255,255,255,0.10)', borderRadius: 2 }} />)}
      {rows.map((b, i) => (
        <div key={b} style={{ position: 'absolute', bottom: b + 3, right: 18, width: 5, height: 5, borderRadius: '50%', ...W(i < lit) }} />
      ))}
    </div>
  )
}

function ParkZone({ lit }: { lit: number }) {
  const clusters = [{ x: 16, y: 30, s: 10 }, { x: 24, y: 38, s: 14 }, { x: 38, y: 42, s: 10 }, { x: 50, y: 34, s: 8 }]
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {clusters.map((c, i) => (
        <div key={i} style={{ position: 'absolute', bottom: c.y, left: c.x, width: c.s, height: c.s, borderRadius: 3, ...W(i < lit) }} />
      ))}
      <div style={{ position: 'absolute', bottom: 6, left: 14, width: 52, height: 4, background: 'rgba(255,255,255,0.10)' }} />
    </div>
  )
}

const ZONE_ART: Record<TaskCategory, React.ComponentType<{ lit: number }>> = {
  exercise: TrainingZone,
  study:    LibraryZone,
  coding:   WorkshopZone,
  rest:     ParkZone,
}

function VillageZoneCell({ category, totalCompletions }: { category: TaskCategory; totalCompletions: number }) {
  const { bg, glow, border } = stageStyle(totalCompletions)
  const lit = litCount(totalCompletions)
  const ZoneArt = ZONE_ART[category]

  return (
    <div style={{ background: bg, borderRadius: 10, border: `1px solid ${border}`, boxShadow: glow, position: 'relative', overflow: 'hidden', transition: 'all 0.7s', minHeight: 110 }}>
      <div style={{ position: 'absolute', top: 10, left: 12, zIndex: 2 }}>
        <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
          {ZONE_ICONS[category]} {ZONE_LABELS[category]}
        </span>
      </div>
      <div style={{ position: 'absolute', inset: 0 }}>
        <ZoneArt lit={lit} />
      </div>
    </div>
  )
}

export function VillageMap({ village }: Props) {
  const zoneMap = Object.fromEntries(village.zones.map(z => [z.category, z]))

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
      {ZONE_ORDER.map(cat => (
        <VillageZoneCell
          key={cat}
          category={cat}
          totalCompletions={zoneMap[cat]?.totalCompletions ?? 0}
        />
      ))}
    </div>
  )
}

import { StatBar } from '@/components/character/StatBar'
import type { Task, VillageState } from '@/types'

interface Props {
  village: VillageState
  tasks: Task[]
  allDone: boolean
}

const CLASS_TIERS = [
  { level: 1, name: '견습생', min: 0,  max: 5  },
  { level: 2, name: '모험가', min: 5,  max: 15 },
  { level: 3, name: '용사',   min: 15, max: 30 },
  { level: 4, name: '영웅',   min: 30, max: 50 },
  { level: 5, name: '전설',   min: 50, max: Infinity },
]

function getCharClass(totalXP: number) {
  const tier = CLASS_TIERS.find((t) => totalXP < t.max) ?? CLASS_TIERS[4]
  const xpInLevel = totalXP - tier.min
  const xpForLevel = tier.max === Infinity ? 1 : tier.max - tier.min
  const pct = tier.max === Infinity ? 100 : (xpInLevel / xpForLevel) * 100
  return { ...tier, xpInLevel, xpForLevel, pct }
}

export function CharacterPanel({ village, tasks, allDone }: Props) {
  const totalXP = village.level
  const char = getCharClass(totalXP)
  const completedIds = new Set(tasks.filter((t) => t.completed).map((t) => t.id))

  return (
    <div
      className={`flex h-full flex-col rounded-2xl p-5 ring-1 transition-all duration-700 ${
        allDone
          ? 'bg-[#0e0a04] ring-amber-400/30'
          : 'bg-[#0a0a14] ring-white/8'
      }`}
    >
      {/* 캐릭터 헤더 */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2.5">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-400/60">
            LV.{char.level}
          </span>
          <span className="text-2xl font-bold text-white/90">{char.name}</span>
          {allDone && <span className="animate-pulse text-lg">✨</span>}
        </div>
        <p className="mt-1 text-[11px] text-white/25">
          총 {totalXP} XP 획득
        </p>
      </div>

      {/* 스탯 목록 */}
      <div className="flex flex-1 flex-col justify-center gap-5">
        {village.zones.map((zone) => (
          <StatBar
            key={zone.category}
            zone={zone}
            completedToday={completedIds.has(zone.category)}
          />
        ))}
      </div>

      {/* 전체 XP 바 */}
      <div className="mt-6">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-widest text-white/25">
            {char.level < 5 ? '다음 레벨까지' : '최고 등급'}
          </span>
          {char.level < 5 && (
            <span className="text-[9px] tabular-nums text-white/25">
              {char.xpInLevel} / {char.xpForLevel} XP
            </span>
          )}
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
          <div
            className="h-full rounded-full bg-amber-400 transition-all duration-700"
            style={{
              width: `${char.pct}%`,
              boxShadow: allDone ? '0 0 10px rgba(245,158,11,0.6)' : 'none',
            }}
          />
        </div>
      </div>

      {/* 스트릭 */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-[10px] text-white/25">연속 달성</span>
        <span className="text-[10px] font-semibold text-white/50">
          🔥 {village.streak}일
        </span>
      </div>
    </div>
  )
}

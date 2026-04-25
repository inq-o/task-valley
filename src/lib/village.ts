import type { DailyState, TaskCategory, VillageZone } from '@/types'

const DAYS_TO_FULL = 7

export function calcProgress(totalCompletions: number): number {
  return Math.min(Math.round((totalCompletions / DAYS_TO_FULL) * 100), 100)
}

export function calcLevel(zones: VillageZone[]): number {
  if (zones.length === 0) return 0
  return Math.round(zones.reduce((sum, z) => sum + z.progress, 0) / zones.length)
}

export function applyCompletion(state: DailyState, category: TaskCategory): DailyState {
  const task = state.tasks.find((t) => t.id === category)
  if (!task || task.completed) return state

  const tasks = state.tasks.map((t) =>
    t.id === category ? { ...t, completed: true } : t,
  )

  const zones = state.village.zones.map((z) => {
    if (z.category !== category) return z
    const totalCompletions = z.totalCompletions + 1
    return { ...z, totalCompletions, progress: calcProgress(totalCompletions) }
  })

  const allDone = tasks.every((t) => t.completed)

  return {
    tasks,
    village: {
      ...state.village,
      zones,
      level: calcLevel(zones),
      streak: allDone ? state.village.streak + 1 : state.village.streak,
    },
  }
}

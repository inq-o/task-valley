import type { DailyState, TaskCategory, VillageStage, VillageZone } from '@/types'

export function calcStage(totalCompletions: number): VillageStage {
  if (totalCompletions >= 3) {
    return 3
  }

  if (totalCompletions >= 2) {
    return 2
  }

  if (totalCompletions >= 1) {
    return 1
  }

  return 0
}

export function calcLevel(zones: VillageZone[]): number {
  return zones.reduce((total, zone) => total + zone.stage, 0)
}

export function applyCompletion(state: DailyState, category: TaskCategory): DailyState {
  const task = state.tasks.find((item) => item.id === category)

  if (!task || task.completed) {
    return state
  }

  const tasks = state.tasks.map((item) =>
    item.id === category ? { ...item, completed: true } : item,
  )

  const zones = state.village.zones.map((zone) => {
    if (zone.category !== category) {
      return zone
    }

    const totalCompletions = zone.totalCompletions + 1

    return {
      ...zone,
      totalCompletions,
      stage: calcStage(totalCompletions),
    }
  })

  const allTasksCompleted = tasks.every((item) => item.completed)

  return {
    tasks,
    village: {
      ...state.village,
      zones,
      level: calcLevel(zones),
      streak: allTasksCompleted ? state.village.streak + 1 : state.village.streak,
    },
  }
}

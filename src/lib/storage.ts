import type { DailyState } from '@/types'
import { createInitialState } from '@/lib/defaults'

const STORAGE_KEY = 'task-valley:v0.2.0:daily-state'

function canUseStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function loadState(): DailyState | null {
  if (!canUseStorage()) {
    return null
  }

  try {
    const rawState = window.localStorage.getItem(STORAGE_KEY)

    if (!rawState) {
      return null
    }

    const parsed = JSON.parse(rawState) as DailyState
    if (!parsed.tasks || !parsed.village?.zones) return null
    return parsed
  } catch {
    return null
  }
}

export function saveState(state: DailyState): void {
  if (!canUseStorage()) {
    return
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // localStorage can fail in private browsing or when quota is full.
  }
}

export function handleDateReset(state: DailyState, today: string): DailyState {
  if (state.village.lastActiveDate === today) {
    return state
  }

  const missedFullCompletion = !state.tasks.every((task) => task.completed)

  return {
    tasks: state.tasks.map((task) => ({ ...task, completed: false })),
    village: {
      ...state.village,
      streak: missedFullCompletion ? 0 : state.village.streak,
      lastActiveDate: today,
    },
  }
}

export function loadOrCreateState(today: string): DailyState {
  const storedState = loadState()

  if (!storedState) {
    return createInitialState(today)
  }

  return handleDateReset(storedState, today)
}

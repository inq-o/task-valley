import type { DailyState, Task, TaskCategory, VillageZone } from '@/types'
import { calcLevel, calcProgress } from '@/lib/village'

export const CATEGORY_LABELS: Record<TaskCategory, string> = {
  exercise: '운동',
  study: '공부',
  coding: '코딩',
  rest: '휴식',
}

export const CATEGORY_ICONS: Record<TaskCategory, string> = {
  exercise: '⚔️',
  study: '📖',
  coding: '⚙️',
  rest: '🌿',
}

export const ZONE_LABELS: Record<TaskCategory, string> = {
  exercise: '훈련장',
  study: '도서관',
  coding: '작업장',
  rest: '공원',
}

export const STAT_NAMES: Record<TaskCategory, string> = {
  exercise: 'STR',
  study: 'INT',
  coding: 'DEX',
  rest: 'VIT',
}

const DEFAULT_TASKS: Task[] = [
  { id: 'exercise', title: '오늘의 운동', targetValue: 30, unit: '분', completed: false },
  { id: 'study', title: '오늘의 공부', targetValue: 1, unit: '시간', completed: false },
  { id: 'coding', title: '오늘의 코딩', targetValue: 1, unit: '커밋', completed: false },
  { id: 'rest', title: '오늘의 휴식', targetValue: 30, unit: '분', completed: false },
]

function makeDefaultZones(): VillageZone[] {
  return DEFAULT_TASKS.map((t) => ({
    category: t.id,
    totalCompletions: 0,
    progress: calcProgress(0),
  }))
}

export function createInitialState(today: string): DailyState {
  const zones = makeDefaultZones()
  return {
    tasks: DEFAULT_TASKS.map((t) => ({ ...t })),
    village: { zones, level: calcLevel(zones), streak: 0, lastActiveDate: today },
  }
}

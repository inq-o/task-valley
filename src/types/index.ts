export type TaskCategory = 'exercise' | 'study' | 'coding' | 'rest'

export interface Task {
  id: TaskCategory
  title: string
  targetValue: number
  unit: string
  completed: boolean
}

export interface VillageZone {
  category: TaskCategory
  totalCompletions: number
  progress: number // 0-100
}

export interface VillageState {
  zones: VillageZone[]
  level: number // 0-100, average of zone progress
  streak: number
  lastActiveDate: string // YYYY-MM-DD
}

export interface DailyState {
  tasks: Task[]
  village: VillageState
}

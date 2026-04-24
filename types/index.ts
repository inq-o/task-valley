export type TaskCategory = 'exercise' | 'study' | 'coding' | 'rest'

export type VillageStage = 0 | 1 | 2 | 3

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
  stage: VillageStage
}

export interface VillageState {
  zones: VillageZone[]
  level: number
  streak: number
  lastActiveDate: string
}

export interface DailyState {
  tasks: Task[]
  village: VillageState
}

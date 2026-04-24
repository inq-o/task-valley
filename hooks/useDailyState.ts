'use client'

import { useEffect, useMemo, useState } from 'react'
import { formatKoreanDate, getTodayKey } from '@/lib/date'
import { loadOrCreateState, saveState } from '@/lib/storage'
import { applyCompletion } from '@/lib/village'
import type { DailyState, TaskCategory } from '@/types'

interface UseDailyStateResult extends DailyState {
  completeTask: (category: TaskCategory) => void
  todayLabel: string
  isReady: boolean
}

export function useDailyState(): UseDailyStateResult {
  const [state, setState] = useState<DailyState | null>(null)
  const todayKey = useMemo(() => getTodayKey(), [])
  const todayLabel = useMemo(() => formatKoreanDate(), [])

  useEffect(() => {
    const initialState = loadOrCreateState(todayKey)
    setState(initialState)
    saveState(initialState)
  }, [todayKey])

  function completeTask(category: TaskCategory): void {
    setState((currentState) => {
      if (!currentState) {
        return currentState
      }

      const nextState = applyCompletion(currentState, category)
      saveState(nextState)

      return nextState
    })
  }

  return {
    tasks: state?.tasks ?? [],
    village: state?.village ?? {
      zones: [],
      level: 0,
      streak: 0,
      lastActiveDate: todayKey,
    },
    completeTask,
    todayLabel,
    isReady: state !== null,
  }
}

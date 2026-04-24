'use client'

import { StatusBar } from '@/components/StatusBar'
import { TaskList } from '@/components/task/TaskList'
import { VillageMap } from '@/components/village/VillageMap'
import { useDailyState } from '@/hooks/useDailyState'

export default function Home() {
  const { tasks, village, completeTask, todayLabel, isReady } = useDailyState()

  if (!isReady) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-village-bg px-6 text-village-text-muted">
        마을을 불러오는 중...
      </main>
    )
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-village-bg text-village-text-primary">
      <div className="absolute inset-0 z-0">
        <VillageMap zones={village.zones} />
      </div>

      <div className="relative z-10 flex min-h-screen w-full flex-col p-4 sm:p-6 lg:p-10 pointer-events-none">
        <div className="pointer-events-auto w-max max-w-full rounded-xl bg-black/20 p-4 backdrop-blur-sm border border-white/5">
          <StatusBar dateLabel={todayLabel} level={village.level} streak={village.streak} />
        </div>

        <div className="mt-auto pointer-events-auto w-full max-w-md self-center lg:mb-10 lg:mr-10 lg:self-end">
          <aside className="rounded-2xl border border-white/10 bg-black/40 p-4 shadow-2xl backdrop-blur-md sm:p-6">
            <div className="mb-4 border-b border-white/10 pb-3">
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/50">Daily Slots</p>
              <h1 className="mt-1 text-xl font-medium text-white/90">오늘의 복구 작업</h1>
            </div>
            <TaskList tasks={tasks} onComplete={completeTask} />
          </aside>
        </div>
      </div>
    </main>
  )
}

'use client'

import { StatusBar } from '@/components/StatusBar'
import { TaskList } from '@/components/TaskList'
import { VillageMap } from '@/components/VillageMap'
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
    <main className="min-h-screen bg-village-bg px-4 py-5 text-village-text-primary sm:px-6 lg:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-7xl flex-col gap-5 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)] lg:items-stretch">
        <section className="flex min-h-[58vh] flex-col gap-4 lg:min-h-0">
          <StatusBar dateLabel={todayLabel} level={village.level} streak={village.streak} />
          <VillageMap zones={village.zones} />
        </section>
        <aside className="border border-village-border bg-village-panel p-3 shadow-[0_16px_45px_rgba(0,0,0,0.22)] sm:p-4">
          <div className="mb-4 border-b border-village-border pb-3">
            <p className="text-xs uppercase tracking-[0.22em] text-village-text-muted">Daily slots</p>
            <h1 className="mt-1 text-2xl font-semibold text-village-text-primary">오늘의 복구 작업</h1>
          </div>
          <TaskList tasks={tasks} onComplete={completeTask} />
        </aside>
      </div>
    </main>
  )
}

'use client'

import { StatusBar } from '@/components/StatusBar'
import { TaskList } from '@/components/task/TaskList'
import { VillagePanel } from '@/components/village/VillagePanel'
import { useDailyState } from '@/hooks/useDailyState'

export default function Home() {
  const { tasks, village, completeTask, todayLabel, isReady } = useDailyState()

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f0f1a]">
        <p className="text-xs text-white/20">마을을 불러오는 중...</p>
      </div>
    )
  }

  const completedCount = tasks.filter((t) => t.completed).length
  const allDone = completedCount === tasks.length

  return (
    <div className="flex h-screen flex-col bg-[#0c0c18] lg:flex-row">

      {/* 왼쪽: 마을 패널 */}
      <div className="h-[45vh] shrink-0 p-3 lg:h-full lg:flex-1 lg:p-4">
        <VillagePanel zones={village.zones} level={village.level} allDone={allDone} />
      </div>

      {/* 오른쪽: 과제 패널 */}
      <div className="flex w-full shrink-0 flex-col overflow-y-auto p-3 lg:w-[360px] lg:p-4">
        <div className="flex h-full flex-col rounded-2xl bg-[#12121e] ring-1 ring-white/5">

          {/* 상태 바 */}
          <div className="border-b border-white/5 px-5 py-4">
            <StatusBar
              dateLabel={todayLabel}
              level={village.level}
              streak={village.streak}
            />
          </div>

          {/* 과제 목록 */}
          <div className="flex-1 px-3 py-3">
            <p className="mb-3 px-2 text-[10px] uppercase tracking-widest text-white/25">
              {allDone ? '오늘 완료 🌟' : '오늘의 복구 작업'}
            </p>
            <TaskList tasks={tasks} onComplete={completeTask} />
          </div>

          {/* 하단 진행 표시 */}
          <div className="border-t border-white/5 px-5 py-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-white/25">
                오늘 진행
              </span>
              <span className="text-[10px] tabular-nums text-white/35">
                {completedCount} / {tasks.length}
              </span>
            </div>
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/8">
              <div
                className="h-full rounded-full bg-amber-400 transition-all duration-500"
                style={{ width: `${(completedCount / tasks.length) * 100}%` }}
              />
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

'use client'

import { StatusBar } from '@/components/StatusBar'
import { TaskList } from '@/components/task/TaskList'
import { VillageMap } from '@/components/village/VillageMap'
import { useDailyState } from '@/hooks/useDailyState'

export default function Home() {
  const { tasks, village, completeTask, todayLabel, isReady } = useDailyState()

  const allDone = tasks.length > 0 && tasks.every((t) => t.completed)

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0f0f1a]">
        <p className="text-sm text-white/30">마을을 불러오는 중...</p>
      </div>
    )
  }

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#0f0f1a]">
      {/* 전체화면 마을 */}
      <VillageMap zones={village.zones} />

      {/* UI 레이어 */}
      <div className="pointer-events-none absolute inset-0 flex flex-col">

        {/* 상태 바 — 좌상단 */}
        <div className="pointer-events-auto m-4 w-fit rounded-xl bg-black/50 px-4 py-3 backdrop-blur-md ring-1 ring-white/5">
          <StatusBar dateLabel={todayLabel} level={village.level} streak={village.streak} />
        </div>

        {/* 과제 패널 — 하단 중앙(모바일) / 우하단(데스크톱) */}
        <div className="pointer-events-auto mt-auto w-full p-4 lg:ml-auto lg:w-[380px] lg:p-6">
          <div className="rounded-2xl bg-black/60 ring-1 ring-white/10 backdrop-blur-xl">
            {/* 패널 헤더 */}
            <div className="border-b border-white/8 px-5 py-4">
              <h1 className="text-sm font-semibold text-white/90">
                {allDone ? '🌟 오늘의 복구 완료!' : '오늘의 복구 작업'}
              </h1>
              {!allDone && (
                <p className="mt-0.5 text-xs text-white/35">
                  완료하면 마을 구역에 불이 켜집니다
                </p>
              )}
            </div>

            {/* 과제 목록 */}
            <div className="px-2 py-2">
              <TaskList tasks={tasks} onComplete={completeTask} />
            </div>

            {/* 진행바 */}
            <div className="px-5 pb-4 pt-2">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] uppercase tracking-widest text-white/25">
                  오늘 진행
                </span>
                <span className="text-[10px] text-white/40">
                  {tasks.filter((t) => t.completed).length} / {tasks.length}
                </span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-amber-400 transition-all duration-500"
                  style={{
                    width: `${(tasks.filter((t) => t.completed).length / tasks.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

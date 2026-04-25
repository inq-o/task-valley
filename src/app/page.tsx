'use client'

import { CharacterPanel } from '@/components/character/CharacterPanel'
import { TaskList } from '@/components/task/TaskList'
import { VillageMap } from '@/components/village/VillageMap'
import { useDailyState } from '@/hooks/useDailyState'
import { formatKoreanDate } from '@/lib/date'

export default function Home() {
  const { tasks, village, completeTask, isReady } = useDailyState()

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a14]">
        <p className="text-xs text-white/20">불러오는 중...</p>
      </div>
    )
  }

  const completedCount = tasks.filter((t) => t.completed).length
  const allDone = completedCount === tasks.length

  return (
    <div className="flex h-screen flex-col bg-[#07070f] lg:flex-row">

      {/* 왼쪽: 캐릭터 패널 */}
      <div className="h-[50vh] shrink-0 p-3 lg:h-full lg:w-[320px] lg:p-4">
        <CharacterPanel village={village} tasks={tasks} allDone={allDone} />
      </div>

      {/* 오른쪽: 퀘스트 패널 + 마을 */}
      <div className="flex min-w-0 flex-1 flex-col gap-3 overflow-y-auto p-3 lg:gap-4 lg:p-4">
        <div className="flex flex-col rounded-2xl bg-[#0e0e1a] ring-1 ring-white/5">

          {/* 헤더 */}
          <div className="border-b border-white/5 px-5 py-4">
            <p className="text-[9px] uppercase tracking-widest text-white/25">오늘의 퀘스트</p>
            <p className="mt-0.5 text-sm font-medium text-white/60">{formatKoreanDate()}</p>
          </div>

          {/* 과제 목록 */}
          <div className="flex-1 px-3 py-3">
            <TaskList tasks={tasks} onComplete={completeTask} />
          </div>

          {/* 하단 진행 */}
          <div className="border-t border-white/5 px-5 py-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-widest text-white/25">
                {allDone ? '오늘 완료 ✨' : '오늘 진행'}
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

        {/* 마을 픽셀아트 맵 */}
        <VillageMap village={village} />

      </div>

    </div>
  )
}

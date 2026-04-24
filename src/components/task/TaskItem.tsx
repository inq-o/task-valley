import { CATEGORY_ICONS, CATEGORY_LABELS } from '@/lib/defaults'
import type { Task, TaskCategory } from '@/types'

interface TaskItemProps {
  task: Task
  onComplete: (category: TaskCategory) => void
}

export function TaskItem({ task, onComplete }: TaskItemProps) {
  return (
    <article
      className={`group flex items-start justify-between gap-3 border-b border-white/5 py-3 transition-colors duration-300 last:border-0 ${
        task.completed ? 'opacity-40' : 'hover:bg-white/5'
      } rounded-lg px-2 -mx-2`}
    >
      <div className="flex min-w-0 items-start gap-3">
        <span className="mt-1 text-lg leading-none" aria-hidden="true">
          {CATEGORY_ICONS[task.id]}
        </span>
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/50">
            {CATEGORY_LABELS[task.id]}
          </p>
          <h2
            className={`mt-0.5 text-base font-medium ${
              task.completed ? 'text-white/40 line-through' : 'text-white/90'
            }`}
          >
            {task.title}
          </h2>
          <p className="mt-0.5 text-xs text-white/40">
            목표 {task.targetValue}
            {task.unit}
          </p>
        </div>
      </div>
      <button
        className={`mt-1 flex h-11 min-w-[4rem] shrink-0 items-center justify-center rounded-md border px-3 text-xs font-semibold transition-colors ${
          task.completed
            ? 'cursor-not-allowed border-village-energy-amber/30 text-village-energy-amber/50'
            : 'border-white/20 bg-white/10 text-white/80 hover:border-village-energy-amber hover:bg-village-energy-amber/20 hover:text-village-energy-amber'
        }`}
        type="button"
        disabled={task.completed}
        onClick={() => onComplete(task.id)}
      >
        {task.completed ? '✓ 완료' : '불 켜기'}
      </button>
    </article>
  )
}

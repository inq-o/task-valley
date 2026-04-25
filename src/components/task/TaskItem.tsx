import { CATEGORY_ICONS, CATEGORY_LABELS } from '@/lib/defaults'
import type { Task, TaskCategory } from '@/types'

interface TaskItemProps {
  task: Task
  onComplete: (category: TaskCategory) => void
}

export function TaskItem({ task, onComplete }: TaskItemProps) {
  return (
    <article
      className={`flex items-center gap-3 rounded-lg px-3 py-3 transition-all duration-200 ${
        task.completed
          ? 'opacity-50'
          : 'hover:bg-white/5 cursor-pointer'
      }`}
      onClick={() => !task.completed && onComplete(task.id)}
    >
      <span className="text-xl leading-none shrink-0" aria-hidden="true">
        {CATEGORY_ICONS[task.id]}
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium uppercase tracking-widest text-white/40">
          {CATEGORY_LABELS[task.id]}
        </p>
        <p
          className={`mt-0.5 text-sm font-medium leading-snug ${
            task.completed ? 'line-through text-white/30' : 'text-white/90'
          }`}
        >
          {task.title}
        </p>
        <p className="mt-0.5 text-xs text-white/30">
          목표 {task.targetValue}{task.unit}
        </p>
      </div>

      <button
        type="button"
        disabled={task.completed}
        onClick={() => onComplete(task.id)}
        className={`shrink-0 min-h-[44px] min-w-[72px] rounded-md border px-3 text-xs font-semibold transition-all duration-200 ${
          task.completed
            ? 'cursor-not-allowed border-amber-500/20 text-amber-500/40'
            : 'border-white/20 bg-white/5 text-white/70 hover:border-amber-400/60 hover:bg-amber-400/10 hover:text-amber-300 active:scale-95'
        }`}
      >
        {task.completed ? '✓ 완료' : '불 켜기'}
      </button>
    </article>
  )
}

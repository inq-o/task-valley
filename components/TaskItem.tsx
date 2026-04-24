import { CATEGORY_LABELS } from '@/lib/defaults'
import type { Task, TaskCategory } from '@/types'

interface TaskItemProps {
  task: Task
  onComplete: (category: TaskCategory) => void
}

export function TaskItem({ task, onComplete }: TaskItemProps) {
  return (
    <article
      className={`border bg-village-surface/70 p-4 transition-colors duration-300 ${
        task.completed
          ? 'border-village-energy-amber opacity-60'
          : 'border-village-border hover:border-village-text-muted'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[0.18em] text-village-text-muted">
            {CATEGORY_LABELS[task.id]}
          </p>
          <h2
            className={`mt-1 text-lg font-semibold ${
              task.completed ? 'text-village-text-muted line-through' : 'text-village-text-primary'
            }`}
          >
            {task.title}
          </h2>
          <p className="mt-2 text-sm text-village-text-muted">
            목표 {task.targetValue}
            {task.unit}
          </p>
        </div>
        <button
          className={`min-h-11 shrink-0 border px-4 text-sm font-semibold transition-colors ${
            task.completed
              ? 'cursor-not-allowed border-village-energy-amber text-village-energy-amber'
              : 'border-village-border bg-village-border text-village-text-primary hover:border-village-energy-amber hover:text-village-energy-amber'
          }`}
          type="button"
          disabled={task.completed}
          onClick={() => onComplete(task.id)}
        >
          {task.completed ? '완료' : '불 켜기'}
        </button>
      </div>
    </article>
  )
}

import { TaskItem } from '@/components/TaskItem'
import type { Task, TaskCategory } from '@/types'

interface TaskListProps {
  tasks: Task[]
  onComplete: (category: TaskCategory) => void
}

export function TaskList({ tasks, onComplete }: TaskListProps) {
  return (
    <div className="grid gap-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onComplete={onComplete} />
      ))}
    </div>
  )
}

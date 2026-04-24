interface StatusBarProps {
  dateLabel: string
  level: number
  streak: number
}

export function StatusBar({ dateLabel, level, streak }: StatusBarProps) {
  return (
    <header className="grid gap-3 border border-village-border bg-village-panel p-3 text-sm sm:grid-cols-3 sm:items-center sm:p-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-village-text-muted">Today</p>
        <p className="mt-1 font-medium text-village-text-primary">{dateLabel}</p>
      </div>
      <div className="border-village-border sm:border-l sm:pl-4">
        <p className="text-xs uppercase tracking-[0.2em] text-village-text-muted">Village</p>
        <p className="mt-1 font-medium text-village-energy-amber">Lv. {level}</p>
      </div>
      <div className="border-village-border sm:border-l sm:pl-4">
        <p className="text-xs uppercase tracking-[0.2em] text-village-text-muted">Streak</p>
        <p className="mt-1 font-medium text-village-text-primary">{streak}일 연속</p>
      </div>
    </header>
  )
}

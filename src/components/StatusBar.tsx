interface StatusBarProps {
  dateLabel: string
  level: number
  streak: number
}

export function StatusBar({ dateLabel, level, streak }: StatusBarProps) {
  return (
    <header className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">오늘</p>
        <p className="mt-0.5 font-medium text-white/80">{dateLabel}</p>
      </div>
      <div className="h-6 w-px bg-white/10" />
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">마을</p>
        <p className="mt-0.5 font-medium text-village-energy-amber">{level}% 회복</p>
      </div>
      <div className="h-6 w-px bg-white/10" />
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">연속</p>
        <p className="mt-0.5 font-medium text-white/80">{streak}일</p>
      </div>
    </header>
  )
}

interface StatusBarProps {
  dateLabel: string
  level: number
  streak: number
}

export function StatusBar({ dateLabel, level, streak }: StatusBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
      <div>
        <p className="text-[9px] uppercase tracking-widest text-white/30">오늘</p>
        <p className="mt-0.5 text-xs font-medium text-white/70">{dateLabel}</p>
      </div>
      <div className="h-4 w-px bg-white/10" />
      <div>
        <p className="text-[9px] uppercase tracking-widest text-white/30">마을 회복</p>
        <p className="mt-0.5 text-xs font-semibold text-amber-400">{level}%</p>
      </div>
      <div className="h-4 w-px bg-white/10" />
      <div>
        <p className="text-[9px] uppercase tracking-widest text-white/30">연속</p>
        <p className="mt-0.5 text-xs font-medium text-white/70">{streak}일</p>
      </div>
    </div>
  )
}

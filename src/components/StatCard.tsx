import type { ReactNode } from 'react'
import { CountUp } from './motion'
import Cite from './Cite'

interface StatCardProps {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  label: string
  year?: string
  note?: ReactNode
  cites?: number[]
  variant?: 'light' | 'dark' | 'alert'
  className?: string
}

const VARIANTS = {
  light: 'bg-paper-warm text-ink border-line hover:border-lake',
  dark: 'bg-night-raised text-paper border-white/10 hover:border-lake',
  alert: 'bg-night-raised text-paper border-white/10 border-l-4 border-l-signal hover:border-signal',
}

export default function StatCard({ value, decimals = 0, prefix = '', suffix = '', label, year, note, cites, variant = 'light', className = '' }: StatCardProps) {
  return (
    <div
      className={`group cursor-pointer rounded-xl border p-5 shadow-sm transition-all duration-250 hover:-translate-y-1 hover:shadow-lg ${VARIANTS[variant]} ${className}`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-mono text-[clamp(1.6rem,3vw,2.6rem)] font-medium leading-none transition-transform duration-300 group-hover:scale-[1.02]">
          <CountUp end={value} decimals={decimals} prefix={prefix} suffix={suffix} />
        </p>
        {year && (
          <span className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-[10px] ${variant === 'light' ? 'bg-lake-soft text-lake' : 'bg-white/10 text-paper/80'}`}>
            {year}
          </span>
        )}
      </div>
      <p className={`mt-3 text-sm font-semibold leading-snug ${variant === 'light' ? 'text-ink-soft' : 'text-paper/85'}`}>
        {label}
        {cites?.map((n) => <Cite key={n} n={n} />)}
      </p>
      {note && <p className={`mt-1.5 text-xs leading-relaxed ${variant === 'light' ? 'text-ink-soft/70' : 'text-paper/60'}`}>{note}</p>}
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { to: '/', label: 'Report' },
  { to: '/daten', label: 'Daten' },
  { to: '/quellen', label: 'Quellen' },
]

export default function Navbar() {
  const [progress, setProgress] = useState(0)
  const [compact, setCompact] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(100, Math.round((y / max) * 100)) : 0)
      setCompact(y > 80)
      if (y > lastY + 12 && y > 300) setHidden(true)
      else if (y < lastY - 8) setHidden(false)
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 text-paper backdrop-blur-md transition-all duration-300 ${
          compact ? 'h-12 bg-night/80' : 'h-16 bg-night/40'
        } ${hidden && !open ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="mx-auto flex h-full max-w-content items-center justify-between px-4 sm:px-6">
          <Link to="/" className="font-display text-sm font-bold tracking-wide sm:text-base">
            ZÜRICH <span className="text-signal">/</span> LEBENSQUALITÄT
          </Link>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Hauptnavigation">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className="relative py-1 font-mono text-xs text-paper/80 transition-colors hover:text-paper">
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-[2px] bg-lake" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="hidden items-center gap-4 md:flex">
            <span className="font-mono text-xs tabular-nums text-paper/70">{progress}&nbsp;%</span>
            <span className="rounded-full border border-gold/50 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-gold">
              Stand: Juli 2026
            </span>
          </div>
          <button className="p-2 md:hidden" onClick={() => setOpen((v) => !v)} aria-label={open ? 'Menü schliessen' : 'Menü öffnen'} aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-night md:hidden"
          >
            {LINKS.map((l, i) => (
              <motion.div key={l.to} initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.06 * i }}>
                <NavLink to={l.to} end={l.to === '/'} className="font-display text-4xl font-bold text-paper">
                  {l.label}
                </NavLink>
              </motion.div>
            ))}
            <span className="mt-6 font-mono text-xs uppercase tracking-wider text-gold">Stand: Juli 2026</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

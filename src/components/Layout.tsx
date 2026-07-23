import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

/**
 * Shared layout — children pattern (Layout wraps <Routes> in App.tsx).
 * The Navbar is `fixed` (glassmorphism overlay per design.md §7), so the
 * Layout owns the offset: top padding equal to nav height on the content slot.
 * Full-bleed heroes opt out inside the page (negative margin / own padding).
 */
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  )
}

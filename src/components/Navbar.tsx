import { useEffect, useState } from 'react'
import { Menu as Burger, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const links = [['Home', '#home'], ['About', '#about'], ['Menu', '#menu'], ['Reviews', '#reviews'], ['Contact', '#contact']]

export default function Navbar() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const f = () => setSolid(scrollY > 40)
    f()
    addEventListener('scroll', f, { passive: true })
    return () => removeEventListener('scroll', f)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${solid || open ? 'bg-char/90 backdrop-blur' : ''}`}>
      <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <a href="#home" className="font-display text-2xl font-bold tracking-tight">Angara<span className="text-ember">.</span></a>
        <ul className="hidden gap-8 md:flex">
          {links.map(([l, h]) => <li key={h}><a href={h} className="font-display text-sm hover:text-ember">{l}</a></li>)}
        </ul>
        <a href="#reserve" className="hidden border border-ember px-5 py-2.5 font-display text-sm text-ember transition-colors hover:bg-ember hover:text-char md:block">
          Reserve a table
        </a>
        <button className="p-2 md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Burger />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden px-5 md:hidden">
            {[...links, ['Reserve a table', '#reserve']].map(([l, h]) => (
              <li key={h}><a onClick={() => setOpen(false)} href={h} className="block py-3 font-display text-2xl">{l}</a></li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
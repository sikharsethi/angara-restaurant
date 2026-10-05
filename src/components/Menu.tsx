import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { categories, dishes } from '../data/menuData'
import type { Category } from '../types'
export default function Menu() {
  const [cat, setCat] = useState<Category>('Starters')
  return (<section id="menu" className="bg-ash px-5 py-24 text-char"><div className="mx-auto max-w-5xl">
    <h2 className="font-display text-5xl font-bold tracking-tight md:text-7xl">The menu</h2>
    <div role="tablist" aria-label="Menu categories" className="-mx-5 mt-10 flex gap-6 overflow-x-auto px-5 pb-2 font-display">
      {categories.map(c => <button key={c} role="tab" aria-selected={c === cat} onClick={() => setCat(c)}
        className={`shrink-0 border-b-2 py-2 ${c === cat ? 'border-ember font-bold' : 'border-transparent text-clay'}`}>{c}</button>)}</div>
    <AnimatePresence mode="wait"><motion.ul key={cat} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="mt-10 divide-y divide-char/15">
      {dishes.filter(d => d.category === cat).map(d => <li key={d.id} className="flex items-baseline justify-between gap-6 py-6">
        <div><h3 className="font-display text-2xl font-semibold"><span role="img" aria-label={d.veg ? 'Vegetarian' : 'Non-vegetarian'} className={`mr-3 inline-block size-3 border ${d.veg ? 'border-green-700 bg-green-700' : 'border-red-800 bg-red-800'}`} />{d.name}
          {d.label && <span className="ml-3 text-sm font-normal italic text-ember">{d.label}</span>}</h3>
          <p className="max-w-md text-clay">{d.description}</p></div>
        <span className="font-display text-xl">₹{d.price.toLocaleString('en-IN')}</span></li>)}</motion.ul></AnimatePresence></div></section>)
}

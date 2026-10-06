import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { categories, dishes } from '../data/menuData'
import type { Category, Dish } from '../types'

type Cat = 'All' | Category
type Diet = 'All' | 'Vegetarian' | 'Non-vegetarian' | 'Spicy'
const cats: Cat[] = ['All', ...categories]
const diets: Diet[] = ['All', 'Vegetarian', 'Non-vegetarian', 'Spicy']
const slug = (d: Dish) => d.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

function Photo({ dish }: { dish: Dish }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className="size-14 shrink-0 overflow-hidden rounded-full border border-char/15 bg-char">
      {failed ? (
        <div className="grid size-full place-items-center bg-[radial-gradient(circle,#4a3320,#1B1512)] font-body text-lg text-ember">{dish.name[0]}</div>
      ) : (
        <img src={`/menu/${slug(dish)}.jpg`} alt={dish.name} loading="lazy" onError={() => setFailed(true)} className="size-full object-cover" />
      )}
    </div>
  )
}

const pill = (on: boolean) =>
  `shrink-0 border px-4 py-2 font-display text-sm transition-colors ${on ? 'border-char bg-char text-ash' : 'border-char/25 text-char/70 hover:border-char'}`

export default function Menu() {
  const [cat, setCat] = useState<Cat>('All')
  const [diet, setDiet] = useState<Diet>('All')

  const list = dishes.filter(d => {
    if (cat !== 'All' && d.category !== cat) return false
    if (diet === 'Vegetarian') return d.veg
    if (diet === 'Non-vegetarian') return !d.veg
    if (diet === 'Spicy') return !!d.spicy
    return true
  })

  return (
    <section id="menu" className="bg-ash px-5 py-24 text-char lg:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-body text-5xl font-light tracking-[-0.02em] md:text-7xl">From the fires</h2>
        <p className="mt-4 max-w-lg text-char/70">Everything on this menu touches live fire. Filter by course or by how you eat.</p>

        <div role="group" aria-label="Course" className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2">
          {cats.map(c => <button key={c} aria-pressed={c === cat} onClick={() => setCat(c)} className={pill(c === cat)}>{c}</button>)}
        </div>
        <div role="group" aria-label="Dietary" className="-mx-5 mt-2 flex gap-2 overflow-x-auto px-5 pb-2">
          {diets.map(d => <button key={d} aria-pressed={d === diet} onClick={() => setDiet(d)} className={`${pill(d === diet)} !border-ember/50 ${d === diet ? '!bg-ember !text-char' : '!text-char/70'}`}>{d}</button>)}
        </div>

        <AnimatePresence mode="wait">
          <motion.ul key={`${cat}-${diet}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {list.length === 0 && <li className="text-char/70">No dishes match these filters. Try “All”.</li>}
            {list.map(d => (
              <li key={d.id} className="flex flex-col border border-char/15 bg-[#F8F3EA] p-6 transition-shadow duration-300 hover:shadow-[0_12px_40px_-12px_rgba(181,101,29,0.55)]">
                <div className="flex items-start gap-4">
                  <Photo dish={d} />
                  <div className="min-w-0 flex-1">
                    <h3 className="font-body text-2xl font-medium leading-tight">{d.name}</h3>
                    <p className="mt-1 flex flex-wrap gap-x-3 font-display text-xs text-char/70">
                      <span className="flex items-center gap-1.5"><span className={`inline-block size-2 ${d.veg ? 'bg-green-700' : 'bg-red-700'}`} />{d.veg ? 'Vegetarian' : 'Non-vegetarian'}</span>
                      {d.spicy && <span className="text-red-800">Spicy</span>}
                      {d.label && <span className="text-ember">{d.label}</span>}
                    </p>
                  </div>
                  <span className="font-display text-lg">₹{d.price.toLocaleString('en-IN')}</span>
                </div>
                <p className="mt-4 text-base text-char/75">{d.description}</p>
                <p className="mt-auto border-t border-char/10 pt-4 font-display text-xs text-char/60">{d.pairing}</p>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>

        <div className="mt-14 bg-[linear-gradient(110deg,#1B1512_40%,#4a1a0a)] p-8 text-ash md:p-12">
          <p className="font-display text-sm text-ember">The chef’s experience</p>
          <h3 className="mt-3 max-w-xl font-body text-3xl font-light md:text-5xl">Tasting Fire: seven courses at the hearth</h3>
          <p className="mt-4 max-w-lg text-ash/75">Sit at the counter facing the fires while the chef cooks seven dishes shaped by the day’s market.</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <p className="font-body text-3xl">₹3,800 <span className="font-display text-sm text-ash/60">per guest, wine flight +₹1,500</span></p>
            <a href="#reserve" className="glass glass-ember rounded-full px-6 py-3 font-display text-sm text-ash">Reserve the counter</a>
          </div>
        </div>
      </div>
    </section>
  )
}
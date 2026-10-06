import { useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { reviews } from '../data/reviewsData'

export default function Reviews() {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const r = reviews[i]

  const go = (step: number) => {
    setDir(step)
    setI(p => (p + step + reviews.length) % reviews.length)
  }
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }
  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) go(1)
    else if (info.offset.x > 60) go(-1)
  }

  return (
    <section id="reviews" className="px-5 py-20 lg:py-36" aria-roledescription="carousel" aria-label="Guest reviews">
      <div className="mx-auto max-w-4xl" onKeyDown={onKey}>
        <h2 className="font-body text-4xl font-light tracking-[-0.02em] md:text-6xl">What guests say</h2>
        <p className="mt-3 text-clay">Sample reviews written for this demo. They are not from real customers.</p>

        <div className="mt-14 min-h-[15rem] md:min-h-[19rem] overflow-hidden" tabIndex={0} aria-label="Use the left and right arrow keys to change review">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={r.id}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.35 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={onDragEnd}
              className="cursor-grab touch-pan-y active:cursor-grabbing"
              aria-live="polite"
            >
              <div className="flex gap-1 text-ember" role="img" aria-label={`${r.rating} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map(n => <Star key={n} size={18} fill={n <= r.rating ? 'currentColor' : 'none'} />)}
              </div>
              <blockquote className="mt-6font-body text-xl font-light leading-snug sm:text-2xl md:text-4xl">“{r.text}”</blockquote>
              <figcaption className="mt-8 font-display text-sm">
                {r.name} <span className="text-clay">· {r.context} · sample review</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <div className="flex gap-2" role="group" aria-label="Choose review">
            {reviews.map((x, n) => (
              <button
                key={x.id}
                aria-label={`Review ${n + 1}`}
                aria-current={n === i}
                onClick={() => { setDir(n > i ? 1 : -1); setI(n) }}
                className={`h-1.5 transition-all ${n === i ? 'w-10 bg-ember' : 'w-5 bg-ash/25 hover:bg-ash/50'}`}
              />
            ))}
          </div>
          <div className="flex gap-3">
            <button aria-label="Previous review" onClick={() => go(-1)} className="glass grid size-12 place-items-center rounded-full text-ash"><ChevronLeft size={20} /></button>
            <button aria-label="Next review" onClick={() => go(1)} className="glass grid size-12 place-items-center rounded-full text-ash"><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>
    </section>
  )
}
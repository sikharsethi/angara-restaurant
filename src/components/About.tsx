import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface SlotProps { src: string; alt: string; label: string; className?: string }

function Slot({ src, alt, label, className = '' }: SlotProps) {
  const [failed, setFailed] = useState(false)
  const calm = useReducedMotion()
  return (
    <motion.div
      initial={calm ? false : { clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden bg-soot ${className}`}
    >
      {failed ? (
        <div className="relative grid size-full place-items-center border border-ember/30 bg-[radial-gradient(circle_at_50%_85%,rgba(255,122,26,0.35),#2A201A_55%,#1B1512)] p-6 text-center font-body italic text-ash/70">{label}</div>
      ) : (
        <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className="size-full object-cover" />
      )}
    </motion.div>
  )
}

const highlights = [
  ['Live fire only', 'No gas line in the kitchen. Cedar, mango wood and date palm do all the work.'],
  ['Farms within 200 km', 'We buy what is in season and change the menu when the market does.'],
  ['Ghee aged in-house', 'Cultured, rested and clarified in our own kitchen, then used in every course.'],
]

export default function About() {
  return (
    <section id="about" className="px-5 py-28 lg:py-40">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-5">
          <Slot src="/about/hearth.jpg" alt="The Angara hearth with live coals" label="The hearth" className="aspect-[4/5] w-full" />
          <Slot src="/about/chef.jpg" alt="The chef plating a dish" label="The chef at work" className="absolute -bottom-10 -right-4 aspect-square w-1/2 border-4 border-char md:-right-10" />
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
          <h2 className="font-body text-4xl font-light leading-[1.05] tracking-[-0.02em] md:text-6xl">One hearth. No gas line.</h2>
          <p className="mt-8 max-w-lg text-ash/80">
            Angara began with a single clay oven and one rule: if it can’t be cooked over fire, it isn’t on the menu. Everything here is smoked, charred or slow-roasted, and nothing is rushed.
          </p>
          <p className="mt-5 max-w-lg text-clay">
            Our chef cooks the way her grandmother did, by watching the colour of the embers. The menu follows the seasons, so a dish you love might leave in a month and come back next year.
          </p>
         st

          <dl className="mt-14 divide-y divide-ash/10 border-y border-ash/10">
            {highlights.map(([t, d]) => (
              <div key={t} className="grid gap-1 py-5 sm:grid-cols-[12rem_1fr] sm:gap-8">
                <dt className="font-display text-ash">{t}</dt>
                <dd className="text-clay">{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
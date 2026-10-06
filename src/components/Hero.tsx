import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { heroFoods, type HeroFood } from '../data/heroFoods'
const Scene3D = lazy(() => import('./Scene3D'))

function FoodOrb({ food }: { food: HeroFood }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className="absolute left-1/2 top-1/2 size-0" style={{ transform: `rotate(${food.angle}deg) translateX(calc(var(--stage) * 0.4))` }}>
      <div style={{ transform: `rotate(${-food.angle}deg)` }}>
        <div className="animate-[counter_70s_linear_infinite]">
          <div className="-translate-x-1/2 -translate-y-1/2 size-[calc(var(--stage)*0.22)] overflow-hidden rounded-full border border-ember/40 bg-soot shadow-[0_0_40px_rgba(181,101,29,0.25)]">
            {failed ? (
              <div className="grid size-full place-items-center bg-[radial-gradient(circle,#3a2a1c,#1B1512)] p-2 text-center font-display text-[0.7rem] leading-tight text-clay sm:text-xs">{food.name}</div>
            ) : (
              <img src={food.image} alt={food.name} loading="lazy" onError={() => setFailed(true)} className="size-full object-cover" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const root = useRef<HTMLElement>(null)
  const [show3D, setShow3D] = useState(false)

  useEffect(() => {
    const calm = matchMedia('(prefers-reduced-motion: reduce)').matches
    const weak = innerWidth < 640 || (navigator.hardwareConcurrency ?? 8) < 4
    if (!calm && !weak) setShow3D(true)
    if (calm) return
    const c = gsap.context(() => {
      gsap.from('.line', { yPercent: 110, duration: 1.1, stagger: 0.14, ease: 'power4.out' })
    }, root)
    return () => c.revert()
  }, [])

  return (
    <section id="home" ref={root} className="relative grid min-h-svh items-center overflow-hidden px-5 pt-24 md:grid-cols-2">
      <div className="relative z-10 mx-auto max-w-xl md:ml-[8vw]">
        <h1 className="font-body text-[clamp(2.75rem,7vw,6rem)] font-light leading-[1.02] tracking-[-0.02em]">
          {['Every dish', 'begins with', 'fire.'].map(t => (
            <span key={t} className="block overflow-hidden pb-[0.12em]"><span className="line block">{t}</span></span>
          ))}
        </h1>
        <p className="mt-8 max-w-md text-clay">A wood-fire Indian kitchen. Every plate is finished over live coals of cedar, mango wood and date palm.</p>
        <div className="mt-10 flex flex-wrap items-center gap-4 font-display text-sm">
          <a href="#reserve" className="glass glass-ember rounded-full px-8 py-3.5 text-ash">Reserve a table</a>
          <a href="#menu" className="glass rounded-full px-8 py-3.5 text-ash">Explore the menu</a>
        </div>
      </div>

      <div className="relative mx-auto my-10 aspect-square w-full" style={{ ['--stage' as string]: 'min(88vw, 620px)', maxWidth: 'var(--stage)' }}>
        <div className="absolute inset-[25%] rounded-full bg-[radial-gradient(circle,rgba(255,106,0,0.45),transparent_70%)]" />
        <div className="absolute inset-[22%]">
          {show3D && <Suspense fallback={null}><Scene3D /></Suspense>}
        </div>
        <div className="absolute inset-0 animate-[orbit_70s_linear_infinite]">
          {heroFoods.map(f => <FoodOrb key={f.name} food={f} />)}
        </div>
      </div>
    </section>
  )
}
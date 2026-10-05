import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
const Scene3D = lazy(() => import('./Scene3D'))

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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,#3a2414,transparent_60%)]" />
      <div className="relative z-10 mx-auto max-w-xl md:ml-[8vw]">
        <h1 className="font-body text-[clamp(2.75rem,7vw,6rem)] font-light leading-[1.02] tracking-[-0.02em]">
          {['Every dish', 'begins with', 'fire.'].map(t => (
            <span key={t} className="block overflow-hidden pb-[0.12em]">
              <span className="line block">{t}</span>
            </span>
          ))}
        </h1>
        <p className="mt-8 max-w-md text-clay">
          A wood-fire Indian kitchen. Every plate is finished over live coals of cedar, mango wood and date palm.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-8 font-display text-sm">
          <a href="#reserve" className="border border-ember px-7 py-3.5 text-ember transition-colors hover:bg-ember hover:text-char">
            Reserve a table
          </a>
          <a href="#menu" className="border-b border-ash/40 pb-1 hover:border-ember hover:text-ember">
            Explore the menu
          </a>
        </div>
      </div>
      <div className="relative h-[45svh] md:h-[80svh]">
        {show3D && (
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        )}
      </div>
    </section>
  )
}
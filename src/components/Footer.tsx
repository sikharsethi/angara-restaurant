import { useState, type FormEvent } from 'react'
import { Facebook, Instagram, MapPin, Twitter } from 'lucide-react'

const nav = [['Home', '#home'], ['About', '#about'], ['Menu', '#menu'], ['Reviews', '#reviews'], ['Reserve', '#reserve']]
const socials = [['Instagram', Instagram], ['Facebook', Facebook], ['X (Twitter)', Twitter]] as const

export default function Footer() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)

  const subscribe = (e: FormEvent) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) return setMsg({ ok: false, text: 'Enter a valid email address.' })
    setMsg({ ok: true, text: 'Demo only: nothing was saved or sent.' })
    setEmail('')
  }

  return (
    <footer id="contact" className="border-t border-ash/10 px-5 pb-10 pt-20">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-3xl font-bold">Angara<span className="text-ember">.</span></p>
          <p className="mt-3 max-w-xs text-clay">A wood-fire Indian kitchen. Everything touches the coals.</p>
          <div className="mt-6 flex gap-3">
            {socials.map(([name, Icon]) => (
              <a key={name} href="#" aria-label={name} className="glass grid size-11 place-items-center rounded-full text-ash"><Icon size={18} /></a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="font-display text-sm text-ember">Explore</p>
          <ul className="mt-4 space-y-2">
            {nav.map(([l, h]) => <li key={h}><a href={h} className="text-clay hover:text-ash">{l}</a></li>)}
          </ul>
        </nav>

        <div>
          <p className="font-display text-sm text-ember">Visit</p>
          <address className="mt-4 not-italic text-clay">
            12 Placeholder Lane<br />Bhubaneswar, Odisha<br />+91 00000 00000<br />hello@angara.example
          </address>
          <p className="mt-4 text-clay">Tue to Sun<br />12:30 to 3 pm, 7 to 11 pm<br />Closed Mondays</p>
          <a href="https://www.google.com/maps/search/?api=1&query=Bhubaneswar%2C+Odisha" target="_blank" rel="noreferrer" className="glass mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-display text-sm text-ash">
            <MapPin size={16} /> Get directions
          </a>
        </div>

        <div>
          <p className="font-display text-sm text-ember">Letters from the kitchen</p>
          <p className="mt-4 text-clay">Seasonal menus and the odd event, a few times a year.</p>
          <form onSubmit={subscribe} noValidate className="mt-4">
            <label htmlFor="news" className="sr-only">Email address</label>
            <div className="flex gap-2">
              <input id="news" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" aria-describedby="news-msg" className="h-12 min-w-0 flex-1 border border-ash/25 bg-transparent px-3 focus:border-ember" />
              <button className="glass glass-ember rounded-full px-5 font-display text-sm text-ash">Join</button>
            </div>
            <p id="news-msg" role="status" className={`mt-2 text-sm ${msg ? (msg.ok ? 'text-ember' : 'text-red-400') : 'text-clay'}`}>
              {msg ? msg.text : 'Demo form. Not connected to a mailing service.'}
            </p>
          </form>
        </div>
      </div>

      <p className="mx-auto mt-16 max-w-6xl border-t border-ash/10 pt-6 text-sm text-clay">
        © 2026 Angara. A fictional restaurant: all names, addresses and reviews are placeholders.
      </p>
    </footer>
  )
}
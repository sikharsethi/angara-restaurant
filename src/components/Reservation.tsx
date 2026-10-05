import { useState, type FormEvent } from 'react'

type Zone = 'Fireside' | 'Window' | "Chef's counter"
interface Table { id: string; zone: Zone; seats: number; x: number; y: number }
interface Form { name: string; phone: string; email: string; date: string; time: string; guests: number; table: string; notes: string }
type Errors = Partial<Record<keyof Form, string>>

const tables: Table[] = [
  { id: 'F1', zone: 'Fireside', seats: 2, x: 122, y: 200 },
  { id: 'F2', zone: 'Fireside', seats: 2, x: 278, y: 200 },
  { id: 'F3', zone: 'Fireside', seats: 4, x: 200, y: 122 },
  { id: 'C1', zone: "Chef's counter", seats: 2, x: 150, y: 282 },
  { id: 'C2', zone: "Chef's counter", seats: 2, x: 200, y: 298 },
  { id: 'C3', zone: "Chef's counter", seats: 2, x: 250, y: 282 },
  { id: 'W1', zone: 'Window', seats: 2, x: 62, y: 125 },
  { id: 'W2', zone: 'Window', seats: 4, x: 50, y: 200 },
  { id: 'W3', zone: 'Window', seats: 4, x: 62, y: 275 },
  { id: 'W4', zone: 'Window', seats: 2, x: 338, y: 125 },
  { id: 'W5', zone: 'Window', seats: 4, x: 350, y: 200 },
  { id: 'W6', zone: 'Window', seats: 4, x: 338, y: 275 },
]

const slots = [
  ['12:30', '12:30 pm'], ['13:00', '1:00 pm'], ['13:30', '1:30 pm'], ['14:00', '2:00 pm'],
  ['19:00', '7:00 pm'], ['19:30', '7:30 pm'], ['20:00', '8:00 pm'], ['20:30', '8:30 pm'],
  ['21:00', '9:00 pm'], ['21:30', '9:30 pm'], ['22:00', '10:00 pm'],
]

const empty: Form = { name: '', phone: '', email: '', date: '', time: '', guests: 2, table: '', notes: '' }

const todayStr = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

// Demo only: pretends some tables are taken, varying by date and time.
const isTaken = (id: string, date: string, time: string) => {
  if (!date || !time) return false
  let h = 0
  for (const c of id + date + time) h = (h * 31 + c.charCodeAt(0)) >>> 0
  return h % 5 === 0
}

function validate(f: Form): Errors {
  const e: Errors = {}
  if (f.name.trim().length < 2) e.name = 'Enter your full name.'
  if (!/^[+\d][\d\s-]{8,14}$/.test(f.phone)) e.phone = 'Enter a valid phone number.'
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Enter a valid email address.'
  if (!f.date) e.date = 'Choose a date.'
  else if (f.date < todayStr()) e.date = 'Choose today or a later date.'
  else if (new Date(`${f.date}T00:00`).getDay() === 1) e.date = 'We are closed on Mondays. Pick another day.'
  if (!f.time) e.time = 'Choose a time.'
  if (!f.table) e.table = 'Tap a table on the floor plan.'
  return e
}

export default function Reservation() {
  const [f, setF] = useState<Form>(empty)
  const [err, setErr] = useState<Errors>({})
  const [state, setState] = useState<'idle' | 'busy' | 'done'>('idle')
  const [ref, setRef] = useState('')

  const sel = tables.find(t => t.id === f.table)
  const update = (patch: Partial<Form>) =>
    setF(p => {
      const n = { ...p, ...patch }
      const t = tables.find(x => x.id === n.table)
      if (t && (t.seats < n.guests || isTaken(t.id, n.date, n.time))) n.table = ''
      return n
    })

  const submit = (ev: FormEvent) => {
    ev.preventDefault()
    const e = validate(f)
    setErr(e)
    if (Object.keys(e).length) return
    setState('busy')
    setTimeout(() => {
      setRef(`DEMO-${Math.floor(1000 + Math.random() * 9000)}`)
      try {
        localStorage.setItem('angara-demo-reservation', JSON.stringify({ name: f.name, date: f.date, time: f.time, guests: f.guests, table: f.table }))
      } catch { /* storage unavailable */ }
      setState('done')
    }, 900)
  }

  const input = 'mt-1 h-12 w-full border border-ash/25 bg-transparent px-3 focus:border-ember'
  const label = 'font-display text-sm text-ash/80'
  const timeLabel = slots.find(s => s[0] === f.time)?.[1]
  const errText = (k: keyof Form) => err[k] && <p id={`${k}-e`} role="alert" className="mt-1 text-sm text-red-400">{err[k]}</p>

  return (
    <section id="reserve" className="px-5 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-body text-5xl font-light tracking-[-0.02em] md:text-7xl">Choose your seat by the fire</h2>
        <p className="mt-4 max-w-xl text-clay">Pick a date and time, then tap a table on the floor plan. This is a demo, so no real booking is made and no table is held.</p>

        {state === 'done' ? (
          <div role="status" className="mt-14 max-w-xl border border-ember p-8 md:p-10">
            <p className="font-display text-sm text-ember">Demo confirmation. Nothing has been booked.</p>
            <h3 className="mt-3 font-body text-4xl font-light">{f.name}, your seat is sketched in</h3>
            <dl className="mt-6 grid grid-cols-2 gap-y-3 border-t border-ash/15 pt-6 font-display text-sm">
              <dt className="text-clay">Date</dt><dd>{f.date}</dd>
              <dt className="text-clay">Time</dt><dd>{timeLabel}</dd>
              <dt className="text-clay">Guests</dt><dd>{f.guests}</dd>
              <dt className="text-clay">Table</dt><dd>{sel?.id}, {sel?.zone}</dd>
              <dt className="text-clay">Reference</dt><dd>{ref}</dd>
            </dl>
            <button className="mt-8 border-b border-ash/40 pb-1 font-display text-sm hover:border-ember hover:text-ember" onClick={() => { setF(empty); setErr({}); setState('idle') }}>Start again</button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="mt-14 grid gap-14 lg:grid-cols-[1fr_1fr]">
            <div>
              <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
                <div className="absolute inset-0 rounded-full border border-ash/15 bg-[radial-gradient(circle,#2a1a10_0%,#1B1512_70%)]" />
                <div className="absolute left-1/2 top-1/2 size-[16%] -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-[radial-gradient(circle,#ffd089_0%,#ff7a1a_45%,transparent_72%)]" aria-hidden />
                <p className="absolute left-1/2 top-[56%] -translate-x-1/2 font-display text-[0.7rem] text-ember/70" aria-hidden>Hearth</p>
                {tables.map(t => {
                  const taken = isTaken(t.id, f.date, f.time)
                  const small = t.seats < f.guests
                  const off = taken || small
                  const on = f.table === t.id
                  return (
                    <button
                      key={t.id}
                      type="button"
                      disabled={off}
                      aria-pressed={on}
                      aria-label={`Table ${t.id}, ${t.zone}, seats ${t.seats}${taken ? ', taken' : small ? ', too small for your party' : ''}`}
                      title={`${t.zone}, seats ${t.seats}`}
                      onClick={() => update({ table: t.id })}
                      style={{ left: `${t.x / 4}%`, top: `${t.y / 4}%` }}
                      className={`absolute grid aspect-square w-[12%] min-w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border font-display text-xs transition-colors ${on ? 'border-ember bg-ember text-char' : off ? 'cursor-not-allowed border-ash/10 text-ash/20 line-through' : 'border-ash/40 hover:border-ember hover:text-ember'}`}
                    >
                      {t.id}
                    </button>
                  )
                })}
              </div>
              <ul className="mx-auto mt-6 max-w-[34rem] space-y-1 text-base text-clay">
                <li><span className="text-ash">Fireside (F):</span> closest to the coals, warm and lively.</li>
                <li><span className="text-ash">Chef’s counter (C):</span> watch your food cooked, seats 2 each.</li>
                <li><span className="text-ash">Window (W):</span> quieter tables along the edge.</li>
              </ul>
              <p className="mx-auto mt-4 max-w-[34rem] font-display text-sm" aria-live="polite">
                {sel ? <span className="text-ember">Selected: table {sel.id}, {sel.zone}, seats {sel.seats}</span> : <span className="text-clay">No table selected yet.</span>}
              </p>
              {errText('table')}
            </div>

            <div className="grid gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="date" className={label}>Date</label>
                  <input id="date" type="date" min={todayStr()} value={f.date} aria-invalid={!!err.date} aria-describedby={err.date ? 'date-e' : undefined} onChange={e => update({ date: e.target.value })} className={input} />
                  {errText('date')}
                </div>
                <div>
                  <span className={label} id="guests-l">Guests</span>
                  <div role="group" aria-labelledby="guests-l" className="mt-1 flex h-12 items-center justify-between border border-ash/25 px-1">
                    <button type="button" aria-label="Fewer guests" onClick={() => update({ guests: Math.max(1, f.guests - 1) })} className="size-10 text-xl hover:text-ember">−</button>
                    <span aria-live="polite" className="font-display">{f.guests}</span>
                    <button type="button" aria-label="More guests" onClick={() => update({ guests: Math.min(4, f.guests + 1) })} className="size-10 text-xl hover:text-ember">+</button>
                  </div>
                  <p className="mt-1 text-sm text-clay">Parties of 5 or more: call us.</p>
                </div>
              </div>

              <fieldset>
                <legend className={label}>Time</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {slots.map(([v, l]) => (
                    <button key={v} type="button" aria-pressed={f.time === v} onClick={() => update({ time: v })} className={`border px-3.5 py-2 font-display text-sm transition-colors ${f.time === v ? 'border-ember bg-ember text-char' : 'border-ash/25 hover:border-ember'}`}>{l}</button>
                  ))}
                </div>
                {errText('time')}
              </fieldset>

              <div>
                <label htmlFor="name" className={label}>Full name</label>
                <input id="name" value={f.name} aria-invalid={!!err.name} aria-describedby={err.name ? 'name-e' : undefined} onChange={e => update({ name: e.target.value })} className={input} />
                {errText('name')}
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className={label}>Phone</label>
                  <input id="phone" type="tel" value={f.phone} aria-invalid={!!err.phone} aria-describedby={err.phone ? 'phone-e' : undefined} onChange={e => update({ phone: e.target.value })} className={input} />
                  {errText('phone')}
                </div>
                <div>
                  <label htmlFor="email" className={label}>Email</label>
                  <input id="email" type="email" value={f.email} aria-invalid={!!err.email} aria-describedby={err.email ? 'email-e' : undefined} onChange={e => update({ email: e.target.value })} className={input} />
                  {errText('email')}
                </div>
              </div>
              <div>
                <label htmlFor="notes" className={label}>Special requests</label>
                <textarea id="notes" rows={3} value={f.notes} onChange={e => update({ notes: e.target.value })} className="mt-1 w-full border border-ash/25 bg-transparent p-3 focus:border-ember" />
              </div>
              <button disabled={state === 'busy'} className="h-12 border border-ember font-display text-ember transition-colors hover:bg-ember hover:text-char disabled:opacity-50">
                {state === 'busy' ? 'Sending…' : 'Request this table (demo)'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
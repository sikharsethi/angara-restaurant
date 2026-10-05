import { useState, type FormEvent } from 'react'
import type { Errors, ReservationData } from '../types'
const empty: ReservationData = { name: '', phone: '', email: '', date: '', time: '', guests: 2, notes: '' }
function validate(v: ReservationData): Errors {
  const e: Errors = {}
  if (v.name.trim().length < 2) e.name = 'Enter your full name.'
  if (!/^[+\d][\d\s-]{8,14}$/.test(v.phone)) e.phone = 'Enter a valid phone number.'
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter a valid email address.'
  if (!v.date || new Date(v.date) < new Date(new Date().toDateString())) e.date = 'Choose today or a future date.'
  if (!v.time) e.time = 'Choose a time.'
  if (v.guests < 1 || v.guests > 12) e.guests = 'Parties of 1 to 12 only.'
  return e
}
export default function Reservation() {
  const [v, setV] = useState(empty), [err, setErr] = useState<Errors>({}), [state, setState] = useState<'idle' | 'busy' | 'done'>('idle')
  const set = (k: keyof ReservationData, val: string | number) => setV(p => ({ ...p, [k]: val }))
  const submit = (ev: FormEvent) => { ev.preventDefault(); const e = validate(v); setErr(e); if (Object.keys(e).length) return
    setState('busy'); setTimeout(() => { try { localStorage.setItem('angara-demo-reservation', JSON.stringify({ name: v.name, date: v.date, time: v.time, guests: v.guests })) } catch { /* storage unavailable */ } setState('done') }, 900) }
  const field = (k: keyof ReservationData, label: string, type = 'text') => (<div><label htmlFor={k} className="font-display text-sm">{label}</label>
    <input id={k} type={type} value={String(v[k])} aria-invalid={!!err[k]} aria-describedby={err[k] ? `${k}-e` : undefined}
      onChange={e => set(k, type === 'number' ? +e.target.value : e.target.value)} className="mt-1 h-12 w-full border border-ash/30 bg-transparent px-3" />
    {err[k] && <p id={`${k}-e`} role="alert" className="mt-1 text-sm text-red-400">{err[k]}</p>}</div>)
  return (<section id="reserve" className="px-5 py-24"><div className="mx-auto max-w-2xl">
    <h2 className="font-display text-5xl font-bold tracking-tight">Reserve a table</h2>
    <p className="mt-3 text-clay">Demo only. This form is not connected to a booking system, so no table will be held.</p>
    {state === 'done' ? <div role="status" className="mt-10 border border-ember p-8"><h3 className="font-display text-2xl">Demo request received</h3>
      <p className="mt-2">{v.name}, a real restaurant would now confirm {v.guests} guests on {v.date} at {v.time}. Nothing was booked.</p>
      <button className="mt-6 underline" onClick={() => { setV(empty); setState('idle') }}>Start again</button></div> :
    <form onSubmit={submit} noValidate className="mt-10 grid gap-5 sm:grid-cols-2">
      <div className="sm:col-span-2">{field('name', 'Full name')}</div>{field('phone', 'Phone', 'tel')}{field('email', 'Email', 'email')}
      {field('date', 'Date', 'date')}{field('time', 'Time', 'time')}{field('guests', 'Guests', 'number')}
      <div className="sm:col-span-2"><label htmlFor="notes" className="font-display text-sm">Special requests</label>
        <textarea id="notes" rows={3} value={v.notes} onChange={e => set('notes', e.target.value)} className="mt-1 w-full border border-ash/30 bg-transparent p-3" /></div>
      <button disabled={state === 'busy'} className="h-12 bg-ember font-display font-semibold text-char sm:col-span-2">{state === 'busy' ? 'Sending…' : 'Request table'}</button></form>}
  </div></section>)
}

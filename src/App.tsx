import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Reservation from './components/Reservation'
import Footer from './components/Footer'
export default function App() {
  return (<><Navbar /><main><Hero />
    <section id="about" className="mx-auto max-w-3xl px-5 py-28"><h2 className="font-display text-4xl font-bold tracking-tight md:text-6xl">One hearth. No gas line.</h2>
      <p className="mt-6 text-clay">Angara began with a single clay oven and a rule: if it can’t be cooked over coals, it isn’t on the menu. Our kitchen buys from farms within 200 km and ages its own ghee.</p></section>
    <Menu />
    <section id="reviews" className="mx-auto max-w-3xl px-5 py-28"><h2 className="font-display text-4xl font-bold">Reviews</h2>
      <blockquote className="mt-6 text-2xl italic">“The dal tastes like it has a memory.”</blockquote><p className="mt-2 text-clay">Sample review, not a real guest.</p></section>
    <Reservation /></main><Footer /></>)
}

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import Reviews from './components/Reviews'
import Reservation from './components/Reservation'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <div className="ambient" aria-hidden />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Reviews />
        <Reservation />
      </main>
      <Footer />
    </>
  )
}
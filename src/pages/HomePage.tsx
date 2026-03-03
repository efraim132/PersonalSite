import { useScrollToHash } from '../hooks/useScrollToHash'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
// import Travels from '../components/Travels/Travels'
import ProjectsSection from '../components/ProjectsSection/ProjectsSection'
import Contact from '../components/Contact/Contact'

export default function HomePage() {
  useScrollToHash()

  return (
    <>
      <Hero />
      <About />
      {/*<Travels />*/}
      <ProjectsSection />
      <Contact />
    </>
  )
}

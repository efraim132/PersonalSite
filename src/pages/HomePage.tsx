import { useScrollToHash } from '../hooks/useScrollToHash'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import ProjectsSection from '../components/ProjectsSection/ProjectsSection'
import Journal from '../components/Journal/Journal'
import Contact from '../components/Contact/Contact'

export default function HomePage() {
  useScrollToHash()

  return (
    <>
      <Hero />
      <ProjectsSection />
      <Journal />
      <About />
      <Contact />
    </>
  )
}

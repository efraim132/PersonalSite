import { Routes, Route, useLocation } from 'react-router'
import { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import HomePage from './pages/HomePage'
import SuperLuaPage from './pages/SuperLuaPage'
import EENetPage from './pages/EENetPage'
import GrebKeyPage from './pages/GrebKeyPage'
import RealtimeOperationsPage from './pages/RealtimeOperationsPage'
import PrivateEventMediaPage from './pages/PrivateEventMediaPage'
import NotFoundPage from './pages/NotFoundPage'

function ScrollToTop() {
  const { pathname, hash, key } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.getElementById('main-content')?.focus({ preventScroll: true })
  }, [pathname, hash, key])
  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <a className="skip-link pill" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/superlua" element={<SuperLuaPage />} />
          <Route path="/projects/eenet" element={<EENetPage />} />
          <Route path="/writing/grebkey" element={<GrebKeyPage />} />
          <Route
            path="/writing/realtime-operations"
            element={<RealtimeOperationsPage />}
          />
          <Route
            path="/writing/private-event-media"
            element={<PrivateEventMediaPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App

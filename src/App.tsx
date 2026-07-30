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
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/superlua" element={<SuperLuaPage />} />
          <Route path="/projects/eenet" element={<EENetPage />} />
          <Route path="/writing/grebkey" element={<GrebKeyPage />} />
          <Route path="/writing/realtime-operations" element={<RealtimeOperationsPage />} />
          <Route path="/writing/private-event-media" element={<PrivateEventMediaPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App

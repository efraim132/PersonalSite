import { useEffect } from 'react'
import { useLocation } from 'react-router'

export function useScrollToHash() {
  const { hash, key } = useLocation()
  useEffect(() => {
    if (!hash) return
    let id: string
    try {
      id = decodeURIComponent(hash.slice(1))
    } catch {
      return
    }
    const element = document.getElementById(id)
    if (!element) return
    const frame = requestAnimationFrame(() => {
      element.scrollIntoView({
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      })
      element.tabIndex = -1
      element.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(frame)
  }, [hash, key])
}

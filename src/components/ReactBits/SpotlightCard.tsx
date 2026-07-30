/*
 * Adapted from React Bits by David Haz.
 * See THIRD_PARTY_NOTICES.md for the license notice.
 */
import { useRef, type MouseEventHandler, type PropsWithChildren } from 'react'
import './SpotlightCard.css'

interface SpotlightCardProps extends PropsWithChildren {
  className?: string
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(164, 255, 88, 0.18)',
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    if (cardRef.current == null) {
      return
    }

    const rect = cardRef.current.getBoundingClientRect()
    cardRef.current.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`)
    cardRef.current.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`)
    cardRef.current.style.setProperty('--spotlight-color', spotlightColor)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`rb-spotlight-card ${className}`}
    >
      {children}
    </div>
  )
}

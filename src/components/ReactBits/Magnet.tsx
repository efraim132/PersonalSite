/*
 * Adapted from React Bits by David Haz.
 * See THIRD_PARTY_NOTICES.md for the license notice.
 */
import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react'

interface MagnetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  padding?: number
  disabled?: boolean
  magnetStrength?: number
  wrapperClassName?: string
  innerClassName?: string
}

export default function Magnet({
  children,
  padding = 72,
  disabled = false,
  magnetStrength = 5,
  wrapperClassName = '',
  innerClassName = '',
  ...props
}: MagnetProps) {
  const [isActive, setIsActive] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const magnetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarsePointer = window.matchMedia('(pointer: coarse)')

    if (disabled || reducedMotion.matches || coarsePointer.matches) {
      return
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (magnetRef.current == null) {
        return
      }

      const { left, top, width, height } = magnetRef.current.getBoundingClientRect()
      const centerX = left + width / 2
      const centerY = top + height / 2
      const isNearby =
        Math.abs(centerX - event.clientX) < width / 2 + padding &&
        Math.abs(centerY - event.clientY) < height / 2 + padding

      if (isNearby) {
        setIsActive(true)
        setPosition({
          x: (event.clientX - centerX) / magnetStrength,
          y: (event.clientY - centerY) / magnetStrength,
        })
        return
      }

      setIsActive(false)
      setPosition({ x: 0, y: 0 })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [disabled, magnetStrength, padding])

  let renderedPosition = position
  let renderedActive = isActive

  if (disabled) {
    renderedPosition = { x: 0, y: 0 }
    renderedActive = false
  }

  let transition = 'transform 450ms ease-in-out'
  if (renderedActive) {
    transition = 'transform 220ms ease-out'
  }

  return (
    <div
      ref={magnetRef}
      className={wrapperClassName}
      style={{ position: 'relative', display: 'inline-block' }}
      {...props}
    >
      <div
        className={innerClassName}
        style={{
          transform: `translate3d(${renderedPosition.x}px, ${renderedPosition.y}px, 0)`,
          transition,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  )
}

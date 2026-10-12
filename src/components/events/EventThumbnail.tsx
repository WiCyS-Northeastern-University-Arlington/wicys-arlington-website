import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

interface Props {
  images: string[]
  title: string
  fit?: 'cover' | 'contain'
}

export default function EventThumbnail({ images, title, fit = 'cover' }: Props) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [visible, setVisible] = useState(false)
  const container = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    if (container.current) observer.observe(container.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (images.length < 2 || paused || hovered || focused || reducedMotion || !visible) return
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % images.length), 4500)
    return () => window.clearInterval(timer)
  }, [images.length, paused, hovered, focused, reducedMotion, visible])

  return (
    <div ref={container} className="absolute inset-0" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
    }}>
      {images.map((src, i) => (
        <img key={src} src={src} alt={i === index ? `${title} — image ${i + 1}` : ''} aria-hidden={i !== index} loading="lazy"
          className={`absolute inset-0 h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} ${reducedMotion ? '' : 'transition-opacity duration-700'} ${i === index ? 'opacity-100' : 'opacity-0'}`} />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center rounded-full bg-ink-950/80 p-1">
          <button type="button" aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} onClick={() => setPaused(!paused)} className="flex h-7 w-7 items-center justify-center rounded-full text-xs text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">{paused ? '▶' : 'Ⅱ'}</button>
          {images.map((src, i) => (
            <button key={src} type="button" aria-label={`Show image ${i + 1} of ${images.length}`} aria-pressed={i === index} onClick={() => setIndex(i)} className="flex h-7 w-7 items-center justify-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">
              <span className={`h-1.5 w-1.5 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

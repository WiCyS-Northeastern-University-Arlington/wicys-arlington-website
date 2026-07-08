import { useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export interface Photo {
  src: string
  caption?: string
}

interface Props {
  photos: Photo[]
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({ photos, index, onClose, onNavigate }: Props) {
  const open = index !== null

  const go = useCallback(
    (dir: number) => {
      if (index === null) return
      const next = (index + dir + photos.length) % photos.length
      onNavigate(next)
    },
    [index, photos.length, onNavigate],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, go, onClose])

  return (
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <button
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full text-cream/80 transition-colors hover:bg-white/10 hover:text-white"
            onClick={onClose}
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {photos.length > 1 && (
            <>
              <button
                className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-cream/80 transition-colors hover:bg-white/10 hover:text-white sm:left-6"
                onClick={(e) => { e.stopPropagation(); go(-1) }}
                aria-label="Previous photo"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-cream/80 transition-colors hover:bg-white/10 hover:text-white sm:right-6"
                onClick={(e) => { e.stopPropagation(); go(1) }}
                aria-label="Next photo"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}

          <motion.figure
            key={photos[index].src}
            className="mx-4 max-h-[85vh] max-w-5xl"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[index].src}
              alt={photos[index].caption ?? ''}
              className="max-h-[80vh] w-auto rounded-xl border border-white/10 object-contain"
            />
            {photos[index].caption && (
              <figcaption className="mt-3 text-center text-sm text-cream/70">
                {photos[index].caption}
              </figcaption>
            )}
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

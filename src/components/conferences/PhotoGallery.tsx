import { useState } from 'react'
import MotionReveal from '../ui/MotionReveal'
import Lightbox, { type Photo } from './Lightbox'

/**
 * Responsive masonry-ish photo grid with a click-to-expand lightbox.
 * Photos come from conference recap frontmatter (see lib/content.ts).
 */
export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [active, setActive] = useState<number | null>(null)

  if (photos.length === 0) {
    return (
      <p className="text-cream/60">
        Photos from our past conferences will appear here soon.
      </p>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo, i) => (
          <MotionReveal key={photo.src + i} delay={(i % 8) * 0.04}>
            <button
              onClick={() => setActive(i)}
              className="group relative block aspect-square w-full overflow-hidden rounded-xl border border-white/10 bg-ink-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-wicys-green-400"
              aria-label={`View photo${photo.caption ? `: ${photo.caption}` : ''}`}
            >
              <img
                src={photo.src}
                alt={photo.caption ?? ''}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              {photo.caption && (
                <span className="absolute bottom-2 left-2 right-2 truncate text-left text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {photo.caption}
                </span>
              )}
            </button>
          </MotionReveal>
        ))}
      </div>

      <Lightbox photos={photos} index={active} onClose={() => setActive(null)} onNavigate={setActive} />
    </>
  )
}

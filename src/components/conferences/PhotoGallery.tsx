import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Photo } from './Lightbox'

/** Automatic filmstrip with sharp neighboring photos. */
export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [step, setStep] = useState(0)
  const [resetting, setResetting] = useState(false)
  const reduceMotion = useReducedMotion()
  const count = photos.length
  const index = count ? step % count : 0

  useEffect(() => {
    if (count < 2) return
    const timer = window.setInterval(() => setStep((value) => value + 1), 6500)
    return () => window.clearInterval(timer)
  }, [count])

  // Recenter on an identical copy after each full circuit for a seamless loop.
  useEffect(() => {
    if (!resetting) return
    const frame = window.requestAnimationFrame(() => {
      const nextFrame = window.requestAnimationFrame(() => setResetting(false))
      pendingFrame = nextFrame
    })
    let pendingFrame = frame
    return () => window.cancelAnimationFrame(pendingFrame)
  }, [resetting])

  if (!count) {
    return <p className="text-cream/60">Photos from our past conferences will appear here soon.</p>
  }

  const photo = photos[index]
  const frames = count > 1 ? [...photos, ...photos, ...photos] : photos
  const position = count > 1 ? count + step : 0

  return (
    <section aria-label="Conference memories slideshow" className="overflow-hidden rounded-3xl border border-white/10 bg-ink-900 py-6 shadow-glow sm:py-8">
      <div className="relative h-[320px] overflow-hidden sm:h-[440px] lg:h-[510px]">
        <div className="absolute inset-y-0 left-1/2 w-[68%] sm:w-[56%] lg:w-[48%]">
          <motion.div
            className="flex h-full w-full"
            initial={false}
            animate={{ x: `${-position * 100 - 50}%` }}
            transition={{ duration: reduceMotion || resetting ? 0 : 1.6, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => {
              if (count > 1 && step >= count) {
                setResetting(true)
                setStep(0)
              }
            }}
          >
            {frames.map((item, frameIndex) => {
              const featured = frameIndex === position
              return (
                <div key={`${item.src}-${frameIndex}`} className="h-full w-full shrink-0 px-2 sm:px-3">
                  <motion.div
                    className="flex h-full items-center justify-center py-5 sm:py-6"
                    initial={false}
                    animate={{
                      scale: featured ? 1 : 0.86,
                      opacity: featured ? 1 : 0.7,
                      rotate: featured || reduceMotion ? 0 : frameIndex < position ? -4 : 4,
                      y: featured || reduceMotion ? 0 : 12,
                      filter: featured ? 'brightness(1)' : 'brightness(0.85)',
                    }}
                    transition={{ duration: reduceMotion || resetting ? 0 : 1.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.img
                      src={item.src}
                      alt={featured ? item.caption || `Conference moment ${index + 1}` : ''}
                      aria-hidden={!featured}
                      initial={false}
                      animate={{ scale: featured && !reduceMotion ? 1.035 : 1 }}
                      transition={{ duration: reduceMotion || resetting ? 0 : featured ? 6.5 : 1.8, ease: 'easeInOut' }}
                      className="max-h-full max-w-full rounded-lg border-[5px] border-cream/95 bg-cream object-contain shadow-[0_18px_45px_rgba(0,0,0,0.5)] sm:border-[7px]"
                    />
                  </motion.div>
                </div>
              )
            })}
          </motion.div>
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-ink-900 to-transparent sm:w-16" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-ink-900 to-transparent sm:w-16" />
      </div>
      {photo.caption && <p className="mt-5 px-5 text-center text-sm text-cream/70">{photo.caption}</p>}
    </section>
  )
}

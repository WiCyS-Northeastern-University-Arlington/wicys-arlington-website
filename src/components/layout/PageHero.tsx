import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface Props {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  children?: ReactNode
}

/** Compact hero band used at the top of interior pages. */
export default function PageHero({ eyebrow, title, subtitle, children }: Props) {
  return (
    <section className="relative overflow-hidden pt-28 pb-14 sm:pt-32 sm:pb-16">
      {/* decorative gradient wash */}
      <div className="pointer-events-none absolute inset-0 bg-wicys-radial opacity-70" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-wicys-purple-600/20 blur-3xl" />

      <div className="container-page relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <span className="mb-4 inline-block rounded-full border border-wicys-green-400/30 bg-wicys-green-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-wicys-green-300">
              {eyebrow}
            </span>
          )}
          <h1 className="text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-cream/70">{subtitle}</p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </div>
    </section>
  )
}

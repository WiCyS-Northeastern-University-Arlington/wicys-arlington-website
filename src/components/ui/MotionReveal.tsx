import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  /** Stagger delay in seconds. */
  delay?: number
  as?: 'div' | 'li' | 'section' | 'article'
}

/**
 * Reveals its children with a subtle fade-up when scrolled into view.
 * Framer Motion automatically honors `prefers-reduced-motion`.
 */
export default function MotionReveal({ children, className = '', delay = 0, as = 'div' }: Props) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </MotionTag>
  )
}

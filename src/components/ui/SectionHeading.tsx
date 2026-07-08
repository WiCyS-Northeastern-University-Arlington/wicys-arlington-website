import type { ReactNode } from 'react'
import MotionReveal from './MotionReveal'

interface Props {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
}: Props) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <MotionReveal className={`max-w-3xl ${alignment} ${className}`}>
      {eyebrow && (
        <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-wicys-green-300">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-cream/70">{subtitle}</p>}
    </MotionReveal>
  )
}

import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  /** Adds a hover lift + glow. Use for interactive/linked cards. */
  interactive?: boolean
}

export default function Card({ children, className = '', interactive = false }: Props) {
  return (
    <div
      className={`glass rounded-2xl ${
        interactive
          ? 'transition-all duration-300 hover:-translate-y-1 hover:border-wicys-purple-400/40 hover:shadow-glow'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}

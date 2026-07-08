import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-wicys-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary:
    'bg-wicys-gradient text-white shadow-glow hover:shadow-glow-green hover:-translate-y-0.5',
  secondary: 'glass text-cream hover:bg-white/10 hover:-translate-y-0.5',
  ghost: 'text-cream/80 hover:text-white hover:bg-white/5',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type ButtonProps =
  | (CommonProps & { to: string; href?: never; onClick?: never; type?: never })
  | (CommonProps & {
      href: string
      to?: never
      onClick?: never
      /** External links open in a new tab by default. */
      newTab?: boolean
    })
  | (CommonProps & {
      onClick: () => void
      type?: 'button' | 'submit'
      to?: never
      href?: never
    })

export default function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className = '', children } = props
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={cls}>
        {children}
      </Link>
    )
  }

  if ('href' in props && props.href) {
    const newTab = props.newTab ?? true
    return (
      <a
        href={props.href}
        className={cls}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={('type' in props && props.type) || 'button'}
      onClick={'onClick' in props ? props.onClick : undefined}
      className={cls}
    >
      {children}
    </button>
  )
}

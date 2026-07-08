interface Props {
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
  className?: string
}

export default function Tag({ children, active, onClick, className = '' }: Props) {
  const interactive = typeof onClick === 'function'
  const cls = `inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
    active
      ? 'border-wicys-green-400/60 bg-wicys-green-400/15 text-wicys-green-200'
      : 'border-white/10 bg-white/5 text-cream/70'
  } ${interactive ? 'hover:border-wicys-green-400/40 hover:text-white' : ''} ${className}`

  if (interactive) {
    return (
      <button type="button" onClick={onClick} className={cls}>
        {children}
      </button>
    )
  }
  return <span className={cls}>{children}</span>
}

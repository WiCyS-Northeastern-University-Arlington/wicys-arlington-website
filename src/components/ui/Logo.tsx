interface Props {
  className?: string
  withWordmark?: boolean
}

/**
 * Chapter logomark: a security shield with a keyhole, in the WiCyS
 * purple→green gradient. Placeholder mark — swap for the official WiCyS /
 * chapter logo asset when available (drop it in /public and reference here).
 */
export default function Logo({ className = 'h-9 w-9', withWordmark = false }: Props) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg
        className={className}
        viewBox="0 0 48 48"
        fill="none"
        role="img"
        aria-label="WiCyS Northeastern logo"
      >
        <defs>
          <linearGradient id="wicys-shield" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6d3cbd" />
            <stop offset="55%" stopColor="#5c2e91" />
            <stop offset="100%" stopColor="#2fbf71" />
          </linearGradient>
        </defs>
        <path
          d="M24 3 6 10v11c0 11 7.6 19.6 18 24 10.4-4.4 18-13 18-24V10L24 3Z"
          fill="url(#wicys-shield)"
        />
        <path
          d="M24 3 6 10v11c0 11 7.6 19.6 18 24 10.4-4.4 18-13 18-24V10L24 3Z"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1.2"
        />
        {/* keyhole */}
        <circle cx="24" cy="20" r="5" fill="#0b0a14" fillOpacity="0.85" />
        <path d="M22 20h4l-1.2 8h-1.6L22 20Z" fill="#0b0a14" fillOpacity="0.85" />
      </svg>
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-base font-bold text-white">WiCyS</span>
          <span className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-wicys-green-300">
            NU Arlington
          </span>
        </span>
      )}
    </span>
  )
}

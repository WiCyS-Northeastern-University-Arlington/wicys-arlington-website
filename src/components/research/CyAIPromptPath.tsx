import { useId, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface Stage { title: string; pass: string; available: boolean }
const colors = ['#38bdf8', '#a78bfa', '#2dd4bf', '#fbbf24']

function WaveRibbon({ moving, vertical = false }: { moving: boolean; vertical?: boolean }) {
  const id = useId().replace(/:/g, '')
  const wave = (phase: number, offset: number) => Array.from({ length: 61 }, (_, index) => {
    const along = index * 10
    const across = 40 + Math.sin(index / 60 * Math.PI * 6 + phase + offset) * 16
    return `${index === 0 ? 'M' : 'L'} ${vertical ? across : along} ${vertical ? along : across}`
  }).join(' ')
  return (
    <svg aria-hidden="true" viewBox={vertical ? '0 0 80 600' : '0 0 600 80'} preserveAspectRatio="none"
      className={vertical ? 'pointer-events-none absolute bottom-10 left-0 top-7 w-14 overflow-visible md:hidden' : 'pointer-events-none absolute left-[12.5%] right-[12.5%] top-0 hidden h-16 w-3/4 overflow-visible md:block'}>
      <defs>
        <linearGradient id={`wave-${id}`} x1="0%" y1="0%" x2={vertical ? '0%' : '100%'} y2={vertical ? '100%' : '0%'}>
          {colors.map((color, index) => <stop key={color} offset={`${index / 3 * 100}%`} stopColor={color} />)}
        </linearGradient>
        <filter id={`glow-${id}`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>
      {[0, 1, 2].map((layer) => {
        const frames = Array.from({ length: 9 }, (_, index) => wave(index / 8 * Math.PI * 2, layer * 1.4))
        return <g key={layer}>
          <motion.path initial={false} animate={{ d: moving ? frames : frames[0] }} transition={{ duration: moving ? 6 : 0, repeat: moving ? Infinity : 0, ease: 'linear' }}
            fill="none" stroke={`url(#wave-${id})`} strokeWidth="6" opacity="0.3" filter={`url(#glow-${id})`} />
          <motion.path initial={false} animate={{ d: moving ? frames : frames[0] }} transition={{ duration: moving ? 6 : 0, repeat: moving ? Infinity : 0, ease: 'linear' }}
            fill="none" stroke={`url(#wave-${id})`} strokeWidth={layer === 0 ? 2 : 1} opacity={layer === 0 ? 0.9 : 0.4} />
        </g>
      })}
    </svg>
  )
}

export default function CyAIPromptPath({ steps, active, onSelect }: { steps: Stage[]; active: number; onSelect: (index: number) => void }) {
  const reduced = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const moving = !reduced && !paused
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.12),transparent_75%)] p-5 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-widest text-cream/60">The research journey</p>
        <button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)} className="rounded-full border border-white/20 px-3 py-2 text-xs text-cream/70 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-wicys-green-300">{paused ? 'Play motion' : 'Pause motion'}</button>
      </div>
      <p className="mt-3 text-sm text-cream/60">Follow the flowing waves and select a stage to explore its prompt.</p>
      <div className="relative my-8 flex flex-col gap-10 md:my-16 md:flex-row md:gap-0">
        <WaveRibbon moving={moving} />
        <WaveRibbon moving={moving} vertical />
        {steps.map((step, index) => (
          <motion.button key={step.title} type="button" aria-pressed={active === index} aria-controls="cyai-prompt-panel" onClick={() => onSelect(index)}
            initial={reduced ? false : { opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            whileHover={reduced ? undefined : { y: -4 }} transition={{ duration: reduced ? 0 : 0.3 }}
            className="relative flex items-center gap-5 rounded-xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-wicys-green-300 md:w-1/4 md:flex-col md:gap-4 md:text-center">
            <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border bg-ink-950 text-lg font-semibold md:h-16 md:w-16"
              style={{ borderColor: colors[index], color: colors[index], boxShadow: active === index ? `0 0 30px ${colors[index]}70, inset 0 0 18px ${colors[index]}25` : `0 0 15px ${colors[index]}25` }}>
              {active === index && <motion.span aria-hidden="true" className="absolute inset-0 rounded-full border" style={{ borderColor: colors[index] }}
                animate={moving ? { scale: [1, 1.5], opacity: [0.6, 0] } : { scale: 1, opacity: 0 }} transition={{ duration: moving ? 2 : 0, repeat: moving ? Infinity : 0 }} />}
              0{index + 1}
            </span>
            <span><span className="block text-sm font-semibold text-white sm:text-base">{step.title}</span><span className="mt-1 block text-xs text-cream/60">{step.pass}</span><span className="mt-2 block text-xs" style={{ color: colors[index] }}>{step.available ? 'Read prompt →' : 'View draft status →'}</span></span>
          </motion.button>
        ))}
      </div>
      <p className="text-xs leading-relaxed text-cream/50">The first three nodes represent the research passes. MITRE ATLAS is a supplemental prompt, listed separately in the draft.</p>
    </div>
  )
}

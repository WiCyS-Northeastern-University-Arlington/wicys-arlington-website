import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface Stage { title: string; pass: string; available: boolean }
const positions = [
  { x: 20, y: 25, z: 25, color: '#38bdf8' },
  { x: 80, y: 25, z: 55, color: '#a78bfa' },
  { x: 80, y: 75, z: 15, color: '#2dd4bf' },
  { x: 20, y: 75, z: 45, color: '#fbbf24' },
]

export default function CyAIPromptMap({ steps, active, onSelect }: { steps: Stage[]; active: number; onSelect: (index: number) => void }) {
  const [rotation, setRotation] = useState(-8)
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()
  const moving = !reduced && !paused
  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-ink-950/60 p-3 sm:p-6">
      <div className="flex items-center justify-between gap-3 px-2">
        <p className="text-xs uppercase tracking-widest text-cream/60">Prompt constellation</p>
        <button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)} className="rounded-full border border-white/20 px-3 py-2 text-xs text-cream/70 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-wicys-green-300">{paused ? 'Play motion' : 'Pause motion'}</button>
      </div>
      <p className="mt-3 px-2 text-sm text-cream/60">Select a glowing node to read its prompt or draft status.</p>
      <div className="relative mx-auto h-[440px] max-w-3xl sm:h-[480px]" style={{ perspective: 1000 }}>
        <motion.div animate={{ rotateY: rotation, rotateX: reduced ? 0 : 8 }} transition={{ duration: reduced ? 0 : 0.3 }}
          className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
          <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
            {positions.map((position, index) => (
              <g key={index}>
                <path d={`M 50 50 L ${position.x} ${position.y}`} stroke={position.color} strokeWidth="0.35" opacity={active === index ? 0.8 : 0.25} strokeDasharray={index === 3 ? '1 1.2' : undefined} />
                <motion.path d={`M 50 50 L ${position.x} ${position.y}`} stroke={position.color} strokeWidth="0.6" strokeLinecap="round" strokeDasharray="1 22" initial={false}
                  animate={{ strokeDashoffset: moving ? [0, -46] : 0 }} transition={{ duration: moving ? 4 : 0, repeat: moving ? Infinity : 0, ease: 'linear', delay: moving ? index * 0.4 : 0 }} />
              </g>
            ))}
          </svg>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ transformStyle: 'preserve-3d' }}>
            <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border border-violet-200/40 bg-[radial-gradient(circle_at_30%_25%,#a78bfa,#312052_50%,#100e21_85%)] shadow-[0_0_60px_#a78bfa35,inset_-8px_-10px_20px_#0008] sm:h-28 sm:w-28">
              <span className="text-xl font-bold text-white">CyAI</span><span className="mt-1 text-[10px] uppercase tracking-widest text-violet-100/70">Research</span>
            </div>
          </div>
          {steps.map((step, index) => {
            const position = positions[index]
            return (
              <div key={step.title} className="absolute w-28 -translate-x-1/2 -translate-y-1/2 sm:w-36" style={{ left: `${position.x}%`, top: `${position.y}%`, transformStyle: 'preserve-3d' }}>
                <motion.button type="button" aria-pressed={active === index} aria-controls="cyai-prompt-panel"
                  aria-label={`${step.title}, ${step.pass}. ${step.available ? 'Read prompt' : 'View draft status'}.`}
                  onClick={() => onSelect(index)}
                  animate={{ y: moving ? [0, -6, 0] : 0, z: active === index ? position.z + 15 : position.z }}
                  transition={{ y: { duration: moving ? 4 + index * 0.3 : 0, repeat: moving ? Infinity : 0 }, z: { duration: reduced ? 0 : 0.3 } }}
                  className="group flex w-full flex-col items-center rounded-xl py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wicys-green-300"
                  style={{ transformStyle: 'preserve-3d' }}>
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border text-lg font-semibold text-white transition-shadow sm:h-20 sm:w-20"
                    style={{ borderColor: `${position.color}90`, background: `radial-gradient(circle at 30% 25%,${position.color},${position.color}50 45%,#100e21 85%)`, boxShadow: `inset -8px -10px 15px #0006, 0 0 ${active === index ? 40 : 18}px ${position.color}${active === index ? '70' : '25'}` }}>0{index + 1}</span>
                  <span className={`mt-3 text-center text-xs font-semibold sm:text-sm ${active === index ? 'text-white' : 'text-cream/75'}`}>{step.title}</span>
                  <span className="mt-1 text-center text-[10px] text-cream/50 sm:text-xs">{step.pass}</span>
                  {active === index && <span className="mt-2 h-1 w-5 rounded-full" style={{ background: position.color }} />}
                </motion.button>
              </div>
            )
          })}
        </motion.div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 px-2 pt-4">
        <p className="text-xs text-cream/50">Solid links: research passes · Dashed link: supplemental prompt</p>
        <label className="flex items-center gap-3 text-xs text-cream/70">Rotate map<input type="range" min="-25" max="25" value={rotation} onChange={(event) => setRotation(Number(event.target.value))} className="w-28 accent-violet-400" /></label>
      </div>
    </div>
  )
}

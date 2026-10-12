import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import groups from '../../data/cyai.json'

const palette = ['#38bdf8', '#a78bfa', '#2dd4bf', '#fbbf24', '#fb7185']
const labels = ['Cyber', 'AI', 'CY → AI', 'AI → CY', 'CyAI']

export default function CyAIFindingsScene({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  const [angle, setAngle] = useState(-12)
  const reduced = useReducedMotion()
  const current = groups.find((group) => group.id === selected)!

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(ellipse_at_50%_60%,rgba(139,92,246,0.2),transparent_70%)] p-4 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><h3 className="font-semibold text-white">The competency landscape</h3><p className="mt-1 text-sm text-cream/60">Select a tower to explore its findings. Height represents the paper’s competency count.</p></div>
        <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-cream/70">272 competencies</span>
      </div>
      <div className="relative py-12" style={{ perspective: 900 }}>
        <motion.div animate={{ rotateY: angle, rotateX: reduced ? 0 : -8 }} transition={{ duration: reduced ? 0 : 0.4 }}
          className="relative mx-auto flex h-64 max-w-xl items-end justify-around gap-3 border-b border-white/20 px-3 pb-4 sm:gap-6 sm:px-8"
          style={{ transformStyle: 'preserve-3d' }}>
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 origin-bottom border border-white/10 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px]" style={{ transform: 'rotateX(75deg) translateZ(-12px)' }} />
          {groups.map((group, index) => {
            const active = selected === group.id
            return (
              <motion.button key={group.id} type="button" onClick={() => onSelect(group.id)} aria-pressed={active}
                aria-label={`${group.label}: ${group.total} competencies. Explore findings.`}
                initial={false} animate={{ y: active && !reduced ? -12 : 0, z: active ? 25 : 0 }}
                whileHover={reduced ? undefined : { y: -16 }}
                transition={{ type: 'spring', stiffness: 180, damping: 20, duration: reduced ? 0 : undefined }}
                className="group relative flex w-full max-w-20 flex-col items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-wicys-green-300"
                style={{ transformStyle: 'preserve-3d', color: palette[index] }}>
                <span className="mb-3 text-xl font-bold tabular-nums sm:text-3xl">{group.total}</span>
                <motion.span initial={{ height: reduced ? group.total / 105 * 170 : 0 }}
                  whileInView={{ height: group.total / 105 * 170 }} viewport={{ once: true }}
                  transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : index * 0.1 }}
                  className="relative block w-full border"
                  style={{ background: `linear-gradient(0deg,${palette[index]}25,${palette[index]}a0)`, borderColor: `${palette[index]}90`, transformStyle: 'preserve-3d', boxShadow: active ? `0 0 35px ${palette[index]}40` : 'none' }}>
                  <span aria-hidden="true" className="absolute inset-y-0 right-0 block w-4 origin-right border border-current" style={{ transform: 'rotateY(-90deg)', background: `${palette[index]}50` }} />
                  <span aria-hidden="true" className="absolute inset-x-0 top-0 block h-4 origin-top border border-current" style={{ transform: 'rotateX(-90deg)', background: `${palette[index]}b0` }} />
                </motion.span>
                <span className={`mt-4 whitespace-nowrap text-[10px] font-semibold sm:text-xs ${active ? 'text-white' : 'text-cream/60'}`}>{labels[index]}</span>
                <span aria-hidden="true" className={`mt-2 h-1 w-5 rounded-full ${active ? 'bg-current' : 'bg-transparent'}`} />
              </motion.button>
            )
          })}
        </motion.div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-5">
        <p aria-live="polite" className="text-sm text-cream/70"><span className="font-semibold text-white">{current.label}</span><br />{current.total} competencies · {(current.total / 272 * 100).toFixed(1)}% of the paper’s findings</p>
        <label className="flex items-center gap-3 text-xs text-cream/60">Rotate view
          <input aria-label="Rotate the 3D findings chart" type="range" min="-30" max="30" value={angle} onChange={(event) => setAngle(Number(event.target.value))} className="w-28 accent-violet-400 sm:w-40" />
        </label>
      </div>
    </div>
  )
}

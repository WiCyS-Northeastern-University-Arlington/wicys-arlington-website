import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function CyAIConvergence() {
  const [paused, setPaused] = useState(false)
  const reduced = useReducedMotion()
  return (
    <div className="cyai-universe relative isolate flex min-h-[420px] flex-col justify-center overflow-hidden rounded-3xl border border-white/10 bg-[#100e21] p-6 sm:min-h-[500px]"
      style={{ '--cyai-play': paused || reduced ? 'paused' : 'running' } as React.CSSProperties}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(45,212,191,0.15),transparent_55%),radial-gradient(ellipse_at_75%_65%,rgba(139,92,246,0.2),transparent_55%)]" />
      <div className="relative flex items-center justify-between text-xs uppercase tracking-[0.2em] text-cream/50">
        <span>Convergence in motion</span>
        <button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)} className="rounded-full border border-white/20 px-3 py-2 text-cream/80 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-wicys-green-300">{paused ? 'Play' : 'Pause'}</button>
      </div>
      <div className="relative flex flex-1 items-center justify-center py-16" role="img" aria-label="Cybersecurity and AI orbit a shared CyAI center, representing 15 cyber-to-AI clusters, 5 AI-to-cyber clusters, and 8 convergent competencies reported in the paper.">
        <div className="cyai-orbits absolute h-64 w-64 sm:h-80 sm:w-80" aria-hidden="true">
          <div className="cyai-orbit cyai-orbit-cy"><span /></div>
          <div className="cyai-orbit cyai-orbit-ai"><span /></div>
          <div className="cyai-orbit cyai-orbit-shared"><span /></div>
        </div>
        <motion.div animate={paused || reduced ? { scale: 1 } : { scale: [1, 1.04, 1] }} transition={{ duration: 4, repeat: Infinity }}
          className="relative flex h-36 w-36 flex-col items-center justify-center rounded-full border border-white/25 bg-ink-950/90 shadow-[0_0_80px_rgba(139,92,246,0.4),inset_0_0_30px_rgba(45,212,191,0.15)]">
          <span className="text-xs uppercase tracking-[0.25em] text-cream/60">Together</span>
          <span className="mt-1 text-4xl font-bold text-gradient">CyAI</span>
          <span className="mt-2 text-xs text-cream/70">8 competencies</span>
        </motion.div>
        <div className="absolute left-0 top-10 rounded-xl border border-teal-300/30 bg-ink-950/90 px-4 py-3 shadow-lg"><p className="text-sm font-semibold text-teal-300">Cybersecurity</p><p className="mt-1 text-xs text-cream/60">CY → AI · 15 clusters</p></div>
        <div className="absolute bottom-8 right-0 rounded-xl border border-violet-300/30 bg-ink-950/90 px-4 py-3 shadow-lg"><p className="text-sm font-semibold text-violet-300">Artificial intelligence</p><p className="mt-1 text-xs text-cream/60">AI → CY · 5 clusters</p></div>
      </div>
      <p className="relative text-center text-xs leading-relaxed text-cream/50">Cybersecurity secures AI. AI strengthens cybersecurity.<br />Their convergence creates a shared professional skill set.</p>
    </div>
  )
}

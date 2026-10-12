import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import prompts from '../../data/cyai-prompts.json'
import CyAIPromptPath from './CyAIPromptPath'

const steps = [
  { title: 'Data sources', pass: 'Initial pass', description: 'Data Sources Prompt', available: false },
  { title: 'Data collection', pass: 'Next pass', description: 'Data Collection Prompt', available: false },
  { title: 'Data analysis', pass: 'Final pass', description: 'Data Analysis Prompt', available: false },
  { title: 'MITRE ATLAS', pass: 'Supplemental prompt', description: 'MITRE Atlas Mitigation Prompt', available: true },
]

export default function CyAIPrompts() {
  const [active, setActive] = useState(0)
  const reduced = useReducedMotion()
  const step = steps[active]
  return (
    <section aria-labelledby="cyai-prompts-title" className="mt-12 overflow-hidden rounded-2xl border border-violet-300/20 bg-gradient-to-br from-violet-500/10 via-ink-950 to-teal-400/5 p-6 sm:p-10">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-sm font-medium uppercase tracking-widest text-wicys-green-300">Research methodology & AI prompts</p>
        <span className="rounded-full border border-amber-200/20 bg-amber-200/5 px-3 py-1 text-xs text-amber-200">Draft source document</span>
      </div>
      <h2 id="cyai-prompts-title" className="mt-3 text-3xl font-semibold text-white">Behind the research</h2>
      <p className="mt-3 max-w-3xl leading-relaxed text-cream/70">Explore the prompt stages listed in the researchers’ draft, followed by the supplemental MITRE ATLAS mitigation prompt.</p>
      <p className="mt-3 text-sm text-cream/50">The draft states: “{prompts.attribution}”</p>
      <CyAIPromptPath steps={steps} active={active} onSelect={setActive} />
      <div id="cyai-prompt-panel" className="mt-6 rounded-xl border border-white/10 bg-ink-950/60 p-5 sm:p-7" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={active} initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.18 }}>
            <p className="text-xs uppercase tracking-widest text-violet-300">{step.pass}</p>
            <h3 className="mt-2 text-xl font-semibold text-white">{step.description}</h3>
            {step.available ? (
              <>
                <p className="mt-3 text-sm text-amber-200/80">The draft identifies this prompt as not referenced in the research paper.</p>
                <blockquote className="mt-5 border-l-2 border-violet-300/50 pl-5 text-sm leading-7 text-cream/80">{prompts.mitrePrompt}</blockquote>
              </>
            ) : (
              <p className="mt-4 text-sm leading-relaxed text-cream/70">The draft lists this heading and its corresponding research pass, but does not include the prompt text.</p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

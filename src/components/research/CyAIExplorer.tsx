import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import groups from '../../data/cyai.json'
import CyAIFindingsScene from './CyAIFindingsScene'

const colors = ['bg-sky-400', 'bg-violet-400', 'bg-teal-400', 'bg-amber-400', 'bg-rose-400']

export default function CyAIExplorer() {
  const [selected, setSelected] = useState('cyai-integrated')
  const [query, setQuery] = useState('')
  const reduceMotion = useReducedMotion()
  const group = groups.find((entry) => entry.id === selected)!
  const entries = group.entries.filter((entry) =>
    `${entry.title} ${entry.statement} ${entry.sources}`.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <section aria-labelledby="cyai-explorer-title" className="glass rounded-2xl p-6 sm:p-10">
      <p className="text-sm font-medium uppercase tracking-widest text-wicys-green-300">Explore the findings</p>
      <h2 id="cyai-explorer-title" className="mt-3 text-3xl font-semibold text-white">Two fields. A shared frontier.</h2>
      <p className="mt-3 max-w-3xl leading-relaxed text-cream/70">
        The paper identifies 272 professional competencies. Start with either field’s foundations,
        explore how each strengthens the other, then discover the eight convergent competencies.
      </p>

      <CyAIFindingsScene selected={selected} onSelect={(id) => { setSelected(id); setQuery('') }} />

      <div className="mt-8 space-y-4" aria-label="Competency distribution reported in the abstract">
        {groups.map((item, index) => (
          <button key={item.id} type="button" onClick={() => { setSelected(item.id); setQuery('') }}
            aria-pressed={selected === item.id}
            className={`block w-full rounded-xl border p-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-wicys-green-300 ${selected === item.id ? 'border-wicys-green-300/60 bg-white/10' : 'border-white/10 hover:bg-white/5'}`}>
            <div className="flex items-center justify-between gap-3">
              <span className="font-medium text-white">{item.label}</span>
              <span className="text-sm tabular-nums text-cream/80">{item.total} <span className="text-cream/50">· {(item.total / 272 * 100).toFixed(1)}%</span></span>
            </div>
            <p className="mt-1 text-sm text-cream/60">{item.description}</p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/5" aria-hidden="true">
              <motion.div initial={{ width: reduceMotion ? `${item.total / 272 * 100}%` : 0 }}
                whileInView={{ width: `${item.total / 272 * 100}%` }} viewport={{ once: true }}
                transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : index * 0.08 }}
                className={`h-full rounded-full ${colors[index]}`} />
            </div>
          </button>
        ))}
      </div>

      <div className="mt-10 border-t border-white/10 pt-8">
        <h3 className="text-2xl font-semibold text-white">{group.label}</h3>
        <p className="mt-2 text-sm leading-relaxed text-cream/70">
          {group.id === 'cyai-integrated' ? 'Read the eight synthesized competency statements and expand their connections to the other clusters.' : 'Browse the cluster statements from the supplied workbook.'}
        </p>
        <label htmlFor="cyai-search" className="mt-6 block text-sm font-medium text-white">Search this category</label>
        <input id="cyai-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)}
          placeholder="Search topics, statements, or source IDs…"
          className="mt-2 w-full rounded-xl border border-white/20 bg-ink-900/60 px-4 py-3 text-white placeholder:text-cream/40 focus:outline focus:outline-2 focus:outline-wicys-green-300" />
        <p role="status" className="mt-3 text-sm text-cream/50">{entries.length} of {group.entries.length} {group.id === 'cyai-integrated' ? 'competencies' : 'workbook clusters'}</p>
        <motion.div key={selected} initial={{ opacity: reduceMotion ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="mt-5 grid gap-4 md:grid-cols-2" style={{ perspective: 1200 }}>
          {entries.map((entry, index) => (
            <motion.article key={entry.title}
              initial={reduceMotion ? false : { opacity: 0, rotateX: 12, y: 20 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }} viewport={{ once: true }}
              whileHover={reduceMotion ? undefined : { rotateY: -2, rotateX: 2, y: -4, boxShadow: '0 12px 35px rgba(139,92,246,0.15)' }}
              transition={{ duration: reduceMotion ? 0 : 0.3, delay: Math.min(index * 0.03, 0.15) }}
              className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-5">
              <h4 className="font-semibold text-white">{entry.title}</h4>
              <p className="mt-3 text-sm leading-relaxed text-cream/80">{entry.statement}</p>
              {entry.count !== null && <p className="mt-4 text-xs text-wicys-green-300">{entry.count} competencies in workbook summary</p>}
              {entry.sources && <p className="mt-3 text-xs text-cream/50">Source IDs: {entry.sources}</p>}
              {'note' in entry && entry.note && <p className="mt-3 text-xs text-amber-200">Workbook note: {entry.note}</p>}
              {'support' in entry && entry.support && <details className="mt-4 text-sm text-cream/70"><summary className="cursor-pointer text-wicys-green-300">Connections to other clusters</summary><p className="mt-3 whitespace-pre-line leading-relaxed">{entry.support}</p></details>}
            </motion.article>
          ))}
        </motion.div>
        {entries.length === 0 && <p className="py-8 text-cream/70">No matching statements. Try another topic or source ID.</p>}
        <p className="mt-6 break-words text-xs text-cream/50">Workbook: {group.source}</p>
      </div>
      <details className="mt-8 rounded-xl border border-white/10 p-4 text-sm text-cream/60">
        <summary className="cursor-pointer font-medium text-cream/80">About the counts and workbook revisions</summary>
        <p className="mt-3 leading-relaxed">The overview uses the abstract’s counts: 67 cyber-independent, 105 AI-independent, 61 CY → AI, 31 AI → CY, and 8 convergent. The workbook summary lists 15 CY → AI clusters totaling 59 competencies and 7 AI → CY rows totaling 28; the abstract reports 5 AI → CY clusters. Revision notes are retained, including the offensive cluster marked as moved to convergence. These workbook rows are shown as supplied and are not added to the paper’s total.</p>
      </details>
    </section>
  )
}

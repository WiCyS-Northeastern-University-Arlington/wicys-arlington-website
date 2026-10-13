import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { facultyResearch, studentResearch } from '../lib/content'
import MotionReveal from '../components/ui/MotionReveal'
import Tag from '../components/ui/Tag'
import CyAIExplorer from '../components/research/CyAIExplorer'
import CyAIConvergence from '../components/research/CyAIConvergence'
import CyAIPrompts from '../components/research/CyAIPrompts'
import NotFound from './NotFound'

export default function ResearchDetail() {
  const { slug } = useParams<{ slug: string }>()
  const item = [...facultyResearch, ...studentResearch].find((research) => research.slug === slug)
  if (!item) return <NotFound />

  return (
    <article className="container-page pb-16 pt-28 sm:pb-20 sm:pt-32">
      <Link to="/research" className="text-sm text-cream/70 transition-colors hover:text-wicys-green-300">← All research</Link>
      <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
      <MotionReveal className="max-w-3xl">
        <div className="flex flex-wrap gap-2">{item.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
        <h1 className="mt-5 text-5xl font-bold text-white sm:text-7xl"><span className="text-gradient">{item.title}</span></h1>
        {item.slug === 'cyai' && <p className="mt-4 text-2xl font-semibold leading-tight text-white sm:text-3xl">At the intersection of<br />intelligence and security.</p>}
        <p className="mt-4 text-lg leading-relaxed text-cream/70">{item.summary}</p>
        <p className="mt-5 font-medium text-wicys-green-300">{item.researchers.join(', ')}</p>
        {item.affiliation && <p className="mt-1 text-sm text-cream/60">{item.affiliation}</p>}
        {item.slug === 'cyai' && <>
          <p className="mt-5 font-medium text-wicys-green-300">Dr. Mihaela Sabin</p>
          <p className="mt-1 text-sm text-cream/60">University of New Hampshire</p>
        </>}
        {item.status && <p className="mt-2 text-sm text-cream/60">{item.status}</p>}
        {item.slug === 'cyai' && <a href="#findings" className="mt-8 inline-flex rounded-full bg-wicys-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-1">Explore the competencies ↓</a>}
      </MotionReveal>
      {item.slug === 'cyai' && <CyAIConvergence />}
      </div>
      {item.coverImage && (
        <MotionReveal className="mt-10 max-w-4xl">
          {item.slug === 'cyai' && <p className="mb-3 text-xs uppercase tracking-widest text-cream/50">Research convergence diagram</p>}
          <div className="relative">
            <img src={item.coverImage} alt={item.imageAlt || item.title} className="max-h-[32rem] w-full rounded-2xl border border-white/10 bg-white object-contain" />
            {item.slug === 'cyai' && (
              <p className="absolute bottom-2 right-3 max-w-[90%] rounded bg-white/90 px-2 py-1 text-right text-[10px] leading-snug text-slate-700 sm:bottom-3 sm:right-4 sm:text-xs">
                <strong className="font-bold"><em className="italic">CyAI depiction by <span className="text-violet-700">Bansi Bhesaniya</span><br />Northeastern University</em></strong>
              </p>
            )}
          </div>
        </MotionReveal>
      )}
      <MotionReveal className="mt-10 max-w-4xl rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-10">
        <div className="prose-wicys text-base leading-relaxed">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ em: ({ children }) => <em className="italic">{children}</em> }}>
            {item.body}
          </ReactMarkdown>
        </div>
        {item.link && <a href={item.link} target="_blank" rel="noreferrer" className="mt-6 inline-block text-wicys-green-300 hover:underline">View project →</a>}
      </MotionReveal>
      {item.slug === 'cyai' && <div id="findings" className="mt-12 scroll-mt-28"><CyAIExplorer /></div>}
      {item.slug === 'cyai' && <CyAIPrompts />}
    </article>
  )
}

import { studentResearch, facultyResearch } from '../lib/content'
import type { ResearchItem } from '../lib/content'
import PageHero from '../components/layout/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import MotionReveal from '../components/ui/MotionReveal'
import ResearchCard from '../components/research/ResearchCard'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

function ResearchList({ items, emptyLabel }: { items: ResearchItem[]; emptyLabel: string }) {
  if (items.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-lg text-white">{emptyLabel}</p>
        <p className="mt-2 text-sm text-cream/60">
          Check back for updates on our community’s cybersecurity research.
        </p>
      </Card>
    )
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-2">
      {items.map((item, i) => (
        <MotionReveal key={item.slug} delay={i * 0.05}>
          <ResearchCard item={item} />
        </MotionReveal>
      ))}
    </div>
  )
}

export default function Research() {
  return (
    <>
      <PageHero
        eyebrow="Research"
        title={
          <>
            Exploring the <span className="text-gradient">frontier</span>
          </>
        }
        subtitle="Discover cybersecurity, privacy, and policy research from our chapter community."
      />

      {studentResearch.length === 0 && (
        <section className="container-page py-8 sm:py-12">
          <MotionReveal>
            <Card className="p-12 text-center">
              <h2 className="text-2xl font-semibold text-white">Members’ research coming soon</h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-cream/60">
                We’ll be sharing our members’ projects and research here. Check back soon to see what our community is working on.
              </p>
            </Card>
          </MotionReveal>
        </section>
      )}

      {/* Student research ----------------------------------------------- */}
      {studentResearch.length > 0 && (
      <section id="student" className="container-page py-8 sm:py-12">
        <SectionHeading
          eyebrow="Student research"
          title="What our members are working on"
          subtitle="Independent studies, co-op projects, and research led by students in our chapter."
          className="mb-10"
        />
        <ResearchList items={studentResearch} emptyLabel="Student research coming soon." />
      </section>
      )}

      {/* Faculty research ----------------------------------------------- */}
      {facultyResearch.length > 0 && (
      <section id="faculty" className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow="Faculty research"
          title="Research from our faculty"
          subtitle="Labs and faculty-led work that students can learn from and get involved in."
          className="mb-10"
        />
        <ResearchList items={facultyResearch} emptyLabel="Faculty research coming soon." />

      </section>
      )}

      {/* CTA ------------------------------------------------------------ */}
      <section className="container-page py-8 sm:py-12">
        <MotionReveal>
          <Card className="relative overflow-hidden p-10 text-center sm:p-14">
            <div className="pointer-events-none absolute inset-0 bg-wicys-gradient opacity-[0.08]" />
            <h2 className="relative text-3xl font-bold text-white sm:text-4xl">
              Working on something?
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-cream/70">
              We'd love to feature your cybersecurity research here. Reach out and we'll add it.
            </p>
            <div className="relative mt-7 flex justify-center">
              <Button to="/get-involved" size="lg">
                Get involved
              </Button>
            </div>
          </Card>
        </MotionReveal>
      </section>
    </>
  )
}

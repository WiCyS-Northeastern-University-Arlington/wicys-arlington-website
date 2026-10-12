import { Suspense, lazy } from 'react'
import SectionHeading from '../ui/SectionHeading'
import MotionReveal from '../ui/MotionReveal'
import Button from '../ui/Button'

const CyberGlobe = lazy(() => import('../three/CyberGlobe'))

// Same topics as the "Technical workshops" highlight on the Home page.
const topics = ['CTFs', 'Cloud security', 'Threat hunting', 'Tooling']

export default function CyberDefenseSection() {
  return (
    <section className="container-page py-16 sm:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <SectionHeading
            eyebrow="What we explore"
            title={
              <>
                A connected world <span className="text-gradient">needs defenders</span>
              </>
            }
            subtitle="Hands-on, beginner-friendly workshops in CTFs, cloud security, threat hunting, and tooling - no experience required."
          />

          <MotionReveal delay={0.1} className="mt-7">
            <div className="flex flex-wrap gap-2">
              {topics.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-wicys-green-400/30 bg-wicys-green-400/10 px-3 py-1 font-mono text-xs text-wicys-green-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </MotionReveal>

          <MotionReveal delay={0.15} className="mt-8">
            <Button to="/events" variant="secondary">
              See our events
            </Button>
          </MotionReveal>
        </div>

        <MotionReveal delay={0.1}>
          <div className="relative aspect-square w-full">
            <div className="pointer-events-none absolute inset-[12%] rounded-full bg-wicys-gradient opacity-20 blur-3xl" />
            <Suspense fallback={null}>
              <CyberGlobe />
            </Suspense>
          </div>
        </MotionReveal>
      </div>
    </section>
  )
}

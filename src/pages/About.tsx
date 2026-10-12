import { lazy, Suspense } from 'react'
import { siteConfig } from '../config/siteConfig'
import PageHero from '../components/layout/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import Card from '../components/ui/Card'
import MotionReveal from '../components/ui/MotionReveal'
import Button from '../components/ui/Button'
const CyberGlobe = lazy(() => import('../components/three/CyberGlobe'))

const values = [
  {
    title: 'Recruit',
    body: 'We welcome students of every major and skill level into cybersecurity - no prior experience needed.',
  },
  {
    title: 'Retain',
    body: 'Through mentorship, study groups, and a genuine community, we help members stay and thrive in the field.',
  },
  {
    title: 'Advance',
    body: 'Workshops, conference scholarships, and industry connections help members grow into leaders.',
  },
]

// Faculty advisor — featured separately with a star to show she's special.
// To add a photo, put the image in public/images/board/ and set `photo` to its path.
const advisor: BoardMember = {
  name: 'Elizabeth (Beth) Hawthorne',
  role: 'Faculty Advisor',
  initial: 'B',
  photo: '/images/board/beth-hawthorne.jpg',
}

// Student board — photos go in public/images/board/, e.g. photo: '/images/board/mercy.jpg'.
// Leave `photo` empty to show the initial instead.
const board: BoardMember[] = [
  { name: 'Mercy Akinwunmi', role: 'President', initial: 'M', photo: '/images/board/mercy-akinwunmi.jpg' },
  { name: 'Janani Amuthasekaran', role: 'Vice President', initial: 'J', photo: '/images/board/janani-amuthasekaran.jpg' },
  { name: 'Uryaswi Bhowmick', role: 'Secretary', initial: 'U', photo: '/images/board/uryaswi-bhowmick.jpg' },
  { name: 'Raissa Bakari', role: 'Communication and Media Lead', initial: 'R', photo: '/images/board/raissa-bakari.jpg' },
]

interface BoardMember {
  name: string
  role: string
  initial: string
  photo?: string
}

/** Round headshot, falling back to the member's initial when there's no photo. */
function Avatar({ member, className }: { member: BoardMember; className: string }) {
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-wicys-gradient font-bold text-white ${className}`}
    >
      {member.photo ? (
        <img
          src={member.photo}
          alt={member.name}
          loading="lazy"
          className="h-full w-full object-contain object-center"
        />
      ) : (
        member.initial
      )}
    </div>
  )
}

/** Small gold star used to mark the faculty advisor. */
function StarIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.3l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5z" />
    </svg>
  )
}

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={
          <>
            A home for women in <span className="text-gradient">cybersecurity</span>
          </>
        }
        subtitle={siteConfig.tagline}
      />

      {/* Story */}
      <section className="container-page py-8 sm:py-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
          <MotionReveal>
            <div className="prose-wicys text-lg">
              <p>
                {siteConfig.shortName} is the {siteConfig.university} chapter of{' '}
                <a href={siteConfig.nationalUrl} target="_blank" rel="noopener noreferrer">
                  Women in CyberSecurity (WiCyS)
                </a>
                , a national organization working to build a robust and diverse cybersecurity
                workforce.
              </p>
              <p>
                Launched in {siteConfig.foundedYear} through {siteConfig.college}, our chapter
                brings together women and gender-nonconforming folks interested in community and
                knowledge sharing. From career prep and technical workshops to movie nights and
                capture the flag competitions, we make space for members to learn, connect, and grow.
              </p>
              <p>
                Every spring, we encourage members to apply to attend the main WiCyS
                conference - one of the largest gatherings of women in security in the world.
              </p>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1} className="w-full">
            <div className="relative mx-auto aspect-square w-full max-w-sm lg:max-w-none" role="img" aria-label="Interactive globe showing cybersecurity attacks and defenses">
              <div className="pointer-events-none absolute inset-[12%] rounded-full bg-wicys-gradient opacity-20 blur-3xl" />
              <Suspense fallback={null}>
                <CyberGlobe />
              </Suspense>
            </div>
          </MotionReveal>
        </div>
      </section>

      {/* Mission / values */}
      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          align="center"
          eyebrow="Our mission"
          title="Recruit · Retain · Advance"
          subtitle="The three pillars behind everything WiCyS does."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <MotionReveal key={v.title} delay={i * 0.08}>
              <Card className="h-full p-8 text-center">
                <span className="text-5xl font-bold text-gradient">{i + 1}</span>
                <h3 className="mt-4 text-xl font-semibold text-white">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">{v.body}</p>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </section>

      {/* Inclusivity */}
      <section className="container-page py-8 sm:py-12">
        <MotionReveal>
          <Card className="relative overflow-hidden p-10 text-center sm:p-14">
            <div className="pointer-events-none absolute inset-0 bg-wicys-gradient opacity-[0.08]" />
            <p className="relative mx-auto max-w-3xl text-2xl font-medium leading-relaxed text-white sm:text-3xl">
              “A community of women, men, allies, and advocates.” Everyone who supports our mission
              belongs here. 💜
            </p>
          </Card>
        </MotionReveal>
      </section>

      {/* Leadership */}
      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow="Leadership"
          title="Meet the board"
          subtitle="Our faculty advisor and the students who keep the chapter running."
        />

        {/* Faculty advisor — featured with a star to highlight her role */}
        <MotionReveal>
          <Card className="relative mx-auto mt-12 max-w-xl overflow-hidden p-8 text-center sm:p-10">
            <div className="pointer-events-none absolute inset-0 bg-wicys-gradient opacity-[0.06]" />
            <span className="relative inline-flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-200">
              <StarIcon className="h-3.5 w-3.5" /> Faculty Advisor
            </span>
            <div className="relative mx-auto mt-5 h-24 w-24">
              <Avatar member={advisor} className="h-24 w-24 text-3xl shadow-glow-green" />
              <span className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-amber-300 text-ink-900 shadow-lg">
                <StarIcon className="h-4 w-4" />
              </span>
            </div>
            <h3 className="relative mt-4 text-xl font-semibold text-white">{advisor.name}</h3>
            <p className="relative text-sm text-wicys-green-300">{advisor.role}</p>
          </Card>
        </MotionReveal>

        {/* Student officers */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {board.map((member, i) => (
            <MotionReveal key={member.role} delay={i * 0.06}>
              <Card interactive className="h-full p-6 text-center">
                <Avatar member={member} className="mx-auto h-20 w-20 text-2xl" />
                <h3 className="mt-4 font-semibold text-white">{member.name}</h3>
                <p className="text-sm text-wicys-green-300">{member.role}</p>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-8 sm:py-12">
        <MotionReveal>
          <Card className="flex flex-col items-center gap-6 p-10 text-center sm:p-14">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to join us?</h2>
            <p className="max-w-xl text-cream/70">
              Whether you're brand new to security or a seasoned CTF player, there's a place for you
              in our community.
            </p>
            <Button to="/get-involved" size="lg">
              Get involved
            </Button>
          </Card>
        </MotionReveal>
      </section>
    </>
  )
}

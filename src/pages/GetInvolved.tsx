import { siteConfig } from '../config/siteConfig'
import PageHero from '../components/layout/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import MotionReveal from '../components/ui/MotionReveal'
import SocialIcon from '../components/ui/SocialIcon'
import SubscribeForm from '../components/newsletter/SubscribeForm'

const perks = [
  {
    title: 'Learn by doing',
    body: 'Beginner-friendly workshops, CTF practice, and hands-on labs, build real skills employers want.',
  },
  {
    title: 'Meet your people',
    body: 'A welcoming community of women and allies who share your interest in security.',
  },
  {
    title: 'Get to the conference',
    body: 'Support and scholarship guidance for the annual WiCyS national conference.',
  },
  {
    title: 'Grow your network',
    body: 'Connect with mentors, recruiters, and alumni working across the security industry.',
  },
]

const faqs = [
  {
    q: 'Do I need cybersecurity experience?',
    a: 'Not at all. We welcome all majors and skill levels. Many members start with zero security background.',
  },
  {
    q: 'Who can join?',
    a: 'Any Northeastern student who supports our mission. We center women and gender-nonconforming folks, and welcome men, allies, and advocates.',
  },
  {
    q: 'Is there a membership fee?',
    a: 'Becoming a chapter member is completely free. To become an official WiCyS member, students pay a $20 annual fee, which unlocks extra resources and opportunities. For more information, visit wicys.org.',
  },
]

export default function GetInvolved() {
  const { membershipFormUrl } = siteConfig

  return (
    <>
      <PageHero
        eyebrow="Get involved"
        title={
          <>
            Join <span className="text-gradient">{siteConfig.shortName}</span>
          </>
        }
        subtitle="Become a member in a couple of minutes. All majors, all experience levels, all genders who support our mission are welcome."
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button href={membershipFormUrl} size="lg">
            Become a member →
          </Button>
          <Button href={`mailto:${siteConfig.email}`} variant="secondary" size="lg" newTab={false}>
            Email us
          </Button>
        </div>
      </PageHero>

      {/* Perks */}
      <section className="container-page py-8 sm:py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((perk, i) => (
            <MotionReveal key={perk.title} delay={i * 0.07}>
              <Card interactive className="h-full p-6">
                <span className="text-3xl">{['🛠️', '🤝', '🎟️', '🌐'][i]}</span>
                <h3 className="mt-3 text-lg font-semibold text-white">{perk.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/65">{perk.body}</p>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </section>

      {/* Big join card */}
      <section className="container-page py-8 sm:py-12">
        <MotionReveal>
          <Card className="relative overflow-hidden p-10 text-center sm:p-16">
            <div className="pointer-events-none absolute inset-0 bg-wicys-gradient opacity-10" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-wicys-green-400/10 blur-3xl" />
            <h2 className="relative text-3xl font-bold text-white sm:text-4xl">
              Ready when you are 💜
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-cream/70">
              Fill out our quick membership form and we'll add you to the community, our mailing
              list, and event invites.
            </p>
            <div className="relative mt-8">
              <Button href={membershipFormUrl} size="lg">
                Open the membership form
              </Button>
            </div>

            {/* Socials */}
            <div className="relative mt-10 flex flex-col items-center gap-3">
              <p className="text-sm text-cream/50">Or find us on</p>
              <div className="flex gap-3">
                {siteConfig.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="glass flex h-11 w-11 items-center justify-center rounded-full text-cream/80 transition-all hover:-translate-y-0.5 hover:text-wicys-green-300 hover:shadow-glow-green"
                  >
                    <SocialIcon icon={social.icon} />
                  </a>
                ))}
              </div>
            </div>
          </Card>
        </MotionReveal>
      </section>

      {/* FAQ */}
      <section className="container-page py-16 sm:py-20">
        <SectionHeading align="center" eyebrow="FAQ" title="Good to know" />
        <div className="mx-auto mt-10 max-w-3xl space-y-4">
          {faqs.map((faq, i) => (
            <MotionReveal key={faq.q} delay={i * 0.05}>
              <Card className="p-6">
                <h3 className="font-semibold text-white">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">{faq.a}</p>
              </Card>
            </MotionReveal>
          ))}
        </div>
      </section>

      {/* Newsletter fallback */}
      <section className="container-page pb-20">
        <Card className="flex flex-col gap-5 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Not ready to join yet?</h2>
            <p className="mt-1 text-sm text-cream/65">
              Subscribe to the newsletter and stay in the loop.
            </p>
          </div>
          <div className="w-full sm:max-w-md">
            <SubscribeForm compact />
          </div>
        </Card>
      </section>
    </>
  )
}

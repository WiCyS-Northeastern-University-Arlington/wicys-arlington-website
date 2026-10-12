import { siteConfig } from '../config/siteConfig'
import { upcomingEvents, pastEvents, conferenceRecaps, conferencePhotos } from '../lib/content'
import PageHero from '../components/layout/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import MotionReveal from '../components/ui/MotionReveal'
import EventCard from '../components/events/EventCard'
import PhotoGallery from '../components/conferences/PhotoGallery'
import ExperienceCard from '../components/conferences/ExperienceCard'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

export default function Events() {
  return (
    <>
      <PageHero
        eyebrow="Events & Conferences"
        title={
          <>
            What's <span className="text-gradient">happening</span>
          </>
        }
        subtitle="Workshops, socials, CTF nights, speaker sessions, and the conferences our members attend. Here's what's coming up - and a look back at what we've done."
      />

      {/* Upcoming ------------------------------------------------------- */}
      <section className="container-page py-8 sm:py-12">
        <SectionHeading
          eyebrow="Upcoming"
          title="Mark your calendar"
          subtitle="Everyone's welcome, no experience required. Save your spot below."
          className="mb-10"
        />

        {upcomingEvents.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {upcomingEvents.map((event, i) => (
              <MotionReveal key={event.slug} delay={i * 0.05}>
                <EventCard event={event} upcoming />
              </MotionReveal>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-lg text-white">No upcoming events scheduled just yet.</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-cream/60">
              Follow us on social or join the chapter to be the first to know when the next one
              drops.
            </p>
            <div className="mt-6 flex justify-center">
              <Button to="/get-involved" size="sm">
                Get involved
              </Button>
            </div>
          </Card>
        )}
      </section>

      {/* Past ----------------------------------------------------------- */}
      {pastEvents.length > 0 && (
        <section className="container-page py-16 sm:py-20">
          <SectionHeading
            eyebrow="Past events"
            title="Where we've been"
            subtitle="A recap of recent gatherings and the ground we covered together."
            className="mb-10"
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {pastEvents.map((event, i) => (
              <MotionReveal key={event.slug} delay={i * 0.05}>
                <EventCard event={event} />
              </MotionReveal>
            ))}
          </div>
        </section>
      )}

      {/* Conference gallery --------------------------------------------- */}
      <section className="container-page py-8 sm:py-12">
        <SectionHeading
          eyebrow="Conferences"
          title="Moments from past conferences"
          subtitle="Click any photo to view it full-size."
          className="mb-10"
        />
        <PhotoGallery photos={conferencePhotos} />
      </section>

      {/* Conference experiences ----------------------------------------- */}
      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow="In their words"
          title="Member experiences"
          subtitle="What attending meant to the students who went."
          className="mb-10"
        />

        {conferenceRecaps.length > 0 ? (
          <div className="space-y-8">
            {conferenceRecaps.map((recap, i) => (
              <MotionReveal key={recap.slug} delay={i * 0.05}>
                <ExperienceCard recap={recap} />
              </MotionReveal>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-lg text-white">Recaps coming soon.</p>
            <p className="mt-2 text-sm text-cream/60">
              Members can add their conference experiences through the{' '}
              <a href="/admin" className="text-wicys-green-300 underline">
                editor
              </a>
              .
            </p>
          </Card>
        )}
      </section>

      {/* CTA ------------------------------------------------------------ */}
      <section className="container-page py-8 sm:py-12">
        <MotionReveal>
          <Card className="relative overflow-hidden p-10 text-center sm:p-14">
            <div className="pointer-events-none absolute inset-0 bg-wicys-gradient opacity-[0.08]" />
            <h2 className="relative text-3xl font-bold text-white sm:text-4xl">
              Want to attend the next one?
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-cream/70">
              The WiCyS national conference happens every spring. Join the chapter and we'll help
              you apply for scholarships to get there.
            </p>
            <div className="relative mt-7 flex flex-wrap justify-center gap-4">
              <Button to="/get-involved" size="lg">
                Get involved
              </Button>
              <Button href={siteConfig.nationalUrl} variant="secondary" size="lg">
                About the conference
              </Button>
            </div>
          </Card>
        </MotionReveal>
      </section>
    </>
  )
}

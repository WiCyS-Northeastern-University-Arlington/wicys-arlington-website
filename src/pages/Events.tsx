import { upcomingEvents, pastEvents } from '../lib/content'
import PageHero from '../components/layout/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import MotionReveal from '../components/ui/MotionReveal'
import EventCard from '../components/events/EventCard'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

export default function Events() {
  return (
    <>
      <PageHero
        eyebrow="Announcements"
        title={
          <>
            What's <span className="text-gradient">happening</span>
          </>
        }
        subtitle="Workshops, socials, CTF nights, and speaker sessions. Here's what's coming up — and a look back at what we've done."
      />

      {/* Upcoming ------------------------------------------------------- */}
      <section className="container-page py-8 sm:py-12">
        <SectionHeading
          eyebrow="Upcoming"
          title="Mark your calendar"
          subtitle="Everyone's welcome — no experience required. Save your spot below."
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
    </>
  )
}

import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-5">
      <div className="pointer-events-none absolute inset-0 bg-wicys-radial opacity-70" />
      <div className="relative text-center">
        <p className="text-8xl font-bold text-gradient sm:text-9xl">404</p>
        <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md text-cream/65">
          Looks like this page slipped through a firewall. Let's get you back to safety.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button to="/">Back home</Button>
          <Button to="/newsletter" variant="secondary">
            Read the newsletter
          </Button>
        </div>
      </div>
    </section>
  )
}

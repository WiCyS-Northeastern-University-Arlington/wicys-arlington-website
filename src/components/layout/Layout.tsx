import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

/** Scrolls to the top of the page whenever the route changes. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

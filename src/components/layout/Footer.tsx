import { Link } from 'react-router-dom'
import { siteConfig } from '../../config/siteConfig'
import Logo from '../ui/Logo'
import SocialIcon from '../ui/SocialIcon'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-ink-900/40">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link to="/" aria-label="WiCyS Northeastern home">
            <Logo withWordmark />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
            {siteConfig.tagline}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-cream/50">
            Explore
          </h3>
          <ul className="mt-4 space-y-2.5">
            {siteConfig.nav.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-cream/70 transition-colors hover:text-wicys-green-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-cream/50">
            Community
          </h3>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href={siteConfig.nationalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cream/70 transition-colors hover:text-wicys-green-300"
              >
                WiCyS
              </a>
            </li>
            <li>
              <a
                href="https://www.khoury.northeastern.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cream/70 transition-colors hover:text-wicys-green-300"
              >
                Khoury College
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm text-cream/70 transition-colors hover:text-wicys-green-300"
              >
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-cream/50">
            Follow
          </h3>
          <div className="mt-4 flex gap-3">
            {siteConfig.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="glass flex h-10 w-10 items-center justify-center rounded-full text-cream/80 transition-all hover:-translate-y-0.5 hover:text-wicys-green-300 hover:shadow-glow-green"
              >
                <SocialIcon icon={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-6">
        <div className="container-page flex flex-col items-center justify-between gap-2 text-xs text-cream/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.chapterFullName}.
          </p>
          <p>
            An official WiCyS student chapter · Built with 💜 &amp; ☕ at{' '}
            {siteConfig.university}
          </p>
        </div>
      </div>
    </footer>
  )
}

/**
 * ============================================================================
 *  SITE CONFIG — the single place to edit chapter-wide values.
 *  Update these and the whole site follows. No component code changes needed.
 * ============================================================================
 */

export interface NavLink {
  label: string
  to: string
}

export interface SocialLink {
  label: string
  href: string
  /** Icon key rendered by components/ui/SocialIcon. */
  icon: 'instagram' | 'linkedin' | 'email' | 'discord' | 'github'
}

export interface StatItem {
  value: string
  label: string
}

export const siteConfig = {
  chapterName: 'WiCyS Northeastern Arlington',
  chapterFullName: 'Women in CyberSecurity - Northeastern University, Arlington',
  shortName: 'NU WiCyS',
  university: 'Northeastern University - Arlington',
  college: 'Khoury College of Computer Sciences',
  foundedYear: 2025,

  tagline: 'A community of engagement, encouragement, and support for women in cybersecurity.',
  mission:
    'We recruit, retain, and advance women and gender-nonconforming folks in cybersecurity - building a stronger, more diverse security community at Northeastern and beyond.',
  membershipFormUrl: 'https://docs.google.com/forms/d/1GTYLpn55POqtMAiWQSuUZ0QPr9GoBjIRsgyCJ6MNBJs/viewform?edit_requested=true', // TODO: swap for Google Form URL
  membershipFormIsPlaceholder: true,

  // Contact + socials -------------------------------------------------------
  email: 'wicysnuarlington@gmail.com', // TODO: confirm chapter email
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/wicys_neuarlington/', icon: 'instagram' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/wicys-nu-arl-student-chapter/',
      icon: 'linkedin',
    },
    { label: 'Email', href: 'mailto:wicysnuarlington@gmail.com', icon: 'email' },
  ] as SocialLink[],

  // National org -----------------------------------------------------------
  nationalUrl: 'https://www.wicys.org/',

  // Headline stats shown on the Home page (edit freely) ---------------------
  stats: [
    { value: 'Est. 2025', label: 'Founded at Northeastern Arlington' },
    { value: '100+', label: 'Members & allies' },
    { value: 'Spring', label: 'Annual WiCyS conference' },
    { value: 'All', label: 'Majors & experience levels welcome' },
  ] as StatItem[],

  // Primary navigation ------------------------------------------------------
  nav: [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Events', to: '/events' },
    { label: 'Newsletter', to: '/newsletter' },
    { label: 'Conferences', to: '/conferences' },
    { label: 'Get Involved', to: '/get-involved' },
  ] as NavLink[],
}

export type SiteConfig = typeof siteConfig

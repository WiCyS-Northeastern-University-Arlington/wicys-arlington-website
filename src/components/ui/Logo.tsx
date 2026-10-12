/**
 * Official logo — lives at public/images/logo.png (transparent background, white text
 * for the dark theme). The untouched original is kept at public/images/logo-original.png.
 */
const LOGO_SRC = '/images/logo.png'

interface Props {
  className?: string
}

export default function Logo({ className = 'h-14 sm:h-16' }: Props) {
  return (
    <img
      src={LOGO_SRC}
      alt="WiCyS Northeastern University at Arlington Student Chapter"
      className={`${className} w-auto object-contain`}
    />
  )
}

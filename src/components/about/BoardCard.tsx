import type { ReactNode, PointerEvent } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'

export interface BoardMember {
  name: string
  role: string
  initial: string
  photo?: string
}

interface Props {
  member: BoardMember
  delay?: number
  /** Gold ring + larger avatar for the faculty advisor. */
  featured?: boolean
  /** Rendered above the avatar (e.g. the "Faculty Advisor" badge). */
  badge?: ReactNode
  /** Rendered on the avatar's corner (e.g. the star). */
  avatarAccent?: ReactNode
  className?: string
}

const ease = [0.22, 1, 0.36, 1] as const

export default function BoardCard({
  member,
  delay = 0,
  featured = false,
  badge,
  avatarAccent,
  className = '',
}: Props) {
  const reduceMotion = useReducedMotion()

  // Pointer position within the card, 0–1 on each axis (0.5 = centre).
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 180, damping: 18, mass: 0.4 }
  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-10, 10]), spring)
  const glareX = useTransform(px, (v) => `${v * 100}%`)
  const glareY = useTransform(py, (v) => `${v * 100}%`)
  const glare = useMotionTemplate`radial-gradient(260px circle at ${glareX} ${glareY}, rgba(255,255,255,0.12), transparent 60%)`

  function handleMove(e: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }

  function handleLeave() {
    px.set(0.5)
    py.set(0.5)
  }

  const size = featured ? 'h-28 w-28 text-3xl' : 'h-24 w-24 text-2xl'
  const ring = featured
    ? 'bg-[conic-gradient(from_0deg,#fcd34d,#f59e0b,#fde68a,#fbbf24,#fcd34d)]'
    : 'bg-[conic-gradient(from_0deg,#6d3cbd,#2fbf71,#0fa3a3,#8b5cf6,#6d3cbd)]'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease, delay }}
      style={{ perspective: 900 }}
      className={`h-full ${className}`}
    >
      <motion.div
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={reduceMotion ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={`group glass relative h-full overflow-hidden rounded-2xl text-center transition-[border-color,box-shadow] duration-300 hover:border-wicys-purple-400/40 hover:shadow-glow ${
          featured ? 'p-8 sm:p-10' : 'p-6'
        }`}
      >
        {/* Cursor-following light */}
        <motion.div
          aria-hidden
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        {featured && (
          <div className="pointer-events-none absolute inset-0 bg-wicys-gradient opacity-[0.06]" />
        )}

        {badge && <div className="relative">{badge}</div>}

        {/* Avatar with spinning gradient ring */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 260, damping: 16, delay: delay + 0.15 }}
          style={{ z: 40 }}
          className={`relative mx-auto ${size} ${badge ? 'mt-5' : ''}`}
        >
          <div
            aria-hidden
            className={`absolute -inset-[3px] animate-spin-slow rounded-full ${ring} opacity-70 transition-opacity duration-300 group-hover:opacity-100`}
          />
          <div
            aria-hidden
            className={`absolute -inset-2 animate-spin-slow rounded-full ${ring} opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-50`}
          />
          <div className="relative h-full w-full overflow-hidden rounded-full bg-ink-900 p-[3px]">
            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-wicys-gradient font-bold text-white">
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              ) : (
                member.initial
              )}
            </div>
          </div>
          {avatarAccent}
        </motion.div>

        {/* Name + role */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: delay + 0.3 } } }}
          style={{ z: 24 }}
          className="relative"
        >
          <motion.h3
            variants={fadeUp}
            className={`mt-5 font-semibold text-white ${featured ? 'text-xl' : ''}`}
          >
            {member.name}
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-1 text-sm text-wicys-green-300 transition-colors group-hover:text-wicys-green-200"
          >
            {member.role}
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
}

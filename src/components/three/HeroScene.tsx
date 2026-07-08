import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import ParticleField from './ParticleField'

/** Detects the user's reduced-motion preference (reactively). */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

function useIsSmallScreen() {
  const [small, setSmall] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    setSmall(mq.matches)
    const onChange = () => setSmall(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return small
}

/** Static, dependency-free gradient shown when 3D is unavailable/undesired. */
function StaticFallback() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute inset-0 bg-wicys-radial" />
      <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-wicys-gradient opacity-20 blur-3xl" />
    </div>
  )
}

/**
 * Full-bleed animated hero background. Falls back to a static gradient when the
 * user prefers reduced motion or when WebGL fails to initialize.
 */
export default function HeroScene() {
  const reduced = usePrefersReducedMotion()
  const small = useIsSmallScreen()
  const [webglFailed, setWebglFailed] = useState(false)

  if (reduced || webglFailed) return <StaticFallback />

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Suspense fallback={<StaticFallback />}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 55 }}
          dpr={[1, small ? 1.5 : 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
          onError={() => setWebglFailed(true)}
        >
          <ambientLight intensity={0.6} />
          <ParticleField count={small ? 450 : 900} />
        </Canvas>
      </Suspense>
      {/* fade the scene into the page below */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
    </div>
  )
}

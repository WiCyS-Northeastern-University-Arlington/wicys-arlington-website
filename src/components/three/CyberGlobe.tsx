import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Billboard, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const PURPLE = new THREE.Color('#8b5cf6')
const GREEN = new THREE.Color('#2fbf71')
const TEAL = new THREE.Color('#0fa3a3')

const R = 2
const RED = new THREE.Color('#f43f5e')
const BLUE = new THREE.Color('#3b82f6')
/** Where along each arc the blue defense meets the red attack (0 = attacker, 1 = target). */
const MEET_T = 0.6
const WHITE = new THREE.Color('#ffffff')

// Rough city coordinates [lat, lon] — Boston and Arlington VA included for the chapter.
const CITIES: [number, number][] = [
  [42.36, -71.06], // Boston
  [38.88, -77.1], // Arlington, VA
  [37.77, -122.42], // San Francisco
  [47.61, -122.33], // Seattle
  [19.43, -99.13], // Mexico City
  [-23.55, -46.63], // São Paulo
  [51.51, -0.13], // London
  [52.52, 13.4], // Berlin
  [6.52, 3.38], // Lagos
  [-1.29, 36.82], // Nairobi
  [25.2, 55.27], // Dubai
  [28.61, 77.21], // New Delhi
  [1.35, 103.82], // Singapore
  [35.68, 139.69], // Tokyo
  [-33.87, 151.21], // Sydney
]

// [attacker, target] city indexes. Each arc shows a red attack intercepted by a blue defense.
const ROUTES: [number, number][] = [
  [1, 6],
  [0, 7],
  [2, 13],
  [6, 11],
  [3, 0],
  [5, 8],
  [12, 14],
  [9, 10],
  [4, 1],
  [11, 12],
  [10, 1],
  [13, 3],
  [7, 0],
  [8, 6],
  [14, 2],
]

function latLonToVec3(lat: number, lon: number, r = R) {
  const phi = THREE.MathUtils.degToRad(90 - lat)
  const theta = THREE.MathUtils.degToRad(lon + 180)
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  )
}

/** Evenly spaced points over a sphere (Fibonacci lattice). */
function DotSphere({ count }: { count: number }) {
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const golden = Math.PI * (3 - Math.sqrt(5))
    const c = new THREE.Color()
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2
      const rad = Math.sqrt(1 - y * y)
      const th = golden * i
      pos.set([Math.cos(th) * rad * R, y * R, Math.sin(th) * rad * R], i * 3)
      c.lerpColors(PURPLE, TEAL, (y + 1) / 2).lerp(WHITE, 0.15)
      col.set([c.r, c.g, c.b], i * 3)
    }
    return { positions: pos, colors: col }
  }, [count])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.85} depthWrite={false} />
    </points>
  )
}

function CityNode({ position, phase }: { position: THREE.Vector3; phase: number }) {
  const ring = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ring.current) return
    const t = (clock.elapsedTime * 0.8 + phase) % 1
    ring.current.scale.setScalar(1 + t * 2.5)
    ;(ring.current.material as THREE.MeshBasicMaterial).opacity = 0.6 * (1 - t)
  })
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color={GREEN} />
      </mesh>
      <Billboard>
        <mesh ref={ring}>
          <ringGeometry args={[0.05, 0.065, 24]} />
          <meshBasicMaterial color={GREEN} transparent depthWrite={false} />
        </mesh>
      </Billboard>
    </group>
  )
}

interface ArcProps {
  from: THREE.Vector3
  to: THREE.Vector3
  speed: number
  offset: number
}

function makeLine(points: THREE.Vector3[], color: THREE.Color, opacity: number) {
  const geom = new THREE.BufferGeometry().setFromPoints(points)
  const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false })
  return new THREE.Line(geom, mat)
}

function Packet({ color, innerRef }: { color: THREE.Color; innerRef: React.Ref<THREE.Group> }) {
  return (
    <group ref={innerRef}>
      <mesh>
        <sphereGeometry args={[0.032, 10, 10]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

/**
 * One attack/defense cycle: a red packet leaves the attacker, a blue packet leaves the target,
 * they meet at MEET_T and a blue hexagon shield flashes. Then a short pause and it repeats.
 */
function Arc({ from, to, speed, offset }: ArcProps) {
  const curve = useMemo(() => {
    const mid = from.clone().add(to).normalize()
    const lift = R + from.distanceTo(to) * 0.45
    return new THREE.QuadraticBezierCurve3(from, mid.multiplyScalar(lift), to)
  }, [from, to])

  const lines = useMemo(() => {
    const pts = curve.getPoints(64)
    const split = Math.round(64 * MEET_T)
    return [makeLine(pts.slice(0, split + 1), RED, 0.4), makeLine(pts.slice(split), BLUE, 0.4)]
  }, [curve])
  useEffect(
    () => () =>
      lines.forEach((l) => {
        l.geometry.dispose()
        ;(l.material as THREE.Material).dispose()
      }),
    [lines],
  )

  const meetPoint = useMemo(() => curve.getPoint(MEET_T), [curve])
  const attack = useRef<THREE.Group>(null)
  const defense = useRef<THREE.Group>(null)
  const shield = useRef<THREE.Mesh>(null)
  // Cycle phase 0–1: first 70% packets travel, last 30% shield flash + pause.
  const phase = useRef(offset)

  useFrame((_, delta) => {
    phase.current = (phase.current + delta * speed) % 1
    const travel = Math.min(phase.current / 0.7, 1)
    const flying = phase.current < 0.7

    if (attack.current) {
      attack.current.visible = flying
      attack.current.position.copy(curve.getPoint(travel * MEET_T))
    }
    if (defense.current) {
      // Blue launches a little later but is faster, so both arrive together.
      const d = Math.max((travel - 0.3) / 0.7, 0)
      defense.current.visible = flying && d > 0
      defense.current.position.copy(curve.getPoint(1 - d * (1 - MEET_T)))
    }
    if (shield.current) {
      const k = (phase.current - 0.7) / 0.25
      shield.current.visible = k >= 0 && k < 1
      if (shield.current.visible) {
        shield.current.scale.setScalar(0.6 + k * 1.8)
        shield.current.rotation.z = k * 0.8
        ;(shield.current.material as THREE.MeshBasicMaterial).opacity = 0.95 * (1 - k)
      }
    }
  })

  return (
    <group>
      <primitive object={lines[0]} />
      <primitive object={lines[1]} />
      <Packet color={RED} innerRef={attack} />
      <Packet color={BLUE} innerRef={defense} />
      <Billboard position={meetPoint}>
        <mesh ref={shield} visible={false}>
          <ringGeometry args={[0.09, 0.14, 6]} />
          <meshBasicMaterial
            color={BLUE}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </Billboard>
    </group>
  )
}

function OrbitRings() {
  const a = useRef<THREE.Mesh>(null)
  const b = useRef<THREE.Mesh>(null)
  useFrame((_, d) => {
    if (a.current) a.current.rotation.z += d * 0.15
    if (b.current) b.current.rotation.z -= d * 0.1
  })
  return (
    <>
      <mesh ref={a} rotation={[Math.PI / 2.3, 0.2, 0]}>
        <torusGeometry args={[R * 1.45, 0.006, 8, 160]} />
        <meshBasicMaterial color={PURPLE} transparent opacity={0.45} />
      </mesh>
      <mesh ref={b} rotation={[Math.PI / 1.8, -0.4, 0]}>
        <torusGeometry args={[R * 1.6, 0.004, 8, 160]} />
        <meshBasicMaterial color={TEAL} transparent opacity={0.3} />
      </mesh>
    </>
  )
}

function Globe({ small }: { small: boolean }) {
  const cityVecs = useMemo(() => CITIES.map(([lat, lon]) => latLonToVec3(lat, lon)), [])

  return (
    <group rotation={[0.35, -1.9, 0]}>
      {/* dark core hides the far side so the globe reads as solid */}
      <mesh>
        <sphereGeometry args={[R * 0.985, 48, 48]} />
        <meshBasicMaterial color="#14121f" />
      </mesh>
      <mesh>
        <sphereGeometry args={[R * 1.08, 32, 32]} />
        <meshBasicMaterial
          color={PURPLE}
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <DotSphere count={small ? 900 : 1600} />
      {cityVecs.map((v, i) => (
        <CityNode key={i} position={v} phase={i / cityVecs.length} />
      ))}
      {ROUTES.map(([f, to], i) => (
        <Arc
          key={i}
          from={cityVecs[f]}
          to={cityVecs[to]}
          speed={0.28 + (i % 4) * 0.05}
          offset={(i * 0.37) % 1}
        />
      ))}
    </group>
  )
}

function useMediaQuery(query: string) {
  const [match, setMatch] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    setMatch(mq.matches)
    const onChange = () => setMatch(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return match
}

export default function CyberGlobe() {
  const wrap = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [failed, setFailed] = useState(false)
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const small = useMediaQuery('(max-width: 640px)')

  // Only animate while the globe is on screen.
  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      rootMargin: '100px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrap} className="relative h-full w-full cursor-grab active:cursor-grabbing">
      {failed ? (
        <div className="absolute inset-0 m-auto aspect-square w-3/4 rounded-full bg-wicys-gradient opacity-20 blur-3xl" />
      ) : (
        <Canvas
          camera={{ position: [0, 0, 9], fov: 45 }}
          dpr={[1, small ? 1.5 : 2]}
          frameloop={visible && !reduced ? 'always' : 'demand'}
          gl={{ antialias: true, alpha: true }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
          onError={() => setFailed(true)}
        >
          <Globe small={small} />
          <OrbitRings />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={!reduced}
            autoRotateSpeed={0.5}
            rotateSpeed={0.6}
            minPolarAngle={Math.PI * 0.25}
            maxPolarAngle={Math.PI * 0.75}
          />
        </Canvas>
      )}
    </div>
  )
}

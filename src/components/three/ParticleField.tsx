import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PURPLE = new THREE.Color('#6d3cbd')
const GREEN = new THREE.Color('#2fbf71')
const TEAL = new THREE.Color('#0fa3a3')

interface Props {
  count?: number
  animate?: boolean
}

/** Draws a single glyph (a "0" or "1") onto a canvas and returns it as a
 *  point-sprite texture. White glyph on transparent bg so the per-vertex
 *  brand color tints it and additive blending gives a soft "code rain" glow. */
function makeDigitTexture(char: '0' | '1') {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, size, size)
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 96px "Courier New", monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(char, size / 2, size / 2 + 4)
  const tex = new THREE.CanvasTexture(canvas)
  tex.minFilter = THREE.LinearFilter
  tex.needsUpdate = true
  return tex
}

/** One buffer-geometry point cloud rendered with a given digit sprite. */
function DigitPoints({
  positions,
  colors,
  map,
}: {
  positions: Float32Array
  colors: Float32Array
  map: THREE.Texture
}) {
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={map}
        size={0.17}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/**
 * A slowly rotating cloud of brand-colored binary digits (0s and 1s) wrapped
 * around a wireframe icosahedron — a "secure network / community" motif. Pure
 * buffer geometry so it stays cheap on the GPU. Reacts subtly to pointer.
 */
export default function ParticleField({ count = 900, animate = true }: Props) {
  const group = useRef<THREE.Group>(null)
  const { viewport } = useThree()

  // One sprite texture per digit; disposed on unmount.
  const zeroTex = useMemo(() => makeDigitTexture('0'), [])
  const oneTex = useMemo(() => makeDigitTexture('1'), [])
  useEffect(() => {
    return () => {
      zeroTex.dispose()
      oneTex.dispose()
    }
  }, [zeroTex, oneTex])

  // Positions + per-vertex colors (purple → teal → green gradient by radius),
  // split into two clouds: one rendered as "0", the other as "1".
  const { zeros, ones } = useMemo(() => {
    const p0: number[] = []
    const c0: number[] = []
    const p1: number[] = []
    const c1: number[] = []
    const tmp = new THREE.Color()
    for (let i = 0; i < count; i++) {
      // distribute in a spherical shell
      const r = 2.4 + Math.random() * 2.6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)

      const t = (r - 2.4) / 2.6
      if (t < 0.5) tmp.lerpColors(PURPLE, TEAL, t * 2)
      else tmp.lerpColors(TEAL, GREEN, (t - 0.5) * 2)

      if (Math.random() < 0.5) {
        p0.push(x, y, z)
        c0.push(tmp.r, tmp.g, tmp.b)
      } else {
        p1.push(x, y, z)
        c1.push(tmp.r, tmp.g, tmp.b)
      }
    }
    return {
      zeros: { positions: new Float32Array(p0), colors: new Float32Array(c0) },
      ones: { positions: new Float32Array(p1), colors: new Float32Array(c1) },
    }
  }, [count])

  useFrame((state, delta) => {
    if (!group.current) return
    if (animate) {
      group.current.rotation.y += delta * 0.06
      group.current.rotation.x += delta * 0.015
    }
    // gentle pointer parallax
    const targetX = (state.pointer.x * viewport.width) / 30
    const targetY = (state.pointer.y * viewport.height) / 30
    group.current.position.x += (targetX - group.current.position.x) * 0.03
    group.current.position.y += (targetY - group.current.position.y) * 0.03
  })

  return (
    <group ref={group}>
      {/* wireframe core */}
      <mesh>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshBasicMaterial color={PURPLE} wireframe transparent opacity={0.35} />
      </mesh>
      <mesh scale={1.35}>
        <icosahedronGeometry args={[1.8, 0]} />
        <meshBasicMaterial color={GREEN} wireframe transparent opacity={0.15} />
      </mesh>

      {/* binary-digit shell */}
      <DigitPoints positions={zeros.positions} colors={zeros.colors} map={zeroTex} />
      <DigitPoints positions={ones.positions} colors={ones.colors} map={oneTex} />
    </group>
  )
}

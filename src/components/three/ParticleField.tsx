import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const PURPLE = new THREE.Color('#6d3cbd')
const GREEN = new THREE.Color('#2fbf71')
const TEAL = new THREE.Color('#0fa3a3')

interface Props {
  count?: number
  animate?: boolean
}

/**
 * A slowly rotating cloud of brand-colored particles wrapped around a wireframe
 * icosahedron — a "secure network / community" motif. Pure buffer geometry so
 * it stays cheap on the GPU. Reacts subtly to pointer position.
 */
export default function ParticleField({ count = 900, animate = true }: Props) {
  const group = useRef<THREE.Group>(null)
  const { viewport } = useThree()

  // Particle positions + per-vertex colors (purple → teal → green gradient by radius).
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const tmp = new THREE.Color()
    for (let i = 0; i < count; i++) {
      // distribute in a spherical shell
      const r = 2.4 + Math.random() * 2.6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      const t = (r - 2.4) / 2.6
      if (t < 0.5) tmp.lerpColors(PURPLE, TEAL, t * 2)
      else tmp.lerpColors(TEAL, GREEN, (t - 0.5) * 2)
      colors[i * 3] = tmp.r
      colors[i * 3 + 1] = tmp.g
      colors[i * 3 + 2] = tmp.b
    }
    return { positions, colors }
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

      {/* particle shell */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}

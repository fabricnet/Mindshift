import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'

/* screw-thread rings on the bulb base: [y position, radius] */
const threads = [
  [-1.02, 0.45],
  [-1.18, 0.42],
  [-1.34, 0.39],
]

/* Lightbulb hero object — blinks like a real filament and rolls with scroll */
function LightBulb({ scrollRef }) {
  const group = useRef()
  const filMat = useRef()
  const glow = useRef()
  const glassMat = useRef()

  useFrame((state) => {
    const p = scrollRef.current
    const t = state.clock.elapsedTime

    // irregular blink: mostly lit with quick dips, over a slow breathing pulse
    const w = Math.sin(t * 7.3) * Math.sin(t * 13.1 + 2) * Math.sin(t * 3.7 + 1)
    const on = w > -0.82 ? 1 : 0.08
    const pulse = 0.8 + 0.2 * Math.sin(t * 2.2)
    const level = on * pulse * (1 + p * 0.8)

    if (filMat.current) filMat.current.emissiveIntensity = 0.4 + level * 3.2
    if (glow.current) glow.current.intensity = level * 14
    if (glassMat.current) glassMat.current.opacity = 0.1 + level * 0.08

    if (group.current) {
      // rolls forward as the page scrolls, with a lazy idle tumble
      group.current.rotation.z = -p * Math.PI * 5 + Math.sin(t * 0.4) * 0.08
      group.current.rotation.y = t * 0.12 + p * Math.PI * 1.5
      group.current.position.x = Math.sin(p * Math.PI * 2) * 1.7
      group.current.position.z = -p * 1.5
      group.current.scale.setScalar(0.95 + p * 0.5)
    }
  })

  return (
    <Float speed={1.3} rotationIntensity={0.25} floatIntensity={0.7}>
      <group ref={group}>
        {/* glass globe */}
        <mesh position={[0, 0.45, 0]}>
          <sphereGeometry args={[1.15, 48, 48]} />
          <meshPhysicalMaterial
            ref={glassMat}
            color="#f7e9d6"
            roughness={0.08}
            metalness={0}
            transparent
            opacity={0.15}
            depthWrite={false}
          />
        </mesh>
        {/* filament coil */}
        <mesh position={[0, 0.4, 0]}>
          <torusKnotGeometry args={[0.3, 0.05, 120, 12, 2, 3]} />
          <meshStandardMaterial
            ref={filMat}
            color="#c3713f"
            emissive="#ff9a3c"
            emissiveIntensity={2.5}
            roughness={0.4}
          />
        </mesh>
        {/* light cast by the filament */}
        <pointLight ref={glow} position={[0, 0.4, 0]} intensity={12} distance={9} color="#ffb066" />
        {/* glass neck */}
        <mesh position={[0, -0.75, 0]}>
          <cylinderGeometry args={[0.4, 0.52, 0.5, 32]} />
          <meshPhysicalMaterial color="#f7e9d6" transparent opacity={0.15} roughness={0.1} depthWrite={false} />
        </mesh>
        {/* screw base */}
        <mesh position={[0, -1.18, 0]}>
          <cylinderGeometry args={[0.44, 0.36, 0.55, 32]} />
          <meshStandardMaterial color="#7f6c5b" metalness={0.85} roughness={0.35} />
        </mesh>
        {threads.map(([y, r]) => (
          <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[r, 0.035, 12, 32]} />
            <meshStandardMaterial color="#8a7766" metalness={0.9} roughness={0.3} />
          </mesh>
        ))}
        {/* contact tip */}
        <mesh position={[0, -1.52, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#646b59" metalness={0.8} roughness={0.4} />
        </mesh>
      </group>
    </Float>
  )
}

/* Wireframe shell orbiting the core in the opposite direction */
function Shell({ scrollRef }) {
  const mesh = useRef()
  useFrame((state) => {
    const p = scrollRef.current
    const t = state.clock.elapsedTime
    if (mesh.current) {
      mesh.current.rotation.y = -t * 0.06 - p * Math.PI * 2
      mesh.current.rotation.z = p * Math.PI
      mesh.current.scale.setScalar(1 + p * 1.2)
    }
  })
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[3.2, 1]} />
      <meshBasicMaterial color="#7f6c5b" wireframe transparent opacity={0.14} />
    </mesh>
  )
}

/* Particle field with a slow swirl that accelerates on scroll */
function Particles({ scrollRef, count = 2600 }) {
  const points = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 9
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((state) => {
    const p = scrollRef.current
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02 + p * Math.PI
      points.current.rotation.x = p * 0.6
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.022} color="#7f6c5b" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  )
}

/* Camera eases toward the mouse for subtle parallax */
function CameraRig({ scrollRef }) {
  useFrame((state) => {
    const p = scrollRef.current
    state.camera.position.x += (state.pointer.x * 0.6 - state.camera.position.x) * 0.04
    state.camera.position.y += (-state.pointer.y * 0.6 - state.camera.position.y) * 0.04
    state.camera.position.z = 6 - p * 1.5
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Scene3D({ scrollRef }) {
  return (
    <div className="scene-layer">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 5, 5]} intensity={1.6} color="#fff6ea" />
        <pointLight position={[-6, -4, -4]} intensity={22} color="#c3713f" />
        <pointLight position={[6, 4, 2]} intensity={16} color="#a29c7e" />
        <LightBulb scrollRef={scrollRef} />
        <Shell scrollRef={scrollRef} />
        <Particles scrollRef={scrollRef} />
        <CameraRig scrollRef={scrollRef} />
        <fog attach="fog" args={['#e4e4dc', 8, 18]} />
      </Canvas>
    </div>
  )
}

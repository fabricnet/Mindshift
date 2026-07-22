import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

/* Morphing core object — rotation, color and distortion are driven by scroll progress */
function MindCore({ scrollRef }) {
  const mesh = useRef()
  const mat = useRef()
  const colorA = useMemo(() => new THREE.Color('#8b5cf6'), [])
  const colorB = useMemo(() => new THREE.Color('#22d3ee'), [])
  const tmp = useMemo(() => new THREE.Color(), [])

  useFrame((state) => {
    const p = scrollRef.current
    const t = state.clock.elapsedTime
    if (mesh.current) {
      mesh.current.rotation.x = t * 0.12 + p * Math.PI * 1.5
      mesh.current.rotation.y = t * 0.18 + p * Math.PI * 2.5
      // drift the core sideways and back as the page scrolls
      mesh.current.position.x = Math.sin(p * Math.PI * 2) * 1.6
      mesh.current.position.z = -p * 2
      const s = 1 + p * 0.6
      mesh.current.scale.setScalar(s)
    }
    if (mat.current) {
      mat.current.distort = 0.35 + p * 0.35 + Math.sin(t * 0.6) * 0.05
      tmp.copy(colorA).lerp(colorB, (Math.sin(p * Math.PI * 2) + 1) / 2)
      mat.current.color = tmp
    }
  })

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.7, 32]} />
        <MeshDistortMaterial
          ref={mat}
          roughness={0.15}
          metalness={0.85}
          distort={0.4}
          speed={2}
        />
      </mesh>
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
      <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.08} />
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
      <pointsMaterial size={0.02} color="#a78bfa" transparent opacity={0.55} sizeAttenuation depthWrite={false} />
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
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.4} color="#c4b5fd" />
        <pointLight position={[-6, -4, -4]} intensity={30} color="#22d3ee" />
        <pointLight position={[6, 4, 2]} intensity={24} color="#e879f9" />
        <MindCore scrollRef={scrollRef} />
        <Shell scrollRef={scrollRef} />
        <Particles scrollRef={scrollRef} />
        <CameraRig scrollRef={scrollRef} />
        <fog attach="fog" args={['#050507', 8, 18]} />
      </Canvas>
    </div>
  )
}

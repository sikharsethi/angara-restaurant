import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

type Kind = 'cardamom' | 'cinnamon' | 'anise' | 'chilli'
interface SpiceProps { kind: Kind; angle: number; radius: number; y: number }

const colors: Record<Kind, string> = { cardamom: '#8a9a5b', cinnamon: '#8b4a2b', chilli: '#b3261e', anise: '#6b4426' }

function starShape(): THREE.Shape {
  const s = new THREE.Shape()
  for (let i = 0; i < 16; i++) {
    const r = i % 2 ? 0.18 : 0.5, a = (i / 16) * Math.PI * 2
    const x = Math.cos(a) * r, y = Math.sin(a) * r
    if (i === 0) s.moveTo(x, y); else s.lineTo(x, y)
  }
  s.closePath()
  return s
}

function Spice({ kind, angle, radius, y }: SpiceProps) {
  const geo = useMemo(() => {
    switch (kind) {
      case 'cardamom': return new THREE.CapsuleGeometry(0.16, 0.3, 6, 12)
      case 'cinnamon': return new THREE.CylinderGeometry(0.07, 0.07, 0.9, 16)
      case 'chilli': return new THREE.ConeGeometry(0.15, 0.8, 16)
      default: return new THREE.ExtrudeGeometry(starShape(), { depth: 0.1, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 2 })
    }
  }, [kind])
  useEffect(() => () => geo.dispose(), [geo])
  return (
    <Float speed={1.5} rotationIntensity={1.2} floatIntensity={0.8}>
      <mesh geometry={geo} position={[Math.cos(angle) * radius, y, Math.sin(angle) * radius]} rotation={[angle, angle * 2, 0]}>
        <meshStandardMaterial color={colors[kind]} roughness={0.55} metalness={0.15} />
      </mesh>
    </Float>
  )
}

const spices: SpiceProps[] = [
  { kind: 'anise', angle: 0, radius: 2.2, y: 0.4 },
  { kind: 'cinnamon', angle: 0.9, radius: 2.4, y: -0.5 },
  { kind: 'chilli', angle: 1.8, radius: 2.1, y: 0.8 },
  { kind: 'cardamom', angle: 2.6, radius: 2.3, y: -0.2 },
  { kind: 'anise', angle: 3.5, radius: 2.5, y: -0.9 },
  { kind: 'cardamom', angle: 4.2, radius: 2.1, y: 0.6 },
  { kind: 'chilli', angle: 5.0, radius: 2.4, y: -0.3 },
  { kind: 'cinnamon', angle: 5.7, radius: 2.2, y: 0.9 },
]

function Cluster() {
  const group = useRef<THREE.Group>(null)
  const light = useRef<THREE.PointLight>(null)
  useFrame(({ pointer, clock }, dt) => {
    if (group.current) {
      group.current.rotation.y += dt * 0.25
      group.current.rotation.x += (-pointer.y * 0.35 - group.current.rotation.x) * Math.min(1, dt * 2)
    }
    if (light.current) {
      const t = clock.elapsedTime
      light.current.intensity = 28 + Math.sin(t * 9) * 5 + Math.sin(t * 23) * 3
    }
  })
  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[0.5, 48, 48]} />
        <meshBasicMaterial color="#ffb04a" toneMapped={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.95, 32, 32]} />
        <meshBasicMaterial color="#ff6a00" transparent opacity={0.16} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <pointLight ref={light} color="#ff9a40" distance={9} />
      {spices.map((s, i) => <Spice key={i} {...s} />)}
    </group>
  )
}

export default function Scene3D() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 40 }} aria-hidden>
      <ambientLight intensity={0.15} />
      <Environment preset="night" />
      <Cluster />
      <Sparkles count={60} scale={[6, 6, 6]} size={3} speed={0.4} color="#ffb05a" />
    </Canvas>
  )
}
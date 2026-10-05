import { useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles } from '@react-three/drei'
import * as THREE from 'three'

const vertexShader = `varying vec2 vUv;
void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`

const fragmentShader = `varying vec2 vUv; uniform float uTime;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
  return mix(mix(h(i), h(i+vec2(1,0)), f.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), f.x), f.y); }
float fbm(vec2 p){ float v = 0.0, a = 0.5; for(int i = 0; i < 5; i++){ v += a*n(p); p *= 2.0; a *= 0.5; } return v; }
void main(){
  vec2 p = vec2((vUv.x - 0.5) * 2.0, vUv.y);
  float q = fbm(vec2(p.x * 3.0, p.y * 2.0 - uTime * 1.4));
  float shape = 1.0 - smoothstep(0.0, 1.0, abs(p.x) * 1.6 + vUv.y * 1.1 - q * 0.7);
  shape *= smoothstep(0.0, 0.08, vUv.y);
  float heat = clamp(shape * 1.6, 0.0, 1.0);
  vec3 col = mix(vec3(0.8, 0.1, 0.0), vec3(1.0, 0.55, 0.1), heat);
  col = mix(col, vec3(1.0, 0.9, 0.6), pow(heat, 3.0));
  gl_FragColor = vec4(col * heat, heat);
}`

function Flame() {
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])
  useFrame(({ clock }) => { uniforms.uTime.value = clock.elapsedTime })
  return (
    <mesh position={[0, 0.2, 0]}>
      <planeGeometry args={[3, 4]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

export default function Scene3D() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7], fov: 35 }} aria-hidden>
      <Flame />
      <Sparkles count={40} scale={[2.2, 4, 1.5]} position={[0, 0.8, 0]} size={3} speed={0.9} color="#ffb05a" />
    </Canvas>
  )
}
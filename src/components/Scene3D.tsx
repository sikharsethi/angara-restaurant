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
  float y = vUv.y;
  float sway = sin(uTime * 1.7 + y * 4.0) * 0.10 * y;
  vec2 p = vec2((vUv.x - 0.5) * 2.0 + sway, y);
  float t = fbm(vec2(p.x * 2.2, y * 2.4 - uTime * 1.5));
  float width = (1.0 - pow(y, 1.2)) * 0.62;
  float d = abs(p.x) - width * (0.55 + 0.9 * t);
  float shape = smoothstep(0.18, -0.12, d);
  shape *= smoothstep(0.0, 0.12, y) * (1.0 - smoothstep(0.75, 1.0, y));
  float core = smoothstep(0.1, -0.25, d) * (1.0 - y * 0.8);
  vec3 col = mix(vec3(0.55, 0.05, 0.0), vec3(1.0, 0.45, 0.05), smoothstep(0.0, 0.6, shape));
  col = mix(col, vec3(0.7, 0.08, 0.0), smoothstep(0.45, 0.95, y));
  col = mix(col, vec3(1.0, 0.85, 0.45), core * core);
  gl_FragColor = vec4(col * 1.3 * shape, shape);
}`

function Flame() {
  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])
  useFrame(({ clock }) => { uniforms.uTime.value = clock.elapsedTime })
  return (
    <mesh position={[0, 0.45, 0]}>
      <planeGeometry args={[2.2, 3]} />
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
      <Sparkles count={40} scale={[1.8, 3, 1.2]} position={[0, 0.2, 0]} size={3} speed={0.9} color="#ffb05a" />
    </Canvas>
  )
}
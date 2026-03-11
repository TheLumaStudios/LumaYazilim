import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from 'styled-components';

function AnimatedSphere() {
  const meshRef = useRef();
  const theme = useTheme();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_color1: { value: new THREE.Color(theme.colors.accent) },
      u_color2: { value: new THREE.Color('#00A8FF') },
    }),
    [theme]
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.002;
      uniforms.u_time.value = state.clock.elapsedTime;
    }
  });

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float u_time;

    void main() {
      vUv = uv;
      vPosition = position;

      vec3 pos = position;
      float displacement = sin(pos.x * 2.0 + u_time) *
                          cos(pos.y * 2.0 + u_time) * 0.1;
      pos += normal * displacement;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 u_color1;
    uniform vec3 u_color2;
    uniform float u_time;
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      vec3 color = mix(u_color1, u_color2, vUv.y + sin(u_time * 0.5) * 0.5);
      float alpha = 0.3;
      gl_FragColor = vec4(color, alpha);
    }
  `;

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <AnimatedSphere />
      <Sparkles count={100} scale={10} size={2} speed={0.4} opacity={0.6} />
    </>
  );
}

const ThreeBackground = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Scene />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;

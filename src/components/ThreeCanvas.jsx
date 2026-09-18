import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function WebGLScene({ progress = 0 }) {
  const sphereRef = useRef();
  const boxRef = useRef();
  const torusRef = useRef();
  const groupRef = useRef();

  // Slow idle group rotation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05;
    }

    // Rotate individual meshes at different speeds
    if (sphereRef.current) {
      sphereRef.current.rotation.y = t * 0.25;
      sphereRef.current.rotation.x = t * 0.1;
    }
    if (boxRef.current) {
      boxRef.current.rotation.y = -t * 0.2;
      boxRef.current.rotation.z = t * 0.15;
    }
    if (torusRef.current) {
      torusRef.current.rotation.y = t * 0.3;
      torusRef.current.rotation.x = t * 0.2;
    }
  });

  // Calculate opacity transitions based on scroll progress
  // Phase 1 (Sphere): peaks at progress = 0
  // Phase 2 (Box): peaks at progress = 0.5
  // Phase 3 (Torus): peaks at progress = 1
  const sphereOpacity = Math.max(0, 1 - Math.abs(progress - 0) * 3);
  const boxOpacity = Math.max(0, 1 - Math.abs(progress - 0.5) * 3);
  const torusOpacity = Math.max(0, 1 - Math.abs(progress - 1.0) * 3);

  // Scales
  const sphereScale = 0.5 + sphereOpacity * 0.7;
  const boxScale = 0.5 + boxOpacity * 0.7;
  const torusScale = 0.5 + torusOpacity * 0.7;

  return (
    <group ref={groupRef}>
      {/* 1. Sphere Mesh (Hyper-Automation / Neural) */}
      {sphereOpacity > 0.01 && (
        <group ref={sphereRef} scale={[sphereScale, sphereScale, sphereScale]}>
          <mesh>
            <sphereGeometry args={[1.6, 24, 24]} />
            <meshBasicMaterial 
              color="#eb510e" 
              wireframe 
              transparent 
              opacity={sphereOpacity * 0.25} 
            />
          </mesh>
          {/* Outer orbital rings */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.0, 0.02, 8, 64]} />
            <meshBasicMaterial color="#213d83" transparent opacity={sphereOpacity * 0.6} />
          </mesh>
          <mesh rotation={[0, Math.PI / 4, 0]}>
            <torusGeometry args={[2.2, 0.015, 8, 64]} />
            <meshBasicMaterial color="#eb510e" transparent opacity={sphereOpacity * 0.4} />
          </mesh>
        </group>
      )}

      {/* 2. Box Mesh (Scale & Vision / Bounding Grid) */}
      {boxOpacity > 0.01 && (
        <group ref={boxRef} scale={[boxScale, boxScale, boxScale]}>
          <mesh>
            <boxGeometry args={[2.0, 2.0, 2.0]} />
            <meshBasicMaterial 
              color="#213d83" 
              wireframe 
              transparent 
              opacity={boxOpacity * 0.3} 
            />
          </mesh>
          {/* Inner particle grid */}
          <points>
            <boxGeometry args={[1.8, 1.8, 1.8, 4, 4, 4]} />
            <pointsMaterial color="#eb510e" size={0.06} transparent opacity={boxOpacity * 0.8} />
          </points>
          {/* Bounding box scan line */}
          <gridHelper args={[2.4, 4, '#eb510e', '#213d83']} position={[0, Math.sin(Date.now() * 0.003) * 1.0, 0]} />
        </group>
      )}

      {/* 3. Torus Mesh (Predictive & Robotic / Mechanical Gear) */}
      {torusOpacity > 0.01 && (
        <group ref={torusRef} scale={[torusScale, torusScale, torusScale]}>
          <mesh>
            <torusGeometry args={[1.5, 0.45, 12, 48]} />
            <meshBasicMaterial 
              color="#eb510e" 
              wireframe 
              transparent 
              opacity={torusOpacity * 0.35} 
            />
          </mesh>
          {/* Rotating axis rings */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.2, 0.03, 8, 48]} />
            <meshBasicMaterial color="#213d83" transparent opacity={torusOpacity * 0.6} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[2.4, 0.01, 8, 48]} />
            <meshBasicMaterial color="#eb510e" transparent opacity={torusOpacity * 0.4} />
          </mesh>
        </group>
      )}
    </group>
  );
}

export default function ThreeCanvas({ progress = 0 }) {
  return (
    <div className="w-full h-full min-h-[350px] md:min-h-[500px] relative bg-slate-100/40 rounded-3xl border border-slate-200/50 overflow-hidden shadow-inner flex items-center justify-center">
      
      {/* Blueprint background grid overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
      
      {/* Dynamic technical telemetry overlay */}
      <div className="absolute top-4 left-4 z-10 font-mono text-[9px] text-slate-400 bg-white/90 border border-slate-200/40 px-2.5 py-1 rounded-full select-none shadow-sm">
        WEBGL WIREFRAME ENGINE // REACT THREE FIBER
      </div>
      
      <div className="absolute bottom-4 right-4 z-10 font-mono text-[9px] text-slate-400 bg-white/90 border border-slate-200/40 px-2.5 py-1 rounded-full select-none shadow-sm">
        ACTIVE OBJECT: {progress <= 0.33 ? '01 // NEURAL_SPHERE' : progress <= 0.66 ? '02 // VISION_GRID' : '03 // SYNC_GEAR'}
      </div>

      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5.0], fov: 55 }} className="w-full h-full block z-10">
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <WebGLScene progress={progress} />
      </Canvas>
    </div>
  );
}

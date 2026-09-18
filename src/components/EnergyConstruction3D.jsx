import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Box, Cylinder, Sphere, ContactShadows, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

const cBg = '#050a15'; // Deeper, more cinematic background

// Reusable realistic materials
const materials = {
  carPaintWhite: <meshPhysicalMaterial color="#f8fafc" metalness={0.2} roughness={0.1} clearcoat={1.0} clearcoatRoughness={0.1} />,
  carPaintYellow: <meshPhysicalMaterial color="#eab308" metalness={0.3} roughness={0.2} clearcoat={1.0} clearcoatRoughness={0.1} />,
  darkMetal: <meshPhysicalMaterial color="#1e293b" metalness={0.8} roughness={0.4} clearcoat={0.2} />,
  glass: <meshPhysicalMaterial color="#000000" transmission={0.9} opacity={1} metalness={0.1} roughness={0.0} ior={1.5} thickness={0.5} transparent />,
  concrete: <meshStandardMaterial color="#94a3b8" metalness={0.1} roughness={0.9} />,
  steel: <meshPhysicalMaterial color="#f97316" metalness={0.6} roughness={0.5} />,
  solarPanel: <meshPhysicalMaterial color="#000a1f" metalness={0.9} roughness={0.05} clearcoat={1.0} />,
  silverMetal: <meshPhysicalMaterial color="#e2e8f0" metalness={0.9} roughness={0.2} />,
  ground: <meshStandardMaterial color="#1e293b" metalness={0.2} roughness={0.8} />
};

function WindTurbine({ position, scale = 1, speed = 1, offset = 0 }) {
  const bladesRef = useRef();

  useFrame((state) => {
    if (bladesRef.current) {
      bladesRef.current.rotation.z = (state.clock.elapsedTime * speed) + offset;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Tower - slightly tapered */}
      <Cylinder args={[0.2, 0.4, 8, 32]} position={[0, 4, 0]} castShadow receiveShadow>
        {materials.carPaintWhite}
      </Cylinder>

      {/* Nacelle */}
      <group position={[0, 8, 0]}>
        <Box args={[1.8, 0.8, 0.8]} position={[0, 0, 0]} castShadow receiveShadow>
          {materials.carPaintWhite}
        </Box>
        {/* Hub */}
        <Sphere args={[0.4, 32, 32]} position={[-0.9, 0, 0]} castShadow receiveShadow>
          {materials.carPaintWhite}
        </Sphere>

        {/* Blades Assembly */}
        <group position={[-1.0, 0, 0]} ref={bladesRef}>
          {[0, 1, 2].map((i) => (
            <group key={i} rotation={[0, 0, (Math.PI * 2 / 3) * i]}>
              {/* Aerodynamic blade */}
              <Box args={[0.1, 4.5, 0.3]} position={[0, 2.25, 0]} castShadow receiveShadow>
                {materials.carPaintWhite}
              </Box>
            </group>
          ))}
        </group>
      </group>
    </group>
  );
}

function TransmissionTower({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Central mast */}
      <Cylinder args={[0.2, 0.6, 10, 8]} position={[0, 5, 0]} castShadow>
        {materials.darkMetal}
      </Cylinder>
      {/* Cross arms */}
      <Box args={[6, 0.2, 0.2]} position={[0, 8, 0]} castShadow>
        {materials.darkMetal}
      </Box>
      <Box args={[4, 0.2, 0.2]} position={[0, 6, 0]} castShadow>
        {materials.darkMetal}
      </Box>
      {/* Insulators */}
      {[-2.8, -1.5, 1.5, 2.8].map((x, i) => (
        <Cylinder key={`ins1-${i}`} args={[0.1, 0.1, 0.5, 8]} position={[x, 7.5, 0]}>
          {materials.glass}
        </Cylinder>
      ))}
      {[-1.8, 1.8].map((x, i) => (
        <Cylinder key={`ins2-${i}`} args={[0.1, 0.1, 0.5, 8]} position={[x, 5.5, 0]}>
          {materials.glass}
        </Cylinder>
      ))}
    </group>
  );
}

function SmartCityBlock({ position }) {
  const buildings = [
    { x: -2, z: -2, h: 4, w: 1.5, d: 1.5 },
    { x: 2, z: -2, h: 6, w: 1.8, d: 1.8 },
    { x: -2, z: 2, h: 3, w: 1.2, d: 1.2 },
    { x: 2, z: 2, h: 5, w: 1.6, d: 1.6 },
    { x: 0, z: 0, h: 8, w: 2, d: 2 },
  ];

  return (
    <group position={position}>
      {buildings.map((b, i) => (
        <group key={i} position={[b.x, b.h / 2, b.z]}>
          {/* Building Base */}
          <Box args={[b.w, b.h, b.d]} castShadow receiveShadow>
            {materials.concrete}
          </Box>
          {/* Glowing Windows representing consumption */}
          <Box args={[b.w + 0.1, b.h - 0.5, b.d + 0.1]}>
            <meshBasicMaterial color="#38bdf8" wireframe={true} transparent opacity={0.3} />
          </Box>
        </group>
      ))}
      {/* Grid lines */}
      <Box args={[8, 0.05, 8]} position={[0, 0.05, 0]}>
        <meshBasicMaterial color="#0ea5e9" wireframe={true} transparent opacity={0.4} />
      </Box>
    </group>
  );
}

function SolarPanelArray({ position }) {
  return (
    <group position={position}>
      {[0, 1, 2].map((row) =>
        [-1, 0, 1].map((col) => (
          <group key={`${row}-${col}`} position={[col * 1.8, 0, row * 1.5]} rotation={[Math.PI / 7, 0, 0]}>
            {/* Panel */}
            <Box args={[1.6, 0.05, 1.2]} position={[0, 0.6, 0]} castShadow receiveShadow>
              {materials.solarPanel}
            </Box>
            {/* Frame */}
            <Box args={[1.65, 0.06, 1.25]} position={[0, 0.59, 0]} castShadow receiveShadow>
              {materials.silverMetal}
            </Box>
            {/* Support Post */}
            <Cylinder args={[0.08, 0.08, 0.6, 16]} position={[0, 0.3, 0]} castShadow receiveShadow>
              {materials.silverMetal}
            </Cylinder>
          </group>
        ))
      )}
    </group>
  );
}

function SmartDataCenter({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Main structure */}
      <Box args={[6, 3, 4]} position={[0, 1.5, 0]} castShadow receiveShadow>
        {materials.darkMetal}
      </Box>
      {/* Glowing server racks visible through glass */}
      <group position={[0, 1.5, 0]}>
        {[-2, 0, 2].map((x, i) => (
          <Box key={i} args={[0.8, 2, 2.5]} position={[x, 0, 0]}>
            <meshBasicMaterial color="#0ea5e9" wireframe={true} />
          </Box>
        ))}
      </group>
      {/* Glass enclosure */}
      <Box args={[6.2, 3.2, 4.2]} position={[0, 1.5, 0]} castShadow>
        {materials.glass}
      </Box>
    </group>
  );
}

function GroundPad({ args, position }) {
  return (
    <Box args={args} position={position} receiveShadow>
      {materials.ground}
    </Box>
  );
}

function FullEnergyConstructionScene() {
  return (
    <group position={[0, -1, 0]}>
      {/* Module 1: High Consumption (Smart Data Center) */}
      <group position={[-8, 0, 4]}>
        <SmartDataCenter position={[0, 0, 0]} rotation={[0, Math.PI / 6, 0]} />
        <GroundPad args={[9, 0.1, 9]} position={[0, 0.05, 0]} />

        {/* Glowing Data Node to signify AI */}
        <Sphere args={[0.5, 32, 32]} position={[3, 1, -2]}>
          <meshBasicMaterial color="#0ea5e9" />
        </Sphere>
      </group>

      {/* Module 2: Urban Consumption (Smart City Block) */}
      <group position={[0, 0, -4]}>
        <SmartCityBlock position={[-1, 0, -1]} />
        <TransmissionTower position={[5, 0, -2]} scale={0.8} />
        <GroundPad args={[14, 0.1, 9]} position={[0, 0.05, -1]} />

        {/* Glowing Data Node */}
        <Sphere args={[0.5, 32, 32]} position={[-3, 1, 3]}>
          <meshBasicMaterial color="#38bdf8" />
        </Sphere>
      </group>

      {/* Module 3: Energy Generation (Wind & Solar) */}
      <group position={[10, 0, 4]}>
        <WindTurbine position={[0, 0, -4]} scale={0.9} speed={1.5} />
        <WindTurbine position={[5, 0, -2]} scale={0.9} speed={1.2} offset={2} />
        <SolarPanelArray position={[-2, 0, 2]} />
        <SolarPanelArray position={[3, 0, 2]} />
        <GroundPad args={[12, 0.1, 10]} position={[1.5, 0.05, 0]} />

        {/* Glowing Data Node */}
        <Sphere args={[0.5, 32, 32]} position={[-2, 1, -2]}>
          <meshBasicMaterial color="#bae6fd" />
        </Sphere>
      </group>

      {/* Connective Energy/Data Paths */}
      <Box args={[26, 0.02, 0.5]} position={[1, 0.08, 1]} receiveShadow>
        <meshBasicMaterial color="#0ea5e9" opacity={0.6} transparent />
      </Box>
      <Box args={[0.5, 0.02, 10]} position={[0, 0.08, -1]} receiveShadow>
        <meshBasicMaterial color="#0ea5e9" opacity={0.6} transparent />
      </Box>
    </group>
  );
}

function SmoothCamera({ activeStep }) {
  const { camera, controls } = useThree();

  useFrame(() => {
    if (!controls) return;

    let targetX = 0, targetY = 0, targetZ = 0;
    // Closer, more dramatic camera angles for realism
    let camX = 14, camY = 12, camZ = 16;

    if (activeStep === 0) {
      targetX = -8; targetY = 1; targetZ = 4;
      camX = -12; camY = 6; camZ = 12;
    } else if (activeStep === 1) {
      targetX = 1; targetY = 4; targetZ = -4;
      camX = 6; camY = 8; camZ = 10;
    } else if (activeStep === 2) {
      targetX = 11; targetY = 2; targetZ = 4;
      camX = 16; camY = 5; camZ = 14;
    }

    controls.target.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.05);
    camera.position.lerp(new THREE.Vector3(camX, camY, camZ), 0.04);
    controls.update();
  });

  return null;
}

export default function EnergyConstruction3D({ activeStep = 0 }) {
  return (
    <div className="w-full h-full absolute inset-0" style={{ backgroundColor: cBg }}>
      {/* Viewport UI overlays */}
      <div className="absolute top-6 left-6 z-20 flex gap-2 items-center">
        <div className="w-2 h-2 rounded-full animate-pulse bg-sky-400 shadow-[0_0_8px_#38bdf8]"></div>
        <div className="text-xs font-mono uppercase tracking-widest text-sky-400">Live Simulation</div>
      </div>
      <div className="absolute bottom-6 right-6 z-20 text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500">
        AI Predictive Environment
      </div>

      <Canvas dpr={[1, 2]} shadows camera={{ position: [14, 12, 16], fov: 45 }}>
        {/* Soft realistic lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight
          castShadow
          position={[15, 25, 15]}
          intensity={2.5}
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-25}
          shadow-camera-right={25}
          shadow-camera-top={25}
          shadow-camera-bottom={-25}
          shadow-bias={-0.0001}
          color="#fffaf0" // slightly warm sunlight
        />
        {/* Soft fill light */}
        <directionalLight position={[-15, 15, -15]} intensity={0.5} color="#cbd5e1" />

        {/* Environment map provides realistic reflections */}
        <Environment preset="city" />

        <FullEnergyConstructionScene />

        {/* Contact shadows for deep grounding */}
        <ContactShadows
          position={[0, -0.99, 0]}
          opacity={0.8}
          scale={50}
          blur={1.5}
          far={10}
          resolution={512}
          color="#000000"
        />

        {/* Post-processing for cinematic realism */}
        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
        </EffectComposer>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          makeDefault
        />
        <SmoothCamera activeStep={activeStep} />
      </Canvas>
    </div>
  );
}

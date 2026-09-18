import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Box, Cylinder, Sphere, Edges } from '@react-three/drei';
import * as THREE from 'three';

// --- Isometric Blueprint Style Constants (Matching Reference) ---
const cBg = '#142438';      // Deep navy background
const cFill = '#142438';    // Same as background so objects occlude but look hollow
const cOutline = '#8ba2c2'; // Light slate blue for technical lines
const cAccent = '#e25b30';  // Deep orange for solid accents
const cHighlight = '#e25b30'; // Orange for colored outlines

// --- Base Styled Components ---
function BlueprintBox({ args, position, rotation, isSolidAccent = false, isAccentLine = false, transparent = false, opacity = 1 }) {
  return (
    <group position={position} rotation={rotation}>
      <Box args={args}>
        <meshBasicMaterial
          color={isSolidAccent ? cAccent : cFill}
          transparent={transparent}
          opacity={opacity}
          depthWrite={true}
        />
        <Edges color={isAccentLine ? cHighlight : (isSolidAccent ? '#ffffff' : cOutline)} threshold={15} />
      </Box>
    </group>
  );
}

function BlueprintCylinder({ args, position, rotation, isSolidAccent = false, isAccentLine = false }) {
  return (
    <group position={position} rotation={rotation}>
      <Cylinder args={args}>
        <meshBasicMaterial color={isSolidAccent ? cAccent : cFill} depthWrite={true} />
        <Edges color={isAccentLine ? cHighlight : cOutline} threshold={15} />
      </Cylinder>
    </group>
  );
}

function BlueprintSphere({ args, position, rotation, isSolidAccent = false }) {
  return (
    <group position={position} rotation={rotation}>
      <Sphere args={args}>
        <meshBasicMaterial color={isSolidAccent ? cAccent : cFill} depthWrite={true} />
        <Edges color={cOutline} threshold={15} />
      </Sphere>
    </group>
  );
}

// --- Animated Vehicle Components ---

function Airplane({ position, height = 8 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x = ((state.clock.elapsedTime * 6) % 40) - 20;
    }
  });

  return (
    <group ref={ref} position={[position[0], height, position[2]]}>
      <BlueprintBox args={[3.5, 0.8, 0.8]} />
      <BlueprintBox args={[1.2, 0.1, 4.5]} position={[0.2, 0, 0]} />
      <BlueprintBox args={[0.8, 0.1, 1.8]} position={[-1.4, 0, 0]} />
      {/* Orange accent on tail */}
      <BlueprintBox args={[0.6, 1, 0.1]} position={[-1.4, 0.5, 0]} isSolidAccent />
    </group>
  );
}

function CargoShip({ position }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
      ref.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={ref} position={position}>
      <BlueprintBox args={[7, 1.5, 2.5]} position={[0, 0.75, 0]} />
      <BlueprintBox args={[1.5, 1.5, 2]} position={[-2, 2.25, 0]} />
      <BlueprintBox args={[0.8, 0.8, 0.8]} position={[-2, 3.2, 0]} isSolidAccent />
      <BlueprintBox args={[3.5, 1.5, 2.2]} position={[1, 2.25, 0]} />
    </group>
  );
}

function Truck({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      <BlueprintBox args={[3, 1.5, 1.2]} position={[0, 1, 0]} />
      <BlueprintBox args={[1, 1.2, 1.2]} position={[2, 0.85, 0]} />
      {[-1, 0.5, 1.8].map((x, i) => (
        <group key={i} position={[x, 0.25, 0]}>
          <BlueprintCylinder args={[0.25, 0.25, 1.3, 16]} rotation={[Math.PI / 2, 0, 0]} />
        </group>
      ))}
      <BlueprintBox args={[2.8, 0.1, 1.25]} position={[0, 1.2, 0]} isSolidAccent />
    </group>
  );
}

function MovingTruck({ position, rotation, speed = 4, offset = 0, pathLength = 30, direction = 1 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      let t = (state.clock.elapsedTime * speed) + offset;
      // Ensure positive modulo
      t = ((t % pathLength) + pathLength) % pathLength;
      ref.current.position.x = position[0] + (t - (pathLength / 2)) * direction;
    }
  });
  return (
    <group ref={ref} position={position} rotation={rotation}>
      <Truck position={[0, 0, 0]} />
    </group>
  );
}

function Forklift({ position, rotation = [0, 0, 0], delay = 0 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      const t = (state.clock.elapsedTime + delay) % 4;
      if (t < 2) {
        ref.current.position.z = position[2] + (t * 1.5);
      } else {
        ref.current.position.z = position[2] + ((4 - t) * 1.5);
      }
    }
  });

  return (
    <group ref={ref} position={position} rotation={rotation}>
      <BlueprintBox args={[1.2, 0.8, 1]} position={[0, 0.5, 0]} />
      <BlueprintBox args={[0.1, 1.5, 1.1]} position={[0.65, 0.8, 0]} />
      <BlueprintBox args={[0.8, 0.05, 0.8]} position={[1.1, 0.1, 0]} />
      <BlueprintBox args={[0.6, 0.6, 0.6]} position={[1.1, 0.45, 0]} isSolidAccent />
    </group>
  );
}

// --- Animated Factory Equipment ---

function RoboticArm({ position, speed = 1.5, offset = 0 }) {
  const armRef = useRef();

  useFrame((state) => {
    if (armRef.current) {
      armRef.current.rotation.y = Math.sin((state.clock.elapsedTime * speed) + offset) * 1.2;
    }
  });

  return (
    <group position={position}>
      <BlueprintCylinder args={[0.8, 1, 0.4, 16]} position={[0, 0.2, 0]} />
      <group ref={armRef} position={[0, 0.4, 0]}>
        {/* Arm Base Joint */}
        <BlueprintCylinder args={[0.5, 0.5, 1.2, 16]} position={[0, 0.5, 0]} isSolidAccent />
        {/* Main Arm */}
        <BlueprintCylinder args={[0.25, 0.25, 2, 16]} position={[0.7, 1.6, 0]} rotation={[0, 0, Math.PI / 4]} />
        {/* Top Joint */}
        <BlueprintSphere args={[0.4, 16, 16]} position={[1.4, 2.3, 0]} isSolidAccent />
        {/* Manipulator */}
        <BlueprintBox args={[0.4, 0.4, 0.4]} position={[1.4, 2.6, 0]} />
      </group>
    </group>
  );
}

function ConveyorBelt({ position, length = 8, speed = 2 }) {
  const itemsRef = useRef();
  const spacing = 1.8;
  const itemCount = Math.floor(length / spacing);

  useFrame((state) => {
    if (itemsRef.current) {
      itemsRef.current.position.x = (state.clock.elapsedTime * speed) % spacing;
    }
  });

  return (
    <group position={position}>
      {/* Structure */}
      <BlueprintBox args={[length, 0.4, 1.2]} position={[0, 0.2, 0]} />

      {/* Side Rails */}
      <BlueprintBox args={[length + 0.1, 0.2, 0.1]} position={[0, 0.5, 0.6]} isAccentLine />
      <BlueprintBox args={[length + 0.1, 0.2, 0.1]} position={[0, 0.5, -0.6]} isAccentLine />

      {/* Animated Packages */}
      <group position={[-length / 2, 0.5, 0]}>
        <group ref={itemsRef}>
          {Array.from({ length: itemCount + 1 }).map((_, i) => (
            <BlueprintBox
              key={i}
              args={[0.8, 0.8, 0.8]}
              position={[i * spacing, 0.4, 0]}
              isSolidAccent={i % 3 === 0}
            />
          ))}
        </group>
      </group>
    </group>
  );
}

function WarehouseShelves({ position }) {
  return (
    <group position={position}>
      <BlueprintBox args={[5, 4, 1.5]} position={[0, 2, 0]} />
      {/* Rack lines */}
      <BlueprintBox args={[5.1, 0.1, 1.6]} position={[0, 1.5, 0]} isAccentLine />
      <BlueprintBox args={[5.1, 0.1, 1.6]} position={[0, 3, 0]} isAccentLine />

      {/* Packages */}
      <BlueprintBox args={[1, 1, 1]} position={[-1.5, 2.05, 0]} />
      <BlueprintBox args={[1, 1, 1]} position={[0, 2.05, 0]} isSolidAccent />
      <BlueprintBox args={[1, 1, 1]} position={[1.5, 2.05, 0]} />
      <BlueprintBox args={[1, 1, 1]} position={[-1.5, 3.55, 0]} isSolidAccent />
      <BlueprintBox args={[1, 1, 1]} position={[1.5, 3.55, 0]} />
    </group>
  );
}

// --- Scene Assembly ---

function FullFactoryScene() {
  return (
    <group position={[0, -1, 0]}>
      {/* Sky & Ocean */}
      <Airplane position={[0, 0, -4]} height={12} />

      {/* Module 1: Global Logistics */}
      <group position={[-8, 0, 4]}>
        <CargoShip position={[-2, 0, -6]} />
        {/* Ocean platform */}
        <BlueprintBox args={[10, 0.1, 10]} position={[0, -0.05, -6]} />

        {/* Road */}
        <BlueprintBox args={[12, 0.05, 3]} position={[0, 0, 2]} />
        {/* Dashed line */}
        {Array.from({ length: 6 }).map((_, i) => (
          <BlueprintBox key={`dash-${i}`} args={[1, 0.1, 0.2]} position={[-5 + i * 2, 0.02, 2]} isSolidAccent />
        ))}

        <MovingTruck position={[0, 0, 1]} rotation={[0, 0, 0]} offset={0} direction={1} />
        <MovingTruck position={[0, 0, 3]} rotation={[0, Math.PI, 0]} offset={10} speed={5} direction={-1} />
      </group>

      {/* Module 2: Predictive Warehouse */}
      <group position={[0, 0, -2]}>
        <WarehouseShelves position={[-2, 0, -2]} />
        <WarehouseShelves position={[4, 0, -2]} />
        <Forklift position={[-1, 0, 0]} rotation={[0, Math.PI / 2, 0]} delay={0} />
        <Forklift position={[3, 0, 0]} rotation={[0, -Math.PI / 2, 0]} delay={1.5} />
      </group>

      {/* Module 3: Autonomous Factory */}
      <group position={[10, 0, 2]}>
        <ConveyorBelt position={[0, 0, -2]} length={10} />
        <ConveyorBelt position={[0, 0, 2]} length={10} speed={3} />
        <RoboticArm position={[-2, 0, 0]} speed={2} />
        <RoboticArm position={[2, 0, 0]} speed={1.5} offset={2} />
      </group>

      {/* Connective Paths */}
      <BlueprintBox args={[24, 0.02, 1.5]} position={[0, 0.01, 0]} />
      <BlueprintBox args={[1, 0.03, 10]} position={[5, 0.02, -1]} isAccentLine />
    </group>
  );
}

function SmoothCamera({ activeStep }) {
  const { camera, controls } = useThree();

  useFrame((state) => {
    if (!controls) return;

    let targetX = 0, targetY = 0, targetZ = 0;
    // Standard isometric camera angle
    let camX = 14, camY = 14, camZ = 14;

    if (activeStep === 0) {
      targetX = -8; targetY = 0; targetZ = 4;
      camX = -6; camY = 12; camZ = 18;
    } else if (activeStep === 1) {
      targetX = 1; targetY = 2; targetZ = -2;
      camX = 8; camY = 12; camZ = 12;
    } else if (activeStep === 2) {
      targetX = 10; targetY = 0; targetZ = 2;
      camX = 18; camY = 14; camZ = 16;
    }

    controls.target.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.04);
    camera.position.lerp(new THREE.Vector3(camX, camY, camZ), 0.03);
    controls.update();
  });

  return null;
}

export default function SupplyChain3D({ activeStep = 0 }) {
  return (
    <div className="w-full h-full absolute inset-0" style={{ backgroundColor: cBg }}>
      {/* Viewport UI overlays */}
      <div className="absolute top-6 left-6 z-20 flex gap-2">
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: cAccent }}></div>
        <div className="w-2 h-2 border" style={{ borderColor: cOutline }}></div>
        <div className="w-2 h-2 border" style={{ borderColor: cOutline }}></div>
      </div>
      <div className="absolute bottom-6 right-6 z-20 text-[10px] font-mono uppercase tracking-[0.3em]" style={{ color: cOutline }}>
        Isometric Operations View
      </div>

      <Canvas dpr={[1, 2]} orthographic camera={{ position: [14, 14, 14], zoom: 40 }}>
        <FullFactoryScene />
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

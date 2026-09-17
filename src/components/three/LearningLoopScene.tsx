"use client";

import { Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Group } from "three";

const cyan = "#087e64";
const orange = "#cf5c26";
const blue = "#347fc4";
const violet = "#7056be";
const lime = "#658b1e";

const nodes: [number, number, number, string][] = [
  [-2.6, 0.9, 0, cyan],
  [-0.9, -0.65, 0, orange],
  [0.9, 0.65, 0, blue],
  [2.55, -0.25, 0, violet],
];

function LoopDiagram() {
  const group = useRef<Group>(null);
  const sparks = useMemo(
    () => Array.from({ length: 22 }, (_, i) => ({ x: -2.8 + (i % 11) * 0.55, y: -1.35 + Math.floor(i / 11) * 2.55, z: -0.5 + (i % 3) * 0.12 })),
    [],
  );
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.22) * 0.11;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.06;
  });
  return (
    <group ref={group} position={[1.2, 0, 0]}>
      <Line points={nodes.map(([x, y, z]) => [x, y, z])} color={cyan} lineWidth={2.4} transparent opacity={0.78} />
      <Line points={[[2.55, -0.25, 0], [-2.6, 0.9, 0]]} color={lime} lineWidth={1.7} transparent opacity={0.5} />
      {nodes.map(([x, y, z, color], i) => (
        <mesh key={`${color}-${i}`} position={[x, y, z]}>
          <sphereGeometry args={[0.14, 24, 24]} />
          <meshBasicMaterial color={color} transparent opacity={0.94} />
        </mesh>
      ))}
      {sparks.map((spark, i) => (
        <mesh key={i} position={[spark.x, spark.y, spark.z]}>
          <boxGeometry args={[0.035, 0.035, 0.035]} />
          <meshBasicMaterial color={i % 2 ? blue : violet} transparent opacity={0.42} />
        </mesh>
      ))}
      <mesh position={[-0.95, 0.12, -0.05]} rotation={[0, 0, -0.72]}>
        <coneGeometry args={[0.08, 0.25, 24]} />
        <meshBasicMaterial color={orange} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

export default function LearningLoopScene() {
  return (
    <Canvas aria-hidden dpr={[1, 1.8]} camera={{ position: [0, 0, 5.4], fov: 44 }} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
      <fog attach="fog" args={["#f4f5f0", 5, 11]} />
      <ambientLight intensity={1} />
      <LoopDiagram />
    </Canvas>
  );
}

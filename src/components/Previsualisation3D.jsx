import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Edges } from '@react-three/drei';

function Caisson3D({ width, height, depth }) {
  return (
    <>

      {/* Bord gauche */}
      <mesh position={[depth / 2, height / 2 + depth, depth / 2]}>
        <boxGeometry args={[depth, height, depth]} />
        <meshStandardMaterial color="#90caf9" />
        <Edges color="black" />
      </mesh>

      {/* Bord droit */}
      <mesh position={[width + 1.5 * depth, height / 2 + depth, depth / 2]}>
        <boxGeometry args={[depth, height, depth]} />
        <meshStandardMaterial color="#90caf9" />
        <Edges color="black" />
      </mesh>

      {/* Bord haut */}
      <mesh position={[width / 2 + depth, depth / 2, depth / 2]}>
        <boxGeometry args={[width, depth, depth]} />
        <meshStandardMaterial color="#90caf9" />
        <Edges color="black" />
      </mesh>

      {/* Bord bas */}
      <mesh position={[width / 2 + depth, height + 1.5 * depth, depth / 2]}>
        <boxGeometry args={[width, depth, depth]} />
        <meshStandardMaterial color="#90caf9" />
        <Edges color="black" />
      </mesh>
      
      {/* Face centrale */}
      <mesh position={[width / 2 + depth, height / 2 + depth, 0]}>
        <boxGeometry args={[width, height, 0.1]} />
        <meshStandardMaterial color="#1565c0" />
        <Edges color="black" />
      </mesh>
    </>
  );
}

export default function Previsualisation3D({ width, height, depth }) {
  return (
    <Canvas camera={{ position: [width, height, Math.max(width, height) * 2], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <Caisson3D width={width} height={height} depth={depth} />
      <OrbitControls />
    </Canvas>
  );
}

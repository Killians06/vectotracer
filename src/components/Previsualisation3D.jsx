import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Edges } from '@react-three/drei';

function CaissonSimplifie({ width, height, depth }) {
  // épaisseur très fine de la face (ex: 0.1)
  const faceThickness = 3;

  return (
    <>
      {/* Face centrale décalée vers l'arrière */}
      <mesh position={[width / 2, height / 2, -faceThickness / 2]}>
        <boxGeometry args={[width, height, faceThickness]} />
        <meshStandardMaterial color="#1565c0" />
        <Edges color="black" />
      </mesh>

      {/* Retour gauche */}
      <mesh position={[0, height / 2, depth / 2]}>
        <boxGeometry args={[faceThickness, height, depth]} />
        <meshStandardMaterial color="#90caf9" />
        <Edges color="black" />
      </mesh>

      {/* Retour droit */}
      <mesh position={[width, height / 2, depth / 2]}>
        <boxGeometry args={[faceThickness, height, depth]} />
        <meshStandardMaterial color="#90caf9" />
        <Edges color="black" />
      </mesh>

      {/* Retour haut */}
      <mesh position={[width / 2, height, depth / 2]}>
        <boxGeometry args={[width, faceThickness, depth]} />
        <meshStandardMaterial color="#90caf9" />
        <Edges color="black" />
      </mesh>

      {/* Retour bas */}
      <mesh position={[width / 2, 0, depth / 2]}>
        <boxGeometry args={[width, faceThickness, depth]} />
        <meshStandardMaterial color="#90caf9" />
        <Edges color="black" />
      </mesh>
    </>
  );
}

export default function Previsualisation3DSimplifiee({ width = 100, height = 50, depth = 3 }) {
  return (
    <Canvas
    camera={{
      position: [width * 1.5, height * 1.5, Math.max(width, height) * 2],
      fov: 50,
      near: 0.1,   // tu peux essayer 0.01 aussi
      far: 5000,   // augmente la valeur pour englober toute ta scène
       }}
      style={{ height: 400 }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <CaissonSimplifie width={width} height={height} depth={depth} />
      <OrbitControls
        minDistance={10}
        maxDistance={1000}
      />
    </Canvas>
  );
}

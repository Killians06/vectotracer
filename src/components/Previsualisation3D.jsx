import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Edges } from '@react-three/drei';
import { a, useSpring } from '@react-spring/three';
import * as THREE from 'three';

function CaissonSimplifie({ width, height, depth }) {
  const faceThickness = 3;

  // État pour contrôler si le caisson est plié ou non
  const [isFolded, setIsFolded] = useState(false);

  // Animation des rotations et positions des côtés
  const { leftRotation, rightRotation, topRotation, bottomRotation, leftPosition, rightPosition, topPosition, bottomPosition } = useSpring({
    leftRotation: isFolded ? [0, -Math.PI / 2, 0] : [0, 0, 0],
    rightRotation: isFolded ? [0, -Math.PI / 2, 0] : [0, -Math.PI / 1, 0],
    topRotation: isFolded ? [-Math.PI / 2, 0, 0] : [0, 0, 0], // Rotation inversée
    bottomRotation: isFolded ? [-Math.PI / 2 , 0, 0] : [-Math.PI / 1, 0, 0], // Rotation inversée
    leftPosition: isFolded
      ? [0, 0, 0]
      : [0, 0, -faceThickness],
    rightPosition: isFolded
      ? [width + faceThickness, 0, 0]
      : [width, 0, 0],
    topPosition: isFolded
      ? [0, height - faceThickness / 2, 0]
      : [0, height, -faceThickness],
    bottomPosition: isFolded
      ? [0, 0, 0]
      : [0, 0, -faceThickness / 2],
    config: { tension: 200, friction: 20 },
  });

  return (
    <>
      {/* Face centrale */}
      <mesh position={[width / 2, height / 2, -faceThickness / 2]}>
        <boxGeometry args={[width, height, faceThickness]} />
        <meshStandardMaterial color="#1565c0" />
        <Edges color="black" />
      </mesh>

      {/* Retour gauche */}
      <a.group
        position={leftPosition} // Utilisation de la position animée
        rotation={leftRotation} // Utilisation de la rotation animée
        onClick={() => setIsFolded(!isFolded)}
      >
        <a.mesh>
          <extrudeGeometry
            args={[
              (() => {
                const shape = new THREE.Shape();

                // Définir les points du trapèze
                shape.moveTo(0, 0); // Bas-gauche
                shape.lineTo(-depth, depth); // Bas-droite
                shape.lineTo(-depth, height - depth); // Haut-droite
                shape.lineTo(0, height); // Haut-gauche
                shape.lineTo(0, 0); // Retour au point de départ

                return shape;
              })(),
              { depth: faceThickness, bevelEnabled: false }, // Extrusion sur l'épaisseur
            ]}
          />
          <meshStandardMaterial color="#90caf9" />
          <Edges color="black" />
        </a.mesh>
      </a.group>

      {/* Retour droit */}
      <a.group
        position={rightPosition} // Utilisation de la position animée
        rotation={rightRotation} // Utilisation de la rotation animée
        onClick={() => setIsFolded(!isFolded)}
      >
        <a.mesh>
          <extrudeGeometry
            args={[
              (() => {
                const shape = new THREE.Shape();

                // Définir les points du trapèze
                shape.moveTo(0, 0); // Bas-gauche
                shape.lineTo(-depth, depth); // Bas-droite
                shape.lineTo(-depth, height - depth); // Haut-droite
                shape.lineTo(0, height); // Haut-gauche
                shape.lineTo(0, 0); // Retour au point de départ

                return shape;
              })(),
              { depth: faceThickness, bevelEnabled: false }, // Extrusion sur l'épaisseur
            ]}
          />
          <meshStandardMaterial color="#90caf9" />
          <Edges color="black" />
        </a.mesh>
      </a.group>

      {/* Retour haut */}
      <a.group position={topPosition} rotation={topRotation} onClick={() => setIsFolded(!isFolded)}>
        {/* Triangle gauche */}
        <a.group
          position={[0, 0, 0]} // Position initiale du triangle gauche
          rotation={isFolded ? [0, -Math.PI / 2, 0] : [0, 0, 0]} // Rotation conditionnelle
        >
          <a.mesh>
            <extrudeGeometry
              args={[
                (() => {
                  const shape = new THREE.Shape();
                  shape.moveTo(0, 0); // Bas-gauche
                  shape.lineTo(-depth, depth); // Haut-gauche
                  shape.lineTo(0, depth); // Haut-droite
                  shape.lineTo(0, 0); // Retour au point de départ
                  return shape;
                })(),
                { depth: faceThickness, bevelEnabled: false },
              ]}
            />
            <meshStandardMaterial color="#90caf9" />
            <Edges color="black" />
          </a.mesh>
        </a.group>

        {/* Rectangle central */}
        <a.mesh rotation={isFolded ? [0, 0, 0] : [0, 0, 0]}>
          <extrudeGeometry
            args={[
              (() => {
                const shape = new THREE.Shape();
                shape.moveTo(0, 0); // Bas-gauche
                shape.lineTo(0, depth); // Haut-gauche
                shape.lineTo(width, depth); // Haut-droite
                shape.lineTo(width, 0); // Bas-droite
                shape.lineTo(0, 0); // Retour au point de départ
                return shape;
              })(),
              { depth: faceThickness, bevelEnabled: false },
            ]}
          />
          <meshStandardMaterial color="#90caf9" />
          <Edges color="black" />
        </a.mesh>

        {/* Triangle droit */}
        <a.group
          position={[width, 0, 0]} // Position initiale du triangle droit
          rotation={isFolded ? [0, Math.PI / 2, 0] : [0, 0, 0]} // Rotation conditionnelle
        >
          <a.mesh>
            <extrudeGeometry
              args={[
                (() => {
                  const shape = new THREE.Shape();
                  shape.moveTo(0, 0); // Bas-gauche
                  shape.lineTo(depth, depth); // Haut-gauche
                  shape.lineTo(0, depth); // Haut-droite
                  shape.lineTo(0, 0); // Retour au point de départ
                  return shape;
                })(),
                { depth: faceThickness, bevelEnabled: false },
              ]}
            />
            <meshStandardMaterial color="#90caf9" />
            <Edges color="black" />
          </a.mesh>
        </a.group>
      </a.group>

      {/* Retour bas */}
      <a.group position={bottomPosition} rotation={bottomRotation} onClick={() => setIsFolded(!isFolded)}>
        {/* Triangle gauche */}
        <a.group
          position={[-faceThickness, 0, 0]} // Position initiale du triangle gauche
          rotation={isFolded ? [0, Math.PI / 2, 0] : [0, 0, 0]} // Rotation conditionnelle
        >
          <a.mesh>
            <extrudeGeometry
              args={[
                (() => {
                  const shape = new THREE.Shape();
                  shape.moveTo(0, 0); // Bas-gauche
                  shape.lineTo(-depth, depth); // Haut-gauche
                  shape.lineTo(0, depth); // Haut-droite
                  shape.lineTo(0, 0); // Retour au point de départ
                  return shape;
                })(),
                { depth: faceThickness, bevelEnabled: false },
              ]}
            />
            <meshStandardMaterial color="#90caf9" />
            <Edges color="black" />
          </a.mesh>
        </a.group>

        {/* Rectangle central */}
        <a.mesh rotation={isFolded ? [0, 0, 0] : [0, 0, 0]}>
          <extrudeGeometry
            args={[
              (() => {
                const shape = new THREE.Shape();
                shape.moveTo(0, 0); // Bas-gauche
                shape.lineTo(0, depth); // Haut-gauche
                shape.lineTo(width, depth); // Haut-droite
                shape.lineTo(width, 0); // Bas-droite
                shape.lineTo(0, 0); // Retour au point de départ
                return shape;
              })(),
              { depth: faceThickness, bevelEnabled: false },
            ]}
          />
          <meshStandardMaterial color="#90caf9" />
          <Edges color="black" />
        </a.mesh>

        {/* Triangle droit */}
        <a.group
          position={[width+faceThickness, 0, 0]} // Position initiale du triangle droit
          rotation={isFolded ? [0, -Math.PI / 2, 0] : [0, 0, 0]} // Rotation conditionnelle
        >
          <a.mesh>
            <extrudeGeometry
              args={[
                (() => {
                  const shape = new THREE.Shape();
                  shape.moveTo(0, 0); // Bas-gauche
                  shape.lineTo(depth, depth); // Haut-gauche
                  shape.lineTo(0, depth); // Haut-droite
                  shape.lineTo(0, 0); // Retour au point de départ
                  return shape;
                })(),
                { depth: faceThickness, bevelEnabled: false },
              ]}
            />
            <meshStandardMaterial color="#90caf9" />
            <Edges color="black" />
          </a.mesh>
        </a.group>
      </a.group>
    </>
  );
}

export default function Previsualisation3DSimplifiee({ width = 400, height = 600, depth = 4 }) {
  return (
    <Canvas
      camera={{
        position: [width * 1.5, height * 1.5, Math.max(width, height) * 3],
        fov: 50,
        near: 0.1,
        far: 5000,
      }}
      style={{ height: "100%" }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <CaissonSimplifie width={width} height={height} depth={depth} />
      <OrbitControls minDistance={1} maxDistance={5000} />
    </Canvas>
  );
}

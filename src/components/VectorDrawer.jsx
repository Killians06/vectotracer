import React from 'react';

export default function VectorDrawer({ width, height, depth, svgRef }) {
  // Pli gauche (vertical)
  const pliGauchePoints = [
    [0, depth + depth],
    [depth, depth],
    [depth, depth + height],
    [0, depth + height - depth],
  ]
    .map((p) => p.join(','))
    .join(' ');

  // Pli droit (vertical)
  const pliDroitPoints = [
    [depth + width, depth],
    [depth + width + depth - depth, depth],
    [depth + width + depth, depth + depth],
    [depth + width + depth, depth + height - depth],
    [depth + width + depth - depth, depth + height],
    [depth + width, depth + height],
  ]
    .map((p) => p.join(','))
    .join(' ');

  // Pli haut (horizontal)
  const pliHautPoints = [
    [0, 0],
    [depth + depth, 0],
    [depth + width - depth, 0],
    [depth + width + depth, 0],
    [depth + width, depth],
    [depth, depth],
  ]
    .map((p) => p.join(','))
    .join(' ');

  // Pli bas (horizontal)
  const pliBasPoints = [
    [depth, depth + height],
    [depth + width, depth + height],
    [depth + depth + width, depth + height + depth],
    [depth + width - depth, depth + height + depth],
    [depth + depth, depth + height + depth],
    [0, depth + height + depth],
  ]
    .map((p) => p.join(','))
    .join(' ');

  // Calcul taille SVG totale (avec marges pour plis)
  const svgWidth = width + 2 * depth + 40;
  const svgHeight = height + 2 * depth + 40;

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="400"
      viewBox={`-20 -20 ${width + 2 * depth + 40} ${height + 2 * depth + 40}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ backgroundColor: '#f0f0f0' }}
    >
      {/* Pli gauche */}
      <polygon points={pliGauchePoints} fill="#90caf9" stroke="black" strokeWidth={1} />
      {/* Ligne verticale pli gauche */}
      <line
        x1={depth}
        y1={depth}
        x2={depth}
        y2={depth + height}
        stroke="black"
        strokeWidth={1}
        strokeDasharray="4 2"
      />

      {/* Pli droit */}
      <polygon points={pliDroitPoints} fill="#90caf9" stroke="black" strokeWidth={1} />
      {/* Ligne verticale pli droit */}
      <line
        x1={depth + width}
        y1={depth}
        x2={depth + width}
        y2={depth + height}
        stroke="black"
        strokeWidth={1}
        strokeDasharray="4 2"
      />

      {/* Pli haut */}
      <polygon points={pliHautPoints} fill="#90caf9" stroke="black" strokeWidth={1} />

      {/* Pli bas */}
      <polygon points={pliBasPoints} fill="#90caf9" stroke="black" strokeWidth={1} />

      {/* Fond face centrale */}
      <rect
        x={depth}
        y={depth}
        width={width}
        height={height}
        fill="#cce5ff" // couleur douce de fond
      />

      {/* Face centrale décomposée en 4 lignes */}
      <line
        x1={depth}
        y1={depth}
        x2={depth + width}
        y2={depth}
        stroke="black"
        strokeWidth={1}
      />
      <line
        x1={depth}
        y1={depth + height}
        x2={depth + width}
        y2={depth + height}
        stroke="black"
        strokeWidth={1}
      />
      <line
        x1={depth}
        y1={depth * 0}
        x2={depth}
        y2={depth * 2 + height}
        stroke="black"
        strokeWidth={1}
      />
      <line
        x1={depth + width}
        y1={depth * 0}
        x2={depth + width}
        y2={depth * 2 + height}
        stroke="black"
        strokeWidth={1}
      />
    </svg>
  );
}
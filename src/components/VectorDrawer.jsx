import React from 'react';

export default function VectorDrawer({ width, height, depth, svgRef }) {
  // Rayon des trous (3mm de diamètre)
  const holeRadius = 1.5;

  // Points pour le tracé externe unique
  const externalPath = [
    // Pli haut
    `M 0,0`,
    `L ${depth+width+depth},0`,
    `L ${depth+width},${depth}`,
    `L ${depth+width+depth},${depth*2}`,
    `L ${depth+width+depth},${height}`,
    `L ${depth+width},${height+depth}`,
    `L ${depth*2+width},${depth*2+height}`,
    `L 0,${depth*2+height}`,
    `L ${depth},${depth+height}`,
    `L 0,${height}`,
    `L 0,${depth*2}`,
    `L ${depth},${depth}`,
    `L 0,0`,
    // Retour au point de départ
    `Z`,
  ].join(' ');

  // Positions des trous
  const holes = [
    // Pli haut - coins extérieurs
    { cx: depth * 0.5, cy: depth * 0.5 / 2 },
    { cx: depth + width + depth * 0.5, cy: depth * 0.5 / 2 },

    // Pli bas - coins extérieurs
    { cx: depth * 0.5, cy: depth * 2 + height - depth * 0.5 / 2 },
    { cx: depth + width + depth * 0.5, cy: depth * 2 + height - depth * 0.5 / 2 },

    // Pli gauche - trous alignés en haut et bas
    { cx: depth * 0.5 / 2, cy: depth * 2 + depth * 0.5 / 2 },
    { cx: depth * 0.5 / 2, cy: height - depth * 0.5 / 2 },

    // Pli droit - trous alignés en haut et bas
    { cx: depth * 2 + width - depth * 0.5 / 2, cy: depth * 2 + depth * 0.5 / 2 },
    { cx: depth * 2 + width - depth * 0.5 / 2, cy: height - depth * 0.5 / 2 },
  ];

  // Calcul taille SVG totale (avec marges pour plis)
  const svgWidth = width + 2 * depth + 40;
  const svgHeight = height + 2 * depth + 40;

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="400"
      viewBox={`-20 -20 ${svgWidth} ${svgHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ backgroundColor: '#f0f0f0' }}
    >
      {/* Tracé externe unique */}
      <path d={externalPath} fill="#90caf9" stroke="black" strokeWidth={1} />

      {/* Fond face centrale */}
      <rect
        x={depth}
        y={depth}
        width={width}
        height={height}
        fill="#cce5ff"
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

      {/* Perçages */}
      {holes.map(({ cx, cy }, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={holeRadius}
          fill="none"
          stroke="red"
          strokeWidth={1}
        />
      ))}
    </svg>
  );
}

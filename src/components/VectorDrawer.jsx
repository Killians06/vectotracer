import React from 'react';

export default function VectorDrawer({ width, height, depth, svgRef }) {
  // Rayon des trous (3mm de diamètre)
  const holeRadius = 1.5;

  // Points pour le tracé externe unique
  const externalPath = [
    // Pli haut
    `M 0,0`,
    `L ${depth + width + depth},0`,
    `L ${depth + width},${depth}`,
    `L ${depth + width + depth},${depth * 2}`,
    `L ${depth + width + depth},${height}`,
    `L ${depth + width},${height + depth}`,
    `L ${depth * 2 + width},${depth * 2 + height}`,
    `L 0,${depth * 2 + height}`,
    `L ${depth},${depth + height}`,
    `L 0,${height}`,
    `L 0,${depth * 2}`,
    `L ${depth},${depth}`,
    `L 0,0`,
    // Retour au point de départ
    `Z`,
  ].join(' ');

  const paths = [
    {
      d: externalPath,
      spotcolor: true, // ou false selon le besoin
    },
  ];

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
  const svgWidth = width + 2 * depth;
  const svgHeight = height + 2 * depth;
  const spotcolor = true; // ou false

  return (
    <svg
      ref={svgRef}
      width={svgWidth}
      height={svgHeight}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ backgroundColor: '#f0f0f0' }}
    >
      {/* Tracé externe unique */}
      {paths.map((path, index) => (
        <path
          key={index}
          d={path.d}
          fill="#90caf9"
          stroke={path.spotcolor ? 'red' : 'black'} // Juste pour affichage à l'écran
          data-spotcolor={path.spotcolor ? 'true' : 'false'} // <-- Ici l'attribut data-spotcolor
        />
      ))}

      {/* Fond face centrale */}
    <rect
      x={depth}
      y={depth}
      width={width}
      height={height}
      fill="#cce5ff"
      stroke={spotcolor ? 'red' : 'black'}
      strokeWidth={1}
      data-spotcolor={spotcolor ? 'true' : 'false'}
    />

    {/* Face centrale décomposée en 4 lignes */}
    <line
      x1={depth}
      y1={depth}
      x2={depth + width}
      y2={depth}
      stroke={spotcolor ? 'red' : 'black'}
      strokeWidth={1}
      data-spotcolor={spotcolor ? 'true' : 'false'}
    />
    <line
      x1={depth}
      y1={depth + height}
      x2={depth + width}
      y2={depth + height}
      stroke={spotcolor ? 'red' : 'black'}
      strokeWidth={1}
      data-spotcolor={spotcolor ? 'true' : 'false'}
    />
    <line
      x1={depth}
      y1={depth * 0}
      x2={depth}
      y2={depth * 2 + height}
      stroke={spotcolor ? 'red' : 'black'}
      strokeWidth={1}
      data-spotcolor={spotcolor ? 'true' : 'false'}
    />
    <line
      x1={depth + width}
      y1={depth * 0}
      x2={depth + width}
      y2={depth * 2 + height}
      stroke={spotcolor ? 'red' : 'black'}
      strokeWidth={1}
      data-spotcolor={spotcolor ? 'true' : 'false'}
    />

    {/* Perçages */}
    {holes.map(({ cx, cy }, i) => (
      <circle
        key={i}
        cx={cx}
        cy={cy}
        r={holeRadius}
        fill="none"
        stroke={spotcolor ? 'red' : 'black'}
        strokeWidth={1}
        data-spotcolor={spotcolor ? 'true' : 'false'}
      />
    ))}
  </svg>
  );
}

import React, { useEffect, useRef } from 'react';

export default function VectorDrawer({ width, height, depth, svgRef }) {
  const containerRef = useRef(null);
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
      spotcolor: true,
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

  useEffect(() => {
    if (containerRef.current && svgRef.current) {
      const container = containerRef.current;
      const svg = svgRef.current;

      // Ajout d'une marge de 5% autour du dessin
      const margin = 0.05;
      const viewBoxWidth = svgWidth * (1 + 2 * margin);
      const viewBoxHeight = svgHeight * (1 + 2 * margin);
      const offsetX = -svgWidth * margin;
      const offsetY = -svgHeight * margin;

      svg.setAttribute('viewBox', `${offsetX} ${offsetY} ${viewBoxWidth} ${viewBoxHeight}`);
    }
  }, [width, height, depth, svgWidth, svgHeight]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        ref={svgRef}
        width={svgWidth}
        height={svgHeight}
        style={{ 
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain'
        }}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Tracé externe unique */}
        {paths.map((path, index) => (
          <path
            key={index}
            d={path.d}
            fill="#90caf9"
            stroke={path.spotcolor ? 'red' : 'black'}
            data-spotcolor={path.spotcolor ? 'true' : 'false'}
          />
        ))}

        {/* Fond face centrale */}
        <rect
          x={depth}
          y={depth}
          width={width}
          height={height}
          fill="#cce5ff"
          stroke={true ? 'red' : 'black'}
          strokeWidth={1}
          data-spotcolor="true"
        />

        {/* Face centrale décomposée en 4 lignes */}
        <line
          x1={depth}
          y1={depth}
          x2={depth + width}
          y2={depth}
          stroke={true ? 'red' : 'black'}
          strokeWidth={1}
          data-spotcolor="true"
        />
        <line
          x1={depth}
          y1={depth + height}
          x2={depth + width}
          y2={depth + height}
          stroke={true ? 'red' : 'black'}
          strokeWidth={1}
          data-spotcolor="true"
        />
        <line
          x1={depth}
          y1={depth * 0}
          x2={depth}
          y2={depth * 2 + height}
          stroke={true ? 'red' : 'black'}
          strokeWidth={1}
          data-spotcolor="true"
        />
        <line
          x1={depth + width}
          y1={depth * 0}
          x2={depth + width}
          y2={depth * 2 + height}
          stroke={true ? 'red' : 'black'}
          strokeWidth={1}
          data-spotcolor="true"
        />

        {/* Perçages */}
        {holes.map(({ cx, cy }, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={holeRadius}
            fill="none"
            stroke={true ? 'red' : 'black'}
            strokeWidth={1}
            data-spotcolor="true"
          />
        ))}
      </svg>
    </div>
  );
}

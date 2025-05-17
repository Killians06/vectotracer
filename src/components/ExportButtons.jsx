import { useState } from 'react';
import { exportSVG, exportDXF, exportViaBackend } from '../utils/exportUtils';

export default function ExportButtons({ svgRef, dims }) {

  const [filename, setFilename] = useState('');

  const handleExportPDF = async () => {
    if (!svgRef.current) {
      console.error('svgRef non défini');
      return;
    }

    try {
      const svgElement = svgRef.current;
      const totalWidth =
        parseFloat(svgElement.getAttribute('width')) ||
        svgElement.clientWidth ||
        800;
      const totalHeight =
        parseFloat(svgElement.getAttribute('height')) ||
        svgElement.clientHeight ||
        600;

      // Récupération des éléments SVG concernés
      const pathElements = Array.from(svgElement.querySelectorAll('path'));
      const rectElements = Array.from(svgElement.querySelectorAll('rect'));
      const lineElements = Array.from(svgElement.querySelectorAll('line'));
      const circleElements = Array.from(svgElement.querySelectorAll('circle'));

      // Création d’un tableau homogène avec tous les éléments
      const paths = pathElements.map(path => ({
        type: 'path',
        d: path.getAttribute('d'),
        spotcolor: path.getAttribute('data-spotcolor') === 'true',
      }));

      const rects = rectElements.map(rect => ({
        type: 'rect',
        x: parseFloat(rect.getAttribute('x')),
        y: parseFloat(rect.getAttribute('y')),
        width: parseFloat(rect.getAttribute('width')),
        height: parseFloat(rect.getAttribute('height')),
        fill: rect.getAttribute('fill'),
        spotcolor: rect.getAttribute('data-spotcolor') === 'true',
      }));

      const lines = lineElements.map(line => ({
        type: 'line',
        x1: parseFloat(line.getAttribute('x1')),
        y1: parseFloat(line.getAttribute('y1')),
        x2: parseFloat(line.getAttribute('x2')),
        y2: parseFloat(line.getAttribute('y2')),
        stroke: line.getAttribute('stroke'),
        spotcolor: line.getAttribute('data-spotcolor') === 'true',
      }));

      const circles = circleElements.map(circle => ({
        type: 'circle',
        cx: parseFloat(circle.getAttribute('cx')),
        cy: parseFloat(circle.getAttribute('cy')),
        r: parseFloat(circle.getAttribute('r')),
        stroke: circle.getAttribute('stroke'),
        fill: circle.getAttribute('fill'),
        spotcolor: circle.getAttribute('data-spotcolor') === 'true',
      }));

      const allElements = [...paths, ...rects, ...lines, ...circles];

      await exportViaBackend(totalWidth, totalHeight, allElements, filename);
      console.log('Export PDF réussi');
    } catch (error) {
      console.error('Erreur lors de l’export PDF:', error);
    }
  };

  return (
    <div className="mt-4 flex gap-2">
      <input
        type="text"
        value={filename}
        onChange={e => setFilename(e.target.value)}
        placeholder="Nom du fichier PDF"
        className="border rounded px-2 py-1 w-64"
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        onClick={() => exportSVG(svgRef.current)}
      >
        Exporter en SVG
      </button>
      <button
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        onClick={() => exportDXF(dims.width, dims.height, dims.depth)}
      >
        Exporter en DXF
      </button>
      <button
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        onClick={handleExportPDF}
      >
        Télécharger PDF Spot Color Router
      </button>
    </div>
  );
}

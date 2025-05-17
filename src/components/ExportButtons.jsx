import { exportSVG, exportDXF } from '../utils/exportUtils';

export default function ExportButtons({ svgRef, dims }) {
  return (
    <div className="mt-4 flex gap-2">
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
    </div>
  );
}
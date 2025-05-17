import { useRef, useState } from 'react';
import VectorDrawer from './components/VectorDrawer';
import ExportButtons from './components/ExportButtons';
import Formulaire from './components/FormulaireDimensions';
import Previsualisation3D from './components/Previsualisation3D';

function App() {
  const [dims, setDims] = useState({ width: 400, height: 300, depth: 30 });
  const svgRef = useRef(null);

  const updateDims = (key, value) => {
    setDims((prev) => ({ ...prev, [key]: Number(value) }));
  };

  return (
    <div className="p-4 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h1 className="text-2xl font-bold mb-4">Générateur de tracé Dibond</h1>

        <Formulaire dims={dims} onChange={updateDims} />

        <div className="border mt-4 p-4 bg-white rounded shadow">
          <VectorDrawer {...dims} svgRef={svgRef} />
        </div>

        <ExportButtons svgRef={svgRef} dims={dims} />
      </div>

      <div className="border p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Prévisualisation 3D</h2>
        <div style={{ width: '100%', height: 400 }}>
          <Previsualisation3D width={dims.width} height={dims.height} depth={dims.depth} />
        </div>
      </div>
    </div>
  );
}

export default App;
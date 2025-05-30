import { useRef, useState } from 'react';
import VectorDrawer from './components/VectorDrawer';
import ExportButtons from './components/ExportButtons';
import Formulaire from './components/FormulaireDimensions';
import Previsualisation3D from './components/Previsualisation3D';

function App() {
  const [dims, setDims] = useState({ width: 400, height: 300, depth: 40 });
  const [paths, setPaths] = useState([]);
  const svgRef = useRef(null);

  const updateDims = (key, value) => {
    setDims((prev) => ({ ...prev, [key]: Number(value) }));
  };

  return (
    <div className="app-container">
      {/* Panneau de gauche - Vue 2D et formulaire */}
      <div className="left-panel">
        <div className="panel-content">
          <div className="card form-card">
            <h1 className="text-2xl font-bold mb-4">Générateur de tracé Dibond</h1>
            <div>
              <h2 className="text-xl font-bold mb-4">Dimensions</h2>
              <Formulaire dims={dims} onChange={updateDims} />
            </div>
          </div>

          <div className="scroll-container">
            <div className="card drawing-card">
              <h2 className="text-xl font-bold mb-4">Zone de dessin</h2>
              <div className="drawing-area">
                <VectorDrawer {...dims} svgRef={svgRef} onPathsReady={setPaths} />
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-4">Options d'export</h2>
            <ExportButtons svgRef={svgRef} dims={dims} paths={paths} />
          </div>
        </div>
      </div>

      {/* Panneau de droite - Vue 3D */}
      <div className="right-panel">
        <div className="panel-content">
          <h2 className="text-xl font-bold mb-4">Prévisualisation 3D</h2>
          <div className="preview-3d">
            <Previsualisation3D 
              width={dims.width} 
              height={dims.height} 
              depth={dims.depth} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

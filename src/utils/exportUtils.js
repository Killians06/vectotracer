
/**
 * Exporte le SVG affiché à l'écran.
 * @param {SVGElement} svgElement - L'élément SVG à exporter.
 */
export function exportSVG(svgElement) {
  const blob = new Blob([svgElement.outerHTML], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'tracé.svg';
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Génère et télécharge un fichier DXF à partir des dimensions fournies.
 * @param {number} width - Largeur de la zone centrale.
 * @param {number} height - Hauteur de la zone centrale.
 * @param {number} depth - Profondeur des plis.
 */
export function exportDXF(width, height, depth) {
    const lines = [];
  
    const addLine = (x1, y1, x2, y2) => {
      lines.push(`
  0
  LINE
  8
  0
  10
  ${x1}
  20
  ${y1}
  30
  0.0
  11
  ${x2}
  21
  ${y2}
  31
  0.0`);
    };
  
    const addRect = (x, y, w, h) => {
      addLine(x, y, x + w, y);
      addLine(x + w, y, x + w, y + h);
      addLine(x + w, y + h, x, y + h);
      addLine(x, y + h, x, y);
    };
  
    // Zone centrale
    addRect(depth, depth, width, height);
  
    // Haut
    addRect(depth, 0, width, depth);
  
    // Bas
    addRect(depth, depth + height, width, depth);
  
    // Gauche
    addRect(0, depth, depth, height);
  
    // Droite
    addRect(depth + width, depth, depth, height);
  
    // Assemble le fichier DXF
    const dxfContent = `0
  SECTION
  2
  ENTITIES
  ${lines.join('\n')}
  0
  ENDSEC
  0
  EOF`;
  
    const blob = new Blob([dxfContent], { type: 'application/dxf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tracé.dxf';
    a.click();
    URL.revokeObjectURL(url);
  }
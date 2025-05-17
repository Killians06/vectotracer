import { jsPDF } from 'jspdf';
import { svg2pdf } from 'svg2pdf.js';

/**
 * Exporte le SVG affiché à l'écran au format fichier SVG.
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

/**
 * Exporte un SVG vers PDF côté client, à l’échelle 1:1.
 * @param {SVGElement} svgElement - L'élément SVG à exporter.
 */
export function generatePDF(svgElement) {
  const viewBoxAttr = svgElement.getAttribute('viewBox');
  if (!viewBoxAttr) {
    console.error("SVG doit avoir un attribut viewBox défini");
    return;
  }

  const [minX, minY, vbWidth, vbHeight] = viewBoxAttr.split(' ').map(Number);

  // Crée le PDF avec la taille du viewBox en mm
  const pdf = new jsPDF({
    unit: 'mm',
    format: [vbWidth, vbHeight],
    orientation: vbWidth > vbHeight ? 'landscape' : 'portrait',
  });

  const xOffset = -minX;
  const yOffset = -minY;
  const scale = 1; // 1 unité SVG = 1 mm

  svg2pdf(svgElement, pdf, {
    xOffset,
    yOffset,
    scale,
    removeInvalid: true,
  }).then(() => {
    pdf.save('tracé.pdf');
  }).catch(err => {
    console.error('Erreur export PDF:', err);
  });
}

/**
 * Fonction qui appelle le serveur Node.js pour générer le PDF avec spot colors.
 * @param {number} width - Largeur totale en mm.
 * @param {number} height - Hauteur totale en mm.
 * @param {Array<{d: string, spotcolor?: boolean}>} paths - Liste des chemins SVG avec indication spotcolor.
 */
export async function exportViaBackend(totalWidth, totalHeight, elements, filename) {
    try {
      const response = await fetch('http://localhost:3000/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          width: totalWidth,
          height: totalHeight,
          elements: elements,
        }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur serveur : ${errorText}`);
      }
  
      const blob = await response.blob();
      // Par exemple, déclencher un téléchargement
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename + '.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
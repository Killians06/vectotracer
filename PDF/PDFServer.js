import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import PDFDocument from 'pdfkit';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

/**
 * Trace un chemin SVG simplifié (M, L, Z uniquement) en points PDFKit.
 * @param {PDFKit.PDFDocument} doc - Document PDFKit.
 * @param {string} d - Chaîne SVG path.
 */
function drawSVGPath(doc, d) {
  const commands = d.match(/[MLZ][^MLZ]*/gi);
  if (!commands) return;

  commands.forEach(cmd => {
    const type = cmd[0].toUpperCase();
    const args = cmd.slice(1).trim().split(/[\s,]+/).map(Number);

    switch (type) {
      case 'M':
        doc.moveTo(args[0] * 2.835, args[1] * 2.835);
        break;
      case 'L':
        doc.lineTo(args[0] * 2.835, args[1] * 2.835);
        break;
      case 'Z':
        doc.closePath();
        break;
    }
  });

  doc.stroke(); // Contour uniquement
}

app.post('/generate-pdf', (req, res) => {
  const { width, height, elements } = req.body;

  if (!width || !height || !elements || !Array.isArray(elements)) {
    return res.status(400).send('Dimensions ou éléments manquants ou invalides');
  }

  // Conversion mm → points (1 mm ≈ 2.835 pts)
  const mmToPts = mm => mm * 2.835;

  const doc = new PDFDocument({
    size: [mmToPts(width), mmToPts(height)],
    margin: 0,
  });

  // Encre spot "Router"
  doc.addSpotColor('Router', 100, 0, 0, 0);

  const buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    const pdfData = Buffer.concat(buffers);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=trace-router.pdf',
      'Content-Length': pdfData.length,
    });
    res.send(pdfData);
  });

  elements.forEach(el => {
    doc.save();
    if (el.spotcolor) {
      doc.strokeColor('Router', 100, 0, 0, 0);
    } else {
      doc.strokeColor('black');
    }

    switch(el.type) {
      case 'path':
        drawSVGPath(doc, el.d);
        break;
      case 'rect':
        doc.rect(mmToPts(el.x), mmToPts(el.y), mmToPts(el.width), mmToPts(el.height)).stroke();
        break;
      case 'line':
        doc.moveTo(mmToPts(el.x1), mmToPts(el.y1)).lineTo(mmToPts(el.x2), mmToPts(el.y2)).stroke();
        break;
      case 'circle':
        doc.circle(mmToPts(el.cx), mmToPts(el.cy), mmToPts(el.r)).stroke();
        break;
    }

    doc.restore();
  });

  doc.end();
});

app.listen(PORT, () => {
  console.log(`Serveur PDF démarré sur http://localhost:${PORT}`);
});

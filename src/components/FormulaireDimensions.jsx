export default function FormulaireDimensions({ dims, onChange }) {
  return (
    <form className="flex flex-col gap-2">
      <label>
        Largeur (mm) :
        <input
          type="number"
          value={dims.width}
          onChange={(e) => onChange('width', e.target.value)}
          className="border p-1 ml-2"
        />
      </label>
      <label>
        Hauteur (mm) :
        <input
          type="number"
          value={dims.height}
          onChange={(e) => onChange('height', e.target.value)}
          className="border p-1 ml-2"
        />
      </label>
      <label>
        Profondeur du pli (mm) :
        <input
          type="number"
          value={dims.depth}
          onChange={(e) => onChange('depth', e.target.value)}
          className="border p-1 ml-2"
        />
      </label>
    </form>
  );
}
const FormulaireDimensions = ({ dims, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-[--text-secondary]">
          Largeur (mm)
        </label>
        <input
          type="number"
          value={dims.width}
          onChange={(e) => onChange('width', e.target.value)}
          className="input"
          min="0"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[--text-secondary]">
          Hauteur (mm)
        </label>
        <input
          type="number"
          value={dims.height}
          onChange={(e) => onChange('height', e.target.value)}
          className="input"
          min="0"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-[--text-secondary]">
          Profondeur (mm)
        </label>
        <input
          type="number"
          value={dims.depth}
          onChange={(e) => onChange('depth', e.target.value)}
          className="input"
          min="0"
        />
      </div>
    </div>
  );
};

export default FormulaireDimensions;
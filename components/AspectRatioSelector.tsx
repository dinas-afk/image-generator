interface AspectRatioSelectorProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
  }
  
  const ASPECT_RATIOS = [
    { value: '1:1', label: 'Square', description: '1024×1024', icon: '⬜' },
    { value: '16:9', label: 'Landscape', description: '1365×768', icon: '🖼️' },
    { value: '9:16', label: 'Portrait', description: '768×1365', icon: '📱' },
    { value: '4:3', label: 'Standard', description: '1182×886', icon: '🖥️' },
    { value: '3:4', label: 'Tall', description: '886×1182', icon: '📄' },
  ];
  
  export function AspectRatioSelector({ value, onChange, disabled }: AspectRatioSelectorProps) {
    return (
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-200 uppercase tracking-wider">
          <span className="flex items-center gap-2">
            <div className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full"></div>
            Aspect Ratio
          </span>
        </label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-full p-3 bg-slate-900/50 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 text-slate-100 appearance-none cursor-pointer"
        >
          {ASPECT_RATIOS.map((ratio) => (
            <option key={ratio.value} value={ratio.value} className="bg-slate-800 text-slate-100">
              {ratio.icon} {ratio.label} ({ratio.value}) - {ratio.description}
            </option>
          ))}
        </select>
      </div>
    );
  }
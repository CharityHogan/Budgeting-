const { useState } = React;
const { Copy, Plus, Trash2 } = lucide;

function GradientGenerator() {
  const [gradientType, setGradientType] = useState('linear');
  const [angle, setAngle] = useState(90);
  const [colorMode, setColorMode] = useState('light');
  const [colors, setColors] = useState([
    { color: '#FF6B6B', position: 0 },
    { color: '#4ECDC4', position: 100 }
  ]);

  const colorModes = {
    light: { bg: 'bg-gray-50', card: 'bg-white', text: 'text-gray-900', border: 'border-gray-200' },
    dark: { bg: 'bg-gray-900', card: 'bg-gray-800', text: 'text-gray-100', border: 'border-gray-700' },
    blue: { bg: 'bg-blue-50', card: 'bg-blue-100', text: 'text-blue-900', border: 'border-blue-300' },
    green: { bg: 'bg-green-50', card: 'bg-green-100', text: 'text-green-900', border: 'border-green-300' },
    red: { bg: 'bg-red-50', card: 'bg-red-100', text: 'text-red-900', border: 'border-red-300' },
    pink: { bg: 'bg-pink-50', card: 'bg-pink-100', text: 'text-pink-900', border: 'border-pink-300' },
    orange: { bg: 'bg-orange-50', card: 'bg-orange-100', text: 'text-orange-900', border: 'border-orange-300' },
    purple: { bg: 'bg-purple-50', card: 'bg-purple-100', text: 'text-purple-900', border: 'border-purple-300' }
  };

  const currentTheme = colorModes[colorMode];

  const addColor = () => {
    const newPosition = colors.length > 0 ? Math.min(colors[colors.length - 1].position + 10, 100) : 50;
    setColors([...colors, { color: '#888888', position: newPosition }]);
  };

  const removeColor = (index) => {
    if (colors.length > 2) {
      setColors(colors.filter((_, i) => i !== index));
    }
  };

  const updateColor = (index, field, value) => {
    const newColors = [...colors];
    newColors[index][field] = value;
    setColors(newColors);
  };

  const generateGradient = () => {
    const sortedColors = [...colors].sort((a, b) => a.position - b.position);
    const colorStops = sortedColors.map(c => `${c.color} ${c.position}%`).join(', ');
    
    if (gradientType === 'linear') {
      return `linear-gradient(${angle}deg, ${colorStops})`;
    } else if (gradientType === 'radial') {
      return `radial-gradient(circle, ${colorStops})`;
    } else {
      return `conic-gradient(from 0deg, ${colorStops})`;
    }
  };

  const generateCSS = () => {
    return `background: ${generateGradient()};`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCSS());
  };

  return (
    <div className={`min-h-screen ${currentTheme.bg} p-8`}>
      <div className={`max-w-6xl mx-auto ${currentTheme.card} rounded-lg shadow-lg p-8 border ${currentTheme.border}`}>
        <h1 className={`text-4xl font-bold mb-8 ${currentTheme.text}`}>Gradient Generator</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${currentTheme.text}`}>Color Mode</label>
              <div className="grid grid-cols-4 gap-2">
                {Object.keys(colorModes).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setColorMode(mode)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                      colorMode === mode
                        ? 'bg-blue-500 text-white shadow-md'
                        : `${currentTheme.card} border ${currentTheme.border} ${currentTheme.text} hover:bg-opacity-70`
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${currentTheme.text}`}>Gradient Type</label>
              <div className="flex gap-2">
                {['linear', 'radial', 'conic'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setGradientType(type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      gradientType === type
                        ? 'bg-blue-500 text-white'
                        : `bg-gray-100 ${currentTheme.text} hover:bg-gray-200`
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {gradientType === 'linear' && (
              <div>
                <label className={`block text-sm font-medium mb-2 ${currentTheme.text}`}>Angle: {angle}°</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            )}

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className={`block text-sm font-medium ${currentTheme.text}`}>Color Stops</label>
                <button
                  onClick={addColor}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                >
                  <Plus size={16} />
                  Add Color
                </button>
              </div>
              
              <div className="space-y-3">
                {colors.map((stop, index) => (
                  <div key={index} className={`flex items-center gap-3 p-3 rounded-lg border ${currentTheme.border}`}>
                    <input
                      type="color"
                      value={stop.color}
                      onChange={(e) => updateColor(index, 'color', e.target.value)}
                      className="w-12 h-12 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={stop.color}
                      onChange={(e) => updateColor(index, 'color', e.target.value)}
                      className="w-24 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <div className="flex-1">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={stop.position}
                        onChange={(e) => updateColor(index, 'position', parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className={`text-xs ${currentTheme.text} mt-1`}>{stop.position}%</div>
                    </div>
                    {colors.length > 2 && (
                      <button
                        onClick={() => removeColor(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${currentTheme.text}`}>Preview</label>
              <div
                className="w-full h-64 rounded-lg shadow-lg"
                style={{ background: generateGradient() }}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${currentTheme.text}`}>CSS Code</label>
              <div className={`${currentTheme.card} border ${currentTheme.border} rounded-lg p-4 relative`}>
                <button
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy size={16} />
                </button>
                <pre className={`text-sm ${currentTheme.text} overflow-x-auto`}>{generateCSS()}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<GradientGenerator />, document.getElementById('root'));
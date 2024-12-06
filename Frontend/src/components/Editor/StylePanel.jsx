import { useState } from "react";
import {
  FaTimes,
  FaPalette,
  FaFont,
  FaRuler,
  FaBorderStyle,
  FaAlignLeft,
} from "react-icons/fa";

function StylePanel({ element, onUpdate, onClose }) {
  const [styles, setStyles] = useState(element?.styles || {});

  const updateStyles = (newStyles) => {
    const updatedStyles = { ...styles, ...newStyles };
    setStyles(updatedStyles);
    onUpdate(updatedStyles);
  };

  return (
    <div className="fixed right-0 top-0 h-screen w-80 bg-gray-50 shadow-xl p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6 pb-4 border-b">
        <h3 className="text-xl font-bold text-gray-800">Style Properties</h3>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <FaTimes />
        </button>
      </div>

      <div className="space-y-6">
        {/* Typography Section */}
        <section className="bg-white rounded-lg p-4 shadow-sm">
          <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-4">
            <FaFont className="text-blue-500" /> Typography
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Font Size
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="8"
                  max="72"
                  value={parseInt(styles.fontSize) || 16}
                  onChange={(e) =>
                    updateStyles({ fontSize: `${e.target.value}px` })
                  }
                  className="flex-1 mr-2"
                />
                <input
                  type="number"
                  value={parseInt(styles.fontSize) || 16}
                  onChange={(e) =>
                    updateStyles({ fontSize: `${e.target.value}px` })
                  }
                  className="w-16 px-2 py-1 border rounded text-center"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Text Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={styles.color || "#000000"}
                  onChange={(e) => updateStyles({ color: e.target.value })}
                  className="w-10 h-10 rounded border p-1"
                />
                <input
                  type="text"
                  value={styles.color || "#000000"}
                  onChange={(e) => updateStyles({ color: e.target.value })}
                  className="flex-1 px-3 py-2 border rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Text Alignment
              </label>
              <div className="flex gap-2">
                {["left", "center", "right", "justify"].map((align) => (
                  <button
                    key={align}
                    onClick={() => updateStyles({ textAlign: align })}
                    className={`flex-1 py-2 px-3 border rounded capitalize ${
                      styles.textAlign === align
                        ? "bg-blue-50 border-blue-300"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {align}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Background Section */}
        <section className="bg-white rounded-lg p-4 shadow-sm">
          <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-4">
            <FaPalette className="text-blue-500" /> Background
          </h4>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Background Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={styles.backgroundColor || "#ffffff"}
                onChange={(e) =>
                  updateStyles({ backgroundColor: e.target.value })
                }
                className="w-10 h-10 rounded border p-1"
              />
              <input
                type="text"
                value={styles.backgroundColor || "#ffffff"}
                onChange={(e) =>
                  updateStyles({ backgroundColor: e.target.value })
                }
                className="flex-1 px-3 py-2 border rounded"
              />
            </div>
          </div>
        </section>

        {/* Spacing & Borders Section */}
        <section className="bg-white rounded-lg p-4 shadow-sm">
          <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-4">
            <FaRuler className="text-blue-500" /> Spacing & Borders
          </h4>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Padding
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={parseInt(styles.padding) || 0}
                    onChange={(e) =>
                      updateStyles({ padding: `${e.target.value}px` })
                    }
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Border Radius
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={parseInt(styles.borderRadius) || 0}
                    onChange={(e) =>
                      updateStyles({ borderRadius: `${e.target.value}px` })
                    }
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Border
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Width"
                  value={parseInt(styles.borderWidth) || 0}
                  onChange={(e) =>
                    updateStyles({ borderWidth: `${e.target.value}px` })
                  }
                  className="px-3 py-2 border rounded"
                />
                <input
                  type="color"
                  value={styles.borderColor || "#000000"}
                  onChange={(e) =>
                    updateStyles({ borderColor: e.target.value })
                  }
                  className="w-full px-1 py-1 border rounded"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default StylePanel;

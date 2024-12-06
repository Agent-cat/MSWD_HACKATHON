import { useState, useEffect } from "react";
import {
  FaTimes,
  FaPalette,
  FaFont,
  FaRuler,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaImage,
  FaYoutube,
  FaLink,
  FaBorderStyle,
  FaExpandAlt,
  FaUpload,
  FaCheck,
} from "react-icons/fa";
import ImageUploader from "./ImageUploader";

function StyleEditor({ element, onUpdate, onClose }) {
  const [localContent, setLocalContent] = useState(element.content || "");
  const [localStyles, setLocalStyles] = useState(element.styles || {});
  const [localPlaceholder, setLocalPlaceholder] = useState(
    element.placeholder || ""
  );
  const [localLabel, setLocalLabel] = useState(element.label || "");

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setLocalContent(newContent);
    onUpdate({
      ...element,
      content: newContent,
      styles: localStyles,
    });
  };

  const handlePlaceholderChange = (e) => {
    const newPlaceholder = e.target.value;
    setLocalPlaceholder(newPlaceholder);
    onUpdate({
      ...element,
      placeholder: newPlaceholder,
    });
  };

  const handleLabelChange = (e) => {
    const newLabel = e.target.value;
    setLocalLabel(newLabel);
    onUpdate({
      ...element,
      label: newLabel,
    });
  };

  const handleStyleChange = (property, value) => {
    const updatedStyles = {
      ...localStyles,
      [property]: value,
    };
    setLocalStyles(updatedStyles);
    onUpdate({
      ...element,
      content: localContent,
      styles: updatedStyles,
    });
  };

  const handleImageUpload = (imageUrl) => {
    onUpdate({
      ...element,
      src: imageUrl,
    });
  };

  useEffect(() => {
    setLocalContent(element.content || "");
    setLocalStyles(element.styles || {});
    setLocalPlaceholder(element.placeholder || "");
    setLocalLabel(element.label || "");
  }, [element.id]);

  const imageSpecificSections = [
    {
      id: "image",
      label: "Image Settings",
      icon: <FaImage />,
      show: element.type === "image",
      content: (
        <div className="space-y-4">
          {/* Image Preview */}
          <div className="relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
            {element.src ? (
              <img
                src={element.src}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <FaImage size={24} className="mr-2" />
                <span>No image selected</span>
              </div>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Upload Image
            </label>
            <div className="flex gap-2">
              <label className="flex-1 cursor-pointer">
                <div className="w-full px-4 py-2 text-center border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
                  <FaUpload className="inline-block mr-2" />
                  Choose Image
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm text-gray-600">Image URL</label>
            <input
              type="text"
              value={element.src || ""}
              onChange={(e) => handleStyleChange("src", e.target.value)}
              className="w-full px-3 py-2 rounded border border-gray-200"
              placeholder="Enter image URL"
            />
          </div>

          {/* Object Fit */}
          <div>
            <label className="block text-sm text-gray-600">Object Fit</label>
            <select
              value={element.styles?.objectFit || "cover"}
              onChange={(e) => handleStyleChange("objectFit", e.target.value)}
              className="w-full px-3 py-2 rounded border border-gray-200"
            >
              <option value="cover">Cover</option>
              <option value="contain">Contain</option>
              <option value="fill">Fill</option>
              <option value="none">None</option>
            </select>
          </div>

          {/* Border Radius */}
          <div>
            <label className="block text-sm text-gray-600">Border Radius</label>
            <input
              type="number"
              value={parseInt(element.styles?.borderRadius) || 0}
              onChange={(e) =>
                handleStyleChange("borderRadius", `${e.target.value}px`)
              }
              className="w-full px-3 py-2 rounded border border-gray-200"
            />
          </div>

          {/* Shadow */}
          <div>
            <label className="block text-sm text-gray-600">Shadow</label>
            <select
              value={element.styles?.boxShadow || "none"}
              onChange={(e) => handleStyleChange("boxShadow", e.target.value)}
              className="w-full px-3 py-2 rounded border border-gray-200"
            >
              <option value="none">None</option>
              <option value="0 2px 4px rgba(0,0,0,0.1)">Small</option>
              <option value="0 4px 6px rgba(0,0,0,0.1)">Medium</option>
              <option value="0 10px 15px rgba(0,0,0,0.1)">Large</option>
            </select>
          </div>
        </div>
      ),
    },
  ];

  const renderElementSpecificControls = () => {
    switch (element.type) {
      case "heading":
        return (
          <section className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Heading Style
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Heading Level
                </label>
                <select
                  value={element.headingLevel || "h1"}
                  onChange={(e) =>
                    onUpdate({ ...element, headingLevel: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="h1">H1</option>
                  <option value="h2">H2</option>
                  <option value="h3">H3</option>
                  <option value="h4">H4</option>
                  <option value="h5">H5</option>
                  <option value="h6">H6</option>
                </select>
              </div>
            </div>
          </section>
        );

      case "image":
        return (
          <section className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Image Settings
            </h4>
            <div className="space-y-4">
              <ImageUploader onUpload={handleImageUpload} />
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={element.alt || ""}
                  onChange={(e) =>
                    onUpdate({ ...element, alt: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter alt text"
                />
              </div>
            </div>
          </section>
        );

      case "input":
        return (
          <section className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Input Settings
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Label Text
                </label>
                <input
                  type="text"
                  value={localLabel}
                  onChange={handleLabelChange}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter label text"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Placeholder Text
                </label>
                <input
                  type="text"
                  value={localPlaceholder}
                  onChange={handlePlaceholderChange}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter placeholder text"
                />
              </div>
            </div>
          </section>
        );

      case "checkbox":
      case "radio":
        return (
          <section className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              {element.type === "checkbox" ? "Checkbox" : "Radio"} Settings
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Label Text
                </label>
                <input
                  type="text"
                  value={localLabel}
                  onChange={handleLabelChange}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter label text"
                />
              </div>
            </div>
          </section>
        );

      case "button":
        return (
          <section className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Button Style
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Border Radius
                </label>
                <input
                  type="number"
                  value={parseInt(localStyles?.borderRadius) || 0}
                  onChange={(e) =>
                    handleStyleChange("borderRadius", `${e.target.value}px`)
                  }
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Hover Color
                </label>
                <input
                  type="color"
                  value={localStyles?.hoverBackgroundColor || "#3b82f6"}
                  onChange={(e) =>
                    handleStyleChange("hoverBackgroundColor", e.target.value)
                  }
                  className="w-full h-10 p-1 border rounded"
                />
              </div>
            </div>
          </section>
        );

      case "container":
        return (
          <section className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Container Style
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Border Style
                </label>
                <select
                  value={localStyles?.borderStyle || "solid"}
                  onChange={(e) =>
                    handleStyleChange("borderStyle", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                  <option value="double">Double</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Border Width
                </label>
                <input
                  type="number"
                  value={parseInt(localStyles?.borderWidth) || 1}
                  onChange={(e) =>
                    handleStyleChange("borderWidth", `${e.target.value}px`)
                  }
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Border Color
                </label>
                <input
                  type="color"
                  value={localStyles?.borderColor || "#000000"}
                  onChange={(e) =>
                    handleStyleChange("borderColor", e.target.value)
                  }
                  className="w-full h-10 p-1 border rounded"
                />
              </div>
            </div>
          </section>
        );

      case "table":
        return (
          <section className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Table Style
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Border Collapse
                </label>
                <select
                  value={localStyles?.borderCollapse || "collapse"}
                  onChange={(e) =>
                    handleStyleChange("borderCollapse", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="collapse">Collapse</option>
                  <option value="separate">Separate</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Cell Padding
                </label>
                <input
                  type="number"
                  value={parseInt(localStyles?.cellPadding) || 8}
                  onChange={(e) =>
                    handleStyleChange("cellPadding", `${e.target.value}px`)
                  }
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </div>
          </section>
        );

      case "code":
        return (
          <section className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Code Style
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Font Family
                </label>
                <select
                  value={localStyles?.fontFamily || "monospace"}
                  onChange={(e) =>
                    handleStyleChange("fontFamily", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="monospace">Monospace</option>
                  <option value="Consolas">Consolas</option>
                  <option value="Monaco">Monaco</option>
                </select>
              </div>
            </div>
          </section>
        );

      case "quote":
        return (
          <section className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-4">
              Quote Style
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Border Style
                </label>
                <select
                  value={localStyles?.borderLeftStyle || "solid"}
                  onChange={(e) =>
                    handleStyleChange("borderLeftStyle", e.target.value)
                  }
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="solid">Solid</option>
                  <option value="dashed">Dashed</option>
                  <option value="dotted">Dotted</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Border Width
                </label>
                <input
                  type="number"
                  value={parseInt(localStyles?.borderLeftWidth) || 4}
                  onChange={(e) =>
                    handleStyleChange("borderLeftWidth", `${e.target.value}px`)
                  }
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  const renderCommonStyles = () => (
    <>
      {/* Typography */}
      <section className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Typography</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Font Size
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="8"
                max="72"
                value={parseInt(localStyles?.fontSize) || 16}
                onChange={(e) =>
                  handleStyleChange("fontSize", `${e.target.value}px`)
                }
                className="flex-1"
              />
              <input
                type="number"
                value={parseInt(localStyles?.fontSize) || 16}
                onChange={(e) =>
                  handleStyleChange("fontSize", `${e.target.value}px`)
                }
                className="w-20 px-2 py-1 border rounded text-center"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Font Weight
            </label>
            <select
              value={localStyles?.fontWeight || "normal"}
              onChange={(e) => handleStyleChange("fontWeight", e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
              <option value="lighter">Lighter</option>
              <option value="bolder">Bolder</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Text Alignment
            </label>
            <div className="flex gap-2">
              {[
                { icon: <FaAlignLeft />, value: "left" },
                { icon: <FaAlignCenter />, value: "center" },
                { icon: <FaAlignRight />, value: "right" },
                { icon: <FaAlignJustify />, value: "justify" },
              ].map(({ icon, value }) => (
                <button
                  key={value}
                  onClick={() => handleStyleChange("textAlign", value)}
                  className={`flex-1 p-2 rounded ${
                    localStyles?.textAlign === value
                      ? "bg-blue-100"
                      : "bg-gray-100"
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Colors */}
      <section className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Colors</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Text Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={localStyles.color || "#000000"}
                onChange={(e) => handleStyleChange("color", e.target.value)}
                className="w-10 h-10 p-1 border rounded"
              />
              <input
                type="text"
                value={localStyles.color || "#000000"}
                onChange={(e) => handleStyleChange("color", e.target.value)}
                className="flex-1 px-3 py-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Background Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                value={localStyles.backgroundColor || "#ffffff"}
                onChange={(e) =>
                  handleStyleChange("backgroundColor", e.target.value)
                }
                className="w-10 h-10 p-1 border rounded"
              />
              <input
                type="text"
                value={localStyles.backgroundColor || "#ffffff"}
                onChange={(e) =>
                  handleStyleChange("backgroundColor", e.target.value)
                }
                className="flex-1 px-3 py-2 border rounded"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <section className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Spacing</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-2">Padding</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Top"
                value={parseInt(localStyles?.paddingTop) || 0}
                onChange={(e) =>
                  handleStyleChange("paddingTop", `${e.target.value}px`)
                }
                className="px-3 py-2 border rounded"
              />
              <input
                type="number"
                placeholder="Right"
                value={parseInt(localStyles?.paddingRight) || 0}
                onChange={(e) =>
                  handleStyleChange("paddingRight", `${e.target.value}px`)
                }
                className="px-3 py-2 border rounded"
              />
              <input
                type="number"
                placeholder="Bottom"
                value={parseInt(localStyles?.paddingBottom) || 0}
                onChange={(e) =>
                  handleStyleChange("paddingBottom", `${e.target.value}px`)
                }
                className="px-3 py-2 border rounded"
              />
              <input
                type="number"
                placeholder="Left"
                value={parseInt(localStyles?.paddingLeft) || 0}
                onChange={(e) =>
                  handleStyleChange("paddingLeft", `${e.target.value}px`)
                }
                className="px-3 py-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Margin</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Top"
                value={parseInt(localStyles?.marginTop) || 0}
                onChange={(e) =>
                  handleStyleChange("marginTop", `${e.target.value}px`)
                }
                className="px-3 py-2 border rounded"
              />
              <input
                type="number"
                placeholder="Right"
                value={parseInt(localStyles?.marginRight) || 0}
                onChange={(e) =>
                  handleStyleChange("marginRight", `${e.target.value}px`)
                }
                className="px-3 py-2 border rounded"
              />
              <input
                type="number"
                placeholder="Bottom"
                value={parseInt(localStyles?.marginBottom) || 0}
                onChange={(e) =>
                  handleStyleChange("marginBottom", `${e.target.value}px`)
                }
                className="px-3 py-2 border rounded"
              />
              <input
                type="number"
                placeholder="Left"
                value={parseInt(localStyles?.marginLeft) || 0}
                onChange={(e) =>
                  handleStyleChange("marginLeft", `${e.target.value}px`)
                }
                className="px-3 py-2 border rounded"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Style Editor</h3>
        <button onClick={onClose} className="p-2 hover:bg-blue-50 rounded-full">
          <FaTimes />
        </button>
      </div>

      <div className="space-y-6">
        {/* Element Specific Controls */}
        {renderElementSpecificControls()}

        {/* Content Section */}
        <section className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-4">Content</h4>
          <textarea
            value={localContent}
            onChange={handleContentChange}
            className="w-full px-3 py-2 border rounded min-h-[60px]"
            placeholder="Enter text"
          />
        </section>

        {/* Common Styles */}
        {renderCommonStyles()}
      </div>
    </div>
  );
}

export default StyleEditor;

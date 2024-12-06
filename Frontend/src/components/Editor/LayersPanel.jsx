import {
  FaLayerGroup,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaLockOpen,
  FaPencilAlt,
  FaChevronDown,
  FaTrash,
} from "react-icons/fa";

function LayersPanel({ elements, onUpdate, onSelectElement, isVisible }) {
  if (!isVisible) return null;

  const handleVisibilityToggle = (id) => {
    onUpdate(
      elements.map((el) => (el.id === id ? { ...el, hidden: !el.hidden } : el))
    );
  };

  const handleLockToggle = (id) => {
    onUpdate(
      elements.map((el) => (el.id === id ? { ...el, locked: !el.locked } : el))
    );
  };

  return (
    <div className="fixed right-0 top-0 w-full md:w-80 lg:w-64 h-full bg-white shadow-xl p-4 overflow-y-auto z-40">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <FaLayerGroup className="text-blue-500" />
          Layers
        </h3>
      </div>

      <div className="space-y-3">
        {elements.map((element) => (
          <div
            key={element.id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
          >
            <div
              className="flex items-center justify-between p-3 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onSelectElement(element)}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 text-gray-600">
                  {element.icon || <FaLayerGroup />}
                </span>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-700">
                    {element.type}
                  </span>
                  <span className="text-xs text-gray-500">
                    ID: {element.id}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleVisibilityToggle(element.id);
                  }}
                  className={`p-2 rounded-full hover:bg-gray-100 ${
                    element.hidden ? "text-gray-400" : "text-blue-500"
                  }`}
                >
                  {element.hidden ? <FaEyeSlash /> : <FaEye />}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLockToggle(element.id);
                  }}
                  className={`p-2 rounded-full hover:bg-gray-100 ${
                    element.locked ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  {element.locked ? <FaLock /> : <FaLockOpen />}
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-blue-500">
                  <FaPencilAlt />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LayersPanel;

import { FaLayerGroup } from "react-icons/fa";

function LayersButton({ onClick, isActive }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded ${
        isActive ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
      }`}
    >
      <FaLayerGroup /> Layers
    </button>
  );
}

export default LayersButton;

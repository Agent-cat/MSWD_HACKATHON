import { useState } from "react";
import { FaImages } from "react-icons/fa";
import { templates } from "./templateConfig";

function TemplateGallery({ onSelectTemplate }) {
  const [showGallery, setShowGallery] = useState(false);

  const handleTemplateSelect = (template) => {
    onSelectTemplate(template);
    setShowGallery(false);
  };

  return (
    <>
      <button
        onClick={() => setShowGallery(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-50"
      >
        <FaImages className="text-blue-500" />
        <span>Templates</span>
      </button>

      {showGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Choose a Template
              </h2>
              <button
                onClick={() => setShowGallery(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="group relative cursor-pointer"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="aspect-w-16 aspect-h-12 rounded-lg overflow-hidden">
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                    <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {template.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TemplateGallery;

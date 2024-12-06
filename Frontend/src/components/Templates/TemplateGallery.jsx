import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaSpinner } from "react-icons/fa";
import { templateService } from "../../services/templateService";
import { useToast } from "../../contexts/ToastContext";

function TemplateGallery() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNameModal, setShowNameModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const data = await templateService.getAllTemplates();
      setTemplates(data);
    } catch (error) {
      console.error("Error loading templates:", error);
      showToast("Failed to load templates");
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setProjectName(`${template.name} Project`);
    setShowNameModal(true);
  };

  const handleCreateProject = async () => {
    try {
      if (!projectName.trim()) {
        showToast("Please enter a project name");
        return;
      }

      const project = await templateService.createProjectFromTemplate(
        selectedTemplate._id,
        projectName
      );
      showToast("Project created successfully!", "success");
      navigate("/build", { state: { project } });
    } catch (error) {
      console.error("Error creating project:", error);
      showToast("Failed to create project");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Templates</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FaSpinner className="animate-spin text-4xl text-blue-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div
                key={template._id}
                onClick={() => handleTemplateSelect(template)}
                className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transform transition-all hover:shadow-md hover:-translate-y-1"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {template.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {template.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Name Modal */}
      {showNameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Create New Project</h2>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg mb-4"
              placeholder="Enter project name"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNameModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateProject}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TemplateGallery;

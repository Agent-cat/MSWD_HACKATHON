import { useState } from "react";
import {
  FaSave,
  FaFolderOpen,
  FaTrash,
  FaTimes,
  FaClock,
} from "react-icons/fa";

function ProjectManager({ elements, onLoad }) {
  const [projectName, setProjectName] = useState("Untitled Project");
  const [showProjects, setShowProjects] = useState(false);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [projects, setProjects] = useState([]);

  const saveProject = () => {
    if (!elements || elements.length === 0) {
      alert("Cannot save an empty project");
      return;
    }
    setShowNamePrompt(true);
  };

  const handleSaveConfirm = () => {
    const project = {
      name: projectName,
      elements: elements,
      lastModified: new Date().toISOString(),
    };

    try {
      localStorage.setItem(`project_${Date.now()}`, JSON.stringify(project));
      alert("Project saved successfully!");
      setShowNamePrompt(false);
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to save project. Please try again.");
    }
  };

  const loadProject = () => {
    const loadedProjects = Object.entries(localStorage)
      .filter(([key]) => key.startsWith("project_"))
      .map(([key, value]) => {
        try {
          const parsed = JSON.parse(value);
          return {
            id: key,
            ...parsed,
          };
        } catch (error) {
          console.error("Error parsing project:", error);
          return null;
        }
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));

    if (loadedProjects.length === 0) {
      alert("No saved projects found");
      return;
    }

    setProjects(loadedProjects);
    setShowProjects(true);
  };

  const handleProjectSelect = (project) => {
    setProjectName(project.name);
    onLoad(project.elements);
    setShowProjects(false);
  };

  const deleteProject = (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      localStorage.removeItem(projectId);
      setProjects(projects.filter((project) => project.id !== projectId));
      if (projects.length <= 1) {
        setShowProjects(false);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <>
      <div className="flex items-center gap-3 px-4 py-2 border-b">
        <span className="text-gray-700">{projectName}</span>
        <button
          onClick={saveProject}
          className="flex items-center gap-2 px-4 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <FaSave /> Save
        </button>
        <button
          onClick={loadProject}
          className="flex items-center gap-2 px-4 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          <FaFolderOpen /> Load
        </button>
      </div>

      {/* Project Name Prompt Modal */}
      {showNamePrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Name Your Project
            </h2>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none mb-4"
              placeholder="Project Name"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNamePrompt(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveConfirm}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Selection Modal */}
      {showProjects && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                Load Project
              </h2>
              <button
                onClick={() => setShowProjects(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[60vh]">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 border-b"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <FaClock className="text-xs" />
                      {formatDate(project.lastModified)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleProjectSelect(project)}
                      className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="px-3 py-1.5 text-red-500 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
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

export default ProjectManager;

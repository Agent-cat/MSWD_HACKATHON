import { useState } from "react";
import {
  FaSave,
  FaFolderOpen,
  FaTrash,
  FaTimes,
  FaClock,
} from "react-icons/fa";
import { projectService } from "../../services/projectService";

function ProjectManager({ elements, onLoad }) {
  const [projectName, setProjectName] = useState("Untitled Project");
  const [showProjects, setShowProjects] = useState(false);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [projects, setProjects] = useState([]);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const saveProject = () => {
    if (!elements || elements.length === 0) {
      showNotification("Cannot save an empty project", "error");
      return;
    }
    setShowNamePrompt(true);
  };

  const handleSaveConfirm = async () => {
    if (!projectName.trim()) {
      showNotification("Project name cannot be empty", "error");
      return;
    }

    const project = {
      name: projectName,
      elements: elements,
    };

    try {
      await projectService.createProject(project);
      showNotification("Project saved successfully!");
      setShowNamePrompt(false);
    } catch (error) {
      console.error("Error saving project:", error);
      showNotification("Failed to save project. Please try again.", "error");
    }
  };

  const loadProject = async () => {
    try {
      const loadedProjects = await projectService.getAllProjects();
      if (loadedProjects.length === 0) {
        showNotification("No saved projects found", "info");
        return;
      }
      setProjects(loadedProjects);
      setShowProjects(true);
    } catch (error) {
      console.error("Error loading projects:", error);
      showNotification("Failed to load projects. Please try again.", "error");
    }
  };

  const handleProjectSelect = (project) => {
    setProjectName(project.name);
    onLoad(project.elements);
    setShowProjects(false);
    showNotification(`Loaded project: ${project.name}`);
  };

  const deleteProject = async (projectId, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await projectService.deleteProject(projectId);
        setProjects(projects.filter((project) => project._id !== projectId));
        showNotification("Project deleted successfully");
        if (projects.length <= 1) {
          setShowProjects(false);
        }
      } catch (error) {
        console.error("Error deleting project:", error);
        showNotification(
          "Failed to delete project. Please try again.",
          "error"
        );
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

      {notification && (
        <div
          className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 ${
            notification.type === "error"
              ? "bg-red-500 text-white"
              : notification.type === "info"
              ? "bg-blue-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          {notification.message}
        </div>
      )}

    
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
                  key={project._id}
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
                      onClick={(e) => deleteProject(project._id, e)}
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

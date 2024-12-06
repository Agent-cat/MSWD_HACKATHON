import { useState, useEffect } from "react";
import { FaPlus, FaFolder, FaClock, FaTrash, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { projectService } from "../../services/projectService";
import { useToast } from "../../contexts/ToastContext";

function ProjectSelectionScreen() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("Untitled Project");

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const loadedProjects = await projectService.getAllProjects();
      setProjects(loadedProjects);
    } catch (error) {
      console.error("Error loading projects:", error);
      showToast(
        error.response?.data?.message ||
          "Failed to load projects. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const handleProjectSelect = async (project) => {
    try {
      const currentProject = await projectService.getCurrentProject(
        project._id
      );
      navigate("/build", { state: { project: currentProject } });
    } catch (error) {
      console.error("Error loading project:", error);
      showToast("Failed to load project. Please try again.");
    }
  };

  const handleCreateNewConfirm = async () => {
    try {
      const newProject = {
        name: newProjectName,
        elements: [],
      };
      const createdProject = await projectService.createProject(newProject);
      setShowNewProjectModal(false);
      navigate("/build", { state: { project: createdProject } });
      showToast("Project created successfully!", "success");
    } catch (error) {
      console.error("Error creating project:", error);
      showToast("Failed to create project. Please try again.");
    }
  };

  const handleDeleteProject = async (projectId, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await projectService.deleteProject(projectId);
        setProjects(projects.filter((project) => project._id !== projectId));
        showToast("Project deleted successfully!", "success");
      } catch (error) {
        console.error("Error deleting project:", error);
        showToast("Failed to delete project. Please try again.");
      }
    }
  };

  const handleCreateNew = () => {
    setShowNewProjectModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Projects</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Create New Project Card */}
            <div
              onClick={handleCreateNew}
              className="bg-white p-6 rounded-lg shadow-sm border-2 border-dashed border-gray-300 hover:border-blue-500 cursor-pointer transition-all group flex flex-col items-center justify-center min-h-[200px]"
            >
              <FaPlus className="text-4xl text-gray-400 group-hover:text-blue-500 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">
                Create New Project
              </h3>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Start with a blank canvas
              </p>
            </div>

            {/* Existing Projects */}
            {projects.map((project) => (
              <div
                key={project._id}
                onClick={() => handleProjectSelect(project)}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md cursor-pointer transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <FaFolder className="text-blue-500" />
                      <h3 className="text-lg font-medium text-gray-900">
                        {project.name || "Untitled Project"}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <FaClock className="text-xs" />
                      {formatDate(project.lastModified)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleDeleteProject(project._id, e)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  {project.elements?.length || 0} elements
                </div>
              </div>
            ))}
          </div>
        )}

        {/* New Project Modal */}
        {showNewProjectModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-96">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Create New Project</h2>
                <button
                  onClick={() => setShowNewProjectModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>
              <input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="Project Name"
                className="w-full p-2 border border-gray-300 rounded mb-4"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowNewProjectModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateNewConfirm}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Create Project
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectSelectionScreen;

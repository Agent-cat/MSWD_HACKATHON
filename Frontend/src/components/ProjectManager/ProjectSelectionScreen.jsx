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
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const loadedProjects = await projectService.getAllProjects();
      setProjects(loadedProjects);
    } catch (error) {
      showToast(
        "Failed to load projects. Please check your connection and try again.",
        "error"
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
      showToast("Loading project...", "info");
      const currentProject = await projectService.getCurrentProject(
        project._id
      );
      navigate("/build", { state: { project: currentProject } });
    } catch (error) {
      showToast(
        "Unable to load project. The project may be corrupted or deleted.",
        "error"
      );
    }
  };

  const handleCreateNewConfirm = async () => {
    if (!newProjectName.trim()) {
      showToast("Project name cannot be empty", "error");
      return;
    }

    try {
      showToast("Creating new project...", "info");
      const newProject = {
        name: newProjectName,
        elements: [],
      };
      const createdProject = await projectService.createProject(newProject);
      setShowNewProjectModal(false);
      navigate("/build", { state: { project: createdProject } });
      showToast("Project created successfully!", "success");
    } catch (error) {
      showToast("Failed to create project. Please try again later.", "error");
    }
  };

  const handleDeleteProject = async (projectId, e) => {
    e.stopPropagation();
    setProjectToDelete(projects.find((p) => p._id === projectId));
    setShowConfirmDelete(true);
  };

  const confirmDelete = async () => {
    try {
      showToast("Deleting project...", "info");
      await projectService.deleteProject(projectToDelete._id);
      setProjects(
        projects.filter((project) => project._id !== projectToDelete._id)
      );
      showToast("Project deleted successfully!", "success");
    } catch (error) {
      showToast("Failed to delete project. Please try again later.", "error");
    } finally {
      setShowConfirmDelete(false);
      setProjectToDelete(null);
    }
  };

  const handleCreateNew = () => {
    setNewProjectName("Untitled Project");
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 w-[450px] shadow-2xl transform transition-all scale-95 animate-[modal-pop_0.3s_ease-out_forwards]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Create New Project
                </h2>
                <button
                  onClick={() => setShowNewProjectModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaTimes className="text-gray-500 hover:text-gray-700" />
                </button>
              </div>
              <input
                type="text"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="Project Name"
                className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-lg"
                autoFocus
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowNewProjectModal(false)}
                  className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateNewConfirm}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-sm"
                >
                  Create Project
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showConfirmDelete && projectToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 w-[450px] shadow-2xl transform transition-all scale-95 animate-[modal-pop_0.3s_ease-out_forwards]">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Delete Project
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                Are you sure you want to delete "
                <span className="font-medium text-gray-900">
                  {projectToDelete.name}
                </span>
                "?
                <span className="block mt-2 text-red-500 text-base">
                  This action cannot be undone.
                </span>
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowConfirmDelete(false);
                    setProjectToDelete(null);
                  }}
                  className="px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium shadow-sm"
                >
                  Delete Project
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

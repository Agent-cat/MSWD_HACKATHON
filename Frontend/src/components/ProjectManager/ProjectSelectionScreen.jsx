import { useState, useEffect } from "react";
import { FaPlus, FaFolder, FaClock, FaTrash, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ProjectSelectionScreen() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("Untitled Project");

  useEffect(() => {
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

    setProjects(loadedProjects);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const handleDeleteProject = (projectId, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this project?")) {
      localStorage.removeItem(projectId);
      setProjects(projects.filter((project) => project.id !== projectId));
    }
  };

  const handleProjectSelect = (project) => {
    localStorage.setItem("currentProject", JSON.stringify(project));
    navigate("/build");
  };

  const handleCreateNew = () => {
    setShowNewProjectModal(true);
  };

  const handleCreateNewConfirm = () => {
    const newProject = {
      id: `project_${Date.now()}`,
      name: newProjectName,
      elements: [],
      lastModified: new Date().toISOString(),
    };
    localStorage.setItem("currentProject", JSON.stringify(newProject));
    localStorage.setItem(newProject.id, JSON.stringify(newProject));
    setShowNewProjectModal(false);
    navigate("/build");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Projects</h1>

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
              key={project.id}
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
                  onClick={(e) => handleDeleteProject(project.id, e)}
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

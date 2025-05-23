import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaDownload,
  FaLayerGroup,
  FaTrash,
  FaMobile,
  FaTabletAlt,
  FaDesktop,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaExclamationCircle,
  FaCheckCircle,
  FaSave,
  FaFolderOpen,
} from "react-icons/fa";
import ExportPanel from "../Editor/ExportPanel";
import PageViewer from "../Editor/PageViewer";
import { getToken } from "../../utils/auth";
import axios from "axios";

function Navbar({
  elements,
  onElementsUpdate,
  showLayers,
  setShowLayers,
  selectedElement,
  onDeleteElement,
  onDeviceChange,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showExportModal, setShowExportModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPageViewer, setShowPageViewer] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [notification, setNotification] = useState(null);
  const url = process.env.BACKEND_URL || "http://localhost:3000";
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      navigate("/login");
      return;
    }

    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = {
          username: response.data.username,
          profilePicture: response.data.profilePicture,
          email: response.data.email,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          showNotification("Session expired. Please login again.", "error");
          navigate("/login");
        } else {
          showNotification(
            "Failed to load user data. Please try again.",
            "error"
          );
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    showNotification("Successfully logged out");
    navigate("/login");
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedElement) {
      onDeleteElement(selectedElement.id);
      setShowDeleteConfirm(false);
      showNotification(`${selectedElement.type} deleted successfully`);
    }
  };

  const handleSave = () => {
    const currentProject = localStorage.getItem("currentProject");
    if (currentProject) {
      try {
        const project = JSON.parse(currentProject);
        project.elements = elements;
        project.lastModified = new Date().toISOString();
        localStorage.setItem(project.id, JSON.stringify(project));
        showNotification("Project saved successfully!");
      } catch (error) {
        showNotification("Failed to save project. Please try again.", "error");
      }
    } else {
      showNotification("No active project to save", "error");
    }
  };

  const handleViewPage = () => {
    const projectId = location.state?.project?._id;
    if (projectId) {
      window.open(`/preview/${projectId}`, '_blank');
    } else {
      showNotification("No project selected", "error");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileDropdown && !event.target.closest(".profile-dropdown")) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showProfileDropdown]);

  return (
    <div className="flex items-center justify-between w-full h-14">
      {notification && (
        <div
          className={`fixed top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg z-[200] ${
            notification.type === "error"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {notification.type === "error" ? (
            <FaExclamationCircle className="text-red-500" />
          ) : (
            <FaCheckCircle className="text-green-500" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      <div className="flex-1 flex items-center justify-center space-x-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 bg-white rounded-lg p-1">
          <button
            onClick={() => onDeviceChange("375px")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Mobile View"
          >
            <FaMobile />
          </button>
          <button
            onClick={() => onDeviceChange("768px")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Tablet View"
          >
            <FaTabletAlt />
          </button>
          <button
            onClick={() => onDeviceChange("100%")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Desktop View"
          >
            <FaDesktop />
          </button>
        </div>

        <button
          onClick={handleViewPage}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            showLayers
              ? "bg-blue-100 text-blue-700"
              : "bg-blue-50 hover:bg-blue-100"
          }`}
        >
          <FaLayerGroup />
          <span>View Page</span>
        </button>

        <button
          onClick={() => setShowExportModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
        >
          <FaDownload />
          <span>Export</span>
        </button>

        {selectedElement && (
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
          >
            <FaTrash />
            <span>Delete</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-4 pr-4">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <FaSave /> Save
        </button>

        <button
          onClick={() => navigate("/projects")}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <FaFolderOpen /> Projects
        </button>

        {user && (
          <div className="relative profile-dropdown">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 ring-2 ring-blue-500 ring-offset-2">
                <img
                  src={user.profilePicture || "https://via.placeholder.com/36"}
                  alt={user.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold text-gray-700">
                  {user.username}
                </span>
                <span className="text-xs text-gray-500">{user.email}</span>
              </div>
            </button>

            {/* Enhanced Dropdown Menu - Fixed position */}
            {showProfileDropdown && (
              <div className="fixed right-4 top-16 w-64 bg-white rounded-lg shadow-lg py-2 border border-gray-100 z-[100]">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-700">
                    {user.username}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>

                <button
                  onClick={() => {
                    setShowProfileDropdown(false);
                    navigate("/profile");
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <FaUser className="text-gray-400" />
                  <span>View Profile</span>
                </button>

                <button
                  onClick={() => {
                    setShowProfileDropdown(false);
                    navigate("/settings");
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <FaCog className="text-gray-400" />
                  <span>Settings</span>
                </button>

                <div className="border-t border-gray-100 my-1"></div>

                <button
                  onClick={() => {
                    setShowProfileDropdown(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <FaSignOutAlt className="text-red-500" />
                  <span>Sign out</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {showPageViewer && (
        <PageViewer
          projectId={location.state?.project?._id}
          onClose={() => setShowPageViewer(false)}
        />
      )}

      {showExportModal && (
        <ExportPanel
          elements={elements}
          onClose={() => setShowExportModal(false)}
        />
      )}

      {showDeleteConfirm && selectedElement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-2">
              Delete {selectedElement.type}
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this{" "}
              {selectedElement.type.toLowerCase()}
              {selectedElement.content && (
                <span className="block mt-2 p-2 bg-gray-50 rounded border text-sm">
                  "{selectedElement.content.substring(0, 50)}
                  {selectedElement.content.length > 50 ? "..." : ""}"
                </span>
              )}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;

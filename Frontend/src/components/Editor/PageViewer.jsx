import { useState, useEffect } from "react";
import { projectService } from "../../services/projectService";
import { useToast } from "../../contexts/ToastContext";
import { FaMobile, FaTabletAlt, FaDesktop, FaArrowLeft } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";

function PageViewer() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [error, setError] = useState(null);
  const [viewport, setViewport] = useState("desktop");
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!projectId) {
          setError("No project selected. Please select a project first.");
          setLoading(false);
          return;
        }

        console.log("Fetching project with ID:", projectId);
        const response = await projectService.getCurrentProject(projectId);
        console.log("Project data received:", response);
        
        if (!response || !response.elements) {
          throw new Error("Invalid project data received");
        }

        setProject(response);
      } catch (error) {
        console.error("Error fetching project:", error);
        setError(error.message || "Failed to load project");
        showToast(error.message || "Failed to load project", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId, showToast]);

  const getViewportWidth = () => {
    switch (viewport) {
      case "mobile":
        return "375px";
      case "tablet":
        return "768px";
      case "desktop":
        return "100%";
      default:
        return "100%";
    }
  };

  const renderElement = (element) => {
    if (!element) return null;

    const baseStyle = {
      ...element.style,
      position: element.style?.position || "relative",
      width: element.style?.width || "100%",
      height: element.style?.height || "auto",
      margin: element.style?.margin || "0",
      padding: element.style?.padding || "0",
    };

    switch (element.type) {
      case "heading":
        return (
          <h1
            key={element._id}
            className="text-4xl font-bold mb-4"
            style={baseStyle}
          >
            {element.content}
          </h1>
        );
      case "paragraph":
        return (
          <p key={element._id} className="mb-4" style={baseStyle}>
            {element.content}
          </p>
        );
      case "button":
        return (
          <button
            key={element._id}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            style={baseStyle}
          >
            {element.content}
          </button>
        );
      case "image":
        return (
          <img
            key={element._id}
            src={element.content}
            alt={element.alt || "Image"}
            className="max-w-full h-auto rounded-lg"
            style={baseStyle}
          />
        );
      case "container":
        return (
          <div
            key={element._id}
            className="p-4 border rounded-lg"
            style={baseStyle}
          >
            {element.children?.map((child) => renderElement(child))}
          </div>
        );
      case "text":
        return (
          <div key={element._id} style={baseStyle}>
            {element.content}
          </div>
        );
      case "divider":
        return (
          <hr
            key={element._id}
            className="my-4 border-t border-gray-200"
            style={baseStyle}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen  bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md">
          <div className="text-red-500 mb-4">
            <FaArrowLeft className="text-2xl" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Error Loading Project</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FaArrowLeft />
              </button>
              <h2 className="text-xl font-semibold">{project?.name || "Page Preview"}</h2>
            </div>
            <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewport("mobile")}
                className={`p-2 rounded-lg transition-colors ${
                  viewport === "mobile" ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                }`}
                title="Mobile View"
              >
                <FaMobile />
              </button>
              <button
                onClick={() => setViewport("tablet")}
                className={`p-2 rounded-lg transition-colors ${
                  viewport === "tablet" ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                }`}
                title="Tablet View"
              >
                <FaTabletAlt />
              </button>
              <button
                onClick={() => setViewport("desktop")}
                className={`p-2 rounded-lg transition-colors ${
                  viewport === "desktop" ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                }`}
                title="Desktop View"
              >
                <FaDesktop />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-full mx-auto h-screen">
        <div
          className="mx-auto bg-white shadow-lg"
          style={{
            width: getViewportWidth(),
            minHeight: "100%",
            transition: "width 0.3s ease-in-out",
          }}
        >
          <div className="p-8">
            {project?.elements?.length > 0 ? (
              project.elements.map((element) => renderElement(element))
            ) : (
              <div className="text-center text-gray-500 py-8">
                No elements to display
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageViewer; 
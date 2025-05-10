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


    const processStyleValue = (value) => {
      if (typeof value === 'string') {
        
        if (value.endsWith('px')) {
          return value;
        }
        
        if (value.endsWith('%')) {
          return value;
        }
        
        if (value.startsWith('#') || value.startsWith('rgb')) {
          return value;
        }
        
        return value;
      }
      return value;
    };

    const baseStyle = {
      ...element.style,
      position: element.style?.position || "relative",
      width: processStyleValue(element.style?.width) || "100%",
      height: processStyleValue(element.style?.height) || "auto",
      margin: processStyleValue(element.style?.margin) || "0",
      padding: processStyleValue(element.style?.padding) || "0",
      display: element.style?.display || "block",
      flexDirection: element.style?.flexDirection || "row",
      justifyContent: element.style?.justifyContent || "flex-start",
      alignItems: element.style?.alignItems || "stretch",
      gap: processStyleValue(element.style?.gap) || "0",
      backgroundColor: element.style?.backgroundColor || "transparent",
      color: element.style?.color || "inherit",
      fontSize: processStyleValue(element.style?.fontSize) || "inherit",
      fontWeight: element.style?.fontWeight || "normal",
      textAlign: element.style?.textAlign || "left",
      borderRadius: processStyleValue(element.style?.borderRadius) || "0",
      border: element.style?.border || "none",
      boxShadow: element.style?.boxShadow || "none",
      opacity: element.style?.opacity || 1,
      transform: element.style?.transform || "none",
      transition: "all 0.3s ease",
      zIndex: element.style?.zIndex || "auto",
      overflow: element.style?.overflow || "visible",
      backgroundImage: element.style?.backgroundImage || "none",
      backgroundSize: element.style?.backgroundSize || "cover",
      backgroundPosition: element.style?.backgroundPosition || "center",
      backgroundRepeat: element.style?.backgroundRepeat || "no-repeat",
      minWidth: processStyleValue(element.style?.minWidth) || "auto",
      maxWidth: processStyleValue(element.style?.maxWidth) || "none",
      minHeight: processStyleValue(element.style?.minHeight) || "auto",
      maxHeight: processStyleValue(element.style?.maxHeight) || "none",
    };

    switch (element.type) {
      case "heading":
        return (
          <h1
            key={element._id}
            style={baseStyle}
          >
            {element.content}
          </h1>
        );
      case "paragraph":
        return (
          <p key={element._id} style={baseStyle}>
            {element.content}
          </p>
        );
      case "button":
        return (
          <button
            key={element._id}
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
            style={baseStyle}
          />
        );
      case "container":
        return (
          <div
            key={element._id}
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
            style={baseStyle}
          />
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md shadow-lg">
          <div className="text-red-500 mb-4">
            <FaArrowLeft className="text-2xl" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Error Loading Project</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="bg-white shadow-sm sticky top-0 z-10">
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

      <div className="max-w-full mx-auto h-screen overflow-auto">
        <div
          className="mx-auto bg-white shadow-lg"
          style={{
            width: getViewportWidth(),
            minHeight: "100%",
            transition: "width 0.3s ease-in-out",
            margin: "0 auto",
            padding: "2rem",
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
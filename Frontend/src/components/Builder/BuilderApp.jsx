import { BrowserRouter } from "react-router-dom";
import { useElements } from "../../hooks/useElements";
import { useCallback, useState, useEffect } from "react";
import EditorCanvas from "../Editor/EditorCanvas";
import Sidebar from "../Sidebar/Sidebar";
import MainLayout from "../Layout/MainLayout";
import { DragDropContext } from "@hello-pangea/dnd";
import Navbar from "../Navbar/Navbar";
import StyleEditor from "../Editor/StyleEditor";
import { useLocation } from "react-router-dom";
import { projectService } from "../../services/projectService";

function BuilderApp() {
  const location = useLocation();
  const {
    elements,
    selectedElement,
    setSelectedElement,
    updateElement,
    addElement,
    removeElement,
  } = useElements([]);

  const [showLayers, setShowLayers] = useState(false);
  const [deviceWidth, setDeviceWidth] = useState("100%");

  // Load current project when component mounts
  useEffect(() => {
    if (location.state?.project) {
      const { elements } = location.state.project;
      if (Array.isArray(elements)) {
        // Ensure all element properties are preserved
        const completeElements = elements.map((element) => ({
          ...element,
          content: element.content || "",
          styles: element.styles || {},
          locked: element.locked || false,
          hidden: element.hidden || false,
        }));
        updateElement(completeElements);
      }
    }
  }, [location.state]);

  const handleElementsUpdate = async (newElements) => {
    if (Array.isArray(newElements)) {
      // Ensure all element properties are included
      const completeElements = newElements.map((element) => ({
        id: element.id,
        type: element.type,
        content: element.content || "",
        x: element.x,
        y: element.y,
        width: element.width,
        height: element.height,
        styles: element.styles || {},
        locked: element.locked || false,
        hidden: element.hidden || false,
        src: element.src, // For image elements
        placeholder: element.placeholder, // For input elements
      }));

      updateElement(completeElements);

      if (location.state?.project?._id) {
        try {
          await projectService.updateProject(location.state.project._id, {
            elements: completeElements,
          });
        } catch (error) {
          console.error("Error saving project:", error);
        }
      }
    }
  };

  const handleStyleUpdate = (elementId, updates) => {
    const elementToUpdate = elements.find((el) => el.id === elementId);
    if (elementToUpdate) {
      const updatedElement = {
        ...elementToUpdate,
        ...updates,
        styles: {
          ...elementToUpdate.styles,
          ...(updates.styles || {}),
        },
      };

      const updatedElements = elements.map((el) =>
        el.id === elementId ? updatedElement : el
      );

      handleElementsUpdate(updatedElements);
    }
  };

  const saveToCurrentProject = (updatedElements) => {
    const currentProject = localStorage.getItem("currentProject");
    if (currentProject) {
      try {
        const project = JSON.parse(currentProject);
        project.elements = updatedElements;
        project.lastModified = new Date().toISOString();
        localStorage.setItem(project.id, JSON.stringify(project));
        localStorage.setItem("currentProject", JSON.stringify(project));
      } catch (error) {
        console.error("Error saving project:", error);
      }
    }
  };

  const handleDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;

      const { source, destination, draggableId } = result;

      if (
        source.droppableId === "sidebar" &&
        destination.droppableId === "canvas"
      ) {
        const newElement = {
          type: draggableId,
          content: "",
          x: destination.x || 0,
          y: destination.y || 0,
          width: 200,
          height: 40,
          styles: {},
          locked: false,
          hidden: false,
        };

        addElement(newElement);
      }
    },
    [addElement]
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <MainLayout
        sidebar={<Sidebar />}
        navbar={
          <Navbar
            elements={elements}
            onElementsUpdate={handleElementsUpdate}
            showLayers={showLayers}
            setShowLayers={setShowLayers}
            selectedElement={selectedElement}
            onDeleteElement={removeElement}
            onDeviceChange={setDeviceWidth}
          />
        }
        content={
          <EditorCanvas
            elements={elements}
            onElementsUpdate={handleElementsUpdate}
            onSelectElement={setSelectedElement}
            deviceWidth={deviceWidth}
          />
        }
      />
      {selectedElement && (
        <StyleEditor
          element={selectedElement}
          onUpdate={(updates) => handleStyleUpdate(selectedElement.id, updates)}
          onClose={() => setSelectedElement(null)}
        />
      )}
    </DragDropContext>
  );
}

export default BuilderApp;

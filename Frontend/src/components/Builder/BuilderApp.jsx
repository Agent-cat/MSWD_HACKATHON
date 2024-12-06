import { BrowserRouter } from "react-router-dom";
import { useElements } from "../../hooks/useElements";
import { useCallback, useState, useEffect } from "react";
import EditorCanvas from "../Editor/EditorCanvas";
import Sidebar from "../Sidebar/Sidebar";
import MainLayout from "../Layout/MainLayout";
import { DragDropContext } from "@hello-pangea/dnd";
import Navbar from "../Navbar/Navbar";
import StyleEditor from "../Editor/StyleEditor";

function BuilderApp() {
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
    const currentProject = localStorage.getItem("currentProject");
    if (currentProject) {
      try {
        const project = JSON.parse(currentProject);
        if (Array.isArray(project.elements)) {
          updateElement(project.elements);
        }
      } catch (error) {
        console.error("Error loading project:", error);
      }
    }
  }, []);

  const handleElementsUpdate = (newElements) => {
    if (Array.isArray(newElements)) {
      updateElement(newElements);
      saveToCurrentProject(newElements);
    }
  };

  const handleStyleUpdate = (elementId, updates) => {
    updateElement(elementId, updates);
    const updatedElements = elements.map((el) =>
      el.id === elementId ? { ...el, ...updates } : el
    );
    saveToCurrentProject(updatedElements);
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

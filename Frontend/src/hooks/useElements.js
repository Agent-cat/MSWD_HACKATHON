import { useState } from "react";

export const useElements = (initialElements = []) => {
  const [elements, setElements] = useState(initialElements);
  const [selectedElement, setSelectedElement] = useState(null);

  const updateElement = (elementOrElements, updates) => {
    if (Array.isArray(elementOrElements)) {
      setElements(elementOrElements);
    } else if (typeof elementOrElements === "string" && updates) {
      setElements((prevElements) =>
        prevElements.map((el) =>
          el.id === elementOrElements ? { ...el, ...updates } : el
        )
      );

      if (selectedElement?.id === elementOrElements) {
        setSelectedElement((prev) => ({ ...prev, ...updates }));
      }
    }
  };

  const addElement = (newElement) => {
    const uniqueId = `${newElement.type}_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    const elementWithUniqueId = {
      ...newElement,
      id: uniqueId,
    };
    setElements((prev) => [...prev, elementWithUniqueId]);
  };

  const removeElement = (elementId) => {
    setElements((prev) => prev.filter((el) => el.id !== elementId));
    if (selectedElement?.id === elementId) {
      setSelectedElement(null);
    }
  };

  return {
    elements,
    selectedElement,
    setSelectedElement,
    updateElement,
    addElement,
    removeElement,
  };
};

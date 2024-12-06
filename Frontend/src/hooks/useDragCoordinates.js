import { useState, useEffect } from "react";

export function useDragCoordinates() {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleDragOver(e) {
      setCoordinates({
        x: e.clientX,
        y: e.clientY,
      });
    }

    document.addEventListener("dragover", handleDragOver);
    return () => document.removeEventListener("dragover", handleDragOver);
  }, []);

  return coordinates;
}

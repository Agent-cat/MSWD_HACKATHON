import { memo, useCallback } from "react";
import { Droppable } from "@hello-pangea/dnd";
import { Rnd } from "react-rnd";
import ElementRenderer from "./ElementRenderer";

const EditorCanvas = memo(
  ({ elements, onElementsUpdate, onSelectElement, deviceWidth }) => {
    const handleDragStop = useCallback(
      (id, position) => {
        const updatedElements = elements.map((el) =>
          el.id === id ? { ...el, x: position.x, y: position.y } : el
        );
        onElementsUpdate(updatedElements);
      },
      [elements, onElementsUpdate]
    );

    const handleResize = useCallback(
      (id, size) => {
        const updatedElements = elements.map((el) =>
          el.id === id ? { ...el, width: size.width, height: size.height } : el
        );
        onElementsUpdate(updatedElements);
      },
      [elements, onElementsUpdate]
    );

    return (
      <Droppable droppableId="canvas" direction="vertical">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="relative flex-1 overflow-auto"
          >
            <div
              style={{
                width: deviceWidth,
                margin: "0 auto",
                minHeight: "100vh",
                position: "relative",
                transition: "width 0.3s ease-in-out",
                backgroundImage:
                  "linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)",
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
              }}
            >
              {elements.map((element) => (
                <Rnd
                  key={element.id}
                  default={{
                    x: element.x,
                    y: element.y,
                    width: element.width,
                    height: element.height,
                  }}
                  minWidth={100}
                  minHeight={40}
                  bounds="parent"
                  onDragStop={(e, d) => handleDragStop(element.id, d)}
                  onResize={(e, direction, ref, delta, position) =>
                    handleResize(element.id, {
                      width: ref.offsetWidth,
                      height: ref.offsetHeight,
                    })
                  }
                  onClick={() => onSelectElement(element)}
                  className={`${element.locked ? "pointer-events-none" : ""} ${
                    element.hidden ? "opacity-50" : ""
                  }`}
                >
                  <ElementRenderer element={element} />
                </Rnd>
              ))}
              {provided.placeholder}
              {snapshot.isDraggingOver && (
                <div className="absolute inset-0 border-2 border-blue-400 border-dashed pointer-events-none bg-blue-50 bg-opacity-50" />
              )}
            </div>
          </div>
        )}
      </Droppable>
    );
  }
);

export default EditorCanvas;
import { memo } from "react";
import {
  FaUpload,
  FaImage,
  FaYoutube,
  FaLink,
  FaCode,
  FaQuoteRight,
  FaTable,
  FaColumns,
  FaMap,
} from "react-icons/fa";

const ElementRenderer = memo(({ element, onUpdate }) => {
  const renderElement = () => {
    const styles = {
      width: "100%",
      height: "100%",
      ...element.styles,
    };

    switch (element.type) {
      
      case "heading":
        return <div style={styles}>{element.content || "Heading"}</div>;
      case "paragraph":
        return <div style={styles}>{element.content || "Paragraph"}</div>;
      case "button":
        return (
          <button
            style={styles}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {element.content || "Button"}
          </button>
        );
      case "image":
        return (
          <div style={styles} className="relative group">
            {element.src ? (
              <img
                src={element.src}
                alt={element.alt || "Image"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: element.styles?.objectFit || "cover",
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300">
                <span className="text-gray-500">Add image URL in settings</span>
              </div>
            )}
          </div>
        );
      case "link":
        return (
          <a
            href={element.href}
            target="_blank"
            rel="noopener noreferrer"
            style={styles}
            className="text-blue-500 hover:underline"
          >
            {element.content || "Click here"}
          </a>
        );

    
      case "input":
        return (
          <input
            type={element.inputType || "text"}
            placeholder={element.placeholder || "Enter text..."}
            style={styles}
            className="w-full outline-none border rounded px-3 py-2"
            readOnly
          />
        );
      case "checkbox":
        return (
          <div className="flex items-center gap-2" style={styles}>
            <input
              type="checkbox"
              checked={element.checked || false}
              readOnly
            />
            <label>{element.content || "Checkbox"}</label>
          </div>
        );
      case "radio":
        return (
          <div className="flex items-center gap-2" style={styles}>
            <input type="radio" checked={element.checked || false} readOnly />
            <label>{element.content || "Radio"}</label>
          </div>
        );

      
      case "container":
        return (
          <div
            style={styles}
            className="border border-dashed border-gray-300 p-4"
          >
            {element.content || "Container"}
          </div>
        );
      case "columns":
        return (
          <div style={styles} className="grid grid-cols-2 gap-4">
            <div className="border border-dashed border-gray-300 p-4">
              Column 1
            </div>
            <div className="border border-dashed border-gray-300 p-4">
              Column 2
            </div>
          </div>
        );
      case "table":
        return (
          <table
            style={styles}
            className="w-full border-collapse border border-gray-300"
          >
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Header 1</th>
                <th className="border border-gray-300 p-2">Header 2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Cell 1</td>
                <td className="border border-gray-300 p-2">Cell 2</td>
              </tr>
            </tbody>
          </table>
        );

      
      case "video":
        return (
          <div style={styles}>
            {element.videoId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${element.videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300">
                <span className="text-gray-500">Add video URL in settings</span>
              </div>
            )}
          </div>
        );
      case "map":
        return (
          <div style={styles}>
            {element.mapUrl ? (
              <iframe
                width="100%"
                height="100%"
                src={element.mapUrl}
                frameBorder="0"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300">
                <span className="text-gray-500">Add map URL in settings</span>
              </div>
            )}
          </div>
        );
      case "code":
        return (
          <pre
            style={styles}
            className="bg-gray-100 p-4 rounded overflow-x-auto"
          >
            <code>{element.content || "// Add your code here"}</code>
          </pre>
        );
      case "quote":
        return (
          <blockquote
            style={styles}
            className="border-l-4 border-gray-300 pl-4 italic"
          >
            {element.content || "Add your quote here"}
          </blockquote>
        );
      default:
        return null;
    }
  };

  return <div className="relative">{renderElement()}</div>;
});

export default ElementRenderer;

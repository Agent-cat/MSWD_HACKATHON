import { FaTimes, FaDownload } from "react-icons/fa";

function ExportPanel({ elements, onClose }) {
  const renderElement = (element) => {
    switch (element.type) {
      case "heading":
        return `<h1 style="${generateStyles(element.styles)}">${
          element.content
        }</h1>`;
      case "paragraph":
        return `<p style="${generateStyles(element.styles)}">${
          element.content
        }</p>`;
      case "button":
        return `<button style="${generateStyles(element.styles)}">${
          element.content
        }</button>`;
      case "image":
        return `<img src="${element.src}" alt="${
          element.alt || ""
        }" style="${generateStyles(element.styles)}" />`;
      case "input":
        return `<input type="${element.inputType || "text"}" placeholder="${
          element.placeholder || ""
        }" style="${generateStyles(element.styles)}" />`;
      case "link":
        return `<a href="${element.url || "#"}" style="${generateStyles(
          element.styles
        )}">${element.content}</a>`;
      case "youtube":
        return `<iframe 
          src="${element.videoUrl}"
          style="${generateStyles(element.styles)}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>`;
      default:
        return "";
    }
  };

  const generateStyles = (styles) => {
    if (!styles) return "";
    return Object.entries(styles)
      .map(([key, value]) => `${key}: ${value}`)
      .join("; ");
  };

  const handleExport = () => {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exported Design</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }
        .container {
            position: relative;
            width: 100%;
            min-height: 100vh;
        }
        ${elements
          .map(
            (el) =>
              `#element-${el.id} {
                position: absolute;
                left: ${el.x}px;
                top: ${el.y}px;
                width: ${el.width}px;
                height: ${el.height}px;
                ${Object.entries(el.styles || {})
                  .map(([key, value]) => `${key}: ${value};`)
                  .join("\n                ")}
              }`
          )
          .join("\n\n")}
    </style>
</head>
<body>
    <div class="container">
        ${elements
          .map(
            (el) =>
              `<div id="element-${el.id}">
                ${renderElement(el)}
              </div>`
          )
          .join("\n        ")}
    </div>
</body>
</html>`;
    console.log('Exported HTML Content:', htmlContent);
    downloadFile(htmlContent, "export.html", "text/html");
  };

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Export Design</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FaTimes />
          </button>
        </div>

        <div className="space-y-6">
          <p className="text-gray-600 text-center">
            Export your design as a standalone HTML file with embedded CSS styles.
          </p>

          <button
            onClick={handleExport}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FaDownload /> Export HTML
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExportPanel;

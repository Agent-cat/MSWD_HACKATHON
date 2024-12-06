export const generateReactComponent = (elements) => {
  const generateStyles = (styles) => {
    return Object.entries(styles || {})
      .map(([key, value]) => `${key}: "${value}"`)
      .join(", ");
  };

  const generateElement = (element) => {
    switch (element.type) {
      case "heading":
        return `<h1 style={{${generateStyles(element.styles)}}}>${
          element.content
        }</h1>`;
      case "paragraph":
        return `<p style={{${generateStyles(element.styles)}}}>${
          element.content
        }</p>`;
      case "image":
        return `<img src="${element.src}" alt="${
          element.alt || ""
        }" style={{${generateStyles(element.styles)}}} />`;
      case "button":
        return `<button style={{${generateStyles(element.styles)}}}>${
          element.content
        }</button>`;
      case "link":
        return `<a href="${element.url}" style={{${generateStyles(
          element.styles
        )}}}>${element.content}</a>`;
      case "youtube":
        return `<iframe 
          src="${element.videoUrl}"
          style={{${generateStyles(element.styles)}}}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />`;
      default:
        return "";
    }
  };

  const componentCode = `import React from 'react';

function ExportedCanvas() {
  return (
    <div className="relative w-full h-full">
      ${elements
        .map((element) => {
          const position = `position: absolute, left: ${element.x}px, top: ${element.y}px, width: ${element.width}px, height: ${element.height}px`;
          return `<div style={{${position}}}>
          ${generateElement(element)}
        </div>`;
        })
        .join("\n      ")}
    </div>
  );
}

export default ExportedCanvas;`;

  return componentCode;
};

export const downloadAsFile = (content, filename) => {
  const blob = new Blob([content], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

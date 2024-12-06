import {
  FaHeading,
  FaParagraph,
  FaCheckSquare,
  FaDotCircle,
  FaList,
  FaImage,
  FaFont,
  FaSquare,
  FaInput,
  FaEnvelope,
  FaPhone,
  FaCalendar,
  FaLock,
  FaYoutube,
  FaLink,
} from "react-icons/fa";

const prebuiltComponents = [
  {
    type: "heading",
    icon: <FaHeading />,
    label: "Heading",
    defaultStyles: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#000000",
    },
  },
  {
    type: "paragraph",
    icon: <FaParagraph />,
    label: "Paragraph",
    defaultStyles: {
      fontSize: "16px",
      color: "#000000",
    },
  },
  {
    type: "input",
    icon: <FaInput />,
    label: "Text Input",
    inputType: "text",
    placeholder: "Enter text...",
    defaultStyles: {
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
  },
  {
    type: "image",
    icon: <FaImage />,
    label: "Image",
    defaultStyles: {
      width: "300px",
      height: "200px",
      objectFit: "cover",
    },
    src: "",
    alt: "Image",
  },
  {
    type: "container",
    icon: <FaSquare />,
    label: "Container",
    defaultStyles: {
      width: "300px",
      height: "200px",
      backgroundColor: "#f5f5f5",
      borderRadius: "8px",
      padding: "16px",
    },
  },
  {
    type: "checkbox",
    icon: <FaCheckSquare />,
    label: "Checkbox",
    defaultStyles: {
      fontSize: "16px",
    },
  },
  {
    type: "email",
    icon: <FaEnvelope />,
    label: "Email Input",
    inputType: "email",
    placeholder: "Enter email...",
    defaultStyles: {
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
  },
  {
    type: "password",
    icon: <FaLock />,
    label: "Password Input",
    inputType: "password",
    placeholder: "Enter password...",
    defaultStyles: {
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
  },
  {
    type: "youtube",
    icon: <FaYoutube />,
    label: "YouTube Video",
    defaultStyles: {
      width: "560px",
      height: "315px",
    },
    videoId: "",
  },
  {
    type: "link",
    icon: <FaLink />,
    label: "Link",
    defaultStyles: {
      color: "#0066cc",
      textDecoration: "underline",
      cursor: "pointer",
    },
    href: "",
  },
];

function PrebuiltComponents({ onAddElement }) {
  const handleDragStart = (e, component) => {
    e.dataTransfer.setData("component", JSON.stringify(component));
  };

  const handleClick = (component) => {
    onAddElement({
      ...component,
      id: Date.now().toString(),
      x: 100,
      y: 100,
      styles: component.defaultStyles,
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Components</h3>
      <div className="grid grid-cols-2 gap-3">
        {prebuiltComponents.map((component) => (
          <div
            key={component.type}
            draggable
            onDragStart={(e) => handleDragStart(e, component)}
            onClick={() => handleClick(component)}
            className="flex flex-col items-center p-3 border rounded hover:bg-gray-50 cursor-move"
          >
            <div className="text-xl mb-2">{component.icon}</div>
            <span className="text-sm">{component.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PrebuiltComponents;

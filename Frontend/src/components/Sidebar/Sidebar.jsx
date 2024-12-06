import { Droppable, Draggable } from "@hello-pangea/dnd";
import {
  FaHeading,
  FaImage,
  FaParagraph,
  FaRegSquare,
  FaList,
  FaLink,
  FaYoutube,
  FaTable,
  FaColumns,
  FaMapMarker,
  FaCode,
  FaQuoteLeft,
  FaChevronDown,
  FaSearch,
} from "react-icons/fa";
import {
  MdSmartButton,
  MdInput,
  MdCheckBox,
  MdRadioButtonChecked,
} from "react-icons/md";
import { useState } from "react";

const elementCategories = [
  {
    title: "Basic",
    items: [
      { id: "heading", icon: <FaHeading />, label: "Heading", type: "heading" },
      {
        id: "paragraph",
        icon: <FaParagraph />,
        label: "Paragraph",
        type: "paragraph",
      },
      {
        id: "button",
        icon: <MdSmartButton />,
        label: "Button",
        type: "button",
      },
      { id: "image", icon: <FaImage />, label: "Image", type: "image" },
      { id: "link", icon: <FaLink />, label: "Link", type: "link" },
    ],
  },
  {
    title: "Form",
    items: [
      { id: "input", icon: <MdInput />, label: "Input", type: "input" },
      {
        id: "checkbox",
        icon: <MdCheckBox />,
        label: "Checkbox",
        type: "checkbox",
      },
      {
        id: "radio",
        icon: <MdRadioButtonChecked />,
        label: "Radio",
        type: "radio",
      },
    ],
  },
  {
    title: "Layout",
    items: [
      {
        id: "container",
        icon: <FaRegSquare />,
        label: "Container",
        type: "container",
      },
      { id: "columns", icon: <FaColumns />, label: "Columns", type: "columns" },
      { id: "table", icon: <FaTable />, label: "Table", type: "table" },
    ],
  },
  {
    title: "Media",
    items: [
      { id: "video", icon: <FaYoutube />, label: "Video", type: "video" },
      { id: "map", icon: <FaMapMarker />, label: "Map", type: "map" },
      { id: "code", icon: <FaCode />, label: "Code", type: "code" },
      { id: "quote", icon: <FaQuoteLeft />, label: "Quote", type: "quote" },
    ],
  },
];

function Sidebar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (categoryTitle) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryTitle]: !prev[categoryTitle],
    }));
  };

  const filteredCategories = elementCategories
    .map((category) => ({
      ...category,
      items: category.items.filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0);

  return (
    <Droppable droppableId="sidebar" isDropDisabled={true}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="h-full flex flex-col"
        >
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search elements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 border rounded-lg"
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {filteredCategories.map((category, index) => (
              <div key={category.title}>
                <div className="mb-4">
                  <button
                    onClick={() => toggleCategory(category.title)}
                    className="flex items-center justify-between w-full p-2 text-left"
                  >
                    <span className="font-medium text-gray-700">
                      {category.title}
                    </span>
                    <FaChevronDown
                      className={`transform transition-transform ${
                        expandedCategories[category.title] ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {expandedCategories[category.title] && (
                    <div className="mt-2 space-y-2">
                      {category.items.map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`flex items-center p-3 rounded-lg border ${
                                snapshot.isDragging
                                  ? "shadow-lg bg-blue-50 border-blue-200"
                                  : "bg-white border-gray-200 hover:border-blue-300"
                              }`}
                            >
                              <span className="mr-3 text-gray-600">
                                {item.icon}
                              </span>
                              <span className="text-sm font-medium">
                                {item.label}
                              </span>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  )}
                </div>
                {index < filteredCategories.length - 1 && (
                  <hr className="border-t border-gray-200 mb-4" />
                )}
              </div>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default Sidebar;

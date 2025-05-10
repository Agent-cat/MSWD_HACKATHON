import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { Link } from "react-router-dom";

function MainLayout({ sidebar, navbar, content, styleEditor }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`h-screen flex flex-col bg-white`}>
      
      <div
        className={`h-14 border-b ${
          isDarkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        } px-4`}
      >
        <div className="h-full flex items-center justify-between">
         
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-2 rounded-lg ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              }`}
            >
              {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <Link
              to="/"
              className={`font-bold text-xl ${
                isDarkMode ? "text-white" : "text-gray-800"
              } hidden sm:inline`}
            >
              WEB BUILD
            </Link>
          </div>

          <div className="flex-1 ml-4 overflow-x-auto">{navbar}</div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg ${
              isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
            }`}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>

     
      <div className="flex-1 flex overflow-hidden">
        
        <div
          className={`${isSidebarOpen ? "w-64" : "w-0"} ${
            isMobile ? "absolute z-50 h-full" : "relative"
          } transition-all duration-300 ease-in-out flex-shrink-0`}
        >
          <div
            className={`${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } absolute w-64 h-full bg-white border-r transition-transform duration-300 ease-in-out`}
          >
            {sidebar}
          </div>
        </div>

       
        <div
          className={`flex-1 flex flex-col overflow-hidden relative transition-all duration-300 ease-in-out`}
          style={{
            marginLeft: isMobile ? 0 : undefined,
          }}
        >
          {content}
        </div>

        
        {styleEditor && (
          <div
            className={`${
              isMobile
                ? "fixed bottom-0 left-0 right-0 max-h-[70vh] rounded-t-xl shadow-lg"
                : "w-80 border-l"
            } bg-white overflow-y-auto z-40`}
          >
            {styleEditor}
          </div>
        )}
      </div>

      
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default MainLayout;

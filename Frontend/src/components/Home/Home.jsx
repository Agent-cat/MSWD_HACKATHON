import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/auth";
import { FaBolt, FaPalette, FaMobileAlt } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();
  const isAuthenticated = getToken();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="fixed w-full backdrop-blur-sm bg-white/30 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h2
                onClick={() => navigate("/")}
                className="text-2xl font-bold text-blue-600 cursor-pointer"
              >
                WEB BUILD
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <button
                  onClick={() => navigate("/build")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
                >
                  Go to Builder
                </button>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-white/50 transition-all"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="py-20 text-center">
          <h1 className="text-5xl sm:text-7xl font-bold text-gray-900 mb-6">
            Build Your Next Project{" "}
            <span className="text-blue-600">Faster</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Create beautiful, responsive web applications with our intuitive
            drag-and-drop builder. No coding required.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/build")}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all text-lg font-medium shadow-lg"
            >
              Start Building For Free
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transform hover:scale-105 transition-all text-lg font-medium"
            >
              Sign In to Continue
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 py-16">
          <div className="p-8 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="mb-6 bg-blue-50 w-14 h-14 rounded-lg flex items-center justify-center">
              <FaBolt className="text-2xl text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Lightning Fast
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Build and deploy your projects in minutes, not hours. Our
              streamlined workflow accelerates development.
            </p>
          </div>
          <div className="p-8 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="mb-6 bg-blue-50 w-14 h-14 rounded-lg flex items-center justify-center">
              <FaPalette className="text-2xl text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Fully Customizable
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Customize every aspect of your application with precision.
              Enterprise-grade flexibility at your fingertips.
            </p>
          </div>
          <div className="p-8 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="mb-6 bg-blue-50 w-14 h-14 rounded-lg flex items-center justify-center">
              <FaMobileAlt className="text-2xl text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Responsive Design
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Ensure consistent performance across all devices with
              enterprise-ready responsive layouts.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;

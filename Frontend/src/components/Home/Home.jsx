import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/auth";
import {
  FaBolt,
  FaPalette,
  FaMobileAlt,
  FaCode,
  FaRocket,
  FaLightbulb,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import { motion } from "framer-motion";

function Home() {
  const navigate = useNavigate();
  const isAuthenticated = getToken();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <nav className="fixed w-full backdrop-blur-sm bg-white/30 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <motion.h2
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/")}
                className="text-xl sm:text-2xl font-bold text-blue-600 cursor-pointer"
              >
                WEB BUILD
              </motion.h2>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => navigate("/features")}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => navigate("/pricing")}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => navigate("/templates")}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Templates
              </button>
              <button
                onClick={() => navigate("/docs")}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Documentation
              </button>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              {isAuthenticated ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate("/build")}
                  className="px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
                >
                  Go to Builder
                </motion.button>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate("/login")}
                    className="px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base text-gray-600 hover:text-gray-900 rounded-lg hover:bg-white/50 transition-all"
                  >
                    Login
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => navigate("/register")}
                    className="px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
                  >
                    Register
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="py-12 sm:py-20 text-center"
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-gray-900 mb-6">
              Build Your Next Project{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Faster
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
              Create beautiful, responsive web applications with our intuitive
              drag-and-drop builder. Transform your ideas into reality without
              writing a single line of code.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 px-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/build")}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg transform transition-all text-base sm:text-lg font-medium shadow-lg"
              >
                Start Building For Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/login")}
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transform transition-all text-base sm:text-lg font-medium"
              >
                Sign In to Continue
              </motion.button>
            </div>
          </motion.div>
        </main>
      </section>

      {/* Features Section */}
      <section className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Everything you need to build amazing websites
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {/* Original three feature cards here */}
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 sm:p-8 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-200"
            >
              <div className="mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 w-12 sm:w-14 h-12 sm:h-14 rounded-lg flex items-center justify-center">
                <FaBolt className="text-xl sm:text-2xl text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                Lightning Fast
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Build and deploy your projects in minutes, not hours. Our
                streamlined workflow accelerates development.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 sm:p-8 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-200"
            >
              <div className="mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 w-12 sm:w-14 h-12 sm:h-14 rounded-lg flex items-center justify-center">
                <FaPalette className="text-xl sm:text-2xl text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                Fully Customizable
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Customize every aspect of your application with precision.
                Enterprise-grade flexibility at your fingertips.
              </p>
            </motion.div>
            <motion.div
              whileHover={{ y: -5 }}
              className="p-6 sm:p-8 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-200"
            >
              <div className="mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 w-12 sm:w-14 h-12 sm:h-14 rounded-lg flex items-center justify-center">
                <FaMobileAlt className="text-xl sm:text-2xl text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                Responsive Design
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Ensure consistent performance across all devices with
                enterprise-ready responsive layouts.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="min-h-screen bg-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Three simple steps to create your website
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="mb-6 mx-auto bg-blue-100 w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center">
                <FaRocket className="text-2xl sm:text-3xl text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                1. Choose Template
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Start with one of our professionally designed templates
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="mb-6 mx-auto bg-blue-100 w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center">
                <FaPalette className="text-2xl sm:text-3xl text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                2. Customize Design
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Modify colors, layouts, and content to match your brand
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="mb-6 mx-auto bg-blue-100 w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center">
                <FaRocket className="text-2xl sm:text-3xl text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4">
                3. Launch Website
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Publish your website with one click deployment
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Join thousands of satisfied customers
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-lg"
            >
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                "This platform has revolutionized how we build websites. The
                drag-and-drop interface is intuitive and the templates are
                beautiful."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full mr-4"></div>
                <div>
                  <h4 className="text-sm sm:text-base font-semibold">
                    Sarah Johnson
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Web Designer
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-6 sm:p-8 rounded-xl shadow-lg"
            >
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                "The speed at which we can now deploy websites is incredible.
                This tool has saved us countless development hours."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full mr-4"></div>
                <div>
                  <h4 className="text-sm sm:text-base font-semibold">
                    Mark Thompson
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Product Manager
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;

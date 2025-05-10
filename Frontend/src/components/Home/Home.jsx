import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/auth";
import { Link } from "react-router-dom";
import {
  FaRocket,
  FaLightbulb,
  FaCode,
  FaPalette,
  FaCog,
  FaStar,
  FaHeart,
  FaCompass,
  FaMap,
  FaLayerGroup,
  FaMobile,
  FaCloud,
  FaShieldAlt,
  FaBolt,
  FaUsers,
  FaBars,
  FaCheck,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  const isAuthenticated = getToken();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
      },
    },
  };

  const floatingIcons = [
    { icon: <FaRocket />, x: [-20, 20], y: [-20, 20], delay: 0 },
    { icon: <FaLightbulb />, x: [20, -20], y: [20, -20], delay: 0.2 },
    { icon: <FaCode />, x: [-30, 30], y: [30, -30], delay: 0.4 },
    { icon: <FaPalette />, x: [25, -25], y: [-25, 25], delay: 0.6 },
    { icon: <FaCog />, x: [-15, 15], y: [15, -15], delay: 0.8 },
    { icon: <FaCloud />, x: [30, -30], y: [-20, 20], delay: 1.0 },
  ];

  const features = [
    {
      icon: <FaLayerGroup className="text-blue-500 text-4xl" />,
      title: "Drag & Drop Builder",
      description: "Intuitive interface for effortless website creation",
    },
    {
      icon: <FaMobile className="text-indigo-500 text-4xl" />,
      title: "Responsive Design",
      description: "Perfect display on all devices and screen sizes",
    },
    {
      icon: <FaBolt className="text-yellow-500 text-4xl" />,
      title: "Lightning Fast",
      description: "Optimized performance for quick loading times",
    },
    {
      icon: <FaShieldAlt className="text-green-500 text-4xl" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security for your website",
    },
  ];

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <h2
                onClick={() => navigate("/")}
                className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent cursor-pointer"
              >
                WEBBUILD
              </h2>
            </motion.div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-blue-600"
              >
                <FaBars className="h-6 w-6" />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <motion.button
                whileHover={{ scale: 1.05, color: "#3B82F6" }}
                className="text-gray-600 font-medium cursor-pointer"
                onClick={() => scrollToSection("features")}
              >
                Features
              </motion.button>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl"
                  onClick={() => navigate("/dashboard")}
                >
                  Dashboard
                </motion.button>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-6 py-3 text-gray-600 hover:text-blue-600 font-medium"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl"
                    onClick={() => navigate("/register")}
                  >
                    Start Free
                  </motion.button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden py-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-left text-gray-600 font-medium hover:text-blue-600"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="text-left text-gray-600 font-medium hover:text-blue-600"
                >
                  Pricing
                </button>
                <button
                  onClick={() => scrollToSection("templates")}
                  className="text-left text-gray-600 font-medium hover:text-blue-600"
                >
                  Templates
                </button>
                {isAuthenticated ? (
                  <button
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium shadow-lg"
                    onClick={() => {
                      navigate("/dashboard");
                      setMobileMenuOpen(false);
                    }}
                  >
                    Dashboard
                  </button>
                ) : (
                  <>
                    <button
                      className="px-6 py-3 text-gray-600 hover:text-blue-600 font-medium"
                      onClick={() => {
                        navigate("/login");
                        setMobileMenuOpen(false);
                      }}
                    >
                      Sign In
                    </button>
                    <button
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium shadow-lg"
                      onClick={() => {
                        navigate("/register");
                        setMobileMenuOpen(false);
                      }}
                    >
                      Start Free
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-4xl mx-auto relative"
            variants={itemVariants}
          >
            {/* Hide floating icons on mobile */}
            <div className="hidden sm:block">
              {floatingIcons.map((icon, index) => (
                <motion.div
                  key={index}
                  className="absolute text-2xl text-blue-500"
                  animate={{
                    x: icon.x,
                    y: icon.y,
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 2,
                    delay: icon.delay,
                  }}
                  style={{
                    left: `${(index + 1) * 15}%`,
                    top: `${((index % 3) + 1) * 10}%`,
                  }}
                >
                  {icon.icon}
                </motion.div>
              ))}
            </div>

            <motion.h1
              className="text-4xl sm:text-6xl md:text-7xl font-extrabold mb-8"
              variants={itemVariants}
            >
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Build Stunning Websites
              </span>
              <br />
              <span className="text-gray-900">In Minutes</span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-gray-600 mb-12 px-4 sm:px-0"
              variants={itemVariants}
            >
              The most intuitive website builder for modern businesses. Create
              beautiful, responsive websites without writing a single line of
              code.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 px-4 sm:px-0"
              variants={itemVariants}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 sm:px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-lg font-medium shadow-lg hover:shadow-xl w-full sm:w-auto"
                onClick={() => navigate("/register")}
              >
                Start Building For Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-6 sm:px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-full text-lg font-medium hover:bg-blue-50 w-full sm:w-auto"
                onClick={() => navigate("/demo")}
              >
                Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-20 relative px-4 sm:px-0"
            variants={itemVariants}
          >
            <motion.div
              className="relative z-10 rounded-xl shadow-2xl overflow-hidden bg-gray-100 h-96"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>

            <motion.div
              className="absolute -bottom-10 right-5 sm:right-10 w-2/3 sm:w-1/2 rounded-xl shadow-2xl overflow-hidden border-4 border-white bg-gray-100 h-64"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            ></motion.div>
          </motion.div>

          <motion.div
            id="features"
            className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Detailed Features Section */}
          <motion.div
            className="mt-32 px-4 sm:px-0"
            variants={containerVariants}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-center mb-16"
              variants={itemVariants}
            >
              Powerful Features for Modern Websites
            </motion.h2>

            {/* Feature Detail 1 */}
            <motion.div
              className="flex flex-col md:flex-row items-center gap-12 mb-24"
              variants={itemVariants}
            >
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4">
                  Advanced Customization Tools
                </h3>
                <p className="text-gray-600 mb-6">
                  Take full control of your website's appearance with our
                  advanced customization tools. Modify colors, fonts, layouts,
                  and more with our intuitive interface.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-green-500" />
                    <span>Custom color schemes and typography</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-green-500" />
                    <span>Flexible layout options</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-green-500" />
                    <span>Advanced animation controls</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2">
                <div className="rounded-lg shadow-xl bg-gray-100 h-64"></div>
              </div>
            </motion.div>

            {/* Feature Detail 2 */}
            <motion.div
              className="flex flex-col md:flex-row-reverse items-center gap-12 mb-24"
              variants={itemVariants}
            >
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4">Project Manager</h3>
                <p className="text-gray-600 mb-6">
                  Efficiently manage your website projects with our
                  comprehensive project management tools. Track progress,
                  collaborate with team members, and meet deadlines effectively.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-green-500" />
                    <span>Task tracking and management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-green-500" />
                    <span>Team collaboration tools</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-green-500" />
                    <span>Progress monitoring</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2">
                <div className="rounded-lg shadow-xl bg-gray-100 h-64"></div>
              </div>
            </motion.div>

            {/* Feature Detail 3 */}
            <motion.div
              className="flex flex-col md:flex-row items-center gap-12"
              variants={itemVariants}
            >
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4">
                  Professional Templates
                </h3>
                <p className="text-gray-600 mb-6">
                  Choose from our extensive collection of professionally
                  designed templates to kickstart your website creation process.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-green-500" />
                    <span>Industry-specific designs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-green-500" />
                    <span>Customizable templates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheck className="text-green-500" />
                    <span>Regular template updates</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2">
                <div className="rounded-lg shadow-xl bg-gray-100 h-64"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Home;

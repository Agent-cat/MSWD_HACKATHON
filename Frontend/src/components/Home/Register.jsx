import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaImage, FaSpinner } from "react-icons/fa";
import { useToast } from "../../contexts/ToastContext";

function Register() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    profilePicture: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");
  const url = process.env.BACKEND_URL || "https://mswd-hackathon.onrender.com";

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || "midland_property"
      );

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/vishnu2005/image/upload`,
          formData
        );
        const imageUrl = response.data.secure_url;
        setFormData((prev) => ({
          ...prev,
          profilePicture: imageUrl,
        }));
        setImagePreview(imageUrl);
      } catch (err) {
        console.error("Image upload error:", err);
        setError("Failed to upload image");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.email) {
      setError("Email is required");
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${url}/api/v1/auth/send-otp`, {
        email: formData.email,
      });
      setShowOtpInput(true);
      setError("");
      showToast("OTP sent successfully! Please check your email.", "success");
    } catch (err) {
      console.error("OTP send error:", err);
      setError(
        err.response?.data?.message || "Failed to send OTP. Please try again."
      );
      showToast("Failed to send OTP. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.profilePicture) {
      setError("Please upload a profile picture");
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${url}/api/v1/auth/verify-register`, {
        ...formData,
        otp,
      });
      showToast(
        "Registration successful! Please login to continue.",
        "success"
      );
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "An error occurred");
      showToast(err.response?.data?.message || "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg space-y-8">
        <div>
          <h2 className="text-center text-4xl font-extrabold text-gray-900 tracking-tight">
            REGISTER
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Create an account to start building projects
          </p>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={showOtpInput ? handleSubmit : handleSendOtp}
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <FaUser className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                required
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Username"
              />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Email address"
              />
            </div>
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Password"
              />
            </div>
          </div>

          {showOtpInput ? (
            <div className="relative">
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter OTP"
              />
            </div>
          ) : null}

          <div className="flex flex-col items-center justify-center space-y-4">
            {imagePreview ? (
              <div className="relative group">
                <img
                  src={imagePreview}
                  alt="Profile preview"
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-50"
                />
                <div className="absolute inset-0 rounded-full bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <label className="cursor-pointer">
                    <FaImage className="text-white text-xl" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            ) : (
              <label className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center cursor-pointer hover:bg-blue-100 transition-colors">
                <FaImage className="text-blue-500 text-2xl" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
            <p className="text-sm text-gray-500">
              Upload profile picture (required)
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {loading ? (
              <FaSpinner className="animate-spin mr-2" />
            ) : showOtpInput ? (
              "Verify & Create Account"
            ) : (
              "Send OTP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;

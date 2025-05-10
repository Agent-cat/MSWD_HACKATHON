import { useState, useEffect } from "react";
import api from "../../utils/api";
import {
  FaCamera,
  FaEdit,
  FaArrowLeft,
  FaCog,
  FaProjectDiagram,
  FaClone,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    projects: 0,
    templates: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userResponse, projectsResponse] = await Promise.all([
          api.get("/auth/me"),
          api.get("/projects/user"),
        ]);

        setUser(userResponse.data);
        setStats((prev) => ({
          ...prev,
          projects: projectsResponse.data.length || 0,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors mr-4"
          >
            <FaArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="bg-white rounded-xl shadow-sm p-6 lg:col-span-1">
            <div className="flex flex-col items-center">
              <div className="relative group mb-6">
                <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-blue-50">
                  <img
                    src={
                      user?.profilePicture || "https://via.placeholder.com/160"
                    }
                    alt={user?.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => navigate("/settings")}
                  className="absolute bottom-2 right-2 p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg"
                >
                  <FaEdit className="w-5 h-5" />
                </button>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {user?.username}
              </h2>
              <p className="text-gray-500 mb-6">{user?.email}</p>

              <button
                onClick={() => navigate("/settings")}
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FaCog className="mr-2" />
                Edit Profile
              </button>
            </div>
          </div>

          
          <div className="lg:col-span-2 space-y-8">
           
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div
                onClick={() => navigate("/projects")}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FaProjectDiagram className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-3xl font-bold text-blue-600">
                    {stats.projects}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Projects
                </h3>
                <p className="text-gray-500">
                  Active projects you're working on
                </p>
              </div>

              <div
                onClick={() => navigate("/templates")}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <FaClone className="w-6 h-6 text-indigo-600" />
                  </div>
                  <span className="text-3xl font-bold text-indigo-600">
                    {stats.templates}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Templates
                </h3>
                <p className="text-gray-500">Reusable design templates</p>
              </div>
            </div>

           
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Recent Activity
              </h3>
              <div className="text-gray-500 text-center py-8">
                No recent activity to show
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

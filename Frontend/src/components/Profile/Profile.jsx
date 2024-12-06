import { useState, useEffect } from "react";
import api from "../../utils/api";
import { FaCamera, FaEdit, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/auth/me");
        setUser(response.data);
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
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-10 p-2 rounded-full bg-white shadow-md text-gray-700 hover:bg-gray-100 transition-colors md:absolute"
      >
        <FaArrowLeft className="w-5 h-5" />
      </button>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Cover Photo Section */}
          <div className="relative h-40 sm:h-56 md:h-72 bg-gradient-to-r from-blue-600 to-purple-600">
            <button className="absolute bottom-4 right-4 p-3 rounded-full bg-black/30 text-white hover:bg-black/40 transition-colors">
              <FaCamera className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Profile Info Section */}
          <div className="relative px-4 sm:px-8 pb-8">
            {/* Profile Picture */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 sm:left-8 sm:transform-none">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white bg-white">
                  <img
                    src={
                      user?.profilePicture || "https://via.placeholder.com/128"
                    }
                    alt={user?.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                  <FaCamera className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* User Info */}
            <div className="pt-20 sm:pt-24">
              <div className="flex flex-col items-center sm:items-start">
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {user?.username}
                  </h1>
                  <p className="text-base sm:text-lg text-gray-500 mt-1">
                    {user?.email}
                  </p>
                </div>
                <button className="mt-4 w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  <FaEdit className="mr-2 h-4 w-4" />
                  Edit Profile
                </button>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="bg-gray-50 p-4 rounded-xl text-center hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm font-medium text-gray-500">
                    Projects
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm font-medium text-gray-500">
                    Templates
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm font-medium text-gray-500">
                    Following
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="text-2xl font-bold text-gray-900">0</div>
                  <div className="text-sm font-medium text-gray-500">
                    Followers
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900">About</h2>
                <p className="mt-3 text-gray-600 text-base leading-relaxed">
                  {user?.bio || "No bio added yet."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

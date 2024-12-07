import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileSettings from "./SettingsTabs/ProfileSettings";
import SecuritySettings from "./SettingsTabs/SecuritySettings";
import { FaUser, FaShieldAlt, FaArrowLeft } from "react-icons/fa";

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      icon: <FaUser className="w-5 h-5" />,
      component: <ProfileSettings />,
    },
    {
      id: "security",
      label: "Security",
      icon: <FaShieldAlt className="w-5 h-5" />,
      component: <SecuritySettings />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <FaArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Tabs Header */}
          <div className="border-b">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative
                    ${
                      activeTab === tab.id
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {tabs.find((tab) => tab.id === activeTab)?.component}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;

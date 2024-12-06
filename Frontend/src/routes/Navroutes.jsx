import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/Home/Home";
import BuilderApp from "../components/Builder/BuilderApp";
import Login from "../components/Home/Login";
import Register from "../components/Home/Register";
import Profile from "../components/Profile/Profile";
import Settings from "../components/Profile/Settings";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { getToken } from "../utils/auth";
import ProjectSelectionScreen from "../components/ProjectManager/ProjectSelectionScreen";
import TemplateGallery from "../components/Templates/TemplateGallery";

const Navroutes = () => {
  return (
    <Routes>
      {/* Public Routes - Accessible to everyone */}
      <Route path="/" element={<Home />} />

      {/* Public Routes - Accessible only when not logged in */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected Routes - Accessible only when logged in */}
      <Route element={<PrivateRoute />}>
        <Route path="/projects" element={<ProjectSelectionScreen />} />
        <Route path="/build" element={<BuilderApp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/templates" element={<TemplateGallery />} />
      </Route>

      {/* Catch all route - Redirect based on auth status */}
      <Route
        path="*"
        element={
          getToken() ? (
            <Navigate to="/projects" replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
};

export default Navroutes;

import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../utils/auth";

const PublicRoute = () => {
  const token = getToken();

  if (token) {
    return <Navigate to="/build" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;

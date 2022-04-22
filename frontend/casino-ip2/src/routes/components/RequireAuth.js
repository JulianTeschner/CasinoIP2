import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  const logout = async () => {
    localStorage.clear("accessToken");
  };

  if (localStorage.getItem("accessToken")) {
    return children;
  } else {
    logout();
  }

  return <Navigate to="/public/login" state={{ from: location }} />;
}
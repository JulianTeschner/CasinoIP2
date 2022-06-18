import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute( {children}:any ) {
  const location = useLocation();

  const logout = async () => {
    localStorage.removeItem("accessToken");
  };

  if (localStorage.getItem("accessToken")) {
    return children;
  } else {
    logout();
  }

  return <Navigate to="/public/home" state={{ from: location }} />;
}
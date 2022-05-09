import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ isLoggedIn, children }) {
    const location = useLocation();

    const logout = async () => {
        //TODO implement logout
        console.log("logged out");
    };

    if(isLoggedIn) {
        return children;
    } else {
        logout();
    }
    
    return <Navigate to="/public/home" state={{ from: location }} />;
}
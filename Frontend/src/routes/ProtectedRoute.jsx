import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { authUser, loading } = useContext(AuthContext);

  // Wait for auth state to load (VERY IMPORTANT)
  // While checking auth, show the page behind + small loader on top

  // If no user, redirect to login
  if (!authUser) return <Navigate to="/login" />;

  // If user is logged in, show the page
  return children;
};

export default ProtectedRoute;

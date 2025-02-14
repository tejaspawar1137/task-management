import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";


const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <Loader />;

  return currentUser ? children : <Navigate to="/auth" replace />;
};

export default PrivateRoute;

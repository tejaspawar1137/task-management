import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";
const PrivateRoute = ({ children }) => {
    const { currentUser, loading } = useAuth();
    if (loading)
        return _jsx(Loader, {});
    return currentUser ? children : _jsx(Navigate, { to: "/auth", replace: true });
};
export default PrivateRoute;

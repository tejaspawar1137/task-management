import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
import Header from "./components/Header";
import PrivateRoute from "./routes/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";
import Loader from "./components/Loader";
const AuthPage = lazy(() => import("./pages/AuthPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const App = () => {
    return (_jsx(AuthProvider, { children: _jsxs(Router, { children: [_jsx(Header, {}), _jsx(Suspense, { fallback: _jsx(Loader, {}), children: _jsxs(Routes, { children: [_jsx(Route, { path: "/auth", element: _jsx(AuthPage, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(PrivateRoute, { children: _jsx(Suspense, { fallback: _jsx(Loader, {}), children: _jsx(Dashboard, {}) }) }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/auth" }) })] }) })] }) }));
};
export default App;

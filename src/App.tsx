import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import PrivateRoute from "./routes/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";
import Loader from "./components/Loader";

const AuthPage = lazy(() => import("./pages/AuthPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                   <Suspense fallback={<Loader />}>
                    <Dashboard />
                   </Suspense>
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/auth" />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;


import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";

function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate();

  function handleLoginSuccess() {
    onLoginSuccess();
    navigate("/dashboard");
  }

  return (
    <Login
      onLoginSuccess={handleLoginSuccess}
      onGoToRegister={() => navigate("/register")}
    />
  );
}

function RegisterPage() {
  const navigate = useNavigate();

  return (
    <Register onGoToLogin={() => navigate("/")} />
  );
}

function AppRoutes() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("token"))
  );

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />
          )
        }
      />

      <Route
        path="/register"
        element={
          isLoggedIn ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <RegisterPage />
          )
        }
      />

      <Route
        path="/dashboard"
        element={
          isLoggedIn ? (
            <Dashboard onLogout={handleLogout} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
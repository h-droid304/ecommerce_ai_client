import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import CheckoutPage from "./pages/CheckoutPage";

function ProtectedRoute({ children }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" replace />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/about"
        element={<AboutPage theme={theme} onToggleTheme={toggleTheme} />}
      />
      <Route
        path="/landing"
        element={
          <ProtectedRoute>
            <LandingPage theme={theme} onToggleTheme={toggleTheme} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage theme={theme} onToggleTheme={toggleTheme} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  );
}

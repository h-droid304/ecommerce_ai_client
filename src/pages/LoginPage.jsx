import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginHint = useMemo(() => {
    if (location.state?.fromSignup) {
      return "Signup successful. Please login to continue.";
    }
    return "Welcome back. Login to continue your shopping journey.";
  }, [location.state]);

  const onSubmit = (event) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find((user) => user.email === email && user.password === password);

    if (!foundUser) {
      setError("Invalid email or password.");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    setError("");
    navigate("/landing", { replace: true });
  };

  return (
    <div className="login-page">
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <h1>Login</h1>
        <p className="login-subtitle">{loginHint}</p>

        <form className="login-form" onSubmit={onSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Your password"
          />

          {error && <p className="login-error">{error}</p>}

          <motion.button
            type="submit"
            className="login-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Login
          </motion.button>
        </form>

        <p className="login-footer-text">
          New to NovaCart? <Link to="/signup">Create an account</Link>
        </p>
      </motion.div>
    </div>
  );
}

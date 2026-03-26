import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/SignupPage.css";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phoneNumber: "",
};

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword, phoneNumber } = formData;
    if (!name || !email || !password || !confirmPassword || !phoneNumber) {
      return "Please fill all fields.";
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return "Please enter a valid email address.";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }

    if (password !== confirmPassword) {
      return "Password and confirm password do not match.";
    }

    if (!/^\d{10,15}$/.test(phoneNumber)) {
      return "Phone number should contain 10 to 15 digits only.";
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const emailExists = users.some((user) => user.email === email);

    if (emailExists) {
      return "This email is already registered. Please login.";
    }

    return "";
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const { confirmPassword, ...userData } = formData;

    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));

    setError("");
    setFormData(initialState);
    navigate("/login", {
      replace: true,
      state: { email: userData.email, fromSignup: true },
    });
  };

  return (
    <div className="signup-page">
      <motion.div
        className="signup-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="signup-title-wrap">
          <h1>Create Account</h1>
          <p>Join NovaCart and unlock curated drops every week.</p>
        </div>

        <form className="signup-form" onSubmit={onSubmit}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={onInputChange}
            placeholder="Your full name"
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={onInputChange}
            placeholder="you@example.com"
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={onInputChange}
            placeholder="Minimum 6 characters"
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={onInputChange}
            placeholder="Retype your password"
          />

          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={onInputChange}
            placeholder="10 to 15 digits"
          />

          {error && <p className="signup-error">{error}</p>}

          <motion.button
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            className="signup-btn"
          >
            Signup
          </motion.button>
        </form>

        <p className="signup-footer-text">
          Already have an account? <Link to="/login">Login now</Link>
        </p>
      </motion.div>
    </div>
  );
}

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/AboutPage.css";

const values = [
  {
    title: "Curated Quality",
    text: "Every item is selected with a design-first lens so your cart is always intentional.",
  },
  {
    title: "Fast Experience",
    text: "From browsing to checkout, every interaction is crafted to feel immediate and smooth.",
  },
  {
    title: "Transparent Pricing",
    text: "No hidden charges and no confusing surprises. What you see is exactly what you pay.",
  },
];

export default function AboutPage({ theme, onToggleTheme }) {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  return (
    <div className="about-page">
      <header className="about-header">
        <h1>About NovaCart</h1>
        <div className="about-header-actions">
          <button className="theme-toggle" onClick={onToggleTheme}>
            {theme === "light" ? "Dark" : "Light"} mode
          </button>
          {currentUser ? (
            <button className="app-link-btn" onClick={() => navigate("/landing")}>
              Back to Shop
            </button>
          ) : (
            <button className="app-link-btn" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </div>
      </header>

      <motion.section
        className="about-hero"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="about-tag">Our Story</p>
        <h2>We build ecommerce for people who care about taste and speed.</h2>
        <p>
          NovaCart started with one mission: make online shopping feel premium, calm, and dynamic.
          We combine smart curation with a delightful interface so every session feels effortless.
        </p>
      </motion.section>

      <section className="about-values-grid">
        {values.map((value, index) => (
          <motion.article
            key={value.title}
            className="about-value-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
          >
            <h3>{value.title}</h3>
            <p>{value.text}</p>
          </motion.article>
        ))}
      </section>

      <motion.section
        className="about-cta"
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <h3>Ready to explore the collection?</h3>
        <p>Jump back into NovaCart and continue your shopping journey.</p>
        <button
          className="about-primary-btn"
          onClick={() => navigate(currentUser ? "/landing" : "/signup")}
        >
          {currentUser ? "Go to Landing" : "Create Account"}
        </button>
      </motion.section>
    </div>
  );
}

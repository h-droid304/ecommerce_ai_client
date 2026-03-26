import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";

const productData = [
  { id: 1, name: "AeroKnit Runner", price: 89, rating: 4.8, category: "Footwear", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80" },
  { id: 2, name: "Nova Smartwatch", price: 199, rating: 4.7, category: "Tech", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80" },
  { id: 3, name: "Sculpt Desk Lamp", price: 59, rating: 4.6, category: "Home", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80" },
  { id: 4, name: "Urban Utility Bag", price: 72, rating: 4.9, category: "Accessories", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80" },
  { id: 5, name: "Pulse Gaming Headset", price: 129, rating: 4.8, category: "Tech", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80" },
  { id: 6, name: "Clay Pour Mug Set", price: 44, rating: 4.5, category: "Home", image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?auto=format&fit=crop&w=800&q=80" },
];

const testimonials = [
  { id: 1, quote: "The checkout flow is so smooth and the product curation is genuinely premium.", author: "Nina, Mumbai" },
  { id: 2, quote: "I discovered three new brands here. The landing experience feels alive.", author: "Rohan, Pune" },
  { id: 3, quote: "Fast shipping and better prices than expected. I keep coming back.", author: "Isha, Bengaluru" },
];

const categories = ["All", "Tech", "Home", "Footwear", "Accessories"];

function getCountdown(endDate) {
  const diff = endDate.getTime() - Date.now();
  if (diff <= 0) {
    return { hours: "00", minutes: "00", seconds: "00" };
  }

  const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0");
  const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
  const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
  return { hours, minutes, seconds };
}

export default function LandingPage({ theme, onToggleTheme }) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [likedItems, setLikedItems] = useState([]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [dealEndsAt] = useState(() => new Date(Date.now() + 9 * 60 * 60 * 1000));
  const [timer, setTimer] = useState(getCountdown(dealEndsAt));

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  useEffect(() => {
    if (!currentUser) {
      navigate("/login", { replace: true });
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(getCountdown(dealEndsAt));
    }, 1000);
    return () => clearInterval(interval);
  }, [dealEndsAt]);

  const filteredProducts = useMemo(() => {
    return productData.filter((product) => {
      const categoryMatch = selectedCategory === "All" || product.category === selectedCategory;
      const textMatch = product.name.toLowerCase().includes(search.toLowerCase());
      return categoryMatch && textMatch;
    });
  }, [selectedCategory, search]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const featuredProduct = filteredProducts[0] || productData[0];

  const handleLike = (productId) => {
    setLikedItems((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login", { replace: true });
  };

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
  };

  const handleGoToCheckout = () => {
    navigate("/checkout", {
      state: {
        cartItems,
        subtotal,
      },
    });
  };

  return (
    <div className="landing-page">
      <header className="lp-header">
        <div className="lp-brand">NovaCart</div>
        <div className="lp-header-right">
          <button className="app-link-btn" onClick={() => navigate("/about")}>About</button>
          <button className="app-link-btn" onClick={handleGoToCheckout}>
            Checkout ({cartCount})
          </button>
          <button className="theme-toggle" onClick={onToggleTheme}>
            {theme === "light" ? "Dark" : "Light"} mode
          </button>
          <p className="lp-greeting">Hi, {currentUser?.name || "Shopper"}</p>
          <button className="lp-outline-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <section className="lp-hero">
        <div className="lp-hero-bg-shape lp-shape-1" />
        <div className="lp-hero-bg-shape lp-shape-2" />
        <motion.div
          className="lp-hero-copy"
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1>Shop what is next.</h1>
          <p>
            Discover curated technology, lifestyle, and design products with a seamless,
            animated shopping experience.
          </p>
          <div className="lp-metrics">
            <div>
              <h3>1.2K+</h3>
              <p>Products</p>
            </div>
            <div>
              <h3>98%</h3>
              <p>Happy Buyers</p>
            </div>
            <div>
              <h3>{cartCount}</h3>
              <p>Cart Items</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="lp-featured-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <img src={featuredProduct.image} alt={featuredProduct.name} />
          <div className="lp-featured-content">
            <h3>{featuredProduct.name}</h3>
            <p>Featured pick in {featuredProduct.category}</p>
            <button
              onClick={() => handleAddToCart(featuredProduct)}
              className="lp-primary-btn"
            >
              Add to cart - ${featuredProduct.price}
            </button>
          </div>
        </motion.div>
      </section>

      <section className="lp-toolbar">
        <input
          className="lp-search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search products..."
        />
        <div className="lp-category-row">
          {categories.map((category) => (
            <button
              key={category}
              className={`lp-category-chip ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="lp-grid">
        {filteredProducts.map((product, index) => (
          <motion.article
            className="lp-product-card"
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <div className="lp-image-wrap">
              <img src={product.image} alt={product.name} />
              <button
                className={`lp-like-btn ${likedItems.includes(product.id) ? "liked" : ""}`}
                onClick={() => handleLike(product.id)}
              >
                {likedItems.includes(product.id) ? "♥" : "♡"}
              </button>
            </div>
            <div className="lp-product-meta">
              <p className="lp-product-category">{product.category}</p>
              <h4>{product.name}</h4>
              <p className="lp-product-price">${product.price}</p>
              <div className="lp-product-footer">
                <span>{product.rating} ★</span>
                <button onClick={() => handleAddToCart(product)}>Add</button>
              </div>
            </div>
          </motion.article>
        ))}
      </section>

      <section className="lp-deal-strip">
        <div>
          <p className="lp-deal-title">Flash Deal Ends In</p>
          <h3>
            {timer.hours}:{timer.minutes}:{timer.seconds}
          </h3>
        </div>
        <div className="lp-deal-actions">
          <span>Subtotal: ${subtotal.toFixed(2)}</span>
          <button className="lp-primary-btn" onClick={handleGoToCheckout}>
            Go to checkout
          </button>
        </div>
      </section>

      <section className="lp-testimonial-wrap">
        <p className="lp-testimonial-label">What shoppers say</p>
        <AnimatePresence mode="wait">
          <motion.div
            key={testimonials[testimonialIndex].id}
            className="lp-testimonial"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35 }}
          >
            <h4>{testimonials[testimonialIndex].quote}</h4>
            <p>{testimonials[testimonialIndex].author}</p>
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/CheckoutPage.css";

export default function CheckoutPage({ theme, onToggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    pincode: "",
    cardNumber: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const shipping = cartItems.length ? 12 : 0;
  const total = subtotal + shipping;

  const isFormValid =
    formData.fullName &&
    formData.address &&
    formData.city &&
    formData.pincode &&
    formData.cardNumber &&
    cartItems.length > 0;

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onPlaceOrder = (event) => {
    event.preventDefault();
    if (!isFormValid) {
      return;
    }
    setOrderPlaced(true);
  };

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <h1>Checkout</h1>
        <div className="checkout-header-actions">
          <button className="theme-toggle" onClick={onToggleTheme}>
            {theme === "light" ? "Dark" : "Light"} mode
          </button>
          <button className="app-link-btn" onClick={() => navigate("/about")}>
            About
          </button>
          <button className="app-link-btn" onClick={() => navigate("/landing")}>
            Continue shopping
          </button>
        </div>
      </header>

      <div className="checkout-layout">
        <motion.section
          className="checkout-panel"
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
        >
          <h2>Order Summary</h2>
          {cartItems.length === 0 ? (
            <div className="checkout-empty">
              <p>Your cart is empty right now.</p>
              <p>Add products from Landing to continue checkout.</p>
              <button className="checkout-action-btn" onClick={() => navigate("/landing")}>
                Back to Landing
              </button>
            </div>
          ) : (
            <>
              <div className="checkout-list">
                {cartItems.map((item) => (
                  <article key={item.id} className="checkout-item">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <h4>{item.name}</h4>
                      <p>
                        Qty: {item.quantity} x ${item.price}
                      </p>
                    </div>
                    <strong>${(item.quantity * item.price).toFixed(2)}</strong>
                  </article>
                ))}
              </div>
              <div className="checkout-totals">
                <p>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </p>
                <p>
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </p>
                <p className="checkout-total-line">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </p>
              </div>
            </>
          )}
        </motion.section>

        <motion.form
          className="checkout-panel"
          onSubmit={onPlaceOrder}
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.08 }}
        >
          <h2>Shipping & Payment</h2>
          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" name="fullName" value={formData.fullName} onChange={onInputChange} />

          <label htmlFor="address">Address</label>
          <input id="address" name="address" value={formData.address} onChange={onInputChange} />

          <label htmlFor="city">City</label>
          <input id="city" name="city" value={formData.city} onChange={onInputChange} />

          <label htmlFor="pincode">Pincode</label>
          <input id="pincode" name="pincode" value={formData.pincode} onChange={onInputChange} />

          <label htmlFor="cardNumber">Card Number</label>
          <input
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={onInputChange}
            placeholder="1234 5678 9012 3456"
          />

          <button type="submit" className="checkout-action-btn" disabled={!isFormValid}>
            Place order
          </button>

          {orderPlaced && (
            <p className="checkout-success">Order placed successfully. This is a frontend demo flow.</p>
          )}
        </motion.form>
      </div>
    </div>
  );
}

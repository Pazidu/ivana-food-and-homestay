import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import cartbg from "../../../assets/cart-bg2.jpg";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [guestData, setGuestData] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const navigate = useNavigate();

  // Fetch cart items and user info
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      // Logged in
      Promise.all([
        axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`http://localhost:5000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])
        .then(([cartRes, userRes]) => {
          setCartItems(cartRes.data);
          setUser(userRes.data);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          alert("Failed to load cart.");
        });
    } else {
      // Guest
      setIsGuest(true);
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      setCartItems(guestCart);
    }
  }, []);

  // Remove item
  const removeItem = (id) => {
    if (isGuest) {
      const updatedCart = cartItems.filter((_, idx) => idx !== id);
      setCartItems(updatedCart);
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
    } else {
      const token = localStorage.getItem("token");
      axios
        .delete(`http://localhost:5000/api/cart/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => setCartItems(cartItems.filter((item) => item.id !== id)))
        .catch((err) => {
          console.error("Error removing item:", err);
          alert("Failed to remove item");
        });
    }
  };

  // Update quantity
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    if (isGuest) {
      const updatedCart = cartItems.map((item, idx) =>
        idx === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCart);
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
    } else {
      const token = localStorage.getItem("token");
      axios
        .put(
          `http://localhost:5000/api/cart/${itemId}`,
          { quantity: newQuantity },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          setCartItems((prev) =>
            prev.map((item) =>
              item.id === itemId
                ? { ...item, quantity: res.data.quantity }
                : item
            )
          );
        })
        .catch((err) => {
          console.error("Error updating quantity:", err);
          alert("Failed to update quantity");
        });
    }
  };

  // Subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.unit_price || item.price) * item.quantity,
    0
  );

  // Checkout
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (isGuest) {
      setShowGuestForm(true); // open modal
    } else {
      // logged in
      const orderData = {
        userName: user.username,
        address: user.address,
        phone: user.phone,
        items: cartItems,
        totalPrice: subtotal,
      };
      localStorage.setItem("pendingOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  // Guest form submit
  const handleGuestSubmit = (e) => {
    e.preventDefault();
    if (!guestData.name || !guestData.address || !guestData.phone) {
      alert("Please fill all fields!");
      return;
    }
    const normalizedItems = cartItems.map((item, idx) => ({
      id: item.id || idx + 1, // generate an id if not present
      item_id: item.item_id || item.id || idx + 1,
      item_name: item.item_name || item.name,
      description: item.description || "",
      unit_price: item.unit_price || item.price || 0,
      quantity: item.quantity,
    }));
    const orderData = {
      userName: guestData.name,
      address: guestData.address,
      phone: guestData.phone,
      items: normalizedItems,
      totalPrice: subtotal,
    };

    localStorage.setItem("pendingOrder", JSON.stringify(orderData));
    setShowGuestForm(false);
    navigate("/payment");
  };

  return (
    <>
      <Navbar name={user ? user.username : "GUEST"} />

      <h1 className="cart-title">Cart</h1>
      <div
        className="cart-background"
        style={{ backgroundImage: `url(${cartbg})` }}
      />

      <div className="cart-container">
        {/* cart table */}
        <table className="cart-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Item Name</th>
              <th>Description</th>
              <th>Unit Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, idx) => (
              <tr key={isGuest ? idx : item.id}>
                <td>{idx + 1}</td>
                <td>{item.item_name || item.name}</td>
                <td>{item.description}</td>
                <td>{(item.unit_price || item.price).toFixed(2)}</td>
                <td>
                  <input
                    className="qty-input"
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(
                        isGuest ? idx : item.id,
                        parseInt(e.target.value)
                      )
                    }
                  />
                </td>
                <td>
                  {((item.unit_price || item.price) * item.quantity).toFixed(2)}
                </td>
                <td>
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(isGuest ? idx : item.id)}
                  >
                    &times;
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="5" className="subtotal-label">
                Subtotal
              </td>
              <td className="subtotal-value">{subtotal.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div className="checkout-container">
          <button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>

      {/* Guest Modal */}
      {showGuestForm && (
        <div className="modal-overlay">
          <div className="guest-form">
            <h2 className="guest-title">Guest Checkout</h2>
            <form className="guest-form-fields" onSubmit={handleGuestSubmit}>
              <input
                className="guest-input"
                type="text"
                placeholder="Name"
                value={guestData.name}
                onChange={(e) =>
                  setGuestData({ ...guestData, name: e.target.value })
                }
                required
              />
              <input
                className="guest-input"
                type="text"
                placeholder="Address"
                value={guestData.address}
                onChange={(e) =>
                  setGuestData({ ...guestData, address: e.target.value })
                }
                required
              />
              <input
                className="guest-input"
                type="text"
                placeholder="Phone"
                value={guestData.phone}
                onChange={(e) =>
                  setGuestData({ ...guestData, phone: e.target.value })
                }
                required
              />
              <div className="guest-form-buttons">
                <button className="guest-submit" type="submit">
                  Proceed to Payment
                </button>
                <button
                  className="guest-cancel"
                  type="button"
                  onClick={() => setShowGuestForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Cart;

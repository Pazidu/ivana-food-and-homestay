import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import cartbg from "../../../assets/cart-bg2.jpg";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(res.data);
      } catch (err) {
        console.error("Error fetching cart:", err);
        alert("Failed to load cart. Please login again.");
      }
    };
    fetchCart();
  }, []);

  // Remove cart item
  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(cartItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error removing item:", err);
      alert("Failed to remove item");
    }
  };

  // Subtotal calculation
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0
  );

  // Checkout: save order temporarily and redirect to payment
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Prepare order data (replace dummy info with actual user info if available)
    const orderData = {
      userName: "Guest User",
      address: "No.123, Main Street",
      phone: "0712345678",
      items: cartItems,
      totalPrice: subtotal,
    };

    // Save order temporarily in localStorage
    localStorage.setItem("pendingOrder", JSON.stringify(orderData));

    // Redirect to payment page
    navigate("/payment");
  };

  return (
    <>
      <Navbar name="USER" />
      <h1>Cart</h1>
      <div
        className="cart-background"
        style={{
          backgroundImage: `url(${cartbg})`,
        }}
      />
      <div className="cart-container">
        <table className="cartTable">
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>No</th>
              <th style={{ textAlign: "center" }}>Item Name</th>
              <th style={{ textAlign: "center" }}>Description</th>
              <th style={{ textAlign: "right" }}>Unit Price</th>
              <th style={{ textAlign: "center" }}>Quantity</th>
              <th style={{ textAlign: "right" }}>Total Price</th>
              <th style={{ textAlign: "center" }}>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, idx) => (
              <tr key={item.id}>
                <td style={{ padding: "12px" }}>{idx + 1}</td>
                <td style={{ padding: "12px" }}>{item.item_name}</td>
                <td style={{ padding: "12px" }}>{item.description}</td>
                <td style={{ padding: "12px", textAlign: "right" }}>
                  {item.unit_price.toFixed(2)}
                </td>
                <td style={{ padding: "12px" }}>{item.quantity}</td>
                <td style={{ padding: "12px", textAlign: "right" }}>
                  {(item.unit_price * item.quantity).toFixed(2)}
                </td>
                <td style={{ padding: "12px", textAlign: "center" }}>
                  <button
                    className="remove-button"
                    title="Remove item"
                    onClick={() => removeItem(item.id)}
                  >
                    &times;
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td
                colSpan="5"
                className="subtotal-label"
                style={{ textAlign: "right", padding: "12px" }}
              >
                Subtotal
              </td>
              <td
                className="subtotal-label"
                style={{ padding: "12px", textAlign: "right" }}
              >
                {subtotal.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="checkout-container">
          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;

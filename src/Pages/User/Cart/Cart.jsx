import React from "react";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import "./Cart.css";
import { Link } from "react-router-dom";
import cartbg from "../../../assets/cart-bg2.jpg"; // Adjust the path as necessary

function Cart() {
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
            {/* Example cart items, replace with dynamic data */}
            {[
              {
                id: 1,
                name: "Chicken Rice",
                description: "Normal",
                unitPrice: 850,
                quantity: 2,
              },
              {
                id: 2,
                name: "Egg Nasi Kottu",
                description: "Full",
                unitPrice: 1800,
                quantity: 1,
              },
            ].map((item, idx) => (
              <tr key={item.id}>
                <td style={{ padding: "12px" }}>{idx + 1}</td>
                <td style={{ padding: "12px" }}>{item.name}</td>
                <td style={{ padding: "12px" }}>{item.description}</td>
                <td style={{ padding: "12px", textAlign: "right" }}>
                  {item.unitPrice.toFixed(2)}
                </td>
                <td style={{ padding: "12px" }}>{item.quantity}</td>
                <td style={{ padding: "12px", textAlign: "right" }}>
                  {(item.unitPrice * item.quantity).toFixed(2)}
                </td>
                <td style={{ padding: "12px", textAlign: "center" }}>
                  <button className="remove-button" title="Remove item">
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
                {(850 * 2 + 1800 * 1).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="checkout-container">
          <Link to="/payment" className="checkout-link">
            <button className="checkout-button">Checkout</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cart;

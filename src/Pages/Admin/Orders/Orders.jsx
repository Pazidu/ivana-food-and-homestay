import React, { useEffect, useState } from "react";
import "./Orders.css";
import Footer from "../../../Components/Footer/Footer";
import AdminNavbar from "../../../Components/AdminNavbar/AdminNavbar";

function OrdersList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from backend
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  const handleComplete = async (orderId) => {
    try {
      await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: "DELETE",
      });
      setOrders(orders.filter((order) => order.id !== orderId)); // ✅ use id
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="orders">
      {/* <h2 className="orders__title">Orders</h2> */}
      <table className="orders__table">
        <thead>
          <tr>
            <th>No</th>
            <th>User Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Items</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.userName}</td>
                <td>{order.address}</td>
                <td>{order.phone}</td>
                <td>
                  {order.items.map((item, index) => (
                    <div key={index}>
                      {item.item_name} × {item.quantity}
                    </div>
                  ))}
                </td>
                <td>Rs.{order.totalPrice}</td>
                <td>
                  <button
                    className="orders__btn"
                    onClick={() => handleComplete(order.id)}
                  >
                    Complete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="orders__empty">
                No Orders Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function Orders() {
  return (
    <>
      <AdminNavbar name="Admin" />
      <OrdersList />
      <Footer />
    </>
  );
}

export default Orders;

import React, { useEffect, useState } from "react";
import "./Orders.css";
import Footer from "../../../Components/Footer/Footer";
import AdminNavbar from "../../../Components/AdminNavbar/AdminNavbar";

function OrdersList() {
  const [ongoingOrders, setOngoingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("ongoing");

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOngoingOrders(data.filter((order) => order.status === "ongoing"));
        setCompletedOrders(
          data.filter((order) => order.status === "completed")
        );
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  const handleComplete = async (orderId) => {
    try {
      await fetch(`http://localhost:5000/api/orders/${orderId}/complete`, {
        method: "PUT",
      });

      const updatedOrder = ongoingOrders.find((o) => o.id === orderId);
      if (!updatedOrder) return;

      updatedOrder.status = "completed";
      setOngoingOrders(ongoingOrders.filter((o) => o.id !== orderId));
      setCompletedOrders([...completedOrders, updatedOrder]);
    } catch (error) {
      console.error("Error completing order:", error);
    }
  };

  const renderTable = (orders, isOngoing) => (
    <table className="orders__table">
      <thead>
        <tr>
          <th>No</th>
          <th>User Name</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Items</th>
          <th>Total Price</th>
          {isOngoing && <th>Action</th>}
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
                {order.items.map((item, idx) => (
                  <div key={idx}>
                    {item.item_name} ({item.description}) × {item.quantity}
                  </div>
                ))}
              </td>
              <td>Rs.{order.totalPrice}</td>
              {isOngoing && (
                <td>
                  <button
                    className="orders__btn"
                    onClick={() => handleComplete(order.id)}
                  >
                    Complete
                  </button>
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={isOngoing ? "7" : "6"} className="orders__empty">
              {isOngoing ? "No Ongoing Orders" : "No Completed Orders"}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <div className="orders">
      {/* 🔹 Navbar for switching tabs */}
      <div className="orders__navbar">
        <button
          className={activeTab === "ongoing" ? "active" : ""}
          onClick={() => setActiveTab("ongoing")}
        >
          Ongoing Orders ({ongoingOrders.length})
        </button>
        <button
          className={activeTab === "completed" ? "active" : ""}
          onClick={() => setActiveTab("completed")}
        >
          Completed Orders ({completedOrders.length})
        </button>
      </div>

      {/* 🔹 Show the table depending on active tab */}
      {activeTab === "ongoing"
        ? renderTable(ongoingOrders, true)
        : renderTable(completedOrders, false)}
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

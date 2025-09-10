import React, { useEffect, useState } from "react";
import "./Orders.css";

function Orders() {
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
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="orders">
      <h2 className="orders__title">Orders</h2>
      <table className="orders__table">
        <thead>
          <tr>
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
            orders.map((order) => (
              <tr key={order._id}>
                <td>{order.userName}</td>
                <td>{order.address}</td>
                <td>{order.phone}</td>
                <td>
                  {order.items.map((item, index) => (
                    <div key={index}>
                      {item.name} × {item.quantity}
                    </div>
                  ))}
                </td>
                <td>${order.totalPrice}</td>
                <td>
                  <button
                    className="orders__btn"
                    onClick={() => handleComplete(order._id)}
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

export default Orders;

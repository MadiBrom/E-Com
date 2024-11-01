import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = () => {
      let storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser) {
        navigate("/login"); // Redirect if no user is found
        return;
      }

      // Initialize gold to 500 if not already set
      if (storedUser.gold === undefined) {
        storedUser = { ...storedUser, gold: 500 };
        localStorage.setItem("user", JSON.stringify(storedUser));
      }

      setUser(storedUser);
    };

    const fetchOrders = () => {
      const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(storedOrders);
    };

    fetchUserData();
    fetchOrders();
  }, [navigate]);

  useEffect(() => {
    const calculateTotalOrderCost = () => {
      return orders.reduce((total, order) => total + order.total, 0);
    };

    if (user && orders.length > 0) {
      const totalOrderCost = calculateTotalOrderCost();
      if (user.gold >= totalOrderCost) {
        const updatedUser = {
          ...user,
          gold: parseFloat((user.gold - totalOrderCost).toFixed(2)),
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        console.warn("Not enough gold to cover all orders");
      }
    }
  }, [user, orders]);

  return (
    <div className="profile-container">
      <h1>Welcome, {user ? user.username : "User"}!</h1>
      <h2>Email: {user ? user.email : "Loading..."}</h2>
      <h3>Gold Balance: {user ? user.gold.toFixed(2) : "0.00"} Gold</h3>
      <h3>Your Orders:</h3>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <strong>Order #{order.id}</strong>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              <p>Total: ${order.total.toFixed(2)}</p>
              <h4>Items:</h4>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-orders">No orders found.</p>
      )}
    </div>
  );
};

export default Profile;

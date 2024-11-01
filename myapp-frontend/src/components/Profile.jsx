import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [productTally, setProductTally] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
      } else {
        navigate("/login");
      }
    };

    const fetchOrders = () => {
      const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(storedOrders);
      calculateProductTally(storedOrders);
    };

    const calculateProductTally = (orders) => {
      const tally = {};
      orders.forEach((order) => {
        order.items.forEach((item) => {
          tally[item.name] = (tally[item.name] || 0) + item.quantity;
        });
      });
      setProductTally(tally);
    };

    fetchUserData();
    fetchOrders();
  }, [navigate]);

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <h1 className="profile-heading">
          Welcome, {user ? user.username : "User"}!
        </h1>
        <h2 className="profile-subheading">
          Email: {user ? user.email : "Loading..."}
        </h2>
        <h3>Current Gold Balance: {user ? user.gold.toFixed(0) : "0"} Gold</h3>
        <h3 className="orders-heading">Your Orders:</h3>
        {orders.length > 0 ? (
          <ul className="orders-list">
            {orders.map((order) => (
              <li key={order.id} className="order-item">
                <strong>Order #{order.id}</strong>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                <p>Total: {order.total.toFixed(0)} Gold</p>
                <h4>Items:</h4>
                <ul className="item-list">
                  {order.items.map((item, index) => (
                    <li key={index} className="item">
                      {item.name} - {item.price.toFixed(0)} gp x {item.quantity}
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
      <div className="product-tally">
        <h3 className="tally-heading">Product Tally</h3>
        <ul className="tally-list">
          {Object.keys(productTally).length > 0 ? (
            Object.entries(productTally).map(([name, quantity]) => (
              <li key={name} className="tally-item">
                {name}: {quantity}
              </li>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Profile;

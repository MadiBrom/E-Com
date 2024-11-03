import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "./product.js"; // Import products data

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [productTally, setProductTally] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
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
    };

    fetchUserData();
    fetchOrders();
  }, [navigate]);

  useEffect(() => {
    const calculateProductTally = (orders) => {
      const tally = {};
      orders.forEach((order) => {
        order.items.forEach((item) => {
          tally[item.name] = (tally[item.name] || 0) + item.quantity;
        });
      });
      setProductTally(tally);
    };

    calculateProductTally(orders);
  }, [orders]);

  const deleteOrder = (orderId) => {
    setOrders((prevOrders) => {
      const updatedOrders = prevOrders.filter((order) => order.id !== orderId);
      localStorage.setItem("orders", JSON.stringify(updatedOrders));
      return updatedOrders;
    });
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  const getDescription = (itemName) => {
    const product = products.find((product) => product.name === itemName);
    return product ? product.description : "No description available";
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-container">
        <h1 className="profile-heading">
          Welcome, {user ? user.username : "User"}!
        </h1>
        <h2 className="profile-subheading">
          Email: {user ? user.email : "Loading..."}
        </h2>
        <h3> {user ? user.gold.toFixed(0) : "0"} 🪙 </h3>
        <h3 className="orders-heading">Your Orders:</h3>
        {orders.length > 0 ? (
          <ul className="orders-list">
            {orders.map((order) => (
              <li key={order.id} className="order-item">
                <strong>Order #{order.id}</strong>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                <p>Total: {order.total.toFixed(0)} 🪙</p>
                <h4>Items:</h4>
                <ul className="item-list">
                  {order.items.map((item, index) => (
                    <li key={index} className="item">
                      {item.name} - {item.price.toFixed(0)} gp x {item.quantity}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => deleteOrder(order.id)}
                  className="delete-order-button"
                >
                  Delete Order
                </button>
                <button
                  onClick={() => openModal(order)}
                  className="view-details-button"
                >
                  View Details
                </button>
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

      {/* Modal */}
      {isModalOpen && selectedOrder && (
        <div className="modal">
          <div className="modal-content">
            <h2>Order Details - #{selectedOrder.id}</h2>
            <p>Date: {new Date(selectedOrder.date).toLocaleDateString()}</p>
            <p>Total: {selectedOrder.total.toFixed(0)} 🪙</p>
            <h4>Items:</h4>
            <ul>
              {selectedOrder.items.map((item, index) => (
                <li key={index}>
                  <strong>{item.name}</strong>
                  <p>Price: {item.price.toFixed(0)} gp</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Description: {getDescription(item.name)}</p>
                </li>
              ))}
            </ul>
            <button onClick={closeModal} className="close-modal-button">
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

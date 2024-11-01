import React, { useState } from "react";

const Products = () => {
  // Fantasy-themed product data
  const products = [
    {
      id: 1,
      name: "Dragon Scale Elixir",
      price: 15.99,
      description:
        "A powerful tonic brewed from dragon scales, restores 50 HP.",
    },
    {
      id: 2,
      name: "Phoenix Feather Charm",
      price: 25.49,
      description:
        "Grants the wearer a one-time resurrection, glows in danger.",
    },
    {
      id: 3,
      name: "Enchanted Cloak",
      price: 40.0,
      description: "A shimmering cloak that grants invisibility for 5 minutes.",
    },
    {
      id: 4,
      name: "Mystic Crystal Shard",
      price: 9.99,
      description: "Harness the power of the ancients, amplifies magic by 20%.",
    },
  ];

  // State for the cart
  const [cart, setCart] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to remove a product from the cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Function to increase the quantity of a product in the cart
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrease the quantity of a product in the cart
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Calculate the total price
  const totalPrice = cart.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );

  const handlePurchase = () => {
    const order = {
      id: new Date().getTime(), // unique order ID based on timestamp
      items: cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: totalPrice,
      date: new Date().toISOString(),
    };

    // Retrieve existing orders from localStorage, or initialize with an empty array
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(order);

    // Save the updated orders array to localStorage
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    alert("Thank you for your purchase!");
    setCart([]); // Clears the cart after purchase
  };

  return (
    <div className="product-page-container">
      <h2 className="page-title">Shop Magical Items</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">
                Price: ${product.price.toFixed(2)}
              </p>
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="cart-title">Your Cart</h2>
      <div className="cart-container">
        {cart.length > 0 ? (
          <>
            <ul className="cart-list">
              {cart.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="cart-item-info">
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p>${item.price.toFixed(2)}</p>
                      <div className="quantity-controls">
                        <button
                          className="decrease-btn"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          className="increase-btn"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    className="remove-from-cart-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="cart-total">
              <h3>Total: ${totalPrice.toFixed(2)}</h3>
            </div>
            <button className="purchase-btn" onClick={handlePurchase}>
              Purchase
            </button>
          </>
        ) : (
          <p className="empty-cart-message">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Products;

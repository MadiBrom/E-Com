import React, { useState, useEffect } from "react";
import "./product.css";

const Products = () => {
  const products = [
    { id: 1, name: "Dragon Scale Elixir", price: 15, description: "Restores 50 HP." },
    { id: 2, name: "Phoenix Feather Charm", price: 25, description: "Grants a one-time resurrection." },
    { id: 3, name: "Enchanted Cloak", price: 40, description: "Grants invisibility for 5 minutes." },
    { id: 4, name: "Mystic Crystal Shard", price: 9, description: "Amplifies magic by 20%." },
    { id: 5, name: "Potion of Strength", price: 18, description: "Increases strength by 50% for 10 minutes." },
    { id: 6, name: "Stormborn Amulet", price: 35, description: "Allows control of small storms for 15 minutes." },
    { id: 7, name: "Moonlit Dagger", price: 22, description: "Deals 15 extra damage under moonlight." },
    { id: 8, name: "Essence of Shadows", price: 27, description: "Cloaks user in shadows, increasing stealth." },
    { id: 9, name: "Scroll of Ancient Wisdom", price: 30, description: "Boosts intelligence for the next challenge." },
    { id: 10, name: "Shield of Aegis", price: 45, description: "Absorbs up to 100 damage for 5 minutes." },
    { id: 11, name: "Elixir of Agility", price: 12, description: "Increases agility by 30% for 10 minutes." },
    { id: 12, name: "Guardian’s Lantern", price: 20, description: "Repels minor spirits in dark places." },
    { id: 13, name: "Golem Stone", price: 55, description: "Summons a stone golem for 15 minutes." },
    { id: 14, name: "Heartfire Pendant", price: 26, description: "Prevents freezing in icy environments." },
    { id: 15, name: "Charm of Luck", price: 10, description: "Increases luck by 5% for the next challenge." },
  ];

  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to shuffle array (Fisher-Yates Shuffle)
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  // Generate random items and quantities
  const generateRandomCart = () => {
    shuffleArray(products);
    const randomCart = products.map((product) => ({
      ...product,
      quantity: Math.floor(Math.random() * 5) + 1, // Random quantity between 1 and 5
    }));
    setCart(randomCart);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePurchase = () => {
    const cartItems = [...cart];
    setCart([]);
    let storedUser = JSON.parse(localStorage.getItem("user"));
    const userGold = storedUser?.gold || 0;

    if (userGold < totalPrice) {
      alert("Not enough gold for this purchase!");
      return;
    }

    storedUser.gold -= totalPrice;
    localStorage.setItem("user", JSON.stringify(storedUser));

    const order = {
      id: new Date().getTime(),
      items: cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: totalPrice,
      date: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(order);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    alert("Thank you for your purchase!");
  };

  const toggleModal = () => {
    if (!isModalOpen) generateRandomCart(); // Generate new random cart when modal opens
    setIsModalOpen(!isModalOpen);
  };

  // Close modal when clicking outside
  const closeModal = (e) => {
    if (e.target.classList.contains("cart-modal")) {
      setIsModalOpen(false);
    }
  };

  // Handle Escape key to close modal
  const handleEscape = (e) => {
    if (e.key === "Escape") {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    // Add event listeners
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", closeModal);

    return () => {
      // Cleanup event listeners
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", closeModal);
    };
  }, []);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userGold = storedUser?.gold || 0;

  return (
    <div className="product-page-container">     
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: {product.price.toFixed(0)} gp</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <button className="view-cart-button" onClick={toggleModal}>
        View Cart
      </button>

      {isModalOpen && (
        <div className="cart-modal">
          <div className="cart-container">
            <h2 className="cart-title">Your Cart</h2>
            <p className="gold-amount">Your Gold: {userGold} gp</p>
            {cart.length > 0 ? (
              <>
                <ul>
                  {cart.map((item) => (
                    <li key={item.id}>
                      <span className="cart-item-name">{item.name}</span>
                      <span className="cart-item-price">
                        {item.price.toFixed(0)} gp x {item.quantity}
                      </span>
                      <button
                        className="delete-button"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="cart-total">Total: {totalPrice.toFixed(0)} Gold</p>
                <button className="purchase-button" onClick={handlePurchase}>
                  Purchase
                </button>
              </>
            ) : (
              <p className="empty-cart-message">Your cart is empty.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;

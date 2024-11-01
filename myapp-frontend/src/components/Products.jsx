import React, { useState } from "react";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Dragon Scale Elixir",
      price: 15.99,
      description: "Restores 50 HP.",
    },
    {
      id: 2,
      name: "Phoenix Feather Charm",
      price: 25.49,
      description: "Grants a one-time resurrection.",
    },
    {
      id: 3,
      name: "Enchanted Cloak",
      price: 40.0,
      description: "Grants invisibility for 5 minutes.",
    },
    {
      id: 4,
      name: "Mystic Crystal Shard",
      price: 9.99,
      description: "Amplifies magic by 20%.",
    },
  ];

  const [cart, setCart] = useState([]);

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

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePurchase = () => {
    let storedUser = JSON.parse(localStorage.getItem("user"));

    // Check if the user has enough gold
    if (storedUser.gold < totalPrice) {
      alert("Not enough gold for this purchase!");
      return;
    }

    // Deduct the total price from user's gold
    storedUser.gold -= totalPrice;
    localStorage.setItem("user", JSON.stringify(storedUser));

    // Create the order and save it as before
    const order = {
      id: new Date().getTime(),
      items: cart.map((item) => ({
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
    setCart([]); // Clears the cart after purchase
  };

  return (
    <div className="product-page-container">
      <h2>Shop Magical Items</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h2>Your Cart</h2>
      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price.toFixed(2)} x {item.quantity}
              </li>
            ))}
          </ul>
          <p>Total: ${totalPrice.toFixed(2)}</p>
          <button onClick={handlePurchase}>Purchase</button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Products;

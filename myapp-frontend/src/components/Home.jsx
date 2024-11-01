import React, { useState, useEffect } from "react";

const Home = () => {
  const [goldToAdd, setGoldToAdd] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleAddGold = () => {
    if (goldToAdd <= 0) {
      alert("Please enter a valid amount of gold to add.");
      return;
    }

    // Update user's gold balance
    const updatedGold = parseFloat(
      (user.gold + parseFloat(goldToAdd)).toFixed(2)
    );
    const updatedUser = { ...user, gold: updatedGold };
    setUser(updatedUser);

    // Save updated user data to localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setGoldToAdd(0); // Reset the input field
    alert(`Added ${goldToAdd} gold to your balance!`);
  };

  return (
    <div>
      <h1>Hello!</h1>
      <h2>Current Gold Balance: {user ? user.gold.toFixed(2) : "0.00"} Gold</h2>
      <div>
        <label>
          Add Gold:
          <input
            type="number"
            value={goldToAdd}
            onChange={(e) =>
              setGoldToAdd(parseFloat(e.target.value).toFixed(2))
            }
            placeholder="Enter gold amount"
          />
        </label>
        <button onClick={handleAddGold}>Add Gold</button>
      </div>
    </div>
  );
};

export default Home;

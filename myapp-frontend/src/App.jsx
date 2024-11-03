import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Products from "./components/Products.jsx";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import Riddles from "./games/Riddles.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Load user data from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/riddles" element={<Riddles />} />
      </Routes>
    </div>
  );
}

export default App;

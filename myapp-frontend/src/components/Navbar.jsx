import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => setIsLoggedIn(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <div className="navbar">
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/products">
        <button>Product</button>
      </Link>

      {/* Conditional rendering for Profile */}
      {isLoggedIn && (
        <Link to="/profile">
          <button>Profile</button>
        </Link>
      )}

      {/* Conditional rendering for Login/Register or Logout */}
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <Link to="/login">
            <button onClick={handleLogin}>Login</button>
          </Link>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;

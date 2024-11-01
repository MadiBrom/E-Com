import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import Products from "./components/Products";
import Profile from "./components/Profile";

import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  // Define user and setUser state
  const [user, setUser] = useState(null);

  // Log user state to verify it updates after login
  console.log("User state in App:", user);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/products" element={<Products />} />
        {/* Add more routes here as needed */}
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={<Profile user={user} setUser={setUser} />}
        />{" "}
        <Route path="/login" element={<Login setUser={setUser} />} />{" "}
        <Route path="/register" element={<Register setUser={setUser} />} />
      </Routes>
    </div>
  );
}

export default App;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../API";

const Login = ({ onLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await loginUser(email, password);
      if (response && response.token && response.user) {
        onLogin(response.user); // Call onLogin from props to update App state
        navigate("/profile");
      } else {
        setError(response.error || "Invalid login credentials.");
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="register-form" onSubmit={handleSubmit}>
        <label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="submit-button" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Submit"}
        </button>
      </form>
      <p className="register-link">
        Not Registered? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;

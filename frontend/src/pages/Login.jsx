import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && password) {
      setIsAuthenticated(true);
      setMessage("✅ Authentication successful! You are now logged in.");
    } else {
      setMessage("❌ Please enter both email and password.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #b3e5fc 0%, #e1bee7 100%)", // ✅ same gradient as dashboard
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        className="card shadow-lg p-4 border-0"
        style={{
          width: "400px",
          background: "rgba(255, 255, 255, 0.85)", // ✅ glassy white
          borderRadius: "20px",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 className="text-center mb-3 fw-bold text-primary">🔑 Login</h3>

        {message && (
          <div
            className={`alert ${
              message.includes("successful") ? "alert-success" : "alert-danger"
            } text-center py-2 mb-3`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 rounded-pill fw-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Don’t have an account?{" "}
          <Link to="/signup" className="fw-semibold text-decoration-none">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

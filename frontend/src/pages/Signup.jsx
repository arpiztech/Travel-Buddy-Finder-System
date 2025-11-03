import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Signup({ setIsAuthenticated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (name && email && password) {
      setIsAuthenticated(true);
      setMessage("✅ Registration successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1500);
    } else {
      setMessage("❌ Please fill all fields correctly.");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #b3e5fc 0%, #e1bee7 100%)", // same as Login
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        className="card shadow-lg p-4 border-0"
        style={{
          width: "400px",
          background: "rgba(255, 255, 255, 0.85)",
          borderRadius: "20px",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 className="text-center mb-2 fw-bold text-success">
          ✨ Create Account
        </h3>
        <p className="text-muted text-center mb-3">
          Join <strong>Travel Buddy Finder</strong> and start your journey!
        </p>

        {/* ✅ Feedback Message */}
        {message && (
          <div
            className={`alert ${
              message.includes("successful") ? "alert-success" : "alert-danger"
            } text-center py-2 mb-3`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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
            className="btn btn-success w-100 rounded-pill fw-semibold"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <Link to="/" className="fw-semibold text-decoration-none">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

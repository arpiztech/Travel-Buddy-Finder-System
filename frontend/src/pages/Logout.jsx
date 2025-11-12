import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session/token data
    localStorage.removeItem("authToken");
    sessionStorage.clear();

    // Update auth state in parent (set to false)
    if (onLogout) onLogout();

    // Redirect to login
    navigate("/", { replace: true });
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #e0f7fa, #e1bee7)",
      }}
    >
      <Card
        className="text-center p-5 shadow-lg border-0 rounded-4"
        style={{ maxWidth: "400px" }}
      >
        <h3 className="fw-bold mb-3 text-dark">🚪 Logout</h3>
        <p className="text-muted">
          Are you sure you want to log out from <strong>Travel Buddy</strong>?
        </p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Button
            variant="danger"
            className="rounded-pill px-4"
            onClick={handleLogout}
          >
            Yes, Logout
          </Button>
          <Button
            variant="outline-secondary"
            className="rounded-pill px-4"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default Logout;

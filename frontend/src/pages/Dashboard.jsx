import React from "react";
import { Container, Row, Col, Card, Button, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom"; // ✅ Import Link

const Dashboard = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className="bg-primary text-white p-3 vh-100 shadow"
        style={{ width: "250px" }}
      >
        <h3 className="mb-4 fw-bold">Travel Buddy</h3>
        <Nav className="flex-column gap-2">
          <Nav.Link
            as={Link}
            to="/dashboard"
            className="text-white fw-semibold"
          >
            🏠 Home
          </Nav.Link>

          {/* ✅ Changed to React Router navigation */}
          <Nav.Link as={Link} to="/profile" className="text-white fw-semibold">
            🧑 My Profile
          </Nav.Link>

          <Nav.Link as={Link} to="/trip" className="text-white fw-semibold">
            ✈️ My Trips
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/createtrip"
            className="text-white fw-semibold"
          >
            ✈️ Create Trip
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/viewtrip"
            className="text-white fw-semibold"
          >
            📌 View Trip
          </Nav.Link>
          <Link to="/buddy-request" className="btn btn-primary me-2">
            🤝 Buddy Requests
          </Link>

          <Link to="/messages" className="btn btn-primary me-2">
            💬 Messages
          </Link>

          <Nav.Link className="text-white fw-semibold">
            🔔 Notifications
          </Nav.Link>
          <Nav.Link className="text-white fw-semibold">⚙️ Settings</Nav.Link>
          <Nav.Link className="text-white fw-semibold">🚪 Logout</Nav.Link>
        </Nav>
      </div>

      {/* Main Dashboard Content */}
      <Container
        fluid
        className="p-4"
        style={{
          background: "linear-gradient(135deg, #e0f7fa, #e1bee7)",
          minHeight: "100vh",
        }}
      >
        <h2 className="fw-bold text-dark">Welcome back, Arpita! 👋</h2>
        <p className="text-muted">Here’s what’s happening with your travels.</p>

        {/* Quick Stats */}
        <Row className="mt-4 g-4">
          <Col md={3}>
            <Card className="p-3 shadow-lg border-0 rounded-4">
              <h5>Total Trips</h5>
              <p className="fs-4 fw-bold text-primary">6</p>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="p-3 shadow-lg border-0 rounded-4">
              <h5>Upcoming Trips</h5>
              <p className="fs-4 fw-bold text-success">2</p>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="p-3 shadow-lg border-0 rounded-4">
              <h5>Buddy Matches</h5>
              <p className="fs-4 fw-bold text-warning">4</p>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="p-3 shadow-lg border-0 rounded-4">
              <h5>Pending Requests</h5>
              <p className="fs-4 fw-bold text-danger">1</p>
            </Card>
          </Col>
        </Row>

        {/* Upcoming Trips */}
        <div className="mt-5">
          <h4 className="fw-bold text-dark">🌍 Upcoming Trips</h4>
          <Card className="p-3 mt-3 shadow-sm border-0 rounded-4">
            <h6 className="fw-bold">Paris, France</h6>
            <p className="text-muted mb-2">
              12th - 18th Sept 2025 | Budget: $800
            </p>
            <Button variant="primary" className="rounded-pill px-4">
              View Details
            </Button>
          </Card>
        </div>

        {/* Buddy Requests */}
        <div className="mt-5">
          <h4 className="fw-bold text-dark">🤝 Buddy Requests</h4>
          <Card className="p-3 mt-3 shadow-sm border-0 rounded-4 d-flex flex-row justify-content-between align-items-center">
            <div>
              <h6 className="fw-bold">John Doe</h6>
              <p className="text-muted mb-0">
                Wants to join your trip to Paris ✈️
              </p>
            </div>
            <div>
              <Button variant="success" className="me-2 rounded-pill px-3">
                Accept
              </Button>
              <Button variant="outline-danger" className="rounded-pill px-3">
                Reject
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Dashboard;

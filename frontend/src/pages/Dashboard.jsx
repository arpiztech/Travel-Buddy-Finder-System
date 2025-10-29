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
            className=" text-white fw-semibold"
          >
            📌 View Trip
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/buddy-request"
            className="text-white fw-semibold"
          >
            🤝 Buddy Requests
          </Nav.Link>

          <Nav.Link as={Link} to="/messages" className="text-white fw-semibold">
            💬 Messages
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/notifications"
            className="text-white fw-semibold"
          >
            🔔 Notifications
          </Nav.Link>

          <Nav.Link as={Link} to="/settings" className="text-white fw-semibold">
            ⚙️ Settings
          </Nav.Link>

          <Nav.Link className="text-white fw-semibold">🚪 Logout</Nav.Link>
        </Nav>
      </div>

      {/* Main Dashboard Content */}
      {/* Main Dashboard Content */}
      <Container
        fluid
        className="p-4"
        style={{
          background: "linear-gradient(135deg, #e0f7fa 0%, #e1bee7 100%)",
          minHeight: "100vh",
        }}
      >
        <h2 className="fw-bold text-dark mb-1">Welcome back, Arpita! 👋</h2>
        <p className="text-muted mb-4">
          Stay updated on your recent travel activities.
        </p>

        {/* Quick Stats */}
        <Row className="mt-3 g-4">
          <Col md={3}>
            <Card className="p-3 shadow border-0 rounded-4 bg-white h-100">
              <h6 className="text-secondary mb-1">Total Trips</h6>
              <span className="fs-3 fw-semibold text-primary">6</span>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="p-3 shadow border-0 rounded-4 bg-white h-100">
              <h6 className="text-secondary mb-1">Upcoming Trips</h6>
              <span className="fs-3 fw-semibold text-success">2</span>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="p-3 shadow border-0 rounded-4 bg-white h-100">
              <h6 className="text-secondary mb-1">Buddy Matches</h6>
              <span className="fs-3 fw-semibold text-warning">4</span>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="p-3 shadow border-0 rounded-4 bg-white h-100">
              <h6 className="text-secondary mb-1">Pending Requests</h6>
              <span className="fs-3 fw-semibold text-danger">1</span>
            </Card>
          </Col>
        </Row>

        {/* Upcoming Trips */}
        <section className="mt-5">
          <h4 className="fw-bold text-dark mb-3">🌍 Upcoming Trips</h4>
          <Card className="p-3 shadow-sm border-0 rounded-4 bg-light">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h6 className="fw-bold mb-1">Paris, France</h6>
                <p className="text-muted mb-2">
                  12th - 18th Sept 2025&nbsp;|&nbsp;
                  <span className="fw-semibold">Budget: $800</span>
                </p>
              </div>
              <Button variant="primary" className="rounded-pill px-4">
                View Details
              </Button>
            </div>
          </Card>
        </section>

        {/* Buddy Requests */}
        <section className="mt-5">
          <h4 className="fw-bold text-dark mb-3">🤝 Buddy Requests</h4>
          <Card className="p-3 shadow-sm border-0 rounded-4 bg-light d-flex flex-row justify-content-between align-items-center">
            <div>
              <h6 className="fw-bold mb-1">John Doe</h6>
              <p className="text-muted mb-0">
                Wants to join your trip to Paris&nbsp;✈️
              </p>
            </div>
            <div className="d-flex">
              <Button variant="success" className="me-2 rounded-pill px-3">
                Accept
              </Button>
              <Button variant="outline-danger" className="rounded-pill px-3">
                Reject
              </Button>
            </div>
          </Card>
        </section>
      </Container>
    </div>
  );
};

export default Dashboard;

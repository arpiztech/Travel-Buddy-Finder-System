import React from "react";
import { Container, Button, Card, Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <div
      className="d-flex"
      style={{
        height: "100vh",
        overflow: "hidden", // prevent double scrollbars
      }}
    >
      {/* Sidebar */}
      <div
        className="bg-primary text-white p-3 d-flex flex-column justify-content-between shadow"
        style={{
          width: "250px",
          height: "100%",
        }}
      >
        <div>
          <h3 className="mb-4 fw-bold text-center">Travel Buddy</h3>
          <Nav className="flex-column gap-2">
            <Nav.Link
              as={Link}
              to="/dashboard"
              className="text-white fw-semibold"
            >
              🏠 Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/profile"
              className="text-white fw-semibold"
            >
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
              🗺️ Create Trip
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/viewtrip"
              className="text-white fw-semibold"
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
            <Nav.Link
              as={Link}
              to="/messages"
              className="text-white fw-semibold"
            >
              💬 Messages
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/notifications"
              className="text-white fw-semibold"
            >
              🔔 Notifications
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/settings"
              className="text-white fw-semibold"
            >
              ⚙️ Settings
            </Nav.Link>
          </Nav>
        </div>

        <div>
          <Nav.Link className="text-white fw-semibold">🚪 Logout</Nav.Link>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div
        className="flex-grow-1 d-flex align-items-center justify-content-between p-5"
        style={{
          background: "linear-gradient(135deg, #b3e5fc 0%, #e1bee7 100%)",
          overflowY: "auto",
        }}
      >
        {/* Left Section */}
        <div style={{ maxWidth: "550px" }}>
          <h1 className="fw-bold text-dark mb-3">Hey Arpita</h1>
          <h3 className="fw-bold text-dark mb-3">
            Start your journey by one click,
            <br /> explore beautiful world!
          </h3>
          <p className="text-muted mb-4">
            In today’s digital era, the growing enthusiasm for travel and
            exploration has highlighted the need for intelligent systems that
            can connect individuals with similar travel interests. The Travel
            Buddy Finder System aims to bridge this gap by providing a smart
            platform that matches travelers based on destination, preferences,
            and timelines.
          </p>
          <div className="d-flex gap-3">
            <Button variant="primary" className="rounded-pill px-4 py-2">
              Plan now
            </Button>
            <Button variant="outline-dark" className="rounded-pill px-4 py-2">
              About us
            </Button>
          </div>
        </div>

        {/* Right Section (Image + Cards) */}
        <div className="position-relative">
          <img
            src="https://img.freepik.com/free-photo/young-woman-wearing-hat-mask-holding-camera_23-2148884327.jpg"
            alt="Traveler"
            className="rounded-circle shadow"
            style={{ width: "350px", height: "350px", objectFit: "cover" }}
          />

          {/* Floating cards */}
          <Card
            className="shadow position-absolute bg-white border-0"
            style={{
              bottom: "10%",
              right: "-70px",
              width: "180px",
              borderRadius: "20px",
            }}
          >
            <Card.Body className="p-2">
              <img
                src="https://img.freepik.com/free-photo/tropical-island-paradise_1232-3884.jpg"
                alt="Explore"
                className="rounded-3 w-100 mb-2"
              />
              <Card.Title className="fs-6 fw-bold mb-1">
                Explore Labuan Bajo
              </Card.Title>
              <Card.Text className="text-muted small mb-0">
                NTT, Indonesia
              </Card.Text>
            </Card.Body>
          </Card>

          <Card
            className="shadow position-absolute bg-white border-0"
            style={{
              top: "10%",
              right: "50px",
              width: "140px",
              borderRadius: "20px",
            }}
          >
            <Card.Body className="p-2">
              <img
                src="https://img.freepik.com/free-photo/luxury-resort-swimming-pool_1203-3437.jpg"
                alt="Hotel"
                className="rounded-3 w-100 mb-2"
              />
              <Card.Title className="fs-6 fw-bold mb-1">
                Le Pirate Hotel
              </Card.Title>
              <Card.Text className="text-muted small mb-0">
                Flores, Indonesia
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

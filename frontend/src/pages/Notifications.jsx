// src/pages/Notifications.jsx
import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Badge, Nav } from "react-bootstrap";
import { FaBell, FaCheck, FaTimes } from "react-icons/fa";

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("All");

  const allNotifications = [
    {
      id: 1,
      type: "Buddy Request",
      message: "Amit sent you a buddy request.",
      time: "2m ago",
      unread: true,
      action: "request",
    },
    {
      id: 2,
      type: "Trip Update",
      message: "Your Goa Trip date was updated.",
      time: "1h ago",
      unread: true,
    },
    {
      id: 3,
      type: "Message",
      message: "Riya: 'Hi! Can I join your trip?'",
      time: "3h ago",
      unread: false,
    },
    {
      id: 4,
      type: "Reminder",
      message: "Your Bali trip starts tomorrow.",
      time: "1d ago",
      unread: false,
    },
    {
      id: 5,
      type: "System Alert",
      message: "Your password was successfully changed.",
      time: "2d ago",
      unread: false,
    },
    {
      id: 6,
      type: "Promotion",
      message: "Special discount on Paris trips this week!",
      time: "3d ago",
      unread: false,
    },
  ];

  // Filter notifications based on tab
  const filteredNotifications =
    activeTab === "All"
      ? allNotifications
      : activeTab === "Unread"
      ? allNotifications.filter((n) => n.unread)
      : allNotifications.filter((n) => n.type === activeTab);

  return (
    <Container className="py-4">
      <h3 className="mb-4">
        <FaBell className="me-2" /> Notifications{" "}
        <Badge bg="danger">
          {allNotifications.filter((n) => n.unread).length}
        </Badge>
      </h3>

      {/* Tabs */}
      <Nav
        variant="tabs"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-3"
      >
        <Nav.Item>
          <Nav.Link eventKey="All">All</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Unread">Unread</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Buddy Request">Requests</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="System Alert">System</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Notification List */}
      <Row>
        {filteredNotifications.map((n) => (
          <Col xs={12} key={n.id} className="mb-3">
            <Card
              className={`p-3 shadow-sm ${
                n.unread ? "border-primary" : "border-light"
              }`}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">{n.type}</h6>
                  <p className="mb-1">{n.message}</p>
                  <small className="text-muted">{n.time}</small>
                </div>
                <div>
                  {n.action === "request" && (
                    <>
                      <Button size="sm" variant="success" className="me-2">
                        <FaCheck /> Accept
                      </Button>
                      <Button size="sm" variant="danger">
                        <FaTimes /> Reject
                      </Button>
                    </>
                  )}
                  {n.unread && (
                    <Badge bg="primary" pill>
                      New
                    </Badge>
                  )}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Extra Controls */}
      <div className="mt-3 d-flex justify-content-end">
        <Button variant="outline-secondary" size="sm" className="me-2">
          Mark all as read
        </Button>
        <Button variant="outline-danger" size="sm">
          Clear All
        </Button>
      </div>
    </Container>
  );
};

export default Notifications;

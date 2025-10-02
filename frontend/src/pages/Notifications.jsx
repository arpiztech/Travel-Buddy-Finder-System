import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Nav,
  Spinner,
} from "react-bootstrap";
import {
  FaBell,
  FaCheck,
  FaTimes,
  FaUserPlus,
  FaInfoCircle,
  FaGift,
  FaBullhorn,
  FaEnvelope,
  FaExclamationTriangle,
  FaArchive,
  FaThumbtack,
  FaCircle,
} from "react-icons/fa";
import "./Notifications.css";

const typeIcons = {
  "Buddy Request": <FaUserPlus />,
  "Trip Update": <FaBullhorn />,
  Message: <FaEnvelope />,
  Reminder: <FaInfoCircle />,
  "System Alert": <FaExclamationTriangle />,
  Promotion: <FaGift />,
};

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [loadingClear, setLoadingClear] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "Buddy Request",
      message: "Amit sent you a buddy request.",
      time: "2m ago",
      unread: true,
      action: "request",
      pinned: true,
    },
    {
      id: 2,
      type: "Trip Update",
      message: "Your Goa Trip date was updated.",
      time: "1h ago",
      unread: true,
      pinned: false,
    },
    {
      id: 3,
      type: "Message",
      message: "Riya: 'Hi! Can I join your trip?'",
      time: "3h ago",
      unread: false,
      pinned: false,
    },
    {
      id: 4,
      type: "Reminder",
      message: "Your Bali trip starts tomorrow.",
      time: "1d ago",
      unread: false,
      pinned: false,
    },
    {
      id: 5,
      type: "System Alert",
      message: "Your password was successfully changed.",
      time: "2d ago",
      unread: false,
      pinned: false,
    },
    {
      id: 6,
      type: "Promotion",
      message: "Special discount on Paris trips this week!",
      time: "3d ago",
      unread: false,
      pinned: false,
    },
  ]);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleClearAll = () => {
    setLoadingClear(true);
    setTimeout(() => {
      setNotifications([]);
      setLoadingClear(false);
    }, 1000);
  };

  const handlePin = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
    );
  };

  const handleArchive = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleRespond = (id, response) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, action: null, unread: false } : n))
    );
  };

  const filteredNotifications =
    activeTab === "All"
      ? notifications
      : activeTab === "Unread"
      ? notifications.filter((n) => n.unread)
      : activeTab === "Buddy Request"
      ? notifications.filter((n) => n.type === "Buddy Request")
      : activeTab === "System Alert"
      ? notifications.filter((n) => n.type === "System Alert")
      : notifications;

  // Pin: show pinned first
  const sortedNotifications = [
    ...filteredNotifications.filter((n) => n.pinned),
    ...filteredNotifications.filter((n) => !n.pinned),
  ];

  return (
    <Container className="py-4">
      <h3 className="mb-4 d-flex align-items-center">
        <FaBell className="me-2" />
        Notifications
        <Badge bg="danger" className="ms-2">
          {notifications.filter((n) => n.unread).length}
        </Badge>
      </h3>

      {/* Tabs */}
      <Nav
        variant="tabs"
        activeKey={activeTab}
        onSelect={setActiveTab}
        className="mb-3"
      >
        <Nav.Item>
          <Nav.Link eventKey="All">All</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Unread">
            Unread{" "}
            <Badge bg="primary" pill>
              {notifications.filter((n) => n.unread).length}
            </Badge>
          </Nav.Link>
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
        {sortedNotifications.length === 0 && (
          <Col xs={12}>
            <Card className="p-4 text-center text-muted">
              No notifications to show.
            </Card>
          </Col>
        )}
        {sortedNotifications.map((n) => (
          <Col xs={12} key={n.id} className="mb-3">
            <Card
              className={`notification-card shadow-sm d-flex flex-row align-items-center ${
                n.unread ? "unread" : ""
              }`}
            >
              <div className="notification-type-icon">
                {typeIcons[n.type] || <FaInfoCircle />}
              </div>
              <div className="flex-fill">
                <div className="d-flex align-items-center">
                  <span className="notification-type">{n.type}</span>
                  {n.unread && (
                    <span className="ms-2">
                      <FaCircle
                        style={{ color: "#59a1fa", fontSize: 10 }}
                        title="Unread"
                      />
                    </span>
                  )}
                  {n.pinned && (
                    <FaThumbtack
                      className="ms-2"
                      title="Pinned"
                      color="#ED7B09"
                    />
                  )}
                </div>
                <p className="notification-message">{n.message}</p>
                <div className="notification-time">{n.time}</div>
              </div>
              <div className="notification-actions ms-3 d-flex flex-column">
                {n.action === "request" && (
                  <span>
                    <Button
                      size="sm"
                      variant="success"
                      className="me-2"
                      onClick={() => handleRespond(n.id, "accept")}
                    >
                      <FaCheck /> Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleRespond(n.id, "reject")}
                    >
                      <FaTimes /> Reject
                    </Button>
                  </span>
                )}
                <Button
                  variant={n.pinned ? "warning" : "outline-secondary"}
                  size="sm"
                  className="mb-2 mt-2"
                  title={n.pinned ? "Unpin" : "Pin"}
                  onClick={() => handlePin(n.id)}
                >
                  <FaThumbtack />
                </Button>
                <Button
                  variant="outline-dark"
                  size="sm"
                  title="Archive"
                  onClick={() => handleArchive(n.id)}
                >
                  <FaArchive />
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Extra Controls */}
      <div className="mt-3 d-flex justify-content-end notifications-controls">
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={handleMarkAllRead}
        >
          Mark all as read
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={handleClearAll}
          disabled={loadingClear}
        >
          {loadingClear ? (
            <>
              <Spinner size="sm" animation="border" className="me-1" />
              Clearing...
            </>
          ) : (
            "Clear All"
          )}
        </Button>
      </div>
    </Container>
  );
};

export default Notifications;

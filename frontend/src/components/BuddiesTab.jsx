import React, { useState } from "react";
import { ListGroup, Badge, Nav, Button } from "react-bootstrap";
import { FaEnvelope, FaInstagram, FaWhatsapp } from "react-icons/fa";

const BuddiesTab = ({ buddies }) => {
  const [activeTab, setActiveTab] = useState("all");

  // 🔹 Handle actions
  const handleAction = (action, buddy) => {
    alert(`${action} clicked for ${buddy.name}`);
  };

  // 🔹 Tab wise filter
  const filterBuddies = (b) => {
    if (activeTab === "all") return true;
    if (activeTab === "joined") return b.status === "Joined";
    if (activeTab === "pending") return b.status === "Pending";

    // Actions tabs
    if (activeTab === "message") return b.status === "Joined";
    if (activeTab === "remove") return b.status === "Joined";
    if (activeTab === "accept") return b.status === "Pending";
    if (activeTab === "decline") return b.status === "Pending";
    if (activeTab === "makeLeader") return b.status === "Joined";
    if (activeTab === "viewProfile") return true;

    return true;
  };

  return (
    <div>
      {/* 🔹 Custom Tab Header */}
      <Nav
        variant="tabs"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
      >
        <Nav.Item>
          <Nav.Link eventKey="all">All Buddies</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="joined">Joined</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="pending">Pending</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="message">Message</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="accept">Accept</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="decline">Decline</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="remove">Remove</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="makeLeader">Make Leader</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="viewProfile">View Profile</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* 🔹 Buddies List */}
      <ListGroup className="mt-3 shadow-sm">
        {buddies.filter(filterBuddies).map((b, i) => (
          <ListGroup.Item
            key={i}
            className="d-flex justify-content-between align-items-start p-3"
            style={{ borderRadius: "8px", marginBottom: "8px" }}
          >
            {/* Left Section - Info */}
            <div className="d-flex">
              <img
                src={b.avatar}
                alt={b.name}
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: "50%",
                  marginRight: 14,
                  objectFit: "cover",
                  border: "2px solid #ddd",
                }}
              />
              <div>
                <div className="d-flex align-items-center mb-1">
                  <strong style={{ fontSize: "1.1rem" }}>{b.name}</strong>
                  <Badge
                    bg={
                      b.status === "Joined"
                        ? "success"
                        : b.status === "Pending"
                        ? "warning"
                        : "secondary"
                    }
                    className="ms-2"
                  >
                    {b.status}
                  </Badge>
                </div>

                <div className="text-muted small">{b.role}</div>

                {b.interests && (
                  <div className="small mt-1">
                    <strong>Likes:</strong> {b.interests.join(", ")}
                  </div>
                )}

                {b.contributions && b.contributions.length > 0 && (
                  <div className="mt-1">
                    {b.contributions.map((c, ci) => (
                      <Badge key={ci} bg="info" className="me-1">
                        {c}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Social Links */}
                <div className="d-flex gap-3 mt-2">
                  {b.email && (
                    <a
                      href={`mailto:${b.email}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaEnvelope size={18} color="#555" />
                    </a>
                  )}
                  {b.instagram && (
                    <a
                      href={`https://instagram.com/${b.instagram}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaInstagram size={18} color="#E1306C" />
                    </a>
                  )}
                  {b.whatsapp && (
                    <a
                      href={`https://wa.me/${b.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaWhatsapp size={18} color="#25D366" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* 🔹 Right Section - Action Buttons */}
            <div className="d-flex flex-column gap-2">
              {b.status === "Pending" ? (
                <>
                  <Button
                    size="sm"
                    variant="success"
                    onClick={() => handleAction("Accept", b)}
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleAction("Decline", b)}
                  >
                    Decline
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleAction("Message", b)}
                  >
                    Message
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => handleAction("Remove", b)}
                  >
                    Remove
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    onClick={() => handleAction("Make Leader", b)}
                  >
                    Make Leader
                  </Button>
                </>
              )}
              <Button
                size="sm"
                variant="outline-info"
                onClick={() => handleAction("View Profile", b)}
              >
                View Profile
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default BuddiesTab;

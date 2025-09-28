// src/components/Message.jsx
import React from "react";
import { Card, Row, Col, Badge, Image, Form } from "react-bootstrap";

const messages = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/50?img=1",
    online: true,
    lastActive: "2h ago",
    latestMessage: "Hi! Can I join your trip?",
    trip: "Paris, France (12-18 Sept)",
    unread: 2,
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/50?img=2",
    online: false,
    lastActive: "Yesterday",
    latestMessage: "Looking forward to Rome!",
    trip: "Rome, Italy (20-25 Oct)",
    unread: 0,
  },
  {
    id: 3,
    name: "Mark Lee",
    avatar: "https://i.pravatar.cc/50?img=3",
    online: true,
    lastActive: "30m ago",
    latestMessage: "Can we plan the itinerary?",
    trip: "Tokyo, Japan (5-10 Nov)",
    unread: 1,
  },
  {
    id: 4,
    name: "Alice Brown",
    avatar: "https://i.pravatar.cc/50?img=4",
    online: false,
    lastActive: "3d ago",
    latestMessage: "Excited for our adventure!",
    trip: "New York, USA (1-7 Dec)",
    unread: 0,
  },
];

const Message = () => {
  return (
    <div className="p-3">
      <h4 className="mb-3">💬 Messages</h4>

      {/* Search bar */}
      <Form.Control
        type="text"
        placeholder="Search buddies..."
        className="mb-3"
      />

      {/* Messages grid */}
      <Row xs={1} sm={2} md={2} lg={2} className="g-3">
        {messages.map((msg) => (
          <Col key={msg.id}>
            <Card className="h-100">
              <Card.Body>
                {/* User / Buddy Info */}
                <div className="d-flex align-items-center mb-2">
                  <Image
                    src={msg.avatar}
                    roundedCircle
                    width={40}
                    height={40}
                    className="me-2"
                  />
                  <div>
                    <strong>{msg.name}</strong>{" "}
                    <span
                      style={{
                        display: "inline-block",
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        backgroundColor: msg.online ? "green" : "gray",
                        marginLeft: 5,
                      }}
                    ></span>
                    <div style={{ fontSize: "0.8rem", color: "gray" }}>
                      Last active: {msg.lastActive}
                    </div>
                  </div>
                </div>

                {/* Message Preview */}
                <div className="mb-2">
                  <span
                    style={{
                      fontWeight: msg.unread ? "bold" : "normal",
                    }}
                  >
                    {msg.latestMessage}
                  </span>
                  {msg.unread > 0 && (
                    <Badge bg="danger" className="ms-2">
                      {msg.unread}
                    </Badge>
                  )}
                </div>

                {/* Trip / Context Info */}
                <div style={{ fontSize: "0.8rem", color: "gray" }}>
                  Trip: {msg.trip}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Message;

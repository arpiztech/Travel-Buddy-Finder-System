// src/components/Message.jsx
import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Badge,
  Image,
  Form,
  Button,
  Nav,
} from "react-bootstrap";

// Dummy messages data
const allMessages = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/50?img=1",
    online: true,
    lastActive: "2h ago",
    latestMessage: "Hi! Can I join your trip?",
    trip: "Paris, France (12-18 Sept)",
    unread: 2,
    type: "inbox",
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
    type: "inbox",
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
    type: "inbox",
    starred: true,
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
    type: "archived",
  },
];

// Dummy sent messages
const sentMessages = [
  {
    id: 5,
    name: "David Green",
    avatar: "https://i.pravatar.cc/50?img=5",
    online: false,
    lastActive: "1h ago",
    latestMessage: "Hey, I’ve sent you the plan.",
    trip: "Berlin, Germany (10-15 Oct)",
    unread: 0,
    type: "sent",
  },
];

const Message = () => {
  const [activeTab, setActiveTab] = useState("inbox");
  const [search, setSearch] = useState("");

  // Filtering messages based on tab
  let filteredMessages = [];
  if (activeTab === "inbox") {
    filteredMessages = allMessages.filter((msg) => msg.type === "inbox");
  } else if (activeTab === "sent") {
    filteredMessages = sentMessages;
  } else if (activeTab === "unread") {
    filteredMessages = allMessages.filter((msg) => msg.unread > 0);
  } else if (activeTab === "starred") {
    filteredMessages = allMessages.filter((msg) => msg.starred);
  } else if (activeTab === "archived") {
    filteredMessages = allMessages.filter((msg) => msg.type === "archived");
  }

  // Search filter
  if (search.trim() !== "" && activeTab !== "new") {
    filteredMessages = filteredMessages.filter((msg) =>
      msg.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return (
    <div className="p-3">
      <h4 className="mb-3">💬 Messages</h4>

      {/* Tabs for navigation */}
      <Nav
        variant="tabs"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
      >
        <Nav.Item>
          <Nav.Link eventKey="inbox">📥 Inbox</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="sent">📤 Sent</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="unread">🔴 Unread</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="starred">⭐ Starred</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="archived">🗂️ Archived</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="new">✍️ New Message</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Search bar (except new message form) */}
      {activeTab !== "new" && (
        <Form.Control
          type="text"
          placeholder="Search buddies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="my-3"
        />
      )}

      {/* Content based on tab */}
      {activeTab === "new" ? (
        <Card className="p-3 mt-3 shadow-sm border-0">
          <h5>✍️ Compose New Message</h5>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>To</Form.Label>
              <Form.Control type="text" placeholder="Enter buddy name" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write your message..."
              />
            </Form.Group>
            <Button variant="primary" className="mt-2">
              Send
            </Button>
          </Form>
        </Card>
      ) : (
        <Row xs={1} sm={2} md={2} lg={2} className="g-3 mt-2">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg) => (
              <Col key={msg.id}>
                <Card className="h-100 shadow-sm border-0">
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
                        style={{ fontWeight: msg.unread ? "bold" : "normal" }}
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
            ))
          ) : (
            <p className="text-muted mt-3">No messages found.</p>
          )}
        </Row>
      )}
    </div>
  );
};

export default Message;

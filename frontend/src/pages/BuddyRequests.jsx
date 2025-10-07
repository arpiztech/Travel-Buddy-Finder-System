import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Modal,
  Form,
  Badge,
  InputGroup,
  FormControl,
  Dropdown,
} from "react-bootstrap";

const sampleRequests = [
  {
    id: 1,
    photo: "https://randomuser.me/api/portraits/women/24.jpg",
    name: "Emma Watson",
    age: 28,
    languages: ["English", "French"],
    destination: "Paris",
    travelDates: "12 Aug - 18 Aug",
    status: "pending",
    travelPlans: "Visiting art museums and cafes.",
    buddyPreferences: "Friendly and punctual.",
    reviews: 4.8,
    verified: true,
    lastMessage: "Looking forward to traveling together!",
    isNew: true,
  },
  // ... more requests
];

const BuddyRequestPage = () => {
  const [requests, setRequests] = useState(sampleRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionMessage, setActionMessage] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  // Filter and search logic
  const filteredRequests = requests.filter((r) => {
    if (filterStatus !== "all" && r.status !== filterStatus) return false;
    if (
      !r.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !r.destination.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  const handleAction = (id, action) => {
    if (action === "reject" && !actionMessage.trim()) {
      alert("Please provide a reason for rejection.");
      return;
    }
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: action,
              responseMessage: action === "accept" ? "" : actionMessage,
              isNew: false,
            }
          : r
      )
    );
    setActionMessage("");
    setShowProfile(false);
  };

  const openProfile = (req) => {
    setSelectedRequest(req);
    setShowProfile(true);
    // mark request as read
    if (req.isNew) {
      setRequests((prev) =>
        prev.map((r) => (r.id === req.id ? { ...r, isNew: false } : r))
      );
    }
  };

  const reportUser = (id) => {
    alert("User reported for review.");
    // You could set a flag here to remove or mark user as reported
  };

  return (
    <>
      <div className="container my-4">
        <h2 className="mb-4">📨 Incoming Buddy Requests</h2>
        <div className="d-flex gap-3 mb-3 flex-wrap">
          <InputGroup style={{ maxWidth: 300 }}>
            <FormControl
              placeholder="Search by name or destination"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <Dropdown onSelect={(eventKey) => setFilterStatus(eventKey)}>
            <Dropdown.Toggle variant="outline-primary" id="filter-dropdown">
              Filter:{" "}
              {filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="all">All</Dropdown.Item>
              <Dropdown.Item eventKey="pending">Pending</Dropdown.Item>
              <Dropdown.Item eventKey="accepted">Accepted</Dropdown.Item>
              <Dropdown.Item eventKey="rejected">Rejected</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {filteredRequests.length === 0 ? (
          <p>No requests match your search and filter criteria.</p>
        ) : (
          filteredRequests.map((req) => (
            <Card className="mb-3 shadow-sm" key={req.id}>
              <Card.Body className="d-flex align-items-center gap-3">
                <img
                  src={req.photo}
                  alt={req.name}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <div className="flex-grow-1">
                  <h5 className="mb-1">
                    {req.name}{" "}
                    {req.verified && (
                      <Badge bg="success" title="Verified User">
                        ✔
                      </Badge>
                    )}
                    {req.isNew && (
                      <Badge bg="info" className="ms-2">
                        New
                      </Badge>
                    )}
                  </h5>
                  <p className="mb-1 text-muted">
                    Age: {req.age} | Languages: {req.languages.join(", ")} |
                    Destination: {req.destination}
                  </p>
                  <p className="mb-0 text-muted">
                    Travel Dates: {req.travelDates}
                  </p>
                  {req.lastMessage && (
                    <div
                      className="text-truncate"
                      style={{ maxWidth: "400px" }}
                    >
                      <small>
                        <i>"{req.lastMessage}"</i>
                      </small>
                    </div>
                  )}
                </div>
                <div className="d-flex flex-column gap-2">
                  {req.status === "pending" ? (
                    <>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => openProfile(req)}
                      >
                        View & Respond
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => openProfile(req)}
                      >
                        Reject
                      </Button>
                    </>
                  ) : (
                    <Badge
                      bg={
                        req.status === "accepted"
                          ? "success"
                          : req.status === "rejected"
                          ? "danger"
                          : "secondary"
                      }
                      className="text-capitalize py-2 px-3 align-self-center"
                    >
                      {req.status}
                    </Badge>
                  )}
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => reportUser(req.id)}
                  >
                    Report User
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </div>

      {/* Request Details Modal */}
      <Modal
        show={!!selectedRequest}
        onHide={() => {
          setSelectedRequest(null);
          setActionMessage("");
        }}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedRequest?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <>
              <p>
                <strong>Travel Plans:</strong> {selectedRequest.travelPlans}
              </p>
              <p>
                <strong>Buddy Preferences:</strong>{" "}
                {selectedRequest.buddyPreferences}
              </p>
              <p>
                <strong>Reviews:</strong> {selectedRequest.reviews} / 5
              </p>
              <p>
                <strong>Languages Spoken:</strong>{" "}
                {selectedRequest.languages.join(", ")}
              </p>

              {selectedRequest.status === "pending" && (
                <Form.Group>
                  <Form.Label>Response Message (optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={actionMessage}
                    onChange={(e) => setActionMessage(e.target.value)}
                    placeholder="Write a message to your buddy"
                  />
                  <div className="mt-3 d-flex gap-3">
                    <Button
                      variant="success"
                      onClick={() => handleAction(selectedRequest.id, "accept")}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleAction(selectedRequest.id, "reject")}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setSelectedRequest(null);
                        setActionMessage("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form.Group>
              )}

              {selectedRequest.status !== "pending" && (
                <p>
                  Response message:{" "}
                  {selectedRequest.responseMessage || "No message provided"}
                </p>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BuddyRequestPage;

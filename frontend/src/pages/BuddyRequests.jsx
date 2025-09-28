import React from "react";
import { Card, Button } from "react-bootstrap";

const BuddyRequests = () => {
  const requests = [
    {
      id: 1,
      name: "John Doe",
      message: "Wants to join your trip to Paris ✈️",
      trip: "Paris, France",
      dates: "12th - 18th Sept 2025",
    },
    {
      id: 2,
      name: "Jane Smith",
      message: "Interested in joining your trip to Rome 🇮🇹",
      trip: "Rome, Italy",
      dates: "20th - 25th Oct 2025",
    },
  ];

  return (
    <div className="p-4">
      <h3 className="mb-4">🤝 Buddy Requests</h3>
      {requests.map((req) => (
        <Card className="mb-3" key={req.id}>
          <Card.Body>
            <Card.Title>{req.name}</Card.Title>
            <Card.Text>{req.message}</Card.Text>
            <Card.Text>
              <strong>Trip:</strong> {req.trip} <br />
              <strong>Dates:</strong> {req.dates}
            </Card.Text>
            <Button variant="success" className="me-2">
              Accept
            </Button>
            <Button variant="danger">Decline</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default BuddyRequests;

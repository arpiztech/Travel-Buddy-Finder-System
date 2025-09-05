import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";

const ViewTrip = () => {
  const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd format

  const [trips] = useState([
    {
      destination: "Paris",
      image: "https://flagcdn.com/w320/fr.png", // France flag
      startDate: "2025-09-10",
      endDate: "2025-09-20",
      budget: "1200",
      description: "Exploring the Eiffel Tower, Louvre, and French cuisine.",
    },
    {
      destination: "Goa",
      image: "https://flagcdn.com/w320/in.png", // India flag
      startDate: "2025-09-01",
      endDate: "2025-09-05",
      budget: "500",
      description: "Beach fun, water sports, and nightlife in Goa.",
    },
    {
      destination: "Tokyo",
      image: "https://flagcdn.com/w320/jp.png", // Japan flag
      startDate: "2025-08-20",
      endDate: "2025-08-30",
      budget: "2000",
      description: "Tech city vibes, sushi tasting, and Mount Fuji visit.",
    },
  ]);

  // ✅ Determine status (upcoming, ongoing, completed)
  const getStatus = (start, end) => {
    if (today < start) return "Upcoming";
    if (today >= start && today <= end) return "Ongoing";
    if (today > end) return "Completed";
  };

  return (
    <div className="d-flex flex-wrap justify-content-center gap-4 p-4">
      {trips.map((trip, index) => (
        <Card
          key={index}
          style={{
            width: "20rem",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            borderRadius: "12px",
          }}
        >
          <Card.Img
            variant="top"
            src={trip.image}
            style={{
              height: "150px",
              objectFit: "cover",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            }}
          />
          <Card.Body>
            <Card.Title className="fw-bold">{trip.destination}</Card.Title>
            <Card.Text>
              <b>Dates:</b> {trip.startDate} → {trip.endDate} <br />
              <b>Budget:</b> ${trip.budget} <br />
              <b>Description:</b> {trip.description.slice(0, 60)}... <br />
              <b>Status:</b>{" "}
              <span
                className={`badge ${
                  getStatus(trip.startDate, trip.endDate) === "Upcoming"
                    ? "bg-primary"
                    : getStatus(trip.startDate, trip.endDate) === "Ongoing"
                    ? "bg-success"
                    : "bg-secondary"
                }`}
              >
                {getStatus(trip.startDate, trip.endDate)}
              </span>
            </Card.Text>
            <div className="text-center">
              <Button variant="outline-info" size="sm" className="me-2">
                View Details
              </Button>
              <Button variant="outline-danger" size="sm">
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ViewTrip;

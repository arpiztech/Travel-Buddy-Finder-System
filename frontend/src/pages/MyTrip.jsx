import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Badge, Form } from "react-bootstrap";
import {
  FaPlane,
  FaTrain,
  FaCar,
  FaBus,
  FaHotel,
  FaHome,
  FaCampground,
  FaBed,
} from "react-icons/fa";
import "./MyTrip.css";

// Helper to check trip status based on dates
const getTripStatus = (startDate, endDate) => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (today < start) return "Upcoming";
  if (today >= start && today <= end) return "Ongoing";
  if (today > end) return "Completed";
  return "Cancelled";
};

const MyTrip = () => {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");

  // Load trips from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tbf_trips")) || [];
    setTrips(saved);
  }, []);

  // Save trips to localStorage when updated
  useEffect(() => {
    localStorage.setItem("tbf_trips", JSON.stringify(trips));
  }, [trips]);

  const travelIcons = {
    Flight: <FaPlane className="text-primary" />,
    Train: <FaTrain className="text-success" />,
    Car: <FaCar className="text-warning" />,
    Bus: <FaBus className="text-danger" />,
  };

  const accommodationIcons = {
    Hotel: <FaHotel className="text-primary" />,
    Hostel: <FaBed className="text-success" />,
    Airbnb: <FaHome className="text-warning" />,
    Camping: <FaCampground className="text-danger" />,
  };

  const handleDelete = (index) => {
    const updated = [...trips];
    updated.splice(index, 1);
    setTrips(updated);
  };

  const handleEditSave = () => {
    const updated = [...trips];
    updated[editIndex] = selectedTrip;
    setTrips(updated);
    setEditIndex(null);
    setSelectedTrip(null);
  };

  // Validation for Save button (destination/start/end must be filled)
  const canSave =
    selectedTrip &&
    selectedTrip.destination?.trim() &&
    selectedTrip.startDate &&
    selectedTrip.endDate;

  // Filtered trips based on search
  const filteredTrips = trips.filter((t) =>
    t.destination.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="MyTrip-bg d-flex flex-column align-items-center mt-5 w-100 px-3">
      <h2 className="mb-4">📌 My Trips</h2>

      {/* Search bar */}
      <Form className="mb-4 w-50">
        <Form.Control
          type="text"
          placeholder="🔍 Search by destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form>

      <div className="d-flex flex-wrap justify-content-center gap-4">
        {filteredTrips.length === 0 ? (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              color: "#7d858d",
              fontSize: 18,
              marginTop: 40,
            }}
          >
            <b>No trips found.</b>
            <div style={{ fontSize: 15, marginTop: 8, color: "#b0b5bb" }}>
              Create your first trip to get started!
            </div>
          </div>
        ) : (
          filteredTrips.map((t, i) => {
            const status = getTripStatus(t.startDate, t.endDate);
            return (
              <Card
                key={i}
                style={{
                  width: "20rem",
                  boxShadow: "0 4px 18px 2px #e2eafc55",
                  border: "none",
                  borderRadius: "12px",
                }}
                className="MyTrip-card"
              >
                {t.image ? (
                  <Card.Img
                    variant="top"
                    src={t.image}
                    className="MyTrip-img"
                  />
                ) : (
                  <div
                    style={{
                      height: "150px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "#e3e6ea",
                      color: "#9ba7b6",
                      fontSize: "1rem",
                      borderRadius: "12px 12px 0 0",
                    }}
                  >
                    No image available
                  </div>
                )}
                <Card.Body>
                  <Card.Title className="d-flex justify-content-between align-items-center">
                    <span
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: 135,
                        display: "inline-block",
                      }}
                    >
                      {t.destination}
                    </span>
                    <Badge
                      bg={
                        status === "Upcoming"
                          ? "primary"
                          : status === "Ongoing"
                          ? "success"
                          : status === "Completed"
                          ? "secondary"
                          : "danger"
                      }
                    >
                      {status}
                    </Badge>
                  </Card.Title>
                  <Card.Text style={{ fontSize: "0.96rem" }}>
                    <b>Dates:</b> {t.startDate} → {t.endDate} <br />
                    <b>Budget:</b> ${t.budget} <br />
                    <b>Mode:</b> {travelIcons[t.travelMode]} {t.travelMode}{" "}
                    <br />
                    <b>Stay:</b> {accommodationIcons[t.accommodation]}{" "}
                    {t.accommodation}
                    <br />
                    <b>Activities:</b>{" "}
                    {t.activities && t.activities.length > 0 ? (
                      t.activities.map((act, k) => (
                        <Badge key={k} bg="info" className="me-1">
                          {act}
                        </Badge>
                      ))
                    ) : (
                      <span style={{ color: "#bbb" }}>None</span>
                    )}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() => setSelectedTrip(t)}
                    >
                      View
                    </Button>
                    <Button
                      variant="outline-warning"
                      size="sm"
                      onClick={() => {
                        setSelectedTrip(t);
                        setEditIndex(i);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(i)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            );
          })
        )}
      </div>

      {/* MODAL FOR VIEW / EDIT */}
      <Modal
        show={!!selectedTrip}
        onHide={() => {
          setSelectedTrip(null);
          setEditIndex(null);
        }}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editIndex !== null ? "✏️ Edit Trip" : "📖 Trip Details"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTrip?.image ? (
            <img
              src={selectedTrip.image}
              alt="trip"
              style={{
                width: "100%",
                borderRadius: "8px",
                marginBottom: "20px",
                maxHeight: 240,
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: 180,
                backgroundColor: "#e3e6ea",
                borderRadius: 8,
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#aaa",
                fontSize: 17,
              }}
            >
              No image available
            </div>
          )}

          {editIndex !== null ? (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Destination</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedTrip.destination}
                  isInvalid={!selectedTrip.destination}
                  onChange={(e) =>
                    setSelectedTrip({
                      ...selectedTrip,
                      destination: e.target.value,
                    })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Destination is required
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3 d-flex gap-3">
                <div className="flex-fill">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={selectedTrip.startDate}
                    isInvalid={!selectedTrip.startDate}
                    onChange={(e) =>
                      setSelectedTrip({
                        ...selectedTrip,
                        startDate: e.target.value,
                      })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    Start date is required
                  </Form.Control.Feedback>
                </div>
                <div className="flex-fill">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={selectedTrip.endDate}
                    isInvalid={!selectedTrip.endDate}
                    onChange={(e) =>
                      setSelectedTrip({
                        ...selectedTrip,
                        endDate: e.target.value,
                      })
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    End date is required
                  </Form.Control.Feedback>
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Budget</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedTrip.budget}
                  onChange={(e) =>
                    setSelectedTrip({
                      ...selectedTrip,
                      budget: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={selectedTrip.description}
                  onChange={(e) =>
                    setSelectedTrip({
                      ...selectedTrip,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </>
          ) : (
            <>
              <p>
                <b>Destination:</b> {selectedTrip?.destination}
              </p>
              <p>
                <b>Dates:</b> {selectedTrip?.startDate} →{" "}
                {selectedTrip?.endDate}
              </p>
              <p>
                <b>Budget:</b> ${selectedTrip?.budget}
              </p>
              <p>
                <b>Travel Mode:</b> {travelIcons[selectedTrip?.travelMode]}{" "}
                {selectedTrip?.travelMode}
              </p>
              <p>
                <b>Accommodation:</b>{" "}
                {accommodationIcons[selectedTrip?.accommodation]}{" "}
                {selectedTrip?.accommodation}
              </p>
              <p>
                <b>Activities:</b>{" "}
                {selectedTrip?.activities?.length > 0 ? (
                  selectedTrip.activities.map((act, k) => (
                    <Badge key={k} bg="info" className="me-1">
                      {act}
                    </Badge>
                  ))
                ) : (
                  <span style={{ color: "#bbb" }}>None</span>
                )}
              </p>
              <p>
                <b>Description:</b> {selectedTrip?.description}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {editIndex !== null ? (
            <Button
              variant="success"
              onClick={handleEditSave}
              disabled={!canSave}
            >
              Save Changes
            </Button>
          ) : (
            <Button variant="secondary" onClick={() => setSelectedTrip(null)}>
              Close
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyTrip;

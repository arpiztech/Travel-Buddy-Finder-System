import React, { useState } from "react";
import { Accordion, Card, ListGroup, Form } from "react-bootstrap";

const TripTimeline = ({ itinerary }) => {
  const [notes, setNotes] = useState({});

  const handleNoteChange = (day, value) => {
    setNotes((prev) => ({ ...prev, [day]: value }));
  };

  return (
    <Accordion defaultActiveKey="0" alwaysOpen>
      {itinerary.map((day, idx) => (
        <Accordion.Item eventKey={idx.toString()} key={idx}>
          {/* Day Header */}
          <Accordion.Header>
            <div>
              <strong>Day {day.day} - {day.date}</strong> <br />
              <span>{day.title}</span>
            </div>
          </Accordion.Header>

          {/* Day Content */}
          <Accordion.Body>
            <p>{day.description}</p>

            {/* Activities List */}
            <ListGroup className="mb-3">
              {day.activities.map((act, i) => (
                <ListGroup.Item key={i}>
                  <span style={{ fontSize: "1.2rem", marginRight: "8px" }}>
                    {act.icon}
                  </span>
                  <strong>{act.time}</strong> → {act.name}

                  {/* Expandable Details */}
                  {act.details && (
                    <Accordion className="mt-2">
                      <Accordion.Item eventKey={`${idx}-${i}`}>
                        <Accordion.Header>More Details</Accordion.Header>
                        <Accordion.Body>
                          <p>{act.details}</p>
                          {act.mapLink && (
                            <iframe
                              title={act.name}
                              src={`https://www.google.com/maps?q=${encodeURIComponent(
                                act.mapLink
                              )}&output=embed`}
                              width="100%"
                              height="200"
                              style={{ border: 0 }}
                              allowFullScreen
                            />
                          )}
                          {act.photos && (
                            <div className="mt-2 d-flex gap-2 flex-wrap">
                              {act.photos.map((p, pi) => (
                                <img
                                  key={pi}
                                  src={p}
                                  alt="Activity"
                                  style={{
                                    width: "100px",
                                    height: "80px",
                                    borderRadius: "8px",
                                    objectFit: "cover",
                                  }}
                                />
                              ))}
                            </div>
                          )}
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>

            {/* Notes Section */}
            <Card className="p-3 bg-light">
              <Form.Group>
                <Form.Label><strong>Notes for Day {day.day}</strong></Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={notes[day.day] || ""}
                  onChange={(e) => handleNoteChange(day.day, e.target.value)}
                  placeholder="Write your notes here..."
                />
              </Form.Group>
            </Card>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default TripTimeline;

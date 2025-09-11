import React, { useState } from "react";
import { Accordion, Card, ListGroup, Form, Button } from "react-bootstrap";

const TripTimeline = ({ itinerary }) => {
  const [notes, setNotes] = useState({});
  const [expanded, setExpanded] = useState(null); // for activity details toggle

  const handleNoteChange = (day, value) => {
    setNotes((prev) => ({ ...prev, [day]: value }));
  };

  const toggleExpand = (key) => {
    setExpanded(expanded === key ? null : key);
  };

  return (
    <Accordion defaultActiveKey="0" alwaysOpen>
      {itinerary.map((day, idx) => (
        <Accordion.Item eventKey={idx.toString()} key={idx}>
          {/* Day Header */}
          <Accordion.Header>
            <div>
              <strong>
                Day {day.day} - {day.date}
              </strong>
              <br />
              <span>{day.title}</span>
            </div>
          </Accordion.Header>

          {/* Day Content */}
          <Accordion.Body>
            <p>{day.description}</p>

            {/* Activities List */}
            <ListGroup className="mb-3">
              {day.activities.map((act, i) => {
                const key = `${idx}-${i}`;
                return (
                  <ListGroup.Item key={i}>
                    <span style={{ fontSize: "1.2rem", marginRight: "8px" }}>
                      {act.icon}
                    </span>
                    <strong>{act.time}</strong> → {act.name}
                    {act.details && (
                      <div className="mt-2">
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => toggleExpand(key)}
                        >
                          {expanded === key ? "Hide Details" : "More Details"}
                        </Button>
                        {expanded === key && (
                          <Card className="p-2 mt-2">
                            <p>{act.details}</p>

                            {/* Google Maps */}
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

                            {/* Photos */}
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
                          </Card>
                        )}
                      </div>
                    )}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>

            {/* Notes Section */}
            <Card className="p-3 bg-light">
              <Form.Group>
                <Form.Label>
                  <strong>Notes for Day {day.day}</strong>
                </Form.Label>
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

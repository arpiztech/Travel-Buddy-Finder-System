import React, { useState } from "react";
import {
  Accordion,
  Card,
  ListGroup,
  Form,
  Button,
  Badge,
  OverlayTrigger,
  Tooltip,
  ProgressBar,
} from "react-bootstrap";

const TripTimeline = ({ itinerary }) => {
  const [notes, setNotes] = useState({});
  const [savedNotes, setSavedNotes] = useState({});
  const [expanded, setExpanded] = useState(null);
  const [doneMap, setDoneMap] = useState({});
  const [favActs, setFavActs] = useState({});

  // ✅ Check if the given date is today
  const isToday = (date) => {
    const d = new Date(date);
    const now = new Date();
    return (
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  };

  // ✅ Toggle expand/collapse
  const toggleExpand = (key) => setExpanded(expanded === key ? null : key);

  // ✅ Toggle activity completion
  const toggleDone = (key) =>
    setDoneMap((prev) => ({ ...prev, [key]: !prev[key] }));

  // ✅ Toggle favorite activity
  const toggleFavorite = (key) =>
    setFavActs((prev) => ({ ...prev, [key]: !prev[key] }));

  // ✅ Copy notes to clipboard
  const handleCopyNotes = (day) => {
    navigator.clipboard.writeText(notes[day] || "");
  };

  // ✅ Handle notes input change
  const handleNoteChange = (day, value) =>
    setNotes((prev) => ({ ...prev, [day]: value }));

  // ✅ Save notes for a specific day
  const handleSaveNote = (day) =>
    setSavedNotes((prev) => ({ ...prev, [day]: notes[day] }));

  // ✅ Undo unsaved notes
  const handleUndoNote = (day) =>
    setNotes((prev) => ({ ...prev, [day]: savedNotes[day] || "" }));

  return (
    <div className="timeline-outer">
      <Accordion defaultActiveKey="0" alwaysOpen>
        {itinerary.map((day, idx) => {
          const dayKey = idx.toString();
          const completedCount = day.activities.filter(
            (_, i) => doneMap[`${dayKey}-${i}`]
          ).length;
          const totalCount = day.activities.length;

          return (
            <Accordion.Item eventKey={dayKey} key={dayKey}>
              <Accordion.Header>
                <div className="timeline-header">
                  <strong>
                    Day {day.day} - {day.date}
                    {isToday(day.date) && (
                      <Badge className="is-today ms-2">Today</Badge>
                    )}
                  </strong>
                  <span className="timeline-title">{day.title}</span>
                </div>
              </Accordion.Header>

              <Accordion.Body>
                <ProgressBar
                  now={(completedCount / totalCount) * 100}
                  label={`${completedCount} / ${totalCount} Completed`}
                  className="mb-3"
                  style={{ height: "18px" }}
                />

                <p className="day-description">{day.description}</p>

                <ListGroup className="mb-3">
                  {day.activities.map((act, i) => {
                    const actKey = `${dayKey}-${i}`;
                    return (
                      <ListGroup.Item
                        key={actKey}
                        className={`activity-item ${
                          doneMap[actKey] ? "done" : ""
                        } ${favActs[actKey] ? "favorite" : ""}`}
                        onDoubleClick={() => toggleDone(actKey)}
                      >
                        <span className="activity-icon">{act.icon}</span>
                        <span className="activity-time">{act.time}</span>
                        <span className="activity-name">{act.name}</span>

                        {act.priority && (
                          <Badge bg="warning" className="ms-2 priority-badge">
                            {act.priority}
                          </Badge>
                        )}

                        <span
                          className="favorite-star"
                          title="Toggle Favorite"
                          onClick={() => toggleFavorite(actKey)}
                        >
                          {favActs[actKey] ? "★" : "☆"}
                        </span>

                        {act.details && (
                          <>
                            <Button
                              variant="link"
                              size="sm"
                              onClick={() => toggleExpand(actKey)}
                              aria-controls={`details-${actKey}`}
                              aria-expanded={expanded === actKey}
                              className="details-btn"
                            >
                              {expanded === actKey
                                ? "Hide Details"
                                : "More Details"}
                            </Button>

                            {expanded === actKey && (
                              <Card className="activity-details p-3">
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
                                  ></iframe>
                                )}

                                {act.photos && (
                                  <div className="activity-photos mt-2 d-flex flex-wrap gap-2">
                                    {act.photos.map((p, pi) => (
                                      <img
                                        key={pi}
                                        src={p}
                                        alt="Activity"
                                        className="activity-photo"
                                      />
                                    ))}
                                  </div>
                                )}
                              </Card>
                            )}
                          </>
                        )}
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>

                <Card className="notes-section p-3 bg-light">
                  <Form.Group>
                    <Form.Label>
                      <strong>Notes for Day {day.day}</strong>
                    </Form.Label>
                    <div className="d-flex gap-2 flex-wrap">
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={notes[day.day] || ""}
                        onChange={(e) =>
                          handleNoteChange(day.day, e.target.value)
                        }
                        placeholder="Write your notes here..."
                        className="note-textarea"
                      />
                      <Button
                        variant="success"
                        onClick={() => handleSaveNote(day.day)}
                        disabled={savedNotes[day.day] === notes[day.day]}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outline-danger"
                        disabled={savedNotes[day.day] === notes[day.day]}
                        onClick={() => handleUndoNote(day.day)}
                      >
                        Undo
                      </Button>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Copy Notes to Clipboard</Tooltip>}
                      >
                        <Button
                          variant="secondary"
                          onClick={() => handleCopyNotes(day.day)}
                        >
                          Copy
                        </Button>
                      </OverlayTrigger>
                    </div>
                  </Form.Group>
                </Card>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
};

export default TripTimeline;

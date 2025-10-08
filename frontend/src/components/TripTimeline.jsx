import React, { useState } from "react";
import {
  Accordion,
  Card,
  ListGroup,
  Form,
  Button,
  Badge,
  ProgressBar,
  OverlayTrigger,
  Tooltip,
  Alert,
} from "react-bootstrap";

/* ---------------------------------------------------------
   📘 Timeline Intro Section (Top Information Bar)
---------------------------------------------------------- */
const TimelineIntro = ({ jumpToToday }) => (
  <div className="mb-4">
    <h4 className="fw-bold mb-2">🗓️ Trip Timeline</h4>
    <Alert variant="info" className="mb-3">
      Keep track of your travel journey with day-by-day insights. You can mark
      activities as completed, add notes, and share feedback with your travel
      buddies. Click any day to view detailed plans and upload photos of your
      favorite moments.
    </Alert>
    <div className="d-flex gap-3 flex-wrap align-items-center mb-2">
      <Button variant="primary" onClick={jumpToToday}>
        Jump to Today
      </Button>
      <span className="text-muted small">
        💡 Tip: Add personal notes, comments, or mark your favorite moments as
        you go!
      </span>
    </div>
  </div>
);

/* ---------------------------------------------------------
   📅 Main Timeline Component
---------------------------------------------------------- */
const TripTimeline = ({ itinerary }) => {
  // Local states for managing notes, favorites, comments, etc.
  const [notes, setNotes] = useState({});
  const [savedNotes, setSavedNotes] = useState({});
  const [expanded, setExpanded] = useState(null);
  const [doneMap, setDoneMap] = useState({});
  const [favActs, setFavActs] = useState({});
  const [comments, setComments] = useState({});
  const [photos, setPhotos] = useState({});
  const [pinnedComments, setPinnedComments] = useState({});

  /* ------------------------------
     🕓 Utility Functions
  ------------------------------ */
  const isToday = (date) => {
    const d = new Date(date);
    const now = new Date();
    return (
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  };

  const jumpToToday = () => {
    const todayIdx = itinerary.findIndex((d) => {
      if (!d.date) return false;
      const now = new Date();
      const dt = new Date(d.date);
      return (
        dt.getFullYear() === now.getFullYear() &&
        dt.getMonth() === now.getMonth() &&
        dt.getDate() === now.getDate()
      );
    });
    if (todayIdx > -1) setExpanded(todayIdx.toString());
  };

  /* ------------------------------
     ✏️ Notes & Comments Handlers
  ------------------------------ */
  const handleNoteChange = (day, value) =>
    setNotes((prev) => ({ ...prev, [day]: value }));

  const handleSaveNote = (day) =>
    setSavedNotes((prev) => ({ ...prev, [day]: notes[day] }));

  const handleUndoNote = (day) =>
    setNotes((prev) => ({ ...prev, [day]: savedNotes[day] || "" }));

  const handleCopyNotes = (day) =>
    navigator.clipboard.writeText(notes[day] || "");

  const handleCommentChange = (key, value) =>
    setComments((prev) => ({ ...prev, [key]: value }));

  const handlePinComment = (key) =>
    setPinnedComments((prev) => ({ ...prev, [key]: comments[key] || "" }));

  /* ------------------------------
     ⭐ Activity Interaction Handlers
  ------------------------------ */
  const toggleExpand = (key) => setExpanded(expanded === key ? null : key);
  const toggleDone = (key) =>
    setDoneMap((prev) => ({ ...prev, [key]: !prev[key] }));
  const toggleFavorite = (key) =>
    setFavActs((prev) => ({ ...prev, [key]: !prev[key] }));

  /* ------------------------------
     📸 Photo Upload Handler
  ------------------------------ */
  const handlePhotoUpload = (key, files) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = () =>
        setPhotos((prev) => ({
          ...prev,
          [key]: [...(prev[key] || []), reader.result],
        }));
      reader.readAsDataURL(files[0]);
    }
  };

  /* ------------------------------
     📤 Export Timeline
  ------------------------------ */
  const handleExportTimeline = () => {
    alert("📦 Export & Share Timeline feature coming soon!");
  };

  /* ------------------------------
     🧭 Render Section
  ------------------------------ */
  return (
    <>
      <TimelineIntro jumpToToday={jumpToToday} />

      <Button
        size="sm"
        variant="success"
        className="mb-3"
        onClick={handleExportTimeline}
      >
        Export & Share Timeline
      </Button>

      <Accordion activeKey={expanded ?? "0"} alwaysOpen>
        {itinerary.map((day, idx) => {
          const dayKey = idx.toString();
          const completedCount = day.activities.filter(
            (_, i) => doneMap[`${dayKey}-${i}`]
          ).length;
          const totalCount = day.activities.length;

          return (
            <Accordion.Item eventKey={dayKey} key={dayKey}>
              <Accordion.Header>
                <div className="timeline-header w-100">
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
                {/* Progress Bar */}
                <ProgressBar
                  now={(completedCount / totalCount) * 100}
                  label={`${completedCount} / ${totalCount} Completed`}
                  className="mb-3"
                  style={{ height: "18px" }}
                />

                <p className="day-description">{day.description}</p>

                {/* Activity List */}
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

                        {/* Badges */}
                        {act.priority && (
                          <Badge bg="warning" className="ms-2">
                            {act.priority}
                          </Badge>
                        )}
                        {act.type && (
                          <Badge bg="info" className="ms-2">
                            {act.type}
                          </Badge>
                        )}

                        {/* Favorite toggle */}
                        <span
                          className="favorite-star"
                          title="Mark Favorite"
                          onClick={() => toggleFavorite(actKey)}
                        >
                          {favActs[actKey] ? "★" : "☆"}
                        </span>

                        {/* Activity Details */}
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

                                {/* Upload Photos */}
                                <Form.Group className="mt-3">
                                  <Form.Label>Upload Activity Photo</Form.Label>
                                  <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                      handlePhotoUpload(actKey, e.target.files)
                                    }
                                  />
                                </Form.Group>

                                {photos[actKey] && (
                                  <div className="activity-photos mt-3 d-flex flex-wrap gap-2">
                                    {photos[actKey].map((p, pi) => (
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

                        {/* Comments */}
                        <Form.Group className="mt-2">
                          <Form.Control
                            type="text"
                            placeholder="Add a comment..."
                            value={comments[actKey] || ""}
                            onChange={(e) =>
                              handleCommentChange(actKey, e.target.value)
                            }
                          />
                          <Button
                            size="sm"
                            variant="outline-info"
                            className="mt-2"
                            onClick={() => handlePinComment(actKey)}
                          >
                            Pin Comment
                          </Button>

                          {pinnedComments[actKey] && (
                            <div className="text-primary small mt-1">
                              📌 Pinned: {pinnedComments[actKey]}
                            </div>
                          )}
                        </Form.Group>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>

                {/* Notes Section */}
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
    </>
  );
};

export default TripTimeline;

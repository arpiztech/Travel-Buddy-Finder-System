// src/pages/ViewTrip.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  ListGroup,
  Button,
  ProgressBar,
  Carousel,
  Tabs,
  Tab,
  Form,
} from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import {
  FaPlane,
  FaTrain,
  FaCar,
  FaBus,
  FaHotel,
  FaHome,
  FaCampground,
  FaBed,
  FaUserFriends,
  FaShareAlt,
  FaCheckCircle,
  FaMapMarkedAlt,
  FaUmbrellaBeach,
  FaCloudSun,
  FaCloudRain,
  FaSun,
  FaCloud,
  FaShoppingBag,
} from "react-icons/fa";

// ------------------ helpers ------------------
const statusFromDates = (start, end) => {
  const today = new Date();
  const s = new Date(start);
  const e = new Date(end);
  if (today < s) return "Upcoming";
  if (today >= s && today <= e) return "Ongoing";
  if (today > e) return "Completed";
  return "Cancelled";
};

const travelIcons = {
  Flight: <FaPlane />,
  Train: <FaTrain />,
  Car: <FaCar />,
  Bus: <FaBus />,
};

const stayIcons = {
  Hotel: <FaHotel />,
  Hostel: <FaBed />,
  Airbnb: <FaHome />,
  Camping: <FaCampground />,
};

const emojiWeather = (type) => {
  switch (type) {
    case "Sunny":
      return <FaSun />;
    case "Partly Cloudy":
      return <FaCloudSun />;
    case "Cloudy":
      return <FaCloud />;
    case "Rainy":
      return <FaCloudRain />;
    default:
      return <FaCloudSun />;
  }
};

// Simple CSS Pie via conic-gradient
const Pie = ({ planned = 0, budget = 1 }) => {
  const pct = Math.min(100, Math.round((planned / budget) * 100));
  return (
    <div
      style={{
        width: 130,
        height: 130,
        borderRadius: "50%",
        background: `conic-gradient(#0d6efd ${pct}%, #e9ecef ${pct}% 100%)`,
        display: "grid",
        placeItems: "center",
        fontWeight: 700,
      }}
      title={`${pct}% of budget planned`}
    >
      {pct}%
    </div>
  );
};

// ------------------ component ------------------
const ViewTrip = () => {
  const { id } = useParams(); // optional
  const [trip, setTrip] = useState(null);

  // checklist state
  const checklistKey = useMemo(() => `tbf_checklist_${id ?? "demo"}`, [id]);
  const [checklist, setChecklist] = useState([
    { label: "Passport / ID", done: false },
    { label: "Tickets & Booking", done: false },
    { label: "Camera / Charger", done: false },
    { label: "Medicines", done: false },
    { label: "Trek Shoes", done: false },
  ]);

  // demo data
  const demoTrip = useMemo(
    () => ({
      title: "Paris & Versailles Getaway",
      destination: "Paris, France",
      startDate: "2025-09-10",
      endDate: "2025-09-14",
      budget: 50000,
      plannedSpend: 32000,
      travelMode: "Flight",
      accommodation: "Hotel",
      hotel: {
        name: "Hotel Lumière",
        address: "12 Rue de Rivoli, Paris",
        checkIn: "2025-09-10",
        checkOut: "2025-09-14",
      },
      tickets: {
        bookingId: "PAR-AX1245",
        departFrom: "DEL Airport",
        arriveTo: "CDG Airport",
        departTime: "2025-09-10 06:30",
        returnTime: "2025-09-14 21:15",
      },
      itinerary: [
        {
          day: 1,
          title: "Arrival & Seine Walk",
          items: ["Arrive at CDG", "Check-in Hotel", "Evening Seine walk", "Dinner near Louvre"],
        },
        {
          day: 2,
          title: "City Highlights",
          items: ["Eiffel Tower", "Louvre Museum", "Cafe hopping"],
        },
        {
          day: 3,
          title: "Versailles Day Trip",
          items: ["RER to Versailles", "Palace & Gardens", "Back to Paris"],
        },
        {
          day: 4,
          title: "Shopping & Departure",
          items: ["Le Marais shopping", "Macarons 🍬", "Departure"],
        },
      ],
      activities: ["Culture", "Food", "Photography", "Shopping"],
      description: "Light itinerary with cafe time and evening walks.",
      images: [
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
      ],
      mapPins: [
        { label: "CDG Airport", q: "Charles de Gaulle Airport, Paris" },
        { label: "Hotel Lumière", q: "12 Rue de Rivoli, Paris" },
        { label: "Eiffel Tower", q: "Eiffel Tower, Paris" },
        { label: "Louvre Museum", q: "Louvre Museum, Paris" },
        { label: "Versailles Palace", q: "Palace of Versailles" },
      ],
      buddies: [
        { name: "Aarav", interests: ["Food", "Photo"], status: "Joined", avatar: "https://i.pravatar.cc/80?img=12" },
        { name: "Maya", interests: ["Culture"], status: "Pending", avatar: "https://i.pravatar.cc/80?img=32" },
        { name: "Kabir", interests: ["Shopping"], status: "Invited", avatar: "https://i.pravatar.cc/80?img=22" },
      ],
      weather: [
        { day: "Wed", type: "Sunny", temp: "27°C" },
        { day: "Thu", type: "Partly Cloudy", temp: "25°C" },
        { day: "Fri", type: "Rainy", temp: "22°C" },
        { day: "Sat", type: "Sunny", temp: "26°C" },
      ],
    }),
    []
  );

  // load trip
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("tbf_trips")) || [];
      const t = id != null && saved[id] ? saved[id] : demoTrip;
      t.budget = Number(t.budget || demoTrip.budget);
      t.plannedSpend = Number(t.plannedSpend ?? Math.floor((t.budget || 1) * 0.6));
      setTrip(t);
    } catch {
      setTrip(demoTrip);
    }
  }, [id, demoTrip]);

  // load checklist
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(checklistKey));
    if (saved && Array.isArray(saved)) setChecklist(saved);
  }, [checklistKey]);

  // save checklist
  useEffect(() => {
    localStorage.setItem(checklistKey, JSON.stringify(checklist));
  }, [checklist, checklistKey]);

  if (!trip) return null;
  const status = statusFromDates(trip.startDate, trip.endDate);

  const handleChecklistToggle = (idx) => {
    setChecklist((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, done: !c.done } : c))
    );
  };

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <Row className="mb-3 align-items-center">
        <Col md={8}>
          <h3 className="mb-1">
            {trip.title} — <Badge bg="secondary">{trip.destination}</Badge>
          </h3>
          <div className="text-muted">
            {trip.startDate} → {trip.endDate} •{" "}
            <Badge bg={status === "Upcoming" ? "primary" : status === "Ongoing" ? "success" : "dark"}>
              {status}
            </Badge>
          </div>
        </Col>
        <Col md={4} className="text-md-end mt-3 mt-md-0">
          <Link to="/mytrip">
            <Button variant="outline-secondary" className="me-2">← Back</Button>
          </Link>
          <Button variant="primary"><FaShareAlt className="me-2" />Share</Button>
        </Col>
      </Row>

      {/* Top row */}
      <Row className="g-4">
        <Col lg={6}>
          <Card>
            {trip.images?.length ? (
              <Carousel>
                {trip.images.map((src, i) => (
                  <Carousel.Item key={i}>
                    <img src={src} alt="slide" style={{ width: "100%", height: 320, objectFit: "cover" }} />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <div className="d-flex h-100 align-items-center justify-content-center p-5">
                <FaUmbrellaBeach size={48} className="me-2" />
                <span className="text-muted">No images yet</span>
              </div>
            )}
          </Card>
        </Col>

        <Col lg={3}>
          <Card>
            <Card.Body>
              <h5>Travel Details</h5>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Mode: {travelIcons[trip.travelMode]} {trip.travelMode}
                </ListGroup.Item>
                <ListGroup.Item>
                  Stay: {stayIcons[trip.accommodation]} {trip.accommodation}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3}>
          <Card>
            <Card.Body className="text-center">
              <h6>Expense Tracker</h6>
              <Pie planned={trip.plannedSpend} budget={trip.budget} />
              <div className="mt-2">Budget: ₹{trip.budget}</div>
              <div>Planned: ₹{trip.plannedSpend}</div>
              <ProgressBar now={(trip.plannedSpend / trip.budget) * 100} className="mt-2" />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ---- Tabs Section ---- */}
      <Card className="shadow-sm mt-4">
        <Card.Body>
          <Tabs defaultActiveKey="timeline" fill>
            {/* Timeline */}
            <Tab eventKey="timeline" title="Timeline">
              <ListGroup>
                {trip.itinerary.map((d) => (
                  <ListGroup.Item key={d.day}>
                    <strong>Day {d.day}:</strong> {d.title} — {d.items.join(", ")}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Tab>

            {/* Map */}
            <Tab eventKey="map" title="Map">
              <Tabs defaultActiveKey={trip.mapPins[0].label} className="mb-3">
                {trip.mapPins.map((p, i) => (
                  <Tab eventKey={p.label} title={p.label} key={i}>
                    <div className="ratio ratio-16x9">
                      <iframe
                        title={p.label}
                        src={`https://www.google.com/maps?q=${encodeURIComponent(p.q)}&output=embed`}
                        style={{ border: 0 }}
                        allowFullScreen
                      />
                    </div>
                  </Tab>
                ))}
              </Tabs>
            </Tab>

            {/* Buddies */}
            <Tab eventKey="buddies" title="Buddies">
              {trip.buddies.map((b, i) => (
                <ListGroup.Item key={i}>
                  <img src={b.avatar} alt={b.name} style={{ width: 32, borderRadius: "50%", marginRight: 8 }} />
                  {b.name} — {b.status}
                </ListGroup.Item>
              ))}
            </Tab>

            {/* Weather */}
            <Tab eventKey="weather" title="Weather">
              <Row>
                {trip.weather.map((w, i) => (
                  <Col xs={6} md={3} key={i}>
                    <Card className="text-center">
                      <Card.Body>
                        <div>{w.day}</div>
                        <div style={{ fontSize: 24 }}>{emojiWeather(w.type)}</div>
                        <div>{w.temp}</div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Tab>

            {/* Checklist */}
            <Tab eventKey="checklist" title="Checklist">
              <ListGroup>
                {checklist.map((c, i) => (
                  <ListGroup.Item key={i}>
                    <Form.Check
                      type="checkbox"
                      label={c.label}
                      checked={c.done}
                      onChange={() => handleChecklistToggle(i)}
                    />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Tab>

            {/* Activities */}
            <Tab eventKey="activities" title="Activities">
              {trip.activities.map((a, i) => (
                <Badge bg="info" key={i} className="me-2">
                  {a}
                </Badge>
              ))}
            </Tab>

            {/* Notes */}
            <Tab eventKey="notes" title="Notes">
              <p>{trip.description}</p>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ViewTrip;

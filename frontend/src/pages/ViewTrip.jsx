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
  FaUsers,
  FaCloudSun,
  FaCloudRain,
  FaSun,
  FaCloud,
  FaClipboardCheck,
  FaRegStickyNote,
  FaMapMarkedAlt,
  FaBars,
  FaTasks,
  FaInfoCircle,
} from "react-icons/fa";
import TripTimeline from "../components/TripTimeline";

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

const Pie = ({ planned = 0, budget = 1 }) => {
  const pct = Math.min(100, Math.round((planned / budget) * 100));
  return (
    <div
      style={{
        width: 100,
        height: 100,
        borderRadius: "50%",
        background: `conic-gradient(#0d6efd ${pct}%, #e9ecef ${pct}% 100%)`,
        display: "grid",
        placeItems: "center",
        fontWeight: 700,
      }}
    >
      {pct}%
    </div>
  );
};

// ------------------ component ------------------
const ViewTrip = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const checklistKey = useMemo(() => `tbf_checklist_${id ?? "demo"}`, [id]);
  const [checklist, setChecklist] = useState([
    { label: "Passport / ID", done: false },
    { label: "Tickets & Booking", done: false },
    { label: "Camera / Charger", done: false },
    { label: "Medicines", done: false },
    { label: "Trek Shoes", done: false },
  ]);

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
      itinerary: [
        { day: 1, title: "Arrival & Seine Walk", items: ["Arrive at CDG", "Hotel check-in", "Evening walk"] },
        { day: 2, title: "City Highlights", items: ["Eiffel Tower", "Louvre Museum", "Cafe hopping"] },
        { day: 3, title: "Versailles Day Trip", items: ["Palace of Versailles", "Gardens", "Return"] },
        { day: 4, title: "Shopping & Departure", items: ["Le Marais shopping", "Departure"] },
      ],
      activities: ["Culture", "Food", "Photography", "Shopping"],
      description: "Light itinerary with cafe time and evening walks.",
      mapPins: [
        { label: "CDG Airport", q: "Charles de Gaulle Airport, Paris" },
        { label: "Eiffel Tower", q: "Eiffel Tower, Paris" },
        { label: "Louvre Museum", q: "Louvre Museum, Paris" },
      ],
      buddies: [
        { name: "Aarav", status: "Joined", avatar: "https://i.pravatar.cc/80?img=12" },
        { name: "Maya", status: "Pending", avatar: "https://i.pravatar.cc/80?img=32" },
      ],
      weather: [
        { day: "Wed", type: "Sunny", temp: "27°C" },
        { day: "Thu", type: "Partly Cloudy", temp: "25°C" },
        { day: "Fri", type: "Rainy", temp: "22°C" },
      ],
    }),
    []
  );

  useEffect(() => {
    setTrip(demoTrip);
  }, [demoTrip]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(checklistKey));
    if (saved && Array.isArray(saved)) setChecklist(saved);
  }, [checklistKey]);

  useEffect(() => {
    localStorage.setItem(checklistKey, JSON.stringify(checklist));
  }, [checklist, checklistKey]);

  if (!trip) return null;
  const status = statusFromDates(trip.startDate, trip.endDate);

  const handleChecklistToggle = (idx) => {
    setChecklist((prev) => prev.map((c, i) => (i === idx ? { ...c, done: !c.done } : c)));
  };

  // Sidebar items
  const menu = [
    { key: "overview", label: "Overview", icon: <FaInfoCircle /> },
    { key: "timeline", label: "Timeline", icon: <FaTasks /> },
    { key: "map", label: "Map", icon: <FaMapMarkedAlt /> },
    { key: "buddies", label: "Buddies", icon: <FaUsers /> },
    { key: "weather", label: "Weather", icon: <FaCloudSun /> },
    { key: "checklist", label: "Checklist", icon: <FaClipboardCheck /> },
    { key: "activities", label: "Activities", icon: <FaBars /> },
    { key: "notes", label: "Notes", icon: <FaRegStickyNote /> },
  ];

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div className="sidebar d-flex flex-column p-3 text-white">
        <h5 className="mb-4">✈️ View Trip</h5>
        {menu.map((item) => (
          <div
            key={item.key}
            className={`sidebar-item ${activeTab === item.key ? "active" : ""}`}
            onClick={() => setActiveTab(item.key)}
          >
            {item.icon} <span>{item.label}</span>
          </div>
        ))}
        <div className="mt-auto small text-center">
          <Link to="/mytrip">
            <Button variant="light" size="sm">← Back</Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <Container fluid className="p-4">
        <h4>{trip.title}</h4>
        <p>
          {trip.destination} • {trip.startDate} → {trip.endDate} •{" "}
          <Badge bg="secondary">{status}</Badge>
        </p>

        <Card className="p-3">
          {activeTab === "overview" && (
            <Row>
              <Col md={6}>
                <h6>Travel</h6>
                {travelIcons[trip.travelMode]} {trip.travelMode}
                <br />
                {stayIcons[trip.accommodation]} {trip.accommodation}
              </Col>
              <Col md={6} className="text-center">
                <h6>Budget</h6>
                <Pie planned={trip.plannedSpend} budget={trip.budget} />
                <div>₹{trip.plannedSpend} / ₹{trip.budget}</div>
                <ProgressBar now={(trip.plannedSpend / trip.budget) * 100} />
              </Col>
            </Row>
          )}

         {activeTab === "timeline" && (
  <TripTimeline itinerary={trip.itinerary} />
)}


          {activeTab === "map" && (
            trip.mapPins.map((p, i) => (
              <div className="ratio ratio-16x9 mb-3" key={i}>
                <iframe
                  title={p.label}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(p.q)}&output=embed`}
                  style={{ border: 0 }}
                  allowFullScreen
                />
              </div>
            ))
          )}

          {activeTab === "buddies" && (
            <ListGroup>
              {trip.buddies.map((b, i) => (
                <ListGroup.Item key={i}>
                  <img src={b.avatar} alt={b.name} style={{ width: 30, borderRadius: "50%", marginRight: 8 }} />
                  {b.name} — {b.status}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}

          {activeTab === "weather" && (
            <Row>
              {trip.weather.map((w, i) => (
                <Col xs={6} md={4} key={i}>
                  <Card className="text-center mb-3">
                    <Card.Body>
                      <div>{w.day}</div>
                      <div style={{ fontSize: 24 }}>{emojiWeather(w.type)}</div>
                      <div>{w.temp}</div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}

          {activeTab === "checklist" && (
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
          )}

          {activeTab === "activities" && (
            trip.activities.map((a, i) => (
              <Badge bg="info" key={i} className="me-2">{a}</Badge>
            ))
          )}

          {activeTab === "notes" && (
            <p>{trip.description}</p>
          )}
        </Card>
      </Container>

      {/* Sidebar CSS */}
      <style jsx>{`
        .sidebar {
          width: 220px;
          background: #0b0b2b;
        }
        .sidebar-item {
          display: flex;
          align-items: center;
          padding: 10px;
          border-radius: 8px;
          cursor: pointer;
          margin-bottom: 5px;
          transition: 0.2s;
        }
        .sidebar-item span {
          margin-left: 10px;
        }
        .sidebar-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .sidebar-item.active {
          background: #2563eb;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default ViewTrip;

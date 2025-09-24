// src/pages/ViewTrip.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  ProgressBar,
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
import BuddiesTab from "../components/BuddiesTab";
import WeatherCard from "../components/WeatherCard";
import Checklist from "../components/Checklist";
import Activities from "../components/Activities";
import Notes from "../components/Notes";


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

  // ✅ missing states added
  const checklistKey = "trip-checklist";
  const [checklist, setChecklist] = useState([]);

  // load trip
  useEffect(() => {
    setTrip(demoTrip);
  }, [demoTrip]);

  // ✅ load checklist from storage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(checklistKey));
    if (saved && Array.isArray(saved)) setChecklist(saved);
  }, [checklistKey]);

  // ✅ save checklist to storage
  useEffect(() => {
    localStorage.setItem(checklistKey, JSON.stringify(checklist));
  }, [checklist, checklistKey]);

  if (!trip) return null;
  const status = statusFromDates(trip.startDate, trip.endDate);

  // toggle checklist items
  const handleChecklistToggle = (idx) => {
    setChecklist((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, done: !c.done } : c))
    );
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
            className={`sidebar-item ${
              activeTab === item.key ? "active" : ""
            }`}
            onClick={() => setActiveTab(item.key)}
          >
            {item.icon} <span>{item.label}</span>
          </div>
        ))}
        <div className="mt-auto small text-center">
          <Link to="/mytrip">
            <Button variant="light" size="sm">
              ← Back
            </Button>
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
                <div>
                  ₹{trip.plannedSpend} / ₹{trip.budget}
                </div>
                <ProgressBar now={(trip.plannedSpend / trip.budget) * 100} />
              </Col>
            </Row>
          )}

          {activeTab === "timeline" && trip.itinerary && (
            <TripTimeline itinerary={trip.itinerary} />
          )}

          {activeTab === "map" &&
            trip.mapPins?.map((p, i) => (
              <div className="ratio ratio-16x9 mb-3" key={i}>
                <iframe
                  title={p.label}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    p.q
                  )}&output=embed`}
                  style={{ border: 0 }}
                  allowFullScreen
                />
              </div>
            ))}

          {activeTab === "buddies" && trip.buddies && (
            <BuddiesTab buddies={trip.buddies} />
          )}

          {activeTab === "weather" && <WeatherCard />}

          {activeTab === "checklist" && (
            <Checklist
              checklist={checklist}
              onToggle={handleChecklistToggle}
              setChecklist={setChecklist}
            />
          )}

         {activeTab === "activities" && <Activities />}

          {activeTab === "notes" && <Notes />}
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

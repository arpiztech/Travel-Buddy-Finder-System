import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaPlane,
  FaTrain,
  FaCar,
  FaBus,
  FaHotel,
  FaHome,
  FaCampground,
  FaBed,
  FaCalendarAlt,
  FaMoneyBill,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Badge, Button } from "react-bootstrap";

// Helper: check trip status
const getTripStatus = (startDate, endDate) => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (today < start) return "Upcoming";
  if (today >= start && today <= end) return "Ongoing";
  if (today > end) return "Completed";
  return "Cancelled";
};

const ViewTrip = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const trips = JSON.parse(localStorage.getItem("tbf_trips")) || [];
  const trip = trips.find((_, i) => i === parseInt(id));

  if (!trip) {
    return <h3 className="text-center mt-5">⚠️ Trip not found!</h3>;
  }

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

  const status = getTripStatus(trip.startDate, trip.endDate);

  // delete handler
  const handleDelete = () => {
    const updated = trips.filter((_, i) => i !== parseInt(id));
    localStorage.setItem("tbf_trips", JSON.stringify(updated));
    navigate("/mytrip");
  };

  return (
    <div className="container mt-4 mb-5">
      {/* Trip Title + Status */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🌍 {trip.destination}</h2>
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
      </div>

      {/* Cover Image */}
      {trip.image && (
        <img
          src={trip.image}
          alt="trip"
          className="img-fluid rounded mb-4 shadow"
        />
      )}

      {/* Dates */}
      <div className="card p-3 mb-3 shadow-sm">
        <h5>
          <FaCalendarAlt className="me-2 text-info" />
          Dates
        </h5>
        <p>
          {trip.startDate} → {trip.endDate}
        </p>
      </div>

      {/* Budget */}
      <div className="card p-3 mb-3 shadow-sm">
        <h5>
          <FaMoneyBill className="me-2 text-success" />
          Budget
        </h5>
        <p>₹ {trip.budget}</p>
      </div>

      {/* Travel Details */}
      <div className="card p-3 mb-3 shadow-sm">
        <h5>
          <FaPlane className="me-2 text-primary" />
          Travel Mode
        </h5>
        <p>
          {travelIcons[trip.travelMode]} {trip.travelMode}
        </p>
        {trip.ticketId && <p><b>Ticket/Booking ID:</b> {trip.ticketId}</p>}
        {trip.departure && <p><b>Departure:</b> {trip.departure}</p>}
        {trip.arrival && <p><b>Arrival:</b> {trip.arrival}</p>}
      </div>

      {/* Accommodation */}
      <div className="card p-3 mb-3 shadow-sm">
        <h5>
          <FaHotel className="me-2 text-warning" />
          Accommodation
        </h5>
        <p>
          {accommodationIcons[trip.accommodation]} {trip.accommodation}
        </p>
        {trip.hotelName && <p><b>Hotel:</b> {trip.hotelName}</p>}
        {trip.hotelAddress && <p><b>Address:</b> {trip.hotelAddress}</p>}
        {trip.checkin && <p><b>Check-in:</b> {trip.checkin}</p>}
        {trip.checkout && <p><b>Check-out:</b> {trip.checkout}</p>}
      </div>

      {/* Activities */}
      <div className="card p-3 mb-3 shadow-sm">
        <h5>
          <FaMapMarkerAlt className="me-2 text-danger" />
          Activities
        </h5>
        {trip.activities && trip.activities.length > 0 ? (
          <div className="d-flex flex-wrap gap-2">
            {trip.activities.map((act, i) => (
              <Badge bg="info" key={i}>
                {act}
              </Badge>
            ))}
          </div>
        ) : (
          <p>No activities added</p>
        )}
      </div>

      {/* Description */}
      <div className="card p-3 mb-3 shadow-sm">
        <h5>📝 Notes</h5>
        <p>{trip.description || "No description provided."}</p>
      </div>

      {/* Action Buttons */}
      <div className="d-flex gap-3 mt-3">
        <Button variant="warning" onClick={() => navigate(`/createtrip/${id}`)}>
          ✏️ Edit
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          🗑 Delete
        </Button>
        <Button variant="secondary" onClick={() => navigate("/mytrip")}>
          ⬅ Back to My Trips
        </Button>
      </div>
    </div>
  );
};

export default ViewTrip;

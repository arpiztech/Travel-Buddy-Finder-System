// src/components/Trip.jsx
import React from "react";

export default function Trip({ trip }) {
  if (!trip) {
    return (
      <div className="card p-3 mb-3">
        <h5>No trip data available</h5>
      </div>
    );
  }

  return (
    <div className="card p-3 mb-3 shadow-sm">
      <h4 className="card-title">{trip.destination || "Unknown Destination"}</h4>
      <p className="card-text">
        <strong>Date:</strong> {trip.date || "Not specified"}
      </p>
      <p className="card-text">
        <strong>Budget:</strong> {trip.budget || "N/A"}
      </p>
    </div>
  );
}

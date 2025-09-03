// src/components/Stats.jsx
import React from "react";

export default function Stats({ totalTrips, buddies }) {
  return (
    <div className="card p-3 shadow-sm">
      <h4 className="mb-3">📊 Your Stats</h4>
      <p><strong>Total Trips:</strong> {totalTrips}</p>
      <p><strong>Buddies Found:</strong> {buddies}</p>
    </div>
  );
}

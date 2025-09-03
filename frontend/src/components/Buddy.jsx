// src/components/Buddy.jsx
import React from "react";

export default function Buddy({ buddy }) {
  if (!buddy) {
    return (
      <div className="card p-3 shadow-sm">
        <p>No buddy data available ❌</p>
      </div>
    );
  }

  return (
    <div className="card p-3 shadow-sm">
      <h5>👤 {buddy.name}</h5>
      <p><strong>Interests:</strong> {buddy.interests}</p>
      <p><strong>Preferred Location:</strong> {buddy.location}</p>
    </div>
  );
}

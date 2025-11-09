import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function About() {
  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #b3e5fc 0%, #e1bee7 100%)", // same gradient as login
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        className="card shadow-lg p-5 border-0 text-center"
        style={{
          width: "90%",
          maxWidth: "800px",
          background: "rgba(255, 255, 255, 0.9)", // glassy white card
          borderRadius: "25px",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="fw-bold text-primary mb-3">
          🌍 About Travel Buddy Finder System
        </h2>

        <p className="text-muted fs-5">
          The <strong>Travel Buddy Finder System</strong> is an intelligent
          web-based platform developed to connect travelers with similar
          destinations, interests, and timelines. It bridges the gap between
          solo travelers and potential companions who share common travel goals
          and preferences.
        </p>

        <p className="text-muted fs-5 mb-2">✈️ This system allows users to:</p>
        <ul
          className="fs-5 text-muted text-start mx-auto"
          style={{ maxWidth: "600px" }}
        >
          <li>
            Create and share personalized travel plans including destinations,
            budgets, and activities.
          </li>
          <li>Discover other travelers heading to similar destinations.</li>
          <li>Send and accept buddy requests to connect safely and easily.</li>
          <li>
            Chat, plan trips, and collaborate through an integrated platform.
          </li>
        </ul>

        <p className="text-muted fs-5 mt-3">
          💡 The ultimate goal of this system is to make traveling more social,
          safe, and memorable by promoting meaningful travel companionships.
        </p>

        <p className="text-secondary mt-4">
          <em>
            “Travel far, connect deeper, and create unforgettable memories with
            the Travel Buddy Finder System.”
          </em>
        </p>
      </div>
    </div>
  );
}

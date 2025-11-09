import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Plannow() {
  const features = [
    {
      title: "🌍 Intelligent Travel Matching",
      description:
        "Connect with travelers who share similar destinations, interests, and timelines using smart matching algorithms.",
    },
    {
      title: "📝 Create and Share Trips",
      description:
        "Easily plan personalized trips — add destinations, dates, budgets, and activities all in one place.",
    },
    {
      title: "🤝 Buddy Request System",
      description:
        "Find your ideal travel partner by sending and accepting buddy requests securely and conveniently.",
    },
    {
      title: "💬 Integrated Chat & Collaboration",
      description:
        "Chat with matched travelers, discuss plans, and collaborate on itineraries directly within the platform.",
    },
    {
      title: "💡 Goal",
      description:
        "To make traveling more social, safe, and memorable by connecting like-minded explorers around the world.",
    },
  ];

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #b3e5fc 0%, #e1bee7 100%)",
        backdropFilter: "blur(10px)",
        padding: "40px 0",
      }}
    >
      <div
        className="card shadow-lg border-0 p-5"
        style={{
          width: "90%",
          maxWidth: "900px",
          background: "rgba(255, 255, 255, 0.85)",
          borderRadius: "20px",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="fw-bold text-primary text-center mb-4">
          🌍 PlanNow — Travel Buddy Finder System
        </h2>

        <p className="text-muted fs-5 text-center mb-5">
          The <strong>Travel Buddy Finder System</strong> is an intelligent
          web-based platform developed to connect travelers with similar
          destinations, interests, and timelines. It bridges the gap between
          solo travelers and potential companions who share common travel goals
          and preferences.
        </p>

        <div className="row justify-content-center">
          {features.map((item, index) => (
            <div key={index} className="col-md-10 mb-4">
              <div
                className="card shadow-sm border-0 p-4 rounded-4"
                style={{
                  background: "rgba(255, 255, 255, 0.9)",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                }}
              >
                <h4 className="fw-semibold text-primary mb-2">{item.title}</h4>
                <p className="text-muted fs-5 mb-0">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-secondary text-center mt-5">
          <em>
            “Travel far, connect deeper, and create unforgettable memories with
            the Travel Buddy Finder System.”
          </em>
        </p>
      </div>
    </div>
  );
}

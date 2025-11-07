import React from "react";
import { Container, Card } from "react-bootstrap";

export default function About() {
  return (
    <Container className="py-5">
      <Card className="shadow-lg border-0 p-4 rounded-4">
        <h2 className="fw-bold text-center mb-3">
          About Travel Buddy Finder System
        </h2>
        <p className="text-muted fs-5">
          The <strong>Travel Buddy Finder System</strong> is an intelligent
          web-based platform designed to connect travelers with similar
          destinations, interests, and timelines. It bridges the gap between
          solo travelers and potential companions who share common travel goals.
        </p>

        <p className="text-muted fs-5">✈️ This system allows users to:</p>
        <ul className="fs-5 text-muted">
          <li>
            Create and share travel plans with destinations, budgets, and
            activities.
          </li>
          <li>Discover other travelers heading to the same destination.</li>
          <li>Send and accept buddy requests to connect securely.</li>
          <li>
            Chat, plan trips, and collaborate easily through an integrated
            platform.
          </li>
        </ul>

        <p className="text-muted fs-5">
          🌍 The ultimate goal of this system is to make traveling more social,
          safe, and memorable by promoting meaningful travel companionships.
        </p>
      </Card>
    </Container>
  );
}

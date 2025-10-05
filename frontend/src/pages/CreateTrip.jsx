// src/pages/CreateTrip.jsx
import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import "./CreateTrip.css"; // add at the top, same folder

const CreateTrip = () => {
  const [trip, setTrip] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    travelMode: "",
    accommodation: "",
    activities: [],
    description: "",
    image: null,
    buddyPreference: "",
    ageRange: "",
    languages: "",
    visibility: "public",
  });

  // NEW: Added validated state for form validation
  const [validated, setValidated] = useState(false);

  const activitiesOptions = [
    "Adventure",
    "Culture",
    "Food",
    "Shopping",
    "Photography",
    "Nature",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrip({ ...trip, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setTrip({ ...trip, activities: [...trip.activities, value] });
    } else {
      setTrip({
        ...trip,
        activities: trip.activities.filter((act) => act !== value),
      });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setTrip({ ...trip, image: URL.createObjectURL(e.target.files[0]) });
    }
  };

  // UPDATED: handleSubmit with validation check
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    // 🔹 Save trip into localStorage (now same key as MyTrip)
    const storedTrips = JSON.parse(localStorage.getItem("tbf_trips")) || [];
    const newTrip = { ...trip, id: Date.now() }; // unique ID
    localStorage.setItem(
      "tbf_trips",
      JSON.stringify([...storedTrips, newTrip])
    );

    console.log("✅ Trip Created:", newTrip);
    alert("🎉 Trip Created Successfully!");

    // Reset form after submission
    setTrip({
      title: "",
      destination: "",
      startDate: "",
      endDate: "",
      budget: "",
      travelMode: "",
      accommodation: "",
      activities: [],
      description: "",
      image: null,
      buddyPreference: "",
      ageRange: "",
      languages: "",
      visibility: "public",
    });

    // Reset validation state on success
    setValidated(false);
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card
        style={{
          width: "70%",
          padding: "25px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <h2 className="text-center mb-4">✈️ Create a New Trip</h2>

        {/* UPDATED: Add noValidate and validated props here */}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {/* Trip Title */}
          <Form.Group className="mb-3">
            <Form.Label>Trip Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={trip.title}
              onChange={handleChange}
              placeholder="E.g. Goa Beach Adventure"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a trip title.
            </Form.Control.Feedback>
          </Form.Group>

          {/* Destination */}
          <Form.Group className="mb-3">
            <Form.Label>Destination (City/Country)</Form.Label>
            <Form.Control
              type="text"
              name="destination"
              value={trip.destination}
              onChange={handleChange}
              placeholder="Enter destination"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a destination.
            </Form.Control.Feedback>
          </Form.Group>

          {/* Dates */}
          <Row className="mb-3">
            <Col>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={trip.startDate}
                onChange={handleChange}
                required
                isInvalid={validated && !trip.startDate}
              />
              <Form.Control.Feedback type="invalid">
                Please select a start date.
              </Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={trip.endDate}
                onChange={handleChange}
                required
                isInvalid={validated && !trip.endDate}
              />
              <Form.Control.Feedback type="invalid">
                Please select an end date.
              </Form.Control.Feedback>
            </Col>
          </Row>

          {/* Budget */}
          <Form.Group className="mb-3">
            <Form.Label>Budget Range ($)</Form.Label>
            <Form.Control
              type="number"
              name="budget"
              value={trip.budget}
              onChange={handleChange}
              placeholder="Enter budget"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a budget.
            </Form.Control.Feedback>
          </Form.Group>

          {/* Travel Mode */}
          <Form.Group className="mb-3">
            <Form.Label>Travel Mode</Form.Label>
            <Form.Select
              name="travelMode"
              value={trip.travelMode}
              onChange={handleChange}
              required
            >
              <option value="">Select mode</option>
              <option>Flight</option>
              <option>Train</option>
              <option>Car</option>
              <option>Bus</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a travel mode.
            </Form.Control.Feedback>
          </Form.Group>

          {/* Accommodation */}
          <Form.Group className="mb-3">
            <Form.Label>Accommodation</Form.Label>
            <Form.Select
              name="accommodation"
              value={trip.accommodation}
              onChange={handleChange}
              required
            >
              <option value="">Select type</option>
              <option>Hotel</option>
              <option>Hostel</option>
              <option>Airbnb</option>
              <option>Camping</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select an accommodation type.
            </Form.Control.Feedback>
          </Form.Group>

          {/* Activities */}
          <Form.Group className="mb-3">
            <Form.Label>Activities / Interests</Form.Label>
            <div className="d-flex flex-wrap gap-3">
              {activitiesOptions.map((act) => (
                <Form.Check
                  key={act}
                  type="checkbox"
                  label={act}
                  value={act}
                  checked={trip.activities.includes(act)}
                  onChange={handleCheckboxChange}
                />
              ))}
            </div>
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3">
            <Form.Label>Description / Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={trip.description}
              onChange={handleChange}
              placeholder="Write details about your trip"
            />
          </Form.Group>

          {/* Trip Image */}
          <Form.Group className="mb-3">
            <Form.Label>Upload Trip Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {trip.image && (
              <img
                src={trip.image}
                alt="preview"
                style={{
                  marginTop: "10px",
                  width: "100%",
                  borderRadius: "8px",
                }}
              />
            )}
          </Form.Group>

          {/* Buddy Preferences */}
          <h5 className="mt-4">Buddy Preferences</h5>
          <Row className="mb-3">
            <Col>
              <Form.Label>Looking for</Form.Label>
              <Form.Select
                name="buddyPreference"
                value={trip.buddyPreference}
                onChange={handleChange}
              >
                <option value="">Any</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Label>Preferred Age Range</Form.Label>
              <Form.Control
                type="text"
                name="ageRange"
                value={trip.ageRange}
                onChange={handleChange}
                placeholder="18-30"
              />
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Languages Preferred</Form.Label>
            <Form.Control
              type="text"
              name="languages"
              value={trip.languages}
              onChange={handleChange}
              placeholder="English, Hindi, etc."
            />
          </Form.Group>

          {/* Privacy */}
          <Form.Group className="mb-3">
            <Form.Label>Privacy Settings</Form.Label>
            <Form.Select
              name="visibility"
              value={trip.visibility}
              onChange={handleChange}
            >
              <option value="public">Public (anyone can see)</option>
              <option value="private">Private (only invited)</option>
            </Form.Select>
          </Form.Group>

          <div className="text-center">
            <Button variant="primary" type="submit" className="px-5">
              ✅ Create Trip
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default CreateTrip;

import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import ViewTrip from "./ViewTrip"; // ✅ import your existing ViewTrip

const MyTrips = () => {
  const [activeTab, setActiveTab] = useState("create"); // "create" or "view"
  const [trips, setTrips] = useState([]);
  const [trip, setTrip] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    travelMode: "",
    accommodation: "",
    activities: [],
    description: "",
    image: null,
  });

  const activitiesOptions = ["Adventure", "Culture", "Food", "Shopping", "Photography", "Nature"];

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
    setTrip({ ...trip, image: URL.createObjectURL(e.target.files[0]) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTrips([...trips, trip]); // save trip
    setTrip({
      destination: "",
      startDate: "",
      endDate: "",
      budget: "",
      travelMode: "",
      accommodation: "",
      activities: [],
      description: "",
      image: null,
    });
    setActiveTab("view"); // Switch to view after creating
  };

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      {/* Row with Create + View buttons */}
      <div className="d-flex gap-3 mb-4">
        <Button
          variant={activeTab === "create" ? "primary" : "outline-primary"}
          onClick={() => setActiveTab("create")}
        >
          Create Trip
        </Button>
        <Button
          variant={activeTab === "view" ? "success" : "outline-success"}
          onClick={() => setActiveTab("view")}
        >
          View Trip
        </Button>
      </div>

      {/* CREATE TRIP FORM */}
      {activeTab === "create" && (
        <Card style={{ width: "60%", padding: "20px", boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}>
          <h2 className="text-center mb-4">✈️ Create a Trip</h2>
          <Form onSubmit={handleSubmit}>
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
            </Form.Group>

            {/* Travel Dates */}
            <Form.Group className="mb-3 d-flex gap-3">
              <div className="flex-fill">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={trip.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex-fill">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={trip.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </Form.Group>

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
            </Form.Group>

            {/* Travel Mode */}
            <Form.Group className="mb-3">
              <Form.Label>Travel Mode</Form.Label>
              <Form.Select name="travelMode" value={trip.travelMode} onChange={handleChange} required>
                <option value="">Select mode</option>
                <option>Flight</option>
                <option>Train</option>
                <option>Car</option>
                <option>Bus</option>
              </Form.Select>
            </Form.Group>

            {/* Accommodation */}
            <Form.Group className="mb-3">
              <Form.Label>Accommodation</Form.Label>
              <Form.Select name="accommodation" value={trip.accommodation} onChange={handleChange} required>
                <option value="">Select type</option>
                <option>Hotel</option>
                <option>Hostel</option>
                <option>Airbnb</option>
                <option>Camping</option>
              </Form.Select>
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

            {/* Image Upload */}
            <Form.Group className="mb-3">
              <Form.Label>Upload Trip Image</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
            </Form.Group>

            {/* Submit */}
            <div className="text-center">
              <Button variant="primary" type="submit" className="px-4">
                Save Trip
              </Button>
            </div>
          </Form>
        </Card>
      )}

      {/* VIEW TRIPS */}
      {activeTab === "view" && <ViewTrip />} {/* ✅ reuse your ViewTrip component */}
    </div>
  );
};

export default MyTrips;

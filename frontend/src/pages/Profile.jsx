import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "user@example.com", // Read-only from signup
    bio: "",
    age: "",
    languages: "",
    destination: "",
    travelDates: "fixed",
    fixedDate: "",
    interests: "",
    budget: "",
  });

  return (
    <Container fluid className="p-5" style={{ minHeight: "100vh" }}>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card
            className="p-4 shadow-lg border-0 rounded-4"
            style={{
              background:
                "linear-gradient(135deg, #5fb0ea, rgba(192, 187, 230, 1))", // 🎨 Gradient only for box
              color: "white",
            }}
          >
            <h3 className="fw-bold text-center mb-4 text-light">My Profile</h3>
            <Form>
              {/* Profile Picture */}
              <div className="text-center mb-4">
                <img
                  src="https://via.placeholder.com/120"
                  alt="Profile"
                  className="rounded-circle mb-3 border border-3 border-white"
                />
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Control type="file" className="bg-light text-dark" />
                </Form.Group>
              </div>

              {/* Basic Info */}
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                      className="bg-light text-dark"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={profile.email}
                      disabled
                      className="bg-light text-dark"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Bio */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Write about yourself..."
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  className="bg-light text-dark"
                />
              </Form.Group>

              {/* Age & Languages */}
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Age</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter age"
                      value={profile.age}
                      onChange={(e) =>
                        setProfile({ ...profile, age: e.target.value })
                      }
                      className="bg-light text-dark"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Languages</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="English, Hindi, French..."
                      value={profile.languages}
                      onChange={(e) =>
                        setProfile({ ...profile, languages: e.target.value })
                      }
                      className="bg-light text-dark"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Travel Preferences */}
              <h5 className="fw-bold mt-4 text-light">Travel Preferences</h5>

              {/* Preferred Destination */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  Preferred Destination
                </Form.Label>
                <Form.Select
                  value={profile.destination}
                  onChange={(e) =>
                    setProfile({ ...profile, destination: e.target.value })
                  }
                  className="bg-light text-dark"
                >
                  <option value="">-- Select Destination --</option>
                  <option value="Paris">Paris</option>
                  <option value="Goa">Goa</option>
                  <option value="Bali">Bali</option>
                  <option value="Tokyo">Tokyo</option>
                  <option value="New York">New York</option>
                </Form.Select>
              </Form.Group>

              {/* Travel Dates */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Travel Dates</Form.Label>
                <Form.Check
                  inline
                  label="Fixed"
                  type="radio"
                  name="travelDates"
                  value="fixed"
                  checked={profile.travelDates === "fixed"}
                  onChange={(e) =>
                    setProfile({ ...profile, travelDates: e.target.value })
                  }
                />

                {/* Calendar */}
                {profile.travelDates === "fixed" && (
                  <Form.Control
                    type="date"
                    className="mt-3 bg-light text-dark"
                    value={profile.fixedDate}
                    onChange={(e) =>
                      setProfile({ ...profile, fixedDate: e.target.value })
                    }
                  />
                )}
              </Form.Group>

              {/* Budget */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Budget Range</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. $500 - $1000"
                  value={profile.budget}
                  onChange={(e) =>
                    setProfile({ ...profile, budget: e.target.value })
                  }
                  className="bg-light text-dark"
                />
              </Form.Group>

              {/* Interests */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Interests</Form.Label>
                <Form.Select
                  value={profile.interests}
                  onChange={(e) =>
                    setProfile({ ...profile, interests: e.target.value })
                  }
                  className="bg-light text-dark"
                >
                  <option value="">-- Select Interest --</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Food">Food</option>
                  <option value="Culture">Culture</option>
                  <option value="Photography">Photography</option>
                </Form.Select>
              </Form.Group>

              {/* Action Buttons */}
              <div className="text-center mt-4">
                <Button
                  variant="light"
                  className="me-2 rounded-pill px-4 fw-semibold text-dark"
                >
                  Save Changes
                </Button>
                <Button
                  variant="danger"
                  className="rounded-pill px-4 fw-semibold"
                >
                  Delete Account
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;

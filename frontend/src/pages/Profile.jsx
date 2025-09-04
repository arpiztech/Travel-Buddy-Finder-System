import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const Profile = () => {
  // Example state (later connect to backend/localStorage)
  const [profile, setProfile] = useState({
    name: "",
    email: "user@example.com", // Read-only from signup
    bio: "",
    age: "",
    languages: "",
    destination: "",
    travelDates: "flexible",
    interests: [],
    budget: "",
  });

  // Handle checkbox for interests
  const handleInterestChange = (e) => {
    const { value, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      interests: checked
        ? [...prev.interests, value]
        : prev.interests.filter((i) => i !== value),
    }));
  };

  return (
    <Container
      fluid
      className="p-5"
      style={{
        background: "linear-gradient(135deg, #f3e5f5, #e1f5fe)",
        minHeight: "100vh",
      }}
    >
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-lg border-0 rounded-4">
            <h3 className="fw-bold text-center mb-4">My Profile</h3>
            <Form>
              {/* Profile Picture */}
              <div className="text-center mb-4">
                <img
                  src="https://via.placeholder.com/120"
                  alt="Profile"
                  className="rounded-circle mb-3"
                />
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Control type="file" />
                </Form.Group>
              </div>

              {/* Basic Info */}
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={profile.email} disabled />
                  </Form.Group>
                </Col>
              </Row>

              {/* Bio */}
              <Form.Group className="mb-3">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Write about yourself..."
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                />
              </Form.Group>

              {/* Age & Languages */}
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter age"
                      value={profile.age}
                      onChange={(e) =>
                        setProfile({ ...profile, age: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Languages</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="English, Hindi, French..."
                      value={profile.languages}
                      onChange={(e) =>
                        setProfile({ ...profile, languages: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Travel Preferences */}
              <h5 className="fw-bold mt-4">Travel Preferences</h5>

              {/* Preferred Destination */}
              <Form.Group className="mb-3">
                <Form.Label>Preferred Destination</Form.Label>
                <Form.Select
                  value={profile.destination}
                  onChange={(e) =>
                    setProfile({ ...profile, destination: e.target.value })
                  }
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
                <Form.Label>Travel Dates</Form.Label>
                <div>
                  <Form.Check
                    inline
                    label="Flexible"
                    type="radio"
                    name="travelDates"
                    value="flexible"
                    checked={profile.travelDates === "flexible"}
                    onChange={(e) =>
                      setProfile({ ...profile, travelDates: e.target.value })
                    }
                  />
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
                </div>

                {/* Show Calendar if Fixed is selected */}
                {profile.travelDates === "fixed" && (
                  <Form.Control
                    type="date"
                    className="mt-3"
                    value={profile.fixedDate}
                    onChange={(e) =>
                      setProfile({ ...profile, fixedDate: e.target.value })
                    }
                  />
                )}
              </Form.Group>

              {/* Budget */}
              <Form.Group className="mb-3">
                <Form.Label>Budget Range</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. $500 - $1000"
                  value={profile.budget}
                  onChange={(e) =>
                    setProfile({ ...profile, budget: e.target.value })
                  }
                />
              </Form.Group>

              {/* Interests */}
               <Form.Group className="mb-3">
                <Form.Label>Interests</Form.Label>
                <Form.Select
                  value={profile.interests}
                  onChange={(e) =>
                    setProfile({ ...profile, interests: e.target.value })
                  }
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
                <Button variant="primary" className="me-2 rounded-pill px-4">
                  Save Changes
                </Button>
                <Button variant="danger" className="rounded-pill px-4">
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

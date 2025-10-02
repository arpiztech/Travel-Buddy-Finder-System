import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Form,
  Button,
  Badge,
  InputGroup,
} from "react-bootstrap";
import "./Settings.css";

const sections = [
  "Account Settings",
  "Privacy & Security",
  "Travel Preferences",
  "App Preferences",
  "Support & Help",
  "System / App Management",
];

const blockedUsers = ["Alice Singh", "Rahul Verma", "Priya Kapoor"];

const faqs = [
  {
    q: "How do I change my password?",
    a: "Go to Account Settings and update the password field, then save.",
  },
  {
    q: "How to deactivate my account?",
    a: "Click Deactivate/Delete in Account Settings.",
  },
];

const activities = [
  "Beach Walks",
  "Cafe Hopping",
  "Cycling",
  "Local Events",
  "Spa & Wellness",
];

const Settings = () => {
  const [activeSection, setActiveSection] = useState("Account Settings");

  const renderContent = () => {
    switch (activeSection) {
      case "Account Settings":
        return (
          <div className="settings-content">
            <h2>
              <span
                role="img"
                aria-label="edit"
                style={{ fontSize: "2rem", marginRight: 8 }}
              >
                ✏️
              </span>
              Account Settings
            </h2>
            <Form>
              <Form.Group className="mb-4 text-center">
                <div style={{ marginBottom: 10 }}>
                  <img
                    src="https://ui-avatars.com/api/?name=Your+Name&size=100"
                    alt="Avatar"
                    style={{
                      borderRadius: "50%",
                      boxShadow: "0 2px 8px #365abf22",
                    }}
                  />
                </div>
                <Form.Label className="fw-bold">Profile Photo</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  style={{ maxWidth: 180, margin: "auto" }}
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>📝 Edit Profile</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Update name, bio..."
                  size="sm"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>📧 Change Email / Phone</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter new email"
                  size="sm"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>🔑 Change Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  size="sm"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>🌍 Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City, Country"
                  size="sm"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>🎂 Birthday</Form.Label>
                <Form.Control type="date" size="sm" />
              </Form.Group>

              <div className="d-flex justify-content-center my-4">
                <Button variant="primary" size="lg">
                  💾 Save Changes
                </Button>
              </div>
            </Form>
          </div>
        );
      case "Privacy & Security":
        return (
          <div className="settings-content">
            <h2>🔒 Privacy & Security</h2>
            <Form>
              <Form.Check
                type="switch"
                label="👀 Profile Visibility (Public / Private)"
                className="mb-2"
              />
              <Form.Check
                type="switch"
                label="🙈 Hide Sensitive Info"
                className="mb-2"
              />
              <Form.Check
                type="switch"
                label="🔐 Two-Factor Authentication"
                className="mb-2"
              />
              <Form.Check
                type="switch"
                label="📍 Location Sharing"
                className="mb-2"
              />
              <Form.Check
                type="switch"
                label="🧰 Password Manager integration"
                className="mb-2"
              />
              <Form.Group className="mb-2">
                <Form.Label>📧 Notification Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="notification@email.com"
                  size="sm"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>📱 Recovery Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="+91-9876543210"
                  size="sm"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>🛡️ Security Alerts</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Alert on login from a new device"
                />
                <Form.Check
                  type="checkbox"
                  label="Alert if password is changed"
                />
              </Form.Group>

              <div className="d-flex justify-content-center my-4">
                <Button variant="primary" size="lg">
                  💾 Save Changes
                </Button>
              </div>
            </Form>
          </div>
        );

      case "Travel Preferences":
        return (
          <div className="settings-content">
            <h2>🌍 Travel Preferences</h2>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>🌎 Preferred Destinations</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Europe, Asia, etc."
                  size="sm"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>💰 Budget Preference</Form.Label>
                <Form.Select size="sm">
                  <option>Low</option>
                  <option>Medium</option>
                  <option>Luxury</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>🛏️ Accommodation Type</Form.Label>
                <Form.Select size="sm">
                  <option>Hotel</option>
                  <option>Hostel</option>
                  <option>Camping</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>🛫 Travel Style</Form.Label>
                <Form.Select size="sm">
                  <option>Solo</option>
                  <option>Group</option>
                  <option>Family</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>🍽 Dietary Preferences</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Vegetarian, Vegan, etc."
                  size="sm"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>🏄 Favorite Activities</Form.Label>
                {activities.map((a) => (
                  <Form.Check
                    label={a}
                    key={a}
                    type="checkbox"
                    className="mb-1"
                  />
                ))}
              </Form.Group>
              <div className="d-flex justify-content-center my-4">
                <Button variant="primary" size="lg">
                  💾 Save Changes
                </Button>
              </div>
            </Form>
          </div>
        );
      case "App Preferences":
        return (
          <div className="settings-content">
            <h2>⚙️ App Preferences</h2>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>🎨 Theme</Form.Label>
                <Form.Select size="sm">
                  <option>Light</option>
                  <option>Dark</option>
                  <option>System</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>🌐 Language</Form.Label>
                <Form.Select size="sm">
                  <option>English</option>
                  <option>Hindi</option>
                  <option>French</option>
                  <option>Spanish</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>📏 Font Size</Form.Label>
                <Form.Select size="sm">
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>🕰 Time Zone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Asia/Kolkata"
                  size="sm"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Check type="checkbox" label="🔔 Email Notifications" />
                <Form.Check type="checkbox" label="📱 Push Notifications" />
              </Form.Group>
              <div className="d-flex justify-content-center my-4">
                <Button variant="primary" size="lg">
                  💾 Save Changes
                </Button>
              </div>
            </Form>
          </div>
        );
      case "Support & Help":
        return (
          <div className="settings-content">
            <h2>📞 Support & Help</h2>
            <div className="mb-4">
              <h5>FAQs</h5>
              <ul>
                {faqs.map((item, idx) => (
                  <li key={idx}>
                    <strong>{item.q}</strong>
                    <div>{item.a}</div>
                  </li>
                ))}
              </ul>
            </div>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>💡 Send Feedback</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Type your feedback..."
                  size="sm"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>📝 Quick Contact</Form.Label>
                <InputGroup size="sm">
                  <Form.Control type="email" placeholder="Your email" />
                  <Button variant="info">Send</Button>
                </InputGroup>
              </Form.Group>
            </Form>
          </div>
        );
      case "System / App Management":
        return (
          <div className="settings-content">
            <h2>🛠️ System & App Management</h2>
            <Button variant="warning" className="mb-3 w-100">
              🗑️ Clear Cache / Storage
            </Button>
            <Button variant="info" className="mb-3 w-100">
              ⏬ Download My Data
            </Button>
            <Button variant="danger" className="mb-3 w-100">
              🔄 Reset Application
            </Button>
            <div className="mt-4">
              <h6>App Information</h6>
              <ul>
                <li>Version: 2.1.0</li>
                <li>Last Update: Sep 2025</li>
              </ul>
            </div>
          </div>
        );
      default:
        return <div className="settings-content">Select a setting option</div>;
    }
  };

  return (
    <div className="settings-bg">
      <Container fluid className="p-0 settings-main-container">
        <Row className="gx-0 flex-nowrap" style={{ minHeight: "100vh" }}>
          <Col md={3} className="settings-sidebar">
            <div className="p-4">
              <h4 className="sidebar-title">Settings</h4>
              <ListGroup variant="flush">
                {sections.map((sec) => (
                  <ListGroup.Item
                    key={sec}
                    action
                    active={activeSection === sec}
                    onClick={() => setActiveSection(sec)}
                    className={`settings-list-item${
                      activeSection === sec ? " active" : ""
                    }`}
                  >
                    {sec}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Col>
          <Col md={9} xs={12} className="settings-content-panel">
            {renderContent()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Settings;

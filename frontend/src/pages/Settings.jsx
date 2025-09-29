// src/pages/Settings.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Card,
  Form,
  Button,
} from "react-bootstrap";

const Settings = () => {
  const [activeSection, setActiveSection] = useState("Account Settings");

  const sections = [
    "Account Settings",
    "Privacy & Security",
    "Travel Preferences",
    "App Preferences",
    "Support & Help",
    "System / App Management",
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "Account Settings":
        return (
          <Card className="p-3 shadow-sm border-0 rounded-4">
            <h5>✏️ Account Settings</h5>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Edit Profile</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Update name, bio, profile..."
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>📧 Change Email / Phone</Form.Label>
                <Form.Control type="email" placeholder="Enter new email" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>🔑 Change Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                />
              </Form.Group>
              <Button variant="danger">📴 Deactivate / Delete Account</Button>
            </Form>
          </Card>
        );

      case "Privacy & Security":
        return (
          <Card className="p-3 shadow-sm border-0 rounded-4">
            <h5>🔒 Privacy & Security</h5>
            <Form.Check
              type="switch"
              label="👀 Profile Visibility (Public / Private)"
            />
            <Form.Check type="switch" label="🙈 Hide Sensitive Info" />
            <Form.Check type="switch" label="🔐 Two-Factor Authentication" />
            <Form.Check type="switch" label="📍 Location Sharing" />
            <Form.Text className="text-muted">
              🛑 Manage Blocked Users
            </Form.Text>
          </Card>
        );

      case "Travel Preferences":
        return (
          <Card className="p-3 shadow-sm border-0 rounded-4">
            <h5>🌍 Travel Preferences</h5>
            <Form.Group className="mb-3">
              <Form.Label>Preferred Destinations</Form.Label>
              <Form.Control type="text" placeholder="e.g. Europe, Asia" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>💰 Budget Preference</Form.Label>
              <Form.Select>
                <option>Low</option>
                <option>Medium</option>
                <option>Luxury</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>🛏️ Accommodation Type</Form.Label>
              <Form.Select>
                <option>Hotel</option>
                <option>Hostel</option>
                <option>Camping</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>🛫 Travel Style</Form.Label>
              <Form.Select>
                <option>Solo</option>
                <option>Group</option>
                <option>Family</option>
              </Form.Select>
            </Form.Group>
          </Card>
        );

      case "App Preferences":
        return (
          <Card className="p-3 shadow-sm border-0 rounded-4">
            <h5>⚙️ App Preferences</h5>
            <Form.Group className="mb-3">
              <Form.Label>🎨 Theme</Form.Label>
              <Form.Select>
                <option>Light</option>
                <option>Dark</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>🌐 Language</Form.Label>
              <Form.Select>
                <option>English</option>
                <option>Hindi</option>
                <option>French</option>
                <option>Spanish</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>📏 Font Size</Form.Label>
              <Form.Select>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </Form.Select>
            </Form.Group>
          </Card>
        );

      case "Support & Help":
        return (
          <Card className="p-3 shadow-sm border-0 rounded-4">
            <h5>📞 Support & Help</h5>
            <ListGroup variant="flush">
              <ListGroup.Item>❓ FAQs</ListGroup.Item>
              <ListGroup.Item>📬 Contact Support</ListGroup.Item>
              <ListGroup.Item>📜 Terms & Conditions</ListGroup.Item>
              <ListGroup.Item>🔒 Privacy Policy</ListGroup.Item>
            </ListGroup>
          </Card>
        );

      case "System / App Management":
        return (
          <Card className="p-3 shadow-sm border-0 rounded-4">
            <h5>🛠️ System & App Management</h5>
            <Button variant="warning" className="mb-2 w-100">
              🗑️ Clear Cache / Storage
            </Button>
            <Button variant="info" className="w-100">
              ⏬ Download My Data
            </Button>
          </Card>
        );

      default:
        return <p>Select a setting option</p>;
    }
  };

  return (
    <Container
      fluid
      className="p-4"
      style={{ background: "#f5f7fa", minHeight: "100vh" }}
    >
      <Row>
        {/* Sidebar */}
        <Col md={3}>
          <Card className="shadow-sm border-0 rounded-4">
            <ListGroup variant="flush">
              {sections.map((sec) => (
                <ListGroup.Item
                  key={sec}
                  action
                  active={activeSection === sec}
                  onClick={() => setActiveSection(sec)}
                >
                  {sec}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>

        {/* Content */}
        <Col md={9}>{renderContent()}</Col>
      </Row>
    </Container>
  );
};

export default Settings;

import React from "react";
import { Card, Row, Col, ProgressBar } from "react-bootstrap";
import {
  FaPlane,
  FaMoneyBill,
  FaHotel,
  FaUsers,
  FaListUl,
  FaCloudSun,
  FaBell,
  FaCheckSquare,
  FaMapMarkedAlt,
} from "react-icons/fa";

const Overview = () => {
  return (
    <div className="p-4">
      <h3 className="mb-4">Trip Overview</h3>
      <Row xs={1} md={2} lg={3} className="g-4">
        {/* Trip Summary */}
        <Col>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <FaPlane size={40} className="text-primary mb-2" />
              <Card.Title>Trip Summary</Card.Title>
              <Card.Text>
                <strong>Paris, France</strong> <br />
                12 Aug → 18 Aug <br />
                Status: <span className="text-success">Planned</span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Budget Overview */}
        <Col>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <FaMoneyBill size={40} className="text-success mb-2" />
              <Card.Title>Budget Overview</Card.Title>
              <Card.Text>
                ₹3200 / ₹5000 <br />
                ₹9200 / ₹9000 <br />


                <ProgressBar now={64} label={`64%`} />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Travel Details */}
        <Col>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <FaHotel size={40} className="text-warning mb-2" />
              <Card.Title>Travel Details</Card.Title>
              <Card.Text>
                Flight: AI-202<br />
                Hotel: Hilton Paris<br />
                Check-in: 12 Aug
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Buddy Overview */}
        <Col>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <FaUsers size={40} className="text-info mb-2" />
              <Card.Title>Buddies</Card.Title>
              <Card.Text>
                3 Buddies Joined <br />
                1 Pending Request <br />
                on the way : 23 Sep
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Checklist */}
        <Col>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <FaCheckSquare size={40} className="text-success mb-2" />
              <Card.Title>Checklist</Card.Title>
              <Card.Text>
                ✅ Passport <br />
                ✅ Tickets <br />
                ☐ Camera <br />

              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Planned Activities */}
        <Col>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <FaListUl size={40} className="text-danger mb-2" />
              <Card.Title>Activities</Card.Title>
              <Card.Text>
                Day 1: Arrival + Dinner <br />
                Day 2: Sightseeing + Hiking <br />
                Day 3: Shopping
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Weather Snapshot */}
        <Col>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <FaCloudSun size={40} className="text-primary mb-2" />
              <Card.Title>Weather</Card.Title>
              <Card.Text>
                Sunny, 27°C <br />
                Night: 18°C <br />
                Suggestion: Carry Sunglasses
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Notifications */}
        <Col>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <FaBell size={40} className="text-secondary mb-2" />
              <Card.Title>Notifications</Card.Title>
              <Card.Text>
                ✈ Flight at 10:00 AM <br />
                ⚠ Budget limit near <br />
                🤝 1 Pending Buddy
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Map Snapshot */}
        <Col>
          <Card className="shadow-sm text-center">
            <Card.Body>
              <FaMapMarkedAlt size={40} className="text-danger mb-2" />
              <Card.Title>Destination Map</Card.Title>
              <div className="ratio ratio-4x3">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9991863725557!2d2.292292615674473!3d48.858373079287894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fdeb7b4bfb3%3A0x6bd87e64875b1215!2sEiffel%20Tower%2C%20Paris!5e0!3m2!1sen!2sin!4v1695632492350!5m2!1sen!2sin"
                  width="10%"
                  height="50"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Paris Map"
                ></iframe>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;

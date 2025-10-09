import React, { useState } from "react";
import {
  Card,
  ListGroup,
  Button,
  Form,
  Badge,
  ProgressBar,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

const defaultChecklist = [
  {
    label: "Passport and visa/ID documents",
    checked: false,
    priority: "Must-have",
    comments: "",
    owner: "",
    attachment: null,
  },
  {
    label: "Tickets (flight, train, bus, etc.)",
    checked: false,
    priority: "Must-have",
    comments: "",
    owner: "",
    attachment: null,
  },
  {
    label: "Hotel/accommodation details",
    checked: false,
    priority: "Must-have",
    comments: "",
    owner: "",
    attachment: null,
  },
  {
    label: "Local currency/cash and cards",
    checked: false,
    priority: "Must-have",
    comments: "",
    owner: "",
    attachment: null,
  },
  {
    label: "Travel insurance proof",
    checked: false,
    priority: "Must-have",
    comments: "",
    owner: "",
    attachment: null,
  },
  {
    label: "Printed/digital itinerary",
    checked: false,
    priority: "Must-have",
    comments: "",
    owner: "",
    attachment: null,
  },
  {
    label: "Emergency contact numbers",
    checked: false,
    priority: "Must-have",
    comments: "",
    owner: "",
    attachment: null,
  },
  {
    label: "Buddy contact list and shared location info",
    checked: false,
    priority: "Must-have",
    comments: "",
    owner: "",
    attachment: null,
  },
  {
    label: "Vaccination proofs/health documents",
    checked: false,
    priority: "Must-have",
    comments: "",
    owner: "",
    attachment: null,
  },
  {
    label: "Packing essentials (clothes, shoes, adapters)",
    checked: false,
    priority: "Must-have",
    comments: "",
    owner: "",
    attachment: null,
  },
  {
    label: "Medicines and prescriptions",
    checked: false,
    priority: "Must-have",
    comments: "",
    owner: "",
    attachment: null,
  },
  {
    label: "Toiletries and personal care items",
    checked: false,
    priority: "Optional",
    comments: "",
    owner: "",
    attachment: null,
  },
  {
    label: "Chargers, power bank, electronics",
    checked: false,
    priority: "Must-have",
    comments: "Bring EU adapter",
    owner: "",
    attachment: null,
  },
  {
    label: "Maps, guidebooks, language phrasebook/apps",
    checked: false,
    priority: "Optional",
    comments: "",
    owner: "",
    attachment: null,
  },
  {
    label: "Snacks and water bottle",
    checked: false,
    priority: "Optional",
    comments: "",
    owner: "",
    attachment: null,
  },
  {
    label: "Sunglasses, hat, umbrella or raincoat",
    checked: false,
    priority: "Optional",
    comments: "Weather dependent",
    owner: "",
    attachment: null,
  },
  {
    label: "Activity gear (swimsuit, hiking shoes, camera)",
    checked: false,
    priority: "Optional",
    comments: "",
    owner: "",
    attachment: null,
  },
  {
    label: "Buddy agreement on rules/safety",
    checked: false,
    priority: "For group",
    comments: "Discuss with buddies",
    owner: "",
    attachment: null,
  },
  {
    label: "Shared apps for trip coordination (e.g., group chat, shared notes)",
    checked: false,
    priority: "Must-have",
    comments: "Install group chat",
    owner: "",
    attachment: null,
  },
  {
    label: "Keep copies of all major documents (digital & print)",
    checked: false,
    priority: "Must-have",
    comments: "",
    owner: "",
    attachment: null,
  },
];

const priorities = ["Must-have", "Optional", "For group"];
const colors = {
  "Must-have": "danger",
  Optional: "secondary",
  "For group": "info",
};

const TripChecklist = ({ buddies = [] }) => {
  const [items, setItems] = useState(defaultChecklist);
  const [newItem, setNewItem] = useState({
    label: "",
    priority: "Optional",
    comments: "",
    owner: "",
    attachment: null,
  });

  const checkedCount = items.filter((i) => i.checked).length;
  const progress = Math.round((checkedCount / items.length) * 100);

  const toggleItem = (idx) => {
    setItems((items) =>
      items.map((item, i) =>
        i === idx ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const updateItem = (idx, field, value) => {
    setItems((items) =>
      items.map((item, i) => (i === idx ? { ...item, [field]: value } : item))
    );
  };

  const handleAttachment = (idx, file) => {
    const url = URL.createObjectURL(file);
    setItems((items) =>
      items.map((item, i) => (i === idx ? { ...item, attachment: url } : item))
    );
  };

  const addCustomItem = () => {
    if (!newItem.label.trim()) return;
    setItems([...items, { ...newItem, checked: false }]);
    setNewItem({
      label: "",
      priority: "Optional",
      comments: "",
      owner: "",
      attachment: null,
    });
  };

  const exportChecklist = () => {
    window.print(); // Simple for demo. Use jsPDF or export as needed.
  };

  return (
    <Card className="trip-checklist mb-4">
      <Card.Header as="h5" className="fw-semibold">
        Trip Checklist
      </Card.Header>
      <ListGroup>
        {items.map((item, idx) => (
          <ListGroup.Item
            key={idx}
            className="d-flex align-items-center justify-content-between py-3"
          >
            <div>
              <Form.Check
                type="checkbox"
                checked={item.checked}
                label={item.label}
                onChange={() => toggleItem(idx)}
                className="fw-bold"
              />
              <Badge bg={colors[item.priority]} className="ms-2">
                {item.priority}
              </Badge>
              {item.comments && (
                <span className="text-muted ms-3 small">{item.comments}</span>
              )}
              {item.owner && (
                <span className="ms-2 text-info small">({item.owner})</span>
              )}
            </div>
            <div className="d-flex gap-2 align-items-center">
              {item.attachment && (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>View attachment</Tooltip>}
                >
                  <a
                    href={item.attachment}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📎
                  </a>
                </OverlayTrigger>
              )}
              <Form.Control
                type="file"
                size="sm"
                style={{ width: "110px" }}
                onChange={(e) =>
                  e.target.files[0] && handleAttachment(idx, e.target.files[0])
                }
                title="Attach file"
              />
              <Form.Control
                type="text"
                placeholder="Comment or Buddy"
                value={item.comments}
                size="sm"
                style={{ width: "140px" }}
                onChange={(e) => updateItem(idx, "comments", e.target.value)}
              />
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <ProgressBar
        className="mt-3"
        now={progress}
        label={`${progress}% Completed`}
      />

      <Card.Body>
        <h6 className="mt-2 mb-2">Add custom item:</h6>
        <InputGroup className="mb-2">
          <Form.Control
            placeholder="New item description"
            value={newItem.label}
            onChange={(e) =>
              setNewItem((i) => ({ ...i, label: e.target.value }))
            }
          />
          <Form.Select
            value={newItem.priority}
            onChange={(e) =>
              setNewItem((i) => ({ ...i, priority: e.target.value }))
            }
            style={{ width: "110px" }}
          >
            {priorities.map((prio) => (
              <option key={prio} value={prio}>
                {prio}
              </option>
            ))}
          </Form.Select>
          <Form.Control
            placeholder="Buddy/comment"
            value={newItem.comments}
            style={{ width: "120px" }}
            onChange={(e) =>
              setNewItem((i) => ({ ...i, comments: e.target.value }))
            }
          />
          <Button variant="primary" onClick={addCustomItem}>
            Add
          </Button>
        </InputGroup>
        <Button variant="success" className="me-2" onClick={exportChecklist}>
          Export/Print
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TripChecklist;

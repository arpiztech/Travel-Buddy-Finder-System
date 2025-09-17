import React, { useState } from "react";

const checklistData = {
  "Travel Essentials": [
    "Passport / ID proof",
    "Tickets (Flight/Train/Bus)",
    "Hotel booking confirmation",
    "Travel insurance",
    "Wallet & Cards",
  ],
  "Clothing & Accessories": [
    "Comfortable clothes",
    "Shoes / Slippers",
    "Jacket / Raincoat",
    "Sunglasses / Cap",
  ],
  "Toiletries": [
    "Toothbrush & Toothpaste",
    "Soap / Facewash",
    "Sunscreen / Moisturizer",
    "Towel & Hand sanitizer",
  ],
  Electronics: [
    "Mobile & Charger",
    "Power bank",
    "Earphones / Headphones",
    "Camera",
  ],
  Medications: [
    "First aid kit",
    "Personal medicines",
    "Mask & Sanitizer",
  ],
  Miscellaneous: [
    "Snacks",
    "Water bottle",
    "Travel pillow",
    "Map / Guidebook",
  ],
};

const Checklist = () => {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (category, item) => {
    setCheckedItems((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: !prev[category]?.[item],
      },
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {Object.entries(checklistData).map(([category, items]) => (
        <div
          key={category}
          className="bg-white shadow-lg rounded-xl p-5 border hover:shadow-xl transition"
        >
          <h2 className="text-lg font-semibold mb-3 text-blue-700 flex items-center gap-2">
            📌 {category}
          </h2>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={checkedItems[category]?.[item] || false}
                  onChange={() => toggleCheck(category, item)}
                  className="w-5 h-5 accent-blue-600"
                />
                <span
                  className={`${
                    checkedItems[category]?.[item]
                      ? "line-through text-gray-500"
                      : "text-gray-800"
                  }`}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Checklist;

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
  Medications: ["First aid kit", "Personal medicines", "Mask & Sanitizer"],
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Items:", checkedItems);
    alert("✅ Checklist Saved Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl w-full bg-white shadow-2xl rounded-2xl p-10 border border-gray-200"
      >
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-10">
          🧳 Travel Checklist Form
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(checklistData).map(([category, items]) => (
            <div
              key={category}
              className="bg-gradient-to-r from-indigo-50 to-blue-100 rounded-xl p-6 border border-indigo-200 shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-4 text-indigo-800 flex items-center gap-2">
                📌 {category}
              </h2>
              <ul className="space-y-3">
                {items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-md hover:bg-indigo-50 transition"
                  >
                    <input
                      type="checkbox"
                      checked={checkedItems[category]?.[item] || false}
                      onChange={() => toggleCheck(category, item)}
                      className="w-5 h-5 accent-indigo-600"
                    />
                    <label
                      className={`cursor-pointer ${
                        checkedItems[category]?.[item]
                          ? "line-through text-gray-500"
                          : "text-gray-800 font-medium"
                      }`}
                    >
                      {item}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
          >
            Save Checklist ✅
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checklist;

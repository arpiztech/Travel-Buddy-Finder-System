import React, { useState } from "react";

const activitiesData = {
  "Sports & Fun": [
    "Cycling Tour",
    "Kayaking",
    "Skiing / Snowboarding",
    "Zip Lining",
    "Horse Riding",
  ],
  "Special": [
    "Photography Walk",
    "Hot Air Balloon Ride",
    "Safari",
    "Stargazing",
  ],
  "Entertainment & Nightlife": [
    "Live Music",
    "Night Club / Pub Crawl",
    "Local Festival / Events",
    "Movie Night",
  ],
  "Cultural & Sightseeing": [
    "City Tour",
    "Museum Visits",
    "Historical Monuments",
    "Local Markets / Shopping",
    "Cultural Show / Theater",
    "Temple / Church / Mosque Visit",
  ],
  "Food & Lifestyle": [
    "Street Food Tasting",
    "Cafe Hopping",
    "Fine Dining",
    "Cooking Class",
    "Wine / Brewery Tour",
  ],
  "Leisure & Relaxation": [
    "Beach Walks",
    "Spa & Wellness",
    "Sunset Watching",
    "Pool Party",
    "Meditation / Yoga",
  ],
};



const Activities = () => {
  const [selected, setSelected] = useState([]);

  const handleChange = (activity) => {
    setSelected((prev) =>
      prev.includes(activity)
        ? prev.filter((item) => item !== activity) // unselect
        : [...prev, activity] // select
    );
  };

  return (
    <div className="p-6">
      {Object.entries(activitiesData).map(([category, items]) => (
        <div key={category} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">{category}</h2>
          <ul className="space-y-2">
            {items.map((activity) => (
              <li key={activity}>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selected.includes(activity)}
                    onChange={() => handleChange(activity)}
                  />
                  <span>{activity}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* ✅ Selected items list */}
      {selected.length > 0 && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Selected Activities:</h3>
          <ul className="list-disc pl-5 space-y-1">
            {selected.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Activities;

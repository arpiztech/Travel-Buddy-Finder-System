import React, { useState } from "react";

const activitiesData = {
  "Adventure Activities": [
    "Hiking / Trekking",
    "Camping",
    "Scuba Diving",
    "Skydiving",
    "Paragliding",
    "River Rafting",
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
  "Entertainment & Nightlife": [
    "Live Music",
    "Night Club / Pub Crawl",
    "Local Festival / Events",
    "Movie Night",
  ],
  "Sports & Fun": [
    "Cycling Tour",
    "Kayaking",
    "Skiing / Snowboarding",
    "Zip Lining",
    "Horse Riding",
  ],
  Special: ["Photography Walk", "Hot Air Balloon Ride", "Safari", "Stargazing"],
};

const Activities = () => {
  const [selected, setSelected] = useState({});

  const toggleSelect = (category, activity) => {
    setSelected((prev) => {
      const categorySelected = prev[category] || {};
      return {
        ...prev,
        [category]: {
          ...categorySelected,
          [activity]: !categorySelected[activity],
        },
      };
    });
  };

  // Flatten selected activities into one array
  const selectedActivities = Object.entries(selected)
    .flatMap(([category, activities]) =>
      Object.entries(activities)
        .filter(([_, isSelected]) => isSelected)
        .map(([activity]) => `${activity} (${category})`)
    );

  return (
    <div className="p-6">
      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(activitiesData).map(([category, activities]) => (
          <div
            key={category}
            className="bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition"
          >
            <h3 className="text-lg font-semibold mb-3 text-blue-600">
              {category}
            </h3>
            <ul className="space-y-1 text-gray-700">
              {activities.map((activity) => (
                <li key={activity} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selected[category]?.[activity] || false}
                    onChange={() => toggleSelect(category, activity)}
                    className="w-5 h-5 accent-blue-600"
                  />
                  <span
                    className={`${
                      selected[category]?.[activity]
                        ? "line-through text-gray-300"
                        : "text-gray-800"
                    }`}
                  >
                    {activity}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Selected Activities Summary */}
      <div className="mt-6 flex justify-center">
        <div className="bg-blue-600 text-white p-4 rounded-lg w-full md:w-2/3 lg:w-1/2 text-center">
          <h4 className="font-semibold mb-2">✅ Your Selected Activities:</h4>
          {selectedActivities.length > 0 ? (
            <ul className="list-disc list-inside">
              {selectedActivities.map((act, index) => (
                <li key={index}>{act}</li>
              ))}
            </ul>
          ) : (
            <p>No activities selected yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activities;

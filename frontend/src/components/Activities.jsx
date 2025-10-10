import React, { useState } from "react";

// Enhanced activitiesData structure
const activitiesData = [
  {
    name: "Cycling Tour",
    category: "Sports & Fun",
    location: "Amsterdam, Netherlands", // City/region
    coordinates: { lat: 52.3676, lon: 4.9041 }, // Optional
    date: "April-October", // Season or date range
    time: "09:00–12:00", // Example time slot
    difficulty: "Moderate", // Easy/Moderate/Challenging
    groupSize: { min: 2, max: 10 },
    cost: "€30-€50", // Price range/free
    ageSuitability: "12+",
    accessibility: "Wheelchair accessible trails available",
    buddyInterest: 4, // Number of people interested
    description: "Explore city highlights by bike with a local guide.",
    multimedia: [
      { type: "image", url: "/images/cycling-tour.jpg" },
      { type: "video", url: "/videos/cycling-amsterdam.mp4" },
    ],
    reviews: [
      { user: "Sam", rating: 5, comment: "Great fun!" },
      { user: "Priya", rating: 4, comment: "Easy to join as a beginner." },
    ],
    booking: "Required – Book at least 2 days in advance",
  },
  // Add more activity objects here...
];

const Activities = () => {
  const [selected, setSelected] = useState([]);

  const handleChange = (activityName) => {
    setSelected((prev) =>
      prev.includes(activityName)
        ? prev.filter((item) => item !== activityName)
        : [...prev, activityName]
    );
  };

  // Group activities by category for display
  const grouped = activitiesData.reduce((acc, activity) => {
    acc[activity.category] = acc[activity.category] || [];
    acc[activity.category].push(activity);
    return acc;
  }, {});

  return (
    <div className="p-6">
      {Object.entries(grouped).map(([category, activities]) => (
        <div key={category} className="mb-6">
          <h2 className="text-2xl font-bold mb-2">{category}</h2>
          <ul className="space-y-4">
            {activities.map((activity) => (
              <li key={activity.name} className="border-b pb-2">
                <label className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    checked={selected.includes(activity.name)}
                    onChange={() => handleChange(activity.name)}
                  />
                  <div>
                    <span className="font-semibold">{activity.name}</span>
                    <div className="text-sm text-gray-600">
                      {activity.description}
                    </div>
                    <div className="text-xs flex flex-wrap gap-2 mt-1">
                      <span>📍 {activity.location}</span>
                      <span>🗓 {activity.date}</span>
                      <span>⌚ {activity.time}</span>
                      <span>🤸 {activity.difficulty}</span>
                      <span>
                        👥 {activity.groupSize.min}-{activity.groupSize.max}
                      </span>
                      <span>💰 {activity.cost}</span>
                      <span>🎂 {activity.ageSuitability}</span>
                      <span>♿️ {activity.accessibility}</span>
                      <span>🔥 {activity.buddyInterest} interested</span>
                      <span>📄 {activity.booking}</span>
                    </div>
                    <ul className="list-disc pl-5 text-xs mt-2">
                      {activity.reviews.map((r, i) => (
                        <li key={i}>
                          "{r.comment}" — {r.user} ({r.rating}⭐)
                        </li>
                      ))}
                    </ul>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {selected.length > 0 && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Selected Activities</h3>
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

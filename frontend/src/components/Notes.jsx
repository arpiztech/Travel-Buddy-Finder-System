import React from "react";

const Notes = () => {
  const notes = [
    {
      title: "User Privacy",
      points: [
        "Sensitive details (phone, email, location) are hidden from public.",
        "Communication happens only through the platform.",
      ],
    },
    {
      title: "Limitations",
      points: [
        "Matching accuracy depends on user-provided preferences.",
        "System works best with a larger active user base.",
      ],
    },
    {
      title: "Assumptions",
      points: [
        "Users provide genuine information about trips and interests.",
        "Internet connection is always available.",
      ],
    },
    {
      title: "Implementation Notes",
      points: [
        "JWT is used for secure authentication.",
        "Passwords are stored in hashed format.",
        "Trips are linked to user IDs for consistency.",
      ],
    },
    {
      title: "Future Improvements",
      points: [
        "AI-based buddy suggestions.",
        "Integration with Google Maps for trip routes.",
        "Push notifications for trip updates.",
      ],
    },
    {
      title: "Deployment Notes",
      points: [
        "Frontend can be deployed on Vercel/Netlify.",
        "Backend can be deployed on Render/Heroku.",
        "Database: MySQL or MongoDB.",
      ],
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
        📌 Project Notes
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {notes.map((note, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-blue-500 mb-2">
              {note.title}
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {note.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;

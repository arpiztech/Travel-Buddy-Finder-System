import Navbar from "../components/Navbar";
import Buddy from "../components/Buddy";

export default function Buddies() {
  const buddies = [
    { name: "Ravi", interests: "Trekking", location: "Himalaya" },
    { name: "Simran", interests: "Food, Beaches", location: "Goa" },
  ];

  return (
    <div>
      <Navbar />
      <h2>Travel Buddies</h2>
      <div className="grid">
        {buddies.map((b, i) => (
          <Buddy key={i} buddy={b} />
        ))}
      </div>
    </div>
  );
}

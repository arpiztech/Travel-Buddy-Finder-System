import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="brand">TravelBuddy</div>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/buddies">Buddies</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/login">Login</Link>
      </nav>
    </header>
  );
}

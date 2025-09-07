import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile"; 
import MyTrip from "./pages/MyTrip";
import ViewTrip from "./pages/ViewTrip"; // ✅ make sure import name matches file

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Routes>
      {/* Login page */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <Login setIsAuthenticated={setIsAuthenticated} />
          )
        }
      />

      {/* Signup page */}
      <Route
        path="/signup"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <Signup setIsAuthenticated={setIsAuthenticated} />
          )
        }
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
      />

      <Route path="/profile" element={<Profile />} /> 

      {/* Trips */}
      <Route path="/trip" element={<MyTrip />} />     {/* Create + View own trips */}
      <Route path="/viewtrip" element={<ViewTrip />} /> {/* Predefined trips */}
    </Routes>
  );
}

export default App;

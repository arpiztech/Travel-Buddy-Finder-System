import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import MyTrip from "./pages/MyTrip";
import ViewTrip from "./pages/ViewTrip";
import CreateTrip from "./pages/CreateTrip";
import BuddyRequests from "./pages/BuddyRequests";
import Message from "./pages/Message";

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
      <Route path="/viewtrip" element={<ViewTrip />} />
      <Route path="/createtrip" element={<CreateTrip />} />
      <Route path="/trip" element={<MyTrip />} />

      <Route
        path="/buddy-request"
        element={isAuthenticated ? <BuddyRequests /> : <Navigate to="/" />}
      />

      {/* Messages Sidebar Page */}
      <Route
        path="/messages"
        element={isAuthenticated ? <Message /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;

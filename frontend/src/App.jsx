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
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Logout from "./pages/Logout";
import About from "./pages/About"; // <-- Import About

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
      {/*LogOut*/}
      <Route path="/logout" element={<Logout />} />

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
      {/* ✅ About Page */}
      <Route path="/about" element={<About />} />

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
      <Route
        path="/notifications"
        element={isAuthenticated ? <Notifications /> : <Navigate to="/" />}
      />
      <Route
        path="/settings"
        element={isAuthenticated ? <Settings /> : <Navigate to="/" />}
      />

      {/* ✅ Logout Route (fixed) */}
      <Route
        path="/logout"
        element={<Logout onLogout={() => setIsAuthenticated(false)} />}
      />

      {/* ✅ Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

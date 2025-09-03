import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

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
        element={
          isAuthenticated ? <Dashboard /> : <Navigate to="/" />
        }
      />
    </Routes>
  );
}

export default App;

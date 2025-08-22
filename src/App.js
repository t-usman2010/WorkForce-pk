import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingpage";
import AppointUs from "./pages/appointus";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/appoint" element={<AppointUs />} />
      </Routes>
    </Router>
  );
}

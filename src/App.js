import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Clock from "./components/Clock";
import Stopwatch from "./components/Stopwatch";
import Timer from "./components/Timer";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="menu">
          <Link to="/clock" className="menu-item">Saat</Link>
          <Link to="/stopwatch" className="menu-item">Saniyəölçən</Link>
          <Link to="/timer" className="menu-item">Taymer</Link>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/clock" element={<Clock />} />
            <Route path="/stopwatch" element={<Stopwatch />} />
            <Route path="/timer" element={<Timer />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

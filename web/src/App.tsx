import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Routes from "./routes";

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;

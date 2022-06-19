import React from "react";
import '../stylesheets/App.css';
import Login from '../components/Login';
import Surveys from '../components/Surveys';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}>
        </Route>
        <Route path="/Surveys" element={<Surveys />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
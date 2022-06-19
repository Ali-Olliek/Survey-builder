import React, { useState, useEffect} from "react";
import '../stylesheets/App.css';
import Login from '../components/Login';
import Surveys from '../components/Surveys';
import SignUp from '../components/SignUp';
import CreateSurvey from '../components/CreateSurvey';
import DropDown from '../components/DropDown';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  const [selected, setSelected] = useState("");
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />}>
        </Route>
        <Route path="/SignUp" element={<SignUp />}>
        </Route>
        <Route path="/Surveys" element={<Surveys />}>
        </Route>
        <Route path="/CreateSurvey" element={<CreateSurvey selected={selected} setSelected = {setSelected}/>}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
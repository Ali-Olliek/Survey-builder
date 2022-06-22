import React, { useState} from "react";
import '../stylesheets/App.css';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Survey from '../pages/Survey';
import Surveys from '../pages/Surveys';
import CreateSurvey from '../pages/CreateSurvey';
import NavBar from '../components/NavBar'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  const [selected, setSelected] = useState("");
  
return (
  <Router>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Login />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
        <Route path="/Survey" element={<Survey />}></Route>
        <Route path="/SurveysList" element={<Surveys />}></Route>
        <Route path="/Admin/CreateSurvey" element={<CreateSurvey />}></Route>
    </Routes>
  </Router>
  );
}

export default App;
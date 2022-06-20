import React, { useState} from "react";
import '../stylesheets/App.css';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Survey from '../components/Survey';
import Surveys from '../components/Surveys';
import CreateSurvey from '../components/CreateSurvey';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  const [selected, setSelected] = useState("");
  
return (
  <Router>
    <Routes>
      <Route path="/" element={<Login />}></Route>
        <Route path="/SignUp" element={<SignUp />}></Route>
          <Route
            path="/Surveys"
            element={<Surveys />}>
          </Route>
          <Route
            path="/CreateSurvey"
            element={
          <CreateSurvey 
            selected={selected} 
            setSelected={setSelected} />
            }>
          </Route>
          <Route 
          path="/Survey" 
          element={<Survey />}>
          </Route>
    </Routes>
  </Router>
  );
}

export default App;
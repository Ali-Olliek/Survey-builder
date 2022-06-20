import React, { useState } from 'react';
import DropDown from './DropDown';
import axios from 'axios';

export default function CreateSurvey({ selected, setSelected}) {
  
  // Value States
  const [values, setValues] = useState({
    title: "",
    createdBy: "",
    questions: [],
    answers: []
  });
  const [submitted, setSubmitted] = useState(false);

  // Handle Inputs
  const handleTitleInput = (event) => {
    setValues({ ...values, title: event.target.value });
  };
  const handleCreatedInput = (event) => {
    setValues({ ...values, createdBy: event.target.value });
  };
  const handleQuestionInput = (event) => {
    setValues({ ...values, questions: event.target.value });
  };
  const handleAnswerInput = (event) => {
    setValues({ ...values, answers: event.target.value });
  };

  // Submitting Survey
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!values.title && !values.question){
      alert("Please Fill Out a Title and a Question")
    }

    let surveyTitle = values.title;
    let surveyCreatedBy = values.createdBy;
    let question_type = "Question Type"; // Need to get selected option from component
    
    let question = []; // Backend will recieve a JSON object
    let answers = []; // With Nested Arrays
    let questions = [];
    
    // Question Content and Type 
    let content = values.questions
    question.push(question_type)
    question.push(content)
    
    // Answers Content
    content = values.answers

    //Sample Survey => { "surveyTitle":"Survey I", "surveyCreatedBy":"Created By Survey I","questions":[["Question 1","Question Type 1",["Answer 1","Answer 2","Answer 3"]],]}

    answers.push(content)
    question.push(answers)
    questions.push(question)
    
    return axios
      .post("http://127.0.0.1:8000/api/v1/Admin/CreateSurveys", {
        surveyTitle,
        surveyCreatedBy,
        questions,
      })
      .then((response) => {
        if (response.status === 200) {

          setSubmitted(true);

          setTimeout(() => {
            setSubmitted(false)
          }, 2000);
        }
        return response.data;
      });
  };

  let user = localStorage.getItem("user");
  user = user.split(",");
  let username = user[0];

  return (
    <div className="Admin">
      <h1 className="message">Welcome, {username}!</h1>
      <div className="adminCard">
        <form className="create-survey" onSubmit={handleSubmit}>
        {submitted ? (
          <div className="success-message">
          Survey Added!
          </div>
        ) : null}
          <div className="survey-control">
            <label>Survey Title</label>
            <input
              onChange={handleTitleInput}
              type="text"
              placeholder="Add A Title"
            />
          </div>

          <div className="survey-control">
            <label>Created By</label>
            <input
              type="text"
              placeholder="Created By"
              onChange={handleCreatedInput}
            />
          </div>

          <div className="survey-control">
            <label>Question</label>
            <input
              onChange={handleQuestionInput}
              type="text"
              placeholder="Add Question"
            />
          </div>
          <div>
            <DropDown 
            selected={selected} 
            setSelected={setSelected} />
          </div>
          <div className="survey-control">
            <label>Answer</label>
            <input
              onChange={handleAnswerInput}
              type="text"
              placeholder="Add Answer"
            />
          </div>
          <button onClick={handleSubmit} type="submit">
            Submit Survey
          </button>
        </form>
      </div>
    </div>
  );
}

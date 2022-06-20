import React, { useState } from 'react';
import DropDown from './DropDown';
import Answers from './Answers';
import axios from 'axios';

export default function CreateSurvey({ selected, setSelected}) {
  
    const [values, setValues] = useState({
      title: "",
      createdBy: "",
      questions: [],
      answers: []
    });

    const handleTitleInput = (event) => {
      setValues({ ...values, title: event.target.value });
    };

    const handleCreatedInput = (event) => {
      setValues({ ...values, createdBy: event.target.value });
    };


    const handleSubmit = async (event) => {
      event.preventDefault();
      if(!values.title && !values.question){
        alert("Please Fill Out a Title and a Question")
      }
      let surveyTitle = "TestTitle";
      let surveyCreatedBy = "TestCreate";

      let question = [];
      let content = "question 1"
      let question_type = "Question type 1";
      question.push(question_type)
      question.push(content)
      let answers = [];
      answers.push("Test Answer", "Test Answer 2")
      question.push(answers)
      let questions = [];
      questions.push(question)
      
      console.log(answers)
      console.log(question)
      console.log(questions)
      
      return axios
        .post("http://127.0.0.1:8000/api/v1/Admin/CreateSurveys", {
          surveyTitle,
          surveyCreatedBy,
          questions,
        })
        .then((response) => {
          if (response.status === 200) {
            console.log(response)
          }
          return response.data;
        });
    };

    return (
      <form className="create-survey" onSubmit={handleSubmit}>
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
          <input type="text" placeholder="Add Question" />
        </div>
        <div>
          <DropDown selected={selected} setSelected={setSelected} />
        </div>
        <div>
          <Answers />
        </div>
        <button onClick={handleSubmit} type="submit">
          Submit Survey
        </button>
      </form>
    );
}

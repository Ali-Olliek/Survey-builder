import React, { useState } from 'react'
import DropDown from './DropDown'
export default function CreateSurvey({onAdd, selected, setSelected}) {
  
    const [title, setTitle] = useState("");
    const [createdBy, setCreatedBy] = useState("");
    const [questions, setQuestions] = useState("");  
    const [answers, setAnswers] = useState("");

    const handleTitleInput = (event) => {
      setTitle({ ...title, title: event.target.value });
    };
    const handleCreatedInput = (event) => {
      setCreatedBy({ ...createdBy, createdBy: event.target.value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();{
            alert("Survey Can't be Empty");
            return
        }
        onAdd({title, createdBy, questions, answers})
        setTitle("");
        setCreatedBy("");
        setQuestions("");
        setAnswers("");
    };

    return (
      <form className="create-survey" onSubmit={handleSubmit}>
        <div className="survey-control">
          <label>Survey Title</label>
          <input
          type="text" 
          placeholder="Add A Title" />
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
      </form>
    );
}

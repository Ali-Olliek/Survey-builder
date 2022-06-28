import { useState, useEffect } from "react";
import axios from 'axios'

const CreateSurvey = () => {
  //States
  const [title, setTitle] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [inputFields, setInputFields] = useState([
    {
      content: "",
      type: "textBox",
      answers: [],
      currentAnswer: "",
    },
  ]);

  const questionTypes = ["textBox", "checkBox", "radio", "dropdown"];

  const handleFormChange = (index, e) => {
    let data = [...inputFields];
    data[index][e.target.name] = e.target.value;
    setInputFields(data);
  };

  const handleCreateNewQuestion = (e) => {
    let newQuestion = {
      content: "",
      type: "textBox",
      answers: [],
      currentAnswer: "",
    };
    setInputFields([...inputFields, newQuestion]);
  };

  const handleAddAnswer = (index, newAnswer) => {
    console.log(newAnswer);
    let answer = [...inputFields]; // Assign Answer To The Whole Inputs Array
    answer[index].answers.push(newAnswer); // Push the new Answer to the existing Array
    setInputFields(answer); // update State
  };
console.log(inputFields.content)
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(title, createdBy, inputFields.content, inputFields.type);
    let surveyTitle = title;
    let surveyCreatedBy = createdBy;
    let questions = [];
    let question = [inputFields.content, inputFields.type, [inputFields.answers]]
    questions.push(question)

    console.log(questions)
    return axios
      .post("http://127.0.0.1:8000/api/v1/Admin/CreateSurveys", {
        surveyTitle,
        surveyCreatedBy,
        questions,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("success");
        } else {
          console.log("failed to create survey");
        }
      });
  };

  // JSON format for the request

  // {
  //     "surveyTitle":"Survey Title",
  //     "surveyCreatedBy":"Created By Survey I",
  //     "questions":[
  //         ["Question 1","Question Type 1",["Answer 1","Answer 2","Answer 3"]],
  //         ["Question 2","Question Type 2",["Answer a","Answer b","Answer c"]],
  //         ["Question 3","Question Type 3",["Answer i","Answer ii","Answer iii"]]
  //     ]
  // }

  return (
    <div className="adminPage">
      <form onSubmit={handleSubmit}>
        <div>
          <p>Survey Title</p>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="Title"
            placeholder="Survey Title"
            value={title}
          />
        </div>
        <div>
          <p>Created By</p>
          <input
            onChange={(e) => setCreatedBy(e.target.value)}
            type="text"
            name="createdBy"
            placeholder="Who Ordered This Survey? Ex: 'xyz Company'"
            value={createdBy}
          />
        </div>
        {inputFields.map((input, index) => {
          return (
            <div key={index}>
              <p>Question Type</p>
              <select
                value={input.type}
                name="type"
                onChange={(e) => {
                  handleFormChange(index, e);
                }}
              >
                {questionTypes.map((type) => {
                  return <option value={type}>{type}</option>;
                })}
              </select>
              <p>Question Context</p>
              <input
                placeholder="Question's Context"
                type="text"
                name="context"
                value={inputFields.content}
                onChange={(e) => {
                  handleFormChange(index, e);
                }}
              />
              {(input.type === "dropdown" || input.type === "radio") && (
                <div className="choices">
                  <p>Choices: </p>
                  <input
                    type={"text"}
                    name="currentAnswer"
                    onChange={(e) => {
                      handleFormChange(index, e);
                    }}
                  />
                  <button
                    className="answer"
                    type="button"
                    onClick={() => {
                      handleAddAnswer(index, input.currentAnswer);
                    }}
                  >
                    Add Choice
                  </button>
                  {input.answers.map((answer) => {
                    return <div className="choice">{answer}</div>;
                  })}
                </div>
              )}
            </div>
          );
        })}
        <div>
          <button
            className=" add"
            type="button"
            onClick={handleCreateNewQuestion}
          >
            Add More Questions
          </button>
        </div>
        <div>
          <button className=" submit" type="submit">
            Create New Survey
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSurvey;

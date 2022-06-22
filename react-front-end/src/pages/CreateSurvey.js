import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    console.log(newAnswer)
    let answer = [...inputFields]; // Assign Answer To The Whole Inputs Array
    answer[index].answers.push(newAnswer); // Push the new Answer to the existing Array
    setInputFields(answer); // update State
  };
  
  const handleSubmit = () => {
    return
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <p>Survey Title</p>
        <input onChange={ (e) => setTitle(e.target.value)} 
        type="text" 
        name="Title" 
        value={title} />
      </div>
      <div>
        <p>Created By</p>
        <input
          onChange={(e) => setCreatedBy(e.target.value)}
          type="text"
          name="createdBy"
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
              <div>
                <p>Choices: </p>
                <input
                  type={"text"}
                  name="currentAnswer"
                  onChange={(e) => {
                    handleFormChange(index, e);
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    handleAddAnswer(index, input.currentAnswer);
                  }}
                >
                  Add Choice
                </button>
                {input.answers.map((answer) => {
                  return <div>{answer}</div>;
                })}
              </div>
            )}
          </div>
        );
      })}
      <button 
      type="button" 
      onClick={handleCreateNewQuestion}>
        Add More
      </button>
      <button type="submit">Create New Survey</button>
    </form>
  );
};

export default CreateSurvey;

import React, { useState, useEffect} from 'react'
import axios from 'axios'

export default function Survey() {

  const [surveyInfo, setSurveyInfo] = useState({
    title: "",
    createdBy: "",
    questions: [],
    answers: [],
  })

  const id = localStorage.getItem("Survey_Id");
  const [currentPageUrl, setCurrentPageUrl] = useState(`http://127.0.0.1:8000/api/v1/Surveys/DisplaySurvey${id}`);

  useEffect(() => {
    axios.get(currentPageUrl)
      .then((res) => {
        console.log(res.data)
        setSurveyInfo({
          title: res.data.survey.title,
          createdBy: res.data.survey.created_by,
          questions: res.data.survey_questions,
          answers: res.data.survey_answers
        });
      });
    }, [currentPageUrl]);

console.log(surveyInfo.answers)

let i = 0;

return (
  <div className='sur'>
    <div className="surveyEle">
      <div>
        <h2 className="surveyInfo">{surveyInfo.title}</h2>
        <p className="surveyInfo">{surveyInfo.createdBy}</p>
      </div>
      <div className="questions">
        {surveyInfo.questions.map((question) => (
          <p className="question">
            {question.content}
            {surveyInfo.answers[i].map((answer) => (
              <h4 className="answer">{answer.content}</h4>
            ))}
          </p>
        ))}
      </div>
    </div>
  </div>
);
}

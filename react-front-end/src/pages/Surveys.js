import React, { useState, useEffect } from 'react';

export default function Surveys() {
  
  const [Surveys, setSurveys] = useState(["No Surveys To Fill"]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/Surveys/All")
      .then((response) => response.json())
      .then((json) => setSurveys(json.surveys));
  }, []);

  function goToSurvey (event) {
    const id = event.target.id
    console.log(id)
    localStorage.setItem("Survey_Id", id)
    window.location.href = `/Survey`
  }
  let user = localStorage.getItem("user");
  user = user.split(',');
  let username = user[0]
  return (
      <div>
        <h1 className="message">Welcome, {username}</h1>
        <div className="Survey-container">
          {Surveys.map((Survey) => {
            return (
              <>
                <div
                  id={`${Survey.id}`}
                  onClick={goToSurvey}
                  className={`Card Survey${Survey.id}`}
                  key={Survey.id}
                >
                  <h1 id={`${Survey.id}`} className="Survey-title">
                    {JSON.stringify(Survey.title)}
                  </h1>
                  <h4 id={`${Survey.id}`} className="Survey-created-by">
                    {JSON.stringify(Survey.created_by)}
                  </h4>
                </div>
              </>
            );
          })}
        </div>
      </div>
  );
}












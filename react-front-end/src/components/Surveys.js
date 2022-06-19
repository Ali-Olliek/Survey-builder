import React, { useState, useEffect } from 'react';

export default function Surveys() {
  const [Surveys, setSurveys] = useState(["No Surveys To Fill"]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/Surveys/All")
      .then((response) => response.json())
      .then((json) => setSurveys(json.surveys));
  }, []);

  return (
    <div className='Survey-container'>
      {Surveys.map(Survey => {
        return (
          <>
            <div className={`Card Survey${Survey.id}`} key={Survey.id}>
              <h1 className="Survey-title">{JSON.stringify(Survey.title)}</h1>
              <h4 className="Survey-created-by">{JSON.stringify(Survey.created_by)}</h4>
            </div>
          </>
        );
      })}
    </div>
  );
}












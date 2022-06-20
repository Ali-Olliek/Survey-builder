import React, { useState, useEffect} from 'react'
import axios from 'axios'

export default function Survey() {

    const [singleSurvey, setSingleSurvey] = useState(["NO DATA"]);
    const id = localStorage.getItem("Survey_Id");
    const [currentPageUrl, setCurrentPageUrl] = useState(`http://127.0.0.1:8000/api/v1/Surveys/DisplaySurvey${id}`);

    useEffect(() => {
      axios.get(currentPageUrl)
        .then((res) => {
          console.log(res.data)
          setSingleSurvey(res.data.map((survey) => survey));
        });
      }, [currentPageUrl]);
      
let data = Array.from(singleSurvey)
return (
  <div>
    {data.map(survey => {
      return (
        <>
          <h1>{JSON.stringify(survey)}</h1>
        </>
        )
      })}
    </div>
  );
}

import React, { useState, useEffect} from 'react'
import axios from 'axios'

export default function Survey() {
    const [singleSurvey, setSingleSurvey] = useState(["NO DATA"]);
    const url = "http://127.0.0.1:8000/api/v1/Surveys/DisplaySurvey2";
    useEffect(() => {     
     axios({
         method:"GET",
         url: url
        }).then(res =>setSingleSurvey(res.data))
    }, []);  

console.log(singleSurvey)
return (
   <div className="Survey-container">
     {singleSurvey.map((survey) => {
       return (
        survey
       );
     })}
   </div>
 );
  }

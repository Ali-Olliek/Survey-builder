<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Survey;
use App\Models\Question;
use App\Models\Answer;

class AdminsController extends Controller
{   
    function createSurveys(Request $request){
        $check = Survey::where("title", "=", $request["surveyTitle"])->get();
        if (!$check){
            $status = "Exists";
            return $status;
        }

        $survey = new Survey;
        $survey -> title = $request["surveyTitle"];
        $survey -> created_by = $request["surveyCreatedBy"];
        $survey->save();

        for($i = 0; $i < count($request["questions"]) ; $i++){
                $question = new Question;
                $question -> content = $request["questions"][$i][0];
                $question -> question_type = $request["questions"][$i][1];
                $question -> survey_question_id = $survey->id;
                $question->save();
            
            for($j = 0; $j < count($request["questions"][$i][2]); $j++){     
                $answer = new Answer;
                $answer -> content = $request["questions"][$i][2][$j];
                $answer -> question_answer_id = $question->id;
                $answer -> save();
            };
        };

        return response()->JSON([
                "status" => "success",
                "Added" => "Survey, Questions and Answers"
            ], 200);
    }
}







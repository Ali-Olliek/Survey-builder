<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Survey;
use App\Models\Question;
use App\Models\Answer;
use App\Models\userResponse;
use App\Models\user;

class SurveysController extends Controller {
    function displayAll(){
        $surveys = Survey::all();
        return response()->json([
            "surveys" => $surveys,
            "status" => "success"
        ], 200);
    }

    function displaySurvey($survey_id){
        $survey = Survey::where("id", "=", $id)->first();
        if($survey){
            $questions = Question::where("survey_question_id", "=", $id)->get();
            $answer_list = [];
            for($i = 0; $i < count($questions); $i++){
                $answers = Answer::where("question_answer_id","=", $questions[$i]['id'])->get();
                array_push($answer_list, $answers);
            }
            return response()->json([
                "status" => "success",
                "survey" => $survey,
                "survey_questions" => $questions,
                "survey_answers" => $answer_list 
            ], 200);
        }  
        return response()->Json([
            "status" => "Survey Does Not Exist!"
        ]);
    }

    function displayUsersFilledSurvey(){
        $responses = userResponse::select("user_response_id")->distinct()->get();
        $surveys = Survey::all();
        return response()->json([
            "status" => "success",
            "User Count" => count($responses),
            "Surveys on Site" => count($surveys)
        ]);
    }
}
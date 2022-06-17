<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Survey;
use App\Models\Question;

class AdminsController extends Controller
{
    function createSurveys(Request $request){
        $check = Survey::where("name", "=", $request->title)->get();
        if (!$check){
            $status = "Exists";
            return $status;
        }
        $survey = new Survey;
        $survey -> title = $request -> surveyTitle;
        $survey -> created_by = $request -> surveyCreatedBy;

        foreach($question as $request->$questions){
            $question = new Question;
            $question -> content = $request->$questions-> content; 
            $question -> question_type = $request->$question->question_type;

            foreach($answer as $request->$questions->$answers){
                $answer = new Answer;
                $answer -> content = $request->$questions->$answers-> content;
            }
        }
    }
}
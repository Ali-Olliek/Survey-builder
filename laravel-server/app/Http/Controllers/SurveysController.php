<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SurveysController extends Controller
{
    function displayAll(){
        $surveys = Survey::all();
        return response()->json([
            "surveys" => $surveys,
            "status" => "success"
        ], 200);
    }

    function displaySurvey($id){
        $survey = Survey::where("id", "=", "%$id%")->get();
        return response()->json([
            "survey" => $survey,
            "status" => "success"
        ], 200);
    }
}

<?php

namespace App\Http\Controllers;
use Hash;
use Validator;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\userResponse;
use App\Models\Answer;
use App\Models\Survey;
use App\Models\Question;

class UsersController extends Controller {

    function submitResponse(Request $request){   
        for($i = 0; $i < count($request["user_answers"]); $i++){
            $response = new userResponse;
            $response -> user_response_id = $request->user_response_id;
            $response -> answer_response_id = $request["user_answers"][$i]["answer_id"];
            $response -> response = $request["user_answers"][$i]["response"];
            $response -> save();
        }

        return response()->json([
            "status" => "success"
        ]);
    }

    function displayUserStatistics($user_id){
        $responses = userResponse::where("user_response_id","=", $user_id)->get();
        $OverAllResponses = count($responses);
        $questions_answered = [];
        $surveys_filled = [];
        for($i = 0; $i < count($responses); $i++){
            $answers = Answer::where("id","=", $responses[$i]["answer_response_id"])->get();
            $questions = Question::where("id", "=", $answers[0]["question_answer_id"])->get();
            $surveys = Survey::where("id", "=", $questions[0]["survey_question_id"])->distinct()->get();
            array_push($questions_answered, $questions);
            if(!in_array($surveys, $surveys_filled)){
                array_push($surveys_filled, $surveys);
            }
        }
        return response()->json([
            "status" => "success",
            "Surveys Filled" => $surveys_filled,
            "Questions Answered" => $questions_answered,
            "User Responses" => $responses,
            "Responses Given" => $OverAllResponses
        ]);
    }

    function signUp(Request $request){
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|min:2|max:100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::create([
            'name' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_admin' => $request->is_admin
        ]);

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 200);
    }

    function logIn(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);
        
        $user = User::where('email', '=', $request->email)->first();

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if (!$token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json([
            "status" => "success",
            'username' => $user->name,
            'user_id' => $user->id
        ], 200);
    }
}

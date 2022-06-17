<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Models\User;
use Hash;

class UsersController extends Controller{

    function submitResponse(Request $request, $user_id){      
        foreach($response as $request->response){
            $response = new Response;
            $response -> user_id = $user_id;
            $response -> answer_id = $request->answer_id;
            $response -> response = $request -> response;
        }    
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
        ], 201);
    }

    function logIn(){
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
            $this->respondWithToken($token),
            'user' => $user->name
        ], 200);
    }
}

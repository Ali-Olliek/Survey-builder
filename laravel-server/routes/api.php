<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\AdminsController;
use App\Http\Controllers\SurveysController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix'=>'v1'], function(){
    Route::group(['prefix'=>'User'], function(){
        Route::POST('/Login', [UsersController::class, "logIn"])->name("log-in");
        Route::POST('/SignUp', [UsersController::class, "signUp"])->name("sign-up");
            Route::POST('/Submit', [UserController::class, "submitAnswers"])->name("submit");
            });
            Route::group(['prefix' => 'Surveys'], function(){
                Route::GET('/All', [SurveysController::class, "displayAll"])->name("display-all");
                Route::GET('/{id}', [SurveysController::class, "displaySurvey"])->name("display-one");
            });
            Route::group(['prefix'=>'Admin'], function(){
                Route::POST('/CreateSurveys', [AdminsController::class, "createSurveys"])->name("create-survey");
        });
    });

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
    Route::group(['prefix'=>'Users'], function(){
        Route::POST('/Login', [UsersController::class, "logIn"])->name("log-in");
        Route::POST('/SignUp', [UsersController::class, "signUp"])->name("sign-up");
        Route::POST('/Submit', [UsersController::class, "submitResponse"])->name("submit");
        Route::GET('/Statistics/{id}', [UsersController::class, "displayUserStatistics"])->name("submit");
            });
        Route::group(['prefix' => 'Surveys'], function(){
            Route::GET('/All', [SurveysController::class, "displayAll"])->name("display-all");
            Route::GET('/DisplaySurvey{id}', [SurveysController::class, "displaySurvey"])->name("display-one");
            Route::GET('/SurveysFilled/{survey_id?}', [SurveysController::class, "displayUsersFilledSurvey"])->name("filled-surveys");
        });
        Route::group(['prefix'=>'Admin'], function(){
            Route::POST('/CreateSurveys', [AdminsController::class, "createSurveys"])->name("create-survey");
    });
});

// Routes Cataloge:

// Login, SignUp => User Auth
// Submit => Submit Answers Corresponding to Survey's Questions
// Statistics/{id} => Displays Count of user answers, and surveys participated in.
// All => Displays all Surveys in DB
// DisplaySurvey => Displays the content of a single survey
// SurveysFilled => Display the amount of distinct users filling the given survey
// CreateSurveys => Admin Creates Survey

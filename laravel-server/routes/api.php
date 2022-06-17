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
        Route::POST('/Login', [UserController::class, "logIn"])->name("log-in");
        Route::POST('/SignUp', [UserController::class, "signUp"])->name("sign-up");
        Route::group(['middleware'=>'role.user'], function(){
            Route::POST('/Submit', [UserController::class, "submitAnswers"])->name("submit");
            });
            Route::group(['prefix' => 'Surveys'], function(){
                Route::GET('/All', [SurveysController::class, "displayAll"])->name("display-all");
                Route::GET('/{id}', [SurveysController::class, "displayOne"])->name("display-one");
            });
            Route::group(['prefix'=>'Admin'], function(){
                Route::POST('/CreateSurvey', [AdminsController::class, "createSurvey"])->name("create-survey");
        });
    });
});

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(){
        Schema::create('questions', function (Blueprint $table) {
        $table->id();
        $table->string('question_type');
        $table->json('content');
        $table->bigInteger('survey.question_id');
        $table->bigInteger('question.answer_id');
    });
}
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}

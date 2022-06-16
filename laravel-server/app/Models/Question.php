<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    function answer(){
        return $this->hasOne(Answer::class);
    }

    function survey(){
        return $this->belongsTo(Survey::class);
    }
}

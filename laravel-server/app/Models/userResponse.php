<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class userResponse extends Model {
    use HasFactory;

    function user(){
        $this->belongsTo(User::class);
    }

    function answer(){
        $this->belongsTo(Answer::class);
    }
}

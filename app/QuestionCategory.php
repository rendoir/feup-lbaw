<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class QuestionCategory extends Model
{
    protected $fillable = ['question_id', 'category_id'];

    public $timestamps = false;
}

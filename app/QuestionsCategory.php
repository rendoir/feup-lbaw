<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class QuestionsCategory extends Model
{
    protected $fillable = ['question_id', 'category_id'];

    public $timestamps = false;
}

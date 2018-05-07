<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bookmark extends Model
{
    protected $fillable = ['question_id', 'user_id'];

    public $timestamps  = false;

    protected $primaryKey = null;
}

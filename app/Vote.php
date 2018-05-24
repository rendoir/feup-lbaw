<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    protected $fillable = ['message_id', 'user_id', 'positive'];

    public $timestamps = false;
}

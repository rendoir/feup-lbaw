<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    protected $fillable = ['id', 'question_id'];

    public $timestamps = false;

    public function message() {
        return $this->hasOne('App\Message', 'id');
    }

    public function commentable() {
        return $this->hasOne('App\Commentable', 'id');
    }

    public function num_comments() {
        return $this->hasMany('App\Comment', 'commentable_id')->count();
    }
}

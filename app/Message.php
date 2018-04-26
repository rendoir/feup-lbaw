<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Message extends Model
{
    protected $fillable = ['author'];

    public $timestamps = false;

    public function message_version() {
        return $this->belongsTo('App\MessageVersion', 'latest_version');
    }

    public function categories() {
        return $this->belongsToMany(
            'App\Category',
            'questions_categories',
            'question_id',
            'category_id');
    }

    public function get_author() {
        return User::find($this->author);
    }

    public function was_edited() {
        return (
            $this->hasMany('App\MessageVersion')->count() > 1
        );
    }
}

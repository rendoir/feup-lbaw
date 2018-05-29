<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Commentable extends Model
{
    protected $fillable = ['id'];

    public $timestamps = false;

    public function message() {
        return $this->hasOne('App\Message', 'id');
    }

    public function get_question() {
        return Question::find($this->id);
    }

    public function get_answer() {
        return Answer::find($this->id);
    }

    public function get_comments() {
        return $this->hasMany('App\Comment', 'commentable_id');
    }

    public function get_num_comments() {
        return $this->get_comments()->count();
    }

    /**
     * The users who commented on this commentable (participated in the discussion).
     */
    public function get_followers()
    {
        return $this->get_comments()->get()->map(function ($comment) {
            return $comment->message->get_author();
        })->unique();
    }

}

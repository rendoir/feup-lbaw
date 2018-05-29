<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

use App\User;
use App\Question;
use App\Answer;

class Message extends Model
{
    protected $fillable = ['author'];

    public $timestamps = false;

    public function message_version() {
        return $this->belongsTo('App\MessageVersion', 'latest_version');
    }

    public function get_author() {
        return User::find($this->author);
    }

    public function was_edited() {
        return (
            $this->hasMany('App\MessageVersion')->count() > 1
        );
    }

    public function get_versions() {
        return $this->hasMany('App\MessageVersion');
    }

    public function getVote() {
      $vote = Vote::where('user_id', Auth::id())->where('message_id', $this->id)->first();
      if($vote != null)
        return $vote->positive;
      return null;
    }

    public static function getType($message_id) {
      if(Question::find($message_id) != null)
        return 'question';
      if(Answer::find($message_id) != null)
        return 'answer';
      return 'comment';
    }
}

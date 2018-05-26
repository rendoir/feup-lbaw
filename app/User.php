<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\File;

class User extends Authenticatable
{
    use Notifiable;

    // Don't add create and update timestamps in database.
    public $timestamps  = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'email', 'password_hash', 'provider', 'provider_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password_hash'
    ];

    public function getAuthPassword()
    {
        return $this->attributes['password_hash'];
    }

    public function getBadgeAttainments() {
        return $this->hasMany('App\BadgeAttainment');
    }

    public function getBadge() {
        $trusted = Badge::where('name', 'trusted')->first();
        $moderator = Badge::where('name', 'moderator')->first();

        if($trusted == null || $moderator == null)
          return null;

        if (BadgeAttainment::where([['user_id', $this->id], ['badge_id', $moderator->id]])->first() != null)
          return 'Moderator';
        if (BadgeAttainment::where([['user_id', $this->id], ['badge_id', $trusted->id]])->first() != null)
          return 'Trusted';
        return null;
    }

    public function getImage($type) {
      $name = '/' . $type . 's/' . $this->id;
      if(File::exists(public_path() . $name))
        return ($name);
      else return '/' . $type . 's/default';
    }

    public function getQuestions() {
      return Question::join('messages', 'questions.id', '=', 'messages.id')
                    ->where('messages.author', '=', $this->id);
    }

    public function getAnswers() {
      return Answer::join('messages', 'answers.id', '=', 'messages.id')
                    ->where('messages.author', '=', $this->id);
    }

    public function getComments() {
      return Comment::join('messages', 'comments.id', '=', 'messages.id')
                    ->where('messages.author', '=', $this->id);
    }

    public function getBookmarks() {
      return Question::join('bookmarks', 'bookmarks.question_id', '=', 'questions.id')
                    ->where('bookmarks.user_id', '=', $this->id);
    }

    public function hasBookmarkOn($question_id) {
      return Bookmark::where('user_id', '=', $this->id)
                      ->where('question_id', '=', $question_id)
                      ->count() > 0;

    }
}

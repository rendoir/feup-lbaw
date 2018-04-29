<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

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
        'username', 'email', 'password_hash'
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
}
